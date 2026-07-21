import type { Metadata } from "next";
import Link from "next/link";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy - WhiteScreen Tools",
  description: "Privacy Policy for WhiteScreen Tools.",
};

const LAST_UPDATED = "July 21, 2026";

export default function PrivacyPage() {
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
            Privacy Policy
          </h1>
          <p className="text-sm text-page/60 text-center mb-12">
            Last updated: {LAST_UPDATED}
          </p>

          <div className="space-y-8 text-page/90 leading-relaxed">
            <section>
              <h2 className="text-2xl font-semibold text-page mb-4">
                Our Commitment to Privacy
              </h2>
              <p className="text-lg">
                WhiteScreen Tools is built privacy-first. The screen tools themselves run
                entirely in your browser — we do not operate accounts, ads, or usage
                analytics. Your color settings, favorites, and preferences stay on your
                device unless you choose to share a link.
              </p>
            </section>

            <section className="bg-card border border-card p-6 rounded-xl">
              <h2 className="text-2xl font-semibold text-page mb-4">
                Screen tools — no tracking
              </h2>
              <p className="text-lg mb-4">
                When you use our color screens, monitor tests, pranks, and other tools:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-2">
                <li>We do not track your usage inside the tools</li>
                <li>We do not use cookies for advertising or analytics</li>
                <li>We do not sell personal information</li>
                <li>Preferences are saved in your browser&apos;s local storage</li>
                <li>Tool logic runs client-side; settings are not synced to our servers</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-page mb-4">Contact form</h2>
              <p className="text-lg mb-4">
                If you submit the form on our{" "}
                <Link href="/contact" className="text-[color:var(--accent-color)] hover:underline">
                  Contact
                </Link>{" "}
                page, you voluntarily send us your name, email address, and message. That
                submission is delivered through{" "}
                <a
                  href="https://web3forms.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[color:var(--accent-color)] hover:underline"
                >
                  Web3Forms
                </a>{" "}
                so we can receive and reply to your inquiry. We use this information only
                to respond to you. Web3Forms may process the submission according to their
                own privacy policy.
              </p>
              <p className="text-lg">
                Using the contact form is optional. You can also email us directly at{" "}
                <a
                  href="mailto:contact@whitescreentools.com"
                  className="text-[color:var(--accent-color)] hover:underline"
                >
                  contact@whitescreentools.com
                </a>
                .
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-page mb-4">Local storage</h2>
              <p className="text-lg">
                WhiteScreen Tools uses your browser&apos;s local storage for pinned tools,
                recent tools, theme, language, and tool settings. This data never leaves
                your device unless you clear it in browser settings or share a URL that
                encodes settings. You have full control over this data.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-page mb-4">
                Hosting &amp; standard logs
              </h2>
              <p className="text-lg">
                Our site is hosted on Vercel. Like most websites, our hosting provider
                may automatically log basic request data (such as IP address, browser
                type, and pages requested) for security and operations. We do not use
                these logs to profile or track individual tool usage.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-page mb-4">
                Third-party fonts
              </h2>
              <p className="text-lg">
                We load web fonts from Google Fonts to display typography. Your browser
                may connect to Google&apos;s servers when loading the site. See{" "}
                <a
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[color:var(--accent-color)] hover:underline"
                >
                  Google&apos;s privacy policy
                </a>{" "}
                for details.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-page mb-4">
                Changes to this policy
              </h2>
              <p className="text-lg">
                We may update this Privacy Policy from time to time. Changes will be
                posted on this page with an updated revision date.
              </p>
            </section>

            <section className="bg-card border border-card p-6 rounded-xl">
              <h2 className="text-2xl font-semibold text-page mb-4">Questions</h2>
              <p className="text-lg">
                Questions about this policy?{" "}
                <Link href="/contact" className="text-[color:var(--accent-color)] hover:underline">
                  Contact us
                </Link>{" "}
                or email{" "}
                <a
                  href="mailto:contact@whitescreentools.com"
                  className="text-[color:var(--accent-color)] hover:underline"
                >
                  contact@whitescreentools.com
                </a>
                .
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
