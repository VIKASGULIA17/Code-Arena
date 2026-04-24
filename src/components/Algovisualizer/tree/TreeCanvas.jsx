"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TREE_STATE } from "./engine";

// ── Node styling per state ──────────────────────────────────────────
const getNodeStyle = (state, isDark) => {
  switch (state) {
    case TREE_STATE.VISITING:
      return {
        fill: "#006064",
        stroke: "#00e5ff",
        textFill: "#fff",
        glow: "rgba(0,255,255,0.6)",
        glowColor: "#00e5ff",
        r: 26,
        filter: "url(#dijkstra-glow)",
      };
    case TREE_STATE.VISITED:
      return {
        fill: isDark ? "#312e81" : "#c4b5fd",
        stroke: isDark ? "#818cf8" : "#8b5cf6",
        textFill: "#fff",
        glow: "rgba(129,140,248,0.3)",
        glowColor: "#818cf8",
        r: 23,
        filter: null,
      };
    case TREE_STATE.FOUND:
      return {
        fill: "#064e3b",
        stroke: "#34d399",
        textFill: "#fff",
        glow: "rgba(52,211,153,0.5)",
        glowColor: "#34d399",
        r: 28,
        filter: "url(#tree-glow-green)",
      };
    case TREE_STATE.INSERTING:
      return {
        fill: "#14532d",
        stroke: "#4ade80",
        textFill: "#fff",
        glow: "rgba(74,222,128,0.5)",
        glowColor: "#4ade80",
        r: 26,
        filter: "url(#tree-glow-green)",
      };
    case TREE_STATE.CURRENT:
      return {
        fill: "#78350f",
        stroke: "#fbbf24",
        textFill: "#fff",
        glow: "rgba(251,191,36,0.55)",
        glowColor: "#fbbf24",
        r: 26,
        filter: "url(#tree-glow-yellow)",
      };
    default:
      return {
        fill: isDark ? "#334155" : "#94a3b8",
        stroke: isDark ? "#475569" : "#cbd5e1",
        textFill: isDark ? "#94a3b8" : "#fff",
        glow: null,
        glowColor: null,
        r: 22,
        filter: null,
      };
  }
};

/**
 * SVG BST Canvas with pan & zoom.
 */
