import Image from "next/image";
import { SITE, money, whatsappOrderLink } from "@/lib/site";
import { WhatsAppIcon } from "./WhatsAppIcon";

export function Hero() {
  return (
    <section className="bg-bg pt-10 pb-14 sm:pt-14 sm:pb-16">
      <div className="mx-auto max-w-[1120px] px-[22px]">
        <div className="grid items-center gap-9 md:grid-cols-[1.05fr_0.95fr] md:gap-12">
          {/* ── words ── */}
          <div className="order-2 text-center md:order-1 md:text-left">
            <div className="eyebrow flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-label md:justify-start">
              <span>Herbal face wash</span>
              <span className="h-[5px] w-[5px] shrink-0 rounded-full bg-leaf" />
              <span>Aloe vera</span>
              <span className="h-[5px] w-[5px] shrink-0 rounded-full bg-leaf" />
              <span>{SITE.volumeMl} ml</span>
            </div>

            <h1 className="mt-4 font-display text-[clamp(2.9rem,7.6vw,4.9rem)] font-semibold tracking-[-0.015em] text-tx">
              Tan off.
              <br />
              <em className="text-rose italic">Glow</em> on.
            </h1>

            <p className="mx-auto mt-5 max-w-[44ch] text-[1.04rem] text-tx2 md:mx-0">
              {SITE.brand} is an aloe-led herbal face wash made for Indian skin
              and the Indian sun. It lifts the tan the day leaves behind, cools
              the heat off your face, and hands back skin that feels soft, calm
              and bright.
            </p>

            <div className="mt-7 flex flex-wrap items-center justify-center gap-3 md:justify-start">
              <a
                href={whatsappOrderLink({ qty: 1 })}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-[9px] rounded-pill bg-rose px-6 py-[13px] font-body text-[12.5px] font-bold uppercase tracking-[0.1em] text-white transition-colors hover:bg-rosedeep"
              >
                <WhatsAppIcon />
                Order on WhatsApp
              </a>
              <a
                href="#ritual"
                className="inline-flex items-center rounded-pill border border-edge px-6 py-[13px] font-body text-[12.5px] font-bold uppercase tracking-[0.1em] text-tx transition-colors hover:border-rose hover:text-rose"
              >
                How to use
              </a>
            </div>

            <div className="mt-6 flex items-baseline justify-center gap-[10px] md:justify-start">
              <span className="font-display text-[2.3rem] font-semibold leading-none text-tx">
                {money(SITE.price)}
              </span>
              <span className="font-body text-[10.5px] font-semibold uppercase tracking-[0.16em] text-tx3">
                {SITE.volumeMl} ml · all taxes in
              </span>
            </div>
          </div>

          {/* ── bottle on its stage ── */}
          <div className="stage order-1 min-h-[300px] p-7 md:order-2 md:min-h-[420px]">
            <Image
              src="/zenskin-front.webp"
              alt={`${SITE.brand} ${SITE.volumeMl} ml aloe vera herbal face wash bottle`}
              width={520}
              height={1434}
              priority
              sizes="(max-width: 768px) 150px, 210px"
              className="float relative w-[150px] drop-shadow-[0_24px_36px_rgba(0,0,0,0.5)] md:w-[210px]"
            />
            <span className="absolute right-4 bottom-4 rounded-pill bg-white/12 px-[14px] py-[6px] font-body text-[10px] font-bold uppercase tracking-[0.16em] text-cream/85 backdrop-blur-sm">
              {SITE.bottlesSold.toLocaleString("en-IN")}+ sold
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
