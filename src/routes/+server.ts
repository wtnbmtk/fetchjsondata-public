import { VITE_API_KEY } from "$env/static/private";
import { MASTER_PASSWORD } from "$env/static/private";
import type { JSONBin } from "$lib/server/types";
import { error, json } from "@sveltejs/kit";

const endpoint = "https://api.jsonbin.io/v3/b/66b7d1b4acd3cb34a872d091";
const key = VITE_API_KEY;
const masterPassword = MASTER_PASSWORD;

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

// POSTリクエストでデータを追加
export async function POST({ request }) {
  const { id, name, age } = await request.json();

  if (!(id && name && age)) {
    return json({ success: false, message: "Invalid data" }, { status: 400 });
  }

  const password = request.headers.get("X-Password"); // パスワードをヘッダーから取得

  // パスワードが正しいか確認
  if (password !== masterPassword) {
    return json(
      { success: false, message: "Invalid password" },
      { status: 403 }
    );
  }
  const response = await fetch(endpoint, {
    method: "GET",
    headers: {
      "X-Master-Key": VITE_API_KEY,
    },
  });

  if (!response.ok) {
    throw error(response.status, "Failed to fetch existing users");
  }

  const data = await response.json();
  const users = data.record.users;

  // IDが重複していないか確認
  const existingUser = users.find((user: JSONBin) => user.id === id);
  if (existingUser) {
    return new Response("ID already exists", { status: 409 });
  }

  const updatedUsers = [...users, { id, name, age }];

  const putResponse = await fetch(endpoint, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "X-Master-Key": VITE_API_KEY,
    },
    body: JSON.stringify({ users: updatedUsers }),
  });

  if (!putResponse.ok) {
    throw error(putResponse.status, "Failed to add user");
  }

  return json({ success: true });
}

// DELETEリクエストでデータを削除
export async function DELETE({ request }) {
  const { id } = await request.json();

  if (!id) {
    return json(
      { success: false, message: "User ID is required" },
      { status: 400 }
    );
  }

  const password = request.headers.get("X-Password"); // パスワードをヘッダーから取得

  // パスワードが正しいか確認
  if (password !== masterPassword) {
    return json(
      { success: false, message: "Invalid password" },
      { status: 403 }
    );
  }

  // 現在のユーザーリストを取得
  const getResponse = await fetch(endpoint, {
    method: "GET",
    headers: {
      "X-Master-Key": VITE_API_KEY,
    },
  });

  if (!getResponse.ok) {
    throw error(getResponse.status, "Failed to fetch users");
  }

  const data = await getResponse.json();
  const users = data.record.users;

  // IDが存在しない場合のチェック
  const userToDelete = users.find((user: JSONBin) => user.id === id);
  if (!userToDelete) {
    return new Response("User not found", { status: 404 });
  }

  // 指定されたIDのユーザーを削除
  const updatedUsers = users.filter((user: JSONBin) => user.id !== id);

  // ユーザーリストを更新
  const putResponse = await fetch(endpoint, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "X-Master-Key": VITE_API_KEY,
    },
    body: JSON.stringify({ users: updatedUsers }),
  });

  if (!putResponse.ok) {
    throw error(putResponse.status, "Failed to delete user");
  }

  return json({ success: true });
}
