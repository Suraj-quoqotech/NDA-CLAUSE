import { useState } from "react";
import { uploadDocument, getDocument } from "../api";

export default function UploadForm({ onResults }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (!file) return;

    // Empty file check
    if (file.size === 0) {
      alert("Empty file is not supported");
      return;
    }

    setLoading(true);

    try {
      // Upload document
      const { id } = await uploadDocument(file, file.name);

      // Fetch results once processing is complete
      const data = await getDocument(id);
      onResults(data);

      setFile(null);
    } catch (err) {
      console.error(err);
      alert(err.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={submit}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 12,
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 520,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 12,
        }}
      >
        {/* File Picker */}
        <label
          htmlFor="file"
          style={{
            display: "inline-block",
            padding: "10px 18px",
            borderRadius: 10,
            border: "1px dashed rgba(13,110,253,0.22)",
            width: "100%",
            textAlign: "center",
            background: file ? "rgba(13,110,253,0.04)" : "transparent",
            cursor: "pointer",
          }}
        >
          <input
            id="file"
            type="file"
            accept=".pdf,.png,.jpg,.jpeg"
            onChange={(e) => setFile(e.target.files[0])}
            style={{ display: "none" }}
          />
          <div style={{ fontWeight: 600, color: "#0b5ed7" }}>
            {file ? file.name : "Choose a PDF or image file"}
          </div>
          <div style={{ fontSize: 12, color: "#6b7280", marginTop: 6 }}>
            Drag & drop not supported in POC — click to select
          </div>
        </label>

        <div
          style={{
            fontSize: "0.85em",
            color: "#374151",
            fontWeight: 600,
          }}
        >
          *Empty file is not supported
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading || !file}
          style={{
            backgroundColor: loading || !file ? "#8bb8ff" : "#0d6efd",
            color: "white",
            padding: "10px 18px",
            border: "none",
            borderRadius: "8px",
            fontWeight: "700",
            cursor: loading || !file ? "not-allowed" : "pointer",
            width: 220,
          }}
        >
          {loading ? "Processing..." : "Upload & Analyze"}
        </button>

        {loading && (
          <div
            style={{
              marginTop: 8,
              fontWeight: "600",
              color: "#0d6efd",
            }}
          >
            Processing document...
          </div>
        )}
      </div>
    </form>
  );
}
