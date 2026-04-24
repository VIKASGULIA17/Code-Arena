"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, Legend, AreaChart, Area
} from "recharts"
import { Play, Pause, RotateCcw, Shuffle, Info, TrendingUp } from "lucide-react"
import { GlobalMetricsPanel } from "./GlobalMetricsPanel"
import { ComplexityPanel } from "./ComplexityPanel"

/* ─── algorithm metadata ─────────────────────────── */
const ALGO_META = {
  bubble:    { name: "Bubble Sort",    complexity: "O(n²)",      space: "O(1)",      best: "O(n)",      color: "#6366f1", description: "Repeatedly compares adjacent elements and swaps them if out of order. Simple but slow.", timeExplanation: "Two nested loops iterate through the array, comparing each adjacent pair. n * n comparisons = O(n²).", spaceExplanation: "Swapping is done in-place, requiring only a constant amount of extra memory for the temporary variable." },
  selection: { name: "Selection Sort", complexity: "O(n²)",      space: "O(1)",      best: "O(n²)",     color: "#10b981", description: "Finds the minimum element each pass and places it at the correct position.", timeExplanation: "For each element, it iterates through the rest of the unsorted array to find the minimum. n + (n-1) + ... + 1 = O(n²).", spaceExplanation: "In-place sorting requires no extra array, only a few variables for indices." },
  insertion: { name: "Insertion Sort", complexity: "O(n²)",      space: "O(1)",      best: "O(n)",      color: "#f59e0b", description: "Builds a sorted portion one element at a time — efficient for nearly-sorted data.", timeExplanation: "In the worst case (reverse sorted), each element must be shifted to the very beginning. Average and worst cases are O(n²).", spaceExplanation: "Sorts in-place by shifting elements, so no extra memory is needed." },
  merge:     { name: "Merge Sort",     complexity: "O(n log n)", space: "O(n)",      best: "O(n log n)", color: "#ec4899", description: "Divide-and-conquer: recursively splits the array and merges sorted halves.", timeExplanation: "The array is halved log(n) times, and each level requires O(n) work to merge the sub-arrays. Total: O(n log n).", spaceExplanation: "Merging requires a temporary array of the same size as the sub-arrays being merged, summing to O(n)." },
  quick:     { name: "Quick Sort",     complexity: "O(n log n)", space: "O(log n)", best: "O(n log n)", color: "#0ea5e9", description: "Picks a pivot, partitions the array, and recursively sorts sub-arrays.", timeExplanation: "Average case partitions the array well, leading to log(n) levels of recursion with O(n) work per level. Worst case O(n²).", spaceExplanation: "In-place partitioning, but the recursive call stack takes O(log n) space on average." },
  heap:      { name: "Heap Sort",      complexity: "O(n log n)", space: "O(1)",      best: "O(n log n)", color: "#a855f7", description: "Uses a max-heap to extract elements in sorted order. In-place and efficient.", timeExplanation: "Building the heap takes O(n), and extracting the maximum n times takes O(log n) each. Total: O(n log n).", spaceExplanation: "The array itself is treated as a heap, requiring no additional structures." },
}

/* ─── bar state → color ──────────────────────────── */
const BAR_COLORS = {
  default:   { light: "#6366f1", dark: "#4f46e5" }, // Indigo
  comparing: { light: "#00bcd4", dark: "#00e5ff" }, // Cyan Dijkstra
  swapping:  { light: "#f43f5e", dark: "#fb7185" }, // Rose
  sorted:    { light: "#10b981", dark: "#34d399" }, // Emerald
  pivot:     { light: "#ec4899", dark: "#f472b6" }, // Pink
}

/* ─── custom bar renderer ────────────────────────── */
const CustomBar = (props) => {
  const { x, y, width, height, state, theme } = props
  const color = BAR_COLORS[state]?.[theme] ?? BAR_COLORS.default[theme]
  const glow  = ["comparing","swapping","pivot"].includes(state)
  return (
    <g>
      {glow && (
        <rect x={x - 2} y={y - 2} width={width + 4} height={height + 4}
          fill={color} opacity={0.2} rx={3} />
      )}
      <rect x={x} y={y} width={width} height={height}
        fill={color} rx={2}
        style={{ filter: glow ? `drop-shadow(0 0 4px ${color})` : "none", transition: "fill 0.1s" }}
      />
    </g>
  )
}

