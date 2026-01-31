"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAppStore } from "@/lib/store";
import Image from "next/image";

const PATTERNS = [
  { id: "pattern-1", src: "/images/broken-screen/pattern-1.png" },
  { id: "pattern-2", src: "/images/broken-screen/A540D4DB-A25F-4FE5-81CE-A2C4825365F1.jpeg" },
  { id: "pattern-3", src: "/images/broken-screen/pattern-3.png" },
  { id: "pattern-4", src: "/images/broken-screen/pattern-4.png" },
  { id: "pattern-5", src: "/images/broken-screen/7A515A49-2903-4B2A-A524-A5CCDEC64CE8.jpeg" },
];

export function BrokenScreenOverlay() {
  const router = useRouter();
  const { activeMode, brokenScreen, toggleFullscreen } = useAppStore();

  if (activeMode !== "broken-screen") return null;

  const selectedPattern = PATTERNS.find(p => p.id === brokenScreen.pattern) || PATTERNS[0];

  return (
    <div className="absolute inset-0 overflow-hidden" style={{ zIndex: 5 }}>
      {/* Scale up slightly and position to crop out bottom camera icon */}
      <div 
        className="absolute inset-0 pointer-events-none" 
        style={{ 
          top: '-2%', 
          bottom: '-5%',
          left: '-2.5%',
          right: '-2.5%',
        }}
      >
        <Image
          src={selectedPattern.src}
          alt="Broken screen crack pattern overlay for full-screen display prank"
          fill
          quality={100}
          priority
          className="object-cover object-top"
          style={{
            imageRendering: 'auto',
          }}
          sizes="100vw"
        />
      </div>
      {/* Exit prank - visible on hover, shows it's a simulation */}
      <Link
        href="/"
        onClick={(e) => { e.preventDefault(); toggleFullscreen(); router.push("/"); }}
        className="absolute top-3 right-3 w-9 h-9 flex items-center justify-center rounded-full bg-black/30 text-white/90 opacity-0 hover:opacity-100 focus:opacity-100 transition-opacity pointer-events-auto z-10 text-sm font-medium"
        aria-label="Exit prank simulation"
        title="Exit (this is a simulation)"
      >
        ✕
      </Link>
    </div>
  );
}
