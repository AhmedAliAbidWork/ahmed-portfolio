import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ADMIN_COOKIE_CONFIG } from "@/lib/auth";

export async function POST() {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_COOKIE_CONFIG.name);
  return NextResponse.json({ success: true, message: "Logged out successfully" });
}
