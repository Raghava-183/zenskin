import type { Metadata, Viewport } from "next";
import { Fraunces, Mulish } from "next/font/google";
import { SITE, money } from "@/lib/site";
import "./globals.css";

// Loaded as a variable font (no fixed `weight`), which is what lets us
// ask for the SOFT and WONK axes. next/font rejects `axes` alongside a
// static weight list.
const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["SOFT", "WONK"],
  variable: "--font-fraunces",
  display: "swap",
});

const mulish = Mulish({
  subsets: ["latin"],
  variable: "--font-mulish",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://zenskin.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${SITE.brand} — Aloe Vera Herbal Face Wash | Removes Tan`,
    template: `%s · ${SITE.brand}`,
  },
  description:
    `${SITE.brand} is an aloe-led herbal face wash for Indian skin and Indian sun. ` +
    `Lifts tan, cools the skin and leaves it bright. ${SITE.volumeMl} ml, ` +
    `${money(SITE.price)}. Order on WhatsApp from ${SITE.company}, Hyderabad.`,
  keywords: [
    "Zenskin",
    "herbal face wash",
    "aloe vera face wash",
    "tan removal face wash",
    "face wash for women",
    "Hyderabad herbal skincare",
    "HRV Global Naturities",
  ],
  authors: [{ name: SITE.company }],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    siteName: SITE.brand,
    title: `${SITE.brand} — tan off, glow on`,
    description:
      `Aloe-led herbal face wash. ${SITE.volumeMl} ml, ${money(SITE.price)}. ` +
      `Over ${SITE.bottlesSold.toLocaleString("en-IN")} bottles sold. Order on WhatsApp.`,
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: `${SITE.brand} ${SITE.volumeMl} ml aloe vera herbal face wash`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.brand} — tan off, glow on`,
    description: `Aloe-led herbal face wash. ${SITE.volumeMl} ml, ${money(SITE.price)}.`,
    images: ["/og.png"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fff7f4" },
    { media: "(prefers-color-scheme: dark)", color: "#221720" },
  ],
};

/**
 * Structured data so Google can show the price and availability
 * directly in search results.
 */
const productJsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: `${SITE.brand} Aloe Vera Herbal Face Wash`,
  image: [`${siteUrl}/og.png`],
  description: `Soothing aloe-led herbal face wash, ${SITE.volumeMl} ml. Lifts tan and leaves skin bright and calm.`,
  brand: { "@type": "Brand", name: SITE.brand },
  manufacturer: { "@type": "Organization", name: SITE.company },
  category: "Beauty & Personal Care > Skin Care > Face Wash",
  offers: {
    "@type": "Offer",
    url: siteUrl,
    priceCurrency: "INR",
    price: String(SITE.price),
    availability: "https://schema.org/InStock",
    seller: {
      "@type": "Organization",
      name: SITE.company,
      address: {
        "@type": "PostalAddress",
        streetAddress: SITE.address.line1,
        addressLocality: SITE.address.city,
        postalCode: SITE.address.pin,
        addressRegion: SITE.address.state,
        addressCountry: "IN",
      },
    },
  },
};

/**
 * Applies the saved theme before first paint so the page never
 * flashes the wrong colours.
 */
const themeBootstrap = `
try {
  var t = localStorage.getItem("zenskin-theme");
  if (t === "dark" || t === "light") {
    document.documentElement.setAttribute("data-theme", t);
  }
} catch (e) {}
`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en-IN"
      className={`${fraunces.variable} ${mulish.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBootstrap }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
