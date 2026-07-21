import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ContactForm } from "@/components/ContactForm";

const CONTACT_EMAIL = "contact@whitescreentools.com";
const GITHUB_ISSUES_URL =
  "https://github.com/oobaretin/whitescreenpro/issues/new/choose";

export const metadata: Metadata = {
  title: "Contact Us - WhiteScreen Tools",
  description: "Get in touch with the WhiteScreen Tools team.",
};

function ContactChannel({
  icon,
  title,
  children,
}: {
  icon: ReactNode;
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="bg-card border border-card rounded-xl p-5">
      <div className="flex items-start gap-3">
        <div
          className="shrink-0 flex items-center justify-center w-10 h-10 rounded-lg bg-page/10 text-page"
          aria-hidden="true"
        >
          {icon}
        </div>
        <div className="min-w-0">
          <h3 className="font-semibold text-page mb-1">{title}</h3>
          <div className="text-sm text-page/80 leading-relaxed">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default function ContactPage() {
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
              Contact Us
            </h1>
            <p className="text-lg text-page/80 leading-relaxed">
              Questions, ideas, or found a bug? Send a message — we typically
              reply within 24–48 hours.
            </p>
          </header>

          <div className="grid lg:grid-cols-5 gap-8 items-start">
            <section
              className="lg:col-span-3 bg-card border border-card rounded-xl p-6 sm:p-8 shadow-sm"
              aria-labelledby="contact-form-heading"
            >
              <h2
                id="contact-form-heading"
                className="text-xl font-semibold text-page mb-1"
              >
                Send a message
              </h2>
              <p className="text-sm text-page/70 mb-6">
                Fill out the form and we&apos;ll email you back.
              </p>
              <ContactForm />
            </section>

            <aside className="lg:col-span-2 space-y-4">
              <ContactChannel
                title="Email"
                icon={
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M4 4h16v16H4z" />
                    <path d="m22 6-10 7L2 6" />
                  </svg>
                }
              >
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="text-[color:var(--accent-color)] hover:underline break-all"
                >
                  {CONTACT_EMAIL}
                </a>
              </ContactChannel>

              <ContactChannel
                title="Bug reports & features"
                icon={
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                }
              >
                <p className="mb-2">
                  For bugs and feature requests, GitHub Issues gets the fastest
                  response.
                </p>
                <a
                  href={GITHUB_ISSUES_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[color:var(--accent-color)] hover:underline"
                >
                  Open an issue on GitHub →
                </a>
              </ContactChannel>

              <ContactChannel
                title="What helps us most"
                icon={
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 16v-4M12 8h.01" />
                  </svg>
                }
              >
                <ul className="space-y-1.5 list-disc list-inside marker:text-page/50">
                  <li>Which tool or page you were using</li>
                  <li>Browser and device (e.g. Chrome on iPhone)</li>
                  <li>Steps to reproduce the problem</li>
                </ul>
              </ContactChannel>

              <div className="rounded-xl border border-card bg-page/5 px-5 py-4 text-sm text-page/75">
                <span className="font-medium text-page">Response time:</span>{" "}
                Usually within 24–48 hours on weekdays.
              </div>
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
