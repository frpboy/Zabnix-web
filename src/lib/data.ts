export interface BlogPost {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  isoDate: string;
  readTime: number;
  gradient: string;
  border: string;
  content: string[];
}

export interface Feature {
  title: string;
  desc: string;
}

export interface Product {
  slug: string;
  tag: string;
  name: string;
  tagline: string;
  description: string;
  gradient: string;
  features: Feature[];
  industries: string[];
  specs: { label: string; value: string }[];
}

export interface JobRole {
  title: string;
  department: string;
  location: string;
  type: string;
  slug: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
}

export interface CaseStudy {
  slug: string;
  industry: string;
  company: string;
  title: string;
  problem: string;
  solution: string;
  results: { iconName: "Clock" | "TrendingUp" | "Users"; value: string; label: string }[];
  gradient: string;
  border: string;
  tag: string;
  detailedProblem: string[];
  detailedSolution: string[];
  detailedResults: string[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: "why-flutter-for-enterprise-mobile",
    category: "Mobile",
    title: "Why We Choose Flutter for Enterprise Mobile Apps in 2025",
    excerpt:
      "After building 20+ cross-platform apps, here's our honest take on Flutter vs React Native vs native — and why Flutter wins for most enterprise use cases.",
    author: "Aditya Menon",
    date: "November 15, 2025",
    isoDate: "2025-11-15",
    readTime: 8,
    gradient: "from-blue-600/20 to-cyan-600/20",
    border: "border-blue-500/15",
    content: [
      "For years, enterprise mobile development was stuck in a false dichotomy: spend double the budget building separate native iOS and Android apps, or compromise on quality and performance by using web-based hybrid wrappers.",
      "Then came cross-platform frameworks like React Native and Flutter. Today, cross-platform isn't just a cost-saving measure — it's the standard. But when building for large enterprises with complex security, legacy integrations, and strict SLA requirements, which tool wins?",
      "In our engineering sprints at Zabnix, Flutter has consistently delivered superior results. Here's why:",
      "1. Pixel-Perfect Performance & Canvas Rendering: Unlike React Native which bridges JS to native OEM components, Flutter compiles directly to ARM machine code and draws every pixel via the Impeller graphics engine. This means your charts, dashboards, and animations run at 60fps or 120fps consistently, regardless of the operating system version.",
      "2. Security and Data Hardening: Flutter compiles code to native binary, making reverse engineering significantly harder compared to JavaScript-based bundles. For our healthcare and pharmacy clients, this provides a vital layer of security out of the box.",
      "3. Unified Ecosystem: With Flutter's single codebase, we can deliver iOS, Android, and web client interfaces from the same repository. This slashes development and testing cycles by 40%, allowing enterprises to go live faster and automate smarter.",
    ],
  },
  {
    slug: "ai-automation-roi-healthcare",
    category: "AI & Automation",
    title: "Calculating Real ROI from AI Automation in Healthcare Operations",
    excerpt:
      "We audited 6 healthcare clients before and after AI automation implementations. The numbers are more nuanced than the hype — and still compelling.",
    author: "Fatima Al-Rashid",
    date: "October 28, 2025",
    isoDate: "2025-10-28",
    readTime: 12,
    gradient: "from-emerald-600/20 to-teal-600/20",
    border: "border-emerald-500/15",
    content: [
      "Artificial Intelligence has dominated tech discussions, but enterprise leadership needs to look past the hype cycle. When implementing AI in critical sectors like healthcare, the metrics must move from 'novelty' to real 'operational return on investment'.",
      "We recently completed a comprehensive audit of six healthcare clients who implemented AI-driven document automation, patient routing, and billing validation via our Healthcare Suite. Here are the core insights:",
      "1. Reduced Administration Overhead: On average, administrative teams spend up to 18 minutes manually processing insurance pre-authorizations. By deploying intelligent document processing (IDP) pipelines using fine-tuned models, pre-auth verification time dropped to under 90 seconds, leading to a 74% reduction in processing costs.",
      "2. Prevention of Billing Leakage: Claim rejections cost clinics millions annually. Our AI validation engine scans medical codes (ICD-10) against payer rules in real-time before submission. Rejected claims decreased by 32% within the first 60 days.",
      "3. Quality of Care Focus: Most importantly, automation returned valuable hours back to clinical staff. Healthcare professionals reported spending 2.5 hours more per shift focusing directly on patient care instead of data entry.",
    ],
  },
  {
    slug: "erp-implementation-mistakes",
    category: "ERP",
    title: "7 ERP Implementation Mistakes That Kill Projects — and How to Avoid Them",
    excerpt:
      "ERP failures are rarely about the software. They're about process, change management, and unrealistic timelines. We've seen it all.",
    author: "Vikram Nair",
    date: "October 10, 2025",
    isoDate: "2025-10-10",
    readTime: 10,
    gradient: "from-violet-600/20 to-indigo-600/20",
    border: "border-violet-500/15",
    content: [
      "An Enterprise Resource Planning (ERP) implementation is one of the most critical and expensive initiatives a company can undertake. Yet, industry statistics consistently show that over 50% of ERP projects experience delays, cost overruns, or complete failure.",
      "Having engineered custom solutions and deployed ZerpAI ERP across manufacturing and distribution channels, we've identified the recurring pitfalls that derail implementations — and the design choices to bypass them.",
      "1. Building for Leadership, Ignoring Operators: If your warehouse staff find the inventory input screen too complicated, they will bypass it. High-fidelity ERPs must prioritize user experience on the floor, not just analytical dashboards for the C-suite.",
      "2. Over-customization: The temptation to replicate every legacy manual process inside a new system leads to bloated codebases that are impossible to upgrade. Leverage standard workflows where possible and reserve custom engineering for your competitive advantages.",
      "3. Inadequate Data Cleansing: Migrating dirty database tables into a new schema guarantees a slow and broken system. Clean your data before you write a single line of migration script.",
    ],
  },
  {
    slug: "next-js-app-router-performance",
    category: "Engineering",
    title: "Next.js App Router: Performance Patterns We Use in Production",
    excerpt:
      "Server Components, streaming, partial prerendering — here's how we actually use the Next.js App Router to hit Lighthouse 95+ on every client site.",
    author: "Priya Sharma",
    date: "September 22, 2025",
    isoDate: "2025-09-22",
    readTime: 14,
    gradient: "from-orange-600/20 to-amber-600/20",
    border: "border-orange-500/15",
    content: [
      "Hype is cheap. Lighthouse scores are real. To maintain our standard of delivering premium, high-performance web products, we have optimized our Next.js architecture around the core primitives of React Server Components (RSC).",
      "Next.js App Router is a powerful foundation, but default behaviors can easily lead to layout shifts, heavy hydration payloads, and slow TTFB if not handled carefully.",
      "1. Server-First Mentality: Keep your state local and interactive. Wrap only the atomic elements (like a search bar or collapsible sidebar) in client components. The main shell, layout, and copy should remain zero-JS server HTML.",
      "2. Streaming and Suspense boundaries: Never let a slow database query block page load. Use Suspense to render shell skeletons instantly while data streams in over the edge.",
      "3. Resource Pre-loading and pre-connection: Ensure critical fonts and scripts are preloaded and external CDN endpoints have preconnect links to save precious milliseconds during DNS resolution.",
    ],
  },
];

