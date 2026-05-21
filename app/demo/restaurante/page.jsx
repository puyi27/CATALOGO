"use client";

import React, { useState, useEffect, useRef } from 'react';
import { LazyMotion, domAnimation, m, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { ChevronLeft, Utensils, Wine, Clock, MapPin } from 'lucide-react';

const SpotlightImage = dynamic(() => import('./SpotlightImage'), { ssr: false });

// Elegant Cursor
function CustomCursor() {
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
      cursorX.set(e.clientX - 10);
      cursorY.set(e.clientY - 10);
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      if (target.tagName.toLowerCase() === 'button' || target.tagName.toLowerCase() === 'a' || target.closest('.interactive-target')) {
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
      className="fixed top-0 left-0 w-5 h-5 rounded-full border border-white/50 mix-blend-difference pointer-events-none z-[9999]"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
        scale: scaleSpring,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(2px)'
      }}
    />
  );
}

// Menu Item Component
const MenuItem = ({ title, desc, price }) => (
  <div className="group border-b border-white/10 py-8 flex flex-col md:flex-row md:items-center justify-between gap-4 interactive-target cursor-none">
    <div className="flex-1">
      <h3 className="text-2xl md:text-4xl font-normal font-serif tracking-tight group-hover:italic transition-all duration-500">{title}</h3>
      <p className="text-white/50 font-sans font-light text-sm mt-2 max-w-md">{desc}</p>
    </div>
    <div className="font-mono text-sm tracking-widest opacity-80 group-hover:opacity-100 transition-opacity">
      {price}
    </div>
  </div>
);

