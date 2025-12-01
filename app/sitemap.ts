import { MetadataRoute } from "next";

const baseUrl = "https://whitescreentools.com";

const tools = [
  "black-screen",
  "red-screen",
  "blue-screen",
  "green-screen",
  "yellow-screen",
  "orange-screen",
  "pink-screen",
  "purple-screen",
  "white-screen",
  "zoom-lighting",
  "tip-screen",
  "signature-screen",
  "dvd-screensaver",
  "broken-screen",
  "dead-pixel-test",
  "bsod",
  "matrix-rain",
  "flip-clock",
  "no-signal",
  "fake-update",
  "hacker-terminal",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/license`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.5,
    },
  ];

  const toolPages: MetadataRoute.Sitemap = tools.map((tool) => ({
    url: `${baseUrl}/${tool}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  return [...staticPages, ...toolPages];
}

