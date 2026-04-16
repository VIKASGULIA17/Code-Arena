"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Layers } from "lucide-react";

/**
 * Animated call-stack panel — frames slide in/out with spring physics.
 */
export function CallStack({ callStack = [], theme = "dark" }) {
  const isDark = theme === "dark";
  const c = {
    bg: isDark ? "#0f172a" : "#ffffff",
    border: isDark ? "#1e293b" : "#e2e8f0",
    text: isDark ? "#f1f5f9" : "#0f172a",
    muted: isDark ? "#94a3b8" : "#64748b",
    card: isDark ? "#1e293b" : "#f1f5f9",
    active: isDark
      ? "rgba(99, 102, 241, 0.15)"
      : "rgba(99, 102, 241, 0.08)",
    activeBorder: "#6366f1",
    returning: isDark
      ? "rgba(234, 179, 8, 0.15)"
      : "rgba(234, 179, 8, 0.08)",
    returningBorder: "#eab308",
  };

  const reversed = [...callStack].reverse();

  return (
    <div
      className="flex flex-col h-full rounded-2xl overflow-hidden"
      style={{
        background: c.bg,
        border: `1px solid ${c.border}`,
      }}
    >
      {/* Header */}
      <div
        className="flex items-center gap-2 px-4 py-3 border-b shrink-0"
        style={{ borderColor: c.border }}
      >
        <Layers size={14} style={{ color: "#6366f1" }} />
        <span
          className="text-xs font-bold uppercase tracking-wider"
          style={{ color: c.muted }}
        >
          Call Stack
        </span>
        <span
          className="ml-auto text-[10px] font-mono px-2 py-0.5 rounded-full"
          style={{
            background: isDark ? "#1e293b" : "#e2e8f0",
            color: c.text,
          }}
        >
          {callStack.length} frame{callStack.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Stack frames */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {callStack.length === 0 ? (
          <div className="flex-1 flex items-center justify-center h-full py-12">
            <p className="text-xs" style={{ color: c.muted }}>
              Stack is empty — press Play to begin
            </p>
          </div>
        ) : (
          <AnimatePresence mode="popLayout">
            {reversed.map((frame, index) => {
              const isTop = index === 0;
              const isReturning = frame.state === "returning";
              return (
                <motion.div
                  key={frame.id}
                  layout
                  initial={{ opacity: 0, y: -20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 60, scale: 0.9 }}
                  transition={{
                    type: "spring",
                    stiffness: 350,
                    damping: 30,
                  }}
                  className="rounded-xl px-3 py-2.5"
                  style={{
                    background: isReturning
                      ? c.returning
                      : isTop
                        ? c.active
                        : c.card,
                    border: `1px solid ${
                      isReturning
                        ? c.returningBorder
                        : isTop
                          ? c.activeBorder
                          : c.border
                    }`,
                    boxShadow: isTop
                      ? `0 0 12px ${c.activeBorder}30`
                      : "none",
                  }}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className="text-xs font-mono font-bold truncate"
                      style={{
                        color: isTop ? "#818cf8" : c.text,
                      }}
                    >
                      {frame.name}
                    </span>
                    {frame.returnValue !== null &&
                      frame.returnValue !== undefined && (
                        <span
                          className="text-[10px] font-mono px-1.5 py-0.5 rounded"
                          style={{
                            background: isDark
                              ? "rgba(16, 185, 129, 0.15)"
                              : "rgba(16, 185, 129, 0.1)",
                            color: "#10b981",
                          }}
                        >
                          → {frame.returnValue}
                        </span>
                      )}
                  </div>
                  {isTop && (
                    <div className="flex items-center gap-1 mt-1">
                      <div
                        className="w-1.5 h-1.5 rounded-full animate-pulse"
                        style={{
                          background: isReturning
                            ? "#eab308"
                            : "#6366f1",
                        }}
                      />
                      <span
                        className="text-[9px]"
                        style={{ color: c.muted }}
                      >
                        {isReturning ? "Returning" : "Executing"}
                      </span>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}
