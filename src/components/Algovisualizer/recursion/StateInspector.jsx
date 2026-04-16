"use client";

import { Database, Variable, ArrowRight } from "lucide-react";

/**
 * State Inspector — shows active node variables, return value, and memo table.
 */
export function StateInspector({
  snapshot,
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

  if (!snapshot) return null;

  // Find active node
  const activeNode = snapshot.nodes.find(
    (n) => n.id === snapshot.activeNodeId
  );

  const memoEntries = Object.entries(snapshot.memoTable || {});
  const hasMemo = memoEntries.length > 0;

  return (
    <div className="flex flex-col gap-3">
      {/* Active Node Info */}
      <div
        className="rounded-2xl overflow-hidden"
        style={{ background: c.bg, border: `1px solid ${c.border}` }}
      >
        <div
          className="flex items-center gap-2 px-4 py-3 border-b"
          style={{ borderColor: c.border }}
        >
          <Variable size={14} style={{ color: "#10b981" }} />
          <span
            className="text-xs font-bold uppercase tracking-wider"
            style={{ color: c.muted }}
          >
            Active Frame
          </span>
        </div>

        <div className="p-4 space-y-3">
          {activeNode ? (
            <>
              {/* Function label */}
              <div className="flex items-center gap-2">
                <span
                  className="text-sm font-mono font-bold"
                  style={{ color: "#818cf8" }}
                >
                  {activeNode.label}
                </span>
                <span
                  className="text-[10px] px-2 py-0.5 rounded-full font-medium capitalize"
                  style={{
                    background:
                      activeNode.state === "base_case"
                        ? "rgba(16, 185, 129, 0.15)"
                        : activeNode.state === "memoized"
                          ? "rgba(168, 85, 247, 0.15)"
                          : activeNode.state === "returning"
                            ? "rgba(234, 179, 8, 0.15)"
                            : "rgba(99, 102, 241, 0.15)",
                    color:
                      activeNode.state === "base_case"
                        ? "#10b981"
                        : activeNode.state === "memoized"
                          ? "#a855f7"
                          : activeNode.state === "returning"
                            ? "#eab308"
                            : "#6366f1",
                  }}
                >
                  {activeNode.state.replace("_", " ")}
                </span>
              </div>

              {/* Arguments */}
              <div>
                <span
                  className="text-[10px] font-medium uppercase tracking-wider"
                  style={{ color: c.muted }}
                >
                  Arguments
                </span>
                <div className="mt-1 space-y-1">
                  {Object.entries(activeNode.args || {}).map(
                    ([key, val]) => (
                      <div
                        key={key}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-lg font-mono text-xs"
                        style={{ background: c.card }}
                      >
                        <span style={{ color: "#6ee7b7" }}>
                          {key}
                        </span>
                        <ArrowRight
                          size={10}
                          style={{ color: c.muted }}
                        />
                        <span style={{ color: c.text }}>
                          {JSON.stringify(val)}
                        </span>
                      </div>
                    )
                  )}
                </div>
              </div>

              {/* Return value */}
              {activeNode.returnValue !== null &&
                activeNode.returnValue !== undefined && (
                  <div>
                    <span
                      className="text-[10px] font-medium uppercase tracking-wider"
                      style={{ color: c.muted }}
                    >
                      Return Value
                    </span>
                    <div
                      className="mt-1 px-3 py-2 rounded-lg font-mono text-sm font-bold"
                      style={{
                        background:
                          "rgba(16, 185, 129, 0.1)",
                        color: "#10b981",
                        border: "1px solid rgba(16, 185, 129, 0.2)",
                      }}
                    >
                      {activeNode.returnValue}
                    </div>
                  </div>
                )}
            </>
          ) : (
            <p className="text-xs py-4 text-center" style={{ color: c.muted }}>
              No active frame
            </p>
          )}
        </div>
      </div>

      {/* Memo Table */}
      {hasMemo && (
        <div
          className="rounded-2xl overflow-hidden"
          style={{
            background: c.bg,
            border: `1px solid ${c.border}`,
          }}
        >
          <div
            className="flex items-center gap-2 px-4 py-3 border-b"
            style={{ borderColor: c.border }}
          >
            <Database size={14} style={{ color: "#a855f7" }} />
            <span
              className="text-xs font-bold uppercase tracking-wider"
              style={{ color: c.muted }}
            >
              Memo Table
            </span>
            <span
              className="ml-auto text-[10px] font-mono px-2 py-0.5 rounded-full"
              style={{
                background: isDark ? "#1e293b" : "#e2e8f0",
                color: c.text,
              }}
            >
              {memoEntries.length} entries
            </span>
          </div>
          <div className="p-3 flex flex-wrap gap-1.5">
            {memoEntries.map(([key, val]) => (
              <div
                key={key}
                className="flex items-center gap-1 text-[11px] font-mono px-2 py-1 rounded-lg"
                style={{
                  background: isDark
                    ? "rgba(168, 85, 247, 0.1)"
                    : "rgba(168, 85, 247, 0.06)",
                  border: "1px solid rgba(168, 85, 247, 0.2)",
                }}
              >
                <span style={{ color: "#c084fc" }}>
                  f({key})
                </span>
                <span style={{ color: c.muted }}>=</span>
                <span style={{ color: "#e9d5ff" }}>
                  {val}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Description */}
      {snapshot.description && (
        <div
          className="rounded-xl px-4 py-3 text-xs leading-relaxed"
          style={{
            background: isDark
              ? "rgba(99, 102, 241, 0.08)"
              : "rgba(99, 102, 241, 0.05)",
            border: `1px solid ${isDark ? "rgba(99, 102, 241, 0.15)" : "rgba(99, 102, 241, 0.1)"}`,
            color: isDark ? "#c7d2fe" : "#4338ca",
          }}
        >
          {snapshot.description}
        </div>
      )}
    </div>
  );
}
