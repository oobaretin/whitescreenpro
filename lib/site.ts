/** Canonical production URL — matches app/sitemap.ts */
export const SITE_URL = "https://whitescreentools.com";

export const SITE_NAME = "WhiteScreen Tools";

export const OG_IMAGE = {
  url: "/icon-512.png",
  width: 512,
  height: 512,
  alt: "WhiteScreen Tools — full-screen color and monitor test utilities",
} as const;

export function absoluteUrl(path: string): string {
  return new URL(path, SITE_URL).toString();
}
