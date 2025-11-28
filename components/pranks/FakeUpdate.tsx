"use client";

import { useEffect, useState } from "react";
import { useAppStore } from "@/lib/store";

export function FakeUpdate() {
  const { fakeUpdate, activeMode } = useAppStore();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (activeMode !== "fake-update" || fakeUpdate.frozen) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 100;
        return prev + Math.random() * 2;
      });
    }, 500);

    return () => clearInterval(interval);
  }, [activeMode, fakeUpdate.frozen]);

  if (activeMode !== "fake-update") return null;

  const getUpdateScreen = () => {
    switch (fakeUpdate.type) {
      case "windows":
        return (
          <div 
            className="absolute inset-0 flex items-center justify-center"
            style={{
              background: "linear-gradient(180deg, #5BA3E0 0%, #A7C7DC 50%, #87CEEB 100%)",
            }}
          >
            <div className="text-center">
              {/* Windows 95 Logo */}
              <img
                src="/images/windows-95-logo.jpeg"
                alt="Windows 95"
                className="mx-auto mb-8 w-80 h-auto object-contain"
              />
              
              {/* Loading Text */}
              <p className="text-xl text-gray-800 font-bold mb-6">
                Please wait while Windows is starting up...
              </p>
              
              {/* Classic Windows 95 Loading Animation */}
              <div className="flex justify-center items-center gap-2 mb-4">
                <div className="flex gap-1">
                  {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
                    <div
                      key={i}
                      className="w-4 h-4 rounded-sm"
                      style={{
                        backgroundColor: i === 0 ? "#FF0000" : i === 1 ? "#FF0000" : 
                                        i === 2 ? "#00FF00" : i === 3 ? "#00FF00" :
                                        i === 4 ? "#0000FF" : i === 5 ? "#0000FF" :
                                        i === 6 ? "#FFFF00" : "#FFFF00",
                        animation: `win95pulse 1.5s ease-in-out infinite`,
                        animationDelay: `${i * 0.15}s`,
                      }}
                    />
                  ))}
                </div>
              </div>
              
              {/* Progress */}
              <p className="text-gray-700 mt-4">{Math.round(Math.min(progress, 100))}% complete</p>
            </div>
            
            {/* CSS Animations */}
            <style jsx>{`
              @keyframes win95pulse {
                0%, 100% {
                  opacity: 0.3;
                  transform: scale(0.8);
                }
                50% {
                  opacity: 1;
                  transform: scale(1);
                }
              }
              
            `}</style>
          </div>
        );
      case "macos":
        return (
          <div className="absolute inset-0 bg-black flex items-center justify-center overflow-hidden">
            {/* Subtle gradient background */}
            <div 
              className="absolute inset-0"
              style={{
                background: "radial-gradient(ellipse at center, #1a1a1a 0%, #000000 100%)",
              }}
            />
            
            <div className="relative text-center z-10">
              {/* Apple Logo - using SVG for clean rendering */}
              <div className="relative mb-12 animate-macPulse">
                <svg
                  className="w-20 h-20 mx-auto text-white"
                  viewBox="0 0 384 512"
                  fill="currentColor"
                  style={{
                    filter: "drop-shadow(0 0 30px rgba(255,255,255,0.5))",
                  }}
                >
                  <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/>
                </svg>
              </div>
              
              {/* Progress Bar Container */}
              <div className="w-64 mx-auto mb-4">
                {/* Progress bar background */}
                <div className="relative w-full h-1.5 bg-gray-700 rounded-full overflow-hidden">
                  {/* Animated progress fill */}
                  <div
                    className="absolute h-full bg-white rounded-full transition-all duration-300"
                    style={{ width: `${Math.min(progress, 100)}%` }}
                  />
                  {/* Shimmer effect on progress bar */}
                  <div 
                    className="absolute inset-0 animate-macShimmer"
                    style={{
                      background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
                      width: "50%",
                    }}
                  />
                </div>
              </div>
              
              {/* Time remaining text */}
              <p className="text-gray-400 text-sm animate-macFade">
                {progress < 30 ? "Starting update..." : 
                 progress < 60 ? "Installing..." : 
                 progress < 90 ? "Almost done..." : 
                 "Finishing up..."}
              </p>
              
              {/* Spinning dots animation */}
              <div className="flex justify-center gap-1 mt-6">
                {[0, 1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-1.5 h-1.5 bg-gray-500 rounded-full"
                    style={{
                      animation: "macDots 1.4s ease-in-out infinite",
                      animationDelay: `${i * 0.16}s`,
                    }}
                  />
                ))}
              </div>
            </div>
            
            {/* CSS Animations for macOS */}
            <style jsx>{`
              @keyframes macPulse {
                0%, 100% {
                  opacity: 0.9;
                  transform: scale(1);
                }
                50% {
                  opacity: 1;
                  transform: scale(1.02);
                }
              }
              
              @keyframes macGlow {
                0%, 100% {
                  opacity: 0.3;
                  transform: scale(1);
                }
                50% {
                  opacity: 0.6;
                  transform: scale(1.1);
                }
              }
              
              @keyframes macShimmer {
                0% {
                  left: -50%;
                }
                100% {
                  left: 150%;
                }
              }
              
              @keyframes macFade {
                0%, 100% {
                  opacity: 0.7;
                }
                50% {
                  opacity: 1;
                }
              }
              
              @keyframes macDots {
                0%, 80%, 100% {
                  opacity: 0.3;
                  transform: scale(0.8);
                }
                40% {
                  opacity: 1;
                  transform: scale(1.2);
                }
              }
              
              .animate-macPulse {
                animation: macPulse 3s ease-in-out infinite;
              }
              
              .animate-macGlow {
                animation: macGlow 3s ease-in-out infinite;
              }
              
              .animate-macShimmer {
                animation: macShimmer 2s ease-in-out infinite;
              }
              
              .animate-macFade {
                animation: macFade 2s ease-in-out infinite;
              }
            `}</style>
          </div>
        );
      default:
        return null;
    }
  };

  return getUpdateScreen();
}
