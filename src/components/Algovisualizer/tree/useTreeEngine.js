import { useState, useRef, useCallback, useEffect } from "react";
import { TreeEngine, TREE_ALGORITHMS } from "./engine";

/**
 * React hook that drives playback over the precomputed BST timeline.
 */
export function useTreeEngine() {
  const [algorithm, setAlgorithm] = useState("inorder");
  const [inputValue, setInputValue] = useState(55);
  const [timeline, setTimeline] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(50);

  const engineRef = useRef(new TreeEngine());
  const intervalRef = useRef(null);
  const speedRef = useRef(speed);

  useEffect(() => {
    speedRef.current = speed;
  }, [speed]);

  const getIntervalMs = useCallback(() => {
    const s = speedRef.current;
    return Math.max(80, 800 - s * 7.2);
  }, []);

  const precompute = useCallback(() => {
    stopPlayback();
    const engine = engineRef.current;
    engine.setAlgorithm(algorithm);
    const meta = TREE_ALGORITHMS[algorithm];
    if (meta.needsInput) {
      engine.setInputValue(inputValue);
    } else {
      engine.setInputValue(null);
    }
    const tl = engine.precompute();
    setTimeline(tl);
    setCurrentStep(0);
  }, [algorithm, inputValue]);

  useEffect(() => {
    precompute();
  }, [precompute]);

  const stopPlayback = useCallback(() => {
    if (intervalRef.current) {
      clearTimeout(intervalRef.current);
      intervalRef.current = null;
    }
    setIsPlaying(false);
  }, []);

  const play = useCallback(() => {
    if (timeline.length === 0) return;
    setCurrentStep((prev) => {
      if (prev >= timeline.length - 1) return 0;
      return prev;
    });
    setIsPlaying(true);

    if (intervalRef.current) clearTimeout(intervalRef.current);

    const dynamicInterval = () => {
      intervalRef.current = setTimeout(() => {
        setCurrentStep((prev) => {
          if (prev >= timeline.length - 1) {
            stopPlayback();
            return prev;
          }
          return prev + 1;
        });
        if (intervalRef.current !== null) {
          dynamicInterval();
        }
      }, getIntervalMs());
    };
    dynamicInterval();
  }, [timeline, stopPlayback, getIntervalMs]);

  const pause = useCallback(() => stopPlayback(), [stopPlayback]);

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

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearTimeout(intervalRef.current);
    };
  }, []);

  const currentSnapshot = timeline.length > 0 ? timeline[currentStep] : null;
  const totalSteps = timeline.length;
  const meta = TREE_ALGORITHMS[algorithm];
  const totalNodes = currentSnapshot ? currentSnapshot.nodes.length : 0;

  return {
    algorithm,
    inputValue,
    speed,
    isPlaying,
    currentStep,
    totalSteps,
    currentSnapshot,
    timeline,
    meta,
    totalNodes,

    setAlgorithm: (a) => {
      stopPlayback();
      setAlgorithm(a);
    },
    setInputValue: (n) => {
      stopPlayback();
      setInputValue(n);
    },
    setSpeed,

    play,
    pause,
    stepForward,
    stepBack,
    reset,
    precompute,
  };
}
