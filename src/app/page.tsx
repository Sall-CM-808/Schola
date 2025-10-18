import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/ui/HeroSection";
import FeaturesSection from "@/components/ui/FeaturesSection";
// import TeamSection from "@/components/ui/TeamSection";
import PricingSection from "@/components/ui/PricingSection";
import TestimonialsSection from "@/components/ui/TestimonialsSection";
import ContactSection from "@/components/ui/ContactSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0d5a61]">
      <Navbar />
      <main>
        <HeroSection />
        <FeaturesSection />
        <TestimonialsSection />
        <PricingSection />
        <ContactSection />
        {/* <TeamSection /> */}
        
      </main>
      <Footer />
    </div>
  );
}
