"use client";

const LINE_WIDTHS = [85, 72, 90, 65, 78, 82, 70, 88, 75, 80, 68, 92];

export function SkeletonTerminal() {
  return (
    <div className="absolute inset-0 bg-gray-900 p-4 font-mono text-sm overflow-hidden rounded-xl">
      {LINE_WIDTHS.map((w, i) => (
        <div
          key={i}
          className="h-4 mb-2 rounded bg-gray-700/60 animate-pulse"
          style={{ width: `${w}%` }}
        />
      ))}
      <div className="h-4 rounded bg-green-900/40 w-1/3 animate-pulse mt-4" />
    </div>
  );
}
