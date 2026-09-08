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
      className="overflow-hidden border-y border-edgesoft bg-rosesoft py-3"
    >
      <div className="marquee-track">
        {/* rendered twice so the loop is seamless */}
        {[0, 1].map((pass) =>
          ITEMS.map((item) => (
            <span
              key={`${pass}-${item}`}
              className="px-[26px] font-body text-[11px] font-bold whitespace-nowrap uppercase tracking-[0.2em] text-rose"
            >
              {item}
              <span className="ml-[26px] text-leaf">✿</span>
            </span>
          )),
        )}
      </div>
    </div>
  );
}
