"use client";

import React, { useRef, useState, useEffect } from 'react';
import { LazyMotion, domAnimation, m, useScroll, useTransform, useSpring, useMotionValue, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { ChevronLeft, Droplets, Sun, Wind, Sprout, Leaf } from 'lucide-react';

const OilWebGL = dynamic(() => import('./OilWebGL'), { ssr: false });

// Organic Typewriter Subtitle
const TypewriterText = ({ text }) => {
  const letters = Array.from(text);
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({ opacity: 1, transition: { staggerChildren: 0.05, delayChildren: 0.2 * i } })
  };
  const child = {
    visible: { opacity: 1, y: 0, transition: { type: 'spring', damping: 12, stiffness: 200 } },
    hidden: { opacity: 0, y: 20 }
  };
  
  return (
    <m.div className="flex flex-wrap overflow-hidden font-serif text-[#d4af37] text-sm md:text-lg tracking-widest uppercase italic" variants={container} initial="hidden" animate="visible">
      {letters.map((letter, index) => (
        <m.span variants={child} key={index} className="inline-block">
          {letter === " " ? "\u00A0" : letter}
        </m.span>
      ))}
    </m.div>
  );
};

// Fluid Cursor
function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const scale = useMotionValue(1);
  const isHovering = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 200, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);
  const scaleSpring = useSpring(scale, springConfig);
  const hoverSpring = useSpring(isHovering, springConfig);

  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      if (target.tagName.toLowerCase() === 'button' || target.tagName.toLowerCase() === 'a' || target.closest('.interactive-target')) {
        scale.set(2.5);
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
      className="fixed top-0 left-0 w-8 h-8 rounded-full border border-[#d4af37] pointer-events-none z-[9999]"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
        scale: scaleSpring,
        backgroundColor: useTransform(hoverSpring, [0, 1], ['rgba(212, 175, 55, 0)', 'rgba(212, 175, 55, 0.1)']),
        backdropFilter: useTransform(hoverSpring, [0, 1], ['blur(0px)', 'blur(4px)'])
      }}
    />
  );
}

