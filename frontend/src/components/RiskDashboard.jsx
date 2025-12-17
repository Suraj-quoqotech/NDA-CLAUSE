// src/components/RiskDashboard.jsx
import React from "react";

export default function RiskDashboard({ results, darkMode }) {
  const detections = results?.detections || [];
  const total = detections.length || 0;
  const missing = detections.filter((d) => !d.identified).length;
  const riskPercent = total ? Math.round((missing / total) * 100) : 0;

  const highRisk = detections
    .filter((d) => !d.identified)
    .slice(0, 8); // show up to 8 missing/high risk clauses

  const color =
    riskPercent < 20 ? "#16a34a" : riskPercent < 40 ? "#f59e0b" : riskPercent < 60 ? "#f97316" : "#ef4444";

  return (
    <div style={{ color: darkMode ? "#fff" : "#111" }}>
      <h3 style={{ marginTop: 0 }}>Document Risk</h3>

      <div style={{ display: "flex", gap: 16 }}>
        <div style={{ flex: 1, background: darkMode ? "#111" : "#fff", padding: 14, borderRadius: 10 }}>
          <div style={{ fontSize: 13, color: darkMode ? "#9ca3af" : "#6b7280" }}>Overall risk</div>
          <div style={{ fontSize: 38, fontWeight: 900, color }}>{riskPercent}%</div>

          <div style={{ marginTop: 12 }}>
            <div style={{ height: 18, background: darkMode ? "#202020" : "#f1f5f9", borderRadius: 12, overflow: "hidden" }}>
              <div style={{ width: `${riskPercent}%`, height: "100%", background: color, transition: "width .4s" }} />
            </div>
            <div style={{ marginTop: 8, fontSize: 13, color: darkMode ? "#9ca3af" : "#6b7280" }}>
              This score is the proportion of missing clauses in the document (lower is better).
            </div>
          </div>
        </div>

        <div style={{ width: 360, background: darkMode ? "#111" : "#fff", padding: 14, borderRadius: 10 }}>
          <div style={{ fontWeight: 800, marginBottom: 10 }}>High-risk / Missing clauses</div>

          {highRisk.length ? (
            highRisk.map((h, i) => (
              <div key={i} style={{ padding: 10, borderRadius: 8, background: darkMode ? "#0f1720" : "#fbfdff", marginBottom: 10 }}>
                <div style={{ fontWeight: 800 }}>{h.clause_name}</div>
                <div style={{ fontSize: 13, color: darkMode ? "#9ca3af" : "#6b7280", marginTop: 6 }}>{h.risk_description || "Missing clause — review carefully."}</div>
              </div>
            ))
          ) : (
            <div style={{ color: darkMode ? "#9ca3af" : "#6b7280" }}>No missing clauses found — low risk.</div>
          )}
        </div>
      </div>
    </div>
  );
}
