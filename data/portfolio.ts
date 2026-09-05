import { PortfolioData } from "@/types/portfolio";

export const portfolioData: PortfolioData = {
  personal: {
    name: "Ahmed Ali Abid",
    role: "Software Engineer | FlutterFlow & Flutter Developer | Team Lead",
    headline: "Building production-grade, cross-platform apps with scalable architecture.",
    shortBio:
      "FlutterFlow and Flutter developer with 3.9+ years of experience engineering production-grade, cross-platform applications with clean UI, scalable backend architecture (Firebase, Supabase), and leading engineering teams.",
    extendedBio: [
      "With 3.9+ years of experience across mobile engineering and technical leadership, I specialize in building production-grade, cross-platform applications with clean UI, scalable backend architecture (Firebase, Supabase), and robust third-party API integrations.",
      "As Team Lead at Patronecs, I successfully pioneered FlutterFlow adoption and scaled the engineering team from 1 to 18+ developers, accelerating project delivery timelines by up to 30% and reducing critical production defects by 40% through strict code quality standards and automated workflows.",
      "My technical expertise spans complex backend solutions, writing custom database scripts, optimizing schemas, deploying secure role-based access control (RBAC), and shipping 15+ high-performance applications from concept to App Store deployment."
    ],
    location: "Sialkot, Pakistan",
    status: "Available for opportunities",
    availableForHire: true,
    email: "ahmedaliabid.work@gmail.com",
    phone: "+92 331 8762726",
    resumeUrl: "#",
    socials: [
      {
        name: "LinkedIn",
        url: "https://linkedin.com/in/ahmed-ali-a-bbaa23199",
        icon: "linkedin"
      },
      {
        name: "Email",
        url: "mailto:ahmedaliabid.work@gmail.com",
        icon: "email"
      },
      {
        name: "Phone",
        url: "tel:+923318762726",
        icon: "phone"
      },
      {
        name: "GitHub",
        url: "https://github.com/ahmedaliabid",
        icon: "github"
      }
    ]
  },

  stats: [
    {
      value: "15+",
      label: "Production Apps Shipped",
      description: "From concept to App Store deployment"
    },
    {
      value: "3.9+",
      label: "Years Experience",
      description: "Flutter, FlutterFlow & backend systems"
    },
    {
      value: "18+",
      label: "Engineers Mentored",
      description: "Scaled team from 1 to 18+ developers"
    },
    {
      value: "15,000+",
      label: "Active Users Served",
      description: "Concurrent users on flagship platforms"
    }
  ],

  about: {
    title: "About Me",
    intro:
      "Hi, I'm Ahmed Ali Abid. I'm a Software Engineer, Flutter & FlutterFlow specialist, and Team Lead based in Sialkot, Pakistan. I bridge the gap between rapid product prototyping and enterprise-grade mobile engineering.",
    whatIBuild:
      "I architect and ship high-performance cross-platform applications across iOS, Android, and Web using Flutter, FlutterFlow, Firebase, and Supabase. From writing custom database scripts, cloud/edge functions, and multi-tenant RBAC policies to integrating complex payment and messaging gateways, I build software that performs reliably at scale.",
    whatICareAbout: [
      {
        title: "Scalable Architecture & Clean DB Design",
        description:
          "Architecting robust Firebase & Supabase backends, optimized PostgreSQL schemas, and low-latency database queries.",
        icon: "layers"
      },
      {
        title: "Pioneering Rapid Mobile Delivery",
        description:
          "Pairing FlutterFlow's visual velocity with custom Dart code actions to cut delivery cycles by up to 30%.",
        icon: "zap"
      },
      {
        title: "Enterprise Security & RBAC",
        description:
          "Strict data encryption, role-based access control, secure JWT storage, and safe financial transaction processing.",
        icon: "shield-check"
      },
      {
        title: "Technical Leadership & Mentorship",
        description:
          "Scaling teams from 1 to 18+ developers, conducting rigorous code reviews, and maintaining a high standard of craftsmanship.",
        icon: "sparkles"
      }
    ],
    currentlyLearning: [
      "Advanced Flutter Architecture & Custom Native Interop",
      "PostgreSQL vector search & AI agent workflows in Supabase",
      "High-concurrency event-driven serverless systems"
    ]
  },

  skills: {
    title: "Skills & Technologies",
    subtitle:
      "A comprehensive overview of my mobile development, backend architecture, security, and team leadership stack.",
    categories: [
      {
        title: "App Development",
        description:
          "Cross-platform mobile applications, custom code actions, clean responsive UI/UX, and App Store deployments.",
        skills: [
          { name: "FlutterFlow", level: "Expert", iconName: "Flame", featured: true },
          { name: "Flutter", level: "Expert", iconName: "Atom", featured: true },
          { name: "Dart", level: "Expert", iconName: "FileCode2", featured: true },
          { name: "Responsive UI/UX", level: "Expert", iconName: "Layout", featured: true },
          { name: "Custom Code Actions", level: "Expert", iconName: "Code2", featured: true },
          { name: "Cross-Platform Deployment", level: "Advanced", iconName: "Globe", featured: false }
        ]
      },
      {
        title: "Backend & Database",
        description:
          "Serverless cloud architecture, real-time database design, edge functions, and relational schema optimization.",
        skills: [
          { name: "Firebase", level: "Expert", iconName: "Flame", featured: true },
          { name: "Supabase", level: "Advanced", iconName: "Database", featured: true },
          { name: "PostgreSQL", level: "Advanced", iconName: "HardDrive", featured: true },
          { name: "SQL Scripting", level: "Advanced", iconName: "Binary", featured: false },
          { name: "Cloud & Edge Functions", level: "Advanced", iconName: "Server", featured: true },
          { name: "Real-Time DB Design", level: "Expert", iconName: "Cpu", featured: false }
        ]
      },
      {
        title: "APIs & Security",
        description:
          "Secure authentication, webhook pipelines, role-based governance, and financial data encryption.",
        skills: [
          { name: "REST API Integration", level: "Expert", iconName: "ArrowLeftRight", featured: true },
          { name: "Webhooks", level: "Advanced", iconName: "Cpu", featured: false },
          { name: "Firebase Auth", level: "Expert", iconName: "ShieldCheck", featured: true },
          { name: "RBAC (Role-Based Access)", level: "Advanced", iconName: "ShieldCheck", featured: true },
          { name: "Data Encryption & JWT", level: "Advanced", iconName: "Binary", featured: false },
          { name: "Secure Storage", level: "Advanced", iconName: "HardDrive", featured: false }
        ]
      },
      {
        title: "Tools & Leadership",
        description:
          "Payment processing, version control, agile workflows, technical mentoring, and performance optimization.",
        skills: [
          { name: "Stripe & RevenueCat", level: "Advanced", iconName: "ArrowLeftRight", featured: true },
          { name: "Git / GitHub", level: "Expert", iconName: "GitBranch", featured: true },
          { name: "Team Leadership & Mentoring", level: "Expert", iconName: "Sparkles", featured: true },
          { name: "Code Review & Standards", level: "Expert", iconName: "ShieldCheck", featured: true },
          { name: "Performance Optimization", level: "Advanced", iconName: "Zap", featured: true },
          { name: "Agile / Scrum", level: "Advanced", iconName: "Box", featured: false }
        ]
      }
    ]
  },

  projects: {
    title: "Selected Work",
    subtitle:
      "A showcase of production-grade mobile applications and platforms engineered from concept to App Store deployment.",
    items: [
      {
        id: "evo-signal",
        title: "EVO SIGNAL — Trading Signals & Real-Time Alerts",
        tagline: "Active Platform • Supporting 15,000+ Concurrent Traders",
        description:
          "Engineered a scalable Firebase architecture and custom APIs supporting 15,000+ concurrent traders with sub-second trading data synchronization. Integrated Brevo automated notification webhooks and deployed strict encryption protocols for sensitive financial data.",
        problemSolved:
          "Delivered ultra-reliable real-time data streaming and instant alert triggers during high-volatility financial market conditions without performance degradation.",
        technologies: ["Flutter", "FlutterFlow", "Firebase", "Cloud Functions", "Brevo API", "Data Encryption"],
        metrics: "15,000+ Active Users • Sub-second sync",
        githubUrl: "https://github.com/ahmedaliabid",
        liveUrl: "https://linkedin.com/in/ahmed-ali-a-bbaa23199",
        image: "/projects/evo-signal.svg",
        featured: true,
        bentoSpan: "large"
      },
      {
        id: "hosar",
        title: "HOSAR — Emergency Safety & Location Sharing",
        tagline: "Outdoor Rescue & Automated Geolocation Tracking",
        description:
          "Architected a real-time multi-user Firebase backend for continuous GPS tracking and precise emergency permission management. Integrated Twilio to dispatch automated SMS emergency alerts with exact GPS coordinates to designated rescue contacts.",
        problemSolved:
          "Engineered reliable offline-resilient coordinate caching and failover SMS delivery under low-connectivity wilderness environments.",
        technologies: ["Flutter", "FlutterFlow", "Firebase", "Twilio SMS", "Geolocation API", "Custom Actions"],
        metrics: "Live GPS Tracking • Automated SMS Safety Alerts",
        githubUrl: "https://github.com/ahmedaliabid",
        liveUrl: "https://linkedin.com/in/ahmed-ali-a-bbaa23199",
        image: "/projects/hosar.svg",
        featured: true,
        bentoSpan: "medium"
      },
      {
        id: "engaged-community",
        title: "ENGAGED COMMUNITY — Multi-Tenant SaaS Platform",
        tagline: "Serverless Architecture & Role-Based Access Control",
        description:
          "Engineered an enterprise multi-tenant community management SaaS utilizing Supabase APIs and serverless Edge Functions. Built complex Row-Level Security (RLS) and RBAC policies to ensure absolute tenant isolation, privacy, and granular permission governance.",
        problemSolved:
          "Partitioned multi-tenant database operations into an isolated, zero-leakage PostgreSQL schema with lightning-fast querying.",
        technologies: ["FlutterFlow", "Supabase", "PostgreSQL", "Edge Functions", "RBAC", "REST APIs"],
        metrics: "Multi-Tenant Isolation • Enterprise RBAC",
        githubUrl: "https://github.com/ahmedaliabid",
        liveUrl: "https://linkedin.com/in/ahmed-ali-a-bbaa23199",
        image: "/projects/engaged.svg",
        featured: false,
        bentoSpan: "medium"
      },
      {
        id: "haikuists",
        title: "HAIKUISTS — Event & Poet Management Platform",
        tagline: "Real-Time Negotiation Pipeline & Native Video Calling",
        description:
          "Built an internal organizer management platform featuring real-time Firebase Firestore messaging and contract negotiation pipelines. Integrated Firebase Cloud Functions to power native, low-latency in-app video calling without external UI dependencies.",
        problemSolved:
          "Unified client negotiation, contract signing, and direct video conferencing into a frictionless, native mobile experience.",
        technologies: ["FlutterFlow", "Flutter", "Firebase Firestore", "Cloud Functions", "Video Calling", "RBAC"],
        metrics: "Real-time Messaging • Native Video Calling",
        githubUrl: "https://github.com/ahmedaliabid",
        liveUrl: "https://linkedin.com/in/ahmed-ali-a-bbaa23199",
        image: "/projects/haikuists.svg",
        featured: false,
        bentoSpan: "large"
      }
    ]
  },

  experience: {
    title: "Professional Experience",
    subtitle: "Track record of technical leadership, rapid delivery, and enterprise mobile engineering.",
    items: [
      {
        id: "exp-1",
        company: "Patronecs",
        position: "Team Lead — Flutter & FlutterFlow Mobile Development",
        period: "12/2023 — Present",
        location: "Sialkot, Pakistan",
        type: "Full-Time",
        current: true,
        description: [
          "Lead technical strategy and pioneered FlutterFlow adoption across the organization, successfully scaling the mobile engineering team from 1 to 18+ developers and accelerating project delivery timelines by up to 30%.",
          "Architected scalable backend solutions across Firebase and Supabase, executing optimized database scripts and refining schema performance to enhance data querying and image loading workflows.",
          "Reduced critical production issues by 40% through rigorous testing standards, code reviews, and mentoring 18+ junior developers on enterprise-grade security and code quality.",
          "Enforced strict UI/UX guidelines across all applications, authoring custom code actions to handle complex logic, asynchronous image downloads, and comprehensive error handling for multi-file upload boundaries.",
          "Maintain a 50/50 split between hands-on engineering and team leadership, contributing code directly to flagship projects while guiding high-level architectural decisions."
        ],
        technologies: [
          "FlutterFlow",
          "Flutter",
          "Dart",
          "Firebase",
          "Supabase",
          "PostgreSQL",
          "Cloud Functions",
          "Team Leadership",
          "Code Review"
        ]
      },
      {
        id: "exp-2",
        company: "Patronecs",
        position: "Software Engineer — Flutter & FlutterFlow Development",
        period: "05/2023 — 12/2023",
        location: "Sialkot, Pakistan",
        type: "Full-Time",
        current: false,
        description: [
          "Developed and shipped multiple high-performance mobile applications utilizing FlutterFlow with robust Firebase and Supabase backends.",
          "Integrated complex REST APIs, inline string manipulations, and third-party payment systems (Stripe, RevenueCat), heavily optimizing apps for production reliability.",
          "Collaborated closely with design and QA teams to convert Figma prototypes into responsive, secure applications with seamless end-user experiences."
        ],
        technologies: [
          "FlutterFlow",
          "Flutter",
          "Firebase",
          "Supabase",
          "Stripe",
          "RevenueCat",
          "REST APIs",
          "Figma"
        ]
      },
      {
        id: "exp-3",
        company: "Patronecs",
        position: "Associate Software Engineer — Flutter Development",
        period: "12/2022 — 05/2023",
        location: "Sialkot, Pakistan",
        type: "Full-Time",
        current: false,
        description: [
          "Joined as the first FlutterFlow developer hired at Patronecs; established foundational mobile development best practices and architecture standards for the company.",
          "Rapidly progressed to Software Engineer by demonstrating high technical capability, code efficiency, and reliable project delivery across production mobile projects."
        ],
        technologies: [
          "Flutter",
          "FlutterFlow",
          "Dart",
          "Mobile UI",
          "State Management",
          "Git"
        ]
      }
    ]
  },

  education: {
    title: "Education & Certifications",
    degrees: [
      {
        id: "edu-1",
        degree: "Bachelor of Science in Software Engineering",
        institution: "University of Sialkot",
        period: "Graduated: 2022",
        honors: "Sialkot, Pakistan",
        highlights: [
          "Core coursework in Software Architecture, Database Systems, Data Structures, and Mobile App Development",
          "Focus on cross-platform application engineering, scalable databases, and software design patterns"
        ]
      }
    ],
    certifications: [
      {
        id: "cert-1",
        title: "FlutterFlow Retail Expert",
        issuer: "FlutterFlow University",
        issueDate: "Certified",
        credentialUrl: "https://linkedin.com/in/ahmed-ali-a-bbaa23199"
      },
      {
        id: "cert-2",
        title: "WordPress Development",
        issuer: "Digiskills",
        issueDate: "2020",
        credentialUrl: "#"
      },
      {
        id: "cert-3",
        title: "Computer Basics",
        issuer: "Theta Solutions",
        issueDate: "2016",
        credentialUrl: "#"
      }
    ]
  },

  github: {
    username: "ahmedaliabid",
    profileUrl: "https://linkedin.com/in/ahmed-ali-a-bbaa23199",
    stats: {
      contributionsPastYear: 1840,
      longestStreak: "52 days",
      totalStars: 215,
      totalPullRequests: 142
    },
    repositories: [
      {
        name: "evo-signal-mobile",
        description: "High-performance trading signals & real-time telemetry app built with FlutterFlow & Firebase.",
        language: "Dart",
        languageColor: "#00B4AB",
        stars: 94,
        forks: 18,
        url: "https://linkedin.com/in/ahmed-ali-a-bbaa23199",
        topics: ["flutterflow", "flutter", "firebase", "realtime", "crypto-signals"]
      },
      {
        name: "supabase-flutter-rbac",
        description: "Multi-tenant community architecture with Supabase Edge Functions and Row-Level Security.",
        language: "Dart",
        languageColor: "#00B4AB",
        stars: 76,
        forks: 12,
        url: "https://linkedin.com/in/ahmed-ali-a-bbaa23199",
        topics: ["supabase", "flutter", "rbac", "postgresql", "edge-functions"]
      },
      {
        name: "hosar-emergency-gps",
        description: "Real-time location sharing and automated Twilio SOS alert dispatcher for outdoor safety.",
        language: "Dart",
        languageColor: "#00B4AB",
        stars: 45,
        forks: 8,
        url: "https://linkedin.com/in/ahmed-ali-a-bbaa23199",
        topics: ["flutter", "twilio-sms", "gps", "emergency-safety"]
      }
    ]
  },

  contact: {
    title: "Let's build something great.",
    subtitle:
      "Have a mobile app, FlutterFlow project, or engineering leadership opportunity in mind? I'd love to connect and discuss how I can help bring your vision to reality.",
    email: "ahmedaliabid.work@gmail.com",
    phone: "+92 331 8762726",
    responseSpeed: "Usually responds within a few hours",
    locationNote: "Based in Sialkot, Pakistan • Available worldwide for remote contracts & full-time roles"
  }
};
