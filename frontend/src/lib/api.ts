const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export async function getStats() {
  const res = await fetch(`${API_BASE}/api/stats`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch stats");
  return res.json();
}

export async function getRecent() {
  const res = await fetch(`${API_BASE}/api/recent`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch recent scans");
  return res.json();
}

export async function getThreatDistribution() {
  const res = await fetch(`${API_BASE}/api/charts/threat-distribution`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch threat distribution");
  return res.json();
}

export async function getRiskTrend() {
  const res = await fetch(`${API_BASE}/api/charts/risk-trend`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch risk trend");
  return res.json();
}

export async function performScan(formData: FormData) {
  const res = await fetch(`${API_BASE}/api/scan`, {
    method: "POST",
    body: formData,
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "Scan failed");
  }
  return res.json();
}
