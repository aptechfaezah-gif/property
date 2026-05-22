import type { Metadata } from "next";
import { Poppins, Inter, Rajdhani } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins",
});

const rajdhani = Rajdhani({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-rajdhani",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "HOUSE — Luxury Real Estate Management",
    template: "%s | HOUSE",
  },
  description:
    "HOUSE — Karachi's luxury real estate platform for clients. Browse verified homes, 3D tours, book viewings, and work with expert HOUSE agents.",
  keywords: ["HOUSE", "Karachi real estate", "luxury homes Karachi", "HOUSE clients", "property booking"],
  openGraph: {
    title: "HOUSE — Luxury Real Estate for Clients",
    description: "HOUSE helps clients find and book premium homes in Karachi",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.variable} ${rajdhani.variable} ${inter.variable}`}>
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
