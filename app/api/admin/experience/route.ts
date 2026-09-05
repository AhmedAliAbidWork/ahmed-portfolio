import { NextResponse } from "next/server";
import { verifyAdminSession } from "@/lib/auth";
import { supabaseAdmin, isSupabaseConfigured } from "@/lib/supabase";
import { portfolioData } from "@/data/portfolio";

export async function GET() {
  const isAuth = await verifyAdminSession();
  if (!isAuth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (isSupabaseConfigured && supabaseAdmin) {
    const { data, error } = await supabaseAdmin
      .from("experience")
      .select("*")
      .order("sort_order", { ascending: true });

    if (!error && data) {
      return NextResponse.json({ data, source: "database" });
    }
  }

  return NextResponse.json({
    data: portfolioData.experience.items.map((item, idx) => ({
      id: item.id,
      company: item.company,
      position: item.position,
      period: item.period,
      location: item.location,
      type: item.type,
      description: item.description,
      technologies: item.technologies,
      is_current: item.current,
      sort_order: idx + 1,
    })),
    source: "fallback",
  });
}

export async function POST(request: Request) {
  const isAuth = await verifyAdminSession();
  if (!isAuth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const {
      company,
      position,
      period,
      location,
      type,
      description,
      technologies,
      is_current,
      sort_order,
    } = body;

    if (isSupabaseConfigured && supabaseAdmin) {
      const { data, error } = await supabaseAdmin
        .from("experience")
        .insert([
          {
            company,
            position,
            period,
            location,
            type: type || "Full-Time",
            description: Array.isArray(description) ? description : (description || "").split("\n").filter(Boolean),
            technologies: Array.isArray(technologies) ? technologies : (technologies || "").split(",").map((t: string) => t.trim()),
            is_current: Boolean(is_current),
            sort_order: Number(sort_order) || 0,
          },
        ])
        .select();

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
      }

      return NextResponse.json({ success: true, data: data[0] });
    }

    return NextResponse.json({
      success: true,
      message: "Experience saved in demo mode.",
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
      return NextResponse.json({ error: "Missing experience id" }, { status: 400 });
    }

    if (isSupabaseConfigured && supabaseAdmin) {
      const { error } = await supabaseAdmin.from("experience").delete().eq("id", id);
      if (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
      }
    }

    return NextResponse.json({ success: true, message: "Experience record deleted." });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
