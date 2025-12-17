// src/App.jsx
import { useState } from "react";
import Login from "./components/Login";
import UploadForm from "./components/UploadForm";
import ResultsTable from "./components/ResultsTable";
import ClausePieChart from "./components/ClausePieChart";
import DocumentHistory from "./components/DocumentHistory";
import AnalyticsDashboard from "./components/AnalyticsDashboard";
import RiskDashboard from "./components/RiskDashboard";
import { getDocument } from "./api";

// Clause guide (kept here, used for Clause Guide panel)
const CLAUSE_GUIDE = [
  { name: "Indemnity", info: "Ensures one party compensates the other for losses or damages arising from breaches or wrongful acts." },
  { name: "Confidentiality", info: "Protects sensitive and proprietary information from being disclosed to unauthorized parties." },
  { name: "Governing Law", info: "Specifies the state or jurisdiction whose laws will govern the agreement." },
  { name: "Entire Agreement", info: "States that the written contract represents the full and final understanding between parties, overriding prior documents." },
  { name: "Termination", info: "Describes when and how the agreement can be ended by either party." },
  { name: "Force Majeure", info: "Protects parties from liability when unforeseen events prevent contract performance." },
  { name: "Dispute Resolution", info: "Outlines the method for resolving disputes, such as mediation, arbitration, or court litigation." },
  { name: "Assignment", info: "Prevents or permits the transfer of contractual rights or obligations to another party." },
  { name: "Non-Solicitation", info: "Restricts a party from soliciting employees, clients, or business contacts of the other party." },
  { name: "Non-Compete", info: "Prevents one party from engaging in competing business activities for a defined period." },
  { name: "Severability", info: "Specifies that invalid portions of the contract do not affect the enforceability of the remaining provisions." },
  { name: "Notices", info: "Describes how official communications should be sent and received between parties." },
  { name: "Warranties", info: "Provides assurances about the accuracy of information, performance, or obligations." },
  { name: "Liability", info: "Defines the limits of responsibility for damages or losses incurred during the contract." },
  { name: "IP Ownership", info: "Clarifies which party owns intellectual property created before or during the agreement." },
  { name: "Return of Materials", info: "Requires confidential materials to be returned or destroyed upon termination." },
  { name: "Amendment", info: "Specifies that any changes to the agreement must be written and signed by both parties." },
  { name: "Publicity", info: "Restricts disclosure of the partnership or agreement in public communications without consent." },
  { name: "Relationship of Parties", info: "Clarifies whether parties are independent contractors, partners, or in another relationship." },
  { name: "Survival", info: "Identifies clauses that remain in force even after the agreement ends." },
  { name: "Waiver", info: "States that failure to enforce a clause does not constitute permanent waiver of rights." },
  { name: "Audit Rights", info: "Allows one party to review the other party’s records for compliance with the agreement." },
  { name: "Data Protection", info: "Ensures compliance with data privacy regulations and outlines how personal data must be handled." },
  { name: "Delegation", info: "Controls whether a party can delegate its responsibilities to a third party." },
  { name: "Payment Terms", info: "Defines payment amounts, schedules, penalties, and invoicing requirements." },
  { name: "Obligations of Parties", info: "Lists the duties and responsibilities each party must fulfill under the agreement." },
  { name: "Exclusions", info: "Specifies information or actions that are not covered by the agreement." },
  { name: "Definitions", info: "Provides meanings for key terminology used in the contract to avoid ambiguity." }
];

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const [results, setResults] = useState(null); // result object returned by backend
  const [activeTab, setActiveTab] = useState("upload"); // upload | docs | analytics | risk | guide
  const [selectedDocName, setSelectedDocName] = useState(null);
  

  const theme = {
    background: darkMode ? "#101215" : "#f5f7fb",
    text: darkMode ? "#e7eef8" : "#111827",
    card: darkMode ? "#151617" : "#fff",
    border: darkMode ? "#2b2b2b" : "#e6e9ef",
  };

  const handleLogin = () => setIsLoggedIn(true);

  const handleLogout = () => {
    setIsLoggedIn(false);
    setResults(null);
    setSelectedDocName(null);
    setActiveTab("upload");
  };

  const handleResults = (data) => {
    setResults(data);
    const filename =
      data?.document?.title || data?.document?.file?.split("/").pop() || "Uploaded Document";
    setSelectedDocName(filename);
    setActiveTab("upload");
    
  };

  const openDocument = async (id) => {
    const data = await getDocument(id);
    setResults(data);
    const filename =
      data?.document?.title || data?.document?.file?.split("/").pop() || "Uploaded Document";
    setSelectedDocName(filename);
    setActiveTab("upload");
    
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!isLoggedIn) {
    // login page (keeps gradient background as per your earlier request)
    return <Login onLogin={handleLogin} />;
  }

  // helper to style sidebar buttons with active state
  const sbButton = (active) => ({
    padding: "10px",
    borderRadius: 8,
    border: "none",
    cursor: "pointer",
    textAlign: "left",
    fontWeight: 700,
    background: active ? "#0d6efd" : theme.card,
    color: active ? "white" : theme.text,
    transition: "all .15s ease",
  });

  return (
    <div style={{ display: "flex", height: "100vh", background: theme.background, color: theme.text }}>
      {/* Sidebar */}
      <aside
        style={{
          width: sidebarCollapsed ? 72 : 240,
          background: darkMode ? "#0f1720" : "#fff",
          borderRight: `1px solid ${theme.border}`,
          padding: "18px 12px",
          transition: "width .2s ease",
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}
      >
        <div style={{ display: "flex", justifyContent: sidebarCollapsed ? "center" : "space-between", alignItems: "center" }}>
          <div style={{ fontWeight: 800, fontSize: 16 }}>{sidebarCollapsed ? "ND" : "NDA Analyzer"}</div>
          {!sidebarCollapsed && (
            <button
              onClick={() => setSidebarCollapsed(true)}
              style={{ background: "transparent", border: "none", color: theme.text, cursor: "pointer" }}
              title="Collapse"
            >
              ⇤
            </button>
          )}
          {sidebarCollapsed && (
            <button
              onClick={() => setSidebarCollapsed(false)}
              style={{ background: "transparent", border: "none", color: theme.text, cursor: "pointer" }}
              title="Expand"
            >
              ⇥
            </button>
          )}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 6 }}>
          <button onClick={() => { setActiveTab("docs");  }} style={sbButton(activeTab === "docs")}>
            {sidebarCollapsed ? "📂" : "Show Docs"}
          </button>

          <button onClick={() => { setActiveTab("upload"); }} style={sbButton(activeTab === "upload")}>
            {sidebarCollapsed ? "⬆" : "Upload"}
          </button>

          <button onClick={() => setActiveTab("analytics")} style={sbButton(activeTab === "analytics")}>
            {sidebarCollapsed ? "📊" : "Analytics"}
          </button>

          <button onClick={() => setActiveTab("risk")} style={sbButton(activeTab === "risk")}>
            {sidebarCollapsed ? "⚠" : "Document Risk"}
          </button>

          <button onClick={() => setActiveTab("guide")} style={sbButton(activeTab === "guide")}>
            {sidebarCollapsed ? "📘" : "Clause Guide"}
          </button>

          <div style={{ height: 1, background: theme.border, margin: "8px 0" }} />

          <button
            onClick={() => setDarkMode((s) => !s)}
            style={{
              padding: 10,
              borderRadius: 8,
              border: "none",
              cursor: "pointer",
              background: darkMode ? "#222" : "#f1f5f9",
              color: darkMode ? "#fff" : "#0d6efd",
              fontWeight: 700,
            }}
          >
            {sidebarCollapsed ? "🌓" : darkMode ? "Light Mode" : "Dark Mode"}
          </button>

          <button
            onClick={handleLogout}
            style={{
              marginTop: "auto",
              padding: 10,
              borderRadius: 8,
              border: "none",
              cursor: "pointer",
              background: "#ef4444",
              color: "#fff",
              fontWeight: 800,
            }}
          >
            {sidebarCollapsed ? "⎋" : "Logout"}
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main style={{ flex: 1, overflowY: "auto" }}>
        {/* topbar */}
        <div style={{ padding: "16px 22px", borderBottom: `1px solid ${theme.border}`, background: theme.card, position: "sticky", top: 0, zIndex: 10 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ fontWeight: 800, fontSize: 18 }}>NDA Clause Identifier</div>
            <div style={{ display: "flex", gap: 12 }}>
              {/* quick access: show docs + logout (kept for convenience) */}
              <button onClick={() => { setActiveTab("docs"); }} style={{ padding: 8, borderRadius: 8, border: "none", background: "#e7f1ff", color: "#0d6efd", fontWeight: 700, cursor: "pointer" }}>
                Show Uploaded Docs
              </button>
              <button onClick={handleLogout} style={{ padding: 8, borderRadius: 8, border: "none", background: "#ef4444", color: "#fff", fontWeight: 700, cursor: "pointer" }}>
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* content area */}
        <div style={{ padding: 24, display: "grid", gridTemplateColumns: "1fr 360px", gap: 20 }}>
          <div>
            {/* Upload area */}
            <div style={{ background: theme.card, borderRadius: 12, padding: 16, boxShadow: darkMode ? "none" : "0 6px 18px rgba(15,23,42,0.04)" }}>
              <UploadForm onResults={handleResults} darkMode={darkMode} />
            </div>

            {/* conditional panels (Show Docs, Analytics, Risk, Guide) - appear between upload and piechart as you requested */}
            <div style={{ marginTop: 18 }}>
              {activeTab === "docs" && (
                <div style={{ background: theme.card, padding: 16, borderRadius: 12 }}>
                  <DocumentHistory onSelect={openDocument} darkMode={darkMode} />
                </div>
              )}

              {activeTab === "analytics" && (
                <div style={{ background: theme.card, padding: 16, borderRadius: 12 }}>
                  <AnalyticsDashboard results={results} darkMode={darkMode} />
                </div>
              )}

              {activeTab === "risk" && (
                <div style={{ background: theme.card, padding: 16, borderRadius: 12 }}>
                  <RiskDashboard results={results} darkMode={darkMode} />
                </div>
              )}

              {activeTab === "guide" && (
                <div style={{ background: theme.card, padding: 16, borderRadius: 12 }}>
                  <h3 style={{ marginTop: 0 }}>Clause Guide</h3>
                  <div style={{ display: "grid", gap: 12 }}>
                    {CLAUSE_GUIDE.map((c, idx) => (
                      <div key={idx} style={{ padding: 10, border: `1px solid ${theme.border}`, borderRadius: 8 }}>
                        <strong>{c.name}</strong>
                        <p style={{ margin: "6px 0 0", opacity: 0.85 }}>{c.info}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* document title + pie + results layout (pie stays in right column) */}
            {results && (
              <>
                <div style={{ marginTop: 20 }}>
                  <h3 style={{ margin: 0, fontSize: 18, color: theme.text }}>Document: <span style={{ color: "#0d6efd", fontWeight: 800 }}>{selectedDocName}</span></h3>
                </div>

                {/* Results table (full width under upload/panels) */}
                <div style={{ marginTop: 18, background: theme.card, padding: 16, borderRadius: 12 }}>
                  <ResultsTable detections={results.detections} coverage={results.coverage} darkMode={darkMode} />
                </div>
              </>
            )}
          </div>

          {/* Right column: sticky pie chart */}
          <aside style={{ position: "relative" }}>
            {results && (
              <div style={{ position: "sticky", top: 88 }}>
                <div style={{ background: theme.card, padding: 16, borderRadius: 12, boxShadow: darkMode ? "none" : "0 6px 18px rgba(15,23,42,0.04)" }}>
                  <ClausePieChart detections={results.detections} darkMode={darkMode} />
                </div>
              </div>
            )}
          </aside>
        </div>
      </main>
    </div>
  );
}
