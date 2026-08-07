"use client";

import { useEffect, useMemo, useState, useRef, type FormEvent } from "react";
import Link from "next/link";
import { FeaturedFlutterIllustration } from "./FeaturedFlutterIllustration";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Check,
  Clock,
  Code2,
  Mail,
  Search,
  Sparkles,
  Layers,
  Compass,
  Bookmark,
} from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

type BlogPost = {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  isoDate: string;
  readTime: number;
};

type BlogClientProps = {
  posts: BlogPost[];
};

const filters = [
  "All",
  "Engineering",
  "AI",
  "ERP",
  "Healthcare",
  "Mobile",
  "Architecture",
  "DevOps",
  "Case Studies",
] as const;

type BlogFilter = (typeof filters)[number];

const rotatingTopics = [
  { label: "Deep Dives", color: "text-sky-500" },
  { label: "Architecture", color: "text-violet-500" },
  { label: "AI Automation", color: "text-emerald-500" },
  { label: "ERP Systems", color: "text-pink-500" },
  { label: "Engineering Culture", color: "text-orange-500" },
  { label: "Scalable Software", color: "text-cyan-500" },
] as const;

const topicLinks = ["Engineering", "AI Automation", "Enterprise ERP", "Mobile", "Architecture", "Operations"] as const;

const topicFilterMap: Record<(typeof topicLinks)[number], BlogFilter> = {
  Engineering: "Engineering",
  "AI Automation": "AI",
  "Enterprise ERP": "ERP",
  Mobile: "Mobile",
  Architecture: "Architecture",
  Operations: "Case Studies",
};

// Sidebar Sections definitions for Scroll Spy
const sidebarSections = [
  { id: "featured", label: "Featured Article" },
  { id: "reading-desk", label: "Reading Desk" },
  { id: "latest-thinking", label: "Latest Thinking" },
  { id: "newsletter", label: "Newsletter" },
] as const;

function ArchitectureSnapshot({ isHovered }: { isHovered: boolean }) {
  return (
    <svg viewBox="0 0 200 120" className="w-full h-full" aria-label="Architecture Layer Diagram">
      <motion.line
        x1="100" y1="20" x2="100" y2="100"
        stroke="rgba(139, 92, 246, 0.3)"
        strokeWidth="1.5"
        strokeDasharray="3 3"
        animate={{ strokeDashoffset: isHovered ? [0, -10] : 0 }}
        transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
      />
      <motion.g
        animate={{ y: isHovered ? -12 : -4 }}
        transition={{ type: "spring", stiffness: 100, damping: 15 }}
      >
        <rect x="30" y="20" width="140" height="16" rx="4" fill="#ffffff" stroke="#171717" strokeWidth="1.5" />
        <text x="100" y="31" textAnchor="middle" fontSize="7" fontFamily="monospace" fill="#171717" fontWeight="bold">Presentation (UI)</text>
      </motion.g>
      <motion.g
        animate={{ y: isHovered ? -4 : -1 }}
        transition={{ type: "spring", stiffness: 100, damping: 15 }}
      >
        <rect x="30" y="42" width="140" height="16" rx="4" fill="#f8fafc" stroke="#171717" strokeWidth="1.5" />
        <text x="100" y="53" textAnchor="middle" fontSize="7" fontFamily="monospace" fill="#171717" fontWeight="bold">Application (API)</text>
      </motion.g>
      <motion.g
        animate={{ y: isHovered ? 4 : 2 }}
        transition={{ type: "spring", stiffness: 100, damping: 15 }}
      >
        <rect x="30" y="64" width="140" height="16" rx="4" fill="#f1f5f9" stroke="#171717" strokeWidth="1.5" />
        <text x="100" y="75" textAnchor="middle" fontSize="7" fontFamily="monospace" fill="#171717" fontWeight="bold">Domain (Core)</text>
      </motion.g>
      <motion.g
        animate={{ y: isHovered ? 12 : 5 }}
        transition={{ type: "spring", stiffness: 100, damping: 15 }}
      >
        <rect x="30" y="86" width="140" height="16" rx="4" fill="#e2e8f0" stroke="#171717" strokeWidth="1.5" />
        <text x="100" y="97" textAnchor="middle" fontSize="7" fontFamily="monospace" fill="#171717" fontWeight="bold">Infrastructure (DB)</text>
      </motion.g>
    </svg>
  );
}

function ApiFlowSnapshot({ isHovered }: { isHovered: boolean }) {
  const points = [
    { x: 30, label: "Client" },
    { x: 67, label: "Gateway" },
    { x: 102, label: "Auth" },
    { x: 138, label: "Service" },
    { x: 173, label: "DB" }
  ];

  return (
    <svg viewBox="0 0 200 120" className="w-full h-full" aria-label="API Flow Diagram">
      <line x1="30" y1="60" x2="173" y2="60" stroke="#e2e8f0" strokeWidth="2" />
      <motion.circle
        r="4"
        fill="#3b82f6"
        animate={{
          cx: points.map(p => p.x),
        }}
        transition={{
          repeat: Infinity,
          duration: isHovered ? 1.2 : 3.0,
          ease: "easeInOut",
        }}
        cy="60"
      />
      {points.map((p, i) => (
        <g key={i} transform={`translate(${p.x}, 60)`}>
          <circle r="6" fill="#ffffff" stroke="#171717" strokeWidth="1.5" />
          <text y="20" textAnchor="middle" fontSize="6.5" fontFamily="monospace" fill="#64748b">{p.label}</text>
        </g>
      ))}
    </svg>
  );
}

function DatabaseSchemaSnapshot({ isHovered }: { isHovered: boolean }) {
  return (
    <svg viewBox="0 0 200 120" className="w-full h-full" aria-label="Database ER Schema Diagram">
      <motion.path
        d="M 65 35 H 135"
        stroke={isHovered ? "#8b5cf6" : "#cbd5e1"}
        strokeWidth="1.5"
        strokeDasharray="4 4"
        animate={{ strokeDashoffset: isHovered ? [0, -20] : 0 }}
        transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
      />
      <motion.path
        d="M 65 85 H 135"
        stroke={isHovered ? "#3b82f6" : "#cbd5e1"}
        strokeWidth="1.5"
        strokeDasharray="4 4"
        animate={{ strokeDashoffset: isHovered ? [0, 20] : 0 }}
        transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
      />
      <motion.path
        d="M 100 35 V 85"
        stroke={isHovered ? "#ec4899" : "#cbd5e1"}
        strokeWidth="1.5"
        strokeDasharray="4 4"
        animate={{ strokeDashoffset: isHovered ? [0, -20] : 0 }}
        transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
      />
      <g transform="translate(25, 20)">
        <rect width="40" height="30" rx="3" fill="#ffffff" stroke="#171717" strokeWidth="1.5" />
        <text x="20" y="12" textAnchor="middle" fontSize="6.5" fontFamily="monospace" fill="#171717" fontWeight="bold">Users</text>
        <line x1="0" y1="18" x2="40" y2="18" stroke="#171717" strokeWidth="1" />
        <text x="5" y="25" fontSize="5" fontFamily="monospace" fill="#64748b">id: uuid</text>
      </g>
      <g transform="translate(135, 20)">
        <rect width="40" height="30" rx="3" fill="#ffffff" stroke="#171717" strokeWidth="1.5" />
        <text x="20" y="12" textAnchor="middle" fontSize="6.5" fontFamily="monospace" fill="#171717" fontWeight="bold">Orders</text>
        <line x1="0" y1="18" x2="40" y2="18" stroke="#171717" strokeWidth="1" />
        <text x="5" y="25" fontSize="5" fontFamily="monospace" fill="#64748b">user_id</text>
      </g>
      <g transform="translate(25, 70)">
        <rect width="40" height="30" rx="3" fill="#ffffff" stroke="#171717" strokeWidth="1.5" />
        <text x="20" y="12" textAnchor="middle" fontSize="6.5" fontFamily="monospace" fill="#171717" fontWeight="bold">Products</text>
        <line x1="0" y1="18" x2="40" y2="18" stroke="#171717" strokeWidth="1" />
        <text x="5" y="25" fontSize="5" fontFamily="monospace" fill="#64748b">sku: str</text>
      </g>
      <g transform="translate(135, 70)">
        <rect width="40" height="30" rx="3" fill="#ffffff" stroke="#171717" strokeWidth="1.5" />
        <text x="20" y="12" textAnchor="middle" fontSize="6.5" fontFamily="monospace" fill="#171717" fontWeight="bold">Payments</text>
        <line x1="0" y1="18" x2="40" y2="18" stroke="#171717" strokeWidth="1" />
        <text x="5" y="25" fontSize="5" fontFamily="monospace" fill="#64748b">order_id</text>
      </g>
    </svg>
  );
}

function DeploymentPipelineSnapshot({ isHovered }: { isHovered: boolean }) {
  const stages = [
    { label: "Commit", color: "#3b82f6" },
    { label: "Build", color: "#6366f1" },
    { label: "Test", color: "#8b5cf6" },
    { label: "Security", color: "#ec4899" },
    { label: "Deploy", color: "#10b981" }
  ];

  const [activeStage, setActiveStage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStage(curr => (curr + 1) % stages.length);
    }, isHovered ? 400 : 1000);
    return () => clearInterval(interval);
  }, [isHovered]);

  return (
    <svg viewBox="0 0 200 120" className="w-full h-full" aria-label="CI/CD Deployment Pipeline">
      <line x1="20" y1="60" x2="180" y2="60" stroke="#e2e8f0" strokeWidth="2" />
      {stages.map((stage, idx) => {
        const xPos = 20 + idx * 40;
        const isActive = activeStage === idx;
        return (
          <g key={idx} transform={`translate(${xPos}, 60)`}>
            <motion.circle
              r={isActive ? 8 : 5}
              fill={isActive ? stage.color : "#ffffff"}
              stroke="#171717"
              strokeWidth="1.5"
              animate={{
                scale: isActive ? 1.25 : 1,
              }}
              transition={{ duration: 0.2 }}
            />
            {isActive && (
              <circle r="12" fill="none" stroke={stage.color} strokeWidth="1" className="animate-ping opacity-30" />
            )}
            <text y="20" textAnchor="middle" fontSize="6" fontFamily="monospace" fill={isActive ? "#171717" : "#94a3b8"} fontWeight={isActive ? "bold" : "normal"}>{stage.label}</text>
          </g>
        );
      })}
    </svg>
  );
}

