import { useEffect, useState } from "react";
import { useAppStore } from "@/lib/store";

// Check if Picture-in-Picture API is supported
export function isPiPSupported(): boolean {
  if (typeof document === "undefined") return false;
  return (
    "pictureInPictureEnabled" in document &&
    document.pictureInPictureEnabled !== false &&
    "requestPictureInPicture" in HTMLVideoElement.prototype
  );
}

export function usePiP() {
  const { isPiP, togglePiP } = useAppStore();
  const [pipSupported, setPipSupported] = useState(false);

  useEffect(() => {
    // Check PiP support
    const supported = isPiPSupported();
    setPipSupported(supported);

    if (!supported) {
      console.warn("Picture-in-Picture API is not supported in this browser");
      if (isPiP) {
        // Reset state if PiP was enabled but not supported
        togglePiP();
      }
      return;
    }

    const video = document.createElement("video");
    video.style.position = "fixed";
    video.style.top = "0";
    video.style.left = "0";
    video.style.width = "100%";
    video.style.height = "100%";
    video.style.objectFit = "cover";
    video.style.pointerEvents = "none";
    video.style.zIndex = "9999";
    video.muted = true;
    video.loop = true;
    video.playsInline = true;

    // Create a canvas to capture the screen
    const canvas = document.createElement("canvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    const updateVideo = () => {
      if (!ctx) return;
      
      // Capture the current screen state
      ctx.fillStyle = window.getComputedStyle(document.body).backgroundColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Convert canvas to video stream
      const stream = canvas.captureStream(60);
      video.srcObject = stream;
    };

    const handlePiP = async () => {
      if (isPiP && document.pictureInPictureElement === null) {
        try {
          await video.requestPictureInPicture();
          updateVideo();
        } catch (error) {
          console.error("Failed to enter PiP:", error);
          useAppStore.getState().togglePiP();
        }
      } else if (!isPiP && document.pictureInPictureElement) {
        try {
          await document.exitPictureInPicture();
        } catch (error) {
          console.error("Failed to exit PiP:", error);
        }
      }
    };

    if (isPiP) {
      document.body.appendChild(video);
      handlePiP();
    }

    const interval = setInterval(updateVideo, 1000 / 60); // 60fps

    return () => {
      clearInterval(interval);
      if (video.parentNode) {
        video.parentNode.removeChild(video);
      }
      if (document.pictureInPictureElement === video) {
        document.exitPictureInPicture().catch(console.error);
      }
    };
  }, [isPiP, togglePiP]);

  return { pipSupported };
}

