"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export function Footer() {
  const [currentYear, setCurrentYear] = useState(2025);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="bg-white border-t border-gray-200 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-2 md:space-y-0">
          {/* Links */}
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs md:text-sm">
            <Link
              href="/about"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              About Us
            </Link>
            <span className="text-gray-600 hidden sm:inline">•</span>
            <Link
              href="/contact"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Contact
            </Link>
            <span className="text-gray-600 hidden sm:inline">•</span>
            <Link
              href="/privacy"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Privacy Policy
            </Link>
            <span className="text-gray-600 hidden sm:inline">•</span>
            <Link
              href="/terms"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Terms and Conditions
            </Link>
            <span className="text-gray-600 hidden sm:inline">•</span>
            <Link
              href="/license"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              License
            </Link>
          </div>

          {/* Copyright */}
          <div className="text-xs md:text-sm text-gray-600">
            © {currentYear} WhiteScreen Pro — All rights reserved
          </div>
        </div>
      </div>
    </footer>
  );
}

