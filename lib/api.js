const API_BASE_URL = "https://your-backend-app.onrender.com/api";

// Fetch all results
export async function getAllResults() {
  const res = await fetch(`${API_BASE_URL}/results`);
  return res.json();
}

// Fetch all fixtures (optional)
export async function getFixtures() {
  const res = await fetch(`${API_BASE_URL}/fixtures`);
  return res.json();
}
