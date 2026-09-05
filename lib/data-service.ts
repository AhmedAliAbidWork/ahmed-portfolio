import { supabase, supabaseAdmin, isSupabaseConfigured } from "@/lib/supabase";
import { portfolioData } from "@/data/portfolio";
import { ProjectItem, ExperienceItem, SkillCategory } from "@/types/portfolio";

export async function getProjects(): Promise<ProjectItem[]> {
  const client = supabaseAdmin || supabase;
  if (!isSupabaseConfigured || !client) {
    return portfolioData.projects.items;
  }

  try {
    const { data, error } = await client
      .from("projects")
      .select("*")
      .order("sort_order", { ascending: true });

    if (error) {
      console.error("Error fetching projects from Supabase:", error.message || error);
      return portfolioData.projects.items;
    }

    if (!data || data.length === 0) {
      return portfolioData.projects.items;
    }

    return data.map((item) => ({
      id: item.slug || item.id,
      title: item.title,
      tagline: item.tagline || "",
      description: item.description || "",
      problemSolved: item.problem_solved || "",
      technologies: Array.isArray(item.technologies)
        ? item.technologies
        : typeof item.technologies === "string"
        ? item.technologies.split(",").map((t: string) => t.trim())
        : [],
      metrics: item.metrics || "",
      githubUrl: item.github_url || "",
      liveUrl: item.live_url || "",
      image: item.image_url || "/projects/evo-signal.svg",
      featured: Boolean(item.featured),
      bentoSpan: (item.bento_span as "large" | "medium" | "tall") || "medium",
    }));
  } catch (err) {
    console.error("Error fetching projects from Supabase:", err);
    return portfolioData.projects.items;
  }
}

export async function getExperience(): Promise<ExperienceItem[]> {
  const client = supabaseAdmin || supabase;
  if (!isSupabaseConfigured || !client) {
    return portfolioData.experience.items;
  }

  try {
    const { data, error } = await client
      .from("experience")
      .select("*")
      .order("sort_order", { ascending: true });

    if (error || !data || data.length === 0) {
      return portfolioData.experience.items;
    }

    return data.map((item) => ({
      id: item.id,
      company: item.company,
      position: item.position,
      period: item.period,
      location: item.location || "",
      type: item.type || "Full-Time",
      description: Array.isArray(item.description)
        ? item.description
        : typeof item.description === "string"
        ? [item.description]
        : [],
      technologies: Array.isArray(item.technologies)
        ? item.technologies
        : typeof item.technologies === "string"
        ? item.technologies.split(",").map((t: string) => t.trim())
        : [],
      current: Boolean(item.is_current),
    }));
  } catch (err) {
    console.error("Error fetching experience from Supabase:", err);
    return portfolioData.experience.items;
  }
}

export async function getSkillsCategories(): Promise<SkillCategory[]> {
  if (!isSupabaseConfigured || !supabase) {
    return portfolioData.skills.categories;
  }

  try {
    const { data, error } = await supabase
      .from("skills")
      .select("*")
      .order("sort_order", { ascending: true });

    if (error || !data || data.length === 0) {
      return portfolioData.skills.categories;
    }

    // Group skills by category
    const categoryMap: Record<string, SkillCategory> = {};

    portfolioData.skills.categories.forEach((cat) => {
      categoryMap[cat.title] = {
        title: cat.title,
        description: cat.description,
        skills: [],
      };
    });

    data.forEach((skill) => {
      const catTitle = skill.category;
      if (!categoryMap[catTitle]) {
        categoryMap[catTitle] = {
          title: catTitle,
          description: `${catTitle} technologies and frameworks.`,
          skills: [],
        };
      }
      categoryMap[catTitle].skills.push({
        name: skill.name,
        level: skill.level || "Advanced",
        iconName: skill.icon_name || "Code2",
        featured: Boolean(skill.featured),
      });
    });

    return Object.values(categoryMap);
  } catch (err) {
    console.error("Error fetching skills from Supabase:", err);
    return portfolioData.skills.categories;
  }
}
