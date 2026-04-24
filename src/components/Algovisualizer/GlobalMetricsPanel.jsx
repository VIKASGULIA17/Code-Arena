"use strict";

import React from 'react';
import { Clock } from 'lucide-react';

export function GlobalMetricsPanel({ metrics = [], timeMs = 0, theme = "dark", stepDescription = "", className = "" }) {
  const isDark = theme === "dark";
  
  // Format ms to seconds with 1 decimal
  const timeString = `${(timeMs / 1000).toFixed(1)}s`;

  return (
    <div 
      className={`absolute top-4 right-4 z-20 flex flex-col gap-2 pointer-events-none ${className}`}
    >
      {/* Step Description */}
      {stepDescription && (
        <div 
          className="px-3 py-2 rounded-xl border shadow-lg backdrop-blur-md self-end max-w-[280px]"
          style={{ 
            background: isDark ? "rgba(0, 229, 255, 0.06)" : "rgba(0, 229, 255, 0.04)",
            borderColor: isDark ? "rgba(0, 229, 255, 0.2)" : "rgba(0, 229, 255, 0.15)",
          }}
        >
          <span className="text-[9px] font-bold uppercase tracking-wider mr-1.5" style={{ color: "#00e5ff" }}>Step:</span>
          <span className="text-[10px]" style={{ color: isDark ? "#e2e8f0" : "#1e293b" }}>{stepDescription}</span>
        </div>
      )}

      {/* Time Counter */}
      <div 
        className="flex items-center gap-2 px-3 py-2 rounded-xl border shadow-lg backdrop-blur-md self-end"
        style={{ 
          background: isDark ? "rgba(15, 23, 42, 0.75)" : "rgba(255, 255, 255, 0.8)",
          borderColor: isDark ? "rgba(30, 41, 59, 0.8)" : "rgba(226, 232, 240, 0.8)",
          color: isDark ? "#f8fafc" : "#0f172a"
        }}
      >
        <Clock size={14} className="text-indigo-400" />
        <span className="text-xs font-mono font-bold">{timeString}</span>
      </div>

      {/* Dynamic Metrics */}
      {metrics.length > 0 && (
        <div 
          className="flex flex-col gap-1.5 px-3 py-2.5 rounded-xl border shadow-lg backdrop-blur-md"
          style={{ 
            background: isDark ? "rgba(15, 23, 42, 0.75)" : "rgba(255, 255, 255, 0.8)",
            borderColor: isDark ? "rgba(30, 41, 59, 0.8)" : "rgba(226, 232, 240, 0.8)",
          }}
        >
          {metrics.map((m, idx) => (
            <div key={idx} className="flex items-center justify-between gap-4">
              <span className="text-[10px] font-medium" style={{ color: isDark ? "#94a3b8" : "#64748b" }}>
                {m.label}
              </span>
              <span className="text-[11px] font-bold font-mono" style={{ color: m.color || (isDark ? "#f8fafc" : "#0f172a") }}>
                {m.value}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
