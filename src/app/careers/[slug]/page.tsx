import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, MapPin, Clock, Building2, CheckCircle2 } from "lucide-react";
import { openRoles } from "@/lib/data";
import { JobApplicationForm } from "@/components/forms/JobApplicationForm";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return openRoles.map((role) => ({
    slug: role.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const role = openRoles.find((r) => r.slug === slug);
  if (!role) return {};

  return {
    title: `${role.title} | Careers`,
    description: role.description,
  };
}

export default async function JobRolePage({ params }: Props) {
  const { slug } = await params;
  const role = openRoles.find((r) => r.slug === slug);

  if (!role) {
    notFound();
  }

  return (
    <div className="pt-24 min-h-screen">
      {/* Header */}
      <section className="py-20 px-6 grid-bg relative overflow-hidden border-b border-white/8">
        <div
          className="orb orb-purple"
          style={{
            width: "500px",
            height: "500px",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            opacity: 0.12,
          }}
          aria-hidden="true"
        />
        <div className="max-w-4xl mx-auto relative z-10">
          <Link
            href="/careers"
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-white transition-colors duration-200 mb-8 group"
          >
            <ArrowLeft
              size={14}
              className="translate-x-0 group-hover:-translate-x-1 transition-transform duration-200"
              aria-hidden="true"
            />
            Back to Careers
          </Link>

          <h1
            className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-6"
            style={{ textWrap: "balance" }}
          >
            {role.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
            <span className="flex items-center gap-1">
              <Building2 size={14} className="text-gray-500" aria-hidden="true" />
              {role.department}
            </span>
            <span className="text-gray-700" aria-hidden="true">·</span>
            <span className="flex items-center gap-1">
              <MapPin size={14} className="text-gray-500" aria-hidden="true" />
              {role.location}
            </span>
            <span className="text-gray-700" aria-hidden="true">·</span>
            <span className="flex items-center gap-1">
              <Clock size={14} className="text-gray-500" aria-hidden="true" />
              {role.type}
            </span>
          </div>
        </div>
      </section>

      {/* Content & Form */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Details */}
          <div className="lg:col-span-7 space-y-10">
            <div>
              <h2 className="text-lg font-bold text-white mb-4">About the Role</h2>
              <p className="text-gray-400 leading-relaxed text-sm md:text-base">
                {role.description}
              </p>
            </div>

            <div>
              <h2 className="text-lg font-bold text-white mb-4">Key Responsibilities</h2>
              <ul className="space-y-3">
                {role.responsibilities.map((resp, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle2
                      size={15}
                      className="text-violet-400 mt-0.5 shrink-0"
                      aria-hidden="true"
                    />
                    <span className="text-sm text-gray-400 leading-relaxed">{resp}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-lg font-bold text-white mb-4">Requirements</h2>
              <ul className="space-y-3">
                {role.requirements.map((req, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle2
                      size={15}
                      className="text-violet-400 mt-0.5 shrink-0"
                      aria-hidden="true"
                    />
                    <span className="text-sm text-gray-400 leading-relaxed">{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Application Form Sidebar */}
          <div className="lg:col-span-5">
            <div className="sticky top-28 border border-white/8 bg-[#0a0a0a] rounded-2xl p-6 md:p-8 space-y-6">
              <h2 className="text-lg font-bold text-white">Apply for this role</h2>
              <JobApplicationForm roleTitle={role.title} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
