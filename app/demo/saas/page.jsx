"use client";

import React, { useState, useEffect } from 'react';
import { LazyMotion, domAnimation, m, AnimatePresence, useSpring, useMotionValue, useTransform } from 'framer-motion';
import Link from 'next/link';
import { ChevronLeft, Zap, Box, Terminal, Activity, Lock, Database, ArrowRight } from 'lucide-react';

// Custom Cursor
function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const scale = useMotionValue(1);
  const isHovering = useMotionValue(0);

  const springConfig = { damping: 30, stiffness: 400, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);
  const scaleSpring = useSpring(scale, springConfig);
  const hoverSpring = useSpring(isHovering, springConfig);

  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX - 6);
      cursorY.set(e.clientY - 6);
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      if (target.tagName.toLowerCase() === 'button' || target.tagName.toLowerCase() === 'a' || target.closest('.interactive-el')) {
        scale.set(3);
        isHovering.set(1);
      } else {
        scale.set(1);
        isHovering.set(0);
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY, scale, isHovering]);

  return (
    <m.div
      className="fixed top-0 left-0 w-3 h-3 rounded-full border border-purple-500 pointer-events-none z-[9999] mix-blend-screen"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
        scale: scaleSpring,
        backgroundColor: useTransform(hoverSpring, [0, 1], ['rgba(168, 85, 247, 0)', 'rgba(168, 85, 247, 0.5)'])
      }}
    />
  );
}

// Glowing Card Component
const FeatureCard = ({ icon: Icon, title, desc, delay, colSpan = 1 }) => (
  <m.div 
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.5, delay }}
    className={`group relative rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.03] to-transparent p-8 overflow-hidden interactive-el cursor-none ${colSpan === 2 ? 'md:col-span-2' : ''}`}
  >
    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-500/0 via-transparent to-transparent group-hover:from-purple-500/10 transition-colors duration-500" />
    <div className="relative z-10 flex flex-col h-full">
      <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:border-purple-500/50 group-hover:shadow-[0_0_15px_rgba(168,85,247,0.3)] transition-all duration-300">
        <Icon className="w-5 h-5 text-zinc-400 group-hover:text-purple-400 transition-colors" />
      </div>
      <h3 className="text-xl font-medium text-white mb-3 tracking-tight">{title}</h3>
      <p className="text-sm text-zinc-400 leading-relaxed mt-auto font-light">{desc}</p>
    </div>
  </m.div>
);

