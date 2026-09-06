import { SITE, money } from "@/lib/site";

const STATS = [
  {
    fig: SITE.bottlesSold.toLocaleString("en-IN"),
    sup: "+",
    cap: "Bottles sold",
    sub: "Every one of them face to face, before this page existed.",
  },
  {
    fig: "Dec ’25",
    cap: "First batch",
    sub: `${SITE.label.batch}, filled and labelled in ${SITE.address.line1.split(",")[1]?.trim() ?? SITE.address.city}, ${SITE.address.city}.`,
  },
  {
    fig: money(SITE.price),
    cap: "One price",
    sub: "The same M.R.P. online as on the shelf. All taxes in.",
  },
  {
    fig: `${SITE.volumeMl} ml`,
    cap: "About a month",
    sub: "Roughly sixty washes at a coin-sized drop, twice a day.",
  },
];

export function ProofBand() {
  return (
    <div className="border-b border-edgesoft bg-bg2 py-14">
      <div className="mx-auto max-w-[1160px] px-[22px]">
        <div className="mb-9 flex max-w-[52ch] flex-col gap-[10px]">
          <span className="eyebrow text-goldtx">Not a launch — a move</span>
          <h2 className="font-display text-[clamp(1.7rem,3.4vw,2.35rem)] font-semibold">
            Nine months on the shelf.
            <br />
            Day one online.
          </h2>
          <p className="text-[0.96rem] text-tx2">
            {SITE.brand} has been selling hand to hand across counters since the
            first batch left {SITE.address.line1.split(",")[1]?.trim()}. A
            thousand bottles later, this page is simply the shop staying open
            after closing time.
          </p>
        </div>

        <dl className="grid grid-cols-1 gap-x-10 gap-y-7 min-[430px]:grid-cols-2 lg:grid-cols-4">
          {STATS.map((s) => (
            <div
              key={s.cap}
              className="flex flex-col gap-[7px] border-t border-edge pt-5"
            >
              <dd className="font-display text-[2.5rem] font-semibold leading-none tracking-[-0.01em] tabular-nums text-tx">
                {s.fig}
                {s.sup ? (
                  <sup className="ml-[2px] align-super text-[0.42em] font-medium text-accent">
                    {s.sup}
                  </sup>
                ) : null}
              </dd>
              <dt className="font-ui text-[10.5px] uppercase tracking-[0.18em] text-goldtx">
                {s.cap}
              </dt>
              <p className="text-[0.88rem] leading-normal text-tx3">{s.sub}</p>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
