"use client"

import React, { useEffect, useState } from "react"
import { motion, useAnimation } from "framer-motion"

const Loading = () => {
  const [progress, setProgress] = useState(0)
  const controls = useAnimation()

  useEffect(() => {
    // Total duration in seconds (12s total)
    const duration = 12 
    const intervalTime = 50 // Update every 50ms
    
    // Total number of updates = (12 * 1000) / 50 = 240 steps
    const totalSteps = (duration * 1000) / intervalTime
    const increment = 100 / totalSteps

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment
        if (next >= 100) {
          clearInterval(timer)
          return 100
        }
        return next
      })
    }, intervalTime)

    return () => clearInterval(timer)
  }, [])

  // Sync the framer motion controls with the progress state
  useEffect(() => {
    controls.start({ width: `${progress}%` })
  }, [progress, controls])

  return (
    <div className="fixed inset-0 bg-zinc-950 z-50 flex flex-col items-center justify-center">
      <div className="w-72 relative">
        
        {/* Progress Bar Container */}
        <div className="h-2.5 w-full bg-zinc-800 rounded-full overflow-hidden relative border border-zinc-700/50">
          
          {/* Background Moving Shine */}
          <motion.div
            className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent"
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{
              repeat: Infinity,
              duration: 3,
              ease: "linear",
            }}
          />

          {/* Actual Progress Fill */}
          <motion.div
            className="h-full bg-linear-to-r from-indigo-500 to-blue-500 shadow-[0_0_15px_rgba(79,70,229,0.5)]"
            initial={{ width: 0 }}
            animate={controls}
            transition={{ ease: "linear", duration: 0.1 }}
          />
        </div>

        {/* Status Section */}
        <div className="mt-6 flex flex-col items-center gap-1">
          {/* Percentage */}
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-3xl font-black text-white tracking-tighter"
          >
            {Math.round(progress)}%
          </motion.span>

          {/* Animated Loading Text */}
          <motion.span
            className="text-zinc-500 text-xs font-medium uppercase tracking-[0.2em]"
            animate={{
              opacity: [0.4, 1, 0.4],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            System Initialization
          </motion.span>
        </div>

      </div>
    </div>
  )
}

export default Loading