import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { TrustSection } from "@/components/sections/TrustSection";
import { StatsSection } from "@/components/sections/StatsSection";
import { TrustedBy } from "@/components/sections/TrustedBy";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { ProductShowcase } from "@/components/sections/ProductShowcase";
import { TechStack } from "@/components/sections/TechStack";
import { CaseStudies } from "@/components/sections/CaseStudies";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { RevealSection } from "@/components/ui/RevealSection";

export const metadata: Metadata = {
  title: "Zabnix — Build Faster. Automate Smarter.",
  description:
    "Premium product engineering firm delivering software development, AI automation, ERP systems, and mobile apps for healthcare, pharma, retail, and manufacturing enterprises.",
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <RevealSection><TrustSection /></RevealSection>
      <RevealSection><StatsSection /></RevealSection>
      <RevealSection><TrustedBy /></RevealSection>
      <RevealSection><ServicesGrid /></RevealSection>
      <ProductShowcase />
      <RevealSection><TechStack /></RevealSection>
      <RevealSection><CaseStudies /></RevealSection>
      <RevealSection><ContactCTA /></RevealSection>
    </>
  );
}
