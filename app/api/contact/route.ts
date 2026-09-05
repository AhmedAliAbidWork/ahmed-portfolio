import { NextResponse } from "next/server";
import { supabase, supabaseAdmin, isSupabaseConfigured } from "@/lib/supabase";

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

    const client = supabaseAdmin || supabase;

    if (isSupabaseConfigured && client) {
      const { data, error } = await client.from("messages").insert([
        {
          name: name.trim(),
          email: email.trim(),
          subject: (subject || "").trim(),
          message: message.trim(),
          is_read: false,
        },
      ]).select();

      if (error) {
        console.error("Supabase message insert error:", error.message || error);
        return NextResponse.json(
          { error: "Could not save message: " + error.message },
          { status: 500 }
        );
      }

      return NextResponse.json({
        success: true,
        message: "Thank you! Your message has been received.",
        data: data?.[0],
      });
    }

    console.log("Contact submission received (local/demo mode):", {
      name,
      email,
      subject,
      message,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      message: "Thank you! Your message has been received (demo mode).",
    });
  } catch (err: any) {
    console.error("Contact API error:", err);
    return NextResponse.json(
      { error: err.message || "Failed to process message." },
      { status: 500 }
    );
  }
}
