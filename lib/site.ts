/**
 * Every fact about the product and the business lives here.
 * Change a price, a phone number or an address in THIS FILE ONLY —
 * it flows through the whole site automatically.
 */

export const SITE = {
  brand: "Zenskin",
  company: "HRV Global Naturities",
  tagline: "Soothing herbal liquid — for bright & healthy skin",

  /** Rupees. One bottle. */
  price: 300,
  volumeMl: 50,

  /** Orders land on this WhatsApp number. Country code, no +, no spaces. */
  whatsapp: "919640903495",
  whatsappDisplay: "+91 96409 03495",

  email: "raghavakande183@gmail.com",
  customerCare: "9553784817",

  address: {
    line1: "16-92/A, Nagole",
    city: "Hyderabad",
    pin: "500068",
    state: "Telangana",
    country: "India",
  },

  /** Straight off the printed label. Update when a new batch is filled. */
  label: {
    batch: "HRVGN-01",
    mfg: "December 2025",
    expiry: "November 2027",
  },

  /** Sales to date, sold hand to hand before the site existed. */
  bottlesSold: 1000,
} as const;

export const money = (n: number) => `₹${n.toLocaleString("en-IN")}`;

/**
 * Builds the prefilled WhatsApp message for an order.
 * `reference` is the saved order number (ZS-01001) when the database
 * accepted the order, and null when it did not — the sale goes through
 * either way.
 */
export function whatsappOrderLink(opts: {
  qty: number;
  name?: string;
  area?: string;
  reference?: string | null;
}) {
  const { qty, name, area, reference } = opts;
  const total = qty * SITE.price;

  const lines = [
    `Hello ${SITE.company}! I'd like to order ${SITE.brand} (${SITE.volumeMl} ml herbal face wash).`,
    ``,
    reference ? `Order no.: ${reference}` : null,
    `Quantity: ${qty} ${qty === 1 ? "bottle" : "bottles"}`,
    `Total at M.R.P.: ${money(total)}`,
    name?.trim() ? `Name: ${name.trim()}` : null,
    area?.trim() ? `Delivery area: ${area.trim()}` : null,
    ``,
    `Please confirm availability and delivery.`,
  ].filter((l): l is string => l !== null);

  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(lines.join("\n"))}`;
}
