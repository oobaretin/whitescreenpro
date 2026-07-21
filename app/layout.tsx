import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ServiceWorkerRegister } from "@/components/ServiceWorkerRegister";
import { ThemeSync } from "@/components/ThemeSync";
import { LangSync } from "@/components/LangSync";
import { SettingsFab } from "@/components/SettingsFab";
import { Toast } from "@/components/Toast";
import { ChangelogModal } from "@/components/ChangelogModal";
import { KeyboardShortcutsModal } from "@/components/KeyboardShortcutsModal";
import { MultiMonitorSync } from "@/components/MultiMonitorSync";
import { ObsOverlaySync } from "@/hooks/useObsOverlay";
import { MonitorHealthWizard } from "@/components/MonitorHealthWizard";
import { ContextHelpBubble } from "@/components/ContextHelpBubble";
import { SEO, getDefaultMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { getHomeJsonLd } from "@/lib/jsonLd";

const inter = Inter({ subsets: ["latin"] });
const defaultMeta = getDefaultMetadata();

export const metadata: Metadata = {
  metadataBase: defaultMeta.metadataBase,
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
    ...defaultMeta.openGraph,
    title: SEO.home.title,
    description: SEO.home.description,
    type: "website",
    url: "/",
  },
  twitter: {
    ...defaultMeta.twitter,
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
        <JsonLd data={getHomeJsonLd()} />
        <ThemeSync />
        <LangSync />
        <MultiMonitorSync />
        <ObsOverlaySync />
        <MonitorHealthWizard />
        {children}
        <SettingsFab />
        <ContextHelpBubble />
        <Toast />
        <ChangelogModal />
        <KeyboardShortcutsModal />
        <ServiceWorkerRegister />
      </body>
    </html>
  );
}

