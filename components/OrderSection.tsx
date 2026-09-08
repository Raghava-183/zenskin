"use client";

import Image from "next/image";
import { useState } from "react";
import { SITE, money, whatsappOrderLink } from "@/lib/site";
import { WhatsAppIcon } from "./WhatsAppIcon";

const PRESETS = [
  { q: 1, label: "1 bottle" },
  { q: 3, label: "3 bottles" },
  { q: 6, label: "6 · family pack" },
];

const SPECS: [string, React.ReactNode][] = [
  ["Net content", `${SITE.volumeMl} ml`],
  ["Batch no.", SITE.label.batch],
  ["Manufactured", SITE.label.mfg],
  ["Best before", SITE.label.expiry],
  ["M.R.P.", `${money(SITE.price)}.00`],
  [
    "Mfg & marketed by",
    <>
      {SITE.company}
      <br />
      {SITE.address.line1}, {SITE.address.city}&nbsp;{SITE.address.pin}
    </>,
  ],
  ["Customer care", SITE.customerCare],
];

export function OrderSection() {
  const [qty, setQty] = useState(1);
  const [name, setName] = useState("");
  const [area, setArea] = useState("");
  const [busy, setBusy] = useState(false);
  const [reference, setReference] = useState<string | null>(null);

  const total = qty * SITE.price;
  const unit = qty === 1 ? "bottle" : "bottles";

  async function placeOrder() {
    if (busy) return;
    setBusy(true);

    // Open the tab synchronously — browsers block a window.open that
    // happens after an await. We point it at WhatsApp once we know the
    // order number.
    const tab = window.open("", "_blank");

    let ref: string | null = null;
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ qty, name, area }),
      });
      if (res.ok) {
        const data = await res.json();
        ref = data?.reference ?? null;
      }
    } catch {
      // Network down, or no database attached. The sale still goes
      // through on WhatsApp — we simply have no order number for it.
    }

    setReference(ref);
    const url = whatsappOrderLink({ qty, name, area, reference: ref });

    if (tab && !tab.closed) {
      tab.location.href = url;
    } else {
      window.location.href = url;
    }

    setBusy(false);
  }

  return (
    <>
      <hr className="border-0 border-t border-edgesoft" />
      <section id="order" className="py-[74px] pb-24 sm:pb-[74px]">
        <div className="mx-auto max-w-[1120px] px-[22px]">
          <div className="grid grid-cols-1 overflow-hidden rounded-stage border border-edge bg-surface lg:grid-cols-[1.02fr_0.98fr]">
            {/* ── the form ── */}
            <div className="flex flex-col gap-6 px-6 pt-9 pb-9 sm:px-9 sm:pb-10">
              <div>
                <span className="eyebrow text-rose">Order direct</span>
                <h2 className="mt-3 font-display text-[clamp(1.8rem,3.4vw,2.4rem)] font-semibold">
                  Send it to us on WhatsApp.
                </h2>
                <p className="mt-3 text-[0.96rem] text-tx2">
                  Pick your quantity, add your details, and we&apos;ll open
                  WhatsApp with the whole order already typed out. Your order
                  gets a number so nothing gets lost in the scroll.
                </p>
              </div>

              {/* quantity */}
              <div className="flex flex-col gap-2">
                <span className="font-ui text-[10px] font-bold uppercase tracking-[0.18em] text-tx3">
                  Quantity
                </span>
                <div className="flex flex-wrap items-center gap-[10px]">
                  <div className="flex items-center rounded-pill border border-edge bg-bg2">
                    <button
                      type="button"
                      onClick={() => setQty((q) => Math.max(1, q - 1))}
                      aria-label="One fewer bottle"
                      className="h-11 w-11 cursor-pointer rounded-pill text-[19px] leading-none text-tx2 transition-colors hover:text-rose"
                    >
                      −
                    </button>
                    <output
                      aria-live="polite"
                      className="min-w-[44px] text-center font-ui text-[1.05rem] font-semibold tabular-nums"
                    >
                      {qty}
                    </output>
                    <button
                      type="button"
                      onClick={() => setQty((q) => Math.min(99, q + 1))}
                      aria-label="One more bottle"
                      className="h-11 w-11 cursor-pointer rounded-pill text-[19px] leading-none text-tx2 transition-colors hover:text-rose"
                    >
                      +
                    </button>
                  </div>

                  {PRESETS.map((p) => (
                    <button
                      key={p.q}
                      type="button"
                      onClick={() => setQty(p.q)}
                      aria-pressed={qty === p.q}
                      className={`cursor-pointer rounded-pill border px-[15px] py-[10px] font-ui text-[11.5px] font-semibold transition-colors ${
                        qty === p.q
                          ? "border-rose bg-rosesoft text-rose"
                          : "border-edge text-tx2 hover:border-rose"
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              <Field
                id="nm"
                label="Your name"
                placeholder="e.g. Sneha R."
                autoComplete="name"
                value={name}
                onChange={setName}
              />
              <Field
                id="ct"
                label="Delivery city or area"
                placeholder="e.g. Nagole, Hyderabad"
                autoComplete="address-level2"
                value={area}
                onChange={setArea}
              />

              <div className="flex items-baseline justify-between gap-[14px] border-y border-edgesoft py-4">
                <span className="font-ui text-[10px] font-bold uppercase tracking-[0.18em] text-tx3">
                  Order total
                </span>
                <span className="font-display text-[2.15rem] font-semibold leading-none tabular-nums">
                  {money(total)}
                </span>
              </div>

              <button
                type="button"
                onClick={placeOrder}
                disabled={busy}
                className="inline-flex cursor-pointer items-center justify-center gap-[9px] rounded-pill bg-wa px-[22px] py-[16px] font-ui text-[12.5px] font-bold uppercase tracking-[0.1em] text-white transition-colors hover:bg-wadark disabled:cursor-wait disabled:opacity-70"
              >
                <WhatsAppIcon />
                {busy
                  ? "Opening WhatsApp…"
                  : `Order ${qty} ${unit} · ${money(total)}`}
              </button>

              {reference ? (
                <p
                  role="status"
                  className="rounded-card border border-rose bg-rosesoft px-4 py-3 text-[0.9rem] text-tx"
                >
                  Order <strong className="font-bold">{reference}</strong> saved.
                  If WhatsApp didn&apos;t open, message us on{" "}
                  <a
                    href={whatsappOrderLink({ qty, name, area, reference })}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-rose underline"
                  >
                    {SITE.whatsappDisplay}
                  </a>{" "}
                  and quote that number.
                </p>
              ) : (
                <p className="text-[0.85rem] text-tx3">
                  Opens WhatsApp to{" "}
                  <strong className="font-bold">{SITE.whatsappDisplay}</strong>.
                  Prefer email? Write to{" "}
                  <a href={`mailto:${SITE.email}`} className="text-rose underline">
                    {SITE.email}
                  </a>
                  .
                </p>
              )}
            </div>

            {/* ── straight off the label ── */}
            <div className="flex flex-col gap-6 bg-[linear-gradient(158deg,#4a333e_0%,#3a2730_55%,#2c1c24_100%)] px-6 pt-9 pb-9 text-cream sm:px-9 sm:pb-10">
              <div className="flex items-center gap-5">
                <Image
                  src="/zenskin-back.webp"
                  alt="Back of the Zenskin bottle showing net content, batch number, manufacturing and expiry dates"
                  width={520}
                  height={1414}
                  sizes="110px"
                  className="w-[82px] shrink-0 drop-shadow-[0_14px_24px_rgba(0,0,0,0.5)] sm:w-[104px]"
                />
                <div>
                  <span className="eyebrow text-rose">Straight off the label</span>
                  <h3 className="mt-2 font-display text-[1.5rem] font-semibold text-white">
                    {SITE.brand} {SITE.volumeMl} ml
                  </h3>
                  <p className="mt-[6px] text-[0.9rem] text-cream/70">
                    {SITE.tagline}
                  </p>
                </div>
              </div>

              <table className="w-full border-collapse text-[0.925rem]">
                <tbody>
                  {SPECS.map(([k, v]) => (
                    <tr key={k} className="border-b border-white/12 last:border-b-0">
                      <th
                        scope="row"
                        className="w-[44%] py-[9px] pr-3 text-left align-top font-ui text-[10px] font-bold uppercase tracking-[0.14em] text-rose/90"
                      >
                        {k}
                      </th>
                      <td className="py-[9px] text-left align-top tabular-nums text-cream/95">
                        {v}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* ── sticky order bar, phones only ── */}
      <div className="fixed inset-x-0 bottom-0 z-50 flex items-center gap-3 border-t border-edge bg-bg/95 px-4 py-[10px] backdrop-blur-md sm:hidden">
        <div>
          <div className="font-display text-[1.3rem] leading-none font-semibold text-tx">
            {money(total)}
          </div>
          <div className="font-ui text-[9.5px] font-bold uppercase tracking-[0.14em] text-tx3">
            {qty} {unit} · {SITE.volumeMl} ml
          </div>
        </div>
        <button
          type="button"
          onClick={placeOrder}
          disabled={busy}
          className="ml-auto inline-flex cursor-pointer items-center gap-2 rounded-pill bg-wa px-[18px] py-[11px] font-ui text-[11.5px] font-bold uppercase tracking-[0.1em] text-white disabled:opacity-70"
        >
          <WhatsAppIcon />
          Order
        </button>
      </div>
    </>
  );
}

function Field({
  id,
  label,
  placeholder,
  autoComplete,
  value,
  onChange,
}: {
  id: string;
  label: string;
  placeholder: string;
  autoComplete: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={id}
        className="font-ui text-[10px] font-bold uppercase tracking-[0.18em] text-tx3"
      >
        {label}
      </label>
      <input
        id={id}
        type="text"
        placeholder={placeholder}
        autoComplete={autoComplete}
        value={value}
        maxLength={120}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-pill border border-edge bg-bg2 px-[18px] py-[12px] text-[1rem] text-tx transition-colors placeholder:text-tx3 focus:border-rose"
      />
    </div>
  );
}
