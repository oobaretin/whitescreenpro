"use client";

import { useAppStore } from "@/lib/store";

const BSOD_VERSIONS = {
  xp: {
    useImage: true,
    imageSrc: "/images/windows-xp-bsod.jpeg",
    bgColor: "#0000AA",
    textColor: "#FFFFFF",
    title: "",
    message: "",
    details: [],
  },
  "7": {
    useImage: true,
    imageSrc: "/images/windows-xp-bsod.jpeg",
    bgColor: "#0000AA",
    textColor: "#FFFFFF",
    title: "",
    message: "",
    details: [],
  },
  "10": {
    useImage: true,
    imageSrc: "/images/windows-10-bsod.jpeg",
    bgColor: "#0078D4",
    textColor: "#FFFFFF",
    title: "",
    message: "",
    details: [],
  },
  "11": {
    useImage: true,
    imageSrc: "/images/windows-10-bsod.jpeg",
    bgColor: "#0078D4",
    textColor: "#FFFFFF",
    title: "",
    message: "",
    details: [],
  },
};

export function BSOD() {
  const { bsod, activeMode } = useAppStore();

  if (activeMode !== "bsod") return null;

  const version = BSOD_VERSIONS[bsod.version] || BSOD_VERSIONS["11"];

  // For image-based BSOD (XP, 7, 10, 11)
  if (version.useImage && version.imageSrc) {
    // Use object-contain for XP and 7 to prevent text cutoff, object-cover for 10 and 11
    const imageClass = (bsod.version === "xp" || bsod.version === "7") 
      ? "w-full h-full object-contain" 
      : "w-full h-full object-cover";
    
    return (
      <div 
        className="absolute inset-0 overflow-auto" 
        style={{ 
          backgroundColor: version.bgColor,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          src={version.imageSrc}
          alt="Blue Screen of Death"
          className={imageClass}
          style={{
            maxWidth: "100%",
            maxHeight: "100%",
            width: "auto",
            height: "auto",
          }}
        />
        {/* Overlay custom message and code */}
        {(bsod.customMessage || bsod.customCode) && (
          <div 
            className="absolute bottom-4 left-4 right-4 p-3 sm:p-4 rounded"
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.7)",
              fontFamily: "Consolas, 'Courier New', monospace",
            }}
          >
            {bsod.customMessage && (
              <div className="text-white text-xs sm:text-sm mb-2">
                <span className="text-red-400 font-bold">Custom Error: </span>
                {bsod.customMessage}
              </div>
            )}
            {bsod.customCode && (
              <div className="text-white text-xs sm:text-sm">
                <span className="text-yellow-400 font-bold">Error Code: </span>
                {bsod.customCode}
              </div>
            )}
          </div>
        )}
      </div>
    );
  }

  // For Windows 10/11, show the text-based BSOD
  return (
    <div
      className="absolute inset-0 flex items-center justify-center p-4 sm:p-8 overflow-auto"
      style={{
        backgroundColor: version.bgColor,
        color: version.textColor,
        fontFamily: "Consolas, 'Courier New', monospace",
      }}
    >
      <div className="max-w-2xl text-center">
        <h1 className="text-xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">{version.title}</h1>
        <p className="text-sm sm:text-lg md:text-xl mb-4 sm:mb-8">{version.message}</p>
        <div className="text-left space-y-1 text-xs sm:text-sm md:text-base">
          {version.details.map((line, index) => (
            <div key={index}>{line || <br />}</div>
          ))}
        </div>
        {bsod.customMessage && (
          <div className="mt-4 sm:mt-6 text-left">
            <div className="font-bold text-sm sm:text-base">Custom Error:</div>
            <div className="text-xs sm:text-sm">{bsod.customMessage}</div>
          </div>
        )}
        {bsod.customCode && (
          <div className="mt-2 sm:mt-4 text-left">
            <div className="font-bold text-sm sm:text-base">Error Code:</div>
            <div className="text-xs sm:text-sm">{bsod.customCode}</div>
          </div>
        )}
      </div>
    </div>
  );
}

