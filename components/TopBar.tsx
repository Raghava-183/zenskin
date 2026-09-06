import { SITE, whatsappOrderLink } from "@/lib/site";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { ThemeToggle } from "./ThemeToggle";

export function TopBar() {
  return (
    <header className="sticky top-0 z-50 border-b border-gold/35 bg-ink">
      <div className="mx-auto flex h-[58px] max-w-[1160px] items-center gap-4 px-[22px]">
        <span className="rounded-[3px] border-[1.5px] border-gold px-[11px] pt-[2px] pb-[3px] font-display text-[21px] font-bold leading-[1.25] tracking-[0.09em] text-labelwhite">
          {SITE.brand.toUpperCase()}
        </span>

        <span className="hidden font-ui text-[10.5px] uppercase tracking-[0.18em] text-labelwhite/60 sm:block">
          {SITE.company} · {SITE.address.city}
        </span>

        <div className="ml-auto flex items-center gap-3">
          <ThemeToggle />
          <a
            href={whatsappOrderLink({ qty: 1 })}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-sm bg-wa px-4 py-[9px] font-ui text-[11.5px] font-medium uppercase tracking-[0.11em] text-white transition-colors hover:bg-wadark"
          >
            <WhatsAppIcon />
            Order
          </a>
        </div>
      </div>
    </header>
  );
}
