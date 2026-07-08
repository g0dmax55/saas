import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "AI-Powered Subtitles for Short Videos | Subtitle Studio",
    description:
      "Upload short videos, auto-detect language, generate accurate subtitles, and burn them into your reels, shorts, and TikToks with dozens of beautiful styles.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white">{children}</body>
    </html>
  );
}
