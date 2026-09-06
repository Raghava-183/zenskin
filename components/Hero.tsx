import Image from "next/image";
import { SITE, money, whatsappOrderLink } from "@/lib/site";
import { WhatsAppIcon } from "./WhatsAppIcon";

export function Hero() {
  return (
    <section className="hero-panel relative overflow-hidden border-b border-gold/30 text-labelwhite">
      <div className="relative z-10 mx-auto max-w-[1160px] px-[22px]">
        <div className="grid items-center gap-11 py-11 text-center md:grid-cols-[1.08fr_0.92fr] md:py-16 md:text-left">
          {/* ── words ── */}
          <div className="order-2 md:order-1">
            <div className="eyebrow flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-gold md:justify-start">
              <span>{SITE.tagline.split("—")[0].trim()}</span>
              <span className="h-1 w-1 shrink-0 rounded-full bg-aloe" />
              <span>Aloe Vera</span>
              <span className="h-1 w-1 shrink-0 rounded-full bg-aloe" />
              <span>{SITE.volumeMl} ml</span>
            </div>

            <h1 className="mt-[18px] font-display text-[clamp(3.1rem,8.2vw,5.5rem)] font-semibold tracking-[-0.018em] text-white">
              Wash the
              <br />
              <em className="foil font-medium italic">sun</em> off.
            </h1>

            <p className="mx-auto mt-5 max-w-[47ch] text-[1.06rem] font-light text-[#e9f1fa]/85 md:mx-0">
              {SITE.brand} is an aloe-led herbal face wash built for Indian skin
              and the Indian sun. It lifts the tan the day leaves behind, cools
              the heat off your face, and hands back skin that looks bright, soft
              and awake.
            </p>

            <div className="mt-[30px] flex flex-wrap items-center justify-center gap-3 md:justify-start">
              <a
                href={whatsappOrderLink({ qty: 1 })}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-[9px] rounded-sm bg-wa px-5 py-3 font-ui text-[13px] font-medium uppercase tracking-[0.11em] text-white transition-colors hover:bg-wadark"
              >
                <WhatsAppIcon />
                Order on WhatsApp
              </a>
              <a
                href="#ritual"
                className="inline-flex items-center rounded-sm border border-gold/60 px-5 py-3 font-ui text-[13px] font-medium uppercase tracking-[0.11em] text-goldhi transition-colors hover:border-gold hover:bg-gold/15"
              >
                The two-minute ritual
              </a>
            </div>

            <div className="mt-[26px] flex items-baseline justify-center gap-2 border-t border-gold/25 pt-5 md:justify-start">
              <span className="font-display text-[2.5rem] font-semibold leading-none text-white">
                {money(SITE.price)}
              </span>
              <span className="font-ui text-[11px] uppercase tracking-[0.17em] text-[#e9f1fa]/60">
                M.R.P. · {SITE.volumeMl} ml bottle · incl. of all taxes
              </span>
            </div>
          </div>

          {/* ── bottle ── */}
          <div className="relative order-1 flex min-h-[300px] items-center justify-center md:order-2 md:min-h-[380px]">
            <div
              aria-hidden="true"
              className="absolute aspect-square w-[76%] rounded-full bg-[radial-gradient(circle,rgba(216,176,74,0.3)_0%,rgba(216,176,74,0.09)_42%,transparent_70%)] blur-[6px]"
            />
            <div className="relative w-[58%] max-w-[210px] md:w-[74%] md:max-w-[268px]">
              <span className="side-tab absolute top-1/2 -left-10 hidden -translate-y-1/2 rotate-180 xl:block">
                Soothing <span className="text-[#c22e24]">Herbal</span> Liquid
              </span>

              <Image
                src="/zenskin-front.webp"
                alt={`${SITE.brand} ${SITE.volumeMl} ml aloe vera herbal face wash bottle with a gold flip cap and deep blue label`}
                width={520}
                height={1434}
                priority
                sizes="(max-width: 768px) 210px, 268px"
                className="float relative w-full drop-shadow-[0_30px_44px_rgba(0,0,0,0.55)]"
              />

              <span className="side-tab absolute top-1/2 -right-10 hidden -translate-y-1/2 text-[#c22e24] xl:block">
                For bright &amp; healthy skin
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
