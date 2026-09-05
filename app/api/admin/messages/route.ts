import { NextResponse } from "next/server";
import { verifyAdminSession } from "@/lib/auth";
import { supabaseAdmin, isSupabaseConfigured } from "@/lib/supabase";

export async function GET() {
  const isAuth = await verifyAdminSession();
  if (!isAuth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (isSupabaseConfigured && supabaseAdmin) {
    const { data, error } = await supabaseAdmin
      .from("messages")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      return NextResponse.json({ data, source: "database" });
    }
  }

  // Demo messages if database is not yet hooked up
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

    if (isSupabaseConfigured && supabaseAdmin) {
      const { error } = await supabaseAdmin.from("messages").delete().eq("id", id);
      if (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
      }
    }

    return NextResponse.json({ success: true, message: "Message deleted." });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
