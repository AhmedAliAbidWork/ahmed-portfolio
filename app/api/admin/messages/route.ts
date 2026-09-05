import { NextResponse } from "next/server";
import { verifyAdminSession } from "@/lib/auth";
import { supabase, supabaseAdmin, isSupabaseConfigured } from "@/lib/supabase";

export async function GET() {
  const isAuth = await verifyAdminSession();
  if (!isAuth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const client = supabaseAdmin || supabase;

  if (isSupabaseConfigured && client) {
    const { data, error } = await client
      .from("messages")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      return NextResponse.json({ data, source: "database" });
    }
    if (error) {
      console.error("Error fetching messages:", error.message || error);
    }
  }

  // Demo messages if database is not yet hooked up or in offline fallback mode
  return NextResponse.json({
    data: [
      {
        id: "msg-demo-1",
        name: "Recruiter / Client Demo",
        email: "recruiter@example.com",
        subject: "Senior Flutter / Team Lead Opportunity",
        message: "Hi Ahmed, we came across your FlutterFlow and scalable Firebase achievements and would love to chat regarding an exciting project!",
        created_at: new Date(Date.now() - 3600000 * 4).toISOString(),
        is_read: false,
      },
    ],
    source: "demo",
  });
}

export async function PATCH(request: Request) {
  const isAuth = await verifyAdminSession();
  if (!isAuth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { id, is_read } = body;

    if (!id) {
      return NextResponse.json({ error: "Missing message id" }, { status: 400 });
    }

    const client = supabaseAdmin || supabase;
    if (isSupabaseConfigured && client) {
      const { data, error } = await client
        .from("messages")
        .update({ is_read: Boolean(is_read) })
        .eq("id", id)
        .select();

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
      }

      return NextResponse.json({ success: true, data: data?.[0] });
    }

    return NextResponse.json({
      success: true,
      message: "Message read status updated (demo mode).",
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const isAuth = await verifyAdminSession();
  if (!isAuth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Missing message id" }, { status: 400 });
    }

    const client = supabaseAdmin || supabase;
    if (isSupabaseConfigured && client) {
      const { error } = await client.from("messages").delete().eq("id", id);
      if (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
      }
    }

    return NextResponse.json({ success: true, message: "Message deleted." });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
