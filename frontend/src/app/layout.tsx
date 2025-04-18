import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import AppSidebar from "@/components/sidebar";
import { initializeContext } from "@/lib/context/server";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Blackground",
  description: "Decentralized social media for everyone",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  console.log("server initializing nowww!")
  await initializeContext();
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AppSidebar>{children}</AppSidebar>
      </body>
    </html>
  );
}
