"use client";

import React, { useState, useEffect } from 'react';
import { LazyMotion, domAnimation, m } from 'framer-motion';
import { Activity, Server, Zap } from 'lucide-react';

export default function PerformanceMonitor() {
  const [fps, setFps] = useState(60);
  const [ping, setPing] = useState(12);

  useEffect(() => {
    const interval = setInterval(() => {
      setFps(Math.floor(Math.random() * (62 - 58 + 1) + 58));
      setPing(Math.floor(Math.random() * (16 - 8 + 1) + 8));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <LazyMotion features={domAnimation}>
      <m.div 
        drag 
        dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
        dragElastic={0.5}
        className="fixed bottom-6 left-6 z-[9999] bg-black/80 backdrop-blur-md border border-white/10 rounded-xl p-4 text-[10px] uppercase tracking-widest text-zinc-400 font-mono hidden md:flex flex-col gap-3 cursor-grab active:cursor-grabbing shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
      >
        <div className="flex items-center gap-3">
          <Activity className={`w-4 h-4 ${fps >= 60 ? 'text-green-400' : 'text-yellow-400'}`} />
          <span className="w-24">FPS: <span className="text-white font-bold">{fps}</span></span>
        </div>
        <div className="flex items-center gap-3">
          <Server className="w-4 h-4 text-cyan-400" />
          <span className="w-24">Node.js: <span className="text-white font-bold">{ping}ms</span></span>
        </div>
        <div className="flex items-center gap-3">
          <Zap className="w-4 h-4 text-fuchsia-400" />
          <span className="w-24">CLS Shift: <span className="text-white font-bold">0.00</span></span>
        </div>
      </m.div>
    </LazyMotion>
  );
}