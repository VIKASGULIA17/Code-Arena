import { useState, useRef, useCallback, useEffect } from "react";
import { RecursionEngine, ALGORITHMS } from "./engine";

/**
 * React hook that drives playback over the precomputed engine timeline.
 */
export function useRecursionEngine() {
  const [algorithm, setAlgorithm] = useState("fibonacci");
  const [input, setInput] = useState(5);
  const [timeline, setTimeline] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(50); // 0-100

  const engineRef = useRef(new RecursionEngine());
  const intervalRef = useRef(null);
  const speedRef = useRef(speed);

  // Keep speedRef in sync
  useEffect(() => {
    speedRef.current = speed;
  }, [speed]);

  // Compute interval ms from speed (0→800ms, 50→350ms, 100→80ms)
  const getIntervalMs = useCallback(() => {
    const s = speedRef.current;
    return Math.max(80, 800 - s * 7.2);
  }, []);

  // Precompute timeline when algorithm or input changes
  const precompute = useCallback(() => {
    stopPlayback();
    const engine = engineRef.current;
    engine.setAlgorithm(algorithm);
    engine.setInput(input);
    const tl = engine.precompute();
    setTimeline(tl);
    setCurrentStep(0);
  }, [algorithm, input]);

  // Auto-precompute on changes
  useEffect(() => {
    precompute();
  }, [precompute]);

  // ── Playback controls ────────────────────────────────────────────────

  const stopPlayback = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsPlaying(false);
  }, []);

  const play = useCallback(() => {
    if (timeline.length === 0) return;
    // If at end, restart
    setCurrentStep((prev) => {
      if (prev >= timeline.length - 1) return 0;
      return prev;
    });
    setIsPlaying(true);

    if (intervalRef.current) clearInterval(intervalRef.current);

    const tick = () => {
      setCurrentStep((prev) => {
        if (prev >= timeline.length - 1) {
          stopPlayback();
          return prev;
        }
        return prev + 1;
      });
    };

    // Use dynamic interval
    const dynamicInterval = () => {
      intervalRef.current = setTimeout(() => {
        tick();
        if (intervalRef.current !== null) {
          dynamicInterval();
        }
      }, getIntervalMs());
    };
    dynamicInterval();
  }, [timeline, stopPlayback, getIntervalMs]);

  const pause = useCallback(() => {
    stopPlayback();
  }, [stopPlayback]);

  const stepForward = useCallback(() => {
    stopPlayback();
    setCurrentStep((prev) => Math.min(prev + 1, timeline.length - 1));
  }, [timeline, stopPlayback]);

  const stepBack = useCallback(() => {
    stopPlayback();
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  }, [stopPlayback]);

  const reset = useCallback(() => {
    stopPlayback();
    setCurrentStep(0);
  }, [stopPlayback]);

  const jumpTo = useCallback(
    (step) => {
      stopPlayback();
      setCurrentStep(Math.max(0, Math.min(step, timeline.length - 1)));
    },
    [timeline, stopPlayback]
  );

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearTimeout(intervalRef.current);
      }
    };
  }, []);

  // Current snapshot
  const currentSnapshot =
    timeline.length > 0 ? timeline[currentStep] : null;

  // Stats
  const totalSteps = timeline.length;
  const meta = ALGORITHMS[algorithm];
  const totalNodes = currentSnapshot ? currentSnapshot.nodes.length : 0;
  const maxDepth = currentSnapshot
    ? Math.max(0, ...currentSnapshot.callStack.map(() => 1))
    : 0;
  const currentCallStackDepth = currentSnapshot
    ? currentSnapshot.callStack.length
    : 0;

  return {
    // State
    algorithm,
    input,
    speed,
    isPlaying,
    currentStep,
    totalSteps,
    currentSnapshot,
    timeline,
    meta,
    totalNodes,
    currentCallStackDepth,

    // Setters
    setAlgorithm: (a) => {
      stopPlayback();
      setAlgorithm(a);
    },
    setInput: (n) => {
      stopPlayback();
      setInput(n);
    },
    setSpeed,

    // Controls
    play,
    pause,
    stepForward,
    stepBack,
    reset,
    jumpTo,
    precompute,
  };
}
