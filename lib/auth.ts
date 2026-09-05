import { cookies } from "next/headers";

const ADMIN_COOKIE_NAME = "portfolio_admin_token";
const DEFAULT_SECRET = "admin123";

export async function verifyAdminSession(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  const expectedPassword = process.env.ADMIN_ACCESS_PASSWORD || DEFAULT_SECRET;

  if (!token) return false;
  return token === expectedPassword;
}

export const ADMIN_COOKIE_CONFIG = {
  name: ADMIN_COOKIE_NAME,
  options: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/",
  },
};
