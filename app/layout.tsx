import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NavbarWrapper from "@/components/NavbarWrapper";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Fight Atlas — Find Combat Sports Gyms Worldwide",
  description: "Find the best MMA, BJJ, Muay Thai, Boxing and Wrestling gyms in every city around the world.",
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