export const products: Product[] = [
  {
    slug: "zerpai",
    tag: "ERP Platform",
    name: "ZerpAI ERP",
    tagline: "The intelligent ERP for modern operations.",
    description:
      "ZerpAI combines enterprise resource planning with AI-powered insights — giving operations teams real-time visibility, automated workflows, and predictive analytics right out of the box. Purpose-built for speed and scale.",
    gradient: "from-violet-600 to-indigo-600",
    features: [
      { title: "Inventory Management", desc: "Real-time stock tracking across warehouses, suppliers, and branches." },
      { title: "Procurement & PO", desc: "Automated purchase orders, vendor comparison, and approval workflows." },
      { title: "Finance & Accounts", desc: "Double-entry bookkeeping, GST reports, and multi-currency ledgers." },
      { title: "AI Demand Forecasting", desc: "Predictive models that optimize stock levels and reduce holding costs." },
      { title: "Role-Based Access", desc: "Granular permissions, audit trails, and multi-entity support." },
      { title: "API-First Architecture", desc: "REST APIs for integration with existing tools and third-party systems." },
    ],
    industries: ["Manufacturing", "Retail", "Logistics", "Distribution"],
    specs: [
      { label: "Deployment", value: "Cloud / On-Premise" },
      { label: "Security", value: "AES-256, SOC2 Type II compliant" },
      { label: "API Sync", value: "Real-time Webhooks & REST" },
      { label: "AI Backend", value: "Llama-3 / GPT-4 fine-tuned" },
    ],
  },
  {
    slug: "healthcare",
    tag: "Healthcare Suite",
    name: "Healthcare Solutions",
    tagline: "Digital transformation for healthcare providers.",
    description:
      "A HIPAA-compliant, all-in-one platform for hospitals and clinics. Manage patients, appointments, billing, lab reports, and telemedicine from a single unified interface designed for clinical efficiency.",
    gradient: "from-blue-600 to-cyan-600",
    features: [
      { title: "Patient Management (EMR)", desc: "Complete electronic medical records with visit history and documents." },
      { title: "Appointment Scheduling", desc: "Smart scheduling with automated SMS/email reminders and wait lists." },
      { title: "Billing & Insurance", desc: "Insurance claim submissions, co-pay tracking, and itemized billing." },
      { title: "Lab & Radiology", desc: "Integrated lab orders, results portal, and DICOM viewer." },
      { title: "Pharmacy Management", desc: "Drug inventory, prescriptions, and dispensing workflow." },
      { title: "Telemedicine", desc: "Video consultations with session notes, e-prescriptions, and recordings." },
    ],
    industries: ["Hospitals", "Clinics", "Diagnostic Centers", "Pharmacies"],
    specs: [
      { label: "Compliance", value: "HIPAA, GDPR, HITECH" },
      { label: "Data Format", value: "FHIR / HL7 compliant" },
      { label: "Integration", value: "Aadhar Health ID (ABDM) / Insurance API" },
      { label: "Encryption", value: "End-to-End SSL & DB Encryption" },
    ],
  },
  {
    slug: "retail",
    tag: "Retail Platform",
    name: "Retail Platform",
    tagline: "Omnichannel inventory and point-of-sale systems.",
    description:
      "Connect your offline stores and online channels in real-time. Features multi-register POS, central catalog sync, promotions engine, and automated replenishment cycles to eliminate stock-outs.",
    gradient: "from-emerald-600 to-teal-600",
    features: [
      { title: "Cloud Point of Sale", desc: "Fast billing web app with offline capabilities and split payments." },
      { title: "Catalog Sync", desc: "Instantly update products, pricing, and tax structures globally." },
      { title: "Promotions Engine", desc: "Configure complex discount codes, bundle deals, and loyalty rewards." },
      { title: "Supplier Replenishment", desc: "Reorder triggers linked directly to real-time sales velocity." },
      { title: "Hardware Integration", desc: "Thermal printers, card terminals, and barcode scanners." },
    ],
    industries: ["Supermarkets", "Fashion & Apparel", "Electronics"],
    specs: [
      { label: "Offline Mode", value: "IndexedDB local fallback sync" },
      { label: "Integrations", value: "Stripe, Razorpay, Shopify" },
      { label: "Tax System", value: "GST / VAT multi-tax engine" },
      { label: "Reporting", value: "Hourly sales & margin analytics" },
    ],
  },
];

