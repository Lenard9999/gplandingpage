import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Go Pacific Travel | Curated Travel Experiences",
  description: "Discover extraordinary destinations with our bespoke travel experiences. Luxury journeys crafted for the discerning explorer.",
  openGraph: {
    title: "Go Pacific Travel | Curated Travel Experiences",
    description: "Discover extraordinary destinations with our bespoke travel experiences. Luxury journeys crafted for the discerning explorer.",
    url: "https://gopacific.ph",
    siteName: "Go Pacific Travel",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Go Pacific Travel | Curated Travel Experiences",
    description: "Discover extraordinary destinations with our bespoke travel experiences. Luxury journeys crafted for the discerning explorer.",
  },
  metadataBase: new URL("https://gopacific.ph"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <div className="grain" />
        {children}
      </body>
    </html>
  );
}
