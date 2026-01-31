import type { Metadata } from "next";
import { getToolMetadata } from "@/lib/seo";

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

export default function ToolLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
