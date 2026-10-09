import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { TechTicker } from "@/components/sections/TechTicker";
import { ProofSection } from "@/components/sections/ProofSection";
import { SelectedWork } from "@/components/sections/SelectedWork";
import { UnderTheHood } from "@/components/sections/UnderTheHood";
import { CurrentlyBuilding } from "@/components/sections/CurrentlyBuilding";
import { AboutSection } from "@/components/sections/AboutSection";
import { PhilosophySection } from "@/components/sections/PhilosophySection";
import { ContactCTA } from "@/components/sections/ContactCTA";

export default function Home() {
  return (
    <div className="relative flex flex-col min-h-screen bg-[#F5F5F0] text-[#050505]">
      {/* Global Aceternity-style Dot Grid Background */}
      <div
        className="fixed inset-0 pointer-events-none z-0 bg-dot-grid"
        style={{
          backgroundSize: "20px 20px",
          backgroundImage:
            "radial-gradient(rgba(5, 5, 5, 0.16) 1.25px, transparent 1.25px)",
        }}
        aria-hidden="true"
      />

      {/* Persistent Sticky Header with Progress Bar */}
      <Header />

      {/* Main Content Area */}
      <main className="relative z-10 flex-1 w-full">
        {/* 04 Hero */}
        <Hero />

        {/* 05 Technology Ticker */}
        <TechTicker />

        {/* 06 Proof Section */}
        <ProofSection />

        {/* 07 Selected Work */}
        <SelectedWork />

        {/* 08 Under the Hood */}
        <UnderTheHood />

        {/* 09 Currently Building */}
        <CurrentlyBuilding />

        {/* 10 About */}
        <AboutSection />

        {/* 11 Engineering Philosophy */}
        <PhilosophySection />

        {/* 12 Contact */}
        <ContactCTA />
      </main>

      {/* 13 Footer */}
      <Footer />
    </div>
  );
}
