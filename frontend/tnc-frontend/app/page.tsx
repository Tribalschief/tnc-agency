import AvatarInterface from "@/components/AvatarInterface";
import { FloatingBookButton } from "@/components/FloatinBookButton";
import HeroSection from "@/components/HeroSection";
import { ImageSection } from "@/components/ImageSection";
import { ServicesScrollBento } from "@/components/newBento";
import ServiceBento from "@/components/Services";
import ServicesDetails from "@/components/ServicesDetails";


export default function Home() {
  return (
    <div className="text-center min-h-screen bg-background text-slate-900">
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
