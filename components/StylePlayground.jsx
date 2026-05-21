"use client";

import React, { useState } from 'react';
import { LazyMotion, domAnimation, m, AnimatePresence } from 'framer-motion';

export default function StylePlayground() {
  const [activeView, setActiveView] = useState('bento');
  
  const views = [
    { id: 'bento', label: 'Estructura Bento' },
    { id: 'scroll', label: 'Línea de Ensamblaje' },
    { id: 'stack', label: 'Capas de Autor' },
    { id: 'god', label: 'Modo Dios' },
  ];

  return (
    <LazyMotion features={domAnimation}>
      <section className="min-h-screen bg-black py-24 px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-8 text-white tracking-tight">
              Tu visión, nuestro laboratorio.
            </h2>
            
            <div className="flex flex-wrap justify-center gap-2 p-1.5 bg-zinc-900/50 backdrop-blur rounded-2xl border border-white/5">
              {views.map((v) => (
                <button
                  key={v.id}
                  onClick={() => setActiveView(v.id)}
                  className={`px-6 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    activeView === v.id 
                      ? 'bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.2)]' 
                      : 'text-zinc-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {v.label}
                </button>
              ))}
            </div>
          </div>

          <div className="relative min-h-[600px] w-full rounded-3xl border border-white/10 bg-zinc-950 overflow-hidden p-8">
            <AnimatePresence mode="wait">
              {activeView === 'bento' && (
                <m.div 
                  key="bento"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="grid grid-cols-1 md:grid-cols-3 gap-4 h-full"
                >
                  <div className="bg-zinc-900 rounded-2xl p-6 md:col-span-2 hover:bg-zinc-800 transition-colors h-[300px]">Proyecto A</div>
                  <div className="bg-zinc-900 rounded-2xl p-6 hover:bg-zinc-800 transition-colors h-[300px]">Proyecto B</div>
                  <div className="bg-zinc-900 rounded-2xl p-6 hover:bg-zinc-800 transition-colors h-[250px]">Proyecto C</div>
                  <div className="bg-zinc-900 rounded-2xl p-6 md:col-span-2 hover:bg-zinc-800 transition-colors h-[250px]">Proyecto D</div>
                </m.div>
              )}
              
              {activeView === 'scroll' && (
                <m.div 
                  key="scroll"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  className="flex gap-8 overflow-x-auto pb-8 h-[500px] items-center px-4"
                >
                  {[1, 2, 3, 4, 5].map(i => (
                    <div key={i} className="min-w-[400px] h-[400px] bg-zinc-900 rounded-2xl flex-shrink-0 border border-zinc-800 flex items-center justify-center text-zinc-600 text-2xl font-bold shadow-xl">
                      Industrial {i}
                    </div>
                  ))}
                </m.div>
              )}

              {activeView === 'stack' && (
                <m.div 
                  key="stack"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="relative h-[500px] flex items-center justify-center"
                >
                  {[3, 2, 1].map((i) => (
                    <div 
                      key={i} 
                      className="absolute w-80 h-96 bg-zinc-800 rounded-2xl border border-zinc-700 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex items-center justify-center text-4xl text-zinc-600 font-bold"
                      style={{ transform: `rotate(${(i - 2) * 5}deg) translateY(${(i - 1) * 20}px)`, zIndex: 10 - i }}
                    >
                      Capa {i}
                    </div>
                  ))}
                </m.div>
              )}

              {activeView === 'god' && (
                <m.div 
                  key="god"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="h-[500px] flex flex-col items-center justify-center text-zinc-500"
                >
                  <div className="w-64 h-64 border border-zinc-800 rounded-full animate-[spin_10s_linear_infinite] flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-purple-500/20 mix-blend-overlay"></div>
                    WebGL Placeholder
                  </div>
                  <p className="mt-8 text-sm">Cambia materiales en tiempo real.</p>
                </m.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </LazyMotion>
  );
}