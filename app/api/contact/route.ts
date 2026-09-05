import { NextResponse } from "next/server";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required fields." },
        { status: 400 }
      );
    }

    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.from("messages").insert([
        {
          name: name.trim(),
          email: email.trim(),
          subject: (subject || "").trim(),
          message: message.trim(),
        },
      ]);

      if (error) {
        console.error("Supabase message insert error:", error);
        // Fallback gracefully so visitor gets positive UX
      }
    } else {
      console.log("Contact submission received (local mode):", {
        name,
        email,
        subject,
        message,
        timestamp: new Date().toISOString(),
      });
    }

    return NextResponse.json({
      success: true,
      message: "Thank you! Your message has been received.",
    });
  } catch (err: any) {
    console.error("Contact API error:", err);
    return NextResponse.json(
      { error: err.message || "Failed to process message." },
      { status: 500 }
    );
  }
}
