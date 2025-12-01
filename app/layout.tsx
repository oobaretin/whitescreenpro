import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "WhiteScreen Tools - Professional Screen Utility",
  description:
    "Advanced whitescreen utility for photography, videography, monitor testing, and focus. Features custom colors, gradients, patterns, timers, and more.",
  keywords: [
    "white screen",
    "black screen",
    "monitor test",
    "screen calibration",
    "photography",
    "videography",
    "color picker",
    "screen utility",
  ],
  authors: [{ name: "WhiteScreen Tools" }],
  openGraph: {
    title: "WhiteScreen Tools - Professional Screen Utility",
    description:
      "Advanced whitescreen utility for photography, videography, monitor testing, and focus.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "WhiteScreen Tools - Professional Screen Utility",
    description:
      "Advanced whitescreen utility for photography, videography, monitor testing, and focus.",
  },
  verification: {
    google: "BYuikEvuUf_6B-G2sZRL9FA0UQOy9VyR-V07oybT5es",
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}

