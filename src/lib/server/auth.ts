import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// ハッシュ化されたパスワードを生成
export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 10; // ソルトラウンド数
  // bcrypt.hashはPromiseを返すので、awaitを使用して結果を待つ
  return await bcrypt.hash(password, saltRounds);
}

// パスワードの比較
export async function comparePassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  // bcrypt.compareもPromiseを返すので、awaitを使用して結果を待つ
  return await bcrypt.compare(password, hashedPassword);
}

// JWTトークンの生成
export function generateToken(userId: string): string {
  const secret = process.env.JWT_SECRET || "your-secret-key"; // 環境変数から取得
  const expiresIn = "1h"; // トークンの有効期限
  // jwt.signはPromiseを返さないので、awaitは不要
  return jwt.sign({ userId }, secret, { expiresIn });
}
