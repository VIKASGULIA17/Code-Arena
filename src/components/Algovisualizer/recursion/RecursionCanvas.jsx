"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { STATE } from "./engine";
import { Shield, Zap } from "lucide-react";

// ── Node color palette by state ─────────────────────────────────────
const NODE_STYLES = {
  [STATE.PENDING]: {
    fill: "transparent",
    stroke: "#475569",
    textFill: "#94a3b8",
    dash: "4 3",
    glow: null,
    r: 22,
  },
  [STATE.ACTIVE]: {
    fill: "#1e40af",
    stroke: "#3b82f6",
    textFill: "#fff",
    dash: null,
    glow: "#3b82f6",
    r: 26,
  },
  [STATE.COMPUTING]: {
    fill: "#1e40af",
    stroke: "#60a5fa",
    textFill: "#fff",
    dash: null,
    glow: "#60a5fa",
    r: 24,
  },
  [STATE.BASE_CASE]: {
    fill: "#065f46",
    stroke: "#10b981",
    textFill: "#fff",
    dash: null,
    glow: "#10b981",
    r: 24,
  },
  [STATE.RETURNING]: {
    fill: "#713f12",
    stroke: "#eab308",
    textFill: "#fff",
    dash: null,
    glow: "#eab308",
    r: 24,
  },
  [STATE.RESOLVED]: {
    fill: "#1e293b",
    stroke: "#64748b",
    textFill: "#e2e8f0",
    dash: null,
    glow: null,
    r: 22,
  },
  [STATE.MEMOIZED]: {
    fill: "#581c87",
    stroke: "#a855f7",
    textFill: "#fff",
    dash: null,
    glow: "#a855f7",
    r: 26,
  },
};

// Edge color based on returning state
function getEdgeColor(fromNode, toNode, returningEdge) {
  if (
    returningEdge &&
    returningEdge.from === fromNode.id &&
    returningEdge.to === toNode.id
  ) {
    return { stroke: "#eab308", width: 3, glow: true };
  }
  if (
    fromNode.state === STATE.RESOLVED ||
    fromNode.state === STATE.RETURNING
  ) {
    return { stroke: "#475569", width: 1.5, glow: false };
  }
  return { stroke: "#334155", width: 1.5, glow: false };
}

/**
 * SVG Recursion Tree Canvas with pan & zoom.
 */
