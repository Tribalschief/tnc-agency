import AvatarInterface from "@/components/AvatarInterface";
import { FloatingBookButton } from "@/components/FloatinBookButton";
import HeroSection from "@/components/HeroSection";
import { ImageSection } from "@/components/ImageSection";
import { ServicesScrollBento } from "@/components/newBento";
import ServiceBento from "@/components/Services";
import ServicesDetails from "@/components/ServicesDetails";


export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Total Nonstop Creativity",
    "image": "https://tnc-agency.vercel.app/og-image.png",
    "description": "Autonomous growth ecosystems, AI sales agents, and high-performance development agency.",
    url: "https://tnc-agency.vercel.app",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Global",
      "addressCountry": "US"
    },
    "service": [
      {
        "@type": "Service",
        "name": "Figma to Web & App Conversion",
        "description": "Pixel-perfect conversion of designs into production-ready apps."
      },
      {
        "@type": "Service",
        "name": "AI Sales Agents & Chatbots",
        "description": "Intelligent conversational agents for 24/7 sales and support."
      },
      {
        "@type": "Service",
        "name": "Full Stack Development",
        "description": "End-to-end web and mobile application development."
      },
      {
        "@type": "Service",
        "name": "Workflow Automation",
        "description": "Custom n8n and office process automation solutions."
      }
    ]
  };

  return (
    <div className="text-center min-h-screen bg-background text-slate-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HeroSection />
      <ImageSection />
      <ServiceBento />
      <ServicesScrollBento />
      <ServicesDetails />
      <AvatarInterface />
      <FloatingBookButton calendlyUrl="https://calendly.com/totalnonstopcreativity/meeting" />
    </div>
  );
}
