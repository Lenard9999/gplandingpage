import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Go Pacific Travel | Curated Travel Experiences",
  description: "Discover extraordinary destinations with our bespoke travel experiences. Luxury journeys crafted for the discerning explorer.",
  openGraph: {
    title: "Go Pacific Travel | Curated Travel Experiences",
    description: "Discover extraordinary destinations with our bespoke travel experiences. Luxury journeys crafted for the discerning explorer.",
    url: "https://gopacific.ph",
    siteName: "Go Pacific Travel Inc.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Go Pacific Travel | Curated Travel Experiences",
    description: "Discover extraordinary destinations with our bespoke travel experiences. Luxury journeys crafted for the discerning explorer.",
  },
  metadataBase: new URL("https://gopacific.ph"),
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Go Pacific Travel Inc.",
  url: "https://gopacific.ph",
  logo: "https://gopacific.ph/favicon.ico",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className="antialiased">
        <div className="grain" />
        {children}
      </body>
    </html>
  );
}
