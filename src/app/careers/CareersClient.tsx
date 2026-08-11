"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Briefcase,
  Check,
  ChevronDown,
  Clock,
  Code2,
  Globe,
  Heart,
  Layers,
  Mail,
  MapPin,
  Palette,
  Search,
  Server,
  Smartphone,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { JobRole } from "@/lib/data";

interface CareersClientProps {
  initialRoles: JobRole[];
}

const perks = [
  { icon: Globe, title: "Remote First", desc: "Work from anywhere, with async-friendly processes." },
  { icon: TrendingUp, title: "Equity Options", desc: "Meaningful ownership in a fast-growing company." },
  { icon: Heart, title: "Health Insurance", desc: "Comprehensive coverage for you and your family." },
  { icon: Sparkles, title: "Learning Budget", desc: "Budget for courses, books, and conferences." },
  { icon: LaptopIcon, title: "Home Office Setup", desc: "MacBook Pro + home office setup on day one." },
  { icon: Clock, title: "Flexible Hours", desc: "Own your schedule. We care about output, not hours." },
];

function getRoleIcon(department: string) {
  switch (department.toLowerCase()) {
    case "engineering":
      return Code2;
    case "mobile":
      return Smartphone;
    case "ai":
      return Sparkles;
    case "design":
      return Palette;
    case "infrastructure":
      return Server;
    case "sales":
      return Briefcase;
    default:
      return Code2;
  }
}

function LaptopIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5" {...props}>
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
      <line x1="2" y1="20" x2="22" y2="20" />
    </svg>
  );
}

