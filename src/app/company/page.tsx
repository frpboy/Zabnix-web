import type { Metadata } from "next";
import CompanyClient from "./CompanyClient";

export const metadata: Metadata = {
  title: "Company — Meet the Team",
  description:
    "Meet the Zabnix team — engineers, designers, and strategists distributed across India, UAE, KSA, and Singapore, building world-class enterprise software.",
  openGraph: {
    title: "Company — Meet the Team | Zabnix",
    description:
      "Designers, engineers, and strategists united by a belief that great software changes how businesses operate.",
  },
};

export default function CompanyPage() {
  return <CompanyClient />;
}
