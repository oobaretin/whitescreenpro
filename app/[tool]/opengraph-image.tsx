import { ImageResponse } from "next/og";
import { getToolMeta } from "@/lib/seo";
import { getOgImageTheme } from "@/lib/ogImageTheme";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ tool: string }>;
}) {
  const { tool } = await params;
  const meta = getToolMeta(tool);
  const theme = getOgImageTheme(tool);
  const title = meta?.title.split("|")[0].trim() ?? "WhiteScreen Tools";
  const description =
    meta?.description?.slice(0, 120).trim() ??
    "Free full-screen color and monitor test tools";

  const isColorScreen = Boolean(theme.swatch && theme.background === theme.swatch);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: isColorScreen ? theme.swatch : theme.background,
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {!isColorScreen && theme.swatch ? (
          <div
            style={{
              width: 420,
              height: "100%",
              background: theme.swatch,
              borderRight: "4px solid rgba(255,255,255,0.15)",
            }}
          />
        ) : null}

        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: isColorScreen ? "48px 64px" : "48px 56px",
            background: isColorScreen ? "transparent" : undefined,
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignSelf: "flex-start",
              padding: "6px 14px",
              borderRadius: 999,
              background: theme.accent,
              color: "#ffffff",
              fontSize: 18,
              fontWeight: 600,
              marginBottom: 24,
            }}
          >
            {theme.category}
          </div>
          <div
            style={{
              fontSize: isColorScreen ? 56 : 52,
              fontWeight: 700,
              color: theme.textColor,
              lineHeight: 1.1,
              marginBottom: 16,
            }}
          >
            {title}
          </div>
          <div
            style={{
              fontSize: 24,
              color: theme.subtitleColor,
              lineHeight: 1.4,
              maxWidth: 680,
            }}
          >
            {description}
            {meta && meta.description.length > 120 ? "…" : ""}
          </div>
          <div
            style={{
              marginTop: 36,
              fontSize: 20,
              color: theme.subtitleColor,
              opacity: 0.85,
            }}
          >
            whitescreentools.com
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
