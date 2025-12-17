CLAUSES = [
    {
        "name": "Indemnity",
        "keywords": [
            "indemnify", "indemnification", "hold harmless", "keep indemnified",
            "losses", "claims", "damages", "liabilities", "defend", "third-party claims"
        ],
        "patterns": [r"\bindemnif(y|ication)\b", r"\bhold\s+harmless\b"],
        "threshold": 0.5,
        "positive_risk_description": (
            "The Indemnity clause is present. This reduces financial and legal exposure arising from "
            "third-party claims, damages, or losses."
        ),
        "risk_description": (
            "The document appears to be missing the Indemnity clause. Absence of this clause may expose "
            "the parties to unlimited liability for third-party claims, losses, damages, and legal costs."
        ),
        "risk_level_if_missing": "High"
    },

    {
        "name": "Limitation of liability",
        "keywords": [
            "aggregate liability", "limitation of liability", "liability cap",
            "consequential damages", "indirect damages", "special damages",
            "lost profits", "liability shall not exceed", "maximum liability"
        ],
        "patterns": [r"\blimitation\s+of\s+liability\b", r"\bliability\s+shall\s+not\s+exceed\b"],
        "threshold": 0.5,
        "positive_risk_description": (
            "The Limitation of liability clause is present. This reduces exposure by capping the maximum "
            "damages a party may owe."
        ),
        "risk_description": (
            "The document appears to be missing the Limitation of liability clause. This may create unlimited "
            "financial exposure for consequential, indirect, or special damages."
        ),
        "risk_level_if_missing": "High"
    },

    {
        "name": "Governing law and jurisdiction",
        "keywords": [
            "governing law", "jurisdiction", "venue", "courts at",
            "exclusive jurisdiction", "laws of", "legal jurisdiction"
        ],
        "patterns": [r"\bgoverning\s+law\b", r"\bexclusive\s+jurisdiction\b", r"\bcourts\s+at\s+\w+"],
        "threshold": 0.5,
        "positive_risk_description": (
            "The Governing law and jurisdiction clause is present. This provides clarity on which courts "
            "and laws apply in disputes, reducing litigation ambiguity."
        ),
        "risk_description": (
            "The document appears to be missing a Governing law and jurisdiction clause. This can result in "
            "uncertain legal interpretation and increased litigation risk due to unclear applicable law."
        ),
        "risk_level_if_missing": "High"
    },

    {
        "name": "Confidentiality",
        "keywords": [
            "confidential", "confidential information", "non-disclosure",
            "proprietary", "sensitive information", "trade secrets",
            "keep confidential", "NDA", "confidential materials"
        ],
        "patterns": [r"\bconfidential\b", r"\bnon[-\s]?disclosure\b"],
        "threshold": 0.5,
        "positive_risk_description": (
            "The Confidentiality clause is present. This protects proprietary and sensitive information from "
            "unauthorized disclosure."
        ),
        "risk_description": (
            "The document appears to be missing a Confidentiality clause. Absence of this clause increases the "
            "risk of unauthorized disclosure or misuse of sensitive information."
        ),
        "risk_level_if_missing": "High"
    },

    {
        "name": "Term and termination",
        "keywords": [
            "term", "termination", "effective date", "expiry", "renewal",
            "terminate", "termination for convenience", "termination for cause",
            "duration", "notice of termination"
        ],
        "patterns": [r"\bterm(?:ination)?\b", r"\bexpires?\b"],
        "threshold": 0.5,
        "positive_risk_description": (
            "The Term and termination clause is present. This provides clarity on duration, renewal, and "
            "termination rights."
        ),
        "risk_description": (
            "The document appears to be missing a Term and termination clause. This can create disputes over "
            "contract duration, exit rights, and notice periods."
        ),
        "risk_level_if_missing": "High"
    },

    {
        "name": "Assignment",
        "keywords": [
            "assign", "assignment", "transfer", "successor", "assigns",
            "delegation", "cannot be transferred", "may not assign"
        ],
        "patterns": [r"\bassign(ment)?\b", r"\btransfer\b"],
        "threshold": 0.5,
        "positive_risk_description": (
            "The Assignment clause is present. This ensures that contractual rights cannot be transferred "
            "without consent."
        ),
        "risk_description": (
            "The document appears to be missing the Assignment clause. This could allow unauthorized transfer "
            "of contractual rights to third parties."
        ),
        "risk_level_if_missing": "Medium"
    },

    {
        "name": "Force majeure",
        "keywords": [
            "force majeure", "act of god", "unforeseeable event", "beyond control",
            "natural disasters", "war", "strike", "pandemic", "lockdown"
        ],
        "patterns": [r"\bforce\s+majeure\b", r"\bact\s+of\s+god\b"],
        "threshold": 0.5,
        "positive_risk_description": (
            "The Force majeure clause is present. This protects parties from liability during events outside "
            "their control."
        ),
        "risk_description": (
            "The document appears to be missing the Force majeure clause. Absence of this clause may expose "
            "parties to liability even during uncontrollable events such as natural disasters or pandemics."
        ),
        "risk_level_if_missing": "High"
    },

    {
        "name": "Intellectual property",
        "keywords": [
            "intellectual property", "IP rights", "copyright", "trademark",
            "ownership", "license", "proprietary rights", "retain ownership",
            "background IP", "foreground IP"
        ],
        "patterns": [r"\bintellectual\s+property\b", r"\bIP\s+rights\b"],
        "threshold": 0.5,
        "positive_risk_description": (
            "The Intellectual property clause is present. This clarifies ownership and licensing of IP assets."
        ),
        "risk_description": (
            "The document appears to be missing the Intellectual property clause. Absence of this clause "
            "creates ambiguity over IP ownership, licensing, and usage rights."
        ),
        "risk_level_if_missing": "High"
    },

    {
        "name": "Non-solicitation",
        "keywords": [
            "non-solicit", "solicit", "poach", "hire employees",
            "solicitation restriction", "client solicitation"
        ],
        "patterns": [r"\bnon[-\s]?solicit\b", r"\bsolicit\b"],
        "threshold": 0.5,
        "positive_risk_description": (
            "The Non-solicitation clause is present. This reduces risk of employee and client poaching."
        ),
        "risk_description": (
            "The document appears to be missing the Non-solicitation clause. This creates risk of workforce "
            "poaching and loss of key clients."
        ),
        "risk_level_if_missing": "Medium"
    },

    {
        "name": "Non-compete",
        "keywords": [
            "non-compete", "no competition", "competing business",
            "restrict competition", "competitive activities"
        ],
        "patterns": [r"\bnon[-\s]?compete\b", r"\bcompeting\b"],
        "threshold": 0.5,
        "positive_risk_description": (
            "The Non-compete clause is present. This helps prevent unfair competitive activity post-engagement."
        ),
        "risk_description": (
            "The document appears to be missing the Non-compete clause. This may expose the business to unfair "
            "competition risk."
        ),
        "risk_level_if_missing": "Medium"
    },

    {
        "name": "Data protection",
        "keywords": [
            "data protection", "personal data", "data privacy", "GDPR",
            "processing data", "data subject", "privacy laws",
            "data security", "data breach"
        ],
        "patterns": [r"\bdata\s+protection\b", r"\bpersonal\s+data\b"],
        "threshold": 0.5,
        "positive_risk_description": (
            "The Data protection clause is present. This ensures compliance with data privacy and security "
            "requirements."
        ),
        "risk_description": (
            "The document appears to be missing the Data protection clause. This exposes the parties to "
            "privacy violations, data breaches, and regulatory penalties."
        ),
        "risk_level_if_missing": "High"
    },

    {
        "name": "Representations and warranties",
        "keywords": [
            "represent", "represents", "warrant", "warrants",
            "guarantee", "authority", "no breach", "legal capacity",
            "accurate information", "compliance"
        ],
        "patterns": [r"\brepresent\b", r"\bwarrant\b"],
        "threshold": 0.5,
        "positive_risk_description": (
            "The Representations and warranties clause is present. This ensures both parties confirm legal "
            "capacity and accuracy of information."
        ),
        "risk_description": (
            "The document appears to be missing the Representations and warranties clause. This increases the "
            "risk of relying on inaccurate, incomplete, or unauthorized commitments."
        ),
        "risk_level_if_missing": "High"
    },

    {
        "name": "Entire agreement",
        "keywords": [
            "entire agreement", "whole agreement", "supersedes",
            "complete agreement", "entire understanding", "prior agreements"
        ],
        "patterns": [r"\bentire\s+agreement\b", r"\bsupersedes\b"],
        "threshold": 0.5,
        "positive_risk_description": (
            "The Entire agreement clause is present. This prevents reliance on external or prior negotiations."
        ),
        "risk_description": (
            "The document appears to be missing the Entire agreement clause. This increases the risk of legal "
            "disputes over verbal or prior written communications."
        ),
        "risk_level_if_missing": "Medium"
    },

    {
        "name": "Severability",
        "keywords": [
            "severable", "severability", "invalid provision", "unenforceable",
            "remain in effect", "rest of agreement"
        ],
        "patterns": [r"\bseverab(le|ility)\b", r"\binvalid\b"],
        "threshold": 0.5,
        "positive_risk_description": (
            "The Severability clause is present. This ensures other terms remain enforceable even if one "
            "provision is invalid."
        ),
        "risk_description": (
            "The document appears to be missing the Severability clause. This may cause the entire agreement to "
            "be challenged if one clause is unenforceable."
        ),
        "risk_level_if_missing": "Medium"
    },

    {
        "name": "Amendments",
        "keywords": [
            "amend", "amendment", "modify", "modification", "change",
            "written consent", "written agreement", "revision"
        ],
        "patterns": [r"\bamend(ed|ment)?\b", r"\bmodify\b"],
        "threshold": 0.5,
        "positive_risk_description": (
            "The Amendments clause is present. This ensures any future changes must be recorded in writing."
        ),
        "risk_description": (
            "The document appears to be missing the Amendments clause. This increases the risk of unauthorized "
            "or disputed contract modifications."
        ),
        "risk_level_if_missing": "Medium"
    },

    {
        "name": "Notices",
        "keywords": [
            "notice", "notices", "notify", "notification", "written notice",
            "communication", "address for notice"
        ],
        "patterns": [r"\bnotice\b", r"\bnotify\b"],
        "threshold": 0.5,
        "positive_risk_description": (
            "The Notices clause is present. This clarifies how official communications must be delivered."
        ),
        "risk_description": (
            "The document appears to be missing the Notices clause. This creates ambiguity over how formal "
            "communications are considered valid."
        ),
        "risk_level_if_missing": "Medium"
    },

    {
        "name": "Waiver",
        "keywords": [
            "waive", "waiver", "failure to enforce", "non-waiver",
            "waiver of rights", "no implied waiver"
        ],
        "patterns": [r"\bwaiv(er|e)\b"],
        "threshold": 0.5,
        "positive_risk_description": (
            "The Waiver clause is present. This protects parties from accidentally waiving legal rights."
        ),
        "risk_description": (
            "The document appears to be missing the Waiver clause. This can cause unintended loss of legal "
            "rights due to informal conduct."
        ),
        "risk_level_if_missing": "Medium"
    },

    {
        "name": "Dispute resolution",
        "keywords": [
            "dispute", "arbitration", "mediator", "mediation", "conciliation",
            "arbitral tribunal", "settlement", "resolution of disputes"
        ],
        "patterns": [r"\barbitration\b", r"\bdispute\b"],
        "threshold": 0.5,
        "positive_risk_description": (
            "The Dispute resolution clause is present. This provides a structured method to resolve conflicts."
        ),
        "risk_description": (
            "The document appears to be missing the Dispute resolution clause. This increases legal cost and "
            "uncertainty during conflicts."
        ),
        "risk_level_if_missing": "High"
    },

    {
        "name": "Audit rights",
        "keywords": [
            "audit", "inspect records", "verification", "compliance audit",
            "access to records", "financial review"
        ],
        "patterns": [r"\baudit\b", r"\binspect\b"],
        "threshold": 0.5,
        "positive_risk_description": (
            "The Audit rights clause is present. This allows verification of financial and compliance activities."
        ),
        "risk_description": (
            "The document appears to be missing the Audit rights clause. This limits the ability to verify "
            "performance, compliance, or financial accuracy."
        ),
        "risk_level_if_missing": "Medium"
    },

    {
        "name": "Payment terms",
        "keywords": [
            "payment", "invoice", "fees", "charges", "compensation",
            "billing", "payment schedule", "payment due", "late fees"
        ],
        "patterns": [r"\bpayment\b", r"\binvoice\b"],
        "threshold": 0.5,
        "positive_risk_description": (
            "The Payment terms clause is present. This clarifies obligations regarding invoicing, timelines, "
            "and penalties."
        ),
        "risk_description": (
            "The document appears to be missing the Payment terms clause. This increases the risk of payment "
            "delays, disputes, or revenue leakage."
        ),
        "risk_level_if_missing": "High"
    },

    {
        "name": "Subcontracting",
        "keywords": [
            "subcontract", "subcontractor", "third-party service provider",
            "delegate", "outsourcing", "sub-vendor"
        ],
        "patterns": [r"\bsubcontract\b"],
        "threshold": 0.5,
        "positive_risk_description": (
            "The Subcontracting clause is present. This regulates transfer of responsibilities to third parties."
        ),
        "risk_description": (
            "The document appears to be missing the Subcontracting clause. This may allow uncontrolled "
            "outsourcing without proper safeguards."
        ),
        "risk_level_if_missing": "Medium"
    },

    {
        "name": "Return or destruction of confidential information",
        "keywords": [
            "return", "destroy", "destruction", "return materials",
            "delete data", "purge", "certify destruction"
        ],
        "patterns": [r"\breturn\b", r"\bdestroy\b"],
        "threshold": 0.5,
        "positive_risk_description": (
            "The Return or destruction of confidential information clause is present. This ensures secure data "
            "handling after termination."
        ),
        "risk_description": (
            "The document appears to be missing this clause. This increases the risk of retaining or misusing "
            "confidential information after contract end."
        ),
        "risk_level_if_missing": "High"
    },

    {
        "name": "Publicity",
        "keywords": [
            "publicity", "press release", "announcement", "marketing",
            "public statement", "media disclosure", "PR"
        ],
        "patterns": [r"\bpublicity\b", r"\bpress\s+release\b"],
        "threshold": 0.5,
        "positive_risk_description": (
            "The Publicity clause is present. It controls unauthorized media or public disclosures."
        ),
        "risk_description": (
            "The document appears to be missing the Publicity clause. This may allow unauthorized public "
            "statements affecting reputation."
        ),
        "risk_level_if_missing": "Medium"
    },

    {
        "name": "Export control",
        "keywords": [
            "export", "export laws", "export control", "sanctions", "restricted",
            "international trade compliance", "embargo"
        ],
        "patterns": [r"\bexport\b", r"\bsanction(s)?\b"],
        "threshold": 0.5,
        "positive_risk_description": (
            "The Export control clause is present. This ensures compliance with international trade regulations."
        ),
        "risk_description": (
            "The document appears to be missing the Export control clause. This may expose the business to "
            "regulatory penalties and international trade violations."
        ),
        "risk_level_if_missing": "High"
    },

    {
        "name": "Survival",
        "keywords": [
            "survive", "survival", "continue in effect",
            "post-termination obligations"
        ],
        "patterns": [r"\bsurviv(al|e)\b"],
        "threshold": 0.5,
        "positive_risk_description": (
            "The Survival clause is present. This ensures critical obligations continue after termination."
        ),
        "risk_description": (
            "The document appears to be missing the Survival clause. This risks termination of key obligations "
            "such as confidentiality and indemnity."
        ),
        "risk_level_if_missing": "Medium"
    },

    {
        "name": "Counterparts",
        "keywords": [
            "counterparts", "multiple copies", "electronic signature",
            "digital signature", "facsimile copies", "executed in counterparts"
        ],
        "patterns": [r"\bcounterparts\b", r"\belectronic\b"],
        "threshold": 0.5,
        "positive_risk_description": (
            "The Counterparts clause is present. This allows signing in separate copies and electronic signature usage."
        ),
        "risk_description": (
            "The document appears to be missing the Counterparts clause. This may complicate execution and "
            "validity of electronically signed copies."
        ),
        "risk_level_if_missing": "Low"
    },

    {
        "name": "Independent contractors",
        "keywords": [
            "independent contractor", "no employment", "not employee",
            "no agency", "contractual relationship", "not partnership"
        ],
        "patterns": [r"\bindependent\s+contractor\b"],
        "threshold": 0.5,
        "positive_risk_description": (
            "The Independent contractors clause is present. This ensures parties are not treated as employees or agents."
        ),
        "risk_description": (
            "The document appears to be missing the Independent contractors clause. This may create legal exposure "
            "related to employment claims or agency authority."
        ),
        "risk_level_if_missing": "Medium"
    },

    {
        "name": "Compliance with laws",
        "keywords": [
            "comply with laws", "legal compliance", "statutory compliance",
            "regulations", "applicable laws", "regulatory requirements"
        ],
        "patterns": [r"\bcomply\b", r"\blaws?\b"],
        "threshold": 0.5,
        "positive_risk_description": (
            "The Compliance with laws clause is present. This ensures both parties adhere to applicable regulations."
        ),
        "risk_description": (
            "The document appears to be missing the Compliance with laws clause. Absence of this clause creates risk "
            "of regulatory breaches or unlawful conduct."
        ),
        "risk_level_if_missing": "High"
    },
]