export default function SaasDemo() {
  return (
    <LazyMotion features={domAnimation}>
      <style dangerouslySetInnerHTML={{__html: `body { cursor: none !important; }`}} />
      <main className="bg-black text-white font-sans selection:bg-purple-500 selection:text-white min-h-screen relative overflow-hidden">
        
        <CustomCursor />

        {/* Ambient Background Glow */}
        <div className="absolute top-[-20%] left-[20%] w-[60%] h-[40%] bg-purple-900/20 rounded-full blur-[150px] pointer-events-none mix-blend-screen" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-900/20 rounded-full blur-[150px] pointer-events-none mix-blend-screen" />
        
        {/* Abstract Grid Line Pattern */}
        <div className="absolute inset-0 z-0 opacity-[0.15] pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

        {/* FLOATING BACK BUTTON */}
        <div className="fixed bottom-8 right-8 z-[100] interactive-el">
          <Link href="/">
            <m.div 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="flex items-center justify-center w-14 h-14 rounded-full bg-zinc-900 border border-white/10 backdrop-blur-md text-white hover:bg-white hover:text-black transition-colors shadow-2xl group cursor-none"
            >
              <ChevronLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
            </m.div>
          </Link>
        </div>

        {/* TOP BAR */}
        <header className="fixed top-0 left-0 w-full p-6 z-50 flex justify-between items-center backdrop-blur-md border-b border-white/10">
          <div className="flex items-center gap-3 interactive-el cursor-none">
            <div className="w-8 h-8 rounded bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center shadow-[0_0_15px_rgba(168,85,247,0.4)]">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold tracking-tight text-lg">NEXUS</span>
          </div>
          <div className="hidden md:flex gap-8 text-sm font-medium text-zinc-400">
            <span className="hover:text-white transition-colors cursor-none interactive-el">Plataforma</span>
            <span className="hover:text-white transition-colors cursor-none interactive-el">Soluciones</span>
            <span className="hover:text-white transition-colors cursor-none interactive-el">Precios</span>
          </div>
          <button className="bg-white text-black px-5 py-2 rounded-full text-sm font-bold hover:scale-105 transition-transform cursor-none interactive-el">
            Dashboard
          </button>
        </header>

        {/* HERO SECTION */}
        <section className="relative pt-48 pb-32 px-6 max-w-7xl mx-auto flex flex-col items-center text-center z-10">
          <m.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-sm cursor-none interactive-el group"
          >
            <span className="w-2 h-2 rounded-full bg-purple-500 group-hover:shadow-[0_0_8px_rgba(168,85,247,0.8)] transition-shadow" />
            <span className="text-xs font-mono text-zinc-300 tracking-tight">Nexus v4.0 is now available</span>
            <ArrowRight className="w-3 h-3 text-zinc-400 group-hover:translate-x-1 transition-transform" />
          </m.div>

          <m.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8 }}
            className="text-6xl md:text-[7rem] font-bold tracking-tighter leading-[0.9] mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white via-white/90 to-zinc-500"
          >
            Infraestructura <br/> sin límites.
          </m.h1>

          <m.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-xl md:text-2xl text-zinc-400 max-w-2xl font-light leading-relaxed mb-12"
          >
            Despliega aplicaciones globales en milisegundos. Escalabilidad automática, latencia ultra-baja y control total desde la línea de comandos.
          </m.p>

          <m.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 w-full justify-center"
          >
            <button className="bg-white text-black px-8 py-4 rounded-full font-bold text-sm md:text-base hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2 cursor-none interactive-el">
              Empezar gratis
            </button>
            <button className="bg-zinc-900 border border-white/10 text-white px-8 py-4 rounded-full font-bold text-sm md:text-base hover:bg-zinc-800 transition-colors cursor-none interactive-el flex items-center justify-center gap-2">
              <Terminal className="w-4 h-4 text-zinc-400"/> Ver Documentación
            </button>
          </m.div>

          {/* Fake CLI Mockup */}
          <m.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 1, type: "spring" }}
            className="mt-24 w-full max-w-4xl bg-[#0a0a0a] rounded-2xl border border-white/10 shadow-[0_0_50px_rgba(168,85,247,0.1)] overflow-hidden text-left"
          >
            <div className="bg-[#111] border-b border-white/5 p-4 flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
              <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
            </div>
            <div className="p-6 font-mono text-sm md:text-base leading-loose">
              <div className="flex gap-4 text-zinc-500">
                <span>~</span>
                <span className="text-zinc-300">nexus deploy --prod</span>
              </div>
              <div className="text-purple-400 mt-2">→ Analyzing project dependencies...</div>
              <div className="text-zinc-400">→ Building Edge Functions [4/4]</div>
              <div className="text-zinc-400">→ Optimizing Static Assets (982kb)</div>
              <div className="text-emerald-400 mt-4 flex items-center gap-2">
                <CheckIcon /> Deployment successful! (1.2s)
              </div>
              <div className="text-blue-400 mt-2 underline decoration-blue-400/30">https://nexus-app-prod.edge.net</div>
            </div>
          </m.div>
        </section>

        {/* FEATURES BENTO GRID */}
        <section className="py-32 px-6 max-w-7xl mx-auto relative z-10">
          <div className="mb-16">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Arquitectura <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">Next-Gen</span></h2>
            <p className="text-zinc-400 font-light max-w-lg">Hemos reconstruido la capa de red desde cero para ofrecer rendimiento sin compromisos a escala global.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FeatureCard 
              icon={Activity} 
              title="Edge Computing" 
              desc="Ejecuta código en milisegundos, más cerca de tus usuarios finales. Red global con 300+ nodos de presencia." 
              delay={0}
            />
            <FeatureCard 
              icon={Database} 
              title="Base de Datos Distribuida" 
              desc="Replicación global automática. Consistencia fuerte sin comprometer la latencia de lectura." 
              delay={0.1}
            />
            <FeatureCard 
              icon={Lock} 
              title="Seguridad Zero Trust" 
              desc="Aislamiento a nivel de microVM. Protección DDoS L7 y encriptación end-to-end por defecto." 
              delay={0.2}
            />
            
            <FeatureCard 
              icon={Box} 
              title="Integración Continua Inmersiva" 
              desc="Entornos de previsualización para cada rama. Colabora en tiempo real con tu equipo directamente sobre el código desplegado, con métricas de rendimiento inyectadas en cada PR." 
              delay={0.3}
              colSpan={2}
            />
            <FeatureCard 
              icon={Zap} 
              title="WebSockets Nativos" 
              desc="Conexiones persistentes gestionadas en el edge. Ideal para aplicaciones colaborativas y tiempo real." 
              delay={0.4}
            />
          </div>
        </section>

        {/* CTA */}
        <section className="py-32 px-6 border-t border-white/10 bg-gradient-to-b from-transparent to-purple-900/10 relative z-10 flex flex-col items-center text-center">
          <h2 className="text-4xl md:text-7xl font-bold tracking-tighter mb-8">Construye el futuro.</h2>
          <p className="text-xl text-zinc-400 font-light mb-12 max-w-xl">Únete a los equipos de ingeniería más innovadores y acelera tu ciclo de desarrollo hoy mismo.</p>
          <button className="bg-white text-black px-10 py-5 rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-[0_0_30px_rgba(255,255,255,0.2)] cursor-none interactive-el">
            Crear Cuenta Gratuita
          </button>
        </section>

      </main>
    </LazyMotion>
  );
}

const CheckIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);
