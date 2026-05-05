"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useAppStore } from "@/lib/store";

const MICRO1_REFERRAL_URL =
  "https://refer.micro1.ai/referral/jobs?referralCode=41368bfc-baf0-44d3-ba6d-ab0a692eb8d6&utm_source=referral&utm_medium=share&utm_campaign=job_referral";

export function Footer() {
  const [currentYear, setCurrentYear] = useState(2025);
  const setChangelogOpen = useAppStore((s) => s.setChangelogOpen);
  const setHealthDashboardOpen = useAppStore((s) => s.setHealthDashboardOpen);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="zen-ui bg-card border-t border-card mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-center mb-4">
          <a
            href={MICRO1_REFERRAL_URL}
            target="_blank"
            rel="noopener noreferrer nofollow sponsored"
            className="block max-w-3xl w-full rounded-xl shadow-md overflow-hidden transition-transform duration-200 ease-out hover:scale-[1.02] hover:shadow-lg"
          >
            <img
              src="https://placehold.co/1200x280/1e293b/94a3b8?text=Micro1+jobs+referral"
              alt="Micro1 jobs referral"
              className="w-full h-auto align-middle block"
              width={1200}
              height={280}
              loading="lazy"
              decoding="async"
            />
          </a>
        </div>
        {/* Legal notice (condensed) */}
        <p className="text-center text-xs text-page/80 mb-3 max-w-2xl mx-auto">
          Notice: Tools are provided for testing and entertainment. Use at your own risk. Warning: Some tools may contain flashing lights. By using this site, you agree to our{" "}
          <Link href="/terms" className="underline hover:opacity-80" style={{ color: "var(--accent-color)" }}>
            Terms
          </Link>
          {" "}and{" "}
          <Link href="/disclaimer" className="underline hover:opacity-80" style={{ color: "var(--accent-color)" }}>
            Full Disclaimer
          </Link>
          .
        </p>
        <div className="flex flex-col md:flex-row items-center justify-between space-y-2 md:space-y-0">
          {/* Links */}
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs md:text-sm text-page/80">
            <button
              type="button"
              onClick={() => setChangelogOpen(true)}
              className="bg-transparent border-none p-0 cursor-pointer hover:opacity-80 transition-opacity underline"
              style={{ color: "var(--accent-color)" }}
            >
              What&apos;s New
            </button>
            <span className="hidden sm:inline">·</span>
            <button
              type="button"
              onClick={() => setHealthDashboardOpen(true)}
              className="bg-transparent border-none p-0 cursor-pointer hover:opacity-80 transition-opacity underline"
              style={{ color: "var(--accent-color)" }}
            >
              Monitor Health
            </button>
            <span className="hidden sm:inline">·</span>
            <Link href="/about" className="hover:opacity-80 transition-opacity">
              About Us
            </Link>
            <span className="hidden sm:inline">·</span>
            <Link href="/contact" className="hover:opacity-80 transition-opacity">
              Contact
            </Link>
            <span className="hidden sm:inline">·</span>
            <Link href="/privacy" className="hover:opacity-80 transition-opacity">
              Privacy Policy
            </Link>
            <span className="hidden sm:inline">·</span>
            <Link href="/terms" className="hover:opacity-80 transition-opacity">
              Terms and Conditions
            </Link>
            <span className="hidden sm:inline">·</span>
            <Link href="/disclaimer" className="hover:opacity-80 transition-opacity">
              Disclaimer
            </Link>
            <span className="hidden sm:inline">·</span>
            <Link href="/license" className="hover:opacity-80 transition-opacity">
              License
            </Link>
          </div>

          {/* Copyright */}
          <div className="text-xs md:text-sm text-page/80">
            © {currentYear} WhiteScreen Tools — All rights reserved
          </div>
        </div>
      </div>
    </footer>
  );
}

