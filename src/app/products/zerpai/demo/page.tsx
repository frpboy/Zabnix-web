import type { Metadata } from "next";
import { VisitWebsiteButton } from "@/components/showcase/common/VisitWebsiteButton";
import { ERPWorkspace } from "@/components/showcase/zerpai/ERPWorkspace";

export const metadata: Metadata = { title: "ZerpAI ERP Demo", description: "Explore the ZerpAI ERP interactive product showcase." };

export default function ZerpAIDemoPage() {
  return (
    <div className="min-h-screen bg-canvas-soft px-4 pb-4 pt-24 md:px-6">
      <div className="mx-auto max-w-[1600px]">
        <ERPWorkspace />
        <footer className="flex justify-center pb-6 pt-6 sm:justify-end">
          <VisitWebsiteButton />
        </footer>
      </div>
    </div>
  );
}
