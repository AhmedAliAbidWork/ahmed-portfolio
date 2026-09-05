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
      .from("skills")
      .select("*")
      .order("sort_order", { ascending: true });

    if (!error && data) {
      return NextResponse.json({ data, source: "database" });
    }
  }

  const flatSkills = portfolioData.skills.categories.flatMap((cat) =>
    cat.skills.map((s, idx) => ({
      id: `${cat.title}-${s.name}`,
      category: cat.title,
      name: s.name,
      level: s.level || "Expert",
      icon_name: s.iconName || "Code2",
      featured: s.featured,
      sort_order: idx + 1,
    }))
  );

  return NextResponse.json({ data: flatSkills, source: "fallback" });
}

export async function POST(request: Request) {
  const isAuth = await verifyAdminSession();
  if (!isAuth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { category, name, level, icon_name, featured, sort_order } = body;

    if (!category || !name) {
      return NextResponse.json({ error: "Category and Name are required" }, { status: 400 });
    }

    if (isSupabaseConfigured && supabaseAdmin) {
      const { data, error } = await supabaseAdmin
        .from("skills")
        .insert([
          {
            category,
            name,
            level: level || "Expert",
            icon_name: icon_name || "Code2",
            featured: Boolean(featured),
            sort_order: Number(sort_order) || 0,
          },
        ])
        .select();

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
      }

      return NextResponse.json({ success: true, data: data[0] });
    }

    return NextResponse.json({ success: true, message: "Skill added in demo mode." });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const isAuth = await verifyAdminSession();
  if (!isAuth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json({ error: "Missing skill id" }, { status: 400 });
    }

    if (updates.sort_order !== undefined) {
      updates.sort_order = Number(updates.sort_order) || 0;
    }
    if (updates.featured !== undefined) {
      updates.featured = Boolean(updates.featured);
    }

    if (isSupabaseConfigured && supabaseAdmin) {
      const { data, error } = await supabaseAdmin
        .from("skills")
        .update(updates)
        .eq("id", id)
        .select();

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
      }
      return NextResponse.json({ success: true, data });
    }

    return NextResponse.json({ success: true, message: "Skill updated in demo mode." });
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
      return NextResponse.json({ error: "Missing skill id" }, { status: 400 });
    }

    if (isSupabaseConfigured && supabaseAdmin) {
      const { error } = await supabaseAdmin.from("skills").delete().eq("id", id);
      if (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
      }
    }

    return NextResponse.json({ success: true, message: "Skill deleted." });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
