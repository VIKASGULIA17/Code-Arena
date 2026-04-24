"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { Play, RotateCcw, Box } from "lucide-react";
import { GlobalMetricsPanel } from "../GlobalMetricsPanel";
import { ComplexityPanel } from "../ComplexityPanel";

// Basic BST logic and layout
function makeNode(value, id) {
  return { id, value, left: null, right: null, x: 0, y: 0, state: "default" };
}

function layoutBST(root) {
  if (!root) return { positions: {}, edges: [] };
  const positions = {};
  const edges = [];

  function assignPos(node, x, y, spread) {
    if (!node) return;
    positions[node.id] = { x, y };

    if (node.left) {
      edges.push({ from: node.id, to: node.left.id });
      assignPos(node.left, x - spread, y + 80, spread * 0.55);
    }
    if (node.right) {
      edges.push({ from: node.id, to: node.right.id });
      assignPos(node.right, x + spread, y + 80, spread * 0.55);
    }
  }

  assignPos(root, 400, 60, 160);
  return { positions, edges };
}

function flattenTree(root) {
  const arr = [];
  function walk(node) {
    if (!node) return;
    arr.push(node);
    walk(node.left);
    walk(node.right);
  }
  walk(root);
  return arr;
}

function cloneTree(node) {
  if (!node) return null;
  return { ...node, left: cloneTree(node.left), right: cloneTree(node.right) };
}

