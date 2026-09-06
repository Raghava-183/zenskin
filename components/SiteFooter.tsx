import { SITE } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-gold/30 bg-ink pt-13 pb-10 text-labelwhite/70">
      <div className="mx-auto max-w-[1160px] px-[22px]">
        <div className="grid grid-cols-1 items-start gap-[34px] md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <span className="inline-block rounded-[3px] border-[1.5px] border-gold px-[11px] pt-[2px] pb-[3px] font-display text-[21px] font-bold leading-[1.25] tracking-[0.09em] text-labelwhite">
              {SITE.brand.toUpperCase()}
            </span>
            <p className="mt-[14px] text-[0.92rem] leading-[1.7]">
              An aloe-led herbal face wash from {SITE.company} — made in{" "}
              {SITE.address.line1.split(",")[1]?.trim()}, {SITE.address.city}, for
              skin that meets the sun every day.
            </p>
          </div>

          <div>
            <h2 className="mb-3 font-ui text-[10.5px] font-medium uppercase tracking-[0.2em] text-gold">
              Order &amp; enquiries
            </h2>
            <p className="text-[0.92rem] leading-[1.7]">
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
            <h2 className="mb-3 font-ui text-[10.5px] font-medium uppercase tracking-[0.2em] text-gold">
              Where we are
            </h2>
            <address className="text-[0.92rem] leading-[1.7] not-italic">
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

        <div className="mt-9 flex flex-wrap justify-between gap-4 border-t border-gold/20 pt-5 text-[0.8rem] text-labelwhite/45">
          <span>
            © {new Date().getFullYear()} {SITE.company}. {SITE.brand} is a
            cosmetic product for external use only.
          </span>
          <span>Keep away from eyes. Store below 30 °C, away from direct sunlight.</span>
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
      className="border-b border-gold/35 text-labelwhite/85 transition-colors hover:border-gold hover:text-white"
    >
      {children}
    </a>
  );
}
