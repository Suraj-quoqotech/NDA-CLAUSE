// src/components/ResultsTable.jsx
import { useState } from "react";

export default function ResultsTable({ detections = [], coverage = 0 }) {
  const [expandedIndex, setExpandedIndex] = useState(null);

  // Group system — 8 clauses per group
  const [group, setGroup] = useState(1);
  const ITEMS_PER_GROUP = 8;
  const totalGroups = Math.max(1, Math.ceil(detections.length / ITEMS_PER_GROUP));
  const startIndex = (group - 1) * ITEMS_PER_GROUP;
  const visibleDetections = detections.slice(startIndex, startIndex + ITEMS_PER_GROUP);

  const toggleSnippet = (i) => {
    setExpandedIndex(expandedIndex === i ? null : i);
  };

  // Document risk
  const total = detections.length || 0;
  const missing = detections.filter((d) => !d.identified).length;
  const riskPercent = total ? Math.round((missing / total) * 100) : 0;
  const riskColor =
    riskPercent < 20
      ? "#16a34a"
      : riskPercent < 40
      ? "#f59e0b"
      : riskPercent < 60
      ? "#f97316"
      : "#ef4444";

  // threshold for UI highlighting (same as backend)
  const THRESHOLD = 0.4;

  return (
    <div style={{ width: "100%" }}>
      {/* Coverage */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
        <h3 style={{ margin: 0, fontSize: 18 }}>Coverage:</h3>
        <div
          style={{
            backgroundColor: "#0d6efd",
            color: "white",
            padding: "6px 10px",
            borderRadius: 8,
            fontWeight: 700,
            fontSize: 14,
          }}
        >
          {Math.round(coverage * 100)}%
        </div>
      </div>

      {/* Pagination */}
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 10, marginBottom: 12 }}>
        <button
          onClick={() => setGroup((g) => Math.max(1, g - 1))}
          disabled={group === 1}
          style={{
            padding: "6px 10px",
            borderRadius: 8,
            border: "none",
            cursor: group === 1 ? "not-allowed" : "pointer",
            background: group === 1 ? "#f1f5f9" : "#eef2ff",
            color: group === 1 ? "#94a3b8" : "#0d6efd",
            fontWeight: 700,
          }}
        >
          ← Prev
        </button>

        {[...Array(totalGroups)].map((_, idx) => {
          const g = idx + 1;
          return (
            <button
              key={g}
              onClick={() => {
                setGroup(g);
                setExpandedIndex(null);
              }}
              style={{
                padding: "8px 12px",
                borderRadius: 8,
                border: "none",
                cursor: "pointer",
                background: group === g ? "#0d6efd" : "#f1f5f9",
                color: group === g ? "white" : "#374151",
                fontWeight: 700,
                minWidth: 36,
              }}
            >
              {g}
            </button>
          );
        })}

        <button
          onClick={() => setGroup((g) => Math.min(totalGroups, g + 1))}
          disabled={group === totalGroups}
          style={{
            padding: "6px 10px",
            borderRadius: 8,
            border: "none",
            cursor: group === totalGroups ? "not-allowed" : "pointer",
            background: group === totalGroups ? "#f1f5f9" : "#eef2ff",
            color: group === totalGroups ? "#94a3b8" : "#0d6efd",
            fontWeight: 700,
          }}
        >
          Next →
        </button>
      </div>

      {/* Table */}
      <div style={{ overflowX: "auto", borderRadius: 10 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", background: "white", boxShadow: "0 6px 18px rgba(15,23,42,0.04)" }}>
          <thead>
            <tr style={{ background: "#66a8ebff" }}>
              <th style={thStyle}>Sl. No.</th>
              <th style={thStyle}>Clause</th>
              <th style={thStyle}>Status</th>
              <th style={thStyle}>Confidence</th>
              <th style={thStyle}>Page</th>
              <th style={thStyle}>Risk Description</th>
              <th style={thStyle}>Snippet</th>
            </tr>
          </thead>
          <tbody>
            {visibleDetections.map((d, i) => {
              const absoluteIndex = startIndex + i;
              const conf = Number(d.confidence || 0);
              // lowConfidence only when not identified and below threshold
              const lowConfidence = !d.identified && conf < THRESHOLD;

              return (
                <tr
                  key={absoluteIndex}
                  style={{
                    ...(absoluteIndex % 2 === 0 ? rowEven : rowOdd),
                    ...(lowConfidence ? { background: "rgba(255,0,0,0.08)" } : {}),
                  }}
                >
                  <td style={tdStyleCenter}>{absoluteIndex + 1}</td>

                  <td style={tdStyle}>{d.clause_name}</td>

                  {/* Status (backend authorative) */}
                  <td style={tdStyleCenter}>
                    <span style={{ color: d.identified ? "#15803d" : "#dc2626", fontWeight: 700 }}>
                      {d.identified ? "Identified" : "Not found"}
                    </span>

                    {lowConfidence && (
                      <div style={{ fontSize: 12, color: "#b91c1c", marginTop: 4 }}>Low confidence (forced)</div>
                    )}
                  </td>

                  {/* Confidence with coloring */}
                  <td style={tdStyle}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <div
                        title={lowConfidence ? "Below threshold 0.40 (forced Not Found)" : ""}
                        style={{ background: "#f1f5f9", borderRadius: 999, width: 120, height: 10, overflow: "hidden" }}
                      >
                        <div style={{ width: `${Math.round(conf * 100)}%`, height: "100%", background: conf < THRESHOLD ? "#dc2626" : "#0d6efd" }} />
                      </div>
                      <div style={{ minWidth: 36, color: conf < THRESHOLD ? "#dc2626" : "#374151", fontWeight: 700 }}>
                        {conf.toFixed(2)}
                      </div>
                    </div>
                  </td>

                  <td style={tdStyleCenter}>{d.page ?? "-"}</td>

                  <td style={{ ...tdStyle, maxWidth: 260, whiteSpace: "normal", color: "#374151" }}>{d.risk_description || "-"}</td>

                  <td style={tdStyle}>
                    {d.snippet ? (
                      <>
                        <button onClick={() => toggleSnippet(absoluteIndex)} style={{ background: "none", border: "none", color: "#0d6efd", cursor: "pointer", fontWeight: 700 }}>
                          {expandedIndex === absoluteIndex ? "Hide" : "Show"}
                        </button>

                        {expandedIndex === absoluteIndex && (
                          <div style={{ marginTop: 8, fontSize: 13, color: "#374151", background: "#f8fafc", padding: 8, borderRadius: 6 }}>
                            {d.snippet}
                          </div>
                        )}
                      </>
                    ) : (
                      <span style={{ color: "#768ba8ff" }}>-</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Overall Risk */}
      <div style={{ marginTop: 18 }}>
        <h4 style={{ margin: 0, fontSize: 16 }}>
          Overall Document Risk: <span style={{ color: riskColor }}>{riskPercent}%</span>
        </h4>

        <div style={{ marginTop: 8, width: "100%", background: "#f1f5f9", height: 18, borderRadius: 999 }}>
          <div style={{ width: `${riskPercent}%`, height: "100%", borderRadius: 999, background: riskColor, transition: "width .4s ease" }} />
        </div>
      </div>
    </div>
  );
}

// --- Styles ---
const thStyle = {
  textAlign: "left",
  padding: "12px 14px",
  color: "#374151",
  fontWeight: 700,
  fontSize: 14,
};

const tdStyle = {
  padding: "12px 14px",
  color: "#111827",
  fontSize: 14,
};

const tdStyleCenter = {
  ...tdStyle,
  textAlign: "center",
};

const rowEven = { background: "white" };
const rowOdd = { background: "#fbfdff" };
