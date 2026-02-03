import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Go Pacific Travel | Curated Travel Experiences",
  description: "Discover extraordinary destinations with our bespoke travel experiences. Luxury journeys crafted for the discerning explorer.",
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
