import { SITE, money } from "@/lib/site";

const ITEMS = [
  `${SITE.bottlesSold.toLocaleString("en-IN")} bottles already sold`,
  "Aloe vera first",
  "No harsh bleaching",
  "Morning & night",
  "All skin types",
  `Made in ${SITE.address.city}`,
  `${SITE.volumeMl} ml · ${money(SITE.price)}`,
];

export function Marquee() {
  return (
    <div
      aria-hidden="true"
      className="overflow-hidden border-b border-gold/30 bg-ink2 py-[11px]"
    >
      <div className="marquee-track">
        {/* rendered twice so the loop is seamless */}
        {[0, 1].map((pass) =>
          ITEMS.map((item) => (
            <span
              key={`${pass}-${item}`}
              className="px-[26px] font-ui text-[11.5px] whitespace-nowrap uppercase tracking-[0.24em] text-labelwhite/75"
            >
              {item}
              <span className="ml-[26px] text-gold">❋</span>
            </span>
          )),
        )}
      </div>
    </div>
  );
}
