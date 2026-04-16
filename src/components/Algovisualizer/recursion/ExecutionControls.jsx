"use client";

import { ALGORITHMS } from "./engine";
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  RotateCcw,
  Zap,
  TreePine,
  Hash,
  Activity,
} from "lucide-react";

/**
 * Execution controls — algorithm picker, input, playback toolbar, speed, stats.
 */
export function ExecutionControls({
  algorithm,
  setAlgorithm,
  input,
  setInput,
  isPlaying,
  play,
  pause,
  stepForward,
  stepBack,
  reset,
  speed,
  setSpeed,
  currentStep,
  totalSteps,
  totalNodes,
  currentCallStackDepth,
  theme = "dark",
}) {
  const isDark = theme === "dark";
  const c = {
    bg: isDark ? "#0f172a" : "#ffffff",
    border: isDark ? "#1e293b" : "#e2e8f0",
    text: isDark ? "#f1f5f9" : "#0f172a",
    muted: isDark ? "#94a3b8" : "#64748b",
    card: isDark ? "#1e293b" : "#f1f5f9",
  };
  const meta = ALGORITHMS[algorithm];

  return (
    <div className="flex flex-col gap-3">
      {/* Algorithm picker */}
      <div
        className="flex gap-1 rounded-xl p-1 flex-wrap"
        style={{
          background: c.bg,
          border: `1px solid ${c.border}`,
        }}
      >
        {Object.entries(ALGORITHMS).map(([key, m]) => (
          <button
            key={key}
            onClick={() => setAlgorithm(key)}
            disabled={isPlaying}
            className="px-3 py-2 rounded-lg text-xs font-semibold transition-all duration-200 flex items-center gap-1.5 whitespace-nowrap"
            style={
              algorithm === key
                ? {
                    background: m.color,
                    color: "#fff",
                    boxShadow: `0 4px 12px ${m.color}40`,
                  }
                : {
                    color: c.muted,
                    opacity: isPlaying ? 0.5 : 1,
                  }
            }
          >
            {key.includes("memo") ? (
              <Zap size={12} />
            ) : key === "factorial" ? (
              <Hash size={12} />
            ) : (
              <TreePine size={12} />
            )}
            {m.name}
          </button>
        ))}
      </div>

      {/* Input + playback controls */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Input field */}
        <div
          className="flex items-center gap-2 rounded-xl px-3 py-1.5"
          style={{
            background: c.bg,
            border: `1px solid ${c.border}`,
          }}
        >
          <span
            className="text-[11px] font-medium"
            style={{ color: c.muted }}
          >
            n =
          </span>
          <input
            type="number"
            value={input}
            onChange={(e) => {
              const v = parseInt(e.target.value, 10);
              if (!isNaN(v) && v >= 0 && v <= meta.maxInput) {
                setInput(v);
              }
            }}
            disabled={isPlaying}
            min={0}
            max={meta.maxInput}
            className="w-14 bg-transparent text-center text-sm font-mono font-bold outline-none"
            style={{
              color: c.text,
              opacity: isPlaying ? 0.5 : 1,
            }}
          />
          <span
            className="text-[9px]"
            style={{ color: c.muted }}
          >
            max {meta.maxInput}
          </span>
        </div>

        {/* Playback buttons */}
        <div className="flex items-center gap-1">
          <button
            onClick={stepBack}
            className="p-2 rounded-lg transition-all duration-150 hover:scale-105"
            style={{
              background: c.card,
              color: c.text,
              border: `1px solid ${c.border}`,
            }}
            title="Step Back"
          >
            <SkipBack size={14} />
          </button>

          <button
            onClick={isPlaying ? pause : play}
            className="px-4 py-2 rounded-xl text-sm font-semibold text-white transition-all duration-200 shadow-lg hover:scale-105 flex items-center gap-2"
            style={{
              background: `linear-gradient(135deg, ${meta.color}, ${meta.color}cc)`,
              boxShadow: `0 4px 16px ${meta.color}40`,
            }}
          >
            {isPlaying ? (
              <>
                <Pause size={14} /> Pause
              </>
            ) : (
              <>
                <Play size={14} /> Play
              </>
            )}
          </button>

          <button
            onClick={stepForward}
            className="p-2 rounded-lg transition-all duration-150 hover:scale-105"
            style={{
              background: c.card,
              color: c.text,
              border: `1px solid ${c.border}`,
            }}
            title="Step Forward"
          >
            <SkipForward size={14} />
          </button>

          <button
            onClick={reset}
            className="p-2 rounded-lg transition-all duration-150 hover:scale-105 ml-1"
            style={{
              background: c.card,
              color: c.muted,
              border: `1px solid ${c.border}`,
            }}
            title="Reset"
          >
            <RotateCcw size={14} />
          </button>
        </div>

        {/* Speed slider */}
        <div
          className="flex items-center gap-2 rounded-xl px-3 py-1.5"
          style={{
            background: c.bg,
            border: `1px solid ${c.border}`,
          }}
        >
          <Activity size={12} style={{ color: c.muted }} />
          <span
            className="text-[11px]"
            style={{ color: c.muted }}
          >
            Speed
          </span>
          <input
            type="range"
            min={0}
            max={100}
            value={speed}
            onChange={(e) => setSpeed(+e.target.value)}
            className="w-20"
            style={{ accentColor: meta.color }}
          />
          <span
            className="text-[11px] font-bold w-8 font-mono"
            style={{ color: c.text }}
          >
            {speed}%
          </span>
        </div>
      </div>

      {/* Stats chips */}
      <div className="flex flex-wrap gap-2">
        {[
          {
            label: "Algorithm",
            value: meta.name,
            color: meta.color,
          },
          {
            label: "Complexity",
            value: meta.complexity,
            color: "#6366f1",
          },
          {
            label: "Step",
            value: `${currentStep + 1} / ${totalSteps}`,
            color: "#0ea5e9",
          },
          {
            label: "Total Nodes",
            value: totalNodes,
            color: "#10b981",
          },
          {
            label: "Stack Depth",
            value: currentCallStackDepth,
            color: "#f59e0b",
          },
        ].map(({ label, value, color }) => (
          <div
            key={label}
            className="flex items-center gap-2 border rounded-xl px-3 py-1.5"
            style={{
              background: c.bg,
              borderColor: c.border,
            }}
          >
            <span
              className="w-2 h-2 rounded-full flex-shrink-0"
              style={{ background: color }}
            />
            <span
              className="text-[10px]"
              style={{ color: c.muted }}
            >
              {label}:
            </span>
            <span
              className="text-[11px] font-bold font-mono"
              style={{ color: c.text }}
            >
              {value}
            </span>
          </div>
        ))}
      </div>

      {/* Progress bar */}
      <div
        className="h-1 rounded-full overflow-hidden"
        style={{ background: c.card }}
      >
        <div
          className="h-full rounded-full transition-all duration-200"
          style={{
            width: `${totalSteps > 0 ? ((currentStep + 1) / totalSteps) * 100 : 0}%`,
            background: `linear-gradient(90deg, ${meta.color}, ${meta.color}aa)`,
          }}
        />
      </div>
    </div>
  );
}