export const openRoles: JobRole[] = [
  {
    title: "Senior Full-Stack Engineer",
    department: "Engineering",
    location: "Remote (India)",
    type: "Full-time",
    slug: "senior-fullstack-engineer",
    description: "We are looking for a Senior Full-Stack Engineer to lead development of enterprise-grade Next.js and Node.js solutions. You'll build high-throughput systems, design scalable database schemas, and deliver polished web interfaces that conform to Vercel design principles.",
    responsibilities: [
      "Architect and implement clean Next.js/React applications with strict TypeScript typing.",
      "Design database schemas and optimize PostgreSQL queries using Prisma or Drizzle ORM.",
      "Work closely with our product managers to define scope and deliver feature increments in weekly sprints.",
      "Mentor junior team members and maintain high code quality standards through review.",
    ],
    requirements: [
      "5+ years of experience building production-scale web applications.",
      "Deep expertise in React, Next.js, Node.js, and modern TypeScript.",
      "Strong understanding of database design, SQL optimization, and cloud deployments (Vercel, AWS).",
      "Excellent communication and collaboration skills in a remote environment.",
    ],
  },
  {
    title: "Flutter Developer",
    department: "Mobile",
    location: "Remote (India)",
    type: "Full-time",
    slug: "flutter-developer",
    description: "Join our mobile team to build high-performance cross-platform applications. We ship offline-first apps with gorgeous layouts, custom animations, and tight security integrations for enterprise sectors.",
    responsibilities: [
      "Build modular and testable mobile applications using Flutter and Dart.",
      "Implement offline-first architectures, local sync (SQLite/Hive), and secure key-chain storage.",
      "Optimize animations, layouts, and resource usage for a premium user experience.",
      "Collaborate with backend teams to define clean and efficient API contracts.",
    ],
    requirements: [
      "3+ years of professional mobile development experience.",
      "Strong portfolio of Flutter apps shipped to App Store and Google Play.",
      "Expert knowledge of state management patterns (BLoC, Provider, or Riverpod).",
      "Solid understanding of REST APIs, WebSockets, and OAuth2 flows.",
    ],
  },
  {
    title: "AI/ML Engineer",
    department: "AI",
    location: "Remote (Global)",
    type: "Full-time",
    slug: "ai-ml-engineer",
    description: "We're expanding our AI operations team. You'll design, deploy, and monitor LLM pipelines, fine-tune models, and implement intelligent document processing (IDP) solutions for our ERP and healthcare products.",
    responsibilities: [
      "Design and deploy production-grade LLM chains and agents (using LangChain, LlamaIndex, or custom pipelines).",
      "Implement Retrieval-Augmented Generation (RAG) databases using PgVector or Pinecone.",
      "Fine-tune open-source models (like Llama-3 or Mistral) for domain-specific tasks.",
      "Develop metrics and validation pipelines to measure model accuracy, latency, and cost efficiency.",
    ],
    requirements: [
      "3+ years of experience in ML engineering and data science.",
      "Hands-on experience deploying LLMs and agentic pipelines in production.",
      "Proficiency in Python, PyTorch/TensorFlow, and vector databases.",
      "Familiarity with cloud ML offerings (Vertex AI, AWS SageMaker, or RunPod).",
    ],
  },
  {
    title: "Product Designer",
    department: "Design",
    location: "Remote (Global)",
    type: "Full-time",
    slug: "product-designer",
    description: "Looking for a Product Designer who lives and breathes minimal, premium, technical aesthetics. You'll design SaaS-like web and mobile applications with focus on hierarchy, typography, and micro-interactions.",
    responsibilities: [
      "Own the end-to-end design process: wireframes, user flows, visual mockups, and interactive prototypes.",
      "Contribute to and maintain our company design system, translating it to beautiful React/Flutter components.",
      "Perform user research and audit customer workflows to simplify complex data-dense layouts.",
      "Collaborate with developers daily to ensure design intent matches final production builds.",
    ],
    requirements: [
      "3+ years of product design experience at a SaaS or product design agency.",
      "Outstanding portfolio demonstrating mastery of typography, whitespace, and layouts.",
      "Fluency in Figma, design systems, auto-layout, and interactive components.",
      "Basic understanding of HTML/CSS is highly preferred.",
    ],
  },
  {
    title: "DevOps Engineer",
    department: "Infrastructure",
    location: "Remote (India)",
    type: "Full-time",
    slug: "devops-engineer",
    description: "Manage our cloud systems, CI/CD pipelines, and database infrastructure. We deploy on AWS and Vercel and require reliable, highly secure, automated systems.",
    responsibilities: [
      "Manage cloud resources via Infrastructure as Code (Terraform).",
      "Maintain CI/CD pipelines (GitHub Actions) for fast, automated production deployments.",
      "Monitor system health, error budgets, database performance, and execute database backups.",
      "Ensure compliance controls (SOC 2, HIPAA) are strictly adhered to in cloud network architectures.",
    ],
    requirements: [
      "3+ years of DevOps/SRE experience.",
      "Deep understanding of AWS (EKS, RDS, S3, IAM) and Vercel systems.",
      "Experience with Docker, Kubernetes, and Shell scripting.",
      "Knowledge of PostgreSQL performance tuning and backup strategies.",
    ],
  },
  {
    title: "Business Development Manager",
    department: "Sales",
    location: "Kerala, India",
    type: "Full-time",
    slug: "business-development-manager",
    description: "We are seeking a B2B sales leader to drive partnerships with mid-market and enterprise accounts across India and APAC. You will represent our software development and AI engineering capabilities.",
    responsibilities: [
      "Identify, nurture, and close new software engineering and AI automation partnerships.",
      "Draft proposals, scope work alongside solutions architects, and handle pricing discussions.",
      "Manage client onboarding, account relationships, and renewals.",
      "Deliver presentations showcasing our ERP products and custom engineering capabilities.",
    ],
    requirements: [
      "3+ years of experience in B2B tech sales or agency business development.",
      "Proven track record of hitting and exceeding sales quotas.",
      "Ability to understand and discuss complex engineering architectures (Next.js, Flutter, AI).",
      "Stellar written and verbal communication skills.",
    ],
  },
];

