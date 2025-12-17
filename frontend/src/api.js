// src/api.js
const BASE_URL = "http://localhost:8000"; // Django backend

export async function uploadDocument(file, title) {
  const form = new FormData();
  form.append("file", file);
  form.append("title", title);

  const res = await fetch("http://localhost:8000/api/analyze/", {
    method: "POST",
    body: form,
  });

  if (!res.ok) throw new Error("Failed to upload");
  return res.json();
}

export const getProgress = async (id) => {
  const res = await fetch(`/api/progress/${id}/`);
  if (!res.ok) throw new Error("Progress fetch failed");
  return res.json();
};


export async function getDocument(id) {
  const res = await fetch(`${BASE_URL}/api/documents/${id}/`);
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Fetch failed: ${errorText}`);
  }
  return res.json();
}

export async function getAllDocuments() {
  const res = await fetch("http://localhost:8000/api/documents");
  if (!res.ok) throw new Error("Failed to load documents");
  return res.json();
}