export function SortingVisualizer({ theme = "dark" }) {
  const isDark = theme === "dark"
  const [array,       setArray]       = useState([])
  const [algorithm,   setAlgorithm]   = useState("bubble")
  const [speed,       setSpeed]       = useState(50)
  const [size,        setSize]        = useState(40)
  const [isRunning,   setIsRunning]   = useState(false)
  const [isPaused,    setIsPaused]    = useState(false)
  const [comparisons, setComparisons] = useState(0)
  const [swaps,       setSwaps]       = useState(0)
  const [history,     setHistory]     = useState([]) // [{t, comparisons, swaps}]
  const [elapsed,     setElapsed]     = useState(0)
  const stopRef  = useRef(false)
  const pauseRef = useRef(false)
  const timerRef = useRef(null)
  const compRef  = useRef(0)
  const swapRef  = useRef(0)
  const tRef     = useRef(0)

  /* colours for the current theme */
  const c = {
    bg:      isDark ? "#020617" : "#f8fafc", // Slate 950 / Slate 50
    panel:   isDark ? "#0f172a" : "#ffffff", // Slate 900 / White
    border:  isDark ? "#1e293b" : "#e2e8f0", // Slate 800 / Slate 200
    text:    isDark ? "#f1f5f9" : "#0f172a", // Slate 100 / Slate 900
    muted:   isDark ? "#94a3b8" : "#64748b", // Slate 400 / Slate 500
    grid:    isDark ? "#1e3a5f22" : "#6366f110",
    accent:  ALGO_META[algorithm].color,
  }

  /* ── generate array ── */
  const generateArray = useCallback(() => {
    const a = Array.from({ length: size }, () => ({
      value: Math.floor(Math.random() * 95) + 5,
      state: "default",
    }))
    setArray(a); setComparisons(0); setSwaps(0); setHistory([]); setElapsed(0)
    compRef.current = 0; swapRef.current = 0; tRef.current = 0
  }, [size])

  useEffect(() => { generateArray() }, [generateArray])

  /* ── helpers ── */
  const delay = ms => new Promise(r => setTimeout(r, ms))
  const waitPause = async () => { while (pauseRef.current && !stopRef.current) await delay(50) }
  const stepDelay = () => Math.max(5, 120 - speed)

  const updateArray = async (arr, cmp = false, swp = false) => {
    if (stopRef.current) return
    await waitPause()
    setArray([...arr])
    if (cmp) { compRef.current++; setComparisons(compRef.current) }
    if (swp) { swapRef.current++; setSwaps(swapRef.current) }
    tRef.current++
    if (tRef.current % 5 === 0) {
      setHistory(prev => [...prev, { t: tRef.current, comparisons: compRef.current, swaps: swapRef.current }])
    }
    await delay(stepDelay())
  }

  /* ── sort algorithms ── */
  const bubbleSort = async () => {
    const arr = [...array]
    for (let i = 0; i < arr.length - 1; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        if (stopRef.current) return
        arr[j].state = "comparing"; arr[j+1].state = "comparing"
        await updateArray(arr, true)
        if (arr[j].value > arr[j+1].value) {
          arr[j].state = "swapping"; arr[j+1].state = "swapping"
          await updateArray(arr);
          [arr[j], arr[j+1]] = [arr[j+1], arr[j]]
          await updateArray(arr, false, true)
        }
        arr[j].state = "default"; arr[j+1].state = "default"
      }
      arr[arr.length - 1 - i].state = "sorted"
    }
    arr[0].state = "sorted"; await updateArray(arr)
  }

  const selectionSort = async () => {
    const arr = [...array]
    for (let i = 0; i < arr.length - 1; i++) {
      if (stopRef.current) return
      let minIdx = i; arr[i].state = "comparing"; await updateArray(arr)
      for (let j = i + 1; j < arr.length; j++) {
        if (stopRef.current) return
        arr[j].state = "comparing"; await updateArray(arr, true)
        if (arr[j].value < arr[minIdx].value) {
          if (minIdx !== i) arr[minIdx].state = "default"
          minIdx = j; arr[minIdx].state = "pivot"
        } else { arr[j].state = "default" }
        await updateArray(arr)
      }
      if (minIdx !== i) {
        arr[i].state = "swapping"; arr[minIdx].state = "swapping"; await updateArray(arr)
        ;[arr[i], arr[minIdx]] = [arr[minIdx], arr[i]]
        await updateArray(arr, false, true)
      }
      arr[i].state = "sorted"; if (minIdx !== i) arr[minIdx].state = "default"
    }
    arr[arr.length - 1].state = "sorted"; await updateArray(arr)
  }

  const insertionSort = async () => {
    const arr = [...array]
    if (arr.length > 0) { arr[0].state = "sorted"; await updateArray(arr) }
    for (let i = 1; i < arr.length; i++) {
      if (stopRef.current) return
      const key = arr[i]; key.state = "comparing"; await updateArray(arr)
      let j = i - 1
      while (j >= 0 && arr[j].value > key.value) {
        if (stopRef.current) return
        arr[j].state = "comparing"; await updateArray(arr, true)
        arr[j + 1] = arr[j]; arr[j + 1].state = "swapping"
        await updateArray(arr, false, true); arr[j].state = "sorted"; j--
      }
      arr[j + 1] = key; arr[j + 1].state = "sorted"; await updateArray(arr)
    }
  }

  const mergeSort = async () => {
    const arr = [...array]
    const merge = async (l, m, r) => {
      const L = arr.slice(l, m+1), R = arr.slice(m+1, r+1)
      let i = 0, j = 0, k = l
      while (i < L.length && j < R.length) {
        if (stopRef.current) return
        arr[k].state = "comparing"; await updateArray(arr, true)
        if (L[i].value <= R[j].value) { arr[k] = { ...L[i], state: "swapping" }; i++ }
        else { arr[k] = { ...R[j], state: "swapping" }; j++ }
        await updateArray(arr, false, true); arr[k].state = "default"; k++
      }
      while (i < L.length) { if (stopRef.current) return; arr[k] = { ...L[i], state: "swapping" }; await updateArray(arr, false, true); arr[k].state = "default"; i++; k++ }
      while (j < R.length) { if (stopRef.current) return; arr[k] = { ...R[j], state: "swapping" }; await updateArray(arr, false, true); arr[k].state = "default"; j++; k++ }
    }
    const sort = async (l, r) => { if (l < r) { const m = Math.floor((l+r)/2); await sort(l, m); await sort(m+1, r); await merge(l, m, r) } }
    await sort(0, arr.length - 1)
    for (const el of arr) el.state = "sorted"; await updateArray(arr)
  }

  const quickSort = async () => {
    const arr = [...array]
    const partition = async (lo, hi) => {
      const pivot = arr[hi]; pivot.state = "pivot"; await updateArray(arr)
      let i = lo - 1
      for (let j = lo; j < hi; j++) {
        if (stopRef.current) return -1
        arr[j].state = "comparing"; await updateArray(arr, true)
        if (arr[j].value < pivot.value) {
          i++; arr[i].state = "swapping"; arr[j].state = "swapping"; await updateArray(arr)
          ;[arr[i], arr[j]] = [arr[j], arr[i]]; await updateArray(arr, false, true)
        }
        arr[j].state = "default"; if (i >= lo) arr[i].state = "default"
      }
      arr[i+1].state = "swapping"; arr[hi].state = "swapping"; await updateArray(arr)
      ;[arr[i+1], arr[hi]] = [arr[hi], arr[i+1]]; await updateArray(arr, false, true)
      arr[i+1].state = "sorted"; return i + 1
    }
    const sort = async (lo, hi) => {
      if (lo < hi && !stopRef.current) { const pi = await partition(lo, hi); if (pi === -1) return; await sort(lo, pi-1); await sort(pi+1, hi) }
    }
    await sort(0, arr.length - 1)
    for (const el of arr) el.state = "sorted"; await updateArray(arr)
  }

  const heapSort = async () => {
    const arr = [...array]
    const heapify = async (n, i) => {
      let largest = i, l = 2*i+1, r = 2*i+2
      if (l < n) { arr[l].state = "comparing"; await updateArray(arr, true); if (arr[l].value > arr[largest].value) largest = l; arr[l].state = "default" }
      if (r < n) { arr[r].state = "comparing"; await updateArray(arr, true); if (arr[r].value > arr[largest].value) largest = r; arr[r].state = "default" }
      if (largest !== i) {
        arr[i].state = "swapping"; arr[largest].state = "swapping"; await updateArray(arr)
        ;[arr[i], arr[largest]] = [arr[largest], arr[i]]; await updateArray(arr, false, true)
        arr[i].state = "default"; arr[largest].state = "default"; await heapify(n, largest)
      }
    }
    for (let i = Math.floor(arr.length/2)-1; i >= 0; i--) { if (stopRef.current) return; await heapify(arr.length, i) }
    for (let i = arr.length-1; i > 0; i--) {
      if (stopRef.current) return
      arr[0].state = "swapping"; arr[i].state = "swapping"; await updateArray(arr)
      ;[arr[0], arr[i]] = [arr[i], arr[0]]; await updateArray(arr, false, true)
      arr[i].state = "sorted"; arr[0].state = "default"; await heapify(i, 0)
    }
    arr[0].state = "sorted"; await updateArray(arr)
  }

  /* ── run / control ── */
  const runSort = async () => {
    setIsRunning(true); stopRef.current = false; pauseRef.current = false
    compRef.current = 0; swapRef.current = 0; tRef.current = 0
    setComparisons(0); setSwaps(0); setHistory([])
    const start = Date.now()
    timerRef.current = setInterval(() => setElapsed(Date.now() - start), 200)
    const fns = { bubble: bubbleSort, selection: selectionSort, insertion: insertionSort, merge: mergeSort, quick: quickSort, heap: heapSort }
    await fns[algorithm]?.()
    clearInterval(timerRef.current); setIsRunning(false); setIsPaused(false)
  }

  const togglePause = () => { pauseRef.current = !pauseRef.current; setIsPaused(p => !p) }
  const stop = () => { stopRef.current = true; clearInterval(timerRef.current); setIsRunning(false); setIsPaused(false); generateArray() }

  const meta = ALGO_META[algorithm]
  const chartData = array.map((el, i) => ({ i, value: el.value, state: el.state }))

  /* ── recharts bar data key with state colour via Cell ── */
  const barFill = (entry) => BAR_COLORS[entry.state]?.[theme] ?? BAR_COLORS.default[theme]

  return (
    <div className="flex flex-col gap-4 p-4 md:p-6 h-full" style={{ background: c.bg, color: c.text }}>

      {/* ── Top: algo tabs + controls ── */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Algo pills */}
        <div className="flex gap-1 rounded-xl p-1 flex-wrap" style={{ background: c.panel, border: `1px solid ${c.border}` }}>
          {Object.entries(ALGO_META).map(([key, m]) => (
            <button key={key} onClick={() => !isRunning && setAlgorithm(key)} disabled={isRunning}
              className="px-2.5 py-1.5 rounded-lg text-[11px] font-semibold transition-all duration-200"
              style={algorithm === key
                ? { background: m.color, color: "#fff", boxShadow: `0 2px 8px ${m.color}66` }
                : { color: c.muted }
              }>
              {m.name.split(" ")[0]}
            </button>
          ))}
        </div>

        {/* Speed */}
        <div className="flex items-center gap-2 rounded-xl px-3 py-1.5" style={{ background: c.panel, border: `1px solid ${c.border}` }}>
          <span className="text-[11px]" style={{ color: c.muted }}>Speed</span>
          <input type="range" min={1} max={100} value={speed} onChange={e => setSpeed(+e.target.value)}
            className="w-20" style={{ accentColor: c.accent }} />
          <span className="text-[11px] font-bold w-7" style={{ color: c.text }}>{speed}%</span>
        </div>

        {/* Size */}
        <div className="flex items-center gap-2 rounded-xl px-3 py-1.5" style={{ background: c.panel, border: `1px solid ${c.border}` }}>
          <span className="text-[11px]" style={{ color: c.muted }}>Size</span>
          <input type="range" min={10} max={80} value={size} disabled={isRunning}
            onChange={e => setSize(+e.target.value)} className="w-20" style={{ accentColor: c.accent }} />
          <span className="text-[11px] font-bold w-5" style={{ color: c.text }}>{size}</span>
        </div>

        {/* Actions */}
        <div className="flex gap-2 ml-auto">
          <button onClick={generateArray} disabled={isRunning}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium transition-all"
            style={{ background: c.panel, border: `1px solid ${c.border}`, color: c.text }}>
            <Shuffle size={13} /> Shuffle
          </button>
          <button onClick={isRunning ? togglePause : runSort}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white transition-all shadow-lg"
            style={{ background: `linear-gradient(135deg, ${meta.color}, ${meta.color}bb)` }}>
            {isRunning ? (isPaused ? <><Play size={14}/>Resume</> : <><Pause size={14}/>Pause</>) : <><Play size={14}/>Sort</>}
          </button>
          <button onClick={stop}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium transition-all"
            style={{ background: c.panel, border: `1px solid ${c.border}`, color: c.text }}>
            <RotateCcw size={13} /> Reset
          </button>
        </div>
      </div>

      {/* ── Main bar chart (Recharts) ── */}
      <div className="flex-1 rounded-2xl overflow-hidden relative" style={{ background: c.panel, border: `1px solid ${c.border}`, minHeight: 240 }}>
        <GlobalMetricsPanel 
          metrics={[
            { label: "Comparisons", value: comparisons, color: "#f59e0b" },
            { label: "Swaps", value: swaps, color: "#ef4444" }
          ]}
          timeMs={elapsed}
          theme={theme}
        />
        <ComplexityPanel 
          timeComplexity={meta.complexity}
          spaceComplexity={meta.space}
          timeExplanation={meta.timeExplanation}
          spaceExplanation={meta.spaceExplanation}
          theme={theme}
          accentColor={meta.color}
        />
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 12, right: 8, left: -24, bottom: 0 }} barCategoryGap="2%">
            <CartesianGrid vertical={false} stroke={c.border} opacity={0.5} />
            <XAxis dataKey="i" hide />
            <YAxis tick={{ fill: c.muted, fontSize: 10 }} axisLine={false} tickLine={false} />
            <Tooltip
              cursor={false}
              contentStyle={{ background: c.panel, border: `1px solid ${c.border}`, borderRadius: 10, color: c.text, fontSize: 12 }}
              formatter={(val, _, props) => [val, props.payload.state]}
            />
            <Bar dataKey="value" radius={[3,3,0,0]} isAnimationActive={false}
              shape={(props) => <CustomBar {...props} state={props.state || props?.payload?.state} theme={theme} />}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* ── Live Recharts line chart: comparisons vs swaps ── */}
      {history.length > 1 && (
        <div className="rounded-2xl p-4" style={{ background: c.panel, border: `1px solid ${c.border}` }}>
          <div className="flex items-center gap-1.5 mb-3">
            <TrendingUp size={13} style={{ color: c.accent }} />
            <span className="text-[11px] font-semibold" style={{ color: c.text }}>Live Stats</span>
          </div>
          <ResponsiveContainer width="100%" height={100}>
            <AreaChart data={history} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={c.border} opacity={0.4} />
              <XAxis dataKey="t" hide />
              <YAxis tick={{ fill: c.muted, fontSize: 9 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: c.panel, border: `1px solid ${c.border}`, borderRadius: 8, fontSize: 11 }} />
              <Legend iconSize={8} wrapperStyle={{ fontSize: 10 }} />
              <defs>
                <linearGradient id="cmpGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="swpGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                </linearGradient>
              </defs>
              <Area type="monotone" dataKey="comparisons" stroke="#f59e0b" fill="url(#cmpGrad)" strokeWidth={1.5} dot={false} isAnimationActive={false} />
              <Area type="monotone" dataKey="swaps"       stroke="#ef4444" fill="url(#swpGrad)" strokeWidth={1.5} dot={false} isAnimationActive={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* ── Legend ── */}
      <div className="flex flex-wrap gap-3 justify-center">
        {Object.entries(BAR_COLORS).map(([state, cols]) => (
          <div key={state} className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm" style={{ background: cols[theme] }} />
            <span className="text-[11px] capitalize" style={{ color: c.muted }}>{state}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
