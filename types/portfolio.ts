export interface SocialLink {
  name: string;
  url: string;
  icon: "github" | "linkedin" | "twitter" | "email" | "globe" | "phone";
}

export interface StatItem {
  value: string;
  label: string;
  description?: string;
}

export interface SkillItem {
  name: string;
  level?: "Beginner" | "Intermediate" | "Advanced" | "Expert";
  iconName: string;
  featured?: boolean;
}

export interface SkillCategory {
  title: string;
  description: string;
  skills: SkillItem[];
}

export interface ProjectItem {
  id: string;
  title: string;
  tagline: string;
  description: string;
  problemSolved: string;
  technologies: string[];
  metrics?: string;
  githubUrl: string;
  liveUrl: string;
  image: string;
  featured?: boolean;
  bentoSpan?: "large" | "medium" | "tall";
}

export interface ExperienceItem {
  id: string;
  company: string;
  position: string;
  period: string;
  location: string;
  type: "Full-Time" | "Part-Time" | "Contract" | "Open Source";
  description: string[];
  technologies: string[];
  current?: boolean;
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  period: string;
  honors?: string;
  highlights?: string[];
}

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  credentialUrl?: string;
}

export interface GitHubRepo {
  name: string;
  description: string;
  language: string;
  languageColor: string;
  stars: number;
  forks: number;
  url: string;
  topics: string[];
}

export interface PortfolioData {
  personal: {
    name: string;
    role: string;
    headline: string;
    shortBio: string;
    extendedBio: string[];
    location: string;
    status: string;
    availableForHire: boolean;
    email: string;
    phone?: string;
    resumeUrl: string;
    socials: SocialLink[];
  };
  stats: StatItem[];
  about: {
    title: string;
    intro: string;
    whatIBuild: string;
    whatICareAbout: Array<{
      title: string;
      description: string;
      icon: string;
    }>;
    currentlyLearning: string[];
  };
  skills: {
    title: string;
    subtitle: string;
    categories: SkillCategory[];
  };
  projects: {
    title: string;
    subtitle: string;
    items: ProjectItem[];
  };
  experience: {
    title: string;
    subtitle: string;
    items: ExperienceItem[];
  };
  education: {
    title: string;
    degrees: EducationItem[];
    certifications: CertificationItem[];
  };
  github: {
    username: string;
    profileUrl: string;
    stats: {
      contributionsPastYear: number;
      longestStreak: string;
      totalStars: number;
      totalPullRequests: number;
    };
    repositories: GitHubRepo[];
  };
  contact: {
    title: string;
    subtitle: string;
    email: string;
    phone?: string;
    responseSpeed: string;
    locationNote: string;
  };
}
