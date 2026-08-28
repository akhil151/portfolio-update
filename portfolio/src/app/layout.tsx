import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

import SmoothScroll from "@/utils/SmoothScroll";
import Navbar from "@/components/Navbar";
import ClientLoaderWrapper from "@/components/ClientLoaderWrapper";
import { site, socials } from "@/config/site";

// --- FONTS (preserved from template) ---
const sofiaBold = localFont({
  src: "../../public/fonts/SofiaSansCondensed-Bold.woff2",
  variable: "--font-sofia-bold",
});
const sofiaSemiBold = localFont({
  src: "../../public/fonts/SofiaSansCondensed-SemiBold.woff2",
  variable: "--font-sofia-semibold",
});
const splineLight = localFont({
  src: "../../public/fonts/SplineSansMono-Light.woff2",
  variable: "--font-spline-light",
});
const splineRegular = localFont({
  src: "../../public/fonts/SplineSansMono-Regular.woff2",
  variable: "--font-spline-regular",
});

export const viewport: Viewport = {
  themeColor: "#101010",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(site.canonicalUrl),
  title: {
    default: `${site.name} | ${site.role}`,
    template: `%s | ${site.name}`,
  },
  description: site.bio,
  keywords: [
    site.name,
    "AI/ML Engineer",
    "Full-Stack Developer",
    "Computer Vision",
    "Agentic AI",
    "RAG",
    "Cyber-Physical Systems",
    "Next.js Portfolio",
    "Three.js",
    "GSAP",
  ],
  authors: [{ name: site.name }],
  creator: site.name,
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/logo-sqr.png",
  },
  openGraph: {
    type: "website",
    url: site.canonicalUrl,
    title: `${site.name} | ${site.role}`,
    description: site.bio,
    siteName: `${site.name} Portfolio`,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: `${site.name} Portfolio Preview`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | ${site.role}`,
    description: site.bio,
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    url: site.canonicalUrl,
    jobTitle: site.role,
    description: site.bio,
    email: site.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: site.location,
      addressCountry: "IN",
    },
    sameAs: [socials.github, socials.linkedin],
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${sofiaBold.variable} ${sofiaSemiBold.variable} ${splineLight.variable} ${splineRegular.variable} antialiased bg-black`}
      >
        <ClientLoaderWrapper>
          <Navbar />
          <SmoothScroll>{children}</SmoothScroll>
        </ClientLoaderWrapper>
        <Analytics />
        <SpeedInsights />

        <noscript>
          <div className="fixed inset-0 flex items-center justify-center bg-black text-white p-10 text-center z-9999">
            <p>Please enable JavaScript to experience this immersive portfolio.</p>
          </div>
        </noscript>
      </body>
    </html>
  );
}
