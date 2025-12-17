import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function ClausePieChart({ detections }) {
  const identified = detections.filter((d) => d.identified).length;
  const notFound = Math.max(0, (detections.length || 0) - identified);

  const data = {
    labels: ["Identified", "Not Found"],
    datasets: [
      {
        label: "Clause Status",
        data: [identified, notFound],
        backgroundColor: ["#28a745", "#dc3545"],
        hoverBackgroundColor: ["#218838", "#c82333"],
      },
    ],
  };

  const pct = detections.length ? Math.round((identified / detections.length) * 100) : 0;

  return (
    <div
      style={{
        width: "100%",
        padding: 20,
        borderRadius: 12,
        textAlign: "center",
      }}
    >
      <div
        style={{
          fontSize: 16,
          fontWeight: 700,
          color: "#111827",
          marginBottom: 8,
        }}
      >
        Clause Identification Summary
      </div>

      <div
        style={{
          background: "white",
          padding: 14,
          borderRadius: 12,
          boxShadow: "0 8px 30px rgba(15,23,42,0.06)",
        }}
      >
        <div style={{ maxWidth: 360, margin: "0 auto" }}>
          <Pie data={data} />
        </div>

        <div style={{ marginTop: 10, fontSize: 13, color: "#374151" }}>
          <strong>{identified}</strong> identified • <strong>{notFound}</strong> missing •{" "}
          <span style={{ color: "#0b5ed7", fontWeight: 700 }}>{pct}% coverage</span>
        </div>
      </div>
    </div>
  );
}