export function RecursionCanvas({
  snapshot,
  theme = "dark",
}) {
  const isDark = theme === "dark";
  const svgRef = useRef(null);
  const containerRef = useRef(null);

  // Pan & Zoom state
  const [transform, setTransform] = useState({
    x: 0,
    y: 0,
    scale: 1,
  });
  const [isPanning, setIsPanning] = useState(false);
  const panStart = useRef({ x: 0, y: 0 });
  const transformRef = useRef(transform);
  transformRef.current = transform;

  // Auto-center when snapshot changes and has an active node
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
      // Zoom toward mouse position
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

  // Pan start
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

  const handleMouseUp = useCallback(() => {
    setIsPanning(false);
  }, []);

  // Attach wheel listener with passive:false
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
        <p
          className="text-sm"
          style={{ color: isDark ? "#64748b" : "#94a3b8" }}
        >
          Select an algorithm and press Play
        </p>
      </div>
    );
  }

  const { nodes, edges, activeNodeId, returningEdge } = snapshot;

  // Build a nodeMap for quick lookups
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
      {/* Legend overlay */}
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
          { label: "Pending", color: "#475569", dash: true },
          { label: "Active", color: "#3b82f6" },
          { label: "Base Case", color: "#10b981" },
          { label: "Returning", color: "#eab308" },
          { label: "Resolved", color: "#64748b" },
          { label: "Memoized", color: "#a855f7" },
        ].map(({ label, color, dash }) => (
          <div key={label} className="flex items-center gap-1">
            <span
              className="w-2.5 h-2.5 rounded-full flex-shrink-0"
              style={{
                background: dash ? "transparent" : color,
                border: `2px ${dash ? "dashed" : "solid"} ${color}`,
              }}
            />
            <span
              className="text-[9px] font-medium"
              style={{
                color: isDark ? "#94a3b8" : "#64748b",
              }}
            >
              {label}
            </span>
          </div>
        ))}
      </div>

      {/* Zoom controls */}
      <div
        className="absolute bottom-3 right-3 z-10 flex flex-col gap-1"
      >
        <button
          onClick={() =>
            setTransform((p) => ({
              ...p,
              scale: Math.min(3, p.scale * 1.2),
            }))
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
            setTransform((p) => ({
              ...p,
              scale: Math.max(0.3, p.scale * 0.8),
            }))
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

      <svg
        ref={svgRef}
        className="w-full h-full"
        style={{ minHeight: 400 }}
      >
        <defs>
          {/* Glow filters */}
          {["blue", "green", "yellow", "purple"].map(
            (name, i) => {
              const colors = [
                "#3b82f6",
                "#10b981",
                "#eab308",
                "#a855f7",
              ];
              return (
                <filter
                  key={name}
                  id={`node-glow-${name}`}
                  x="-60%"
                  y="-60%"
                  width="220%"
                  height="220%"
                >
                  <feGaussianBlur
                    stdDeviation="6"
                    result="blur"
                  />
                  <feFlood
                    floodColor={colors[i]}
                    floodOpacity="0.3"
                  />
                  <feComposite
                    in2="blur"
                    operator="in"
                  />
                  <feMerge>
                    <feMergeNode />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              );
            }
          )}
          <filter
            id="edge-glow"
            x="-20%"
            y="-20%"
            width="140%"
            height="140%"
          >
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
          {/* ── Edges ─────────────────────────────── */}
          <AnimatePresence>
            {edges.map((edge, i) => {
              const from = nodeMap[edge.from];
              const to = nodeMap[edge.to];
              if (!from || !to) return null;

              const edgeColor = getEdgeColor(
                to,
                from,
                returningEdge
              );

              return (
                <motion.line
                  key={`edge-${edge.from}-${edge.to}`}
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{
                    duration: 0.4,
                    ease: "easeOut",
                  }}
                  x1={from.x}
                  y1={from.y}
                  x2={to.x}
                  y2={to.y}
                  stroke={edgeColor.stroke}
                  strokeWidth={edgeColor.width}
                  strokeLinecap="round"
                  filter={
                    edgeColor.glow
                      ? "url(#edge-glow)"
                      : undefined
                  }
                />
              );
            })}
          </AnimatePresence>

          {/* ── Returning data packet ─────────────── */}
          {returningEdge && (
            <>
              {(() => {
                const from = nodeMap[returningEdge.from];
                const to = nodeMap[returningEdge.to];
                if (!from || !to) return null;
                return (
                  <motion.g
                    initial={{
                      x: from.x,
                      y: from.y,
                      opacity: 0,
                      scale: 0,
                    }}
                    animate={{
                      x: to.x,
                      y: to.y,
                      opacity: [0, 1, 1, 0.5],
                      scale: [0, 1.2, 1, 0.8],
                    }}
                    transition={{
                      duration: 0.6,
                      ease: "easeInOut",
                    }}
                  >
                    <circle
                      r={10}
                      fill="#eab308"
                      opacity={0.8}
                    />
                    <text
                      fill="#fff"
                      fontSize={8}
                      fontWeight="700"
                      fontFamily="monospace"
                      textAnchor="middle"
                      dominantBaseline="middle"
                    >
                      {returningEdge.value}
                    </text>
                  </motion.g>
                );
              })()}
            </>
          )}

          {/* ── Nodes ─────────────────────────────── */}
          <AnimatePresence>
            {nodes.map((node) => {
              const style =
                NODE_STYLES[node.state] ||
                NODE_STYLES[STATE.PENDING];
              const isActive = node.id === activeNodeId;
              const dropShadow =
                node.state === STATE.ACTIVE ||
                node.state === STATE.COMPUTING
                  ? 'drop-shadow(0 0 6px #3b82f6)'
                  : node.state === STATE.BASE_CASE
                    ? 'drop-shadow(0 0 6px #10b981)'
                    : node.state === STATE.RETURNING
                      ? 'drop-shadow(0 0 6px #eab308)'
                      : node.state === STATE.MEMOIZED
                        ? 'drop-shadow(0 0 6px #a855f7)'
                        : 'none';

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
                  {/* Pulsating ring for active node */}
                  {isActive && style.glow && (
                    <motion.circle
                      r={style.r + 8}
                      fill="none"
                      stroke={style.glow}
                      strokeWidth={2}
                      opacity={0.4}
                      animate={{
                        r: [
                          style.r + 6,
                          style.r + 12,
                          style.r + 6,
                        ],
                        opacity: [0.4, 0.15, 0.4],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                  )}

                  {/* Main circle */}
                  <motion.circle
                    r={style.r}
                    fill={style.fill}
                    stroke={style.stroke}
                    strokeWidth={2}
                    strokeDasharray={
                      style.dash || undefined
                    }
                    style={{ filter: dropShadow }}
                    animate={{
                      r: style.r,
                      fill: style.fill,
                      stroke: style.stroke,
                    }}
                    transition={{ duration: 0.3 }}
                  />

                  {/* Icon for special states */}
                  {node.state === STATE.BASE_CASE && (
                    <g transform="translate(-5, -5)">
                      <Shield
                        size={10}
                        color="#6ee7b7"
                      />
                    </g>
                  )}
                  {node.state === STATE.MEMOIZED && (
                    <g transform="translate(-5, -5)">
                      <Zap size={10} color="#c084fc" />
                    </g>
                  )}

                  {/* Label */}
                  <text
                    fill={style.textFill}
                    fontSize={10}
                    fontWeight="700"
                    fontFamily="'JetBrains Mono', monospace"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    dy={
                      node.state === STATE.BASE_CASE ||
                      node.state === STATE.MEMOIZED
                        ? 5
                        : 0
                    }
                  >
                    {node.label}
                  </text>

                  {/* Return value badge */}
                  {node.returnValue !== null &&
                    node.returnValue !== undefined &&
                    node.state !== STATE.PENDING &&
                    node.state !== STATE.ACTIVE && (
                      <g>
                        <rect
                          x={-12}
                          y={style.r + 4}
                          width={24}
                          height={16}
                          rx={4}
                          fill={
                            node.state === STATE.MEMOIZED
                              ? "#7c3aed"
                              : "#065f46"
                          }
                          stroke={
                            node.state === STATE.MEMOIZED
                              ? "#a855f7"
                              : "#10b981"
                          }
                          strokeWidth={1}
                        />
                        <text
                          x={0}
                          y={style.r + 14}
                          fill="#fff"
                          fontSize={9}
                          fontWeight="700"
                          fontFamily="monospace"
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          {node.returnValue}
                        </text>
                      </g>
                    )}
                </motion.g>
              );
            })}
          </AnimatePresence>
        </g>
      </svg>
    </div>
  );
}
