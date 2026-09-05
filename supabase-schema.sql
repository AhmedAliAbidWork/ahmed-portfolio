-- ==============================================================================
-- Supabase Database Schema & Seed Data for Ahmed Ali Abid's Portfolio
-- Run this in your Supabase Project: Dashboard > SQL Editor > New query > Run
-- ==============================================================================

-- 1. Projects Table
CREATE TABLE IF NOT EXISTS public.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  tagline TEXT,
  description TEXT NOT NULL,
  problem_solved TEXT,
  technologies TEXT[] DEFAULT '{}',
  metrics TEXT,
  github_url TEXT DEFAULT '',
  live_url TEXT DEFAULT '',
  image_url TEXT NOT NULL,
  featured BOOLEAN DEFAULT false,
  bento_span TEXT DEFAULT 'medium',
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Experience Table
CREATE TABLE IF NOT EXISTS public.experience (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company TEXT NOT NULL,
  position TEXT NOT NULL,
  period TEXT NOT NULL,
  location TEXT,
  type TEXT DEFAULT 'Full-Time',
  description TEXT[] DEFAULT '{}',
  technologies TEXT[] DEFAULT '{}',
  is_current BOOLEAN DEFAULT false,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Skills Table
CREATE TABLE IF NOT EXISTS public.skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category TEXT NOT NULL,
  name TEXT NOT NULL,
  level TEXT DEFAULT 'Expert',
  icon_name TEXT DEFAULT 'Code2',
  featured BOOLEAN DEFAULT false,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 4. Messages (Contact inquiries) Table
CREATE TABLE IF NOT EXISTS public.messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT DEFAULT '',
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experience ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

-- Public read access policies
CREATE POLICY "Allow public read access on projects" ON public.projects FOR SELECT USING (true);
CREATE POLICY "Allow public read access on experience" ON public.experience FOR SELECT USING (true);
CREATE POLICY "Allow public read access on skills" ON public.skills FOR SELECT USING (true);

-- Public write access on messages (for website visitors to contact you)
CREATE POLICY "Allow public insert on messages" ON public.messages FOR INSERT WITH CHECK (true);

-- Full access for service role (admin API routes)
CREATE POLICY "Service role full access on projects" ON public.projects USING (auth.jwt() ->> 'role' = 'service_role');
CREATE POLICY "Service role full access on experience" ON public.experience USING (auth.jwt() ->> 'role' = 'service_role');
CREATE POLICY "Service role full access on skills" ON public.skills USING (auth.jwt() ->> 'role' = 'service_role');
CREATE POLICY "Service role full access on messages" ON public.messages USING (auth.jwt() ->> 'role' = 'service_role');

-- ==============================================================================
-- Initial Seed Data: Populating your real projects, experience & skills
-- ==============================================================================

-- Seed Projects
INSERT INTO public.projects (slug, title, tagline, description, problem_solved, technologies, metrics, github_url, live_url, image_url, featured, bento_span, sort_order)
VALUES 
(
  'evo-signal',
  'EVO SIGNAL — Trading Signals & Real-Time Alerts',
  'Active Platform • Supporting 15,000+ Concurrent Traders',
  'Engineered a scalable Firebase architecture and custom APIs supporting 15,000+ concurrent traders with sub-second trading data synchronization. Integrated Brevo automated notification webhooks and deployed strict encryption protocols for sensitive financial data.',
  'Delivered ultra-reliable real-time data streaming and instant alert triggers during high-volatility financial market conditions without performance degradation.',
  ARRAY['Flutter', 'FlutterFlow', 'Firebase', 'Cloud Functions', 'Brevo API', 'Data Encryption'],
  '15,000+ Active Users • Sub-second sync',
  'https://github.com/ahmedaliabid',
  'https://linkedin.com/in/ahmed-ali-a-bbaa23199',
  '/projects/evo-signal.svg',
  true,
  'large',
  1
),
(
  'hosar',
  'HOSAR — Emergency Safety & Location Sharing',
  'Outdoor Rescue & Automated Geolocation Tracking',
  'Architected a real-time multi-user Firebase backend for continuous GPS tracking and precise emergency permission management. Integrated Twilio to dispatch automated SMS emergency alerts with exact GPS coordinates to designated rescue contacts.',
  'Engineered reliable offline-resilient coordinate caching and failover SMS delivery under low-connectivity wilderness environments.',
  ARRAY['Flutter', 'FlutterFlow', 'Firebase', 'Twilio SMS', 'Geolocation API', 'Custom Actions'],
  'Live GPS Tracking • Automated SMS Safety Alerts',
  'https://github.com/ahmedaliabid',
  'https://linkedin.com/in/ahmed-ali-a-bbaa23199',
  '/projects/hosar.svg',
  true,
  'medium',
  2
),
(
  'engaged-community',
  'ENGAGED COMMUNITY — Multi-Tenant SaaS Platform',
  'Serverless Architecture & Role-Based Access Control',
  'Engineered an enterprise multi-tenant community management SaaS utilizing Supabase APIs and serverless Edge Functions. Built complex Row-Level Security (RLS) and RBAC policies to ensure absolute tenant isolation, privacy, and granular permission governance.',
  'Partitioned multi-tenant database operations into an isolated, zero-leakage PostgreSQL schema with lightning-fast querying.',
  ARRAY['FlutterFlow', 'Supabase', 'PostgreSQL', 'Edge Functions', 'RBAC', 'REST APIs'],
  'Multi-Tenant Isolation • Enterprise RBAC',
  'https://github.com/ahmedaliabid',
  'https://linkedin.com/in/ahmed-ali-a-bbaa23199',
  '/projects/engaged.svg',
  false,
  'medium',
  3
),
(
  'haikuists',
  'HAIKUISTS — Event & Poet Management Platform',
  'Real-Time Negotiation Pipeline & Native Video Calling',
  'Built an internal organizer management platform featuring real-time Firebase Firestore messaging and contract negotiation pipelines. Integrated Firebase Cloud Functions to power native, low-latency in-app video calling without external UI dependencies.',
  'Unified client negotiation, contract signing, and direct video conferencing into a frictionless, native mobile experience.',
  ARRAY['FlutterFlow', 'Flutter', 'Firebase Firestore', 'Cloud Functions', 'Video Calling', 'RBAC'],
  'Real-time Messaging • Native Video Calling',
  'https://github.com/ahmedaliabid',
  'https://linkedin.com/in/ahmed-ali-a-bbaa23199',
  '/projects/haikuists.svg',
  false,
  'large',
  4
)
ON CONFLICT (slug) DO NOTHING;

-- Seed Experience
INSERT INTO public.experience (company, position, period, location, type, description, technologies, is_current, sort_order)
VALUES 
(
  'Patronecs',
  'Team Lead — Flutter & FlutterFlow Mobile Development',
  '12/2023 — Present',
  'Sialkot, Pakistan',
  'Full-Time',
  ARRAY[
    'Lead technical strategy and pioneered FlutterFlow adoption across the organization, successfully scaling the mobile engineering team from 1 to 18+ developers and accelerating project delivery timelines by up to 30%.',
    'Architected scalable backend solutions across Firebase and Supabase, executing optimized database scripts and refining schema performance to enhance data querying and image loading workflows.',
    'Reduced critical production issues by 40% through rigorous testing standards, code reviews, and mentoring 18+ junior developers on enterprise-grade security and code quality.',
    'Enforced strict UI/UX guidelines across all applications, authoring custom code actions to handle complex logic, asynchronous image downloads, and comprehensive error handling for multi-file upload boundaries.',
    'Maintain a 50/50 split between hands-on engineering and team leadership, contributing code directly to flagship projects while guiding high-level architectural decisions.'
  ],
  ARRAY['FlutterFlow', 'Flutter', 'Dart', 'Firebase', 'Supabase', 'PostgreSQL', 'Cloud Functions', 'Team Leadership', 'Code Review'],
  true,
  1
),
(
  'Patronecs',
  'Software Engineer — Flutter & FlutterFlow Development',
  '05/2023 — 12/2023',
  'Sialkot, Pakistan',
  'Full-Time',
  ARRAY[
    'Developed and shipped multiple high-performance mobile applications utilizing FlutterFlow with robust Firebase and Supabase backends.',
    'Integrated complex REST APIs, inline string manipulations, and third-party payment systems (Stripe, RevenueCat), heavily optimizing apps for production reliability.',
    'Collaborated closely with design and QA teams to convert Figma prototypes into responsive, secure applications with seamless end-user experiences.'
  ],
  ARRAY['FlutterFlow', 'Flutter', 'Firebase', 'Supabase', 'Stripe', 'RevenueCat', 'REST APIs', 'Figma'],
  false,
  2
),
(
  'Patronecs',
  'Associate Software Engineer — Flutter Development',
  '12/2022 — 05/2023',
  'Sialkot, Pakistan',
  'Full-Time',
  ARRAY[
    'Joined as the first FlutterFlow developer hired at Patronecs; established foundational mobile development best practices and architecture standards for the company.',
    'Rapidly progressed to Software Engineer by demonstrating high technical capability, code efficiency, and reliable project delivery across production mobile projects.'
  ],
  ARRAY['Flutter', 'FlutterFlow', 'Dart', 'Mobile UI', 'State Management', 'Git'],
  false,
  3
);

-- Seed Skills
INSERT INTO public.skills (category, name, level, icon_name, featured, sort_order)
VALUES
('App Development', 'FlutterFlow', 'Expert', 'Flame', true, 1),
('App Development', 'Flutter', 'Expert', 'Atom', true, 2),
('App Development', 'Dart', 'Expert', 'FileCode2', true, 3),
('App Development', 'Responsive UI/UX', 'Expert', 'Layout', true, 4),
('App Development', 'Custom Code Actions', 'Expert', 'Code2', true, 5),
('App Development', 'Cross-Platform Deployment', 'Advanced', 'Globe', false, 6),

('Backend & Database', 'Firebase', 'Expert', 'Flame', true, 7),
('Backend & Database', 'Supabase', 'Advanced', 'Database', true, 8),
('Backend & Database', 'PostgreSQL', 'Advanced', 'HardDrive', true, 9),
('Backend & Database', 'SQL Scripting', 'Advanced', 'Binary', false, 10),
('Backend & Database', 'Cloud & Edge Functions', 'Advanced', 'Server', true, 11),
('Backend & Database', 'Real-Time DB Design', 'Expert', 'Cpu', false, 12),

('APIs & Security', 'REST API Integration', 'Expert', 'ArrowLeftRight', true, 13),
('APIs & Security', 'Webhooks', 'Advanced', 'Cpu', false, 14),
('APIs & Security', 'Firebase Auth', 'Expert', 'ShieldCheck', true, 15),
('APIs & Security', 'RBAC (Role-Based Access)', 'Advanced', 'ShieldCheck', true, 16),
('APIs & Security', 'Data Encryption & JWT', 'Advanced', 'Binary', false, 17),
('APIs & Security', 'Secure Storage', 'Advanced', 'HardDrive', false, 18),

('Tools & Leadership', 'Stripe & RevenueCat', 'Advanced', 'ArrowLeftRight', true, 19),
('Tools & Leadership', 'Git / GitHub', 'Expert', 'GitBranch', true, 20),
('Tools & Leadership', 'Team Leadership & Mentoring', 'Expert', 'Sparkles', true, 21),
('Tools & Leadership', 'Code Review & Standards', 'Expert', 'ShieldCheck', true, 22),
('Tools & Leadership', 'Performance Optimization', 'Advanced', 'Zap', true, 23),
('Tools & Leadership', 'Agile / Scrum', 'Advanced', 'Box', false, 24);
