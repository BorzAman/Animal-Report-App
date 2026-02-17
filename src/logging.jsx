

import React, { useMemo, useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Rabbit, Activity } from "lucide-react";

export default function Logging() {
  // CONFIGURATION
  const width = 140;      // Width of the loop
  const height = 70;      // Height of the loop
  const speed = 2.5;      // Duration of one loop
  const steps = 300;      // Resolution
  const trailLength = 0.2; // Trail is 20% of the path

  // Viewbox dimensions
  const vbW = 340;
  const vbH = 180;
  const cx = vbW / 2;
  const cy = vbH / 2;

  // 1. Calculate figure-8 path points
  const { pathData, points } = useMemo(() => {
    const pts = [];
    for (let i = 0; i <= steps; i++) {
      const t = (i / steps) * Math.PI * 2;
      const x = cx + width * Math.sin(t);
      const y = cy + height * Math.sin(2 * t);
      pts.push({ x, y });
    }

    const d = pts.reduce((acc, p, i) => {
      return i === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`;
    }, "") + " Z";

    return { pathData: d, points: pts };
  }, []);

  // 2. Measure total path length
  const pathRef = useRef(null);
  const [totalLength, setTotalLength] = useState(0);

  useEffect(() => {
    if (pathRef.current) {
      setTotalLength(pathRef.current.getTotalLength());
    }
  }, []);

  // 3. RABBIT MOTION (Unshifted - Starts exactly at 0)
  const { xKeyframes, yKeyframes, scaleXKeyframes } = useMemo(() => {
    const x = points.map(p => p.x);
    const y = points.map(p => p.y);

    const scaleX = points.map((p, i) => {
      if (i === 0) return 1;
      const prev = points[i - 1];
      return p.x >= prev.x ? 1 : -1;
    });

    return { xKeyframes: x, yKeyframes: y, scaleXKeyframes: scaleX };
  }, [points]);

  // Trail dash calculations
  const trailDash = totalLength * trailLength;
  const trailGap = totalLength - trailDash;

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background-dark font-display text-white overflow-hidden">
      
      {/* --- BACKGROUND LAYERS --- */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519681393798-3828fb4090bb?q=80&w=2940&auto=format&fit=crop')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background-dark/95 to-background-dark"></div>
      <div className="absolute inset-0 bg-island-gradient opacity-20 animate-pulse"></div>

      {/* --- HUD CONTAINER --- */}
      <motion.div 
         initial={{ opacity: 0, scale: 0.9 }}
         animate={{ opacity: 1, scale: 1 }}
         className="relative z-10 glass-panel border border-white/10 p-12 rounded-[3rem] shadow-2xl flex flex-col items-center justify-center backdrop-blur-2xl bg-black/60"
      >
        
        {/* ANIMATION STAGE */}
        <div className="relative" style={{ width: vbW, height: vbH }}>
          <svg
            viewBox={`0 0 ${vbW} ${vbH}`}
            width={vbW}
            height={vbH}
            className="absolute inset-0 overflow-visible"
            fill="none"
          >
            {/* Hidden reference path for measuring */}
            <path ref={pathRef} d={pathData} stroke="none" fill="none" />

            {/* A. Animated Glowing Trail */}
            {totalLength > 0 && (
              <motion.path
                d={pathData}
                stroke="url(#trailGradient)"
                strokeWidth={3}
                strokeLinecap="round"
                fill="none"
                strokeDasharray={`${trailDash} ${trailGap}`}
                // FIX: Start offset at 'trailDash' so the trail appears behind the rabbit
                animate={{
                  strokeDashoffset: [trailDash, trailDash - totalLength],
                }}
                transition={{
                  duration: speed,
                  ease: "linear",
                  repeat: Infinity,
                }}
                style={{ filter: "drop-shadow(0px 0px 6px var(--color-primary))" }}
              />
            )}

            {/* Gradient Definition */}
            <defs>
              <linearGradient id="trailGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ee2b2b" stopOpacity={0} />
                <stop offset="50%" stopColor="#ee2b2b" stopOpacity={0.6} />
                <stop offset="100%" stopColor="#ff5555" stopOpacity={1} />
              </linearGradient>
            </defs>
          </svg>

          {/* B. Rabbit Icon Overlay */}
          <motion.div
            className="absolute left-0 top-0 text-primary drop-shadow-[0_0_15px_rgba(238,43,43,1)]"
            style={{ willChange: "transform" }}
            animate={{
              x: xKeyframes,
              y: yKeyframes,
              scaleX: scaleXKeyframes,
            }}
            transition={{
              duration: speed,
              ease: "linear",
              repeat: Infinity,
            }}
          >
            <div className="-ml-4 -mt-4 flex h-8 w-8 items-center justify-center">
              {/* fill-none ensures no black background or stroke issues */}
              <Rabbit className="h-7 w-7 fill-none" strokeWidth={2} />
            </div>
          </motion.div>

        </div>

        {/* --- STATUS TEXT --- */}
        <div className="flex flex-col items-center gap-3 mt-2">
          <motion.div
            className="flex items-center gap-2 text-xl font-bold tracking-tight text-white"
            animate={{ opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            Readying Pashu Jagarak
          </motion.div>
          
          <motion.div
            className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-primary"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <Activity className="h-3 w-3 animate-pulse" />
            Loading...
          </motion.div>
        </div>

      </motion.div>
    </div>
  );
}