import type { Metadata, Viewport } from "next";
import { Inter, Fraunces } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LogoDefs from "@/components/LogoDefs";
import { CartProvider } from "@/components/cart/CartContext";
import CartDrawer from "@/components/cart/CartDrawer";
import HoningNudge from "@/components/cart/HoningNudge";
import { WEBSHOP_OPEN } from "@/lib/products";

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

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://www.coffeegarden.nl"),
  title: {
    default: "Coffee Garden · Speciaalzaak in koffie & thee, Rotterdam",
    template: "%s · Coffee Garden Rotterdam",
  },
  description:
    "Coffee Garden is dé koffie- en theespeciaalzaak aan de Bergselaan in Rotterdam. Koffiebonen, thee, matcha, chai en lokale lekkernijen. Kom proeven.",
  keywords: [
    "koffie",
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
    title: "Coffee Garden · Speciaalzaak in koffie & thee",
    description:
      "Koffie, thee, matcha en lokale lekkernijen aan de Bergselaan in Rotterdam. Kom proeven.",
    locale: "nl_NL",
    type: "website",
    siteName: "Coffee Garden",
    images: [{ url: "/images/interieur.jpg", width: 1303, height: 1600 }],
  },
};

/** Structured data voor Google: lokale koffiezaak met openingstijden. */
const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "CafeOrCoffeeShop",
  "@id": "https://www.coffeegarden.nl/#winkel",
  name: "Coffee Garden",
  description:
    "Speciaalzaak in koffie en thee aan de Bergselaan in Rotterdam. Eigen gebrande koffiebonen, thee, matcha, chai en lokale lekkernijen.",
  url: "https://www.coffeegarden.nl",
  image: "https://www.coffeegarden.nl/images/interieur.jpg",
  servesCuisine: "Koffie en thee",
  priceRange: "€",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Bergselaan 291-A",
    postalCode: "3038 CG",
    addressLocality: "Rotterdam",
    addressCountry: "NL",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "16:00",
    },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "09:00", closes: "16:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Sunday", opens: "10:00", closes: "15:00" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl" className={`${inter.variable} ${fraunces.variable}`}>
      <body className="min-h-screen flex flex-col bg-paper-100 text-espresso-900 antialiased">
        <LogoDefs />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
        <CartProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          {WEBSHOP_OPEN && <CartDrawer />}
          {WEBSHOP_OPEN && <HoningNudge />}
        </CartProvider>
      </body>
    </html>
  );
}
