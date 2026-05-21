"use client";

import React, { useEffect, useRef, useState } from 'react';
import { LazyMotion, domAnimation, m, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ChevronLeft, Maximize, Activity, Cpu, ShieldAlert, X, Settings2 } from 'lucide-react';
import dynamic from 'next/dynamic';

// Tipo de letra principal: Inter o Roboto Mono. En tailwind tenemos font-sans y font-mono.
// Usaremos font-sans (que suele ser Inter) para titulares masivos y font-mono para data industrial.

// Crosshair Cursor
function CrosshairCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const scale = useMotionValue(1);
  const isHovering = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);
  const scaleSpring = useSpring(scale, springConfig);

  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      if (target.tagName.toLowerCase() === 'button' || target.tagName.toLowerCase() === 'a' || target.closest('button') || target.closest('a') || target.closest('.interactive-target')) {
        scale.set(1.5);
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
      className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
        scale: scaleSpring,
        translateX: '-50%',
        translateY: '-50%'
      }}
    >
      <div className="relative flex items-center justify-center w-8 h-8">
        <div className="absolute w-full h-[1px] bg-[#ff3300]" />
        <div className="absolute h-full w-[1px] bg-[#ff3300]" />
        <m.div 
          className="absolute w-2 h-2 border border-[#ff3300]"
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />
      </div>
    </m.div>
  );
}

// Stats Counter
const StatItem = ({ label, value, suffix = "" }) => {
  return (
    <div className="flex flex-col border-l border-white/10 pl-6 interactive-target relative group overflow-hidden">
      <div className="absolute inset-0 bg-[#ff3300]/0 group-hover:bg-[#ff3300]/5 transition-colors duration-500" />
      <span className="font-mono text-xs text-[#ff3300] tracking-[0.2em] uppercase mb-4 opacity-70 group-hover:opacity-100 transition-opacity">[{label}]</span>
      <div className="text-5xl md:text-7xl font-black tracking-tighter text-white/90">
        {value}<span className="text-[#ff3300]">{suffix}</span>
      </div>
    </div>
  );
};

