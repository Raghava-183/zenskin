import type { ReactNode } from "react";
import { SITE } from "@/lib/site";

const ICONS: Record<string, ReactNode> = {
  leaf: (
    <>
      <path d="M12 21c0-6 3-11 9-13-1 8-4 12-9 13Z" />
      <path d="M12 21c0-6-3-11-9-13 1 8 4 12 9 13Z" />
      <path d="M12 21v-6" />
    </>
  ),
  sun: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6 7 7M17 17l1.4 1.4M18.4 5.6 17 7M7 17l-1.4 1.4" />
    </>
  ),
  drop: <path d="M12 3c3.5 3 5.5 5.8 5.5 9a5.5 5.5 0 1 1-11 0c0-3.2 2-6 5.5-9Z" />,
  daily: (
    <>
      <path d="M4 7h16M4 12h16M4 17h10" />
      <circle cx="18" cy="17" r="2.4" />
    </>
  ),
};

const BENEFITS = [
  {
    icon: "leaf",
    key: "Tan",
    title: "Lifts what the sun left",
    body: "Built for the parts of your face no dupatta covers. Daily use loosens sun-dulled surface skin so your own tone comes back through.",
  },
  {
    icon: "sun",
    key: "Glow",
    title: "Bright, never bleached",
    body: "No whitening theatre and nothing that strips you raw. Clean skin, evener tone, and the glow that turns up on its own once both are true.",
  },
  {
    icon: "drop",
    key: "Aloe",
    title: "Cools the heat down",
    body: "Aloe vera leads the formula — it's the ingredient the bottle wears on its face. Soothing on skin that's spent an afternoon outdoors.",
  },
  {
    icon: "daily",
    key: "Daily",
    title: "Gentle enough for twice a day",
    body: `Herbal, light, and kind to every skin type — dry, oily or somewhere in between. One ${SITE.volumeMl} ml bottle runs about a month of twice-daily washes.`,
  },
];

export function Benefits() {
  return (
    <section id="why" className="py-[74px]">
      <div className="mx-auto max-w-[1160px] px-[22px]">
        <div className="mb-10 flex max-w-[60ch] flex-col gap-[14px]">
          <span className="eyebrow text-accent">What it does</span>
          <h2 className="font-display text-[clamp(2rem,4.2vw,2.9rem)] font-semibold tracking-[-0.012em]">
            Four things, done properly.
          </h2>
          <p className="max-w-[58ch] text-tx2">
            No twelve-step promise. {SITE.brand} has one job — take the day&apos;s
            sun off your face and leave the skin calmer than it found it.
          </p>
        </div>

        <div className="grid grid-cols-1 rounded-sm border border-edge bg-surface md:grid-cols-2 xl:grid-cols-4">
          {BENEFITS.map((b) => (
            <article
              key={b.key}
              className="flex flex-col gap-[11px] border-b border-edgesoft px-7 pt-[30px] pb-8 last:border-b-0 md:odd:border-r md:odd:border-edgesoft md:[&:nth-last-child(-n+2)]:border-b-0 xl:border-r xl:border-b-0 xl:last:border-r-0"
            >
              <svg
                className="h-[26px] w-[26px] text-accent"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                {ICONS[b.icon]}
              </svg>
              <span className="font-ui text-[10.5px] uppercase tracking-[0.2em] text-goldtx">
                {b.key}
              </span>
              <h3 className="font-display text-[1.42rem] font-semibold tracking-[-0.006em]">
                {b.title}
              </h3>
              <p className="text-[0.955rem] text-tx2">{b.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
