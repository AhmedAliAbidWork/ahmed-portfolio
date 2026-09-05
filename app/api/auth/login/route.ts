import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ADMIN_COOKIE_CONFIG } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const { password } = await request.json();
    const expectedPassword = process.env.ADMIN_ACCESS_PASSWORD || "admin123";

    if (!password || password !== expectedPassword) {
      return NextResponse.json(
        { error: "Invalid admin password. Please try again." },
        { status: 401 }
      );
    }

    const cookieStore = await cookies();
    cookieStore.set(ADMIN_COOKIE_CONFIG.name, password, ADMIN_COOKIE_CONFIG.options);

    return NextResponse.json({ success: true, message: "Logged in successfully" });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Authentication error" },
      { status: 500 }
    );
  }
}
