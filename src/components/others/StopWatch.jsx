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
    const hours = Math.floor(totalSeconds / 360);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };


  return (
    <div className="flex items-center border-2 rounded-2xl px-2 py-1 mx-2">
      {/* The Digital Display */}
      <div className="text-sm">
        {isRunning ? (
          <Pause
            onClick={() => {
              setIsRunning(false);
            }}
            className="cursor-pointer text-gray-700 mr-2"
            size={15}
          />
        ) : (
          <Play
            onClick={() => {
              setIsRunning(true);
            }}
            className="cursor-pointer text-gray-700 mr-2"
            size={15}
          />
        )}
      </div>
      <div className=" text-black/ tracking-wider">
        {formatTime(time)}
      </div>
      {time || isRunning ? (
        <RotateCw
          size={15}
          className="ml-2 text-gray-700 "
          onClick={handleReset}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default Stopwatch;
