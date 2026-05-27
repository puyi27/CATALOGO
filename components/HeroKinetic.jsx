"use client";

import React, { useRef, useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { LazyMotion, domAnimation, m, AnimatePresence } from 'framer-motion';

const Canvas = dynamic(() => import('@react-three/fiber').then(mod => mod.Canvas), { ssr: false });
const Points = dynamic(() => import('@react-three/drei').then(mod => mod.Points), { ssr: false });
const PointMaterial = dynamic(() => import('@react-three/drei').then(mod => mod.PointMaterial), { ssr: false });

function Starfield(props) {
  const ref = useRef();
  const [sphere] = useState(() => {
    if (typeof window === 'undefined') return new Float32Array(0);
    const random = require('maath/random/dist/maath-random.esm');
    return random.inSphere(new Float32Array(5000), { radius: 1.5 });
  });

  useEffect(() => {
    const animate = () => {
      if (!ref.current) return;
      ref.current.rotation.x -= 0.001;
      ref.current.rotation.y -= 0.00067;
      requestAnimationFrame(animate);
    };
    const frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, []);

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
        <PointMaterial transparent color="#ffffff" size={0.004} sizeAttenuation={true} depthWrite={false} />
      </Points>
    </group>
  );
}

const words = ["Precisión Artesanal.", "Solvencia Algorítmica.", "Arquitectura Soberana.", "Lead Generation.", "Infraestructura."];

export default function HeroKinetic() {
  const [wordIndex, setWordIndex] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const gradientRef = useRef(null);

  useEffect(() => { setIsMounted(true); }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % words.length);
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if (!gradientRef.current) return;
      const x = 50 + (e.clientX / window.innerWidth - 0.5) * 20;
      const y = 50 + (e.clientY / window.innerHeight - 0.5) * 20;
      gradientRef.current.style.background = `radial-gradient(ellipse 80% 60% at ${x}% ${y}%, rgba(99,102,241,0.12) 0%, transparent 70%)`;
    };
    window.addEventListener('mousemove', handler, { passive: true });
    return () => window.removeEventListener('mousemove', handler);
  }, []);

  return (
    <LazyMotion features={domAnimation}>
      <section className="relative w-full h-screen bg-[#050505] flex items-center justify-center overflow-hidden">
        {isMounted && (
          <div className="absolute inset-0 z-0">
            <Canvas camera={{ position: [0, 0, 1] }}>
              <Starfield />
            </Canvas>
          </div>
        )}

        <div
          ref={gradientRef}
          className="absolute inset-0 z-[1] pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(99,102,241,0.12) 0%, transparent 70%)' }}
        />

        <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 mb-10 backdrop-blur-sm"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
            <span className="text-xs font-mono text-zinc-400 uppercase tracking-[0.25em]">
              Mitad Científicos. Mitad Artistas. — Alcalá de Guadaíra
            </span>
          </m.div>

          <m.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-[3.5rem] sm:text-[5rem] md:text-[7rem] lg:text-[9rem] font-black uppercase tracking-tighter leading-[0.82] text-white"
          >
            <span className="block">No vendemos</span>
            <span className="block">páginas web.</span>
            <span className="block relative overflow-hidden">
              <span className="relative">Vendemos</span>
              <span className="text-transparent ml-4" style={{ WebkitTextStroke: '2px rgba(255,255,255,0.3)' }}>activos digitales.</span>
            </span>
          </m.h1>

          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-10 flex items-center justify-center gap-3 text-zinc-500"
          >
            <span className="text-sm font-mono uppercase tracking-widest">Ingeniería</span>
            <div className="h-8 overflow-hidden relative w-48">
              <AnimatePresence mode="wait">
                <m.span
                  key={wordIndex}
                  initial={{ y: 32, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -32, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 flex items-center justify-start text-sm font-mono text-indigo-400 uppercase tracking-widest"
                >
                  {words[wordIndex]}
                </m.span>
              </AnimatePresence>
            </div>
          </m.div>

          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="mt-14 flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a
              href="#catalogo"
              className="group inline-flex items-center gap-2 bg-white text-black px-8 py-4 rounded-full font-bold text-sm uppercase tracking-widest hover:bg-zinc-100 transition-colors"
            >
              Ver el Catálogo
              <m.span 
                className="w-5 h-5 rounded-full bg-black flex items-center justify-center"
                whileHover={{ x: 2 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path d="M2 8L8 2M8 2H3M8 2V7" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </m.span>
            </a>
            <a
              href="#contacto"
              className="inline-flex items-center gap-2 border border-white/10 text-white px-8 py-4 rounded-full font-bold text-sm uppercase tracking-widest hover:border-white/30 hover:bg-white/5 transition-colors"
            >
              Solicitar Auditoría →
            </a>
          </m.div>

          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          >
            <span className="text-[9px] font-mono uppercase tracking-[0.4em] text-zinc-600">Scroll</span>
            <m.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-px h-10 bg-gradient-to-b from-zinc-600 to-transparent"
            />
          </m.div>
        </div>
      </section>
    </LazyMotion>
  );
}