export default function RestauranteDemo() {
  const containerRef = useRef(null);
  
  const revealVariants = {
    hidden: { clipPath: 'inset(100% 0 0 0)', y: 50 },
    visible: { 
      clipPath: 'inset(0% 0 0 0)',
      y: 0,
      transition: { duration: 1.5, ease: [0.77, 0, 0.175, 1] }
    }
  };

  return (
    <LazyMotion features={domAnimation}>
      <style dangerouslySetInnerHTML={{__html: `body { cursor: none !important; }`}} />
      <main className="bg-[#050505] text-[#fafafa] font-serif selection:bg-[#fff] selection:text-black min-h-screen relative overflow-hidden" ref={containerRef}>
        
        <CustomCursor />
        
        {/* Spotlight Background */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <SpotlightImage src="https://loremflickr.com/1000/1000/restaurant,food/all?lock=1" />
          <div className="absolute inset-0 bg-[#050505]/70" />
        </div>

        {/* FLOATING BACK BUTTON */}
        <div className="fixed bottom-8 right-8 z-[100] interactive-target">
          <Link href="/">
            <m.div 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="flex items-center justify-center w-14 h-14 rounded-full bg-white/5 border border-white/20 backdrop-blur-md text-white hover:bg-white hover:text-black transition-colors shadow-2xl group cursor-none"
            >
              <ChevronLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
            </m.div>
          </Link>
        </div>

        {/* HEADER */}
        <header className="fixed top-0 left-0 w-full p-8 z-50 flex justify-between items-center mix-blend-difference pointer-events-none text-white">
          <div className="font-serif italic text-2xl tracking-widest uppercase pointer-events-auto cursor-none">
            L'Umbra
          </div>
          <div className="font-mono text-xs tracking-[0.3em] border-b border-white/30 pb-1 pointer-events-auto uppercase cursor-none interactive-target">
            Reserva Privada
          </div>
        </header>

        {/* HERO CINE CULINARIO */}
        <section className="relative min-h-screen flex flex-col items-center justify-center px-6 z-10 pointer-events-none pt-24 pb-20">
          <div className="max-w-[90rem] mx-auto w-full flex flex-col items-center text-center">
            
            <m.div 
              initial="hidden" 
              whileInView="visible" 
              viewport={{ once: true }} 
              variants={revealVariants}
            >
              <h2 className="font-sans text-xs md:text-sm tracking-[0.5em] uppercase mb-12 text-white/50 border border-white/10 px-6 py-2 rounded-full">
                Estrella Michelin 2026
              </h2>
            </m.div>

            <m.div 
              initial="hidden" 
              whileInView="visible" 
              viewport={{ once: true }} 
              variants={revealVariants}
            >
              <h1 className="text-7xl md:text-[14rem] font-normal tracking-tighter leading-[0.8] mb-12 uppercase">
                Lujo <br/> <span className="italic font-light">Silencioso.</span>
              </h1>
            </m.div>

            <m.div 
              initial="hidden" 
              whileInView="visible" 
              viewport={{ once: true }} 
              variants={revealVariants}
              className="max-w-3xl"
            >
              <p className="text-xl md:text-3xl text-white/70 font-light leading-relaxed mx-auto italic border-t border-white/10 pt-12">
                "La excelencia no grita. Pasa el cursor por la oscuridad para desvelar nuestras texturas. La alta gastronomía reducida a su esencia más pura y umbría."
              </p>
              <p className="font-sans text-sm tracking-[0.2em] uppercase mt-8 text-white/40">— Chef Alexander Vane</p>
            </m.div>
          </div>
        </section>

        {/* MENÚ DEGUSTACIÓN */}
        <section className="relative py-48 px-6 md:px-24 z-10 bg-[#0a0a0a]">
          <div className="max-w-[80rem] mx-auto">
            <m.div 
              initial="hidden" 
              whileInView="visible" 
              viewport={{ once: true, margin: "-100px" }} 
              variants={revealVariants}
              className="mb-24 flex flex-col md:flex-row justify-between items-end gap-8"
            >
              <h2 className="text-5xl md:text-8xl font-normal uppercase tracking-tighter leading-[0.9]">
                Sombras <br/> & <span className="italic">Sabores.</span>
              </h2>
              <p className="font-sans text-white/50 max-w-sm text-sm leading-relaxed uppercase tracking-widest">
                Menú Degustación Otoño. Un viaje a través de catorce pases inspirados en la quietud del bosque nocturno.
              </p>
            </m.div>

            <div className="flex flex-col border-t border-white/10">
              <MenuItem 
                title="Consomé de Tierra" 
                desc="Trufa negra, infusión de setas silvestres, polvo de pino." 
                price="Pase 01" 
              />
              <MenuItem 
                title="Ostra en Penumbra" 
                desc="Ostra Guillardeau, emulsión de yuzu negro, caviar imperial." 
                price="Pase 04" 
              />
              <MenuItem 
                title="Ciervo Reposado" 
                desc="Lomo de venado madurado 40 días, reducción de frutos rojos, ceniza." 
                price="Pase 09" 
              />
              <MenuItem 
                title="El Velo Blanco" 
                desc="Esferas de yogur ahumado, cristal de azúcar, rocío de lima." 
                price="Pase 14" 
              />
            </div>
            
            <div className="mt-16 text-center">
              <button className="font-sans text-xs tracking-[0.3em] uppercase border border-white/20 px-8 py-4 rounded-full hover:bg-white hover:text-black transition-colors cursor-none interactive-target">
                Ver Menú Completo
              </button>
            </div>
          </div>
        </section>

        {/* LA BODEGA (PARALLAX IMAGE) */}
        <section className="relative h-[80vh] w-full flex items-center justify-center overflow-hidden z-10">
           <m.div 
            initial={{ scale: 1.2 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 2, ease: "easeOut" }}
            viewport={{ once: true }}
            className="absolute inset-0"
           >
             <div className="absolute inset-0 bg-[#050505]/60 z-10" />
             <img src="https://loremflickr.com/1000/1000/restaurant,food/all?lock=2" className="w-full h-full object-cover grayscale" alt="Bodega L'Umbra" />
           </m.div>
           
           <div className="relative z-20 text-center max-w-4xl px-6">
             <Wine className="w-12 h-12 mx-auto mb-8 text-white/50" />
             <h2 className="text-4xl md:text-7xl font-normal uppercase tracking-tighter mb-8">Bodega Subterránea</h2>
             <p className="font-sans text-lg text-white/70 font-light leading-relaxed max-w-2xl mx-auto">
               Más de 2.000 referencias celosamente guardadas bajo tierra. Nuestro sumiller orquesta maridajes que desafían la convención, buscando la perfecta resonancia con cada sombra del menú.
             </p>
           </div>
        </section>

        {/* RESERVA CTA FOOTER */}
        <section className="py-48 lg:py-64 relative flex flex-col items-center text-center overflow-hidden z-10 bg-[#020202]">
          
          <h2 className="text-5xl md:text-9xl font-normal uppercase tracking-tighter mb-16 relative z-10">
            Asegura <br/> <span className="italic text-white/50">Tu Lugar.</span>
          </h2>
          
          <a
            href="mailto:reservas@lumbra.com"
            className="group relative px-12 py-6 md:px-20 md:py-8 border border-white font-sans text-sm md:text-xl tracking-[0.2em] uppercase overflow-hidden bg-transparent z-10 inline-block cursor-none rounded-full interactive-target"
          >
            <span className="relative z-10 text-white font-light group-hover:text-black transition-colors duration-500">
              Solicitar Mesa
            </span>
            <m.div 
              className="absolute inset-0 z-0 origin-bottom bg-white"
              initial={{ y: '100%' }}
              whileHover={{ y: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          </a>
          
          <div className="mt-24 font-sans text-xs text-white/40 tracking-widest flex flex-col md:flex-row gap-8 items-center">
            <span className="flex items-center gap-2"><MapPin className="w-4 h-4"/> Madrid, Centro Histórico</span>
            <span className="hidden md:block">|</span>
            <span className="flex items-center gap-2"><Clock className="w-4 h-4"/> Mar - Sab, 19:30 - 23:00</span>
          </div>
        </section>

      </main>
    </LazyMotion>
  );
}
