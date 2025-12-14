"use client";

import ContactSection from "@/components/landing-page/contact-section";
import { CTASection } from "@/components/landing-page/cta";
import FaqSection from "@/components/landing-page/faq";
import { FeaturesSection } from "@/components/landing-page/features";
import FooterSection from "@/components/landing-page/footer";
import HeroSection from "@/components/landing-page/hero";
import PricingSection from "@/components/landing-page/pricing-section";

export default function Home() {
  return (
    <div className="space-y-20">
      <HeroSection />
      <FeaturesSection />
      <PricingSection />
      <FaqSection />
      <ContactSection />
      <CTASection />
      <FooterSection />
    </div>
  );
}
