"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/lib/store";

const STEPS = [
  "Dead Pixel Hunt",
  "Backlight Bleed Test",
  "Uniformity (Grey) Check",
  "Ghosting / Motion Blur",
] as const;

export function MonitorHealthWizard() {
  const router = useRouter();
  const healthDashboardOpen = useAppStore((s) => s.healthDashboardOpen);
  const healthDiagnosticStep = useAppStore((s) => s.healthDiagnosticStep);
  const healthDiagnosticComplete = useAppStore((s) => s.healthDiagnosticComplete);
  const setHealthDashboardOpen = useAppStore((s) => s.setHealthDashboardOpen);
  const startHealthDiagnostic = useAppStore((s) => s.startHealthDiagnostic);
  const advanceHealthDiagnostic = useAppStore((s) => s.advanceHealthDiagnostic);

  useEffect(() => {
    if (healthDiagnosticStep === 0) return;
    const showToast = useAppStore.getState().showToast;
    switch (healthDiagnosticStep) {
      case 1:
        router.push("/dead-pixel-test");
        showToast(
          "Step 1: Look for dots that don't match the fill color. Use the tool to cycle colors.",
          8000,
        );
        break;
      case 2:
        router.push("/black-screen");
        showToast(
          "Step 2: In a dark room, check corners for light leaking (backlight bleed).",
          8000,
        );
        break;
      case 3:
        router.push("/gray-screen");
        showToast(
          "Step 3: Does the grey look even or patchy / dirty? Check panel uniformity.",
          8000,
        );
        break;
      case 4:
        router.push("/motion-blur-test");
        showToast(
          "Final step: Watch for trails behind the moving blocks (ghosting / motion blur).",
          8000,
        );
        break;
      default:
        break;
    }
  }, [healthDiagnosticStep, router]);

  return (
    <>
      {healthDiagnosticStep >= 1 &&
        healthDiagnosticStep <= 4 &&
        !healthDashboardOpen && (
          <button
            type="button"
            className="zen-ui fixed bottom-24 right-6 z-[10001] px-6 py-3 rounded-full text-white text-sm font-semibold border-0 cursor-pointer shadow-lg transition-opacity hover:opacity-90"
            style={{ background: "var(--accent-color)" }}
            onClick={advanceHealthDiagnostic}
          >
            {healthDiagnosticStep === 4
              ? "Finish & see report"
              : "Next test →"}
          </button>
        )}

      {healthDashboardOpen && (
        <>
          <div
            className="fixed inset-0 z-[9999] bg-black/50 backdrop-blur-sm"
            role="presentation"
            aria-hidden
            onClick={() => setHealthDashboardOpen(false)}
          />
          <div
            id="health-dashboard"
            className="zen-ui fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-[400px] rounded-[20px] p-8 shadow-2xl z-[10000] text-center border border-card bg-card text-page"
            style={{ boxShadow: "0 20px 50px rgba(0,0,0,0.5)" }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="health-dashboard-title"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="absolute top-3 right-3 text-page/60 hover:text-page text-xl leading-none border-0 bg-transparent cursor-pointer"
              onClick={() => setHealthDashboardOpen(false)}
              aria-label="Close"
            >
              ✕
            </button>
            <h3
              id="health-dashboard-title"
              className="text-xl font-bold mt-0 mb-2 text-page"
            >
              Monitor Health Check
            </h3>
            <p className="text-sm text-page/70 mb-5">
              Follow the steps to certify your display (self-guided).
            </p>
            <ul className="text-left space-y-2 mb-6 list-none pl-0 m-0">
              {STEPS.map((label, i) => (
                <li key={label} className="text-sm text-page">
                  {healthDiagnosticComplete ? "✅" : "⚪"} {i + 1}. {label}
                </li>
              ))}
            </ul>
            {healthDiagnosticComplete && (
              <p className="text-sm text-page/80 mb-4 rounded-lg p-3 bg-page/5 border border-card text-left">
                All steps completed. Screenshot this summary if you like — this is a
                self-guided check, not a lab certification.
              </p>
            )}
            <button
              type="button"
              className="w-full py-4 rounded-[10px] border-0 text-white font-bold cursor-pointer text-base transition-opacity hover:opacity-90"
              style={{ background: "var(--accent-color)" }}
              onClick={() => {
                startHealthDiagnostic();
              }}
            >
              {healthDiagnosticComplete
                ? "Run again"
                : "Start full diagnostic"}
            </button>
          </div>
        </>
      )}
    </>
  );
}
