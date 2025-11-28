"use client";

import { useAppStore } from "@/lib/store";
import { useState } from "react";

export function TipScreen() {
  const { tipScreen, setTipScreen } = useAppStore();
  const [customTipInput, setCustomTipInput] = useState("");

  const calculateTip = (percent: number | null, custom?: number) => {
    const base = tipScreen.baseAmount || 0;
    const tipAmount = custom !== undefined ? custom : (base * (percent || 0)) / 100;
    const total = base + tipAmount;
    return { tipAmount, total };
  };

  const handleTipPercent = (percent: number) => {
    setTipScreen({ tipPercent: percent, customTip: null });
  };

  const handleCustomTip = () => {
    const custom = parseFloat(customTipInput);
    if (!isNaN(custom) && custom >= 0) {
      setTipScreen({ customTip: custom, tipPercent: null });
    }
  };

  const handleNumberPad = (num: string) => {
    const current = tipScreen.baseAmount.toString();
    if (num === "." && current.includes(".")) return;
    const newValue = current === "0" && num !== "." ? num : current + num;
    setTipScreen({ baseAmount: parseFloat(newValue) || 0 });
  };

  const handleBackspace = () => {
    const current = tipScreen.baseAmount.toString();
    const newValue = current.slice(0, -1) || "0";
    setTipScreen({ baseAmount: parseFloat(newValue) || 0 });
  };

  const handleClear = () => {
    setTipScreen({ baseAmount: 0, tipPercent: null, customTip: null });
  };

  const { tipAmount, total } = calculateTip(
    tipScreen.tipPercent,
    tipScreen.customTip ?? undefined
  );

  if (tipScreen.showThankYou) {
    return (
      <div className="h-full w-full bg-gradient-to-b from-green-600 to-green-800 flex items-center justify-center">
        <div className="text-center text-white">
          <div className="text-8xl mb-6">🎉</div>
          <h3 className="text-5xl font-bold mb-4">Thank You!</h3>
          <p className="text-2xl opacity-90 mb-4">
            Tip: ${tipAmount.toFixed(2)}
          </p>
          <p className="text-3xl font-semibold mb-8">
            Total: ${total.toFixed(2)}
          </p>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setTipScreen({ showThankYou: false, baseAmount: 0, tipPercent: null, customTip: null });
            }}
            className="px-10 py-4 bg-white text-green-700 text-xl font-bold rounded-full shadow-lg hover:bg-gray-100 transition-colors"
          >
            New Transaction
          </button>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="absolute inset-0 bg-gradient-to-b from-slate-800 to-slate-900 flex flex-col"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Display Screen */}
      <div className="bg-slate-950 p-3 border-b-4 border-slate-700 flex-shrink-0">
        {tipScreen.serviceDescription && (
          <div className="text-slate-400 text-xs mb-1 truncate">
            {tipScreen.serviceDescription}
          </div>
        )}
        <div className="text-right">
          <div className="text-slate-400 text-xs">Amount</div>
          <div className="text-4xl font-mono text-green-400 tracking-wider">
            ${tipScreen.baseAmount.toFixed(2)}
          </div>
        </div>
        {(tipScreen.tipPercent || tipScreen.customTip) && (
          <div className="mt-1.5 pt-1.5 border-t border-slate-700 flex justify-between items-center">
            <div>
              <span className="text-slate-400 text-xs">Tip </span>
              <span className="text-yellow-400 font-semibold text-sm">
                {tipScreen.tipPercent ? `${tipScreen.tipPercent}%` : `$${tipScreen.customTip?.toFixed(2)}`}
              </span>
            </div>
            <div className="text-right">
              <div className="text-slate-400 text-xs">TOTAL</div>
              <div className="text-2xl font-mono text-white">
                ${total.toFixed(2)}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Calculator Body */}
      <div className="flex-1 p-2.5 flex flex-col gap-1.5 min-h-0">
        {/* Tip Percentage Buttons */}
        <div className="grid grid-cols-4 gap-1.5 flex-shrink-0">
          {[15, 18, 20, 25].map((percent) => (
            <button
              key={percent}
              onClick={() => handleTipPercent(percent)}
              className={`py-2 rounded-lg text-base font-bold transition-all transform active:scale-95 ${
                tipScreen.tipPercent === percent
                  ? "bg-green-500 text-white shadow-lg shadow-green-500/30"
                  : "bg-slate-700 text-slate-200 hover:bg-slate-600"
              }`}
            >
              {percent}%
            </button>
          ))}
        </div>

        {/* Number Pad */}
        <div className="grid grid-cols-3 gap-1.5 flex-1 min-h-0">
          {["1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "0", "⌫"].map((key) => (
            <button
              key={key}
              onClick={() => key === "⌫" ? handleBackspace() : handleNumberPad(key)}
              className="bg-slate-700 hover:bg-slate-600 text-white text-lg font-semibold rounded-lg transition-all transform active:scale-95 py-2"
            >
              {key}
            </button>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-1.5 flex-shrink-0">
          <button
            onClick={handleClear}
            className="py-2 bg-red-600 hover:bg-red-500 text-white text-sm font-bold rounded-lg transition-all transform active:scale-95"
          >
            Clear
          </button>
          <button
            onClick={() => setTipScreen({ tipPercent: 0, customTip: 0 })}
            className="py-2 bg-slate-600 hover:bg-slate-500 text-white text-sm font-bold rounded-lg transition-all transform active:scale-95"
          >
            No Tip
          </button>
        </div>

        {/* Confirm Button */}
        <button
          onClick={() => tipScreen.baseAmount > 0 && setTipScreen({ showThankYou: true })}
          disabled={tipScreen.baseAmount === 0}
          className="py-3 bg-green-600 hover:bg-green-500 disabled:bg-slate-700 disabled:text-slate-500 text-white text-lg font-bold rounded-lg transition-all transform active:scale-95 disabled:transform-none shadow-lg shadow-green-600/30 disabled:shadow-none flex-shrink-0"
        >
          {tipScreen.baseAmount > 0 
            ? `Pay $${total.toFixed(2)}` 
            : "Enter Amount"}
        </button>
      </div>
    </div>
  );
}
