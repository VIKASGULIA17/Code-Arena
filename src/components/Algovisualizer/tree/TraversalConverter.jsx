"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { Play, RotateCcw, ListTree, AlertTriangle } from "lucide-react";
import { GlobalMetricsPanel } from "../GlobalMetricsPanel";
import { ComplexityPanel } from "../ComplexityPanel";

/* ── BST helpers ─────────────────────────────────── */
function makeNode(value, id) {
  return { id, value, left: null, right: null, state: "default" };
}

function insertBST(root, value, idCounter) {
  if (!root) return makeNode(value, idCounter.next++);
  if (value < root.value) root.left = insertBST(root.left, value, idCounter);
  else if (value > root.value) root.right = insertBST(root.right, value, idCounter);
  return root;
}

function buildBSTFromValues(values) {
  const idCounter = { next: 1 };
  let root = null;
  for (const v of values) root = insertBST(root, v, idCounter);
  return root;
}

function layoutTree(root) {
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
  assignPos(root, 300, 50, 130);
  return { positions, edges };
}

function flattenTree(root) {
  const arr = [];
  (function walk(n) { if (!n) return; arr.push(n); walk(n.left); walk(n.right); })(root);
  return arr;
}

function getTraversal(root, type) {
  const result = [];
  function inorder(n) { if (!n) return; inorder(n.left); result.push(n.value); inorder(n.right); }
  function preorder(n) { if (!n) return; result.push(n.value); preorder(n.left); preorder(n.right); }
  function postorder(n) { if (!n) return; postorder(n.left); postorder(n.right); result.push(n.value); }
  if (type === "inorder") inorder(root);
  else if (type === "preorder") preorder(root);
  else postorder(root);
  return result;
}

