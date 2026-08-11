"use client";

import dynamic from "next/dynamic";

const ZabnixChatbot = dynamic(
  () => import("@/components/ui/ZabnixChatbot").then((m) => m.ZabnixChatbot),
  { ssr: false }
);

export function GlobalChatbotWrapper() {
  return <ZabnixChatbot />;
}
