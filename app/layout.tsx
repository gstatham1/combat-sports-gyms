import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NavbarWrapper from "@/components/NavbarWrapper";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "FightAtlas — Find Combat Sports Gyms Worldwide",
    template: "%s | FightAtlas"
  },
  description: "Find the best MMA, BJJ, Muay Thai and Boxing gyms in every city worldwide. The global directory for combat sports travelers.",
  keywords: ["MMA gym", "BJJ gym", "Muay Thai gym", "boxing gym", "combat sports", "martial arts travel", "fight camp"],
  openGraph: {
    title: "FightAtlas — Find Combat Sports Gyms Worldwide",
    description: "Find the best MMA, BJJ, Muay Thai and Boxing gyms in every city worldwide.",
    url: "https://combat-sports-gyms.vercel.app",
    siteName: "FightAtlas",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FightAtlas — Find Combat Sports Gyms Worldwide",
    description: "Find the best MMA, BJJ, Muay Thai and Boxing gyms in every city worldwide.",
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NavbarWrapper />
        {children}
      </body>
    </html>
  );
}