import type { Metadata } from "next";
import Link from "next/link";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Terms and Conditions - WhiteScreen Tools",
  description: "Terms and Conditions for WhiteScreen Tools.",
};

const LAST_UPDATED = "July 21, 2026";

export default function TermsPage() {
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
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center text-page">
            Terms and Conditions
          </h1>
          <p className="text-sm text-page/60 text-center mb-12">
            Last updated: {LAST_UPDATED}
          </p>

          <div className="space-y-8 text-page/90 leading-relaxed">
            <section>
              <h2 className="text-2xl font-semibold text-page mb-4">
                Acceptance of terms
              </h2>
              <p className="text-lg">
                By accessing and using WhiteScreen Tools, you accept and agree to
                be bound by these terms. If you do not agree, please do not use
                this service.
              </p>
            </section>

            <section className="bg-card border border-card p-6 rounded-xl">
              <h2 className="text-2xl font-semibold text-page mb-4">Use license</h2>
              <p className="text-lg mb-4">
                Permission is granted to use WhiteScreen Tools for personal and
                commercial purposes. Under this license you may not:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-2">
                <li>Modify or copy the materials without permission</li>
                <li>Use the materials for any illegal or unauthorized purpose</li>
                <li>Attempt to reverse engineer any software contained in the site</li>
                <li>Remove any copyright or proprietary notations from the materials</li>
                <li>
                  Transfer the materials to another person or mirror them on any
                  other server
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-page mb-4">Disclaimer</h2>
              <p className="text-lg">
                The materials on WhiteScreen Tools are provided on an &apos;as
                is&apos; basis. We make no warranties, expressed or implied, and
                disclaim all other warranties including merchantability, fitness
                for a particular purpose, or non-infringement.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-page mb-4">Limitations</h2>
              <p className="text-lg">
                In no event shall WhiteScreen Tools be liable for any damages
                arising out of the use or inability to use the materials on this
                site, even if we have been notified of the possibility of such
                damage.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-page mb-4">
                Accuracy of materials
              </h2>
              <p className="text-lg">
                Materials on this site may include technical or typographical
                errors. We do not warrant that any materials are accurate,
                complete, or current. We may make changes at any time without
                notice.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-page mb-4">Links</h2>
              <p className="text-lg">
                We have not reviewed all linked sites and are not responsible for
                their contents. The inclusion of a link does not imply endorsement.
                Use linked websites at your own risk.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-page mb-4">Modifications</h2>
              <p className="text-lg">
                We may revise these terms at any time without notice. By using
                this website you agree to be bound by the current version.
              </p>
            </section>

            <section className="bg-card border border-card p-6 rounded-xl">
              <h2 className="text-2xl font-semibold text-page mb-4">Governing law</h2>
              <p className="text-lg">
                These terms are governed by applicable laws. Disputes relating to
                these terms will be subject to the exclusive jurisdiction of the
                courts in the jurisdiction where WhiteScreen Tools operates.
              </p>
            </section>

            <p className="text-sm text-page/70">
              See also our{" "}
              <Link href="/disclaimer" className="text-[color:var(--accent-color)] hover:underline">
                Disclaimer
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="text-[color:var(--accent-color)] hover:underline">
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
