import Link from "next/link";
import { translations } from "@/lib/translations";
import { ROUTE_TOOL_ENTRIES } from "@/lib/toolsCatalog";

/** Server-rendered crawlable index — visible in HTML without client JS. */
export function HomeStaticSeo() {
  const t = translations.en;

  return (
    <section
      aria-label="Site index"
      className="pb-2"
    >
      <nav aria-label="All tools">
        <h2 className="text-sm font-semibold text-page/70 mb-2">All tools</h2>
        <ul className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-page/60">
          {ROUTE_TOOL_ENTRIES.map((tool) => (
            <li key={tool.slug}>
              <Link href={`/${tool.slug}`} className="hover:text-page underline-offset-2 hover:underline">
                {tool.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <p className="sr-only">
        {t.home.title}. {t.home.subtitle} {t.home.aboutDescription}
      </p>
    </section>
  );
}
