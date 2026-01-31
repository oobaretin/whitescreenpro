"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/lib/store";

export function QuickNav() {
  const router = useRouter();
  const { setColor, setActiveMode } = useAppStore();
  const [visible, setVisible] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (e.clientY < 50) {
        setVisible(true);
      } else if (e.clientY > 100) {
        setVisible(false);
      }
    };
    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const goToColor = (hex: string, slug: string) => {
    setColor(hex);
    setActiveMode("color");
    router.push(`/${slug}`);
  };

  return (
    <nav
      ref={navRef}
      className="fixed left-0 w-full h-[50px] flex items-center justify-center gap-4 transition-[top] duration-300 z-[10001]"
      style={{
        top: visible ? 0 : -60,
        background: "rgba(0,0,0,0.8)",
      }}
    >
      <Link
        href="/"
        className="text-white no-underline mx-3 hover:opacity-90"
      >
        🏠 Home
      </Link>
      <button
        type="button"
        onClick={() => goToColor("#ffffff", "white-screen")}
        className="w-5 h-5 rounded-none border-0 cursor-pointer mx-2 bg-white"
        aria-label="White screen"
      />
      <button
        type="button"
        onClick={() => goToColor("#000000", "black-screen")}
        className="w-5 h-5 rounded-none border border-white cursor-pointer mx-2 bg-black"
        aria-label="Black screen"
      />
      <button
        type="button"
        onClick={() => goToColor("#00ff00", "green-screen")}
        className="w-5 h-5 rounded-none border-0 cursor-pointer mx-2 bg-green-500"
        aria-label="Green screen"
      />
      <span className="text-gray-400 text-xs ml-5">
        Move mouse away to hide
      </span>
    </nav>
  );
}
