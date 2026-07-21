"use client";

import Link from "next/link";
import { useAppStore } from "@/lib/store";

/** Muted footer controls; underline on hover for parity between links and link-styled buttons. */
const FOOT_INTERACTIVE =
  "text-page/85 text-xs md:text-sm underline-offset-[0.18em] decoration-[color:var(--accent-color)] hover:underline hover:text-page bg-transparent transition-colors motion-reduce:transition-none cursor-pointer rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--accent-color)]";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const setChangelogOpen = useAppStore((s) => s.setChangelogOpen);
  const setShortcutsOpen = useAppStore((s) => s.setShortcutsOpen);
  const setHealthDashboardOpen = useAppStore((s) => s.setHealthDashboardOpen);

  return (
    <footer aria-label="Site footer" className="zen-ui bg-card border-t border-card mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
        <p className="text-center text-xs text-page/75 mb-4 max-w-xl mx-auto leading-relaxed tracking-tight">
          Notice: Tools are provided for testing and entertainment. Use at your own risk. Warning: Some
          tools may contain flashing lights. By using this site, you agree to our{" "}
          <Link href="/terms" className={FOOT_INTERACTIVE}>
            Terms
          </Link>{" "}
          and{" "}
          <Link href="/disclaimer" className={FOOT_INTERACTIVE}>
            Full Disclaimer
          </Link>
          .
        </p>

        <div className="flex flex-col md:flex-row items-center justify-between gap-y-3 md:gap-y-0">
          <nav
            aria-label="Footer links"
            className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 md:justify-start"
          >
            <button
              type="button"
              onClick={() => setChangelogOpen(true)}
              className={`${FOOT_INTERACTIVE} inline p-0 border-none font-inherit`}
            >
              What&apos;s New
            </button>
            <span className="hidden sm:inline select-none text-page/35 text-xs font-light" aria-hidden="true">
              ·
            </span>
            <button
              type="button"
              onClick={() => setHealthDashboardOpen(true)}
              className={`${FOOT_INTERACTIVE} inline p-0 border-none font-inherit`}
            >
              Monitor Health
            </button>
            <span className="hidden sm:inline select-none text-page/35 text-xs font-light" aria-hidden="true">
              ·
            </span>
            <button
              type="button"
              onClick={() => setShortcutsOpen(true)}
              className={`${FOOT_INTERACTIVE} inline p-0 border-none font-inherit`}
            >
              Shortcuts
            </button>
            <span className="hidden sm:inline select-none text-page/35 text-xs font-light" aria-hidden="true">
              ·
            </span>
            <Link href="/about" className={FOOT_INTERACTIVE}>
              About Us
            </Link>
            <span className="hidden sm:inline select-none text-page/35 text-xs font-light" aria-hidden="true">
              ·
            </span>
            <Link href="/docs" className={FOOT_INTERACTIVE}>
              Docs
            </Link>
            <span className="hidden sm:inline select-none text-page/35 text-xs font-light" aria-hidden="true">
              ·
            </span>
            <Link href="/contact" className={FOOT_INTERACTIVE}>
              Contact
            </Link>
            <span className="hidden sm:inline select-none text-page/35 text-xs font-light" aria-hidden="true">
              ·
            </span>
            <Link href="/privacy" className={FOOT_INTERACTIVE}>
              Privacy Policy
            </Link>
            <span className="hidden sm:inline select-none text-page/35 text-xs font-light" aria-hidden="true">
              ·
            </span>
            <Link href="/terms" className={FOOT_INTERACTIVE}>
              Terms and Conditions
            </Link>
            <span className="hidden sm:inline select-none text-page/35 text-xs font-light" aria-hidden="true">
              ·
            </span>
            <Link href="/disclaimer" className={FOOT_INTERACTIVE}>
              Disclaimer
            </Link>
            <span className="hidden sm:inline select-none text-page/35 text-xs font-light" aria-hidden="true">
              ·
            </span>
            <Link href="/license" className={FOOT_INTERACTIVE}>
              License
            </Link>
          </nav>

          <p className="text-page/75 text-xs md:text-sm text-center md:text-end max-md:max-w-[min(100%,20rem)]">
            © {currentYear} WhiteScreen Tools — All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
}