export function TreeCanvas({ snapshot, theme = "dark" }) {
  const isDark = theme === "dark";
  const containerRef = useRef(null);

  const [transform, setTransform] = useState({ x: 0, y: 0, scale: 1 });
  const [isPanning, setIsPanning] = useState(false);
  const panStart = useRef({ x: 0, y: 0 });
  const transformRef = useRef(transform);
  transformRef.current = transform;

  // Auto-center on active node
  useEffect(() => {
    if (!snapshot || !containerRef.current) return;
    const activeNode = snapshot.nodes.find(
      (n) => n.id === snapshot.activeNodeId
    );
    if (!activeNode) return;

    const rect = containerRef.current.getBoundingClientRect();
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const scale = transformRef.current.scale;

    setTransform((prev) => ({
      ...prev,
      x: cx - activeNode.x * scale,
      y: cy - activeNode.y * scale,
    }));
  }, [snapshot?.activeNodeId]);

  // Wheel zoom
  const handleWheel = useCallback((e) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.92 : 1.08;
    setTransform((prev) => {
      const newScale = Math.max(0.3, Math.min(3, prev.scale * delta));
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return { ...prev, scale: newScale };
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      return {
        scale: newScale,
        x: mx - ((mx - prev.x) / prev.scale) * newScale,
        y: my - ((my - prev.y) / prev.scale) * newScale,
      };
    });
  }, []);

  const handleMouseDown = useCallback((e) => {
    if (e.button !== 0) return;
    setIsPanning(true);
    panStart.current = {
      x: e.clientX - transformRef.current.x,
      y: e.clientY - transformRef.current.y,
    };
  }, []);

  const handleMouseMove = useCallback(
    (e) => {
      if (!isPanning) return;
      setTransform((prev) => ({
        ...prev,
        x: e.clientX - panStart.current.x,
        y: e.clientY - panStart.current.y,
      }));
    },
    [isPanning]
  );

  const handleMouseUp = useCallback(() => setIsPanning(false), []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => el.removeEventListener("wheel", handleWheel);
  }, [handleWheel]);

  if (!snapshot) {
    return (
      <div
        className="flex-1 flex items-center justify-center rounded-2xl"
        style={{
          background: isDark ? "#020617" : "#f1f5f9",
          border: `1px solid ${isDark ? "#1e293b" : "#e2e8f0"}`,
        }}
      >
        <p className="text-sm" style={{ color: isDark ? "#64748b" : "#94a3b8" }}>
          Select an algorithm and press Play
        </p>
      </div>
    );
  }

  const { nodes, edges, activeNodeId, highlightEdge } = snapshot;
  const nodeMap = {};
  for (const n of nodes) nodeMap[n.id] = n;

  return (
    <div
      ref={containerRef}
      className="flex-1 rounded-2xl overflow-hidden relative"
      style={{
        background: isDark ? "#020617" : "#f1f5f9",
        border: `1px solid ${isDark ? "#1e293b" : "#e2e8f0"}`,
        cursor: isPanning ? "grabbing" : "grab",
        minHeight: 400,
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Legend */}
      <div
        className="absolute top-3 left-3 z-10 flex flex-wrap gap-2 backdrop-blur rounded-xl px-3 py-2 border"
        style={{
          background: isDark
            ? "rgba(15, 23, 42, 0.85)"
            : "rgba(255, 255, 255, 0.85)",
          borderColor: isDark ? "#1e293b" : "#e2e8f0",
        }}
      >
        {[
          { label: "Unvisited", color: isDark ? "#475569" : "#94a3b8" },
          { label: "Visiting", color: "#a78bfa" },
          { label: "Visited", color: "#60a5fa" },
          { label: "Found", color: "#34d399" },
        ].map(({ label, color }) => (
          <div key={label} className="flex items-center gap-1">
            <span
              className="w-2.5 h-2.5 rounded-full flex-shrink-0"
              style={{ background: color }}
            />
            <span
              className="text-[9px] font-medium"
              style={{ color: isDark ? "#94a3b8" : "#64748b" }}
            >
              {label}
            </span>
          </div>
        ))}
      </div>

      {/* Zoom controls */}
      <div className="absolute bottom-3 right-3 z-10 flex flex-col gap-1">
        <button
          onClick={() =>
            setTransform((p) => ({ ...p, scale: Math.min(3, p.scale * 1.2) }))
          }
          className="w-7 h-7 rounded-lg text-xs font-bold flex items-center justify-center transition-all"
          style={{
            background: isDark ? "#1e293b" : "#e2e8f0",
            color: isDark ? "#e2e8f0" : "#334155",
            border: `1px solid ${isDark ? "#334155" : "#cbd5e1"}`,
          }}
        >
          +
        </button>
        <button
          onClick={() =>
            setTransform((p) => ({ ...p, scale: Math.max(0.3, p.scale * 0.8) }))
          }
          className="w-7 h-7 rounded-lg text-xs font-bold flex items-center justify-center transition-all"
          style={{
            background: isDark ? "#1e293b" : "#e2e8f0",
            color: isDark ? "#e2e8f0" : "#334155",
            border: `1px solid ${isDark ? "#334155" : "#cbd5e1"}`,
          }}
        >
          −
        </button>
      </div>

      <svg className="w-full h-full" style={{ minHeight: 400 }}>
        <defs>
          {[
            { name: "purple", color: "#a78bfa" },
            { name: "green", color: "#34d399" },
            { name: "cyan", color: "#22d3ee" },
            { name: "yellow", color: "#fbbf24" },
          ].map(({ name, color }) => (
            <filter
              key={name}
              id={`tree-glow-${name}`}
              x="-60%"
              y="-60%"
              width="220%"
              height="220%"
            >
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feFlood floodColor={color} floodOpacity="0.3" />
              <feComposite in2="blur" operator="in" />
              <feMerge>
                <feMergeNode />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          ))}
          {/* Dijkstra neon cyan glow */}
          <filter id="dijkstra-glow" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feFlood floodColor="#00ffff" floodOpacity="0.45" />
            <feComposite in2="blur" operator="in" />
            <feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="tree-edge-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <g
          transform={`translate(${transform.x}, ${transform.y}) scale(${transform.scale})`}
        >
          {/* Edges */}
          <AnimatePresence>
            {edges.map((edge) => {
              const from = nodeMap[edge.from];
              const to = nodeMap[edge.to];
              if (!from || !to) return null;

              const isHighlighted =
                highlightEdge &&
                highlightEdge.from === edge.from &&
                highlightEdge.to === edge.to;

              return (
                <motion.line
                  key={`edge-${edge.from}-${edge.to}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  x1={from.x}
                  y1={from.y}
                  x2={to.x}
                  y2={to.y}
                  stroke={
                    isHighlighted
                      ? "#fbbf24"
                      : isDark
                        ? "#334155"
                        : "#cbd5e1"
                  }
                  strokeWidth={isHighlighted ? 3 : 2}
                  strokeLinecap="round"
                  filter={isHighlighted ? "url(#tree-edge-glow)" : undefined}
                />
              );
            })}
          </AnimatePresence>

          {/* Nodes */}
          <AnimatePresence>
            {nodes.map((node) => {
              const style = getNodeStyle(node.state, isDark);
              const isActive = node.id === activeNodeId;

              return (
                <motion.g
                  key={`node-${node.id}`}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{
                    scale: 1,
                    opacity: 1,
                    x: node.x,
                    y: node.y,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 25,
                    opacity: { duration: 0.2 },
                  }}
                >
                  {/* Pulsating ring for active */}
                  {isActive && style.glowColor && (
                    <>
                      <motion.circle
                        r={style.r + 8}
                        fill="none"
                        stroke={style.glowColor}
                        strokeWidth={2}
                        opacity={0.4}
                        animate={{
                          r: [style.r + 6, style.r + 14, style.r + 6],
                          opacity: [0.4, 0.1, 0.4],
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />
                      <motion.circle
                        r={style.r + 4}
                        fill="none"
                        stroke={style.glowColor}
                        strokeWidth={1}
                        opacity={0.3}
                        animate={{
                          r: [style.r + 3, style.r + 9, style.r + 3],
                          opacity: [0.35, 0.08, 0.35],
                        }}
                        transition={{
                          duration: 1.2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />
                    </>
                  )}

                  {/* Main circle */}
                  <motion.circle
                    r={style.r}
                    fill={style.fill}
                    stroke={style.stroke}
                    strokeWidth={2}
                    style={{ filter: style.glow ? `drop-shadow(0 0 15px ${style.glow})` : 'none' }}
                    animate={{
                      r: style.r,
                      fill: style.fill,
                      stroke: style.stroke,
                    }}
                    transition={{ duration: 0.3 }}
                  />

                  {/* Value label */}
                  <text
                    fill={style.textFill}
                    fontSize={12}
                    fontWeight="700"
                    fontFamily="'JetBrains Mono', monospace"
                    textAnchor="middle"
                    dominantBaseline="middle"
                  >
                    {node.value}
                  </text>
                </motion.g>
              );
            })}
          </AnimatePresence>
        </g>
      </svg>
    </div>
  );
}
