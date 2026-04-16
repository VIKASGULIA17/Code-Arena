"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ListOrdered } from "lucide-react";

/**
 * Animated traversal order display — nodes appear one by one.
 */
export function TraversalOrder({ order = [], theme = "dark" }) {
  const isDark = theme === "dark";
  const c = {
    bg: isDark ? "#0f172a" : "#ffffff",
    border: isDark ? "#1e293b" : "#e2e8f0",
    text: isDark ? "#f1f5f9" : "#0f172a",
    muted: isDark ? "#94a3b8" : "#64748b",
  };

  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{ background: c.bg, border: `1px solid ${c.border}` }}
    >
      <div
        className="flex items-center gap-2 px-4 py-3 border-b shrink-0"
        style={{ borderColor: c.border }}
      >
        <ListOrdered size={14} style={{ color: "#6366f1" }} />
        <span
          className="text-xs font-bold uppercase tracking-wider"
          style={{ color: c.muted }}
        >
          Traversal Order
        </span>
        <span
          className="ml-auto text-[10px] font-mono px-2 py-0.5 rounded-full"
          style={{
            background: isDark ? "#1e293b" : "#e2e8f0",
            color: c.text,
          }}
        >
          {order.length} node{order.length !== 1 ? "s" : ""}
        </span>
      </div>

      <div className="p-3 flex flex-wrap gap-1.5 min-h-[48px]">
        {order.length === 0 ? (
          <p className="text-xs w-full text-center py-2" style={{ color: c.muted }}>
            Traversal will appear here…
          </p>
        ) : (
          <AnimatePresence>
            {order.map((value, index) => (
              <motion.div
                key={`${index}-${value}`}
                initial={{ opacity: 0, scale: 0.6, y: 8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 25,
                }}
                className="flex items-center"
              >
                {index > 0 && (
                  <span
                    className="text-[10px] mx-0.5"
                    style={{ color: c.muted }}
                  >
                    →
                  </span>
                )}
                <span
                  className="text-xs font-mono font-bold px-2 py-1 rounded-lg"
                  style={{
                    background: isDark
                      ? "rgba(99, 102, 241, 0.15)"
                      : "rgba(99, 102, 241, 0.1)",
                    color: "#818cf8",
                    border: "1px solid rgba(99, 102, 241, 0.2)",
                  }}
                >
                  {value}
                </span>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}
