import { NextResponse } from "next/server";
import { getProjects } from "@/lib/data-service";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const projects = await getProjects();
    return NextResponse.json({ success: true, count: projects.length, data: projects });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
