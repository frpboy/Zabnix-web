import type { Metadata } from "next";
import PeopleClient from "./PeopleClient";

export const metadata: Metadata = {
  title: "People — Meet the Team",
  description:
    "Meet the Zabnix team — engineers, designers, and strategists building world-class enterprise software.",
  openGraph: {
    title: "People — Meet the Team | Zabnix",
    description:
      "Designers, engineers, and strategists united by a belief that great software changes how businesses operate.",
  },
};

export default function PeoplePage() {
  return <PeopleClient />;
}
