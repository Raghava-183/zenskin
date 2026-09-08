import { SITE } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="bg-plum pt-14 pb-10 text-cream/70">
      <div className="mx-auto max-w-[1120px] px-[22px]">
        <div className="grid grid-cols-1 items-start gap-[34px] md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <span className="font-display text-[24px] font-bold tracking-[0.02em] text-cream">
              {SITE.brand}
            </span>
            <p className="mt-3 text-[0.92rem] leading-[1.75]">
              An aloe-led herbal face wash from {SITE.company} — made in{" "}
              {SITE.address.line1.split(",")[1]?.trim()}, {SITE.address.city},
              for skin that meets the sun every day.
            </p>
          </div>

          <div>
            <h2 className="mb-3 font-ui text-[10px] font-bold uppercase tracking-[0.2em] text-rose">
              Order &amp; enquiries
            </h2>
            <p className="text-[0.92rem] leading-[1.8]">
              WhatsApp{" "}
              <FootLink href={`https://wa.me/${SITE.whatsapp}`} external>
                {SITE.whatsappDisplay}
              </FootLink>
              <br />
              Email{" "}
              <FootLink href={`mailto:${SITE.email}`}>{SITE.email}</FootLink>
              <br />
              Customer care {SITE.customerCare}
            </p>
          </div>

          <div>
            <h2 className="mb-3 font-ui text-[10px] font-bold uppercase tracking-[0.2em] text-rose">
              Where we are
            </h2>
            <address className="text-[0.92rem] leading-[1.8] not-italic">
              {SITE.company}
              <br />
              {SITE.address.line1}
              <br />
              {SITE.address.city} – {SITE.address.pin}
              <br />
              {SITE.address.state}, {SITE.address.country}
            </address>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap justify-between gap-4 border-t border-white/12 pt-5 text-[0.8rem] text-cream/45">
          <span>
            © {new Date().getFullYear()} {SITE.company}. {SITE.brand} is a
            cosmetic product for external use only.
          </span>
          <span>
            Keep away from eyes. Store below 30 °C, away from direct sunlight.
          </span>
        </div>
      </div>
    </footer>
  );
}

function FootLink({
  href,
  children,
  external,
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="border-b border-rose/40 text-cream/90 transition-colors hover:border-rose hover:text-white"
    >
      {children}
    </a>
  );
}