export default function AlmazaraDemo() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Parallax values
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, 500]);
  const scaleImage = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const opacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

  return (
    <LazyMotion features={domAnimation}>
      <style dangerouslySetInnerHTML={{__html: `body { cursor: none !important; }`}} />
      <main className="bg-[#12140f] text-[#e8eadf] font-serif selection:bg-[#d4af37] selection:text-[#12140f] overflow-hidden" ref={containerRef}>
        
        <CustomCursor />
        
        {/* Dynamic Background */}
        <OilWebGL />

        {/* FLOATING BACK BUTTON */}
        <div className="fixed bottom-8 right-8 z-[100] interactive-target">
          <Link href="/">
            <m.div 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="flex items-center justify-center w-14 h-14 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/30 backdrop-blur-md text-[#d4af37] hover:bg-[#d4af37] hover:text-[#12140f] transition-colors shadow-2xl group cursor-none"
            >
              <ChevronLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
            </m.div>
          </Link>
        </div>

        {/* HEADER */}
        <header className="fixed top-0 left-0 w-full p-8 z-50 flex justify-between items-center pointer-events-none mix-blend-difference">
          <div className="font-serif text-2xl tracking-widest text-[#d4af37] uppercase pointer-events-auto cursor-none">
            La Dorada.
          </div>
          <div className="font-sans text-xs tracking-widest uppercase border border-[#d4af37]/50 text-[#d4af37] px-4 py-2 rounded-full pointer-events-auto bg-[#12140f]/50 backdrop-blur-md">
            Cosecha 2026
          </div>
        </header>

        {/* HERO ELEGANCE */}
        <section className="relative min-h-screen flex flex-col justify-center px-6 md:px-24 z-10 pt-32 pb-20 pointer-events-none overflow-hidden">
          <m.div className="max-w-[100rem] mx-auto w-full" style={{ opacity }}>
            <div className="mb-12">
               <TypewriterText text="Extracción en frío. Primera prensada." />
            </div>
            
            <h1 className="text-7xl md:text-[12rem] lg:text-[15rem] font-light tracking-tighter leading-[0.75] mb-12 text-[#e8eadf]">
              Oro <br /> <span className="font-black text-[#d4af37] italic" style={{ paddingRight: '20px' }}>Líquido.</span>
            </h1>
            
            <div className="max-w-3xl border-l border-[#d4af37] pl-8 ml-2">
               <p className="text-2xl md:text-4xl text-[#e8eadf]/80 font-light leading-relaxed">
                 Nuestra tierra no produce aceite, esculpe un néctar ancestral. Desde el olivo centenario hasta tu mesa, sin filtros, puro origen.
               </p>
            </div>
          </m.div>
        </section>

        {/* PROCESO - PARALLAX IMMERSION */}
        <section className="relative py-48 lg:py-64 px-6 md:px-24 z-10 pointer-events-none overflow-hidden">
          <div className="max-w-[100rem] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            
            <div className="flex flex-col gap-16">
              <m.div style={{ y: y2 }}>
                <span className="font-sans text-[#d4af37] tracking-[0.3em] uppercase text-sm mb-6 block">01 / El Origen</span>
                <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter text-[#e8eadf] leading-none mb-8">
                  Raíces <br/> <span className="text-[#d4af37] italic font-light">Eternas.</span>
                </h2>
                <p className="text-xl md:text-3xl text-[#e8eadf]/70 max-w-xl leading-relaxed font-light">
                  Olivos milenarios anclados en suelo calizo. Respetamos los tiempos de la naturaleza, cosechando en el equinoccio de otoño cuando la aceituna guarda su máxima expresión fenólica.
                </p>
              </m.div>
            </div>

            <div className="relative h-[120vh] w-full">
              {/* Main Parallax Image */}
              <m.div 
                style={{ y: y1 }} 
                className="absolute top-0 right-0 w-[85%] h-[70%] overflow-hidden rounded-tl-[150px] rounded-br-[150px] border border-[#d4af37]/20 interactive-target pointer-events-auto group"
              >
                <div className="absolute inset-0 bg-[#d4af37]/20 mix-blend-overlay z-10 group-hover:bg-transparent transition-colors duration-1000" />
                <m.img 
                  style={{ scale: scaleImage }}
                  src="https://loremflickr.com/1000/1000/olive,farm/all?lock=1" 
                  alt="Olivares" 
                  className="w-full h-full object-cover grayscale contrast-125 sepia-[.3]" 
                />
              </m.div>
              
              {/* Floating Detail Image */}
              <m.div 
                style={{ y: y3 }} 
                className="absolute bottom-10 left-0 w-[65%] h-[50%] overflow-hidden z-20 rounded-tr-[100px] rounded-bl-[100px] border border-[#d4af37]/30 shadow-2xl interactive-target pointer-events-auto group"
              >
                <div className="absolute inset-0 bg-black/40 z-10 group-hover:bg-transparent transition-colors duration-1000" />
                <img 
                  src="https://loremflickr.com/1000/1000/olive,farm/all?lock=2" 
                  alt="Extracción" 
                  className="w-full h-full object-cover grayscale contrast-125 sepia-[.5] group-hover:scale-110 transition-transform duration-[2s]" 
                />
              </m.div>
            </div>

          </div>
        </section>

        {/* GALERÍA DE PRODUCTOS (BENTO) */}
        <section className="py-32 px-6 md:px-24 bg-[#12140f] z-20 relative">
          <div className="max-w-[100rem] mx-auto">
            <h2 className="text-4xl md:text-7xl font-light uppercase tracking-widest text-[#d4af37] mb-24 text-center">Nuestra Bodega</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Producto 1 */}
              <div className="group border border-[#d4af37]/20 rounded-t-full overflow-hidden interactive-target cursor-none bg-[#1a1c15]">
                <div className="aspect-[2/3] overflow-hidden relative">
                  <div className="absolute inset-0 bg-[#d4af37]/10 z-10 group-hover:opacity-0 transition-opacity duration-700" />
                  <img src="https://loremflickr.com/1000/1000/olive,farm/all?lock=3" className="w-full h-full object-cover grayscale sepia-[0.3] group-hover:scale-110 group-hover:grayscale-0 transition-all duration-[1.5s] ease-out" alt="Picual" />
                </div>
                <div className="p-10 text-center">
                  <span className="font-sans text-xs tracking-[0.2em] uppercase text-[#d4af37] mb-4 block">Edición Limitada</span>
                  <h3 className="text-3xl font-black mb-4">Picual Intenso</h3>
                  <p className="text-[#e8eadf]/60 font-light font-sans mb-8">Notas de hierba fresca, tomate y almendra verde. Picor final elegante.</p>
                  <button className="border-b border-[#d4af37] text-[#d4af37] font-sans text-sm tracking-widest uppercase pb-1 hover:text-white transition-colors">Añadir a la cesta</button>
                </div>
              </div>

              {/* Producto 2 */}
              <div className="group border border-[#d4af37]/20 rounded-t-full overflow-hidden interactive-target cursor-none bg-[#1a1c15] md:-translate-y-16">
                <div className="aspect-[2/3] overflow-hidden relative">
                  <div className="absolute inset-0 bg-[#d4af37]/10 z-10 group-hover:opacity-0 transition-opacity duration-700" />
                  <img src="https://loremflickr.com/1000/1000/olive,farm/all?lock=4" className="w-full h-full object-cover grayscale sepia-[0.3] group-hover:scale-110 group-hover:grayscale-0 transition-all duration-[1.5s] ease-out" alt="Arbequina" />
                </div>
                <div className="p-10 text-center">
                  <span className="font-sans text-xs tracking-[0.2em] uppercase text-[#d4af37] mb-4 block">Cosecha Temprana</span>
                  <h3 className="text-3xl font-black mb-4">Arbequina Suave</h3>
                  <p className="text-[#e8eadf]/60 font-light font-sans mb-8">Perfil dulce y frutado. Recuerdos a manzana verde y plátano. Ideal en crudo.</p>
                  <button className="border-b border-[#d4af37] text-[#d4af37] font-sans text-sm tracking-widest uppercase pb-1 hover:text-white transition-colors">Añadir a la cesta</button>
                </div>
              </div>

              {/* Producto 3 */}
              <div className="group border border-[#d4af37]/20 rounded-t-full overflow-hidden interactive-target cursor-none bg-[#1a1c15]">
                <div className="aspect-[2/3] overflow-hidden relative">
                  <div className="absolute inset-0 bg-[#d4af37]/10 z-10 group-hover:opacity-0 transition-opacity duration-700" />
                  <img src="https://loremflickr.com/1000/1000/olive,farm/all?lock=5" className="w-full h-full object-cover grayscale sepia-[0.3] group-hover:scale-110 group-hover:grayscale-0 transition-all duration-[1.5s] ease-out" alt="Coupage" />
                </div>
                <div className="p-10 text-center">
                  <span className="font-sans text-xs tracking-[0.2em] uppercase text-[#d4af37] mb-4 block">Selección del Maestro</span>
                  <h3 className="text-3xl font-black mb-4">Coupage Reserva</h3>
                  <p className="text-[#e8eadf]/60 font-light font-sans mb-8">El equilibrio perfecto. La estructura del picual domeñada por la finura arbequina.</p>
                  <button className="border-b border-[#d4af37] text-[#d4af37] font-sans text-sm tracking-widest uppercase pb-1 hover:text-white transition-colors">Añadir a la cesta</button>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* BRAND CTA FOOTER */}
        <section className="py-48 lg:py-64 bg-[#d4af37] relative flex flex-col items-center text-center overflow-hidden interactive-target">
          
          <h2 className="text-5xl md:text-[9rem] font-light uppercase tracking-tighter mb-16 relative z-10 text-[#12140f] leading-[0.8]">
            Degusta <br/> <span className="font-black italic">El Origen.</span>
          </h2>
          
          <a
            href="mailto:pedidos@fincaladorada.com"
            className="group relative px-12 py-6 md:px-20 md:py-8 border-2 border-[#12140f] font-sans text-xl md:text-2xl tracking-widest uppercase overflow-hidden bg-[#12140f] z-10 inline-block cursor-none rounded-full"
          >
            <span className="relative z-10 text-[#d4af37] font-light group-hover:text-[#12140f] transition-colors duration-500">
              Tienda Online
            </span>
            <m.div 
              className="absolute inset-0 z-0 bg-[#d4af37]"
              initial={{ y: '100%' }}
              whileHover={{ y: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 25 }}
            />
          </a>
        </section>

      </main>
    </LazyMotion>
  );
}
