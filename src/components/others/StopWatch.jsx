import { Pause, Play, RotateCw } from "lucide-react";
import React, { useState, useEffect } from "react";

const Stopwatch = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let intervalId;
    if (isRunning) {
      intervalId = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(intervalId);
  }, [isRunning]);

  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
  };

  const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="flex items-center gap-2 text-[11px] font-mono text-muted-foreground bg-muted/40 border border-border/60 rounded-lg px-2.5 py-0.5 h-7 select-none">
      {/* Play/Pause Button */}
      <button
        onClick={() => setIsRunning(!isRunning)}
        className="focus:outline-none text-muted-foreground hover:text-foreground transition-colors cursor-pointer flex items-center justify-center"
        title={isRunning ? "Pause stopwatch" : "Start stopwatch"}
      >
        {isRunning ? (
          <Pause size={10} className="fill-current text-indigo-500 dark:text-indigo-400" />
        ) : (
          <Play size={10} className="fill-current" />
        )}
      </button>

      {/* Digital Display */}
      <span className="tracking-wider tabular-nums font-bold text-foreground min-w-[52px] text-center">
        {formatTime(time)}
      </span>

      {/* Reset Button */}
      {(time > 0 || isRunning) && (
        <button
          onClick={handleReset}
          className="focus:outline-none text-muted-foreground hover:text-rose-500 transition-colors cursor-pointer flex items-center justify-center animate-fade-in"
          title="Reset stopwatch"
        >
          <RotateCw size={9} className="hover:rotate-180 transition-transform duration-500" />
        </button>
      )}
    </div>
  );
};

export default Stopwatch;