export function InteractiveTreeBuilder({ theme = "dark" }) {
  const isDark = theme === "dark";
  const [inputVal, setInputVal] = useState("10, 5, 20, 3, 7, 15, 25");
  const [isPlaying, setIsPlaying] = useState(false);
  
  const [root, setRoot] = useState(null);
  const [nodesData, setNodesData] = useState([]);
  const [edgesData, setEdgesData] = useState([]);
  
  // Flying node animation state
  const [flyingNode, setFlyingNode] = useState(null); // { value, x, y, state }
  
  const [metrics, setMetrics] = useState({ nodesTraversed: 0, operations: 0 });
  const [elapsed, setElapsed] = useState(0);

  const c = {
    bg: isDark ? "#020617" : "#f8fafc",
    panel: isDark ? "#0f172a" : "#ffffff",
    border: isDark ? "#1e293b" : "#e2e8f0",
    text: isDark ? "#f1f5f9" : "#0f172a",
    muted: isDark ? "#94a3b8" : "#64748b",
    inner: isDark ? "#020617" : "#f1f5f9",
  };

  const timerRef = useRef(null);
  const stopRef = useRef(false);

  // Update canvas data whenever root changes
  const updateCanvas = useCallback((currentRoot) => {
    const { positions, edges } = layoutBST(currentRoot);
    const flat = flattenTree(currentRoot);
    const renderNodes = flat.map(n => ({
      ...n,
      x: positions[n.id]?.x || 0,
      y: positions[n.id]?.y || 0
    }));
    setNodesData(renderNodes);
    setEdgesData(edges);
  }, []);

  const delay = (ms) => new Promise(r => setTimeout(r, ms));

  const insertAnimated = async (value, currentRoot, idCounter) => {
    let curr = currentRoot;
    let parent = null;
    let isLeft = false;

    // Start flying node at top
    setFlyingNode({ value, x: 400, y: 10, state: "flying" });
    setMetrics(m => ({ ...m, operations: m.operations + 1 }));
    await delay(600);

    while (curr) {
      if (stopRef.current) return { root: currentRoot, inserted: false };

      // Move flying node to current node being compared
      const tPos = { x: curr.x, y: curr.y };
      setFlyingNode({ value, x: tPos.x, y: tPos.y - 40, state: "comparing" });
      setMetrics(m => ({ ...m, nodesTraversed: m.nodesTraversed + 1, operations: m.operations + 1 }));
      
      // Highlight current node
      curr.state = "comparing";
      updateCanvas(currentRoot);
      await delay(600);

      if (value < curr.value) {
        curr.state = "goLeft"; // green
        parent = curr;
        curr = curr.left;
        isLeft = true;
      } else if (value > curr.value) {
        curr.state = "goRight"; // red
        parent = curr;
        curr = curr.right;
        isLeft = false;
      } else {
        // Duplicate
        curr.state = "duplicate";
        setFlyingNode({ value, x: tPos.x, y: tPos.y - 40, state: "duplicate" });
        updateCanvas(currentRoot);
        await delay(800);
        curr.state = "default";
        updateCanvas(currentRoot);
        setFlyingNode(null);
        return { root: currentRoot, inserted: false }; // drop duplicate
      }
      
      updateCanvas(currentRoot);
      await delay(400);
      parent.state = "default";
      updateCanvas(currentRoot);
    }

    if (stopRef.current) return { root: currentRoot, inserted: false };

    // Attach
    const newNode = makeNode(value, idCounter.next++);
    if (!parent) {
      currentRoot = newNode;
    } else if (isLeft) {
      parent.left = newNode;
    } else {
      parent.right = newNode;
    }

    // Give it a temp state to highlight insertion
    newNode.state = "inserted";
    updateCanvas(currentRoot);
    setFlyingNode(null);
    await delay(500);
    newNode.state = "default";
    updateCanvas(currentRoot);

    return { root: currentRoot, inserted: true };
  };

  const handleBuild = async () => {
    if (isPlaying) return;
    setIsPlaying(true);
    stopRef.current = false;
    setElapsed(0);
    setMetrics({ nodesTraversed: 0, operations: 0 });
    setRoot(null);
    setNodesData([]);
    setEdgesData([]);
    setFlyingNode(null);

    const startT = Date.now();
    timerRef.current = setInterval(() => setElapsed(Date.now() - startT), 100);

    const vals = inputVal.split(",").map(s => parseInt(s.trim())).filter(n => !isNaN(n));
    let currentRoot = null;
    const idCounter = { next: 1 };

    for (const v of vals) {
      if (stopRef.current) break;
      const res = await insertAnimated(v, currentRoot, idCounter);
      currentRoot = res.root;
      if (!currentRoot) break; // should not happen if first insert succeeds
    }

    clearInterval(timerRef.current);
    setIsPlaying(false);
  };

  const handleReset = () => {
    stopRef.current = true;
    setIsPlaying(false);
    setRoot(null);
    setNodesData([]);
    setEdgesData([]);
    setFlyingNode(null);
    setElapsed(0);
    setMetrics({ nodesTraversed: 0, operations: 0 });
    clearInterval(timerRef.current);
  };

  useEffect(() => {
    return () => clearInterval(timerRef.current);
  }, []);

  // Node styles — each state has its own neon color
  const ns = {
    default: { fill: isDark ? "#1e293b" : "#cbd5e1", stroke: isDark ? "#475569" : "#94a3b8", text: isDark ? "#fff" : "#0f172a" },
    comparing: { fill: "#006064", stroke: "#00e5ff", text: "#fff", glow: true, glowColor: "#00e5ff" }, // cyan
    goLeft: { fill: "#064e3b", stroke: "#34d399", text: "#fff", glow: true, glowColor: "#34d399" }, // green
    goRight: { fill: "#7f1d1d", stroke: "#f87171", text: "#fff", glow: true, glowColor: "#f87171" }, // red
    duplicate: { fill: "#64748b", stroke: "#94a3b8", text: "#fff" }, // slate
    inserted: { fill: "#4a1d96", stroke: "#bf5af2", text: "#fff", glow: true, glowColor: "#bf5af2" }, // purple
  };

  return (
    <div className="flex flex-col gap-4 p-4 md:p-6 h-full" style={{ background: c.bg, color: c.text }}>
      {/* Controls */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 rounded-xl px-3 py-1.5" style={{ background: c.panel, border: `1px solid ${c.border}` }}>
          <Box size={14} className="text-emerald-400" />
          <span className="text-xs font-semibold">Tree Builder</span>
        </div>
        
        <div className="flex items-center gap-2 rounded-xl px-3 py-1.5 flex-1 max-w-md" style={{ background: c.panel, border: `1px solid ${c.border}` }}>
          <input 
            type="text" 
            value={inputVal}
            onChange={e => setInputVal(e.target.value)}
            disabled={isPlaying}
            placeholder="e.g. 10, 5, 20, 3, 7"
            className="w-full bg-transparent text-sm outline-none placeholder-slate-500 font-mono"
            style={{ color: c.text }}
          />
        </div>

        <div className="flex gap-2 ml-auto">
          <button onClick={handleBuild} disabled={isPlaying}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white transition-all shadow-lg"
            style={{ background: `linear-gradient(135deg, #10b981, #059669)`, opacity: isPlaying ? 0.7 : 1 }}>
            <Play size={14} /> Build BST
          </button>
          <button onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium transition-all"
            style={{ background: c.panel, border: `1px solid ${c.border}`, color: c.text }}>
            <RotateCcw size={13} /> Reset
          </button>
        </div>
      </div>

      {/* Canvas */}
      <div className="flex-1 rounded-2xl overflow-hidden relative min-h-[400px]" style={{ background: c.inner, border: `1px solid ${c.border}` }}>
        <GlobalMetricsPanel 
          metrics={[
            { label: "Nodes Traversed", value: metrics.nodesTraversed, color: "#f59e0b" },
            { label: "Operations Executed", value: metrics.operations, color: "#ec4899" }
          ]}
          timeMs={elapsed}
          theme={theme}
        />
        <ComplexityPanel 
          timeComplexity="O(h)"
          spaceComplexity="O(1)"
          timeExplanation="Building a BST by inserting N elements takes O(N log N) on average, but each insertion takes O(h) where h is the current tree height."
          spaceExplanation="Iterative insertion requires no extra stack space."
          theme={theme}
          accentColor="#10b981"
        />

        <svg viewBox="0 0 800 500" className="w-full h-full">
          <defs>
            <filter id="dijkstra-glow-tb" x="-80%" y="-80%" width="260%" height="260%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feFlood floodColor="#00ffff" floodOpacity="0.45" />
              <feComposite in2="blur" operator="in" />
              <feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>
          {/* Edges */}
          {edgesData.map((e, i) => {
            const from = nodesData.find(n => n.id === e.from);
            const to = nodesData.find(n => n.id === e.to);
            if(!from || !to) return null;
            return (
              <line key={i} x1={from.x} y1={from.y} x2={to.x} y2={to.y} 
                stroke={isDark ? "#334155" : "#cbd5e1"} strokeWidth={2} />
            );
          })}

          {/* Nodes */}
          {nodesData.map(n => {
            const style = ns[n.state] || ns.default;
            const hasGlow = style.glow;
            return (
              <g key={n.id} style={{ transition: "all 0.4s ease-in-out" }}>
                {/* Dijkstra pulse rings for glowing states */}
                {hasGlow && (
                  <>
                    <circle cx={n.x} cy={n.y} r={28} fill="none"
                      stroke={style.glowColor || "#00e5ff"} strokeWidth={1.5} opacity={0.2}
                      filter="url(#dijkstra-glow-tb)">
                      <animate attributeName="r" values="26;34;26" dur="1.5s" repeatCount="indefinite" />
                      <animate attributeName="opacity" values="0.35;0.1;0.35" dur="1.5s" repeatCount="indefinite" />
                    </circle>
                    <circle cx={n.x} cy={n.y} r={24} fill="none"
                      stroke={style.glowColor || "#00e5ff"} strokeWidth={1} opacity={0.3}>
                      <animate attributeName="r" values="23;29;23" dur="1.2s" repeatCount="indefinite" />
                      <animate attributeName="opacity" values="0.4;0.08;0.4" dur="1.2s" repeatCount="indefinite" />
                    </circle>
                  </>
                )}
                <circle cx={n.x} cy={n.y} r={20} fill={style.fill} stroke={style.stroke} strokeWidth={2}
                  filter={hasGlow ? "url(#dijkstra-glow-tb)" : undefined}
                  style={{ transition: "fill 0.3s", filter: hasGlow ? undefined : "none" }} />
                <text x={n.x} y={n.y + 1} textAnchor="middle" dominantBaseline="middle" fill={style.text} fontSize={12} fontWeight="bold" fontFamily="monospace">
                  {n.value}
                </text>
              </g>
            );
          })}

          {/* Flying Node */}
          {flyingNode && (
            <g style={{ transform: `translate(${flyingNode.x}px, ${flyingNode.y}px)`, transition: "transform 0.5s ease-in-out" }}>
              <circle cx={0} cy={0} r={20} fill={ns.inserted.fill} stroke={ns.inserted.stroke} strokeWidth={2} opacity={0.9} />
              <text x={0} y={1} textAnchor="middle" dominantBaseline="middle" fill="#fff" fontSize={12} fontWeight="bold" fontFamily="monospace">
                {flyingNode.value}
              </text>
            </g>
          )}
        </svg>

        {/* Legend */}
        <div className="absolute bottom-4 right-4 flex gap-3 p-3 rounded-xl border backdrop-blur-md" 
             style={{ background: isDark ? "rgba(15, 23, 42, 0.75)" : "rgba(255, 255, 255, 0.8)", borderColor: c.border }}>
          <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-amber-500"></span><span className="text-[10px]" style={{ color: c.muted }}>Comparing</span></div>
          <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-emerald-500"></span><span className="text-[10px]" style={{ color: c.muted }}>Go Left (&lt;)</span></div>
          <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-red-500"></span><span className="text-[10px]" style={{ color: c.muted }}>Go Right (&gt;)</span></div>
        </div>
      </div>
    </div>
  );
}
