import type { Metadata } from "next";
import { getToolMetadata, getToolMeta } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { getToolBreadcrumbJsonLd } from "@/lib/jsonLd";
import { ZenMode } from "@/components/ZenMode";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tool: string }>;
}): Promise<Metadata> {
  const { tool: slug } = await params;
  const meta = getToolMetadata(slug);
  if (meta) return meta;
  return {
    title: "White Screen Tools",
    description: "Full-screen display and lighting tools.",
  };
}

export default async function ToolLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ tool: string }>;
}) {
  const { tool: slug } = await params;
  const meta = getToolMeta(slug);
  const breadcrumb = meta
    ? getToolBreadcrumbJsonLd(slug, meta.title.split("|")[0].trim())
    : null;

  return (
    <>
      {breadcrumb && <JsonLd data={breadcrumb} />}
      <ZenMode />
      {children}
    </>
  );
}
