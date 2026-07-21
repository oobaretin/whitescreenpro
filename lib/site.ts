/** Canonical production URL — matches app/sitemap.ts */
export const SITE_URL = "https://whitescreentools.com";

export const SITE_NAME = "WhiteScreen Tools";

export const OG_IMAGE = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: "WhiteScreen Tools — full-screen color and monitor test utilities",
} as const;

export function absoluteUrl(path: string): string {
  return new URL(path, SITE_URL).toString();
}