export const caseStudies: CaseStudy[] = [
  {
    slug: "hospital-network",
    industry: "Healthcare",
    company: "Regional Hospital Network",
    title: "Reduced patient wait time by 60% with intelligent scheduling",
    problem:
      "A 8-branch hospital network was managing appointments with spreadsheets and phone calls, causing 2-hour average wait times and frequent double-bookings.",
    solution:
      "We built a centralized patient management system with AI-driven appointment slot optimization, real-time bed tracking, and automated SMS reminders.",
    results: [
      { iconName: "Clock", value: "60%", label: "Wait time reduction" },
      { iconName: "TrendingUp", value: "3,000+", label: "Daily appointments" },
      { iconName: "Users", value: "8", label: "Branches integrated" },
    ],
    gradient: "from-blue-600/20 to-cyan-600/20",
    border: "border-blue-500/15",
    tag: "Healthcare",
    detailedProblem: [
      "Regional Hospital Network, operating 8 multi-specialty clinics, faced significant operational friction. Staff managed over 3,000 daily bookings across multiple legacy desktop calendars and shared spreadsheets.",
      "This fragmented system created frequent double-bookings, high staff burnout rates, and prolonged patient wait times, averaging 120 minutes per visit. More than 15% of patients abandoned visits before consulting a doctor, causing substantial revenue loss.",
    ],
    detailedSolution: [
      "We engineered a centralized patient management system using Next.js for the administrative web console and Flutter for the patient portal, built on a real-time PostgreSQL database hosted on Neon.",
      "We implemented an AI-driven appointment scheduling pipeline that dynamically calculates appointment slot allocations based on patient history, specialist speed, and triage logs. Automated SMS reminders and waitlist clearing algorithms were deployed via Resend to minimize no-shows.",
    ],
    detailedResults: [
      "Following the full deployment across all 8 branches, average patient wait times were slashed by 60% (from 120 minutes to under 48 minutes).",
      "The clinics successfully scaled their capacity to manage over 3,000 daily appointments without hiring additional administrative staff. Booking discrepancies and double-bookings were completely eliminated, resulting in a 22% increase in patient retention and patient satisfaction score improvements.",
    ],
  },
  {
    slug: "retail-inventory",
    industry: "Retail",
    company: "E-Commerce Retailer",
    title: "Automated inventory replenishment saving ₹2Cr per year",
    problem:
      "A mid-sized e-commerce retailer was facing frequent stockouts on bestsellers and over-stocking slow-moving SKUs, tying up ₹3Cr+ in working capital.",
    solution:
      "Built a predictive inventory engine using historical sales data, seasonal trends, and supplier lead times — integrated with 5 supplier APIs for automated reordering.",
    results: [
      { iconName: "TrendingUp", value: "₹2Cr", label: "Annual savings" },
      { iconName: "Clock", value: "85%", label: "Stockout reduction" },
      { iconName: "Users", value: "5", label: "Supplier integrations" },
    ],
    gradient: "from-violet-600/20 to-purple-600/20",
    border: "border-violet-500/15",
    tag: "Retail",
    detailedProblem: [
      "An omnichannel retailer with 12 warehouse facilities and digital stores struggled with demand forecasting. Best-selling products frequently went out of stock for weeks, while slow-moving categories sat in warehouse racks, tying up over ₹3Cr in working capital.",
      "The procurement team spent 25+ hours weekly manually analyzing sales logs, compiling purchase orders (POs), and chasing vendors, which led to high error rates and slow feedback loops.",
    ],
    detailedSolution: [
      "We developed a custom predictive replenishment module within our ZerpAI ERP platform. The system ingests historical sales logs, current stock positions, regional demand indexes, and supplier delivery patterns.",
      "An automated procurement pipeline was integrated directly with the client's 5 key suppliers via custom REST APIs. When stock levels drop below the dynamically computed reorder point, the ERP generates and transmits the purchase order automatically without human intervention.",
    ],
    detailedResults: [
      "The retailer realized ₹2Cr in working capital savings in the first year alone due to reduced holding costs and optimized logistics.",
      "Stockouts on critical, high-margin best-sellers were reduced by 85%, leading to a direct 14% top-line revenue growth. The automated PO engine eliminated manual procurement errors and freed up 20+ hours of staff time weekly.",
    ],
  },
  {
    slug: "manufacturing-erp",
    industry: "Manufacturing",
    company: "Auto Parts Manufacturer",
    title: "ERP rollout across 3 plants in under 90 days",
    problem:
      "A growing auto parts manufacturer was running production planning, HR, and finance on disconnected Excel files, causing delays and data inconsistencies.",
    solution:
      "Deployed ZerpAI ERP across all 3 plants with custom modules for production scheduling, quality control, and cross-plant inventory. Full data migration from 12 years of historical records.",
    results: [
      { iconName: "Clock", value: "90 days", label: "Rollout time" },
      { iconName: "Users", value: "3", label: "Plants onboarded" },
      { iconName: "TrendingUp", value: "1M+", label: "Records migrated" },
    ],
    gradient: "from-emerald-600/20 to-teal-600/20",
    border: "border-emerald-500/15",
    tag: "Manufacturing",
    detailedProblem: [
      "A prominent Tier-2 auto parts manufacturer operating 3 manufacturing units struggled with operational visibility. Production schedules, warehouse counts, employee shifts, and corporate finance were managed on disconnected Excel spreadsheets.",
      "This siloed approach caused production delays, raw material waste, and audit bottlenecks. Preparing month-end financial reviews required 10 days of manual data collation, delaying critical operational decisions.",
    ],
    detailedSolution: [
      "We deployed a custom instance of ZerpAI ERP across all three facilities. A unified database schema was mapped on Postgres to centralize data from production floors, HR rosters, and financial accounts.",
      "We engineered specific modules for raw materials tracking, real-time machine uptime logs, and cross-plant inventory sync. Our migration team engineered automated cleaning scripts to ingest and format 12 years of historical production records within a strict 90-day window.",
    ],
    detailedResults: [
      "The entire ERP system went live across all three facilities within 88 days, beating the 90-day target.",
      "Month-end financial close-out times dropped from 10 days to under 4 hours due to real-time general ledger integrations. Material waste dropped by 18% in the first quarter of rollout due to tighter production controls, improving plant margins by 4.2%.",
    ],
  },
];