const snapshotsData = [
  {
    category: "Architecture",
    title: "Layered System design",
    desc: "Isolated layers with explicit domain logic dependencies.",
    Component: ArchitectureSnapshot,
    slug: "next-js-app-router-performance",
  },
  {
    category: "API Flow",
    title: "Client-to-Database Flow",
    desc: "Authentication and rate limits at the API Gateway layer.",
    Component: ApiFlowSnapshot,
    slug: "why-flutter-for-enterprise-mobile",
  },
  {
    category: "Database Schema",
    title: "Entity Relationships",
    desc: "Relational data schema optimized for high transaction velocity.",
    Component: DatabaseSchemaSnapshot,
    slug: "erp-implementation-mistakes",
  },
  {
    category: "Deployment Pipeline",
    title: "Automated CI/CD Workflows",
    desc: "Continuous integration pipelines with security and unit tests.",
    Component: DeploymentPipelineSnapshot,
    slug: "ai-automation-roi-healthcare",
  },
];

function matchesFilter(post: BlogPost, filter: string) {
  if (filter === "All") return true;

  const text = `${post.category} ${post.title} ${post.excerpt}`.toLowerCase();
  const terms: Record<string, string[]> = {
    Engineering: ["engineering", "next.js", "software"],
    AI: ["ai", "automation", "machine learning"],
    ERP: ["erp", "enterprise resource"],
    Healthcare: ["healthcare", "patient", "clinical"],
    Mobile: ["mobile", "flutter", "react native"],
    Architecture: ["architecture", "app router", "microservice"],
    DevOps: ["devops", "deployment", "ci/cd"],
    "Case Studies": ["case study", "client story"],
  };

  return (terms[filter] ?? [filter.toLowerCase()]).some((term) => text.includes(term));
}

/* Custom Animated Engineering Illustrations for Article Cards */
function AiAutomationIllustration({ isHovered, reduceMotion }: { isHovered: boolean; reduceMotion: boolean | null }) {
  return (
    <div className="relative w-full h-full flex items-center justify-center bg-[#0d0d12] rounded-xl overflow-hidden p-4 select-none">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:16px_16px]" />
      
      <svg viewBox="0 0 320 160" className="w-full h-full relative z-10" aria-hidden="true">
        <path d="M 50 80 Q 110 30 160 80 T 270 80" stroke="rgba(139, 92, 246, 0.25)" strokeWidth="1.5" fill="none" />
        <path d="M 50 80 Q 110 130 160 80 T 270 80" stroke="rgba(59, 130, 246, 0.25)" strokeWidth="1.5" fill="none" />
        <line x1="160" y1="30" x2="160" y2="130" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="1" strokeDasharray="3 3" />
        
        {!reduceMotion && (
          <>
            <motion.circle
              r="3.5"
              fill="#a855f7"
              animate={{
                cx: [50, 110, 160, 210, 270],
                cy: [80, 42, 80, 118, 80],
                opacity: [0.2, 1, 0.8, 1, 0.2],
              }}
              transition={{ repeat: Infinity, duration: isHovered ? 1.8 : 3.2, ease: "easeInOut" }}
            />
            <motion.circle
              r="3"
              fill="#3b82f6"
              animate={{
                cx: [50, 110, 160, 210, 270],
                cy: [80, 118, 80, 42, 80],
                opacity: [0.2, 0.9, 0.7, 1, 0.2],
              }}
              transition={{ repeat: Infinity, duration: isHovered ? 1.5 : 2.8, ease: "easeInOut", delay: 0.6 }}
            />
          </>
        )}

        {[
          { x: 50, y: 80, label: "INPUT", color: "#8b5cf6" },
          { x: 110, y: 42, label: "NODE A", color: "#3b82f6" },
          { x: 110, y: 118, label: "NODE B", color: "#ec4899" },
          { x: 160, y: 80, label: "CORE ML", color: "#10b981" },
          { x: 210, y: 42, label: "NODE C", color: "#3b82f6" },
          { x: 210, y: 118, label: "NODE D", color: "#8b5cf6" },
          { x: 270, y: 80, label: "OUTPUT", color: "#10b981" },
        ].map((node, i) => (
          <g key={i} transform={`translate(${node.x}, ${node.y})`}>
            <motion.circle
              r={node.x === 160 ? 13 : 8.5}
              fill="#12131c"
              stroke={node.color}
              strokeWidth="1.5"
              animate={reduceMotion ? undefined : {
                scale: isHovered ? [1, 1.15, 1] : [1, 1.05, 1],
              }}
              transition={{ repeat: Infinity, duration: 2 + i * 0.3, ease: "easeInOut" }}
            />
            <circle r={node.x === 160 ? 4.5 : 2.5} fill={node.color} />
          </g>
        ))}
      </svg>
      
      <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-[9px] font-mono text-purple-300">
        <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-ping" />
        <span>NEURAL INFERENCE</span>
      </div>
    </div>
  );
}

function ArchitectureIllustration({ isHovered, reduceMotion }: { isHovered: boolean; reduceMotion: boolean | null }) {
  const layers = [
    { title: "Presentation Layer (UI / Edge)", color: "#38bdf8", tag: "NEXT.JS 15" },
    { title: "Application API (GraphQL / REST)", color: "#a855f7", tag: "GATEWAY" },
    { title: "Domain Core (Microservices)", color: "#34d399", tag: "BUSINESS LOGIC" },
    { title: "Infrastructure (Postgres / Redis)", color: "#fb923c", tag: "DATABASE" },
  ];

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center bg-[#0a0c10] rounded-xl overflow-hidden p-4 select-none">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.06)_0%,transparent_70%)]" />
      
      <div className="relative z-10 w-full max-w-[280px] space-y-2">
        {layers.map((layer, idx) => (
          <motion.div
            key={layer.title}
            animate={reduceMotion ? undefined : {
              y: isHovered ? [0, -2, 0] : 0,
              scale: isHovered ? 1.02 : 1,
            }}
            transition={{ duration: 0.3, delay: idx * 0.05 }}
            className="relative flex items-center justify-between px-3 py-2 rounded-lg bg-neutral-900/90 border border-neutral-800 shadow-sm"
          >
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: layer.color }} />
              <span className="text-[10px] font-mono font-medium text-neutral-200">{layer.title}</span>
            </div>
            <span className="text-[8px] font-mono px-1.5 py-0.5 rounded bg-neutral-800 text-neutral-400 border border-neutral-700">
              {layer.tag}
            </span>
          </motion.div>
        ))}
      </div>

      {!reduceMotion && (
        <motion.div
          className="absolute left-7 top-6 bottom-6 w-[2px] bg-gradient-to-b from-sky-400 via-purple-400 to-emerald-400"
          animate={{
            opacity: isHovered ? [0.4, 0.9, 0.4] : 0.4,
          }}
          transition={{ repeat: Infinity, duration: 2 }}
        />
      )}

      <div className="absolute bottom-2.5 right-3 text-[9px] font-mono text-neutral-500">
        SUB-10MS LATENCY
      </div>
    </div>
  );
}

function ErpWorkflowIllustration({ isHovered, reduceMotion }: { isHovered: boolean; reduceMotion: boolean | null }) {
  return (
    <div className="relative w-full h-full flex items-center justify-center bg-[#0c0d12] rounded-xl overflow-hidden p-4 select-none">
      <svg viewBox="0 0 320 160" className="w-full h-full relative z-10" aria-hidden="true">
        <defs>
          <pattern id="erpGrid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#erpGrid)" />

        <path d="M 40 80 H 280" stroke="rgba(255, 255, 255, 0.12)" strokeWidth="2" strokeDasharray="4 4" />
        
        {!reduceMotion && (
          <motion.circle
            r="4"
            fill="#10b981"
            animate={{ cx: [40, 120, 200, 280] }}
            transition={{ repeat: Infinity, duration: isHovered ? 1.6 : 3.0, ease: "linear" }}
            cy="80"
          />
        )}

        {[
          { x: 40, y: 80, label: "Orders", val: "1.4k/s", col: "#3b82f6" },
          { x: 120, y: 80, label: "Inventory", val: "Sync OK", col: "#8b5cf6" },
          { x: 200, y: 80, label: "Billing", val: "Auto-PO", col: "#f59e0b" },
          { x: 280, y: 80, label: "Ledger", val: "Posted", col: "#10b981" },
        ].map((item, idx) => (
          <g key={item.label} transform={`translate(${item.x}, ${item.y})`}>
            <motion.rect
              x="-30"
              y="-22"
              width="60"
              height="44"
              rx="7"
              fill="#141622"
              stroke={item.col}
              strokeWidth="1.5"
              animate={reduceMotion ? undefined : {
                y: isHovered ? (idx % 2 === 0 ? -24 : -20) : -22,
              }}
              transition={{ duration: 0.3 }}
            />
            <text textAnchor="middle" y="-5" fontSize="8.5" fontFamily="monospace" fill="#f8fafc" fontWeight="bold">
              {item.label}
            </text>
            <text textAnchor="middle" y="10" fontSize="7.5" fontFamily="monospace" fill="#94a3b8">
              {item.val}
            </text>
          </g>
        ))}
      </svg>
      
      <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-[9px] font-mono text-emerald-400">
        <span>REAL-TIME ENGINE</span>
      </div>
    </div>
  );
}

