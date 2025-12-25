import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Total Nonstop Creativity | Autonomous Growth Ecosystems & AI Agency",
  description: "Total Nonstop Creativity (TNC) builds autonomous growth ecosystems, AI sales agents, and high-performance web/app solutions. Transform your business with workflow automation and scalable revenue machines.",
  keywords: [
    // --- BRAND IDENTITY ---
    "TNC Agency",
    "Total Nonstop Creativity",
    "TNC Digital",
    "Autonomous Growth Ecosystems",
    "Digital Transformation Agency",
    "Full Service AI Agency",
    "Growth Architecture Firm",

    // --- AI AGENTS & SALES BOTS (High Value) ---
    "AI Sales Agents",
    "Omnichannel AI Chatbots",
    "VAPI Voice AI Integration",
    "24/7 AI Customer Support",
    "Custom LLM Development",
    "AI Appointment Setting Bot",
    "Voice AI Receptionist",
    "WhatsApp Automation Bot",
    "Instagram DM Automation",
    "Facebook Messenger Sales Bot",
    "AI Lead Qualification",
    "GPT-4o Integration Services",
    "Gemini AI Developers",
    "RAG Pipeline Development",
    "Vector Database Implementation",
    "LangChain Developers",
    "AI SDR Services",
    "Automated Sales Rep",

    // --- WORKFLOW AUTOMATION (n8n Focus) ---
    "Workflow Automation Agency",
    "n8n Developer",
    "n8n Workflow Automation",
    "n8n Consulting",
    "n8n vs Zapier Experts",
    "Business Process Automation",
    "CRM Automation Services",
    "Automated Lead Gen Systems",
    "Zapier Alternative Experts",
    "Office Process Optimization",
    "Revenue Operations Automation",
    "No-Code Automation Agency",
    "Low-Code Integration Specialists",
    "Automated Reporting Dashboards",
    "Slack Automation Bots",
    "Stripe Payment Automation",
    "Client Onboarding Automation",

    // --- WEB & APP DEVELOPMENT (Figma/Stack) ---
    "Figma to Web Conversion",
    "Figma to Next.js",
    "Figma to React Native",
    "Full Stack Development Agency",
    "React Native App Development",
    "SaaS MVP Development",
    "High-Performance Landing Pages",
    "Supabase Architecture",
    "Next.js Enterprise Developers",
    "Scalable Web Applications",
    "Headless CMS Development",
    "Vercel Deployment Experts",
    "Tailwind CSS Designers",
    "Framer Motion Animations",
    "3D Web Experiences",
    "React Three Fiber Developers",
    "Custom CRM Build",
    "Mobile App Development Services",
    "Progressive Web Apps (PWA)",

    // --- MARKETING & GROWTH (Lead Gen) ---
    "AI Content Generation",
    "AI UGC Video Ads",
    "Programmatic SEO Services",
    "Geo-Spatial Marketing",
    "Automated Content Engine",
    "Performance Marketing Automation",
    "Local SEO Domination",
    "Data-Driven Ad Targeting",
    "B2B Lead Scraping Services",
    "LinkedIn Outreach Automation",
    "Cold Email Infrastructure",
    "Google Maps Lead Extraction",
    "High Ticket Lead Generation",
    "Automated Social Media Management",
    "Viral Short Form Content Services",
    "HeyGen Video Automation",

    // --- SPECIFIC OUTCOMES (What CEOs Search) ---
    "Automate Sales Team",
    "Replace Manual Data Entry",
    "Scale Agency Operations",
    "Reduce Customer Support Costs",
    "Increase Conversion Rates",
    "Automate Client Reporting",
    "Digital Ecosystem Architecture",
    "Fractional CTO Services",
    "Tech Stack Consulting",
    "Business Autopilot Systems",

    // --- NICHE TARGETS (For Specific SEO) ---
    "AI for Real Estate",
    "Automation for E-commerce",
    "Marketing Automation for Agencies",
    "SaaS Growth Systems",
    "AI for Law Firms",
    "Dental Practice Automation",
    "High Ticket Sales Automation",
    "Coach and Consultant Automation",
    "Solar Lead Generation Systems"
  ],
  authors: [{ name: "Total Nonstop Creativity" }],
  openGraph: {
    title: "Total Nonstop Creativity | Autonomous Growth Ecosystems & AI Agency",
    description: "Scale your business with AI-powered automation and elite web development. Stop guessing, start dominating.",
    url: "https://tnc-agency.vercel.app",
    siteName: "Total Nonstop Creativity",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Total Nonstop Creativity - AI Growth Agency",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Total Nonstop Creativity | Autonomous Growth Ecosystems & AI Agency",
    description: "Scale your business with AI-powered automation and elite web development.",
    images: ["/og-image.png"],
    creator: "@TNC_Agency",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}

      </body>
    </html>
  );
}
