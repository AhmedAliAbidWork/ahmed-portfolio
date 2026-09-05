import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { portfolioData } from "@/data/portfolio";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const { personal } = portfolioData;
const cleanName = personal.name.replace("[PLACEHOLDER] ", "");
const cleanRole = personal.role.replace("[PLACEHOLDER] ", "");

export const viewport: Viewport = {
  themeColor: "#08090E",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: `${cleanName} — ${cleanRole}`,
  description: `${personal.shortBio}`,
  keywords: [
    "Ahmed Ali Abid",
    "Flutter Developer",
    "FlutterFlow Developer",
    "Team Lead",
    "Software Engineer",
    "Firebase",
    "Supabase",
    "Cross-Platform Apps",
    "Mobile Engineer",
    "Sialkot Pakistan",
  ],
  authors: [{ name: cleanName, url: personal.socials[0]?.url }],
  creator: cleanName,
  metadataBase: new URL("https://ahmedaliabid.dev"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ahmedaliabid.dev",
    title: `${cleanName} — ${cleanRole}`,
    description: personal.shortBio,
    siteName: `${cleanName} Portfolio`,
    images: [
      {
        url: "/projects/evo-signal.svg",
        width: 1200,
        height: 630,
        alt: `${cleanName} Portfolio Showcase`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${cleanName} — ${cleanRole}`,
    description: personal.shortBio,
    images: ["/projects/evo-signal.svg"],
    creator: "@ahmedaliabid",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} scroll-smooth dark`}
    >
      <body className="min-h-screen bg-[#08090E] text-slate-100 selection:bg-cyan-500/20 selection:text-cyan-200 antialiased font-sans">
        {children}
      </body>
    </html>
  );
}
