# app/detector.py
import re
import torch
import spacy
from sentence_transformers import SentenceTransformer, util
from .clause_config import CLAUSES

# spaCy sentence splitter
nlp = spacy.load("en_core_web_sm")

# Embedding model
_model = SentenceTransformer("all-mpnet-base-v2")

# Final global threshold
FINAL_THRESHOLD = 0.40


def split_sentences(text):
    doc = nlp(text)
    return [sent.text.strip() for sent in doc.sents if sent.text.strip()]


def detect(text, pages_meta):
    """
    Returns a list of dicts:
    {
      clause_name, identified (bool),
      confidence (float 0..1),
      reason (string), snippet (string), page,
      risk_level, risk_description
    }
    """
    sentences = split_sentences(text)
    if not sentences:
        sentences = [""]  # avoid crashes

    sent_emb = _model.encode(sentences, convert_to_tensor=True)
    results = []

    num_sentences = len(sentences)

    for clause in CLAUSES:
        # ----------------------------
        # Keyword + Regex detection
        # ----------------------------
        kw_hit = any(
            any(k.lower() in s.lower() for k in clause.get("keywords", []))
            for s in sentences
        )
        regex_hit = any(
            re.search(p, s, flags=re.I)
            for p in clause.get("patterns", [])
            for s in sentences
        )

        # ----------------------------
        # Semantic similarity
        # ----------------------------
        anchors = clause.get("examples") or clause.get("keywords", [])
        # If anchors empty, fallback safe behavior
        if not anchors:
            anchors = [clause.get("name", "")]

        anchor_emb = _model.encode(anchors, convert_to_tensor=True)

        sims = util.cos_sim(anchor_emb, sent_emb)  # (#anchors, #sentences)

        # Flatten safely and pick top-k
        sims_flat = sims.view(-1)
        k = min(3, sims_flat.shape[0]) if sims_flat.numel() > 0 else 1
        top_vals, top_idx = torch.topk(sims_flat, k=k)

        best_score = float(top_vals.mean().item()) if top_vals.numel() > 0 else 0.0

        # Determine best matching sentence (convert flattened index -> sentence index)
        raw_idx = int(top_idx[0].item()) if top_idx.numel() > 0 else 0
        best_idx = raw_idx % num_sentences
        if best_idx < 0 or best_idx >= num_sentences:
            best_idx = 0

        # Ensure snippet is always returned (even for not-identified)
        snippet = sentences[best_idx].replace("\u00A0", " ") if sentences[best_idx] else ""

        # --- Decision: identified if ANY of these is true ---
        sim_hit = best_score >= clause.get("threshold", FINAL_THRESHOLD)  # preserves clause-specific threshold if used
        # But final policy: consider identification if confidence >= FINAL_THRESHOLD OR keyword or regex.
        identified = (best_score >= FINAL_THRESHOLD) or kw_hit or regex_hit

        # --- Reason (prioritized) ---
        if best_score >= FINAL_THRESHOLD:
            reason = "Semantic similarity"
        elif kw_hit:
            reason = "Keyword match"
        elif regex_hit:
            reason = "Regex match"
        else:
            reason = "No match"

        # --- Page guess ---
        page_guess = _guess_page(snippet, text, pages_meta)

        # --- Risk text ---
        if identified:
            risk_level = clause.get("positive_risk_level", "Low")
            risk_desc = clause.get("positive_risk_description", "")
        else:
            risk_level = clause.get("risk_level_if_missing", "Medium")
            risk_desc = clause.get("risk_description", "")

        results.append({
            "clause_name": clause.get("name", ""),
            "identified": bool(identified),
            "confidence": round(best_score, 4),
            "reason": reason,
            "snippet": snippet,               # ALWAYS send snippet
            "page": page_guess,
            "risk_level": risk_level,
            "risk_description": risk_desc,
        })

    return results


def _guess_page(snippet, full_text, pages_meta):
    """
    Simple snippet -> page mapping by finding the chunk that contains snippet.
    pages_meta expected as list of { "page": n, ... } mapping from extract_text.
    """
    if not snippet or not pages_meta:
        return None

    chunks = full_text.split("\n\n")
    for i, ch in enumerate(chunks):
        if snippet in ch:
            return pages_meta[i]["page"] if i < len(pages_meta) else None
    return None
