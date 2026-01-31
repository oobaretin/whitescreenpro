"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/lib/store";

const TONES = ["#ffb000", "#ffcf70", "#e6bc98"] as const;

export function ReadingLight() {
  const router = useRouter();
  const showToast = useAppStore((s) => s.showToast);
  const [toneIndex, setToneIndex] = useState(0);
  const [cursorVisible, setCursorVisible] = useState(false);
  const hideCursorTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const bg = TONES[toneIndex];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") router.push("/");
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [router]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleMove = () => {
      setCursorVisible(true);
      if (hideCursorTimeout.current) clearTimeout(hideCursorTimeout.current);
      hideCursorTimeout.current = setTimeout(() => setCursorVisible(false), 3000);
    };

    el.addEventListener("mousemove", handleMove);
    return () => {
      el.removeEventListener("mousemove", handleMove);
      if (hideCursorTimeout.current) clearTimeout(hideCursorTimeout.current);
    };
  }, []);

  const handleClick = () => {
    setToneIndex((i) => (i + 1) % TONES.length);
    showToast("Tone adjusted");
  };

  return (
    <div
      ref={containerRef}
      id="reading-light-container"
      className="fixed inset-0 z-[9995] group"
      style={{
        backgroundColor: bg,
        cursor: cursorVisible ? "default" : "none",
      }}
      role="application"
      aria-label="Reading light - soft amber mode"
      onClick={handleClick}
    >
      {/* Glow layer with breathing */}
      <div
        id="glow-layer"
        className="absolute inset-0 pointer-events-none reading-light-breathe"
        style={{
          background: "radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(0,0,0,0) 70%)",
        }}
        aria-hidden
      />

      {/* Exit – only visible on hover, no buttons */}
      <Link
        href="/"
        onClick={(e) => e.stopPropagation()}
        className="absolute top-4 right-4 z-10 px-3 py-2 rounded-lg text-[#4a3500] text-sm font-medium opacity-0 transition-opacity duration-500 hover:opacity-100 group-hover:opacity-100 focus:opacity-100 focus:outline-none"
        style={{ background: "rgba(255,255,255,0.2)" }}
      >
        ✕ Exit
      </Link>
    </div>
  );
}
