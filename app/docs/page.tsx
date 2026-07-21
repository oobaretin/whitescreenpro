import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { KEYBOARD_SHORTCUTS } from "@/lib/keyboardShortcuts";

export const metadata: Metadata = {
  title: "Help & Docs - WhiteScreen Tools",
  description:
    "Keyboard shortcuts, share links, OBS overlay, multi-monitor sync, and pinned favorites for WhiteScreen Tools.",
};

function DocSection({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24">
      <h2 className="text-2xl font-semibold text-page mb-4">{title}</h2>
      <div className="text-page/90 leading-relaxed space-y-4">{children}</div>
    </section>
  );
}

function CodeBlock({ children }: { children: string }) {
  return (
    <code className="block text-sm bg-page/10 border border-card rounded-lg px-3 py-2 font-mono text-page break-all">
      {children}
    </code>
  );
}

const TOC = [
  { id: "getting-started", label: "Getting started" },
  { id: "shortcuts", label: "Keyboard shortcuts" },
  { id: "share-links", label: "Share links" },
  { id: "obs", label: "OBS overlay" },
  { id: "multi-monitor", label: "Multi-monitor sync" },
  { id: "pinned", label: "Pinned favorites" },
  { id: "presets", label: "Quick start presets" },
  { id: "contact", label: "Contact & support" },
];

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-page text-page">
      <Navigation />
      <main className="pt-16 pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-page/80 hover:text-page transition-colors mb-8"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            <span>Back to Home</span>
          </Link>

          <header className="mb-10 max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold text-page mb-3">
              Help &amp; Docs
            </h1>
            <p className="text-lg text-page/80">
              Shortcuts, share URLs, streaming tips, and everything else to get
              the most from WhiteScreen Tools.
            </p>
          </header>

          <div className="grid lg:grid-cols-[220px_1fr] gap-10 items-start">
            <nav
              className="lg:sticky lg:top-24 bg-card border border-card rounded-xl p-4 text-sm"
              aria-label="On this page"
            >
              <p className="font-semibold text-page mb-3">On this page</p>
              <ul className="space-y-2">
                {TOC.map((item) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      className="text-page/75 hover:text-[color:var(--accent-color)] transition-colors"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="space-y-10">
              <DocSection id="getting-started" title="Getting started">
                <p>
                  Pick a tool from the{" "}
                  <Link href="/" className="text-[color:var(--accent-color)] hover:underline">
                    homepage
                  </Link>{" "}
                  or use <strong className="text-page">Start here</strong> for
                  monitor testing and video-call lighting. Press{" "}
                  <kbd className="px-1.5 py-0.5 rounded bg-page/10 font-mono text-xs">
                    F
                  </kbd>{" "}
                  or{" "}
                  <kbd className="px-1.5 py-0.5 rounded bg-page/10 font-mono text-xs">
                    F11
                  </kbd>{" "}
                  for fullscreen on any tool page.
                </p>
                <p>
                  Open the control panel with{" "}
                  <kbd className="px-1.5 py-0.5 rounded bg-page/10 font-mono text-xs">
                    C
                  </kbd>{" "}
                  or the ⚙️ button to adjust color, brightness, Kelvin
                  temperature, gradients, and more.
                </p>
              </DocSection>

              <DocSection id="shortcuts" title="Keyboard shortcuts">
                <p>
                  Press{" "}
                  <kbd className="px-1.5 py-0.5 rounded bg-page/10 font-mono text-xs">
                    ?
                  </kbd>{" "}
                  on any page, or use the <strong className="text-page">Shortcuts</strong>{" "}
                  link in the footer, to open the live shortcuts modal.
                </p>
                <div className="overflow-x-auto rounded-xl border border-card">
                  <table className="w-full text-sm">
                    <thead className="bg-card">
                      <tr>
                        <th className="text-left px-4 py-2 font-semibold text-page">
                          Key
                        </th>
                        <th className="text-left px-4 py-2 font-semibold text-page">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {KEYBOARD_SHORTCUTS.map((entry) => (
                        <tr key={entry.keys} className="border-t border-card">
                          <td className="px-4 py-2">
                            <kbd className="font-mono text-xs bg-page/10 px-1.5 py-0.5 rounded">
                              {entry.keys}
                            </kbd>
                          </td>
                          <td className="px-4 py-2 text-page/85">{entry.action}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-sm text-page/60">
                  Shortcuts are disabled while typing in search boxes or form fields.
                </p>
              </DocSection>

              <DocSection id="share-links" title="Share links">
                <p>
                  Tool settings can be encoded in the URL so others (or another
                  device) open the same look. Examples:
                </p>
                <CodeBlock>/white-screen?color=FFFFFF&amp;brightness=100&amp;kelvin=5500</CodeBlock>
                <CodeBlock>/green-screen?brightness=80</CodeBlock>
                <p>
                  Some tools support deep-link params — e.g. dead-pixel test
                  auto-cycle. Copy the address bar after adjusting settings to
                  share your exact setup.
                </p>
              </DocSection>

              <DocSection id="obs" title="OBS overlay">
                <p>
                  Add <code className="text-sm bg-page/10 px-1 rounded">?obs=1</code>{" "}
                  to any tool URL for a clean browser source: chrome is hidden
                  so only the screen content shows in OBS, Streamlabs, or similar
                  apps.
                </p>
                <CodeBlock>/green-screen?obs=1</CodeBlock>
                <CodeBlock>/zoom-lighting?obs=1</CodeBlock>
              </DocSection>

              <DocSection id="multi-monitor" title="Multi-monitor sync">
                <p>
                  Open the ⚙️ settings panel and use{" "}
                  <strong className="text-page">Multi-monitor layout presets</strong>{" "}
                  to launch matched tool pairs in new tabs — useful for
                  calibration on one display and controls on another.
                </p>
                <p>
                  Tabs on the same browser profile sync color and brightness
                  changes locally (no account required).
                </p>
              </DocSection>

              <DocSection id="pinned" title="Pinned favorites">
                <p>
                  Click the ☆ on any tool card on the homepage to pin it. Pinned
                  tools appear in a dedicated section at the top (up to 8). Your
                  pins are saved in browser local storage.
                </p>
              </DocSection>

              <DocSection id="presets" title="Quick start presets">
                <p>Homepage presets jump you straight into common workflows:</p>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>
                    <strong className="text-page">Photography</strong> — bright
                    white at 5500K
                  </li>
                  <li>
                    <strong className="text-page">Video call</strong> — zoom
                    lighting tool
                  </li>
                  <li>
                    <strong className="text-page">Monitor test</strong> — opens
                    the Monitor Health wizard
                  </li>
                  <li>
                    <strong className="text-page">Chroma key</strong> — green
                    screen for editing
                  </li>
                </ul>
              </DocSection>

              <DocSection id="contact" title="Contact & support">
                <p>
                  Bug or feature request?{" "}
                  <Link href="/contact" className="text-[color:var(--accent-color)] hover:underline">
                    Send a message
                  </Link>{" "}
                  or open an issue on{" "}
                  <a
                    href="https://github.com/oobaretin/whitescreenpro/issues"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[color:var(--accent-color)] hover:underline"
                  >
                    GitHub
                  </a>
                  .
                </p>
              </DocSection>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
