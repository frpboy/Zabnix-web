/**
 * Public, factual website content used by the server-side knowledge index.
 * This is deliberately limited to information visible on Zabnix pages.
 */
export const websiteServices = [
  { id: "software", title: "Software Development", description: "Full-stack web and enterprise applications built with Next.js, React, Node.js, and modern cloud infrastructure. Zabnix specializes in high-throughput systems that scale.", deliverables: ["Custom web applications", "API design & microservices", "Legacy system modernization", "SaaS platform development", "DevOps & CI/CD pipelines"] },
  { id: "mobile", title: "Mobile Applications", description: "Cross-platform iOS and Android apps built with Flutter, combining a single codebase with native performance and a polished UI.", deliverables: ["Flutter cross-platform apps", "Native iOS & Android", "App Store / Play Store submission", "Push notifications & analytics", "Offline-first architecture"] },
  { id: "erp", title: "ERP Solutions", description: "Purpose-built enterprise resource planning for healthcare, retail, manufacturing, and logistics, using ZerpAI ERP or custom-built workflows.", deliverables: ["Inventory & procurement", "Finance & accounting modules", "HR & payroll integration", "Multi-branch management", "Real-time dashboards & reports"] },
  { id: "ai", title: "AI & Automation", description: "LLM integrations, intelligent document processing, and end-to-end workflow automation that reduce repetitive work.", deliverables: ["LLM-powered chatbots & assistants", "Document extraction & classification", "Predictive analytics pipelines", "RPA & workflow automation", "AI model fine-tuning"] },
  { id: "consulting", title: "Business Consulting", description: "Technology strategy, architecture reviews, and digital transformation consulting for leadership teams.", deliverables: ["Technical due diligence", "Architecture design sprints", "Technology stack selection", "Build vs. buy analysis", "Team augmentation"] },
  { id: "security", title: "Security & Compliance", description: "HIPAA, GDPR, and SOC 2 compliance engineering with secure-by-default architecture and penetration testing for regulated industries.", deliverables: ["HIPAA compliance audits", "GDPR data mapping & controls", "Penetration testing", "Security code review", "Access control architecture"] },
] as const;

export const publicTeam = [
  { name: "Shabin", role: "CEO", location: "India" },
  { name: "Althaf", role: "UI Engineer", location: "India" },
  { name: "Deepthi", role: "Senior Developer", location: "India" },
  { name: "Rahul", role: "Catalyst", location: "India" },
  { name: "Arun", role: "Junior Developer", location: "India" },
  { name: "Muzamil", role: "Junior Developer", location: "India" },
  { name: "Anshad", role: "Junior Developer", location: "India" },
  { name: "Jinshad", role: "Data Analyst", location: "India" },
  { name: "Sinan", role: "Trainee", location: "India" },
  { name: "Asarudheen", role: "Trainee", location: "India" },
  { name: "Shamil", role: "Trainee", location: "India" },
] as const;

export const companyValues = [
  ["Innovation", "We constantly explore better ways to solve real business problems."],
  ["Integrity", "We believe trust is built through honesty, ownership and accountability."],
  ["Customer Success", "We succeed only when our clients succeed."],
  ["Quality Engineering", "Scalable architecture, clean code and thoughtful engineering define every product."],
  ["Continuous Learning", "We stay curious because technology never stops evolving."],
  ["Transparency", "Open communication creates stronger partnerships."],
  ["Reliability", "We build software businesses can confidently depend on."],
] as const;

export const technologyCategories = [
  ["Frontend", ["Next.js", "React", "TypeScript", "Tailwind CSS"]],
  ["Backend", ["Python", "FastAPI", "Node.js", "Express"]],
  ["Cloud & DevOps", ["AWS", "Vercel", "Docker", "GitHub"]],
  ["AI & Automation", ["OpenAI", "Claude", "Gemini", "LangChain"]],
  ["Mobile", ["React Native", "Flutter", "Expo", "Swift"]],
  ["Data & Storage", ["PostgreSQL", "Redis", "MongoDB", "Supabase"]],
] as const;

export const companyOverview = [
  "Zabnix builds software and digital solutions for modern enterprises.",
  "Its public positioning is: Build Faster. Automate Smarter. Engineering excellence for modern enterprises.",
  "Zabnix offers software development, mobile applications, ERP solutions, AI and automation, business consulting, and security and compliance services.",
  "The company page states 50+ clients across healthcare, ERP and retail; work across India, UAE, KSA and Singapore; and that Zabnix was founded in 2021.",
] as const;

export const publicContactInformation = {
  email: "hello@zabnix.com",
  phone: "+91 98765 43210",
  location: "Kerala, India",
  businessHours: "Monday to Friday, 9 AM to 6 PM IST",
  consultationProcess: [
    "Zabnix reviews a submission within 24 hours.",
    "A free 30-minute discovery call is scheduled.",
    "The client receives a scoped proposal and timeline.",
  ],
} as const;
