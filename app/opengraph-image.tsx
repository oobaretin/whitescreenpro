import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "WhiteScreen Tools — full-screen color and monitor test utilities";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "64px 80px",
          background: "linear-gradient(135deg, #ffffff 0%, #f0f4ff 50%, #e8eefc 100%)",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginBottom: 32,
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 12,
              background: "#1a1a1a",
              border: "4px solid #2563eb",
            }}
          />
          <div
            style={{
              width: 20,
              height: 20,
              borderRadius: "50%",
              background: "#2563eb",
            }}
          />
        </div>
        <div
          style={{
            fontSize: 64,
            fontWeight: 700,
            color: "#111827",
            lineHeight: 1.1,
            marginBottom: 20,
          }}
        >
          WhiteScreen Tools
        </div>
        <div
          style={{
            fontSize: 28,
            color: "#4b5563",
            maxWidth: 820,
            lineHeight: 1.4,
          }}
        >
          Full-screen colors, monitor tests, video call lighting and 30+ free tools
        </div>
      </div>
    ),
    { ...size },
  );
}
