import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["800"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "SubCaps — AI Subtitles for Short Videos",
    description:
      "Auto-generate and burn beautiful subtitles into your reels, shorts, and TikToks. Upload, detect, transcribe, and style in seconds.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white">{children}</body>
    </html>
  );
}
