"use client";

import { useRef, useState } from "react";
import { SITE, money } from "@/lib/site";

const LINES: { text: string; tag: string }[] = [
  { text: "Tan off. Glow on.", tag: "Poster" },
  { text: "Aloe does the work. You take the compliments.", tag: "Reel" },
  { text: `${SITE.volumeMl} ml of shade for your skin.`, tag: "Shelf-talker" },
  { text: "Bright skin isn't a filter. It's a habit.", tag: "Instagram" },
  {
    text: `Made in ${SITE.address.city}, for the ${SITE.address.city} sun.`,
    tag: "Poster",
  },
  { text: "Two minutes, cool water, a brighter face.", tag: "How-to reel" },
  { text: "Herbal enough for daily. Honest enough for summer.", tag: "Shelf-talker" },
  {
    text: `The tan came free. Taking it off costs ${money(SITE.price)}.`,
    tag: "WhatsApp status",
  },
  { text: "Your skin remembers kindness.", tag: "Instagram" },
];

export function CampaignLines() {
  return (
    <>
      <hr className="border-0 border-t border-edgesoft" />
      <section id="lines" className="py-[74px]">
        <div className="mx-auto max-w-[1120px] px-[22px]">
          <div className="mb-10 flex max-w-[60ch] flex-col gap-[14px]">
            <span className="eyebrow text-rose">Campaign lines</span>
            <h2 className="font-display text-[clamp(2rem,4.2vw,2.9rem)] font-semibold tracking-[-0.012em]">
              Say it in one line.
            </h2>
            <p className="max-w-[58ch] text-tx2">
              Ready-made copy in {SITE.brand}&apos;s voice — for posters, reels,
              shelf-talkers and WhatsApp status. Tap a line to copy it and paste
              it straight into your design.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-[14px] sm:grid-cols-2 lg:grid-cols-3">
            {LINES.map((line) => (
              <LineCard key={line.text} text={line.text} tag={line.tag} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function LineCard({ text, tag }: { text: string; tag: string }) {
  const [label, setLabel] = useState<"Copy" | "Copied" | "Press Ctrl+C">("Copy");
  const quoteRef = useRef<HTMLQuoteElement>(null);

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setLabel("Copied");
      setTimeout(() => setLabel("Copy"), 1600);
    } catch {
      // Clipboard blocked (older browser, or an insecure origin).
      // Select the text so the reader can copy it by hand.
      const node = quoteRef.current;
      if (node) {
        const range = document.createRange();
        range.selectNodeContents(node);
        const sel = window.getSelection();
        sel?.removeAllRanges();
        sel?.addRange(range);
      }
      setLabel("Press Ctrl+C");
      setTimeout(() => setLabel("Copy"), 2400);
    }
  }

  return (
    <div className="flex flex-col gap-[14px] rounded-card border border-edge bg-surface px-[22px] pt-[22px] pb-4 transition-colors hover:border-rose">
      <q ref={quoteRef} className="font-display text-[1.34rem] leading-[1.3] tracking-[-0.004em] [quotes:none]">
        {text}
      </q>
      <div className="mt-auto flex items-center justify-between gap-3">
        <span className="rounded-full border border-edge px-[10px] py-[3px] font-ui text-[9.5px] uppercase tracking-[0.19em] text-tx3">
          {tag}
        </span>
        <button
          type="button"
          onClick={copy}
          className={`cursor-pointer px-[2px] py-[5px] font-ui text-[10.5px] uppercase tracking-[0.16em] hover:underline ${
            label === "Copy" ? "text-rose" : "text-label"
          }`}
        >
          {label}
        </button>
      </div>
    </div>
  );
}
