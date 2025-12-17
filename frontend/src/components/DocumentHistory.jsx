import { useEffect, useState } from "react";
import { getAllDocuments } from "../api";

export default function DocumentHistory({ onSelect }) {
  const [docs, setDocs] = useState([]);
  const [q, setQ] = useState("");

  useEffect(() => {
    loadDocs();
  }, []);

  const loadDocs = async () => {
    try {
      const data = await getAllDocuments();
      setDocs(data);
    } catch (err) {
      console.error(err);
    }
  };

  const filtered = docs.filter((d) => (d.title || "").toLowerCase().includes(q.toLowerCase()));

  return (
    <div style={{ width: "100%" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
        <h3 style={{ margin: 0 }}>Previously Uploaded Documents</h3>
        <input
          placeholder="Search title..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
          style={{
            padding: "8px 10px",
            borderRadius: 8,
            border: "1px solid rgba(15,23,42,0.06)",
            width: 200,
          }}
        />
      </div>

      <div style={{ overflowX: "auto", borderRadius: 10 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", background: "white" }}>
          <thead>
            <tr style={{ background: "#fbfdff" }}>
              <th style={hTh}>Title</th>
              <th style={hTh}>Identified</th>
              <th style={hTh}>Missing</th>
              <th style={hTh}>Coverage</th>
              <th style={hTh}>Action</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((d, i) => (
              <tr key={d.id || i} style={i % 2 === 0 ? { background: "white" } : { background: "#fcfdff" }}>
                <td style={hTd}>{d.title}</td>
                <td style={hTdCenter}>{d.identified}</td>
                <td style={hTdCenter}>{d.missing}</td>
                <td style={hTdCenter}>{Math.round(d.coverage * 100)}%</td>
                <td style={hTdCenter}>
                  <button
                    onClick={() => onSelect(d.id)}
                    style={{
                      background: "#0d6efd",
                      color: "white",
                      padding: "6px 10px",
                      borderRadius: 8,
                      border: "none",
                      cursor: "pointer",
                      fontWeight: 700,
                    }}
                  >
                    Open
                  </button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={5} style={{ padding: 12, textAlign: "center", color: "#94a3b8" }}>
                  No documents found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const hTh = {
  textAlign: "left",
  padding: "10px 12px",
  fontWeight: 700,
  color: "#374151",
};
const hTd = {
  padding: "10px 12px",
  color: "#111827",
};
const hTdCenter = { ...hTd, textAlign: "center", minWidth: 88 };
