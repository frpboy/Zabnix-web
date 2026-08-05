import Link from "next/link";

type LetterRevealLinkProps = {
  href: string;
  label: string;
};

const revealDelays = [
  "group-hover:delay-0 group-focus-visible:delay-0",
  "group-hover:delay-100 group-focus-visible:delay-100",
  "group-hover:delay-200 group-focus-visible:delay-200",
  "group-hover:delay-300 group-focus-visible:delay-300",
  "group-hover:delay-[400ms] group-focus-visible:delay-[400ms]",
  "group-hover:delay-500 group-focus-visible:delay-500",
];

export function LetterRevealLink({ href, label }: LetterRevealLinkProps) {
  return (
    <Link
      href={href}
      aria-label={label}
      className="group relative inline-grid touch-manipulation overflow-hidden rounded-full border border-black bg-white px-7 py-3.5 text-sm font-black uppercase tracking-wide text-black [-webkit-tap-highlight-color:transparent] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
    >
      <span
        className="absolute inset-0 grid place-items-center bg-black text-white transition-transform duration-200 [transition-timing-function:cubic-bezier(0.87,0,0.13,1)] group-hover:translate-y-full group-focus-visible:translate-y-full"
        aria-hidden="true"
      >
        {label}
      </span>
      <span className="inline-flex" aria-hidden="true">
        {Array.from(label).map((character, index) => (
          <span
            key={`${character}-${index}`}
            className={`delay-0 opacity-0 transition-[opacity,transform] duration-200 [transition-timing-function:cubic-bezier(0.87,0,0.13,1)] ${revealDelays[Math.min(index, revealDelays.length - 1)]} ${index % 2 === 0 ? "-translate-y-3.5" : "translate-y-3.5"} group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100`}
          >
            {character === " " ? "\u00a0" : character}
          </span>
        ))}
      </span>
    </Link>
  );
}
