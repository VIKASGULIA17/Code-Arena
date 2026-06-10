"use client";

import { TREE_ALGORITHMS } from "./engine";
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  RotateCcw,
  TreePine,
  Search,
  Plus,
  Activity,
  Layers,
  ArrowDown,
  ArrowRight as ArrowR,
} from "lucide-react";
import { ToolbarPortal } from "@/context/ToolbarContext";

/**
 * Tree controls — algorithm picker, input (for insert/search), playback, speed, stats.
 */
export function TreeControls({
  algorithm,
  setAlgorithm,
  inputValue,
  setInputValue,
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
  const meta = TREE_ALGORITHMS[algorithm];

  const algoIcons = {
    inorder: <ArrowR size={12} />,
    preorder: <ArrowDown size={12} />,
    postorder: <ArrowDown size={12} style={{ transform: "rotate(180deg)" }} />,
    levelorder: <Layers size={12} />,
    insert: <Plus size={12} />,
    search: <Search size={12} />,
  };

  return (
    <ToolbarPortal>
      <div className="flex items-center gap-3 flex-nowrap">
        {/* Algorithm picker */}
        <div
          className="flex gap-1 rounded-xl p-1 flex-wrap"
          style={{ background: c.bg, border: `1px solid ${c.border}` }}
        >
          {Object.entries(TREE_ALGORITHMS).map(([key, m]) => (
            <button
              key={key}
              onClick={() => setAlgorithm(key)}
              disabled={isPlaying}
              className="px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all duration-200 flex items-center gap-1.5 whitespace-nowrap"
              style={
                algorithm === key
                  ? {
                      background: m.color,
                      color: "#fff",
                      boxShadow: `0 2px 8px ${m.color}60`,
                    }
                  : { color: c.muted, opacity: isPlaying ? 0.5 : 1 }
              }
            >
              {algoIcons[key] || <TreePine size={12} />}
              {m.name.split(" ")[0]}
            </button>
          ))}
        </div>

        {/* Input (for insert/search) */}
        {meta.needsInput && (
          <div
            className="flex items-center gap-2 rounded-xl px-3 py-1.5"
            style={{ background: c.bg, border: `1px solid ${c.border}` }}
          >
            <span className="text-[11px] font-medium" style={{ color: c.muted }}>
              Val =
            </span>
            <input
              type="number"
              value={inputValue}
              onChange={(e) => {
                const v = parseInt(e.target.value, 10);
                if (!isNaN(v) && v >= 0 && v <= 999) setInputValue(v);
              }}
              disabled={isPlaying}
              min={0}
              max={999}
              className="w-10 bg-transparent text-center text-xs font-mono font-bold outline-none"
              style={{ color: c.text, opacity: isPlaying ? 0.5 : 1 }}
            />
          </div>
        )}

        {/* Playback buttons */}
        <div className="flex items-center gap-1">
          <button
            onClick={stepBack}
            className="p-1.5 rounded-lg transition-all duration-150 hover:scale-105"
            style={{
              background: c.card,
              color: c.text,
              border: `1px solid ${c.border}`,
            }}
            title="Step Back"
          >
            <SkipBack size={13} />
          </button>

          <button
            onClick={isPlaying ? pause : play}
            className="px-3 py-1.5 rounded-xl text-xs font-semibold text-white transition-all duration-200 shadow-lg hover:scale-105 flex items-center gap-1.5"
            style={{
              background: `linear-gradient(135deg, ${meta.color}, ${meta.color}cc)`,
              boxShadow: `0 2px 8px ${meta.color}30`,
            }}
          >
            {isPlaying ? <Pause size={13} /> : <Play size={13} />}
            <span>{isPlaying ? "Pause" : "Play"}</span>
          </button>

          <button
            onClick={stepForward}
            className="p-1.5 rounded-lg transition-all duration-150 hover:scale-105"
            style={{
              background: c.card,
              color: c.text,
              border: `1px solid ${c.border}`,
            }}
            title="Step Forward"
          >
            <SkipForward size={13} />
          </button>

          <button
            onClick={reset}
            className="p-1.5 rounded-lg transition-all duration-150 hover:scale-105 ml-1"
            style={{
              background: c.card,
              color: c.muted,
              border: `1px solid ${c.border}`,
            }}
            title="Reset"
          >
            <RotateCcw size={13} />
          </button>
        </div>

        {/* Speed slider */}
        <div
          className="flex items-center gap-2 rounded-xl px-3 py-1.5"
          style={{ background: c.bg, border: `1px solid ${c.border}` }}
        >
          <Activity size={12} style={{ color: c.muted }} />
          <span className="text-[11px]" style={{ color: c.muted }}>
            Speed
          </span>
          <input
            type="range"
            min={0}
            max={100}
            value={speed}
            onChange={(e) => setSpeed(+e.target.value)}
            className="w-16"
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
    </ToolbarPortal>
  );
}
