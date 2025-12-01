"use client";

import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
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
  { code: "tr", name: "Türkçe", flag: "🇹🇷" },
];

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 56, right: 16 });
  const langMenuRefDesktop = useRef<HTMLDivElement>(null);
  const langMenuRefMobile = useRef<HTMLDivElement>(null);
  const buttonRefDesktop = useRef<HTMLButtonElement>(null);
  const buttonRefMobile = useRef<HTMLButtonElement>(null);
  const dropdownRefDesktop = useRef<HTMLDivElement>(null);
  const dropdownRefMobile = useRef<HTMLDivElement>(null);
  const { setColor, setActiveMode, setActiveTab, language, setLanguage } = useAppStore();
  const t = useTranslation();

  const resetToWhite = () => {
    setColor(COLOR_PRESETS[0].hex); // White
    setActiveMode("color");
    setActiveTab("colors");
  };

  const currentLanguage = languages.find(lang => lang.code === language) || languages[0];

  // Handle client-side mount and screen size
  useEffect(() => {
    setMounted(true);
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Update dropdown position when menu opens
  useEffect(() => {
    if (isLangMenuOpen && mounted) {
      const button = buttonRefDesktop.current || buttonRefMobile.current;
      if (button) {
        const rect = button.getBoundingClientRect();
        setDropdownPosition({
          top: rect.bottom + 4,
          right: window.innerWidth - rect.right
        });
      }
    }
  }, [isLangMenuOpen, mounted]);

  // Close language menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node;
      const isClickInsideDesktop = 
        (buttonRefDesktop.current?.contains(target)) ||
        (dropdownRefDesktop.current?.contains(target)) ||
        (langMenuRefDesktop.current?.contains(target));
      const isClickInsideMobile = 
        (buttonRefMobile.current?.contains(target)) ||
        (dropdownRefMobile.current?.contains(target)) ||
        (langMenuRefMobile.current?.contains(target));
      
      if (!isClickInsideDesktop && !isClickInsideMobile) {
        setIsLangMenuOpen(false);
      }
    };

    if (isLangMenuOpen) {
      // Use a small delay to allow click events to register first
      const timeoutId = setTimeout(() => {
        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("touchstart", handleClickOutside);
      }, 100);

      return () => {
        clearTimeout(timeoutId);
        document.removeEventListener("mousedown", handleClickOutside);
        document.removeEventListener("touchstart", handleClickOutside);
      };
    }
  }, [isLangMenuOpen]);

  return (
    <nav className="bg-white border-b border-gray-200 w-full relative z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full overflow-x-hidden">
        <div className="flex items-center h-14 w-full min-w-0">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link 
              href="/" 
              onClick={resetToWhite}
              className="text-gray-900 font-semibold text-lg hover:text-gray-700 transition-colors"
            >
              WhiteScreen Tools
            </Link>
          </div>

          {/* Desktop Navigation - Closer to brand */}
          <div className="hidden md:flex items-center space-x-4 ml-6 flex-shrink-0">
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
          </div>

          {/* Language Selector - Far Right */}
          <div className="hidden md:block ml-auto flex-shrink-0" ref={langMenuRefDesktop}>
            <div className="relative">
              <button
                ref={buttonRefDesktop}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsLangMenuOpen(!isLangMenuOpen);
                }}
                className="flex items-center gap-1.5 px-2 py-1 text-gray-700 hover:text-gray-900 transition-colors text-sm whitespace-nowrap"
              >
                <span className="text-base">{currentLanguage.flag}</span>
                <span className="truncate max-w-[120px]">{currentLanguage.name}</span>
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className={`transition-transform flex-shrink-0 ${isLangMenuOpen ? "rotate-180" : ""}`}
                >
                  <path d="M3 4.5L6 7.5L9 4.5" />
                </svg>
              </button>
              
              {mounted && isLangMenuOpen && isDesktop && createPortal(
                <div 
                  ref={dropdownRefDesktop}
                  className="fixed w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-1 max-h-64 overflow-y-auto"
                  onClick={(e) => e.stopPropagation()}
                  style={{ 
                    top: `${dropdownPosition.top}px`,
                    right: `${dropdownPosition.right}px`,
                    zIndex: 9999,
                    maxWidth: 'calc(100vw - 2rem)'
                  }}
                >
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setLanguage(lang.code);
                        setIsLangMenuOpen(false);
                      }}
                      onTouchEnd={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setLanguage(lang.code);
                        setIsLangMenuOpen(false);
                      }}
                      className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-100 active:bg-gray-200 transition-colors flex items-center gap-2 ${
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
                </div>,
                document.body
              )}
            </div>
          </div>

          {/* Mobile Menu Button and Language */}
          <div className="md:hidden flex items-center gap-2 ml-auto flex-shrink-0">
            {/* Language Selector - Mobile */}
            <div className="relative" ref={langMenuRefMobile}>
              <button
                ref={buttonRefMobile}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsLangMenuOpen(!isLangMenuOpen);
                }}
                className="flex items-center gap-1 p-2 text-gray-700 hover:text-gray-900 transition-colors"
                aria-label="Select language"
              >
                <span className="text-base">{currentLanguage.flag}</span>
              </button>
              
              {mounted && isLangMenuOpen && !isDesktop && createPortal(
                <div 
                  ref={dropdownRefMobile}
                  className="fixed w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-1 max-h-64 overflow-y-auto"
                  onClick={(e) => e.stopPropagation()}
                  style={{ 
                    top: `${dropdownPosition.top}px`,
                    right: `${dropdownPosition.right}px`,
                    zIndex: 9999,
                    maxWidth: 'calc(100vw - 2rem)'
                  }}
                >
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setLanguage(lang.code);
                        setIsLangMenuOpen(false);
                      }}
                      onTouchEnd={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setLanguage(lang.code);
                        setIsLangMenuOpen(false);
                      }}
                      className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-100 active:bg-gray-200 transition-colors flex items-center gap-2 ${
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
                </div>,
                document.body
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

