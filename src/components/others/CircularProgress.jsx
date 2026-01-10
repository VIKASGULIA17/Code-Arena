import React from "react";
import { data } from "react-router-dom";

const CircularProgress = ({ solved, total }) => {
  const radius = 40;
  const strokeWidth = 8;
  const circleWidth = 120;

  const circumference = 2 * Math.PI * radius;
  const percentage = (solved / total) * 100;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center">
      <svg
        width={circleWidth}
        height={circleWidth}
        viewBox={`0 0 ${circleWidth} ${circleWidth}`}
        className="-rotate-90 transition-all duration-500"
      >
        <defs>
          <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#4f46e5" />
            <stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>
        </defs>

        <circle
          cx={circleWidth / 2}
          cy={circleWidth / 2}
          r={radius}
          strokeWidth={strokeWidth}
          className="fill-none stroke-gray-100"
        />

        <circle
          cx={circleWidth / 2}
          cy={circleWidth / 2}
          r={radius}
          strokeWidth={strokeWidth}
          className="fill-none drop-shadow-md"
          stroke="url(#blueGradient)"
          style={{
            strokeDasharray: circumference,
            strokeDashoffset: offset,
            strokeLinecap: "round",
            transition: "stroke-dashoffset 1s ease-out",
          }}
        />
      </svg>

      <div className="absolute flex flex-col items-center justify-center text-center">
        <span className="text-3xl font-bold text-slate-800 font-sans">
          {solved}
        </span>
        <span className="text-[10px] font-medium text-slate-400 uppercase tracking-widest">
          Solved
        </span>
      </div>
    </div>
  );
};

export default function SessionCard() {
  const Data = [
    { difficulty: "Easy", solved: 50, total: 200, color: "bg-emerald-400",textColor:"text-emerald-500" },
    { difficulty: "Medium", solved: 100, total: 200, color: "bg-amber-400",textColor:"text-amber-500" },
    { difficulty: "Hard", solved: 20, total: 100, color: "bg-rose-400",textColor:"text-rose-500" },
  ];
  return (
    <div className="p-6 mt-10 bg-white rounded-2xl shadow-xl w-96 h-60">
      <h2 className="text-lg font-bold text-slate-800 mb-4">
        Session Progress
      </h2>
      <div className="flex items-center gap-6">
        <CircularProgress solved={42} total={100} />

        <div className="flex-1 space-y-3">
          {Data.map((obj, idx) => {
            const progressWidth = (obj.solved / obj.total) * 100;
            return (
              <div  key={idx} >
                <div className={`flex justify-between text-xs `}>
                  <span className={`${obj.textColor}`}>{obj.difficulty}</span>
                  <span>
                    {obj.solved}/{obj.total}
                  </span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-1.5">
                  <div
                    className={`${obj.color} h-1.5 rounded-full `}
                    style={{ width: `${progressWidth}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
