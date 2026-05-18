"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type MouseEvent,
  type PointerEvent,
  type ReactNode,
  type TouchEvent,
  type WheelEvent,
} from "react";
import { createPortal } from "react-dom";
import { Lock, Unlock } from "lucide-react";

/** Above ⚙️ / context-help chrome (~10k); below typical modal dialogs if you stack any >12k */
const OVERLAY_Z = 11_020;
const BUTTON_Z = OVERLAY_Z + 10;

/** One-time onboarding copy after the first-ever lock session on this browser. */
const LOCK_FIRST_CONTEXT_LS = "whitescreentools-lock-controls-first-context";

function prefersReducedMotionNow(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function vibrationPulse(): void {
  if (typeof navigator === "undefined" || typeof navigator.vibrate !== "function")
    return;
  if (prefersReducedMotionNow()) return;
  try {
    navigator.vibrate(12);
  } catch {
    /* noop */
  }
}

function joinClass(...parts: Array<string | undefined | false>) {
  return parts.filter(Boolean).join(" ");
}

function useMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}

/**
 * `@media (pointer: coarse)` — primary pointing device is touch.
 * SSR / first paint: `null` (avoid hydration mismatch).
 */
function useCoarsePrimaryPointer(): boolean | null {
  const [coarse, setCoarse] = useState<boolean | null>(null);
  useEffect(() => {
    const mq = window.matchMedia("(pointer: coarse)");
    const sync = () => setCoarse(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);
  return coarse;
}

export type LockScreenControlsPosition = "bottom-center" | "top-right";

export type LockScreenControlsProps = {
  /** Controlled lock state — keep in tool-level state/parent. */
  isLocked: boolean;
  onLockedChange: (locked: boolean) => void;
  /** Tool chrome (sliders, side panels, text) wrapped here — fades / drops pointer-events when locked. */
  children: ReactNode;
  position?: LockScreenControlsPosition;
  /** Optional toast (e.g. `useAppStore((s) => s.showToast)`). */
  onToast?: (message: string, duration?: number) => void;
};

/**
 * Reusable lock layer for tracing / cleaning / unattended timers:
 * full-viewport **`pointer-events` overlay**, subtle unlock control with touch failsafes,
 * **Escape** unlock, **`touch-action: none`** + **`overscroll-behavior: contain`** during lock.
 *
 * Wrap only the configurable UI chrome; leave your full-bleed color/lamp layer **outside/sibling**.
 *
 * ```tsx
 * const [locked, setLocked] = useState(false);
 * const showToast = useAppStore((s) => s.showToast);
 * return (
 *   <div className="relative h-screen w-screen">
 *     <FullscreenColorLayer /> // not wrapped — stays visible
 *     <LockScreenControls isLocked={locked} onLockedChange={setLocked} onToast={showToast}>
 *       <PanelsAndSliders />
 *     </LockScreenControls>
 *   </div>
 * );
 * ```
 */
export function LockScreenControls({
  isLocked,
  onLockedChange,
  children,
  position = "bottom-center",
  onToast,
}: LockScreenControlsProps) {
  const mounted = useMounted();
  const coarsePrimary = useCoarsePrimaryPointer();
  const toast = onToast ?? (() => {});
  const [fineHoverPeek, setFineHoverPeek] = useState(false);

  const statusId = useId();
  const longPressTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const finePeekTimerRef = useRef<number | null>(null);
  const lastTapRef = useRef(0);
  const lockToastEmittedRef = useRef(false);
  const touchGestureHintShownRef = useRef(false);
  const focusBeforeLockRef = useRef<HTMLElement | null>(null);

  /** After mount: touch-primary devices require double-tap OR long-press on the unlock pill. */
  const needsTouchUnlockGesture =
    mounted && coarsePrimary === true ? true : false;

  /** Block document scroll / pull-to-refresh bleed while locked. */
  useEffect(() => {
    if (!isLocked || !mounted) return;
    const prevOverflow = document.body.style.overflow;
    const prevTouchAction = document.body.style.touchAction;
    const prevOverscroll = document.documentElement.style.overscrollBehavior;
    document.body.style.overflow = "hidden";
    document.body.style.touchAction = "none";
    document.documentElement.style.overscrollBehavior = "none";
    return () => {
      document.body.style.overflow = prevOverflow;
      document.body.style.touchAction = prevTouchAction;
      document.documentElement.style.overscrollBehavior = prevOverscroll;
    };
  }, [isLocked, mounted]);

  /** Lock confirmation + optional one-time onboarding (stable across Strict Mode double-invoke). */
  useEffect(() => {
    if (!isLocked) {
      lockToastEmittedRef.current = false;
      touchGestureHintShownRef.current = false;
      return;
    }
    if (!mounted || lockToastEmittedRef.current) return;

    lockToastEmittedRef.current = true;
    touchGestureHintShownRef.current = false;

    const touchPrimary =
      typeof window !== "undefined" &&
      window.matchMedia("(pointer: coarse)").matches;

    if (touchPrimary) {
      toast(
        "Controls locked · Double-tap or long-press Unlock · Esc exits too",
        2800
      );
    } else {
      toast("Controls locked · Esc or click Unlock to restore", 2200);
    }

    vibrationPulse();

    try {
      if (
        typeof localStorage !== "undefined" &&
        !localStorage.getItem(LOCK_FIRST_CONTEXT_LS)
      ) {
        localStorage.setItem(LOCK_FIRST_CONTEXT_LS, "1");
        const followUp = touchPrimary
          ? "While locked, Unlock stays faint on purpose—easier tracing and cleaning."
          : "Hover the Unlock control for a moment—it brightens so you can find it.";
        const delayMs = prefersReducedMotionNow() ? 0 : 450;
        window.setTimeout(() => toast(followUp, 4200), delayMs);
      }
    } catch {
      /* private mode / quota */
    }
  }, [isLocked, mounted, toast]);

  const clearFinePeekDelay = useCallback(() => {
    if (finePeekTimerRef.current != null) {
      clearTimeout(finePeekTimerRef.current);
      finePeekTimerRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (!isLocked) {
      clearFinePeekDelay();
      setFineHoverPeek(false);
    }
    return () => clearFinePeekDelay();
  }, [isLocked, clearFinePeekDelay]);

  const clearLongPress = useCallback(() => {
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = null;
    }
  }, []);

  const unlockNow = useCallback(() => {
    clearLongPress();
    onLockedChange(false);
    toast("Controls unlocked", 1400);
    queueMicrotask(() => {
      const el = focusBeforeLockRef.current;
      focusBeforeLockRef.current = null;
      if (el?.isConnected) {
        try {
          el.focus({ preventScroll: true });
        } catch {
          /* inactive document / browser quirk */
        }
      }
    });
  }, [clearLongPress, onLockedChange, toast]);

  useEffect(() => {
    if (!isLocked) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        unlockNow();
      }
    };
    window.addEventListener("keydown", onKey, { capture: true });
    return () => window.removeEventListener("keydown", onKey, { capture: true });
  }, [isLocked, unlockNow]);

  const handleLockToggle = () => {
    if (isLocked) return;
    const ae = document.activeElement;
    if (
      ae instanceof HTMLElement &&
      !ae.closest("[data-lock-screen-fab='true']")
    ) {
      focusBeforeLockRef.current = ae;
    } else {
      focusBeforeLockRef.current = null;
    }
    onLockedChange(true);
  };

  /** Fine pointer / mouse: immediate unlock via click when locked. */
  const handleUnlockClick = (e: MouseEvent) => {
    e.stopPropagation();
    if (!needsTouchUnlockGesture) {
      unlockNow();
    }
    // Touch-primary: click handled separately via gesture logic.
  };

  const handleUnlockPointerDown = (e: PointerEvent) => {
    if (!isLocked || !needsTouchUnlockGesture) return;
    if (e.pointerType === "touch") {
      clearLongPress();
      longPressTimerRef.current = setTimeout(() => {
        unlockNow();
      }, 650);
    }
  };

  const handleUnlockPointerUp = (
    e: PointerEvent<HTMLButtonElement>
  ) => {
    if (!isLocked) return;

    /** Double-tap (touch) fallback */
    if (needsTouchUnlockGesture && e.pointerType === "touch") {
      clearLongPress();
      const now = Date.now();
      if (now - lastTapRef.current < 380) {
        lastTapRef.current = 0;
        unlockNow();
      } else {
        lastTapRef.current = now;
        if (!touchGestureHintShownRef.current) {
          touchGestureHintShownRef.current = true;
          toast(
            "Tap Unlock twice quickly—or press and hold—to finish unlocking",
            2400
          );
        }
      }
      return;
    }

    if (e.pointerType === "touch") {
      clearLongPress();
    }
  };

  const handleUnlockPointerCancel = () => {
    clearLongPress();
  };

  const bubbleBlock = useCallback((e: MouseEvent | TouchEvent) => {
    e.stopPropagation();
  }, []);

  const overlayPrevent = useCallback((e: TouchEvent | WheelEvent) => {
    e.preventDefault();
  }, []);

  const positionFab = joinClass(
    "fixed motion-safe:transition-opacity motion-safe:duration-300 motion-safe:ease-out motion-reduce:transition-none",
    position === "bottom-center"
      ? "bottom-[max(1rem,env(safe-area-inset-bottom,0px))] left-1/2 -translate-x-1/2"
      : "top-[max(1rem,env(safe-area-inset-top,0px))] right-[max(1rem,env(safe-area-inset-right,0px))]",
    isLocked
      ? needsTouchUnlockGesture
        ? "opacity-[0.58] hover:opacity-100 sm:opacity-[0.5]"
        : joinClass(
            "opacity-90 sm:opacity-20",
            fineHoverPeek ? "sm:opacity-100" : ""
          )
      : "opacity-100 hover:opacity-95"
  );

  const handleFabWrapperPointerEnter = (e: PointerEvent<HTMLDivElement>) => {
    if (!isLocked || needsTouchUnlockGesture || e.pointerType !== "mouse")
      return;
    clearFinePeekDelay();
    const delayMs = prefersReducedMotionNow() ? 0 : 220;
    finePeekTimerRef.current = window.setTimeout(
      () => setFineHoverPeek(true),
      delayMs
    );
  };

  const handleFabWrapperPointerLeave = () => {
    clearFinePeekDelay();
    setFineHoverPeek(false);
  };

  const overlay =
    mounted && isLocked ? (
      <div
        aria-hidden
        className="motion-safe:transition-opacity motion-safe:duration-300 motion-safe:ease-out motion-reduce:transition-none fixed inset-0 bg-transparent"
        style={{
          zIndex: OVERLAY_Z,
          touchAction: "none",
          overscrollBehavior: "none",
          WebkitUserSelect: "none",
          userSelect: "none",
        }}
        // Block interaction with panels below
        onClick={bubbleBlock}
        onTouchStart={(e) => {
          bubbleBlock(e);
          overlayPrevent(e);
        }}
        onTouchMove={overlayPrevent}
        onWheel={overlayPrevent}
      />
    ) : null;

  const floatingButton = mounted ? (
    <div
      className={positionFab}
      style={{ zIndex: BUTTON_Z }}
      onPointerEnter={handleFabWrapperPointerEnter}
      onPointerLeave={handleFabWrapperPointerLeave}
    >
      <button
        type="button"
        aria-pressed={isLocked}
        data-lock-screen-fab="true"
        className={joinClass(
          "motion-safe:transition-[transform,opacity,background-color,color] motion-safe:duration-300 motion-safe:ease-out motion-reduce:!transform-none motion-reduce:transition-none",
          /** WCAG 2.5.5 target — keep visual calm while enlarging hit area */
          "pointer-events-auto flex min-h-11 min-w-11 items-center justify-center gap-2 rounded-full border px-4 py-3 shadow-lg backdrop-blur-sm sm:min-w-0",
          "border-card bg-card/90 text-page text-sm font-medium outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent-color)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--card-bg)]",
          isLocked
            ? "motion-safe:md:scale-[0.94] motion-safe:hover:scale-100 motion-safe:md:shadow-md"
            : "hover:bg-card"
        )}
        title={
          isLocked
            ? needsTouchUnlockGesture
              ? "Double-tap or long-press Unlock — Esc also unlocks"
              : "Unlock controls — Esc also works; hover briefly to reveal"
            : "Lock panels & controls for tracing"
        }
        /**
         * Coarse-pointer when locked:
         * - **Long-press ~650ms** to unlock on touch pointers.
         * - **Double-tap within ~380ms** to unlock when long-press is awkward.
         * Fine pointer (mouse/trackpad): **single click**.
         */
        onClick={(e) => {
          if (isLocked) {
            handleUnlockClick(e);
            return;
          }
          handleLockToggle();
        }}
        onPointerDown={handleUnlockPointerDown}
        onPointerUp={handleUnlockPointerUp}
        onPointerCancel={handleUnlockPointerCancel}
      >
        {isLocked ? (
          <>
            <Unlock className="h-5 w-5 shrink-0" aria-hidden strokeWidth={2} />
            <span className="hidden sm:inline">Unlock</span>
            {needsTouchUnlockGesture ? (
              <span className="max-w-[8.5rem] text-left text-[10px] leading-tight opacity-85 sm:hidden">
                Long-press · or double tap
              </span>
            ) : null}
          </>
        ) : (
          <>
            <Lock className="h-5 w-5 shrink-0" aria-hidden strokeWidth={2} />
            <span className="hidden sm:inline">Lock controls</span>
          </>
        )}
      </button>
    </div>
  ) : null;

  return (
    <>
      <div
        id={statusId}
        aria-live="polite"
        className="sr-only">
        {isLocked
          ? needsTouchUnlockGesture === true
            ? "Interface locked. Press Escape to unlock. On touch, double-tap or long-press the Unlock control."
            : needsTouchUnlockGesture === false
              ? "Interface locked. Press Escape or activate Unlock to restore controls. Hover Unlock briefly to brighten it."
              : "Interface locked. Press Escape to unlock."
          : ""}
      </div>

      <div
        className={joinClass(
          "motion-safe:transition-opacity motion-safe:duration-300 motion-safe:ease-in-out motion-reduce:transition-none",
          isLocked ? "pointer-events-none select-none opacity-0" : "opacity-100"
        )}
      >
        {children}
      </div>

      {mounted &&
        createPortal(
          <>
            {overlay}
            {floatingButton}
          </>,
          document.body
        )}
    </>
  );
}
