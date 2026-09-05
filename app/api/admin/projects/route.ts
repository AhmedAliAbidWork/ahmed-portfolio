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
      .from("projects")
      .select("*")
      .order("sort_order", { ascending: true });

    if (!error && data) {
      return NextResponse.json({ data, source: "database" });
    }
  }

  return NextResponse.json({ 
    data: portfolioData.projects.items.map((item, idx) => ({
      id: item.id,
      slug: item.id,
      title: item.title,
      tagline: item.tagline,
      description: item.description,
      problem_solved: item.problemSolved,
      technologies: item.technologies,
      metrics: item.metrics,
      github_url: item.githubUrl,
      live_url: item.liveUrl,
      image_url: item.image,
      featured: item.featured,
      bento_span: item.bentoSpan,
      sort_order: idx + 1,
    })), 
    source: "fallback" 
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
      title,
      tagline,
      description,
      problem_solved,
      technologies,
      metrics,
      github_url,
      live_url,
      image_url,
      featured,
      bento_span,
      sort_order,
    } = body;

    const slug = (body.slug || title)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    if (isSupabaseConfigured && supabaseAdmin) {
      const { data, error } = await supabaseAdmin
        .from("projects")
        .insert([
          {
            slug,
            title,
            tagline,
            description,
            problem_solved,
            technologies: Array.isArray(technologies) ? technologies : (technologies || "").split(",").map((t: string) => t.trim()),
            metrics,
            github_url,
            live_url,
            image_url: image_url || "/projects/evo-signal.svg",
            featured: Boolean(featured),
            bento_span: bento_span || "medium",
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
      message: "Project created in demo mode. Configure Supabase for persistent cloud storage.",
      data: { slug, title },
    });
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
    const { id, slug, ...updates } = body;

    if (!id && !slug) {
      return NextResponse.json({ error: "Missing project id or slug" }, { status: 400 });
    }

    if (updates.technologies && typeof updates.technologies === "string") {
      updates.technologies = updates.technologies.split(",").map((t: string) => t.trim()).filter(Boolean);
    }
    if (updates.sort_order !== undefined) {
      updates.sort_order = Number(updates.sort_order) || 0;
    }
    if (updates.featured !== undefined) {
      updates.featured = Boolean(updates.featured);
    }

    if (isSupabaseConfigured && supabaseAdmin) {
      const query = id
        ? supabaseAdmin.from("projects").update(updates).eq("id", id)
        : supabaseAdmin.from("projects").update(updates).eq("slug", slug);

      const { data, error } = await query.select();
      if (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
      }
      return NextResponse.json({ success: true, data });
    }

    return NextResponse.json({ success: true, message: "Project updated in demo mode." });
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
    const slug = searchParams.get("slug");

    if (!id && !slug) {
      return NextResponse.json({ error: "Missing project id or slug" }, { status: 400 });
    }

    if (isSupabaseConfigured && supabaseAdmin) {
      const query = id
        ? supabaseAdmin.from("projects").delete().eq("id", id)
        : supabaseAdmin.from("projects").delete().eq("slug", slug);

      const { error } = await query;
      if (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
      }
    }

    return NextResponse.json({ success: true, message: "Project deleted." });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
