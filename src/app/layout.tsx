import type { Metadata } from "next";
import { Fraunces, Instrument_Sans, JetBrains_Mono } from "next/font/google";
import { SetHtmlLang } from "@/components/set-html-lang";
import "./globals.css";

// Content Security Policy.
//
// `script-src 'self'` alone is not viable for `output: "export"`:
// Next.js's static export emits inline `<script>` blocks for its
// hydration payload (the `self.__next_f.push([...])` calls) and
// those would be blocked, which would silently break *all* client
// state — the language switcher, the search bar, the sidebar, the
// project list filters — and the page would render the static HTML
// but never become interactive.
//
// We therefore allow `unsafe-inline` for scripts. The inline
// scripts that ship with the bundle are all generated at build
// time by Next.js, the contents are fully under our control, and
// the site has no user input, no auth, and no third-party embeds,
// so the XSS surface from re-enabling inline scripts is
// negligible. The remaining directives keep their restrictive
// defaults: no remote scripts, no remote styles except the
// Tailwind `unsafe-inline` (required for utility class generation),
// no `object-src`, and a same-origin default for everything else.
//
// `frame-ancestors` is intentionally absent: when delivered via
// a `<meta>` element browsers ignore it (it must be a header),
// and keeping it here only produces noisy console warnings.
const CSP =
  "default-src 'self'; " +
  "script-src 'self' 'unsafe-inline'; " +
  "style-src 'self' 'unsafe-inline'; " +
  "img-src 'self' data: https:; " +
  "font-src 'self' data:; " +
  "connect-src 'self'; " +
  "base-uri 'self'; " +
  "form-action 'self'; " +
  "object-src 'none'";

// Display serif: Fraunces is a variable serif with optical sizing,
// soft curves and a humanist warmth that doesn't appear in any of
// the typical "AI default" front-end stacks (Inter / Space Grotesk /
// Geist). It is the visual signature of the editorial-atlas
// direction: the hero / section headings all use it.
// "opsz" 9..144 makes the optical-size axis available, which lets
// the browser pick a tighter or looser cut depending on rendered
// size; that alone makes the type feel "drawn for" the page.
const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fraunces",
  axes: ["opsz", "SOFT", "WONK"],
});

// Body / UI sans: Instrument Sans is a humanist geometric sans
// with a slight terminal flavour, designed by Instrument (the
// same studio behind Linear / Vercel's design system) but
// deliberately not the Vercel-default Geist. Its character lies
// in the slightly condensed x-height and the open apertures,
// which give UI text a calm, considered feel.
const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-instrument",
  weight: ["400", "500", "600", "700"],
});

// Monospace for technical metadata: project stars, repo URLs,
// version numbers, category counts, "last updated" timestamps.
// JetBrains Mono is the only monospace that ships with the
// "calt" ligature set we want for `=>`, `!=`, and `>=` glyphs
// in this codebase.
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: {
    default: "NetTools Hub — An Atlas of Network Tools",
    template: "%s — NetTools Hub",
  },
  description:
    "A curated atlas of 120+ open-source network tools, organised by purpose, with multilingual annotations and editorial notes.",
  keywords: [
    "network tools",
    "open source",
    "atlas",
    "proxy",
    "VPN",
    "Clash",
    "GitHub acceleration",
    "DNS",
    "monitoring",
  ],
  authors: [{ name: "badhope" }],
  creator: "badhope",
  metadataBase: new URL("https://badhope.github.io/NetTools-Hub"),
  openGraph: {
    title: "NetTools Hub — An Atlas of Network Tools",
    description:
      "A curated atlas of 120+ open-source network tools, organised by purpose, with multilingual annotations and editorial notes.",
    url: "https://badhope.github.io/NetTools-Hub",
    siteName: "NetTools Hub",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NetTools Hub — An Atlas of Network Tools",
    description:
      "A curated atlas of 120+ open-source network tools, organised by purpose, with multilingual annotations and editorial notes.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://badhope.github.io/NetTools-Hub",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${instrumentSans.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <meta httpEquiv="Content-Security-Policy" content={CSP} />
      </head>
      <body>
        <SetHtmlLang />
        {children}
      </body>
    </html>
  );
}