export default function FerroTechDemo() {
  const scrollContainerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: scrollContainerRef,
    offset: ["start end", "end start"]
  });

  // SVG Assembly scroll values for the CNC section
  const piece1Y = useTransform(scrollYProgress, [0, 0.4], [-200, 0]);
  const piece2Y = useTransform(scrollYProgress, [0, 0.4], [200, 0]);
  const pathLength = useTransform(scrollYProgress, [0.1, 0.6], [0, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.6, 0.9], [0, 1, 1, 0.1]);

  // Parallax for Hero
  const { scrollYProgress: heroScroll } = useScroll();
  const heroY = useTransform(heroScroll, [0, 1], [0, 300]);
  const heroOpacity = useTransform(heroScroll, [0, 0.3], [1, 0]);

  return (
    <LazyMotion features={domAnimation}>
      <style dangerouslySetInnerHTML={{__html: `body { cursor: none !important; }`}} />
      <main className="bg-[#030303] text-white font-sans selection:bg-[#ff3300] selection:text-white min-h-screen relative overflow-hidden">
        
        <CrosshairCursor />

        {/* FLOATING BACK BUTTON */}
        <div className="fixed bottom-8 right-8 z-[100]">
          <Link href="/">
            <m.div 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="flex items-center justify-center w-14 h-14 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-white/50 hover:text-white hover:border-white/30 transition-colors shadow-2xl group cursor-none interactive-target"
            >
              <ChevronLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
            </m.div>
          </Link>
        </div>

        {/* HEADER */}
        <header className="fixed top-0 left-0 w-full p-8 z-40 flex justify-between items-center mix-blend-difference pointer-events-none">
          <div className="font-black text-2xl tracking-tighter uppercase text-white pointer-events-auto cursor-none">
            FerroTech<span className="text-[#ff3300]">.</span>
          </div>
          <div className="font-mono text-xs text-white/70 tracking-widest flex items-center gap-3 border border-white/20 px-4 py-2 rounded-none backdrop-blur-md bg-black/20 pointer-events-auto">
            <Activity className="w-3 h-3 animate-pulse text-[#ff3300]" />
            <span>SISTEMA EN LÍNEA</span>
          </div>
        </header>

        {/* MEGA HERO BRUTALISTA */}
        <section className="relative h-screen w-full flex flex-col justify-center overflow-hidden">
          {/* Fondo Parallax */}
          <m.div 
            style={{ y: heroY, opacity: heroOpacity }}
            className="absolute inset-0 z-0"
          >
            <div className="absolute inset-0 bg-[#030303]/60 mix-blend-multiply z-10" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#030303]/40 to-[#030303] z-10" />
            <video 
              autoPlay 
              muted 
              loop 
              playsInline
              className="w-full h-full object-cover grayscale opacity-40"
              src="https://cdn.pixabay.com/video/2021/04/13/71000-536968038_large.mp4" 
            />
          </m.div>

          {/* Grid Overlay */}
          <div className="absolute inset-0 z-[5] bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:100px_100px] pointer-events-none" />

          <div className="relative z-10 px-6 md:px-12 max-w-[100rem] mx-auto w-full">
            <m.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-[2px] bg-[#ff3300]" />
                <span className="font-mono text-xs tracking-[0.3em] uppercase text-[#ff3300]">Ingeniería Pesada</span>
              </div>
              
              <h1 className="text-[5rem] md:text-[10rem] lg:text-[14rem] font-black uppercase tracking-tighter leading-[0.75] mb-12">
                Forjando <br />
                <span className="text-transparent" style={{ WebkitTextStroke: '2px white' }}>El Futuro.</span>
              </h1>
              
              <p className="max-w-2xl text-xl md:text-2xl text-white/60 font-light leading-relaxed font-sans">
                Tolerancias milimétricas. Capacidad de producción a escala masiva. Somos el núcleo de las estructuras más exigentes del sector industrial.
              </p>
            </m.div>
          </div>

          {/* Scroll Indicator */}
          <m.div 
            className="absolute bottom-12 left-6 md:left-12 z-20 font-mono text-[10px] tracking-widest uppercase text-white/40 flex items-center gap-4"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="w-[1px] h-12 bg-gradient-to-b from-[#ff3300] to-transparent" />
            Scroll para iniciar secuencia
          </m.div>
        </section>

        {/* MARQUEE GIGANTE */}
        <section className="py-12 bg-[#ff3300] overflow-hidden whitespace-nowrap flex relative z-20 border-y border-white/20">
          <m.div 
            className="flex gap-16 items-center"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 15, ease: "linear", repeat: Infinity }}
          >
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex items-center gap-16">
                <span className="text-4xl md:text-7xl font-black text-[#030303] uppercase tracking-tighter">Corte Láser</span>
                <Settings2 className="w-12 h-12 text-[#030303]" />
                <span className="text-4xl md:text-7xl font-black text-transparent uppercase tracking-tighter" style={{ WebkitTextStroke: '2px #030303' }}>Soldadura Robótica</span>
                <Cpu className="w-12 h-12 text-[#030303]" />
                <span className="text-4xl md:text-7xl font-black text-[#030303] uppercase tracking-tighter">Plegado CNC</span>
                <Activity className="w-12 h-12 text-[#030303]" />
              </div>
            ))}
          </m.div>
        </section>

        {/* STATS SECTION */}
        <section className="py-32 px-6 md:px-12 max-w-[100rem] mx-auto relative z-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8">
            <StatItem label="Acero Procesado Anual" value="12" suffix="K+" />
            <StatItem label="Tolerancia Máxima" value="0.05" suffix="mm" />
            <StatItem label="Proyectos Entregados" value="850" suffix="+" />
          </div>
        </section>

        {/* INGENIERÍA CNC (Scroll Driven SVG) */}
        <section ref={scrollContainerRef} className="py-48 px-6 relative bg-[#080808] border-y border-white/5 overflow-hidden">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,rgba(255,51,0,0.1)_0%,transparent_70%)] pointer-events-none" />
          
          <div className="max-w-[100rem] mx-auto flex flex-col lg:flex-row items-center gap-24 relative z-10">
            
            <div className="flex-1">
              <span className="font-mono text-[#ff3300] tracking-[0.2em] uppercase text-xs mb-6 block border border-[#ff3300]/30 inline-block px-3 py-1">Capacidad Técnica // 01</span>
              <h2 className="text-5xl md:text-7xl lg:text-[6rem] font-black uppercase tracking-tighter mb-8 leading-[0.9]">
                Precisión <br/> <span className="text-white/30">Absoluta.</span>
              </h2>
              <p className="text-white/60 font-sans text-lg md:text-2xl leading-relaxed max-w-xl mb-12 font-light">
                Nuestros centros de mecanizado de 5 ejes esculpen el acero con una exactitud quirúrgica. Desde prototipos aeronáuticos hasta ensamblajes estructurales masivos.
              </p>
              
              <ul className="space-y-6 font-mono text-sm tracking-wide text-white/50">
                <li className="flex items-center gap-4">
                  <div className="w-1.5 h-1.5 bg-[#ff3300]" /> Torneado y Fresado CNC Multitarea
                </li>
                <li className="flex items-center gap-4">
                  <div className="w-1.5 h-1.5 bg-[#ff3300]" /> Inspección Tridimensional (CMM)
                </li>
                <li className="flex items-center gap-4">
                  <div className="w-1.5 h-1.5 bg-[#ff3300]" /> Materiales: Titanio, Inconel, Acero Balístico
                </li>
              </ul>
            </div>

            <div className="flex-1 w-full relative h-[500px] lg:h-[700px] flex items-center justify-center border border-white/5 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] group interactive-target">
              
              {/* Esquinas Técnicas */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#ff3300]/50" />
              <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#ff3300]/50" />
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#ff3300]/50" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#ff3300]/50" />

              {/* Plano Técnico Animado por Scroll */}
              <m.svg 
                viewBox="0 0 500 500" 
                className="w-full h-full max-w-lg stroke-[#ff3300] stroke-[1px] fill-transparent drop-shadow-[0_0_15px_rgba(255,51,0,0.2)]"
                style={{ opacity }}
              >
                {/* Ejes de Referencia */}
                <line x1="0" y1="250" x2="500" y2="250" stroke="rgba(255,255,255,0.1)" strokeDasharray="4 4" />
                <line x1="250" y1="0" x2="250" y2="500" stroke="rgba(255,255,255,0.1)" strokeDasharray="4 4" />
                
                {/* Pieza Superior */}
                <m.g style={{ y: piece1Y }}>
                  <m.path 
                    d="M 150 120 L 350 120 L 320 230 L 180 230 Z" 
                    style={{ pathLength }} 
                    strokeWidth="2"
                  />
                  <m.circle cx="250" cy="175" r="25" style={{ pathLength }} strokeWidth="1.5" />
                  <m.circle cx="200" cy="175" r="8" style={{ pathLength }} />
                  <m.circle cx="300" cy="175" r="8" style={{ pathLength }} />
                </m.g>
                
                {/* Pieza Inferior */}
                <m.g style={{ y: piece2Y }}>
                  <m.path 
                    d="M 160 270 L 340 270 L 340 400 L 160 400 Z" 
                    style={{ pathLength }} 
                    strokeWidth="2"
                  />
                  {/* Patrón interior de la pieza */}
                  <m.path 
                    d="M 200 270 L 200 400 M 250 270 L 250 400 M 300 270 L 300 400" 
                    stroke="rgba(255,51,0,0.4)"
                    style={{ pathLength }} 
                  />
                  <m.rect x="180" y="300" width="140" height="70" style={{ pathLength }} strokeDasharray="4 2" />
                </m.g>
              </m.svg>

              <div className="absolute bottom-6 right-6 font-mono text-[10px] text-[#ff3300] text-right">
                <p>SIM_RENDER_V1.4</p>
                <p>TOL: ±0.005mm</p>
              </div>
            </div>

          </div>
        </section>

        {/* GALERÍA DE PROYECTOS BRUTALISTA */}
        <section className="py-32 px-6 max-w-[100rem] mx-auto">
          <div className="flex justify-between items-end mb-16">
            <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter">Obras <br/> Recientes.</h2>
            <Link href="#" className="font-mono text-sm tracking-widest uppercase border-b border-[#ff3300] text-[#ff3300] pb-1 hover:text-white transition-colors cursor-none interactive-target">
              Ver Todos [14]
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="group relative overflow-hidden aspect-[4/3] bg-zinc-900 cursor-none interactive-target">
              <img src="https://loremflickr.com/1000/1000/welding,steel/all?lock=1" className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700" alt="Estructura metálica" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#030303] to-transparent opacity-80" />
              <div className="absolute bottom-8 left-8">
                <span className="font-mono text-xs text-[#ff3300] tracking-widest mb-2 block">01 / ESTRUCTURAS</span>
                <h3 className="text-3xl font-black uppercase tracking-tight">Pabellón Nexus</h3>
              </div>
            </div>
            <div className="group relative overflow-hidden aspect-[4/3] bg-zinc-900 cursor-none interactive-target md:mt-24">
              <img src="https://loremflickr.com/1000/1000/welding,steel/all?lock=2" className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700" alt="Soldadura" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#030303] to-transparent opacity-80" />
              <div className="absolute bottom-8 left-8">
                <span className="font-mono text-xs text-[#ff3300] tracking-widest mb-2 block">02 / COMPONENTES</span>
                <h3 className="text-3xl font-black uppercase tracking-tight">Turbinas Eólicas XT</h3>
              </div>
            </div>
          </div>
        </section>

        {/* BRAND CTA FOOTER */}
        <section className="py-48 lg:py-64 bg-[#ff3300] relative flex flex-col items-center text-center overflow-hidden interactive-target">
          <div className="absolute inset-0 bg-[url('https://loremflickr.com/1000/1000/welding,steel/all?lock=3')] bg-cover bg-center opacity-10 mix-blend-multiply pointer-events-none" />
          
          <h2 className="text-5xl md:text-[8rem] font-black uppercase tracking-tighter mb-16 relative z-10 text-[#030303] leading-[0.85]">
            Hablemos de <br/> Tu Proyecto.
          </h2>
          
          <a
            href="mailto:presupuestos@ferrotech.com"
            className="group relative px-12 py-6 md:px-20 md:py-8 border-4 border-[#030303] font-black text-2xl tracking-widest uppercase overflow-hidden bg-[#ff3300] z-10 inline-block cursor-none"
          >
            <span className="relative z-10 text-[#030303] group-hover:text-[#ff3300] transition-colors duration-300">
              Solicitar Cotización
            </span>
            <m.div 
              className="absolute inset-0 z-0 origin-left bg-[#030303]"
              initial={{ scaleX: 0 }}
              whileHover={{ scaleX: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          </a>
        </section>

      </main>
    </LazyMotion>
  );
}