function NextCodeIllustration({ isHovered, reduceMotion }: { isHovered: boolean; reduceMotion: boolean | null }) {
  return (
    <div className="relative w-full h-full flex flex-col bg-[#0b0c10] rounded-xl overflow-hidden border border-neutral-800 p-3 select-none">
      <div className="flex items-center justify-between pb-2 border-b border-neutral-800/80">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
          <span className="ml-2 text-[10px] font-mono text-neutral-400">app/page.tsx</span>
        </div>
        <span className="text-[9px] font-mono text-emerald-400 flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          200 OK
        </span>
      </div>

      <div className="flex-1 pt-3 font-mono text-[10px] leading-relaxed space-y-1.5 text-neutral-300">
        <div className="flex gap-3">
          <span className="text-neutral-600 select-none">1</span>
          <span><span className="text-purple-400">export default async function</span> <span className="text-sky-300">Page</span>() &#123;</span>
        </div>
        <div className="flex gap-3">
          <span className="text-neutral-600 select-none">2</span>
          <span className="pl-3"><span className="text-purple-400">const</span> data = <span className="text-purple-400">await</span> <span className="text-sky-300">fetchData</span>();</span>
        </div>
        <div className="flex gap-3">
          <span className="text-neutral-600 select-none">3</span>
          <span className="pl-3"><span className="text-purple-400">return</span> &lt;<span className="text-amber-300">Dashboard</span> data=&#123;data&#125; /&gt;;</span>
        </div>
        <div className="flex gap-3">
          <span className="text-neutral-600 select-none">4</span>
          <span>&#125;</span>
          {!reduceMotion && (
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
              className="inline-block w-1.5 h-3.5 bg-sky-400 ml-1"
            />
          )}
        </div>
      </div>

      <div className="pt-2 border-t border-neutral-800/80 flex items-center justify-between text-[9px] font-mono text-neutral-500">
        <span>NEXT.JS APP ROUTER</span>
        <span className="text-neutral-400">P99: 42ms</span>
      </div>
    </div>
  );
}

function ArticleIllustration({
  category,
  slug,
  isHovered,
  reduceMotion,
}: {
  category: string;
  slug: string;
  isHovered: boolean;
  reduceMotion: boolean | null;
}) {
  const catLower = category.toLowerCase();
  const slugLower = slug.toLowerCase();

  if (catLower.includes("ai") || slugLower.includes("ai")) {
    return <AiAutomationIllustration isHovered={isHovered} reduceMotion={reduceMotion} />;
  }
  if (catLower.includes("erp") || slugLower.includes("erp")) {
    return <ErpWorkflowIllustration isHovered={isHovered} reduceMotion={reduceMotion} />;
  }
  if (catLower.includes("architecture") || slugLower.includes("architecture")) {
    return <ArchitectureIllustration isHovered={isHovered} reduceMotion={reduceMotion} />;
  }
  return <NextCodeIllustration isHovered={isHovered} reduceMotion={reduceMotion} />;
}

