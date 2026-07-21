import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "About Us - WhiteScreen Tools",
  description: "Learn about WhiteScreen Tools, the ultimate screen utility tool.",
};

function SectionCard({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="bg-card border border-card rounded-xl p-6 sm:p-8">
      <h2 className="text-2xl font-semibold text-page mb-4">{title}</h2>
      {children}
    </section>
  );
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-page text-page">
      <Navigation />
      <main className="pt-16 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
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

          <header className="mb-10 text-center max-w-2xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-page mb-4">
              About WhiteScreen Tools
            </h1>
            <p className="text-lg text-page/80 leading-relaxed">
              Professional screen utilities, monitor tests, and creative tools — free,
              browser-based, and privacy-focused.
            </p>
          </header>

          <div className="space-y-8 text-page/90 leading-relaxed">
            <SectionCard title="Our mission">
              <p className="text-lg">
                We aim to provide the most complete screen utility collection available,
                combining professional features for photography, videography, and design
                with fun prank tools and ambient modes — all in one free platform. No
                downloads, no registration, no ads.
              </p>
            </SectionCard>

            <section>
              <h2 className="text-2xl font-semibold text-page mb-6">What we offer</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-card border border-card rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-page mb-3">
                    Professional tools
                  </h3>
                  <ul className="list-disc list-inside space-y-2 text-page/85">
                    <li>Zoom lighting for video calls</li>
                    <li>Digital signature capture</li>
                    <li>Tip calculator for POS systems</li>
                    <li>Dead pixel &amp; monitor health tests</li>
                    <li>Color calibration &amp; screen ruler</li>
                    <li>OBS overlay &amp; share links</li>
                  </ul>
                </div>
                <div className="bg-card border border-card rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-page mb-3">
                    Fun &amp; ambient
                  </h3>
                  <ul className="list-disc list-inside space-y-2 text-page/85">
                    <li>Broken screen &amp; BSOD pranks</li>
                    <li>Fake system updates</li>
                    <li>Hacker terminal effects</li>
                    <li>DVD screensaver</li>
                    <li>Matrix rain &amp; flip clock</li>
                    <li>No-signal static</li>
                  </ul>
                </div>
              </div>
            </section>

            <SectionCard title="Key features">
              <ul className="list-disc list-inside space-y-3">
                <li>
                  <strong className="text-page">28+ tools</strong> — color screens,
                  utilities, pranks, and ambient modes
                </li>
                <li>
                  <strong className="text-page">Pinned favorites &amp; search</strong> —
                  find and save your go-to tools
                </li>
                <li>
                  <strong className="text-page">Share links</strong> — restore color,
                  brightness, and Kelvin from the URL
                </li>
                <li>
                  <strong className="text-page">Monitor Health</strong> — guided wizard
                  with PDF report export
                </li>
                <li>
                  <strong className="text-page">Multi-monitor sync</strong> — layout
                  presets across tabs
                </li>
                <li>
                  <strong className="text-page">100% free</strong> — no ads, no
                  registration required
                </li>
                <li>
                  <strong className="text-page">Privacy first</strong> — tools run in
                  your browser; settings stay local
                </li>
                <li>
                  <strong className="text-page">Mobile friendly</strong> — works on
                  phones, tablets, and desktop
                </li>
              </ul>
            </SectionCard>

            <section>
              <h2 className="text-2xl font-semibold text-page mb-6">
                Who uses WhiteScreen Tools?
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  {
                    emoji: "📸",
                    title: "Photographers",
                    text: "Fill lighting, color calibration, and clean backgrounds.",
                  },
                  {
                    emoji: "🎥",
                    title: "Videographers",
                    text: "Green/blue screens for chroma key and zoom lighting.",
                  },
                  {
                    emoji: "🎨",
                    title: "Designers",
                    text: "Color testing, monitor calibration, neutral backgrounds.",
                  },
                  {
                    emoji: "👨‍💻",
                    title: "Developers",
                    text: "Display testing, dead pixels, and calibration.",
                  },
                  {
                    emoji: "🎓",
                    title: "Educators",
                    text: "Presentations, focus tools, distraction-free backgrounds.",
                  },
                  {
                    emoji: "🎭",
                    title: "Content creators",
                    text: "Pranks, overlays, and stream-friendly effects.",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="bg-card border border-card rounded-xl p-5"
                  >
                    <h3 className="text-base font-semibold text-page mb-2">
                      {item.emoji} {item.title}
                    </h3>
                    <p className="text-sm text-page/80">{item.text}</p>
                  </div>
                ))}
              </div>
            </section>

            <SectionCard title="Privacy & transparency">
              <p className="mb-4">
                Screen tools run entirely in your browser. Preferences, pinned tools, and
                settings are stored locally on your device — not on our servers.
              </p>
              <p>
                The optional{" "}
                <Link href="/contact" className="text-[color:var(--accent-color)] hover:underline">
                  contact form
                </Link>{" "}
                is the only feature that sends information you provide (name, email,
                message) so we can reply. See our{" "}
                <Link href="/privacy" className="text-[color:var(--accent-color)] hover:underline">
                  Privacy Policy
                </Link>{" "}
                for details.
              </p>
            </SectionCard>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
