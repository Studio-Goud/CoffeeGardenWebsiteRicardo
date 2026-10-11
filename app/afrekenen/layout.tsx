import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Afrekenen",
  robots: { index: false, follow: false },
};

export default function AfrekenenLayout({ children }: { children: React.ReactNode }) {
  return children;
}
