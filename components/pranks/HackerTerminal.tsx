"use client";

import { useEffect, useState, useRef } from "react";
import { useAppStore } from "@/lib/store";

const COMMANDS = [
  "Initializing system breach...",
  "Bypassing firewall...",
  "Accessing mainframe...",
  "Decrypting password database...",
  "Extracting sensitive data...",
  "Uploading payload...",
  "Establishing backdoor...",
  "System compromised successfully.",
];

export function HackerTerminal() {
  const { activeMode } = useAppStore();
  const [lines, setLines] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState("");
  const [commandIndex, setCommandIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (activeMode !== "hacker-terminal") {
      setLines([]);
      setCurrentLine("");
      setCommandIndex(0);
      setCharIndex(0);
      return;
    }

    const command = COMMANDS[commandIndex] || COMMANDS[0];
    
    if (charIndex < command.length) {
      intervalRef.current = setTimeout(() => {
        setCurrentLine(command.substring(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      }, 50);
    } else {
      setTimeout(() => {
        setLines((prev) => [...prev, currentLine]);
        setCurrentLine("");
        setCharIndex(0);
        setCommandIndex((prev) => (prev + 1) % COMMANDS.length);
      }, 1000);
    }

    return () => {
      if (intervalRef.current) {
        clearTimeout(intervalRef.current);
      }
    };
  }, [activeMode, commandIndex, charIndex, currentLine]);

  if (activeMode !== "hacker-terminal") return null;

  return (
    <div className="absolute inset-0 bg-black text-green-500 font-mono p-4 sm:p-8 overflow-auto">
      <div className="max-w-4xl mx-auto text-sm sm:text-base">
        <div className="mb-4">
          <div className="text-green-400">root@hacker:~$</div>
        </div>
        {lines.map((line, index) => (
          <div key={index} className="mb-2">
            {line}
          </div>
        ))}
        {currentLine && (
          <div className="mb-2">
            {currentLine}
            <span className="animate-pulse">_</span>
          </div>
        )}
      </div>
    </div>
  );
}

