"use strict";

import React, { useState } from 'react';
import { Info, Gauge, Box } from 'lucide-react';

export function ComplexityPanel({ 
  timeComplexity = "O(1)", 
  spaceComplexity = "O(1)", 
  timeExplanation = "Constant time.",
  spaceExplanation = "Constant space.",
  theme = "dark",
  accentColor = "#6366f1"
}) {
  const isDark = theme === "dark";
  const [hovered, setHovered] = useState(null); // 'time' or 'space'

  return (
    <div className="absolute bottom-4 left-4 z-20 flex flex-col gap-2">
      
      {/* Tooltip Overlay */}
      <div 
        className={`transition-all duration-300 ease-in-out transform origin-bottom-left max-w-xs p-3 rounded-xl border shadow-xl backdrop-blur-xl ${hovered ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-2 pointer-events-none"}`}
        style={{
          background: isDark ? "rgba(15, 23, 42, 0.9)" : "rgba(255, 255, 255, 0.95)",
          borderColor: isDark ? "rgba(30, 41, 59, 0.9)" : "rgba(226, 232, 240, 0.9)",
        }}
      >
        <div className="flex items-center gap-1.5 mb-1.5">
          <Info size={12} style={{ color: accentColor }} />
          <span className="text-[11px] font-bold" style={{ color: isDark ? "#f1f5f9" : "#0f172a" }}>
            Why {hovered === 'time' ? timeComplexity : spaceComplexity}?
          </span>
        </div>
        <p className="text-[10px] leading-relaxed" style={{ color: isDark ? "#94a3b8" : "#475569" }}>
          {hovered === 'time' ? timeExplanation : spaceExplanation}
        </p>
      </div>

      {/* Main Panel */}
      <div 
        className="flex gap-1.5 p-1.5 rounded-xl border shadow-lg backdrop-blur-md w-fit"
        style={{ 
          background: isDark ? "rgba(15, 23, 42, 0.75)" : "rgba(255, 255, 255, 0.8)",
          borderColor: isDark ? "rgba(30, 41, 59, 0.8)" : "rgba(226, 232, 240, 0.8)",
        }}
      >
        {/* Time Complexity Pill */}
        <div 
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg cursor-help transition-colors"
          style={{ 
            background: hovered === 'time' ? (isDark ? "rgba(99, 102, 241, 0.15)" : "rgba(99, 102, 241, 0.1)") : "transparent"
          }}
          onMouseEnter={() => setHovered('time')}
          onMouseLeave={() => setHovered(null)}
        >
          <Gauge size={12} className="text-indigo-400" />
          <span className="text-[10px]" style={{ color: isDark ? "#94a3b8" : "#64748b" }}>Time:</span>
          <span className="text-[11px] font-mono font-bold text-indigo-400">{timeComplexity}</span>
        </div>

        <div className="w-[1px] bg-slate-700/50 my-1"></div>

        {/* Space Complexity Pill */}
        <div 
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg cursor-help transition-colors"
          style={{ 
            background: hovered === 'space' ? (isDark ? "rgba(16, 185, 129, 0.15)" : "rgba(16, 185, 129, 0.1)") : "transparent"
          }}
          onMouseEnter={() => setHovered('space')}
          onMouseLeave={() => setHovered(null)}
        >
          <Box size={12} className="text-emerald-400" />
          <span className="text-[10px]" style={{ color: isDark ? "#94a3b8" : "#64748b" }}>Space:</span>
          <span className="text-[11px] font-mono font-bold text-emerald-400">{spaceComplexity}</span>
        </div>
      </div>

    </div>
  );
}
