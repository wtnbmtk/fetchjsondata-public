import { VITE_API_KEY } from "$env/static/private";
import { error, json } from "@sveltejs/kit";

const endpoint = "https://api.jsonbin.io/v3/b/66b7d1b4acd3cb34a872d091";
const key = VITE_API_KEY;

// GETリクエストの処理
export async function GET() {
  const response = await fetch(`${endpoint}`, {
    method: "GET",
    headers: { "X-Master-Key": key },
  });

  if (!response.ok) {
    throw error(response.status, "Failed to fetch users");
  }

  const data = await response.json();
  const users = data.record.users;
  return json({ users });
}
