"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useAppStore } from "@/lib/store";
import { COLOR_PRESETS } from "@/lib/colorUtils";
import { useTranslation } from "@/hooks/useTranslation";
import type { Language } from "@/lib/translations";

const languages: { code: Language; name: string; flag: string }[] = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
  { code: "it", name: "Italiano", flag: "🇮🇹" },
  { code: "pt", name: "Português", flag: "🇵🇹" },
  { code: "zh", name: "中文", flag: "🇨🇳" },
  { code: "ja", name: "日本語", flag: "🇯🇵" },
  { code: "ko", name: "한국어", flag: "🇰🇷" },
  { code: "ar", name: "العربية", flag: "🇸🇦" },
  { code: "ru", name: "Русский", flag: "🇷🇺" },
  { code: "hi", name: "हिन्दी", flag: "🇮🇳" },
];

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const langMenuRef = useRef<HTMLDivElement>(null);
  const { setColor, setActiveMode, setActiveTab, language, setLanguage } = useAppStore();
  const t = useTranslation();

  const resetToWhite = () => {
    setColor(COLOR_PRESETS[0].hex); // White
    setActiveMode("color");
    setActiveTab("colors");
  };

  const currentLanguage = languages.find(lang => lang.code === language) || languages[0];

  // Close language menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langMenuRef.current && !langMenuRef.current.contains(event.target as Node)) {
        setIsLangMenuOpen(false);
      }
    };

    if (isLangMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isLangMenuOpen]);

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-14">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link 
              href="/" 
              onClick={resetToWhite}
              className="text-gray-900 font-semibold text-lg hover:text-gray-700 transition-colors"
            >
              WhiteScreen Pro
            </Link>
          </div>

          {/* Desktop Navigation - Closer to brand */}
          <div className="hidden md:flex items-center space-x-4 ml-6">
            <Link
              href="/"
              onClick={resetToWhite}
              className="text-gray-700 hover:text-gray-900 transition-colors text-sm"
            >
              {t.nav.home}
            </Link>
            <Link
              href="/about"
              className="text-gray-700 hover:text-gray-900 transition-colors text-sm"
            >
              {t.nav.about}
            </Link>
            <Link
              href="/contact"
              className="text-gray-700 hover:text-gray-900 transition-colors text-sm"
            >
              {t.nav.contact}
            </Link>
            
            {/* Language Selector */}
            <div className="relative ml-2" ref={langMenuRef}>
              <button
                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                className="flex items-center gap-1.5 px-2 py-1 text-gray-700 hover:text-gray-900 transition-colors text-sm"
              >
                <span className="text-base">{currentLanguage.flag}</span>
                <span>{currentLanguage.name}</span>
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className={`transition-transform ${isLangMenuOpen ? "rotate-180" : ""}`}
                >
                  <path d="M3 4.5L6 7.5L9 4.5" />
                </svg>
              </button>
              
              {isLangMenuOpen && (
                <div className="absolute right-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50 max-h-64 overflow-y-auto">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code);
                        setIsLangMenuOpen(false);
                      }}
                      className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-100 transition-colors flex items-center gap-2 ${
                        language === lang.code ? "bg-blue-50 text-blue-700" : "text-gray-700"
                      }`}
                    >
                      <span className="text-base">{lang.flag}</span>
                      <span>{lang.name}</span>
                      {language === lang.code && (
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="currentColor"
                          className="ml-auto"
                        >
                          <path d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z" />
                        </svg>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button and Language */}
          <div className="md:hidden flex items-center gap-2 ml-auto">
            {/* Language Selector - Mobile */}
            <div className="relative" ref={langMenuRef}>
              <button
                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                className="flex items-center gap-1 p-2 text-gray-700 hover:text-gray-900 transition-colors"
                aria-label="Select language"
              >
                <span className="text-base">{currentLanguage.flag}</span>
              </button>
              
              {isLangMenuOpen && (
                <div className="absolute right-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50 max-h-64 overflow-y-auto">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code);
                        setIsLangMenuOpen(false);
                      }}
                      className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-100 transition-colors flex items-center gap-2 ${
                        language === lang.code ? "bg-blue-50 text-blue-700" : "text-gray-700"
                      }`}
                    >
                      <span className="text-base">{lang.flag}</span>
                      <span>{lang.name}</span>
                      {language === lang.code && (
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="currentColor"
                          className="ml-auto"
                        >
                          <path d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z" />
                        </svg>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-gray-700 hover:text-gray-900 transition-colors"
              aria-label="Toggle menu"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                {isMenuOpen ? (
                  <path d="M18 6L6 18M6 6l12 12" />
                ) : (
                  <path d="M3 12h18M3 6h18M3 18h18" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <Link
              href="/"
              className="block px-2 py-2 text-gray-700 hover:text-gray-900 transition-colors"
              onClick={() => {
                setIsMenuOpen(false);
                resetToWhite();
              }}
            >
              {t.nav.home}
            </Link>
            <Link
              href="/about"
              className="block px-2 py-2 text-gray-700 hover:text-gray-900 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              {t.nav.about}
            </Link>
            <Link
              href="/contact"
              className="block px-2 py-2 text-gray-700 hover:text-gray-900 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              {t.nav.contact}
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}

