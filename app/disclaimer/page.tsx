import type { Metadata } from "next";
import Link from "next/link";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Disclaimer & Safety Warning - WhiteScreen Tools",
  description: "Disclaimer, safety warnings, and responsible use for WhiteScreen Tools.",
};

export default function DisclaimerPage() {
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
          <h1 className="text-4xl md:text-5xl font-bold mb-2 text-center text-page">
            Disclaimer &amp; Safety Warning
          </h1>
          <p className="text-sm text-page/70 text-center mb-12">
            WhiteScreen Tools — use at your own risk
          </p>

          <div className="space-y-8 text-page/90 leading-relaxed">
            <section className="bg-card border border-card rounded-xl p-6">
              <h2 className="text-xl font-semibold text-page mb-3">
                1. Epilepsy &amp; photosensitivity
              </h2>
              <p>
                Some tools, including the Dead Pixel Test and certain effects, may
                involve flashing colors or rapid light changes. If you have a
                history of epilepsy or photosensitivity, consult a medical
                professional before use. Stop immediately if you experience
                dizziness, altered vision, or muscle twitches.
              </p>
            </section>

            <section className="bg-card border border-card rounded-xl p-6">
              <h2 className="text-xl font-semibold text-page mb-3">
                2. Prank tools &amp; responsible use
              </h2>
              <p>
                Broken Screen, BSOD, and Fake Update tools are for entertainment
                only. We are not responsible for distress or disciplinary actions
                from prank use. Ensure others know it is a simulation in a timely
                manner.
              </p>
            </section>

            <section className="bg-card border border-card rounded-xl p-6">
              <h2 className="text-xl font-semibold text-page mb-3">
                3. Hardware safety
              </h2>
              <p>
                Prolonged high-brightness solid colors (especially on OLED
                displays) can contribute to burn-in. Use the Burn-In Fixer or limit
                continuous display time when testing panels.
              </p>
            </section>

            <section className="bg-card border border-card rounded-xl p-6">
              <h2 className="text-xl font-semibold text-page mb-3">
                4. No professional liability
              </h2>
              <p>
                Utilities are provided &quot;as-is.&quot; We are not liable for
                hardware failure, data loss, or professional errors from signature
                capture, monitor testing, or other tools.
              </p>
            </section>
          </div>

          <div className="mt-12 pt-8 border-t border-card text-center text-sm">
            <Link
              href="/terms"
              className="text-[color:var(--accent-color)] hover:underline"
            >
              Terms and Conditions
            </Link>
            <span className="mx-2 text-page/60">·</span>
            <Link
              href="/privacy"
              className="text-[color:var(--accent-color)] hover:underline"
            >
              Privacy Policy
            </Link>
            <span className="mx-2 text-page/60">·</span>
            <Link
              href="/docs"
              className="text-[color:var(--accent-color)] hover:underline"
            >
              Help &amp; Docs
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
