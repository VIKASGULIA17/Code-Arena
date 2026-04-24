"use client";

import { useTreeEngine } from "./useTreeEngine";
import { TreeControls } from "./TreeControls";
import { TreeCanvas } from "./TreeCanvas";
import { TraversalOrder } from "./TraversalOrder";
import { GlobalMetricsPanel } from "../GlobalMetricsPanel";
import { ComplexityPanel } from "../ComplexityPanel";

/**
 * Layout shell — composes all panels for the Tree (BST) Visualizer.
 */
export function TreeVisualizer({ theme = "dark" }) {
  const isDark = theme === "dark";
  const engine = useTreeEngine();

  const c = {
    bg: isDark ? "#020617" : "#f8fafc",
    border: isDark ? "#1e293b" : "#e2e8f0",
    text: isDark ? "#f1f5f9" : "#0f172a",
    muted: isDark ? "#94a3b8" : "#64748b",
  };

  return (
    <div
      className="flex flex-col gap-4 p-4 md:p-6 h-full"
      style={{ background: c.bg }}
    >
      {/* Controls bar (top) */}
      <TreeControls
        algorithm={engine.algorithm}
        setAlgorithm={engine.setAlgorithm}
        inputValue={engine.inputValue}
        setInputValue={engine.setInputValue}
        isPlaying={engine.isPlaying}
        play={engine.play}
        pause={engine.pause}
        stepForward={engine.stepForward}
        stepBack={engine.stepBack}
        reset={engine.reset}
        speed={engine.speed}
        setSpeed={engine.setSpeed}
        currentStep={engine.currentStep}
        totalSteps={engine.totalSteps}
        totalNodes={engine.totalNodes}
        theme={theme}
      />

      {/* Main content: Canvas + sidebar */}
      <div className="flex-1 flex flex-col lg:flex-row gap-4 min-h-0">
        {/* Canvas (center) */}
        <div className="flex-1 flex relative min-h-[400px]">
          <GlobalMetricsPanel 
            metrics={[
              { label: "Operations", value: `${engine.currentStep}/${engine.totalSteps}`, color: "#f59e0b" },
              { label: "Nodes Visited", value: engine.currentSnapshot?.traversalOrder?.length || 0, color: "#0ea5e9" }
            ]}
            timeMs={engine.currentStep * Math.max(80, 800 - engine.speed * 7.2)}
            theme={theme}
          />
          <ComplexityPanel 
            timeComplexity={engine.meta.complexity}
            spaceComplexity={engine.meta.space}
            timeExplanation={engine.meta.timeExplanation}
            spaceExplanation={engine.meta.spaceExplanation}
            theme={theme}
            accentColor={engine.meta.color}
          />
          <TreeCanvas
            snapshot={engine.currentSnapshot}
            theme={theme}
          />
        </div>

        {/* Right sidebar: Traversal order + description */}
        <div className="w-full lg:w-72 xl:w-80 flex flex-col gap-4 shrink-0 lg:max-h-full lg:overflow-y-auto">
          {/* Traversal order */}
          <TraversalOrder
            order={
              engine.currentSnapshot
                ? engine.currentSnapshot.traversalOrder
                : []
            }
            theme={theme}
          />

          {/* Description panel */}
          {engine.currentSnapshot?.description && (
            <div
              className="rounded-xl px-4 py-3 text-xs leading-relaxed"
              style={{
                background: isDark
                  ? "rgba(99, 102, 241, 0.08)"
                  : "rgba(99, 102, 241, 0.05)",
                border: `1px solid ${
                  isDark
                    ? "rgba(99, 102, 241, 0.15)"
                    : "rgba(99, 102, 241, 0.1)"
                }`,
                color: isDark ? "#c7d2fe" : "#4338ca",
              }}
            >
              {engine.currentSnapshot.description}
            </div>
          )}

          {/* Algorithm info card */}
          <div
            className="rounded-2xl p-4"
            style={{
              background: isDark ? "#0f172a" : "#ffffff",
              border: `1px solid ${c.border}`,
            }}
          >
            <div className="flex items-center gap-2 mb-3">
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ background: engine.meta.color }}
              />
              <span
                className="text-sm font-bold"
                style={{ color: c.text }}
              >
                {engine.meta.name}
              </span>
            </div>
            <p
              className="text-xs leading-relaxed mb-1"
              style={{ color: c.muted }}
            >
              {engine.meta.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
