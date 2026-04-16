"use client";

import { useRecursionEngine } from "./useRecursionEngine";
import { ExecutionControls } from "./ExecutionControls";
import { RecursionCanvas } from "./RecursionCanvas";
import { CallStack } from "./CallStack";
import { StateInspector } from "./StateInspector";

/**
 * Layout shell — composes all panels for the Recursion Visualizer.
 */
export function RecursionVisualizer({ theme = "dark" }) {
  const isDark = theme === "dark";
  const engine = useRecursionEngine();

  const c = {
    bg: isDark ? "#020617" : "#f8fafc",
  };

  return (
    <div
      className="flex flex-col gap-4 p-4 md:p-6 h-full"
      style={{ background: c.bg }}
    >
      {/* Controls bar (top) */}
      <ExecutionControls
        algorithm={engine.algorithm}
        setAlgorithm={engine.setAlgorithm}
        input={engine.input}
        setInput={engine.setInput}
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
        currentCallStackDepth={engine.currentCallStackDepth}
        theme={theme}
      />

      {/* Main content: Canvas + Sidebar */}
      <div className="flex-1 flex flex-col lg:flex-row gap-4 min-h-0">
        {/* Canvas (center) */}
        <div className="flex-1 flex min-h-[400px]">
          <RecursionCanvas
            snapshot={engine.currentSnapshot}
            theme={theme}
          />
        </div>

        {/* Right sidebar: Call Stack + State Inspector */}
        <div className="w-full lg:w-72 xl:w-80 flex flex-col gap-4 shrink-0 lg:max-h-full lg:overflow-y-auto">
          {/* Call Stack */}
          <div className="flex-1 min-h-[200px] max-h-[360px]">
            <CallStack
              callStack={
                engine.currentSnapshot
                  ? engine.currentSnapshot.callStack
                  : []
              }
              theme={theme}
            />
          </div>

          {/* State Inspector */}
          <StateInspector
            snapshot={engine.currentSnapshot}
            theme={theme}
          />
        </div>
      </div>
    </div>
  );
}