/* ── Component ───────────────────────────────────── */
export function TraversalConverter({ theme = "dark" }) {
  const isDark = theme === "dark";
  const [inputVal, setInputVal] = useState("10, 5, 3, 7, 20, 15, 25");
  const [sourceType, setSourceType] = useState("preorder");
  const [targetType, setTargetType] = useState("inorder");
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState(null);

  const [nodesData, setNodesData] = useState([]);
  const [edgesData, setEdgesData] = useState([]);
  const [sourceArr, setSourceArr] = useState([]);
  const [targetArr, setTargetArr] = useState([]);
  const [outputArr, setOutputArr] = useState([]);
  const [logTrace, setLogTrace] = useState([]);
  const [stepDesc, setStepDesc] = useState("Ready. Enter values and click Convert.");
  const [highlightSource, setHighlightSource] = useState(-1);
  const [highlightTarget, setHighlightTarget] = useState(-1);

  const [metrics, setMetrics] = useState({ nodesProcessed: 0, recursionDepth: 0, operations: 0 });
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
  const depthRef = useRef(0);

  const delay = (ms) => new Promise(r => setTimeout(r, ms));
  const addLog = (msg) => setLogTrace(prev => [...prev, msg]);

  const updateNodeState = (id, state) => {
    setNodesData(prev => prev.map(n => n.id === id ? { ...n, state } : n));
  };

  const ns = {
    default: { fill: isDark ? "#1e293b" : "#cbd5e1", stroke: isDark ? "#475569" : "#94a3b8", text: isDark ? "#fff" : "#0f172a" },
    root: { fill: "#006064", stroke: "#00e5ff", text: "#fff", glow: true },
    left: { fill: "#065f46", stroke: "#10b981", text: "#fff" },
    right: { fill: "#7f1d1d", stroke: "#ef4444", text: "#fff" },
    visiting: { fill: "#006064", stroke: "#00e5ff", text: "#fff", glow: true },
    visited: { fill: isDark ? "#0e4166" : "#7dd3fc", stroke: isDark ? "#00b8d4" : "#38bdf8", text: "#fff" },
    placed: { fill: "#a855f7", stroke: "#c084fc", text: "#fff" },
  };

  /* ── Animate building BST from source array ──── */
  const animateBuild = async (values) => {
    const idCounter = { next: 1 };
    let root = null;

    for (let i = 0; i < values.length; i++) {
      if (stopRef.current) return null;
      const v = values[i];
      setHighlightSource(i);

      if (i === 0) {
        setStepDesc(`Identify ROOT = ${v} (first element of source)`);
        addLog(`🔵 ROOT identified: ${v}`);
      } else {
        const dir = v < values[0] ? "LEFT" : "RIGHT";
        setStepDesc(`${v} ${v < values[0] ? "<" : ">"} ${values[0]} → goes to ${dir} subtree`);
        addLog(`${dir === "LEFT" ? "🟢" : "🔴"} ${v} → ${dir} subtree`);
      }
      setMetrics(m => ({ ...m, operations: m.operations + 1 }));
      await delay(500);

      root = insertBST(root, v, idCounter);
      const { positions, edges } = layoutTree(root);
      const flat = flattenTree(root);
      const rendered = flat.map(n => ({
        ...n,
        x: positions[n.id]?.x || 0,
        y: positions[n.id]?.y || 0,
        state: n.value === v ? "root" : (n.value < values[0] ? "left" : (n.value > values[0] ? "right" : "root")),
      }));
      setNodesData(rendered);
      setEdgesData(edges);
      setMetrics(m => ({ ...m, nodesProcessed: i + 1 }));
      await delay(400);
    }
    // Reset node states to default
    setNodesData(prev => prev.map(n => ({ ...n, state: "default" })));
    setHighlightSource(-1);
    return root;
  };

  /* ── Animate target traversal extraction ────── */
  const animateTraversal = async (root, type) => {
    setStepDesc(`Extracting ${type} traversal from constructed tree...`);
    addLog(`\n── Extracting ${type} traversal ──`);
    await delay(400);

    const visitNode = async (node, depth) => {
      if (!node || stopRef.current) return;
      depthRef.current = Math.max(depthRef.current, depth);
      setMetrics(m => ({ ...m, recursionDepth: depthRef.current, operations: m.operations + 1 }));
    };

    const inorder = async (node, depth) => {
      if (!node || stopRef.current) return;
      await visitNode(node, depth);
      await inorder(node.left, depth + 1);
      // Visit
      updateNodeState(node.id, "visiting");
      setStepDesc(`Visiting ${node.value} (inorder: left → root → right)`);
      addLog(`📍 Visit ${node.value}`);
      await delay(500);
      setOutputArr(prev => [...prev, node.value]);
      setHighlightTarget(prev => prev + 1);
      updateNodeState(node.id, "placed");
      await delay(300);
      await inorder(node.right, depth + 1);
    };

    const preorder = async (node, depth) => {
      if (!node || stopRef.current) return;
      await visitNode(node, depth);
      updateNodeState(node.id, "visiting");
      setStepDesc(`Visiting ${node.value} (preorder: root → left → right)`);
      addLog(`📍 Visit ${node.value}`);
      await delay(500);
      setOutputArr(prev => [...prev, node.value]);
      setHighlightTarget(prev => prev + 1);
      updateNodeState(node.id, "placed");
      await delay(300);
      await preorder(node.left, depth + 1);
      await preorder(node.right, depth + 1);
    };

    const postorder = async (node, depth) => {
      if (!node || stopRef.current) return;
      await visitNode(node, depth);
      await postorder(node.left, depth + 1);
      await postorder(node.right, depth + 1);
      updateNodeState(node.id, "visiting");
      setStepDesc(`Visiting ${node.value} (postorder: left → right → root)`);
      addLog(`📍 Visit ${node.value}`);
      await delay(500);
      setOutputArr(prev => [...prev, node.value]);
      setHighlightTarget(prev => prev + 1);
      updateNodeState(node.id, "placed");
      await delay(300);
    };

    if (type === "inorder") await inorder(root, 0);
    else if (type === "preorder") await preorder(root, 0);
    else await postorder(root, 0);
  };

  /* ── Main convert flow ─────────────────────────── */
  const handleConvert = async () => {
    if (isPlaying) return;
    setError(null);

    const values = inputVal.split(",").map(s => parseInt(s.trim())).filter(n => !isNaN(n));
    if (values.length === 0) {
      setError("Please enter valid comma-separated numbers.");
      return;
    }
    if (new Set(values).size !== values.length) {
      setError("Duplicate values detected. BST requires unique values.");
      return;
    }
    if (sourceType === targetType) {
      setError("Source and Target traversal types must be different.");
      return;
    }

    setIsPlaying(true);
    stopRef.current = false;
    depthRef.current = 0;
    setMetrics({ nodesProcessed: 0, recursionDepth: 0, operations: 0 });
    setElapsed(0);
    setOutputArr([]);
    setLogTrace([]);
    setNodesData([]);
    setEdgesData([]);
    setHighlightTarget(-1);

    // Build BST from values, compute source array
    const tempRoot = buildBSTFromValues(values);
    const src = getTraversal(tempRoot, sourceType);
    const tgt = getTraversal(tempRoot, targetType);
    setSourceArr(src);
    setTargetArr(tgt);

    const startT = Date.now();
    timerRef.current = setInterval(() => setElapsed(Date.now() - startT), 100);

    addLog(`Source: [${src.join(", ")}] (${sourceType})`);
    addLog(`Target: ${targetType}\n`);
    addLog("── Phase 1: Reconstructing BST ──");
    setStepDesc("Phase 1: Reconstructing BST from source array...");
    await delay(600);

    const root = await animateBuild(src);

    if (!stopRef.current && root) {
      addLog("\n✅ BST constructed successfully!");
      setStepDesc("Phase 2: Extracting target traversal...");
      await delay(600);

      await animateTraversal(root, targetType);

      if (!stopRef.current) {
        setStepDesc(`✅ Conversion complete: ${sourceType} → ${targetType}`);
        addLog(`\n✅ Result: [${tgt.join(", ")}]`);
      }
    }

    clearInterval(timerRef.current);
    setIsPlaying(false);
  };

  const handleReset = () => {
    stopRef.current = true;
    clearInterval(timerRef.current);
    setIsPlaying(false);
    setError(null);
    setElapsed(0);
    setMetrics({ nodesProcessed: 0, recursionDepth: 0, operations: 0 });
    setOutputArr([]);
    setLogTrace([]);
    setNodesData([]);
    setEdgesData([]);
    setSourceArr([]);
    setTargetArr([]);
    setHighlightSource(-1);
    setHighlightTarget(-1);
    setStepDesc("Ready. Enter values and click Convert.");
  };

  useEffect(() => () => clearInterval(timerRef.current), []);

  return (
    <div className="flex flex-col gap-4 p-4 md:p-6 h-full" style={{ background: c.bg, color: c.text }}>
      {/* Controls */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 rounded-xl px-3 py-1.5" style={{ background: c.panel, border: `1px solid ${c.border}` }}>
          <ListTree size={14} className="text-purple-400" />
          <span className="text-xs font-semibold">Traversal Converter</span>
        </div>

        <div className="flex items-center gap-2 rounded-xl px-3 py-1.5 flex-1 max-w-sm" style={{ background: c.panel, border: `1px solid ${c.border}` }}>
          <input type="text" value={inputVal} onChange={e => setInputVal(e.target.value)} disabled={isPlaying}
            placeholder="e.g. 10, 5, 3, 7, 20" className="w-full bg-transparent text-sm outline-none placeholder-slate-500 font-mono" style={{ color: c.text }} />
        </div>

        <select value={sourceType} onChange={e => setSourceType(e.target.value)} disabled={isPlaying}
          className="rounded-xl px-3 py-2 text-xs font-semibold outline-none cursor-pointer"
          style={{ background: c.panel, border: `1px solid ${c.border}`, color: c.text }}>
          <option value="preorder">Source: Preorder</option>
          <option value="inorder">Source: Inorder</option>
          <option value="postorder">Source: Postorder</option>
        </select>

        <span className="text-xs font-bold" style={{ color: "#00e5ff" }}>→</span>

        <select value={targetType} onChange={e => setTargetType(e.target.value)} disabled={isPlaying}
          className="rounded-xl px-3 py-2 text-xs font-semibold outline-none cursor-pointer"
          style={{ background: c.panel, border: `1px solid ${c.border}`, color: c.text }}>
          <option value="inorder">Target: Inorder</option>
          <option value="preorder">Target: Preorder</option>
          <option value="postorder">Target: Postorder</option>
        </select>

        <div className="flex gap-2 ml-auto">
          <button onClick={handleConvert} disabled={isPlaying}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white transition-all shadow-lg"
            style={{ background: "linear-gradient(135deg, #00e5ff, #006064)", opacity: isPlaying ? 0.7 : 1 }}>
            <Play size={14} /> Convert
          </button>
          <button onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium transition-all"
            style={{ background: c.panel, border: `1px solid ${c.border}`, color: c.text }}>
            <RotateCcw size={13} /> Reset
          </button>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="flex items-center gap-2 px-4 py-3 rounded-xl border" style={{ background: isDark ? "rgba(239,68,68,0.1)" : "rgba(239,68,68,0.05)", borderColor: "rgba(239,68,68,0.3)", color: "#ef4444" }}>
          <AlertTriangle size={16} /> <span className="text-sm font-medium">{error}</span>
        </div>
      )}

      {/* Step Description Bar */}
      <div className="rounded-xl px-4 py-2.5 border" style={{ background: isDark ? "rgba(0,229,255,0.06)" : "rgba(0,229,255,0.04)", borderColor: isDark ? "rgba(0,229,255,0.15)" : "rgba(0,229,255,0.1)" }}>
        <span className="text-[10px] font-bold uppercase tracking-wider mr-2" style={{ color: "#00e5ff" }}>Current Step:</span>
        <span className="text-xs" style={{ color: c.text }}>{stepDesc}</span>
      </div>

      {/* Main Split View */}
      <div className="flex-1 flex flex-col lg:flex-row gap-4 min-h-0">

        {/* Left: SVG Canvas */}
        <div className="flex-1 rounded-2xl overflow-hidden relative min-h-[350px]" style={{ background: c.inner, border: `1px solid ${c.border}` }}>
          <GlobalMetricsPanel
            metrics={[
              { label: "Nodes Processed", value: metrics.nodesProcessed, color: "#00e5ff" },
              { label: "Recursion Depth", value: metrics.recursionDepth, color: "#a855f7" },
              { label: "Operations", value: metrics.operations, color: "#f59e0b" },
            ]}
            timeMs={elapsed}
            theme={theme}
          />
          <ComplexityPanel
            timeComplexity="O(N log N)"
            spaceComplexity="O(N)"
            timeExplanation="Building the BST takes O(N log N) on average, then traversal takes O(N)."
            spaceExplanation="The BST stores all N nodes, and recursion uses O(h) stack space."
            theme={theme}
            accentColor="#00e5ff"
          />

          <svg viewBox="0 0 600 400" className="w-full h-full">
            <defs>
              <filter id="dijkstra-glow-tc" x="-80%" y="-80%" width="260%" height="260%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feFlood floodColor="#00ffff" floodOpacity="0.45" />
                <feComposite in2="blur" operator="in" />
                <feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            </defs>

            {edgesData.map((e, i) => {
              const from = nodesData.find(n => n.id === e.from);
              const to = nodesData.find(n => n.id === e.to);
              if (!from || !to) return null;
              return <line key={i} x1={from.x} y1={from.y} x2={to.x} y2={to.y} stroke={isDark ? "#334155" : "#cbd5e1"} strokeWidth={2} />;
            })}

            {nodesData.map(n => {
              const style = ns[n.state] || ns.default;
              const hasGlow = style.glow;
              return (
                <g key={n.id} style={{ transition: "all 0.4s ease-in-out" }}>
                  {hasGlow && (
                    <>
                      <circle cx={n.x} cy={n.y} r={28} fill="none" stroke="#00e5ff" strokeWidth={1.5} opacity={0.2} filter="url(#dijkstra-glow-tc)">
                        <animate attributeName="r" values="26;34;26" dur="1.5s" repeatCount="indefinite" />
                        <animate attributeName="opacity" values="0.35;0.1;0.35" dur="1.5s" repeatCount="indefinite" />
                      </circle>
                    </>
                  )}
                  <circle cx={n.x} cy={n.y} r={20} fill={style.fill} stroke={style.stroke} strokeWidth={2}
                    filter={hasGlow ? "url(#dijkstra-glow-tc)" : undefined}
                    style={{ transition: "fill 0.3s" }} />
                  <text x={n.x} y={n.y + 1} textAnchor="middle" dominantBaseline="middle" fill={style.text} fontSize={12} fontWeight="bold" fontFamily="monospace">
                    {n.value}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Right: Arrays + Logic Trace */}
        <div className="w-full lg:w-80 flex flex-col gap-3 shrink-0 max-h-full overflow-hidden">

          {/* Source Array */}
          <div className="rounded-2xl p-3 flex flex-col gap-1.5" style={{ background: c.panel, border: `1px solid ${c.border}` }}>
            <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: c.muted }}>Source ({sourceType})</span>
            <div className="flex flex-wrap gap-1.5 min-h-[32px] items-center">
              {sourceArr.length === 0 && <span className="text-[10px] italic" style={{ color: c.muted }}>—</span>}
              {sourceArr.map((v, i) => (
                <div key={i} className="w-7 h-7 flex items-center justify-center rounded text-[11px] font-mono font-bold transition-all"
                  style={{
                    background: i === highlightSource ? "#006064" : (isDark ? "#1e293b" : "#e2e8f0"),
                    color: i === highlightSource ? "#00e5ff" : c.text,
                    border: i === highlightSource ? "1px solid #00e5ff" : `1px solid ${c.border}`,
                    boxShadow: i === highlightSource ? "0 0 12px rgba(0,255,255,0.4)" : "none",
                  }}>{v}</div>
              ))}
            </div>
          </div>

          {/* Target Output Array */}
          <div className="rounded-2xl p-3 flex flex-col gap-1.5" style={{ background: c.panel, border: `1px solid ${c.border}` }}>
            <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: c.muted }}>Target ({targetType})</span>
            <div className="flex flex-wrap gap-1.5 min-h-[32px] items-center">
              {outputArr.length === 0 && <span className="text-[10px] italic" style={{ color: c.muted }}>Waiting...</span>}
              {outputArr.map((v, i) => (
                <div key={i} className="w-7 h-7 flex items-center justify-center rounded text-[11px] font-mono font-bold shadow-md"
                  style={{ background: "#a855f7", color: "#fff", boxShadow: "0 0 8px rgba(168,85,247,0.4)" }}>{v}</div>
              ))}
            </div>
          </div>

          {/* Logic Trace */}
          <div className="flex-1 rounded-2xl p-3 flex flex-col gap-2 overflow-hidden" style={{ background: c.panel, border: `1px solid ${c.border}` }}>
            <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: c.muted }}>Thinking Trace</span>
            <div className="flex-1 overflow-y-auto flex flex-col gap-1 pr-1 font-mono text-[10px]">
              {logTrace.length === 0 && <span className="text-[10px] italic" style={{ color: c.muted }}>Execution log appears here...</span>}
              {logTrace.map((msg, i) => {
                const isVisit = msg.includes("📍");
                const isRoot = msg.includes("🔵");
                const isLeft = msg.includes("🟢");
                const isRight = msg.includes("🔴");
                const isSuccess = msg.includes("✅");
                return (
                  <div key={i} className="py-0.5 px-1.5 rounded"
                    style={{
                      background: isVisit ? (isDark ? "rgba(0,229,255,0.08)" : "rgba(0,229,255,0.04)") : "transparent",
                      color: isVisit ? "#00e5ff" : isRoot ? "#00e5ff" : isLeft ? "#10b981" : isRight ? "#ef4444" : isSuccess ? "#10b981" : c.muted,
                    }}>{msg}</div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
