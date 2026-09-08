import { SITE, whatsappOrderLink } from "@/lib/site";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { ThemeToggle } from "./ThemeToggle";

export function TopBar() {
  return (
    <header className="sticky top-0 z-50 border-b border-edgesoft bg-bg/90 backdrop-blur-md">
      <div className="mx-auto flex h-[62px] max-w-[1120px] items-center gap-4 px-[22px]">
        <span className="font-display text-[22px] font-bold tracking-[0.02em] text-tx">
          {SITE.brand}
        </span>

        <span className="hidden font-body text-[10px] font-bold uppercase tracking-[0.18em] text-tx3 sm:block">
          {SITE.company} · {SITE.address.city}
        </span>

        <div className="ml-auto flex items-center gap-3">
          <ThemeToggle />
          <a
            href={whatsappOrderLink({ qty: 1 })}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-pill bg-rose px-[18px] py-[9px] font-body text-[11px] font-bold uppercase tracking-[0.1em] text-white transition-colors hover:bg-rosedeep"
          >
            <WhatsAppIcon />
            Order
          </a>
        </div>
      </div>
    </header>
  );
}
