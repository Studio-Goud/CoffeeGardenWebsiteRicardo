import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  axes: ["SOFT", "WONK", "opsz"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://coffeegarden.nl"),
  title: {
    default: "Coffee Garden — Speciaalzaak in koffie & thee, Rotterdam",
    template: "%s — Coffee Garden Rotterdam",
  },
  description:
    "Coffee Garden is dé koffie- en theespeciaalzaak aan de Bergselaan in Rotterdam. Specialty koffiebonen, thee, matcha, chai en lokale lekkernijen. Kom proeven.",
  keywords: [
    "specialty koffie",
    "koffiebonen",
    "koffie speciaalzaak",
    "thee",
    "matcha",
    "chai",
    "Rotterdam",
    "Bergselaan",
  ],
  icons: {
    icon: [{ url: "/favicon.png", sizes: "64x64", type: "image/png" }],
    apple: "/favicon.png",
  },
  openGraph: {
    title: "Coffee Garden — Speciaalzaak in koffie & thee",
    description:
      "Specialty koffie, thee, matcha en lokale lekkernijen aan de Bergselaan in Rotterdam. Kom proeven.",
    locale: "nl_NL",
    type: "website",
    siteName: "Coffee Garden",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl" className={`${inter.variable} ${fraunces.variable}`}>
      <body className="min-h-screen flex flex-col bg-paper-100 text-espresso-900 antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
