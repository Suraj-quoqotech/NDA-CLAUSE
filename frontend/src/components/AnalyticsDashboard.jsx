// src/components/AnalyticsDashboard.jsx
import React from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend, Title);

export default function AnalyticsDashboard({ results, darkMode }) {
  // Use the provided detections (safeguard if results is null)
  const detections = Array.isArray(results?.detections) ? results.detections : [];

  // Only consider identified clauses for the confidence distribution.
  // The dashboard top cards (identified / missing) already show identified count.
  const identifiedDetections = detections.filter((d) => !!d.identified);

  const total = detections.length;
  const identified = identifiedDetections.length;
  const missing = total - identified;

  const avgConfidence =
    identifiedDetections.length > 0
      ? identifiedDetections.reduce((s, d) => s + (Number(d.confidence) || 0), 0) /
        identifiedDetections.length
      : 0;

  // Initialize five buckets representing percentage ranges:
  // 0-20, 21-40, 41-60, 61-80, 81-100
  const buckets = [0, 0, 0, 0, 0];

  identifiedDetections.forEach((d) => {
    // Normalize confidence: ensure numeric and clamp 0..1
    let conf = Number(d.confidence);
    if (!isFinite(conf)) conf = 0;
    if (conf < 0) conf = 0;
    if (conf > 1) conf = 1;

    const pct = Math.round(conf * 100); // 0..100

    if (pct >= 0 && pct <= 20) buckets[0] += 1;
    else if (pct >= 21 && pct <= 40) buckets[1] += 1;
    else if (pct >= 41 && pct <= 60) buckets[2] += 1;
    else if (pct >= 61 && pct <= 80) buckets[3] += 1;
    else if (pct >= 81 && pct <= 100) buckets[4] += 1;
    else {
      // Safety fallback (shouldn't happen) — treat as lowest bin
      buckets[0] += 1;
    }
  });

  const barData = {
    labels: ["0-20", "21-40", "41-60", "61-80", "81-100"],
    datasets: [
      {
        label: "Clauses",
        data: buckets,
        backgroundColor: darkMode ? "#2563eb" : "#0d6efd",
        borderRadius: 4,
      },
    ],
  };

  const pieData = {
    labels: ["Identified", "Missing"],
    datasets: [
      {
        data: [identified, missing],
        backgroundColor: ["#16a34a", "#ef4444"],
      },
    ],
  };

  // Top missing clauses — compute from detections where identified === false
  const topMissing = detections.filter((d) => !d.identified).slice(0, 5);

  return (
    <div style={{ color: darkMode ? "#fff" : "#111" }}>
      <h3 style={{ marginTop: 0 }}>Analytics</h3>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 260px", gap: 16 }}>
        <div style={{ background: darkMode ? "#0b0b0b" : "#fff", padding: 12, borderRadius: 10 }}>
          <div style={{ display: "flex", gap: 12, marginBottom: 12 }}>
            <div style={{ flex: 1, padding: 12, borderRadius: 8, background: darkMode ? "#0f1720" : "#f8fafc" }}>
              <div style={{ fontSize: 14, color: darkMode ? "#9ca3af" : "#6b7280" }}>Total clauses</div>
              <div style={{ fontSize: 22, fontWeight: 800 }}>{total}</div>
            </div>

            <div style={{ flex: 1, padding: 12, borderRadius: 8, background: darkMode ? "#0f1720" : "#f8fafc" }}>
              <div style={{ fontSize: 14, color: darkMode ? "#9ca3af" : "#6b7280" }}>Identified</div>
              <div style={{ fontSize: 22, fontWeight: 800, color: "#16a34a" }}>{identified}</div>
            </div>

            <div style={{ flex: 1, padding: 12, borderRadius: 8, background: darkMode ? "#0f1720" : "#f8fafc" }}>
              <div style={{ fontSize: 14, color: darkMode ? "#9ca3af" : "#6b7280" }}>Missing</div>
              <div style={{ fontSize: 22, fontWeight: 800, color: "#ef4444" }}>{missing}</div>
            </div>
          </div>

          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 13, color: darkMode ? "#9ca3af" : "#6b7280" }}>Average confidence</div>
            <div style={{ fontSize: 18, fontWeight: 800 }}>{(avgConfidence * 100).toFixed(1)}%</div>
          </div>

          <div style={{ marginTop: 8 }}>
            <div style={{ fontSize: 13, color: darkMode ? "#9ca3af" : "#6b7280", marginBottom: 8 }}>Confidence distribution</div>
            <div>
              <Bar
                data={barData}
                options={{
                  plugins: { legend: { display: false } },
                  responsive: true,
                  scales: {
                    y: {
                      beginAtZero: true,
                      ticks: { stepSize: 1, color: darkMode ? "#cbd5e1" : "#6b7280" },
                      grid: { color: darkMode ? "#111827" : "#f1f5f9" },
                    },
                    x: {
                      ticks: { color: darkMode ? "#cbd5e1" : "#6b7280" },
                      grid: { display: false },
                    },
                  },
                }}
              />
            </div>
          </div>
        </div>

        <div style={{ background: darkMode ? "#0b0b0b" : "#fff", padding: 12, borderRadius: 10 }}>
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 13, color: darkMode ? "#9ca3af" : "#6b7280" }}>Identified vs Missing</div>
            <div style={{ width: "100%", height: 160 }}>
              <Pie data={pieData} />
            </div>
          </div>

          <div>
            <div style={{ fontWeight: 700, marginBottom: 8 }}>Top missing clauses</div>
            {topMissing.length ? (
              topMissing.map((m, idx) => (
                <div key={idx} style={{ padding: 8, borderRadius: 8, background: darkMode ? "#0f1720" : "#fbfdff", marginBottom: 8 }}>
                  <div style={{ fontWeight: 700 }}>{m.clause_name}</div>
                  <div style={{ fontSize: 13, color: darkMode ? "#cbd5e1" : "#6b7280" }}>{m.reason || "No match"}</div>
                </div>
              ))
            ) : (
              <div style={{ color: darkMode ? "#9ca3af" : "#6b7280" }}>No missing clauses — good coverage.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
