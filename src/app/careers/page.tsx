import type { Metadata } from "next";
import { getJobRoles } from "@/sanity/lib/loaders";
import CareersClient from "./CareersClient";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Join Zabnix — build impactful software for real businesses and grow alongside a talented team of engineers and designers.",
};

export default async function CareersPage() {
  const openRoles = await getJobRoles();
  return <CareersClient initialRoles={openRoles} />;
}