function ArticleCard({
  post,
  index,
  reduceMotion,
}: {
  post: BlogPost;
  index: number;
  reduceMotion: boolean | null;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotX, setRotX] = useState(0);
  const [rotY, setRotY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduceMotion || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const rY = ((mouseX - width / 2) / (width / 2)) * 10;
    const rX = -((mouseY - height / 2) / (height / 2)) * 10;

    setRotY(rY);
    setRotX(rX);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotX(0);
    setRotY(0);
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
      className="group h-full"
    >
      <Link
        href={`/blog/${post.slug}`}
        className="block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-4 rounded-[28px]"
        aria-label={`Read article: ${post.title}`}
      >
        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={handleMouseLeave}
          style={{ perspective: 1000 }}
          className="h-full w-full select-none"
        >
          <motion.div
            animate={{
              rotateX: reduceMotion ? 0 : rotX,
              rotateY: reduceMotion ? 0 : rotY,
              scale: isHovered ? 1.025 : 1,
            }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            style={{ transformStyle: "preserve-3d" }}
            className={`relative flex flex-col justify-between h-full min-h-[460px] md:min-h-[480px] p-6 md:p-7 bg-white rounded-[28px] border border-black/[0.08] transition-shadow duration-500 ${
              isHovered
                ? "shadow-[0_30px_60px_rgba(0,0,0,0.14)] border-black/20"
                : "shadow-[0_4px_20px_rgba(0,0,0,0.03)]"
            }`}
          >
            {/* Top Bar: Category - pops up to 30px Z */}
            <motion.div
              style={{ transformStyle: "preserve-3d" }}
              animate={{ transform: isHovered ? "translateZ(30px)" : "translateZ(15px)" }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="flex items-center justify-between pb-3"
            >
              <span className="text-[10px] font-mono font-semibold uppercase tracking-[0.18em] px-3 py-1 rounded-full bg-neutral-100 text-neutral-800 border border-neutral-200/80 transition-colors group-hover:bg-neutral-900 group-hover:text-white group-hover:border-neutral-900">
                {post.category}
              </span>
              <div className="flex items-center gap-1.5 text-[11px] font-mono text-neutral-400">
                <Clock size={12} aria-hidden="true" />
                <span>{post.readTime} min read</span>
              </div>
            </motion.div>

            {/* Illustration Area (~60% of Card visual space) - pops out to 55px Z */}
            <motion.div
              style={{ transformStyle: "preserve-3d" }}
              animate={{ transform: isHovered ? "translateZ(55px)" : "translateZ(25px)" }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="relative w-full h-[220px] md:h-[240px] my-3 rounded-2xl overflow-hidden border border-neutral-800/80 shadow-md"
            >
              <ArticleIllustration
                category={post.category}
                slug={post.slug}
                isHovered={isHovered}
                reduceMotion={reduceMotion}
              />
            </motion.div>

            {/* Article Title & 2-line Excerpt - pops out to 45px / 30px Z */}
            <div className="space-y-2 pt-1" style={{ transformStyle: "preserve-3d" }}>
              <motion.h3
                animate={{ transform: isHovered ? "translateZ(45px)" : "translateZ(20px)" }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="text-xl font-semibold tracking-tight text-neutral-900 leading-snug group-hover:text-black line-clamp-2 transition-colors"
              >
                {post.title}
              </motion.h3>
              <motion.p
                animate={{ transform: isHovered ? "translateZ(30px)" : "translateZ(15px)" }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="text-xs text-neutral-500 leading-relaxed line-clamp-2"
              >
                {post.excerpt}
              </motion.p>
            </div>

            {/* Footer Metadata & Elevated Circular Arrow Button - pops out to 75px Z */}
            <div
              style={{ transformStyle: "preserve-3d" }}
              className="flex items-center justify-between pt-4 mt-3 border-t border-neutral-100"
            >
              <motion.div
                animate={{ transform: isHovered ? "translateZ(40px)" : "translateZ(20px)" }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="flex items-center gap-2 text-xs font-mono text-neutral-400"
              >
                <span className="text-neutral-700 font-medium">{post.author}</span>
                <span aria-hidden="true">•</span>
                <time dateTime={post.isoDate}>{post.date}</time>
              </motion.div>

              <motion.div
                animate={{
                  transform: isHovered ? "translateZ(75px)" : "translateZ(30px)",
                  scale: isHovered ? 1.15 : 1,
                  rotate: isHovered ? -15 : 0,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="flex items-center justify-center w-10 h-10 rounded-full border border-neutral-200 bg-white text-neutral-800 shadow-md group-hover:bg-neutral-900 group-hover:text-white group-hover:border-neutral-900 transition-colors duration-300"
              >
                <ArrowUpRight size={18} aria-hidden="true" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </Link>
    </motion.article>
  );
}

function ArticleMeta({ post }: { post: BlogPost }) {
  return (
    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] font-mono uppercase tracking-[0.12em] text-mute">
      <span>{post.category}</span>
      <span aria-hidden="true">•</span>
      <time dateTime={post.isoDate}>{post.date}</time>
      <span aria-hidden="true">•</span>
      <span className="inline-flex items-center gap-1 normal-case tracking-normal">
        <Clock size={12} aria-hidden="true" />
        {post.readTime} min read
      </span>
    </div>
  );
}

type NotebookItem = {
  title: string;
  category: string;
  notes: number;
  guides: number;
  caseStudies: number;
  updated: string;
  color: string;
  textColor: string;
  slug: string;
  toc: {
    title: string;
    articles: number;
    updated: string;
    slug: string;
  }[];
};

const notebooksData: NotebookItem[] = [
  {
    title: "Enterprise ERP",
    category: "ERP SYSTEMS",
    notes: 18,
    guides: 6,
    caseStudies: 9,
    updated: "2 days ago",
    color: "#4a1525", // Dark Burgundy
    textColor: "#faf8f5",
    slug: "erp-implementation-mistakes",
    toc: [
      { title: "ERP Core Architecture", articles: 8, updated: "2 days ago", slug: "erp-implementation-mistakes" },
      { title: "Data Migration Guides", articles: 4, updated: "1 week ago", slug: "erp-implementation-mistakes" },
      { title: "Production Post-Mortems", articles: 6, updated: "2 weeks ago", slug: "erp-implementation-mistakes" }
    ]
  },
  {
    title: "AI Automation",
    category: "AI & ML",
    notes: 12,
    guides: 4,
    caseStudies: 6,
    updated: "3 days ago",
    color: "#1a2639", // Deep Navy
    textColor: "#faf8f5",
    slug: "ai-automation-roi-healthcare",
    toc: [
      { title: "Agentic LLM Pipelines", articles: 6, updated: "3 days ago", slug: "ai-automation-roi-healthcare" },
      { title: "Model Fine-tuning Guide", articles: 3, updated: "2 weeks ago", slug: "ai-automation-roi-healthcare" },
      { title: "Cost/ROI Benchmarks", articles: 3, updated: "1 month ago", slug: "ai-automation-roi-healthcare" }
    ]
  },
  {
    title: "Flutter Engineering",
    category: "MOBILE APPS",
    notes: 15,
    guides: 5,
    caseStudies: 4,
    updated: "Yesterday",
    color: "#23395d", // Slate Blue
    textColor: "#faf8f5",
    slug: "why-flutter-for-enterprise-mobile",
    toc: [
      { title: "Impeller Engine Tuning", articles: 5, updated: "Yesterday", slug: "why-flutter-for-enterprise-mobile" },
      { title: "Offline Sync Architecture", articles: 6, updated: "5 days ago", slug: "why-flutter-for-enterprise-mobile" },
      { title: "UI Performance Testing", articles: 4, updated: "2 weeks ago", slug: "why-flutter-for-enterprise-mobile" }
    ]
  },
  {
    title: "System Design",
    category: "INFRASTRUCTURE",
    notes: 22,
    guides: 8,
    caseStudies: 10,
    updated: "5 days ago",
    color: "#1a3020", // Forest Green
    textColor: "#faf8f5",
    slug: "next-js-app-router-performance",
    toc: [
      { title: "High-Availability Setups", articles: 10, updated: "5 days ago", slug: "next-js-app-router-performance" },
      { title: "Database Query Tuning", articles: 7, updated: "1 week ago", slug: "next-js-app-router-performance" },
      { title: "Load Balancer Routing", articles: 5, updated: "3 weeks ago", slug: "next-js-app-router-performance" }
    ]
  }
];

function ShelfLighting() {
  return (
    <div 
      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4/5 h-[80px] pointer-events-none opacity-40 blur-[30px]" 
      style={{
        background: "radial-gradient(ellipse at center, rgba(217, 119, 6, 0.25) 0%, transparent 80%)",
      }}
    />
  );
}

function BookmarkRibbon({ color = "#8b5cf6", isHovered = false }) {
  return (
    <motion.div
      style={{
        backgroundColor: color,
        transformOrigin: "top center",
      }}
      animate={{
        rotate: isHovered ? [0, 8, -6, 4, 0] : 0,
      }}
      transition={{
        duration: 1.5,
        ease: "easeInOut",
      }}
      className="absolute right-5 top-0 w-2.5 h-16 rounded-b shadow-[1px_2px_5px_rgba(0,0,0,0.2)] z-20"
    />
  );
}

function NotebookCover({ book, isHovered, isOpen }: { book: NotebookItem; isHovered: boolean; isOpen: boolean }) {
  return (
    <div 
      style={{
        backgroundColor: book.color,
        boxShadow: isHovered 
          ? "0 25px 50px -12px rgba(0, 0, 0, 0.4), inset -3px 0 10px rgba(255,255,255,0.08)"
          : "0 10px 20px -5px rgba(0, 0, 0, 0.3), inset -3px 0 10px rgba(255,255,255,0.05)",
      }}
      className="absolute inset-y-0 left-0 w-full h-full rounded-l-[5px] rounded-r-[2px] border border-white/5 flex flex-col justify-between p-6 select-none transition-shadow duration-300"
    >
      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:3px_3px] opacity-25 mix-blend-overlay pointer-events-none rounded-lg" />
      <div className="absolute left-0 inset-y-0 w-3 border-r border-black/20 bg-black/10" />
      <div className="absolute left-1 inset-y-0 w-[1px] bg-white/10" />

      <div className="pl-3">
        <span className="text-[9px] font-mono tracking-[0.2em] opacity-60 font-semibold" style={{ color: book.textColor }}>
          {book.category}
        </span>
        <h4 className="text-sm font-serif font-bold mt-3 leading-snug drop-shadow" style={{ color: book.textColor }}>
          {book.title}
        </h4>
      </div>

      <div className="pl-3 flex flex-col gap-1 opacity-70 font-mono text-[9px] tracking-wide" style={{ color: book.textColor }}>
        <div className="flex items-center gap-1.5">
          <BookOpen size={10} />
          <span>{book.notes} notes</span>
        </div>
        <div>Updated {book.updated}</div>
      </div>
    </div>
  );
}

function Notebook({ 
  book, 
  onSelect,
  isDim
}: { 
  book: NotebookItem; 
  onSelect: () => void;
  isDim: boolean;
}) {
  const [isHovered, setIsHovered] = useState(false);

  const floatY = isHovered ? -16 : 0;
  const rotY = isHovered ? -12 : -4;
  const rotZ = isHovered ? 2 : 0;

  return (
    <motion.button
      type="button"
      suppressHydrationWarning
      onClick={onSelect}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ perspective: 1000 }}
      animate={{
        y: floatY,
        opacity: isDim ? 0.35 : 1,
      }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className="relative flex flex-col justify-end w-[180px] h-[260px] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-[5px] select-none shrink-0"
      aria-label={`Open notebook for ${book.title}`}
    >
      <BookmarkRibbon color="#ec4899" isHovered={isHovered} />

      <motion.div
        style={{
          transformStyle: "preserve-3d",
          transformOrigin: "left center",
        }}
        animate={{
          rotateY: rotY,
          rotateZ: rotZ,
        }}
        transition={{ type: "spring", stiffness: 220, damping: 22 }}
        className="absolute inset-0 rounded-l-[5px] rounded-r-[2px] w-full h-full"
      >
        <NotebookCover book={book} isHovered={isHovered} isOpen={false} />

        <div 
          className="absolute right-0 top-[2px] bottom-[2px] w-2 bg-slate-100 shadow-[inset_1px_0_3px_rgba(0,0,0,0.1)] border-r border-y border-slate-300/60 rounded-r-[2px]"
          style={{
            transform: "rotateY(90deg) translateZ(0px)",
            transformOrigin: "right center",
          }}
        />
      </motion.div>
    </motion.button>
  );
}

function TableOfContents({ book, onClose }: { book: NotebookItem; onClose: () => void }) {
  return (
    <div className="w-full h-full flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-center pb-3 border-b border-black/[0.08]">
          <span className="text-[10px] font-mono font-bold tracking-widest text-slate-400">TABLE OF CONTENTS</span>
          <button 
            type="button"
            suppressHydrationWarning
            onClick={onClose} 
            className="text-[10px] font-mono text-slate-400 hover:text-slate-900 transition-colors focus-visible:outline-none"
            aria-label="Close notebook"
          >
            [ESC TO CLOSE]
          </button>
        </div>

        <div className="mt-8 space-y-5">
          {book.toc.map((entry, idx) => (
            <Link
              key={idx}
              href={`/blog/${entry.slug}`}
              onClick={onClose}
              className="group block"
            >
              <div className="flex justify-between items-baseline gap-4">
                <span className="text-xs font-serif font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                  {entry.title}
                </span>
                <span className="text-[10px] font-mono text-slate-400 whitespace-nowrap">{entry.articles} articles</span>
              </div>
              <div className="text-[9px] font-mono text-slate-400 mt-1 flex items-center justify-between">
                <span>Updated {entry.updated}</span>
                <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-indigo-500 font-bold">READ →</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="text-[9px] font-mono text-slate-400 flex justify-between pt-4 border-t border-black/[0.04]">
        <span>ZABNIX PUBLISHING</span>
        <span>INDEX PAGE</span>
      </div>
    </div>
  );
}

function BookShelf({ reduceMotion }: { reduceMotion: boolean | null }) {
  const [selectedBook, setSelectedBook] = useState<number | null>(null);
  const [openBook, setOpenBook] = useState<number | null>(null);

  const handleClose = () => {
    setOpenBook(null);
    setSelectedBook(null);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <section id="research-collections" className="py-24 max-w-[1400px] mx-auto px-6 scroll-mt-32 space-y-16">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <p className="text-xs font-mono uppercase tracking-[0.24em] text-mute">Research Collections</p>
        <h3 className="text-4xl font-semibold tracking-tight text-ink mt-4">Key Systems Visualized</h3>
        <p className="text-sm text-body mt-4 leading-relaxed">
          Handpicked engineering notebooks containing deep dives, production lessons, architecture decisions, implementation guides and engineering references from the Zabnix engineering team.
        </p>
      </div>

      <div className="relative w-full py-20 flex flex-col items-center">
        <ShelfLighting />

        <div className="relative z-10 flex flex-nowrap overflow-x-auto md:overflow-x-visible md:flex-wrap justify-start md:justify-center items-end gap-8 px-8 pb-8 w-full max-w-5xl scrollbar-none snap-x snap-mandatory">
          {notebooksData.map((book, idx) => (
            <div key={book.title} className="snap-center">
              <Notebook
                book={book}
                isDim={selectedBook !== null && selectedBook !== idx}
                onSelect={() => {
                  setSelectedBook(idx);
                  setTimeout(() => setOpenBook(idx), 200);
                }}
              />
            </div>
          ))}
        </div>

        <div className="relative w-full max-w-6xl h-6 mt-[-10px] bg-gradient-to-b from-[#e3c7a6] via-[#b6926f] to-[#886241] rounded-lg shadow-[0_25px_40px_rgba(0,0,0,0.4)] border-t border-white/20">
          <div className="absolute inset-x-0 bottom-0 h-1 bg-black/30" />
          <div className="absolute inset-x-0 top-0 h-1 bg-white/25" />
        </div>
      </div>

      <AnimatePresence>
        {selectedBook !== null && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            <motion.div 
              initial={{ scale: 0.85, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.85, y: 30, opacity: 0 }}
              transition={{ type: "spring", stiffness: 220, damping: 24 }}
              className="relative z-10 w-full max-w-3xl aspect-[1.3/1] md:aspect-[1.7/1] flex shadow-[0_45px_100px_rgba(0,0,0,0.6)]"
              style={{ perspective: 2000 }}
            >
              <motion.div
                style={{
                  transformOrigin: "right center",
                  transformStyle: "preserve-3d",
                  backgroundColor: notebooksData[selectedBook].color,
                }}
                animate={{
                  rotateY: openBook === selectedBook ? -180 : 0,
                  z: openBook === selectedBook ? 10 : 0,
                }}
                transition={{ duration: 0.85, ease: [0.25, 1, 0.5, 1] }}
                className="absolute left-0 top-0 w-1/2 h-full rounded-l-lg origin-right border-y border-l border-white/10 flex flex-col justify-between text-white"
              >
                <div 
                  className="absolute inset-0 bg-[#faf8f5] p-8 rounded-l-lg border-r border-black/10 flex flex-col justify-between text-slate-800"
                  style={{
                    backfaceVisibility: "hidden",
                    transform: "rotateY(180deg)",
                  }}
                >
                  <div className="absolute inset-0 bg-[radial-gradient(rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
                  
                  <div>
                    <span className="text-[10px] font-mono tracking-widest text-slate-400 font-bold">
                      {notebooksData[selectedBook].category}
                    </span>
                    <h2 className="text-3xl font-serif font-bold text-slate-900 mt-3 leading-snug">
                      {notebooksData[selectedBook].title}
                    </h2>
                    <div className="w-10 h-[3px] bg-slate-800 mt-5 rounded" />
                  </div>

                  <div className="text-xs font-mono text-slate-500 space-y-2 pb-6 border-b border-black/[0.04]">
                    <div>• {notebooksData[selectedBook].notes} Technical Notes</div>
                    <div>• {notebooksData[selectedBook].guides} Guides</div>
                    <div>• {notebooksData[selectedBook].caseStudies} Case Studies</div>
                  </div>
                  
                  <div className="text-[10px] font-mono text-slate-400">
                    Last updated {notebooksData[selectedBook].updated}
                  </div>
                </div>

                <div className="w-full h-full flex flex-col justify-between p-8" style={{ backfaceVisibility: "hidden" }}>
                  <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:4px_4px] opacity-30 mix-blend-overlay pointer-events-none rounded-lg" />
                  <div>
                    <span className="text-[10px] font-mono tracking-[0.2em] text-white/50 font-bold">
                      {notebooksData[selectedBook].category}
                    </span>
                    <h2 className="text-2xl font-serif font-bold text-white/95 mt-4 leading-snug">
                      {notebooksData[selectedBook].title}
                    </h2>
                  </div>
                  <div className="text-[9px] font-mono text-white/40 tracking-wider">
                    ZABNIX PRESS
                  </div>
                </div>
              </motion.div>

              <div 
                className="absolute right-0 top-0 w-1/2 h-full bg-[#faf8f5] rounded-r-lg border-y border-r border-black/10 p-8 flex flex-col justify-between text-slate-800"
                style={{
                  transformStyle: "preserve-3d",
                  transformOrigin: "left center",
                }}
              >
                <div className="absolute inset-0 bg-[radial-gradient(rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
                <TableOfContents 
                  book={notebooksData[selectedBook]} 
                  onClose={handleClose} 
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

const articlePreviews: Record<string, { summary: string; takeaways: string[] }> = {
  "why-flutter-for-enterprise-mobile": {
    summary: "Flutter is becoming the default choice for enterprise mobile development by offering shared UI, cross-platform compilation, and simplified engineering overhead.",
    takeaways: ["Reduced maintenance cost", "Consistent native-grade graphics", "Unified codebase for iOS & Android"]
  },
  "ai-automation-roi-healthcare": {
    summary: "Transitioning clinical administration tasks to agentic LLM pipelines offers quantifiable time savings and error reductions, but requires strict validation parameters.",
    takeaways: ["HIPAA-compliant validation steps", "Up to 40% reduction in time", "Human-in-the-loop fallback modes"]
  },
  "erp-implementation-mistakes": {
    summary: "A post-mortem analysis of classic enterprise resource planning failures, highlighting critical design flaws in database schemas and staging sync patterns.",
    takeaways: ["Phased module deployments", "Decoupled transaction systems", "Robust data transformation rules"]
  },
  "next-js-app-router-performance": {
    summary: "How we optimize Server Component streaming, static exports, and chunk prefetching patterns to maintain Lighthouse scores of 95+ in production environments.",
    takeaways: ["Hoisted asset preloading", "Granular suspense boundaries", "Selective hydration parameters"]
  }
};

const getRibbonColor = (category: string) => {
  const cat = category.toLowerCase();
  if (cat.includes("erp")) return "#4a1525"; // deep burgundy
  if (cat.includes("ai") || cat.includes("intelligence")) return "#581c87"; // violet
  if (cat.includes("flutter") || cat.includes("mobile")) return "#1e3a8a"; // blue
  if (cat.includes("architecture")) return "#064e3b"; // emerald
  if (cat.includes("healthcare")) return "#115e59"; // teal
  if (cat.includes("devops") || cat.includes("infrastructure")) return "#9a3412"; // orange
  return "#334155"; // slate for Case Studies/others
};

function NotebookCard({ post, index }: { post: BlogPost; index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCoords({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const preview = articlePreviews[post.slug] || {
    summary: post.excerpt,
    takeaways: ["Practical perspective", "Production-grade execution", "Zabnix Engineering Standard"]
  };

  const ribbonColor = getRibbonColor(post.category);

  return (
    <div style={{ perspective: 1200 }} className="w-full">
      <motion.div
        layout
        onClick={() => setIsOpen(!isOpen)}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          boxShadow: isHovered 
            ? "0 30px 60px -15px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(0,0,0,0.06)" 
            : "0 10px 30px -10px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(0,0,0,0.04)",
        }}
        animate={{
          scale: isHovered && !isOpen ? 1.03 : 1,
          y: isHovered && !isOpen ? -8 : 0,
        }}
        transition={{ type: "spring", stiffness: 250, damping: 26, mass: 0.8 }}
        className="relative bg-white rounded-[24px] border border-hairline overflow-hidden cursor-pointer transition-shadow duration-300 w-full"
      >
        {isHovered && !isOpen && (
          <div 
            className="absolute inset-0 pointer-events-none transition-opacity duration-300"
            style={{
              background: `radial-gradient(180px circle at ${coords.x}px ${coords.y}px, rgba(99, 102, 241, 0.035), transparent 80%)`
            }}
          />
        )}

        <motion.div
          style={{
            backgroundColor: ribbonColor,
            transformOrigin: "top center",
          }}
          animate={{
            rotate: isHovered ? [0, 6, -4, 2, 0] : 0,
            height: isOpen ? 55 : 70
          }}
          transition={{ duration: 1.2 }}
          className="absolute right-8 top-0 w-2.5 shadow-[1px_2px_4px_rgba(0,0,0,0.15)] z-20"
        />

        <div className="absolute left-0 inset-y-0 w-4 border-r border-black/[0.04] bg-neutral-50/50" />
        <div className="absolute left-1 inset-y-0 w-[1px] bg-black/[0.02]" />

        <div className="pl-8 p-6 md:p-8">
          <AnimatePresence mode="wait">
            {!isOpen ? (
              <motion.div
                key="closed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col justify-between min-h-[160px] md:min-h-[180px]"
              >
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-[0.16em] text-slate-500 font-semibold">
                    {post.category}
                  </span>
                  <h3 className="text-xl md:text-2xl font-serif font-bold text-ink mt-3 leading-snug tracking-tight">
                    {post.title}
                  </h3>
                </div>

                <div className="flex items-center justify-between mt-8 text-xs font-mono text-mute">
                  <div className="flex items-center gap-4">
                    <span>By {post.author}</span>
                    <span>{post.readTime} min read</span>
                  </div>
                  <span className="flex items-center justify-center w-8 h-8 rounded-full border border-hairline group-hover:border-ink transition-colors bg-white shadow-sm">
                    <ArrowRight size={14} className="transform transition-transform group-hover:translate-x-0.5 duration-200" />
                  </span>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="open"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.45 }}
                className="space-y-6"
              >
                <div className="pb-4 border-b border-black/[0.06]">
                  <span className="text-[9px] font-mono uppercase tracking-widest text-slate-400">
                    {post.category} • {post.readTime} min read
                  </span>
                  <h3 className="text-2xl font-serif font-bold text-slate-900 mt-2">
                    {post.title}
                  </h3>
                  <p className="text-xs text-slate-400 font-mono mt-1">Written by {post.author} • Published May 2026</p>
                </div>

                <div className="space-y-2">
                  <h4 className="text-[10px] font-mono tracking-widest uppercase text-slate-400 font-semibold">SUMMARY</h4>
                  <p className="text-sm text-slate-700 leading-relaxed font-serif italic">
                    {preview.summary}
                  </p>
                </div>

                <div className="space-y-3 pt-2">
                  <h4 className="text-[10px] font-mono tracking-widest uppercase text-slate-400 font-semibold">KEY TAKEAWAYS</h4>
                  <ul className="space-y-2">
                    {preview.takeaways.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-600">
                        <span className="text-indigo-500 font-bold">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-black/[0.04] flex justify-between items-center">
                  <span className="text-[9px] font-mono text-slate-400">ZABNIX NOTEBOOKS</span>
                  <Link
                    href={`/blog/${post.slug}`}
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-indigo-600 hover:text-indigo-800 transition-colors font-bold"
                  >
                    Read Article <ArrowRight size={14} />
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}

const ribbonColors: Record<string, string> = {
  ERP: "#4a1525",
  AI: "#8b5cf6",
  Mobile: "#3b82f6",
  Architecture: "#10b981",
  Healthcare: "#0d9488",
  DevOps: "#ea580c",
  "Case Studies": "#475569",
};

function ArticleNotebookRibbon({ category, isHovered }: { category: string; isHovered: boolean }) {
  const color = ribbonColors[category] || "#1e293b";
  return (
    <motion.div
      style={{
        backgroundColor: color,
        transformOrigin: "top center",
      }}
      animate={{
        rotate: isHovered ? [0, 6, -4, 3, 0] : 0,
      }}
      transition={{
        duration: 1.5,
        ease: "easeInOut",
      }}
      className="absolute right-6 top-0 w-3 h-14 rounded-b shadow-[1px_2px_4px_rgba(0,0,0,0.15)] z-20"
    />
  );
}

function ArticleNotebookCover({ 
  post, 
  isHovered, 
  mousePos 
}: { 
  post: BlogPost; 
  isHovered: boolean; 
  mousePos: { x: number; y: number } 
}) {
  return (
    <div className="absolute inset-0 bg-[#faf8f5] border border-black/10 rounded-lg p-6 flex flex-col justify-between h-full select-none overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(rgba(0,0,0,0.015)_1px,transparent_1px)] bg-[size:12px_12px] pointer-events-none" />
      <div className="absolute left-0 inset-y-0 w-2.5 bg-black/[0.04] border-r border-black/[0.08]" />
      <div className="absolute left-[3px] inset-y-0 w-[1px] bg-white/40" />

      {isHovered && (
        <div 
          className="absolute inset-0 pointer-events-none opacity-40 blur-2xl transition-opacity duration-300"
          style={{
            background: `radial-gradient(150px circle at ${mousePos.x}px ${mousePos.y}px, rgba(99, 102, 241, 0.12), transparent)`,
          }}
        />
      )}

      <div className="pl-3">
        <span className="text-[10px] font-mono tracking-widest uppercase text-mute">{post.category}</span>
        <h4 className="text-lg font-serif font-bold text-slate-900 mt-3 leading-snug drop-shadow-sm">{post.title}</h4>
      </div>

      <div className="pl-3 flex items-center justify-between text-[10px] font-mono text-mute pt-4 border-t border-black/[0.03]">
        <div className="flex items-center gap-3">
          <span>{post.readTime} min read</span>
          <span>By {post.author}</span>
        </div>
        <ArrowUpRight size={14} className="text-slate-400 group-hover:text-slate-900 transition-colors" />
      </div>
    </div>
  );
}

function NotebookContent({ post, slug, onClose }: { post: BlogPost; slug: string; onClose: () => void }) {
  const getSummary = (title: string) => {
    if (title.includes("Flutter")) {
      return "Flutter isn't just for startups anymore. After deploying Flutter across multiple enterprise products, we've compiled our findings on building scale-ready applications with robust cross-platform architectures.";
    }
    if (title.includes("AI")) {
      return "Operational return-on-investment study on deploying custom LLM models for healthcare providers. We analyze real latency, accuracy tradeoffs, and integration cost reductions.";
    }
    if (title.includes("App Router")) {
      return "Deep dive into performance optimizations in Next.js 15, including server component caching, layout route nesting, and streaming strategies to optimize first-contentful-paint (FCP).";
    }
    return "Analyzing common architectural mistakes during system design integrations and operational scaling pipelines. Learn how to prevent database deadlocks and optimize write pipelines.";
  };

  const getTakeaways = (title: string) => {
    if (title.includes("Flutter")) {
      return ["Lower maintenance cost", "Consistent multi-platform UI", "Shared engineering pipelines", "Native platform access"];
    }
    if (title.includes("AI")) {
      return ["HIPAA-compliant hosting", "60% workflow time savings", "Structured JSON model schema", "Reduced context call costs"];
    }
    if (title.includes("App Router")) {
      return ["Optimized server components", "Partial pre-rendering (PPR)", "Segment level caching", "Minimal initial load bundle"];
    }
    return ["Clean domain isolation", "Explicit service layers", "Reduced query latency", "Robust fallback metrics"];
  };

  return (
    <div className="w-full h-full flex flex-col justify-between text-slate-800 bg-[#fdfcfa]">
      <div className="absolute inset-0 bg-[radial-gradient(rgba(0,0,0,0.01)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
      
      <div>
        <div className="pb-3 border-b border-black/[0.08]">
          <span className="text-[10px] font-mono tracking-widest text-slate-400 font-bold uppercase">{post.category}</span>
          <h4 className="text-lg font-serif font-bold text-slate-900 mt-1">{post.title}</h4>
          <p className="text-[10px] font-mono text-slate-400 mt-1">By {post.author} • {post.readTime} min read</p>
        </div>

        <div className="mt-5 space-y-4">
          <div>
            <h5 className="text-[10px] font-mono font-bold tracking-wider text-slate-400">SUMMARY</h5>
            <p className="text-xs text-slate-600 mt-1.5 leading-relaxed font-serif italic">{getSummary(post.title)}</p>
          </div>

          <div>
            <h5 className="text-[10px] font-mono font-bold tracking-wider text-slate-400">KEY TAKEAWAYS</h5>
            <ul className="mt-2 grid grid-cols-2 gap-2">
              {getTakeaways(post.title).map((item, idx) => (
                <li key={idx} className="flex items-center gap-1.5 text-xs text-slate-600 font-serif">
                  <span className="text-indigo-600">✓</span> {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="pt-4 border-t border-black/[0.04] flex items-center justify-between">
        <span className="text-[9px] font-mono text-slate-400">ZABNIX ENGINEERING NOTEBOOK</span>
        <Link 
          href={`/blog/${slug}`}
          onClick={onClose}
          className="inline-flex items-center gap-1 text-xs font-mono font-bold text-indigo-600 hover:text-indigo-800 transition-colors"
        >
          Read Article <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}

function ArticleNotebookCard({ post, index }: { post: BlogPost; index: number }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  return (
    <div 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className={`relative w-full transition-all duration-500 ${isOpen ? "col-span-1 md:col-span-2 h-[420px]" : "h-[260px]"}`}
      style={{ perspective: 1500 }}
    >
      <ArticleNotebookRibbon category={post.category} isHovered={isHovered && !isOpen} />

      <motion.div
        layout
        onClick={handleToggle}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          transformStyle: "preserve-3d",
          transformOrigin: "left center",
        }}
        animate={{
          y: isHovered && !isOpen ? -10 : 0,
          scale: isHovered && !isOpen ? 1.02 : 1,
          boxShadow: isHovered && !isOpen 
            ? "0 25px 40px -10px rgba(0,0,0,0.15)" 
            : "0 10px 20px -8px rgba(0,0,0,0.08)",
        }}
        transition={{ type: "spring", stiffness: 250, damping: 26, mass: 0.8 }}
        className="absolute inset-0 w-full h-full rounded-lg cursor-pointer overflow-hidden border border-black/5"
      >
        <AnimatePresence initial={false} mode="wait">
          {!isOpen ? (
            <motion.div
              key="cover"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 w-full h-full"
            >
              <ArticleNotebookCover post={post} isHovered={isHovered} mousePos={mousePos} />
            </motion.div>
          ) : (
            <motion.div
              key="content"
              initial={{ opacity: 0, rotateY: 90 }}
              animate={{ opacity: 1, rotateY: 0 }}
              exit={{ opacity: 0, rotateY: 90 }}
              transition={{ duration: 0.45 }}
              className="absolute inset-0 w-full h-full bg-[#fdfcfa] p-8 border border-black/10 rounded-lg shadow-inner"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                type="button"
                onClick={handleToggle}
                className="absolute top-4 right-4 text-xs font-mono text-slate-400 hover:text-slate-900 transition-colors"
                aria-label="Close notebook content"
              >
                [CLOSE]
              </button>
              <NotebookContent post={post} slug={post.slug} onClose={() => setIsOpen(false)} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

function SnapshotCard({ item, index, reduceMotion }: { item: typeof snapshotsData[number]; index: number; reduceMotion: boolean | null }) {
  const [isHovered, setIsHovered] = useState(false);
  const Component = item.Component;

  return (
    <Link href={`/blog/${item.slug}`}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: reduceMotion ? 0 : index * 0.1, ease: "easeOut" }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="group relative flex flex-col p-6 bg-white border border-hairline rounded-[24px] hover:border-indigo-500/20 hover:shadow-md transition-all duration-300 cursor-pointer h-[340px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink"
      >
        <div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-mute">{item.category}</span>
          
          <div className="relative w-full h-[150px] mt-4 mb-4 flex items-center justify-center bg-slate-50/50 rounded-xl border border-black/[0.02] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <motion.div
              animate={{ scale: isHovered ? 1.03 : 1 }}
              transition={{ duration: 0.3 }}
              className="w-full h-full flex items-center justify-center p-2"
            >
              <Component isHovered={isHovered} />
            </motion.div>
          </div>
          
          <h4 className="font-semibold text-sm text-ink group-hover:text-black transition-colors">{item.title}</h4>
          <p className="text-xs text-body mt-2 leading-relaxed line-clamp-2">{item.desc}</p>
        </div>
      </motion.div>
    </Link>
  );
}

const dispatches = [
  {
    num: "127",
    title: "Scaling 3 Million Requests / Day",
    readTime: "5 min read",
    preview: "How we optimized our database locks and write pipelines to scale database performance under high load."
  },
  {
    num: "126",
    title: "The Anatomy of a Memory Leak",
    readTime: "7 min read",
    preview: "Tracing and fixing a stubborn memory leak in our real-time synchronization server using Chrome DevTools."
  },
  {
    num: "125",
    title: "Migrating to Next App Router",
    readTime: "6 min read",
    preview: "Lessons learned from migrating a large enterprise operational dashboard to Next.js App Router."
  },
  {
    num: "124",
    title: "Designing ZerpAI Analytics",
    readTime: "8 min read",
    preview: "Building a highly performant, client-side data visualization charting engine with canvas primitives."
  }
];

export function BlogClient({ posts }: BlogClientProps) {
  const [activeFilter, setActiveFilter] = useState<(typeof filters)[number]>("All");
  const [visibleCount, setVisibleCount] = useState(4);
  const [topicIndex, setTopicIndex] = useState(0);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("featured");
  const reduceMotion = useReducedMotion();
  const newsRef = useRef<HTMLDivElement>(null);
  const [newsMousePos, setNewsMousePos] = useState({ x: 0, y: 0 });
  const [isNewsHovered, setIsNewsHovered] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [btnOffset, setBtnOffset] = useState({ x: 0, y: 0 });
  const [dispatchIndex, setDispatchIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setDispatchIndex((prev) => (prev + 1) % dispatches.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  // Desktop custom cursor state
  const [cursorText, setCursorText] = useState("");
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [showCursor, setShowCursor] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Intersection Observer for Scroll Spy
  useEffect(() => {
    const observers = sidebarSections.map((sec) => {
      const el = document.getElementById(sec.id);
      if (!el) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(sec.id);
          }
        },
        { threshold: 0.25, rootMargin: "-10% 0px -50% 0px" }
      );

      observer.observe(el);
      return { observer, el };
    });

    return () => {
      observers.forEach((obs) => {
        if (obs) obs.observer.unobserve(obs.el);
      });
    };
  }, []);

  useEffect(() => {
    if (reduceMotion) return;
    const interval = window.setInterval(() => {
      setTopicIndex((current) => (current + 1) % rotatingTopics.length);
    }, 3000);
    return () => window.clearInterval(interval);
  }, [reduceMotion]);

  const featuredPost = posts[0];
  const filteredPosts = useMemo(
    () => posts.filter((post) => matchesFilter(post, activeFilter)),
    [activeFilter, posts],
  );
  const articlePosts = filteredPosts.filter((post) => post.slug !== featuredPost?.slug);
  const displayedPosts = articlePosts.slice(0, visibleCount);

  function onFilterChange(filter: (typeof filters)[number]) {
    setActiveFilter(filter);
    setVisibleCount(4);
  }

  function handleSubscribe(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
  }

  return (
    <main className="min-h-screen bg-canvas pt-24 relative overflow-hidden">
      {/* Animated engineering grid background */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.035] bg-[linear-gradient(rgba(17,17,17,.045)_1px,transparent_1px),linear-gradient(90deg,rgba(17,17,17,.045)_1px,transparent_1px)] bg-[size:40px_40px]" 
        style={{
          animation: "gridPulse 20s linear infinite",
        }}
        aria-hidden="true" 
      />

      <style>{`
        @keyframes gridPulse {
          0%, 100% { background-position: 0px 0px; }
          50% { background-position: 20px 20px; }
        }
      `}</style>

      {/* Custom Cursor */}
      {showCursor && !reduceMotion && (
        <div
          className="fixed pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 bg-neutral-900 text-white font-mono text-[10px] tracking-wider uppercase px-3 py-1.5 rounded-full shadow-lg flex items-center justify-center border border-white/10"
          style={{
            left: `${cursorPos.x}px`,
            top: `${cursorPos.y}px`,
            transition: "transform 0.08s ease-out",
          }}
        >
          {cursorText}
        </div>
      )}

      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-hairline px-6 pb-12 pt-24 md:pb-16 md:pt-32">
        <div className="pointer-events-none absolute left-1/2 top-0 h-[480px] w-[700px] -translate-x-1/2 rounded-full bg-sky-100/25 blur-3xl" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-4xl"
          >
            <p className="mb-5 text-xs font-mono uppercase tracking-[0.24em] text-mute">The Zabnix Journal</p>
            <h1 className="max-w-4xl text-5xl font-semibold tracking-[-0.045em] text-ink md:text-7xl text-balance">
              Engineering insights &amp;{" "}
              <span className="relative inline-block min-w-[10ch] align-baseline">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={rotatingTopics[topicIndex].label}
                    initial={reduceMotion ? false : { opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduceMotion ? undefined : { opacity: 0, y: -14 }}
                    transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                    className={rotatingTopics[topicIndex].color}
                  >
                    {rotatingTopics[topicIndex].label}
                  </motion.span>
                </AnimatePresence>
              </span>
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-body md:text-xl">
              Practical perspectives from the engineers building production-grade software for businesses worldwide.
            </p>
            <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-sm text-mute">
              <span>120+ Articles</span><span aria-hidden="true">•</span><span>Weekly Newsletter</span><span aria-hidden="true">•</span><span>50+ Client Stories</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main content area */}
      <div className="mx-auto max-w-7xl px-6 py-12 lg:py-16 space-y-14 md:space-y-16">
          
          {/* Featured Article Section */}
          {featuredPost ? (
            <section 
              id="featured" 
              className="scroll-mt-32"
            >
              <Link
                href={`/blog/${featuredPost.slug}`}
                className="group grid overflow-hidden rounded-[32px] border border-[#eaeaea] bg-white shadow-[0_24px_65px_rgba(17,17,17,0.05)] transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:border-black/20 hover:shadow-[0_30px_72px_rgba(17,17,17,0.09)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-4 md:grid-cols-[1.1fr_.9fr]"
              >
                <div className="order-2 flex flex-col justify-center p-7 md:order-1 md:px-12 md:py-14">
                  <span className="w-fit rounded-full border border-black/10 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-600">
                    Lead Engineering Story
                  </span>
                  <div className="mt-7 flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] font-mono uppercase tracking-[0.12em] text-mute">
                    <span>Engineering</span>
                    <span aria-hidden="true">&bull;</span>
                    <time dateTime="2026-05-15">May 15, 2026</time>
                    <span aria-hidden="true">&bull;</span>
                    <span className="inline-flex items-center gap-1 normal-case tracking-normal"><Clock size={12} aria-hidden="true" />8 min read</span>
                  </div>
                  <h2 className="mt-6 max-w-xl text-4xl font-semibold tracking-tight text-ink text-balance md:text-[3.25rem] md:leading-[1.06]">
                    Why We Choose Flutter
                    <span className="block">for Enterprise Mobile</span>
                    <span className="block">Apps in 2026</span>
                  </h2>
                  <p className="mt-6 max-w-lg text-base leading-relaxed text-body md:text-lg">
                    Flutter isn&apos;t just for startups. Here&apos;s why it&apos;s becoming the default choice for enterprise mobile development.
                  </p>
                  <div className="mt-8 flex items-center gap-3">
                    <span className="flex size-10 items-center justify-center rounded-full bg-slate-900 text-xs font-semibold text-white">AM</span>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-ink">Aditya Menon <span className="font-normal text-mute">Lead Flutter Engineer</span></p>
                      <p className="mt-1 text-xs text-mute">Intermediate</p>
                    </div>
                  </div>
                  <div className="mt-8 border-t border-black/[0.08] pt-6">
                    <span className="inline-flex items-center gap-2 rounded-full bg-[#171717] px-5 py-3 text-sm font-semibold text-white transition-transform duration-300 group-hover:translate-x-1">
                      Read Article <ArrowUpRight size={17} aria-hidden="true" />
                    </span>
                  </div>
                </div>
                <div className="order-1 overflow-hidden md:order-2">
                  <div className="h-full transition-transform duration-500 group-hover:scale-[1.015]">
                    <FeaturedFlutterIllustration reduceMotion={reduceMotion} />
                  </div>
                </div>
              </Link>
            </section>
          ) : null}

          {/* Engineering Snapshots Section */}
          <section id="engineering-snapshots" className="scroll-mt-32 space-y-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <p className="text-xs font-mono uppercase tracking-[0.22em] text-mute">ENGINEERING SNAPSHOTS</p>
                <h3 className="text-3xl font-semibold tracking-tight text-ink mt-3">Key systems, visualized.</h3>
              </div>
            </div>
            
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {snapshotsData.map((item, idx) => (
                <SnapshotCard key={item.category} item={item} index={idx} reduceMotion={reduceMotion} />
              ))}
            </div>
          </section>

          {/* Latest Thinking (Filters & Article Grid) */}
          <section id="latest-thinking" className="scroll-mt-44 space-y-8 border-t border-hairline pt-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <p className="text-xs font-mono uppercase tracking-[0.22em] text-mute">Latest Thinking</p>
                <h2 className="mt-2 text-3xl font-semibold tracking-tight text-ink">Built from real work.</h2>
                
                {/* Filter buttons styled like Uiverse curved segmented container */}
                <div className="flex flex-nowrap md:flex-wrap items-center gap-1.5 w-fit max-w-full overflow-x-auto scrollbar-none p-1.5 rounded-2xl bg-white border border-neutral-200/80 shadow-sm mt-6">
                  {filters.map((filter) => (
                    <button
                      key={filter}
                      type="button"
                      suppressHydrationWarning
                      onClick={() => onFilterChange(filter)}
                      aria-pressed={activeFilter === filter}
                      className={`rounded-xl px-4 py-2 text-xs font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black shrink-0 ${
                        activeFilter === filter
                          ? "bg-neutral-900 text-white font-semibold shadow-sm"
                          : "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100/80"
                      }`}
                    >
                      {filter}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Grid layout with redesigned 3D Parallax Article Cards */}
            {displayedPosts.length > 0 ? (
              <div className="grid gap-8 sm:grid-cols-2">
                {displayedPosts.map((post, index) => (
                  <ArticleCard
                    key={post.slug}
                    post={post}
                    index={index}
                    reduceMotion={reduceMotion}
                  />
                ))}
              </div>
            ) : (
              <div className="rounded-[24px] border border-dashed border-hairline p-12 text-center">
                <p className="text-lg font-medium text-ink">No articles in this topic yet.</p>
                <p className="mt-2 text-sm text-body">Try another area of expertise.</p>
              </div>
            )}

            {articlePosts.length > visibleCount && (
              <div className="text-center pt-6">
                <button
                  type="button"
                  onClick={() => setVisibleCount((count) => count + 4)}
                  className="rounded-full border border-ink px-6 py-3 text-xs font-semibold text-ink hover:bg-ink hover:text-white transition-colors duration-200"
                >
                  Load more articles
                </button>
              </div>
            )}
          </section>
      </div>

      {/* Divider */}
      <hr className="border-t border-hairline w-full my-12" />

      {/* Main content area (bottom section) */}
      <div className="mx-auto max-w-7xl px-6 pb-20 space-y-28">
        {/* Newsletter Signup */}
          <section id="newsletter" className="scroll-mt-32">
            <motion.div 
              ref={newsRef}
              onMouseMove={(e) => {
                if (!newsRef.current) return;
                const rect = newsRef.current.getBoundingClientRect();
                setNewsMousePos({
                  x: e.clientX - rect.left,
                  y: e.clientY - rect.top,
                });
              }}
              onMouseEnter={() => setIsNewsHovered(true)}
              onMouseLeave={() => setIsNewsHovered(false)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="rounded-[32px] border border-black/[0.06] bg-white p-6 md:px-14 md:py-8 grid md:grid-cols-[46%_8%_46%] gap-0 items-center max-w-7xl mx-auto shadow-[0_8px_30px_rgb(0,0,0,0.01)] relative overflow-hidden h-auto md:h-[390px]"
            >
              {/* Left Side Content */}
              <div className="space-y-3.5 max-w-[520px]">
                <div>
                  <p className="text-[12px] font-mono uppercase tracking-[0.25em] text-neutral-500 font-semibold mb-2">
                    WEEKLY ENGINEERING DISPATCH
                  </p>
                  <motion.h2 
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.05 }}
                    className="text-4xl md:text-[52px] font-black text-[#111111] leading-[0.95] tracking-tight max-w-[520px]"
                  >
                    Stay close to the work.
                  </motion.h2>
                  <p className="mt-2.5 max-w-[430px] text-base md:text-[17px] text-neutral-600 leading-relaxed">
                    Every Friday we send one engineering insight, one production lesson, and one real-world case study from inside Zabnix.
                  </p>
                </div>

                {/* Form layout */}
                {subscribed ? (
                  <motion.div 
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="rounded-2xl border border-neutral-100 bg-neutral-50 p-4 text-sm text-[#111111] max-w-[430px]" 
                    aria-live="polite"
                  >
                    <span className="font-semibold block">✓ Joined Dispatch</span>
                    <span className="text-xs text-neutral-500 mt-1 block">Your first edition will arrive this Friday.</span>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubscribe} className="space-y-3 max-w-[480px]" aria-label="Newsletter signup">
                    <div className="flex flex-col sm:flex-row gap-3">
                      <div className="relative min-w-0">
                        <input 
                          id="newsletter-email" 
                          name="email" 
                          type="email" 
                          autoComplete="email" 
                          spellCheck={false} 
                          required 
                          suppressHydrationWarning
                          value={email} 
                          onChange={(event) => setEmail(event.target.value)} 
                          placeholder="Enter your email"
                          onFocus={() => setIsInputFocused(true)}
                          onBlur={() => setIsInputFocused(false)}
                          className={`w-full sm:w-[280px] h-[50px] rounded-full border bg-white px-6 text-sm text-[#111111] placeholder:text-neutral-400 focus:outline-none transition-all duration-200 ${
                            isInputFocused 
                              ? "border-[#111111] ring-2 ring-black/[0.03] pl-8 shadow-sm" 
                              : "border-neutral-300 pl-6"
                          }`} 
                        />
                      </div>
                      <motion.button 
                        type="submit" 
                        suppressHydrationWarning
                        onMouseMove={(e) => {
                          const rect = e.currentTarget.getBoundingClientRect();
                          const x = e.clientX - (rect.left + rect.width / 2);
                          const y = e.clientY - (rect.top + rect.height / 2);
                          setBtnOffset({ x: x * 0.08, y: y * 0.08 });
                        }}
                        onMouseLeave={() => setBtnOffset({ x: 0, y: 0 })}
                        animate={{ x: btnOffset.x, y: btnOffset.y }}
                        whileHover="hover"
                        whileTap={{ scale: 0.98 }}
                        className="h-[50px] rounded-full bg-[#111111] px-7 text-sm font-semibold text-white flex items-center justify-center gap-2 group transition-all duration-200 hover:bg-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] focus-visible:ring-offset-2 shrink-0 hover:-translate-y-0.5"
                      >
                        <span>Join Dispatch</span>
                        <motion.span 
                          variants={{
                            hover: { x: 5 }
                          }}
                          transition={{ type: "spring", stiffness: 300, damping: 20 }}
                          className="inline-block font-mono"
                        >
                          →
                        </motion.span>
                      </motion.button>
                    </div>
                  </form>
                )}

                {/* Footnote with avatars */}
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2.5 overflow-hidden">
                    {[
                      "bg-indigo-600",
                      "bg-violet-600",
                      "bg-emerald-600",
                      "bg-amber-600"
                    ].map((avatarColor, idx) => (
                      <motion.div
                        key={idx}
                        whileHover={{ x: idx === 0 ? 0 : -idx * 1.5 - 2, zIndex: 10 }}
                        className={`inline-block size-6 rounded-full border border-white flex items-center justify-center text-[8px] font-bold text-white shadow-sm ${avatarColor}`}
                      >
                        {["A", "S", "D", "K"][idx]}
                      </motion.div>
                    ))}
                  </div>
                  <span className="text-sm text-neutral-500 font-medium">
                    8,247 engineers receive this every Friday.
                  </span>
                </div>
              </div>

              {/* Vertical Divider */}
              <div className="hidden md:flex h-full items-center justify-center">
                <div className="w-[1px] bg-neutral-100 h-[70%]" />
              </div>

              {/* Right Side: Latest Dispatch Card */}
              <div className="w-full flex items-center justify-center md:justify-end">
                <Link href="/blog" className="block w-full max-w-[480px]">
                  <motion.div
                    onMouseEnter={() => setIsNewsHovered(true)}
                    onMouseLeave={() => setIsNewsHovered(false)}
                    animate={{
                      y: isNewsHovered ? -6 : 0,
                      boxShadow: isNewsHovered 
                        ? "0 20px 40px -15px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(0,0,0,0.06)"
                        : "0 4px 20px -10px rgba(0, 0, 0, 0.02), 0 0 0 1px rgba(0,0,0,0.04)"
                    }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="w-full h-[260px] bg-white rounded-[24px] border border-neutral-200 p-8 flex flex-col justify-between cursor-pointer relative overflow-hidden"
                  >
                    <div>
                      <div className="flex justify-between items-center pb-3 border-b border-neutral-100">
                        <span className="text-[10px] font-mono tracking-[0.25em] text-neutral-400 font-bold uppercase">
                          LATEST DISPATCH
                        </span>
                        <div className="h-[20px] overflow-hidden relative w-[80px]">
                          <AnimatePresence mode="wait">
                            <motion.div
                              key={dispatchIndex}
                              initial={{ y: 20, opacity: 0 }}
                              animate={{ y: 0, opacity: 1 }}
                              exit={{ y: -20, opacity: 0 }}
                              transition={{ type: "spring", stiffness: 120, damping: 14 }}
                              className="absolute right-0 text-[10px] font-mono font-bold text-neutral-400"
                            >
                              #{dispatches[dispatchIndex].num}
                            </motion.div>
                          </AnimatePresence>
                        </div>
                      </div>

                      <div className="mt-4 space-y-2">
                        <div className="h-[24px] overflow-hidden relative w-full">
                          <AnimatePresence mode="wait">
                            <motion.h4
                              key={dispatchIndex}
                              initial={{ y: 20, opacity: 0 }}
                              animate={{ y: 0, opacity: 1 }}
                              exit={{ y: -20, opacity: 0 }}
                              transition={{ type: "spring", stiffness: 120, damping: 14 }}
                              className="absolute left-0 text-[16px] font-bold text-[#111111] tracking-tight truncate w-full"
                            >
                              {dispatches[dispatchIndex].title}
                            </motion.h4>
                          </AnimatePresence>
                        </div>

                        <div className="flex items-center gap-2 text-[10px] font-mono text-neutral-400">
                          <AnimatePresence mode="wait">
                            <motion.span
                              key={dispatchIndex}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                            >
                              {dispatches[dispatchIndex].readTime}
                            </motion.span>
                          </AnimatePresence>
                          <span>•</span>
                          <span>Published Friday</span>
                        </div>

                        <div className="h-[40px] overflow-hidden relative w-full mt-2">
                          <AnimatePresence mode="wait">
                            <motion.p
                              key={dispatchIndex}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              className="absolute left-0 text-xs text-neutral-500 leading-relaxed line-clamp-2 w-full"
                            >
                              {dispatches[dispatchIndex].preview}
                            </motion.p>
                          </AnimatePresence>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between items-end border-t border-neutral-100 pt-3">
                      <span className="text-[9px] font-mono text-neutral-400 uppercase tracking-wider">
                        Updated every Friday
                      </span>
                      <span className="inline-flex items-center gap-1 text-[11px] font-mono font-bold text-[#111111] group relative">
                        <span>Read Preview</span>
                        <motion.span 
                          animate={isNewsHovered ? { x: 3 } : { x: 0 }}
                          transition={{ type: "spring", stiffness: 300, damping: 20 }}
                          className="inline-block"
                        >
                          →
                        </motion.span>
                        <span className={`absolute bottom-0 left-0 w-full h-[1px] bg-[#111111] transition-transform duration-300 origin-left ${
                          isNewsHovered ? "scale-x-100" : "scale-x-0"
                        }`} />
                      </span>
                    </div>
                  </motion.div>
                </Link>
              </div>
            </motion.div>
          </section>

      </div>
    </main>
  );
}
