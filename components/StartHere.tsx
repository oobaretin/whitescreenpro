"use client";

import Link from "next/link";
import { useAppStore } from "@/lib/store";

const ctaClass =
  "inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--accent-color)]";

export function StartHere() {
  const setHealthDashboardOpen = useAppStore((s) => s.setHealthDashboardOpen);

  return (
    <section className="mb-8" aria-labelledby="start-here-heading">
      <h2
        id="start-here-heading"
        className="text-sm font-semibold text-page/70 uppercase tracking-wide mb-3 text-center sm:text-left"
      >
        Start here
      </h2>
      <div className="flex flex-col sm:flex-row gap-3 justify-center sm:justify-start">
        <button
          type="button"
          onClick={() => setHealthDashboardOpen(true)}
          className={`${ctaClass} text-white`}
          style={{ background: "var(--accent-color)" }}
        >
          <span aria-hidden="true">🖥️</span>
          Test my monitor
        </button>
        <Link
          href="/zoom-lighting"
          className={`${ctaClass} bg-card border border-card text-page hover:bg-page/5`}
        >
          <span aria-hidden="true">🎥</span>
          Video call lighting
        </Link>
        <Link
          href="/docs"
          className={`${ctaClass} bg-card border border-card text-page hover:bg-page/5 sm:ml-auto`}
        >
          Help guide
        </Link>
      </div>
    </section>
  );
}
