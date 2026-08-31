import type { Metadata } from "next";
import Script from "next/script";
import { Cormorant_Garamond, Alex_Brush } from "next/font/google";
import { SITE_URL } from "@/lib/site";
import { resolveRobots } from "@/lib/seo";
import { getSiteChrome } from "@/lib/homepage";
import { hexToRgbTriplet } from "@/lib/color";
import "./globals.css";

export const dynamic = "force-dynamic";

const displayFont = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-display",
});

const scriptFont = Alex_Brush({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-script",
});

const DEFAULT_OG_IMAGE =
  "https://images.unsplash.com/photo-1544966503-7ba532bcf162?q=80&w=2400&auto=format&fit=crop";

// Google Analytics (GA4) measurement ID — PLACEHOLDER. Replace with this
// site's own GA4 property ID before launch. Do not reuse another site's
// ID or you'll mix both sites' traffic together (see README "Before you
// launch").
const GA_MEASUREMENT_ID = "G-XXXXXXXXXX";

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Siam Park Tickets",
  url: SITE_URL,
  description:
    "Independent guide comparing verified Siam Park ticket options — general admission, all-inclusive fast track, and twin tickets with Loro Parque — in Tenerife, Spain.",
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Siam Park Tickets",
  url: SITE_URL,
};

export function generateMetadata(): Metadata {
  const robots = resolveRobots(false);

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: "Siam Park Tickets | Skip-the-Line Water Park Tickets (2026)",
      template: "%s | Siam Park Tickets",
    },
    description:
      "Compare Siam Park tickets in Tenerife — general admission, all-inclusive fast track with food and drinks, and twin tickets with Loro Parque. Instant mobile confirmation.",
    keywords: [
      "Siam Park Tickets",
      "Siam Park ticket prices",
      "Siam Park fast track",
      "Siam Park all inclusive ticket",
      "Siam Park Loro Parque twin ticket",
      "Siam Park Tenerife tickets",
      "Siam Park skip the line",
      "Siam Park opening hours",
      "best Siam Park ticket",
      "Siam Park tickets 2026",
    ],
    alternates: {
      canonical: "/",
    },
    icons: {
      icon: [
        { url: "/favicon.svg", type: "image/svg+xml" },
        { url: "/icon", type: "image/png" },
      ],
      apple: "/apple-icon",
    },
    robots,
    openGraph: {
      title: "Siam Park Tickets | Skip-the-Line Water Park Tickets",
      description:
        "Book Siam Park tickets in Tenerife with instant mobile confirmation. Free cancellation up to 24h prior on most tickets.",
      type: "website",
      url: SITE_URL,
      siteName: "Siam Park Tickets",
      images: [{ url: DEFAULT_OG_IMAGE, width: 2400, height: 1350, alt: "Guests riding Wave Palace, the world's largest artificial wave, at Siam Park Tenerife" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Siam Park Tickets | Skip-the-Line Water Park Tickets",
      description:
        "Book Siam Park tickets in Tenerife with instant mobile confirmation. Free cancellation up to 24h prior on most tickets.",
      images: [DEFAULT_OG_IMAGE],
    },
  };
}

function buildThemeStyle(theme: { primary: string; secondary: string; dark: string; accent: string }) {
  const vars: [string, string | null][] = [
    ["--color-maya-gold", hexToRgbTriplet(theme.primary)],
    ["--color-maya-emerald", hexToRgbTriplet(theme.secondary)],
    ["--color-maya-charcoal", hexToRgbTriplet(theme.dark)],
    ["--color-gold-400", hexToRgbTriplet(theme.accent)],
    ["--color-chichen-gold", hexToRgbTriplet(theme.primary)],
    ["--color-chichen-navy", hexToRgbTriplet(theme.secondary)],
    ["--color-chichen-charcoal", hexToRgbTriplet(theme.dark)],
  ];
  const declarations = vars
    .filter(([, value]) => value !== null)
    .map(([name, value]) => `${name}:${value};`)
    .join("");
  return declarations ? `:root{${declarations}}` : "";
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { theme } = await getSiteChrome();
  const themeStyle = buildThemeStyle(theme);

  return (
    <html lang="en" className={`${displayFont.variable} ${scriptFont.variable}`}>
      <head>
        {/* Warms up the connection to Google's analytics domains ahead of
            the afterInteractive gtag.js load below, shaving the DNS/TLS
            handshake off its actual request instead of paying for it when
            the script fires. */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        {/* Google tag (gtag.js) */}
        <Script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `}
        </Script>
      </head>
      <body className="font-body bg-stone-50 text-stone-900 antialiased">
        {themeStyle && <style dangerouslySetInnerHTML={{ __html: themeStyle }} />}
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </body>
    </html>
  );
}
