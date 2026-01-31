import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ServiceWorkerRegister } from "@/components/ServiceWorkerRegister";
import { ThemeSync } from "@/components/ThemeSync";
import { SettingsFab } from "@/components/SettingsFab";
import { Toast } from "@/components/Toast";
import { ChangelogModal } from "@/components/ChangelogModal";
import { SEO } from "@/lib/seo";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: SEO.home.title,
  description: SEO.home.description,
  keywords: [
    "white screen",
    "monitor test",
    "dead pixel test",
    "screen calibration",
    "video call lighting",
    "chroma key",
    "full screen color",
    "screen utility",
  ],
  authors: [{ name: "WhiteScreen Tools" }],
  openGraph: {
    title: SEO.home.title,
    description: SEO.home.description,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: SEO.home.title,
    description: SEO.home.description,
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
      <body className={inter.className}>
        <ThemeSync />
        {children}
        <SettingsFab />
        <Toast />
        <ChangelogModal />
        <ServiceWorkerRegister />
      </body>
    </html>
  );
}

