"use client";

import { Header } from "./components/header";
import { Footer } from "./components/footer";
import HeroSection from "./components/hero-section";
import CtaSection from "./components/cta-section";
import PricingSection from "./components/pricing-section";
import FeaturesSection from "./components/features-section";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <FeaturesSection />
        <PricingSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}
