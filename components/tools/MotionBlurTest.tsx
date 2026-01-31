"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/lib/store";

const UFO_WIDTH = 80;

export function MotionBlurTest() {
  const router = useRouter();
  const showToast = useAppStore((s) => s.showToast);
  const [ufoPos, setUfoPos] = useState(0);
  const [motionSpeed, setMotionSpeed] = useState(5);
  const rafRef = useRef<number>(0);
  const runningRef = useRef(true);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") router.push("/");
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [router]);

  useEffect(() => {
    runningRef.current = true;

    function animate() {
      if (!runningRef.current) return;

      setUfoPos((prev) => {
        const screenWidth = typeof window !== "undefined" ? window.innerWidth : 1920;
        let next = prev + motionSpeed;
        if (next > screenWidth) next = -UFO_WIDTH;
        return next;
      });

      rafRef.current = requestAnimationFrame(animate);
    }

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      runningRef.current = false;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [motionSpeed]);

  function changeMotionSpeed() {
    setMotionSpeed((s) => {
      const next = s >= 15 ? 5 : s + 5;
      showToast(`Speed set to ${next}`);
      return next;
    });
  }

  return (
    <div
      id="motion-test-container"
      className="fixed inset-0 z-[9996] overflow-hidden bg-[#222]"
      role="application"
      aria-label="Motion blur and ghosting test - UFO tracks"
    >
      {/* Track 1 - fast (green) */}
      <div
        className="track absolute left-0 w-full border-t border-b border-[#444]"
        style={{ top: "25%", height: 100 }}
      >
        <div
          id="ufo-fast"
          className="absolute w-20 h-10 rounded-[5px] bg-[#00ff00]"
          style={{
            top: 30,
            left: 0,
            transform: `translateX(${ufoPos}px)`,
            boxShadow: "0 0 10px #00ff00",
          }}
          aria-hidden
        />
      </div>

      {/* Track 2 - medium (cyan) */}
      <div
        className="track absolute left-0 w-full border-t border-b border-[#444]"
        style={{ top: "50%", height: 100 }}
      >
        <div
          id="ufo-med"
          className="absolute w-20 h-10 rounded-[5px] bg-[#00ffff]"
          style={{
            top: 30,
            left: 0,
            transform: `translateX(${ufoPos * 0.6}px)`,
            boxShadow: "0 0 10px #00ffff",
          }}
          aria-hidden
        />
      </div>

      {/* Bottom UI */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center text-white font-sans"
        style={{ minWidth: 280 }}
      >
        <p className="font-semibold">Motion Blur & Ghosting Test</p>
        <p className="text-xs text-[#aaa] mt-1">
          Watch for &quot;shadows&quot; trailing the blocks. Lower quality screens will show more blur.
        </p>
        <button
          type="button"
          onClick={changeMotionSpeed}
          className="mt-3 px-4 py-2 cursor-pointer rounded bg-white/15 hover:bg-white/25 text-white text-sm font-medium transition-colors"
        >
          Change Speed
        </button>
      </div>

      {/* Exit */}
      <Link
        href="/"
        className="absolute top-4 right-4 z-10 px-3 py-2 rounded-lg text-white text-sm font-medium hover:bg-white/20 transition-colors"
        style={{ background: "rgba(0,0,0,0.5)" }}
      >
        ✕ Exit
      </Link>
    </div>
  );
}
