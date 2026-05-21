"use client";

import React, { useEffect, useState } from "react";
import { LazyMotion, domAnimation, m, AnimatePresence } from "framer-motion";

const words = ["DISEÑO.", "IMPACTO.", "MARCAS.", "EXPERIENCIAS.", "CATÁLOGO."];

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [wordIdx, setWordIdx] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current += Math.floor(Math.random() * 12) + 4;
      if (current >= 100) {
        current = 100;
        clearInterval(interval);
        setTimeout(() => setIsLoading(false), 600);
      }
      setProgress(current);
    }, 80);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const wordInterval = setInterval(() => {
      setWordIdx((prev) => (prev + 1) % words.length);
    }, 300);
    return () => clearInterval(wordInterval);
  }, []);

  return (
    <LazyMotion features={domAnimation}>
      <AnimatePresence>
        {isLoading && (
          <m.div
            className="fixed inset-0 z-[9999] bg-[#050505] text-white overflow-hidden"
            initial={{ opacity: 1 }}
            exit={{ clipPath: "inset(0 0 100% 0)", opacity: 1 }}
            transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
          >
            <m.div
              className="absolute top-0 left-0 h-[2px] bg-white"
              style={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            />

            <div className="absolute top-8 left-8">
              <p className="text-[10px] uppercase tracking-[0.4em] text-zinc-600 font-mono">
                Elite Showroom
              </p>
            </div>
            <div className="absolute top-8 right-8 text-right">
              <p className="text-[10px] uppercase tracking-[0.4em] text-zinc-600 font-mono">
                ES / 2025
              </p>
            </div>

            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="relative flex items-baseline gap-2">
                <span
                  className="font-black leading-none text-white"
                  style={{ fontSize: "clamp(6rem, 20vw, 18rem)" }}
                >
                  {String(progress).padStart(2, "0")}
                </span>
                <span className="text-4xl md:text-6xl font-mono text-zinc-600">
                  %
                </span>
              </div>

              <div className="mt-8 h-8 overflow-hidden">
                <AnimatePresence mode="wait">
                  <m.p
                    key={wordIdx}
                    initial={{ y: 32 }}
                    animate={{ y: 0 }}
                    exit={{ y: -32 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="text-xs font-mono uppercase tracking-[0.5em] text-zinc-500"
                  >
                    {words[wordIdx]}
                  </m.p>
                </AnimatePresence>
              </div>
            </div>

            <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end">
              <div className="w-full bg-zinc-900 h-[1px] relative">
                <m.div
                  className="absolute top-0 left-0 h-full bg-zinc-600"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </LazyMotion>
  );
}