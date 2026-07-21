import { en } from "./translations";
import { SITE_NAME, SITE_URL, absoluteUrl } from "./site";
import { SEO } from "./seo";
import { ROUTE_TOOL_ENTRIES } from "./toolsCatalog";

export function getWebApplicationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: SITE_NAME,
    url: SITE_URL,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    description: SEO.home.description,
    featureList: ROUTE_TOOL_ENTRIES.slice(0, 8).map((t) => t.name),
  };
}

export function getFaqPageJsonLd() {
  const qa = en.qa;
  const pairs = [
    [qa.q1, qa.a1],
    [qa.q2, qa.a2],
    [qa.q3, qa.a3],
    [qa.q4, qa.a4],
    [qa.q5, qa.a5],
    [qa.q6, qa.a6],
    [qa.q7, qa.a7],
  ] as const;

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: pairs.map(([question, answer]) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: {
        "@type": "Answer",
        text: answer,
      },
    })),
  };
}

export function getHomeJsonLd() {
  return [getWebApplicationJsonLd(), getFaqPageJsonLd()];
}

export function getToolBreadcrumbJsonLd(slug: string, title: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: title,
        item: absoluteUrl(`/${slug}`),
      },
    ],
  };
}
