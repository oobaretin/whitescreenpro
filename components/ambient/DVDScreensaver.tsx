"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import { useAppStore } from "@/lib/store";

export function DVDScreensaver() {
  const { dvd, activeMode } = useAppStore();
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [velocity, setVelocity] = useState({ x: dvd.speed, y: dvd.speed });
  const [colorIndex, setColorIndex] = useState(0);
  const [isFlashing, setIsFlashing] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number>();

  const colors = useMemo(
    () => [
      "hue-rotate(0deg)",      // Original red
      "hue-rotate(120deg)",    // Green
      "hue-rotate(240deg)",    // Blue
      "hue-rotate(60deg)",     // Yellow
      "hue-rotate(180deg)",    // Cyan
      "hue-rotate(300deg)",    // Magenta
      "hue-rotate(30deg)",     // Orange
      "hue-rotate(270deg)",    // Purple
    ],
    []
  );

  // Flash effect on color change
  const triggerFlash = () => {
    setIsFlashing(true);
    setTimeout(() => setIsFlashing(false), 150);
  };

  useEffect(() => {
    if (activeMode !== "dvd-screensaver") return;

    const animate = () => {
      setPosition((prev) => {
        let newX = prev.x + velocity.x;
        let newY = prev.y + velocity.y;
        let newVx = velocity.x;
        let newVy = velocity.y;

        const logoWidth = dvd.logoSize;
        const logoHeight = dvd.logoSize * 0.6;

        const containerWidth = containerRef.current?.parentElement?.clientWidth || window.innerWidth;
        const containerHeight = containerRef.current?.parentElement?.clientHeight || window.innerHeight;

        // Calculate if logo is at or past edges
        const hitLeft = newX <= 0;
        const hitRight = newX >= containerWidth - logoWidth;
        const hitTop = newY <= 0;
        const hitBottom = newY >= containerHeight - logoHeight;

        // Clamp position to ensure logo fully touches edges/corners
        if (hitLeft) {
          newX = 0;
        } else if (hitRight) {
          newX = containerWidth - logoWidth;
        }
        
        if (hitTop) {
          newY = 0;
        } else if (hitBottom) {
          newY = containerHeight - logoHeight;
        }

        // Detect if logo is at a corner (touching both x and y edges simultaneously)
        // Use small threshold for floating point precision
        const threshold = 0.5;
        const atTopLeft = Math.abs(newX - 0) < threshold && Math.abs(newY - 0) < threshold;
        const atTopRight = Math.abs(newX - (containerWidth - logoWidth)) < threshold && Math.abs(newY - 0) < threshold;
        const atBottomLeft = Math.abs(newX - 0) < threshold && Math.abs(newY - (containerHeight - logoHeight)) < threshold;
        const atBottomRight = Math.abs(newX - (containerWidth - logoWidth)) < threshold && Math.abs(newY - (containerHeight - logoHeight)) < threshold;
        const atCorner = atTopLeft || atTopRight || atBottomLeft || atBottomRight;

        // Bounce on wall hits, but prioritize corner detection
        if (hitLeft || hitRight) {
          newVx = -newVx;
        }
        
        if (hitTop || hitBottom) {
          newVy = -newVy;
        }

        // Change color when fully touching a corner
        if (atCorner) {
          setColorIndex((prev) => (prev + 1) % colors.length);
          triggerFlash();
        }

        setVelocity({ x: newVx, y: newVy });
        return {
          x: newX,
          y: newY,
        };
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [activeMode, velocity, dvd.logoSize, colors.length]);

  useEffect(() => {
    setVelocity({ x: dvd.speed, y: dvd.speed });
  }, [dvd.speed]);

  // Get logo source based on logo type
  const getLogoSrc = () => {
    switch (dvd.logoType) {
      case "dvd":
        return "/images/dvd-logo.png";
      case "bluray":
        return "/images/bluray.png";
      case "custom":
        return null; // Custom uses text, not image
      default:
        return "/images/dvd-logo.png";
    }
  };

  const logoSrc = getLogoSrc();

  if (activeMode !== "dvd-screensaver") return null;

  return (
    <div ref={containerRef} className="absolute inset-0 bg-black overflow-hidden">
      {/* Bouncing Logo */}
      <div
        className="absolute"
        style={{
          left: position.x,
          top: position.y,
          width: dvd.logoSize,
          height: dvd.logoSize * 0.6,
          transition: isFlashing ? "transform 0.15s ease-out" : "none",
          transform: isFlashing ? "scale(1.15)" : "scale(1)",
        }}
      >
        {dvd.logoType === "custom" ? (
          // Custom text logo
          <div
            className="w-full h-full flex items-center justify-center text-white font-bold"
            style={{
              filter: `${colors[colorIndex]} ${isFlashing ? "brightness(1.5) drop-shadow(0 0 20px white)" : "drop-shadow(0 0 10px rgba(255,255,255,0.3))"}`,
              transition: "filter 0.3s ease-out",
              fontSize: `${dvd.logoSize * 0.15}px`,
              fontFamily: dvd.customFont,
            }}
          >
            {dvd.customLogo || "CUSTOM"}
          </div>
        ) : logoSrc ? (
          // Image logo (DVD, CD, Blu-ray)
          <img
            src={logoSrc}
            alt={dvd.logoType.toUpperCase()}
            className="w-full h-full object-contain"
            style={{
              filter: `${colors[colorIndex]} ${isFlashing ? "brightness(1.5) drop-shadow(0 0 20px white)" : "drop-shadow(0 0 10px rgba(255,255,255,0.3))"}`,
              transition: "filter 0.3s ease-out",
            }}
          />
        ) : null}
      </div>

    </div>
  );
}
