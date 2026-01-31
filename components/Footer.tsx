"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useAppStore } from "@/lib/store";

export function Footer() {
  const [currentYear, setCurrentYear] = useState(2025);
  const setChangelogOpen = useAppStore((s) => s.setChangelogOpen);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="bg-card border-t border-card mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
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

