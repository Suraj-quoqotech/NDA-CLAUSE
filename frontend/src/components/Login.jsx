// src/components/Login.jsx
import { useState } from "react";

export default function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // simple POC credentials; change as required
    if (username === "admin" && password === "admin123") {
      setError("");
      onLogin();
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(180deg,#0d47a1 0%, #d4dce4ff 100%)",
        padding: 20,
      }}
    >
      <div
        style={{
          width: 380,
          borderRadius: 12,
          background: "white",
          boxShadow: "0 8px 30px rgba(2,6,23,0.18)",
          overflow: "hidden",
        }}
      >
        {/* small decorative header bar */}
        <div
          style={{
            height: 120,
            background:
              "linear-gradient(180deg, rgba(231, 234, 238, 0.9), rgba(224, 229, 240, 0.75))",
          }}
        />

        <div style={{ padding: "28px 28px 32px 28px", textAlign: "center" }}>
          <h2 style={{ margin: 0, color: "#0d6efd", fontWeight: 800 }}>
            Login Page
          </h2>

          <form onSubmit={handleSubmit} style={{ marginTop: 18 }}>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              style={{
                width: "100%",
                padding: "10px 12px",
                marginBottom: 12,
                borderRadius: 6,
                border: "1px solid #d1d5db",
                outline: "none",
                boxSizing: "border-box",
              }}
            />

            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              type="password"
              style={{
                width: "100%",
                padding: "10px 12px",
                marginBottom: 12,
                borderRadius: 6,
                border: "1px solid #d1d5db",
                outline: "none",
                boxSizing: "border-box",
              }}
            />

            {error && (
              <div style={{ color: "#dc2626", marginBottom: 10 }}>{error}</div>
            )}

            <button
              type="submit"
              style={{
                width: 120,
                height: 40,
                borderRadius: 20,
                border: "none",
                background:
                  "linear-gradient(90deg, #3e6db4ff 0%, #3b82f6 100%)",
                color: "white",
                fontWeight: 700,
                cursor: "pointer",
                boxShadow: "0 8px 18px rgba(13,110,253,0.18)",
              }}
            >
              Login
            </button>
          </form>

          <div style={{ marginTop: 14, color: "#6b7280", fontSize: 13 }}>
            Secure access to NDA Clause Identifier
          </div>
        </div>
      </div>
    </div>
  );
}





