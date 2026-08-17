import "server-only";

import { caseStudies, openRoles, products } from "@/lib/data";
import type { PineconeKnowledgeDocument } from "@/lib/pinecone-knowledge";
import { companyOverview, companyValues, publicContactInformation, publicTeam, technologyCategories, websiteServices } from "@/lib/website-knowledge-content";

const list = (label: string, values: readonly string[]) => `${label}:\n${values.map((value) => `- ${value}`).join("\n")}`;

export function getWebsiteKnowledgeDocuments(): PineconeKnowledgeDocument[] {
  return [
    ...products.map((product) => ({ idPrefix: `product:${product.slug}`, documentType: "product" as const, source: "src/lib/data.ts", route: `/products/${product.slug}`, slug: product.slug, category: product.tag, title: product.name, text: [
      `Title: ${product.name}`, "Type: Zabnix Product", `Category: ${product.tag}`, `Summary: ${product.tagline}`, `Description: ${product.description}`,
      list("Features", product.features.map((feature) => `${feature.title}: ${feature.desc}`)), list("Industries", product.industries), list("Specifications", product.specs.map((spec) => `${spec.label}: ${spec.value}`)),
    ].join("\n\n") })),
    ...caseStudies.map((study) => ({ idPrefix: `caseStudy:${study.slug}`, documentType: "caseStudy" as const, source: "src/lib/data.ts", route: `/case-studies/${study.slug}`, slug: study.slug, category: study.industry, title: study.title, text: [
      `Title: ${study.title}`, "Type: Zabnix Case Study", `Industry: ${study.industry}`, `Company: ${study.company}`, `Summary: ${study.problem}`, `Solution: ${study.solution}`,
      list("Results", study.results.map((result) => `${result.value} ${result.label}`)), list("Detailed problem", study.detailedProblem), list("Detailed solution", study.detailedSolution), list("Detailed results", study.detailedResults),
    ].join("\n\n") })),
    ...openRoles.map((role) => ({ idPrefix: `jobRole:${role.slug}`, documentType: "jobRole" as const, source: "src/lib/data.ts", route: `/careers/${role.slug}`, slug: role.slug, category: role.department, title: role.title, text: [
      `Title: ${role.title}`, `Type: Job Role`, `Department: ${role.department}`, `Location: ${role.location}`, `Employment type: ${role.type}`, `Description: ${role.description}`,
      list("Responsibilities", role.responsibilities), list("Requirements", role.requirements),
    ].join("\n\n") })),
    ...websiteServices.map((service) => ({ idPrefix: `service:${service.id}`, documentType: "service" as const, source: "src/app/services/page.tsx", route: `/services#${service.id}`, slug: service.id, category: "Service", title: service.title, text: [
      `Title: ${service.title}`, "Type: Zabnix Service", `Description: ${service.description}`, list("Deliverables", service.deliverables),
    ].join("\n\n") })),
    { idPrefix: "company:overview", documentType: "company" as const, source: "website public positioning", route: "/people", title: "About Zabnix", text: ["Title: About Zabnix", "Type: Company Overview", ...companyOverview].join("\n\n") },
    { idPrefix: "company:people-values", documentType: "company" as const, source: "src/app/people/PeopleClient.tsx", route: "/people", title: "People and Values", text: ["Title: People and Values", "Type: Company Information", list("Public team", publicTeam.map((member) => `${member.name} — ${member.role}, ${member.location}`)), list("Company values", companyValues.map(([title, description]) => `${title}: ${description}`))].join("\n\n") },
    { idPrefix: "company:contact", documentType: "company" as const, source: "src/app/contact/page.tsx", route: "/contact", title: "Contact Information", text: ["Title: Contact Information", "Type: Contact Information", `Email: ${publicContactInformation.email}`, `Phone: ${publicContactInformation.phone}`, `Location: ${publicContactInformation.location}`, `Business hours: ${publicContactInformation.businessHours}`, list("Consultation process", publicContactInformation.consultationProcess)].join("\n\n") },
    { idPrefix: "company:technology-capabilities", documentType: "company" as const, source: "src/components/sections/ServicesTechnologyShowcase.tsx", route: "/services", title: "Technology and Capabilities", text: ["Title: Technology and Capabilities", "Type: Technology and Capabilities", ...technologyCategories.map(([category, technologies]) => list(category, technologies))].join("\n\n") },
  ];
}