export default function CareersClient({ initialRoles }: CareersClientProps) {
  const [selectedDepartment, setSelectedDepartment] = useState("All Departments");
  const [selectedLocation, setSelectedLocation] = useState("All Locations");
  const [isRemoteOnly, setIsRemoteOnly] = useState(false);
  const reduceMotion = useReducedMotion();

  // Extract unique departments & locations for filter dropdowns
  const departments = useMemo(() => {
    const set = new Set(initialRoles.map((r) => r.department));
    return ["All Departments", ...Array.from(set)];
  }, [initialRoles]);

  const locations = useMemo(() => {
    const set = new Set(initialRoles.map((r) => r.location));
    return ["All Locations", ...Array.from(set)];
  }, [initialRoles]);

  // Compute filtered roles
  const filteredRoles = useMemo(() => {
    return initialRoles.filter((role) => {
      if (selectedDepartment !== "All Departments" && role.department !== selectedDepartment) {
        return false;
      }
      if (selectedLocation !== "All Locations" && role.location !== selectedLocation) {
        return false;
      }
      if (isRemoteOnly && !role.location.toLowerCase().includes("remote")) {
        return false;
      }
      return true;
    });
  }, [initialRoles, selectedDepartment, selectedLocation, isRemoteOnly]);

  return (
    <div className="pt-24 min-h-screen bg-canvas text-ink">
      {/* ── Hero Section ────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-hairline bg-canvas px-6 pb-16 pt-24 md:pb-20 md:pt-28 grid-bg">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="max-w-3xl space-y-6 text-left"
          >
            <p className="text-xs font-mono uppercase tracking-[0.2em] text-mute font-semibold">
              CAREERS AT ZABNIX
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 leading-[1.08]">
              Build the future <br />
              with us.
            </h1>
            <p className="text-base sm:text-lg leading-relaxed text-slate-600 max-w-xl font-normal">
              We&apos;re a team of builders, thinkers, and problem solvers creating software that makes an impact.
            </p>

            {/* 3 Key Highlights */}
            <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="btn-shape-card rounded-2xl border border-slate-200/80 bg-white p-3.5 flex items-center gap-3 shadow-2xs">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-black border border-slate-200">
                  <Globe size={16} />
                </div>
                <div className="btn-shape-text">
                  <h3 className="text-xs font-bold text-slate-900 leading-tight">Remote-first</h3>
                  <p className="text-[11px] text-slate-500 font-medium">Work from anywhere</p>
                </div>
              </div>

              <div className="btn-shape-card rounded-2xl border border-slate-200/80 bg-white p-3.5 flex items-center gap-3 shadow-2xs">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-black border border-slate-200">
                  <TrendingUp size={16} />
                </div>
                <div className="btn-shape-text">
                  <h3 className="text-xs font-bold text-slate-900 leading-tight">Grow together</h3>
                  <p className="text-[11px] text-slate-500 font-medium">Learn, share, and grow</p>
                </div>
              </div>

              <div className="btn-shape-card rounded-2xl border border-slate-200/80 bg-white p-3.5 flex items-center gap-3 shadow-2xs">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-black border border-slate-200">
                  <Heart size={16} />
                </div>
                <div className="btn-shape-text">
                  <h3 className="text-xs font-bold text-slate-900 leading-tight">Impact driven</h3>
                  <p className="text-[11px] text-slate-500 font-medium">Build products that matter</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Why Join Us (Perks) ────────────────────────────────────────────────── */}
      <section className="py-16 md:py-20 px-6 border-b border-hairline bg-canvas-soft-2/30" aria-labelledby="why-join-heading">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="text-center space-y-2">
            <span className="inline-block rounded-full bg-[#f1f5f9] border border-slate-200 px-3.5 py-1 font-mono text-[10px] font-bold tracking-widest uppercase text-slate-800">
              WHY JOIN US
            </span>
            <h2 id="why-join-heading" className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900">
              Built for engineering excellence
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {perks.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="group rounded-2xl border border-[#e5e9f0] bg-white p-5 shadow-2xs hover:shadow-xs hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-black border border-slate-200 mb-4 transition-transform duration-300 group-hover:scale-105">
                    <Icon size={18} aria-hidden="true" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 mb-1.5">
                    {title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed font-normal">
                    {desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Open Roles Section ─────────────────────────────────────────────────── */}
      <section className="py-16 md:py-24 px-4 sm:px-6 bg-canvas" aria-labelledby="roles-heading">
        <div className="max-w-5xl mx-auto space-y-8">
          {/* Header Controls Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
            <div className="flex items-center gap-3">
              <h2 id="roles-heading" className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900">
                Open Roles
              </h2>
              <span className="flex h-6 px-2.5 items-center justify-center rounded-full bg-slate-200/80 text-xs font-mono font-bold text-slate-800">
                {filteredRoles.length}
              </span>
            </div>

            {/* Filter Row */}
            <div className="flex flex-wrap items-center gap-2.5">
              {/* Department Dropdown */}
              <div className="relative">
                <select
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                  aria-label="Filter by department"
                  className="appearance-none rounded-full border border-slate-300 bg-white px-4 py-2 pr-9 text-xs font-bold text-slate-800 focus:border-black focus:outline-none focus:ring-1 focus:ring-black cursor-pointer shadow-2xs hover:border-slate-400 transition-colors"
                >
                  {departments.map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
                <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
              </div>

              {/* Location Dropdown */}
              <div className="relative">
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  aria-label="Filter by location"
                  className="appearance-none rounded-full border border-slate-300 bg-white px-4 py-2 pr-9 text-xs font-bold text-slate-800 focus:border-black focus:outline-none focus:ring-1 focus:ring-black cursor-pointer shadow-2xs hover:border-slate-400 transition-colors"
                >
                  {locations.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
                <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
              </div>

              {/* Remote Toggle Pill */}
              <button
                type="button"
                onClick={() => setIsRemoteOnly((prev) => !prev)}
                aria-pressed={isRemoteOnly}
                className={`flex items-center gap-1.5 rounded-full border px-4 py-2 text-xs font-bold transition-all shadow-2xs ${
                  isRemoteOnly
                    ? "border-black bg-black text-white"
                    : "border-slate-300 bg-white text-slate-800 hover:border-slate-400"
                }`}
              >
                <Globe size={13} aria-hidden="true" />
                <span>Remote</span>
                {isRemoteOnly && <Check size={13} className="ml-0.5" aria-hidden="true" />}
              </button>
            </div>
          </div>

          {/* Job Listings Rows */}
          <div className="space-y-3">
            <AnimatePresence mode="popLayout" initial={false}>
              {filteredRoles.length > 0 ? (
                filteredRoles.map((role) => {
                  const RoleIcon = getRoleIcon(role.department);
                  return (
                    <motion.div
                      key={role.slug}
                      initial={reduceMotion ? false : { opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={reduceMotion ? undefined : { opacity: 0, y: -6 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Link
                        href={`/careers/${role.slug}`}
                        className="group flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-[#e5e9f0] bg-white p-4 sm:px-6 sm:py-5 shadow-2xs hover:shadow-xs hover:-translate-y-0.5 hover:border-slate-300 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black"
                      >
                        <div className="flex items-center gap-4 min-w-0">
                          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-black border border-slate-200 group-hover:bg-black group-hover:text-white transition-colors duration-200">
                            <RoleIcon size={18} aria-hidden="true" />
                          </div>
                          <div className="min-w-0">
                            <h3 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-black transition-colors leading-tight truncate">
                              {role.title}
                            </h3>
                            <p className="mt-1 text-xs font-mono text-slate-500 truncate">
                              {role.department} &bull; {role.location} &bull; {role.type}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900 shrink-0 self-end sm:self-auto group-hover:text-black">
                          <span>Apply</span>
                          <ArrowRight
                            size={14}
                            className="translate-x-0 group-hover:translate-x-1 transition-transform duration-200"
                            aria-hidden="true"
                          />
                        </div>
                      </Link>
                    </motion.div>
                  );
                })
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="rounded-2xl border border-slate-200 bg-white p-8 text-center space-y-2"
                >
                  <p className="text-sm font-bold text-slate-900">
                    No roles match these filters.
                  </p>
                  <p className="text-xs text-slate-500 font-medium">
                    Try changing your department or location filters.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Don't See Your Role Section */}
          <div className="pt-6">
            <div className="rounded-[28px] border border-[#e5e9f0] bg-white p-6 sm:p-8 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-slate-100 text-black border border-slate-200">
                  <Mail size={20} aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-slate-900 leading-tight">
                    Don&apos;t see your role?
                  </h3>
                  <p className="mt-1 text-xs leading-relaxed text-slate-600 font-medium max-w-lg">
                    We&apos;re always looking for talented people. Send us your portfolio and tell us how you&apos;d contribute.
                  </p>
                </div>
              </div>

              <a
                href="mailto:careers@zabnix.com"
                className="inline-flex items-center gap-2 rounded-full bg-black px-6 py-3.5 text-xs font-bold text-white shadow-xs hover:bg-neutral-800 transition-colors shrink-0 self-start sm:self-auto"
              >
                <span>Email careers@zabnix.com</span>
                <ArrowRight size={14} aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
