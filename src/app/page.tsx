import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { TrustedBy } from "@/components/sections/TrustedBy";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { ProductShowcase } from "@/components/sections/ProductShowcase";
import { TechStack } from "@/components/sections/TechStack";
import { CaseStudies } from "@/components/sections/CaseStudies";
import { ContactCTA } from "@/components/sections/ContactCTA";

export const metadata: Metadata = {
  title: "Zabnix — Build Faster. Automate Smarter.",
  description:
    "Premium product engineering firm delivering software development, AI automation, ERP systems, and mobile apps for healthcare, pharma, retail, and manufacturing enterprises.",
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustedBy />
      <ServicesGrid />
      <ProductShowcase />
      <TechStack />
      <CaseStudies />
      <ContactCTA />
    </>
  );
}
