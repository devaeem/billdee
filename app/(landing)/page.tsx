"use client";

import Header from "./components/header";
import { HeroSection } from "./components/hero-section";
import { FeaturesSection } from "./components/features-section";
import { FAQSection } from "./components/faq-section";
import { ReviewsSection } from "./components/reviews-section";
import { Footer } from "./components/footer";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <FeaturesSection />
        <ReviewsSection />
        <FAQSection />
      </main>
      <Footer />
    </div>
  );
}
