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
    "Autonomous Growth Ecosystems",
    "AI Sales Agents",
    "Figma to Web Conversion",
    "Full Stack Development",
    "Workflow Automation",
    "n8n Automation",
    "AI Content Generation",
    "Agency",
    "TNC Agency",
    "Total Nonstop Creativity",
    "Digital Transformation",
    "SaaS Development"
  ],
  authors: [{ name: "Total Nonstop Creativity" }],
  openGraph: {
    title: "Total Nonstop Creativity | Autonomous Growth Ecosystems & AI Agency",
    description: "Scale your business with AI-powered automation and elite web development. Stop guessing, start dominating.",
    url: "https://totalnonstopcreativity.com",
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
