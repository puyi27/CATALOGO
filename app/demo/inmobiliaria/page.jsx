"use client";

import React, { useState, useEffect } from 'react';
import { LazyMotion, domAnimation, m, AnimatePresence, useSpring, useMotionValue, useTransform, useScroll } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, MapPin, ArrowUpRight, Compass, Key } from 'lucide-react';

// Custom Cursor
function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const scale = useMotionValue(1);
  const isHovering = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);
  const scaleSpring = useSpring(scale, springConfig);
  const hoverSpring = useSpring(isHovering, springConfig);

  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX - 10);
      cursorY.set(e.clientY - 10);
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
      className="fixed top-0 left-0 w-5 h-5 rounded-full border border-black pointer-events-none z-[9999] mix-blend-difference"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
        scale: scaleSpring,
        backgroundColor: useTransform(hoverSpring, [0, 1], ['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 1)'])
      }}
    />
  );
}

const properties = [
  { id: 1, type: 'VILLA', price: '4.500.000€', name: 'Villa Zafiro', location: 'Marbella Este', img: 'https://loremflickr.com/1000/1000/mansion,villa/all?lock=1' },
  { id: 2, type: 'ÁTICO', price: '1.200.000€', name: 'Penthouse Cielo', location: 'Milla de Oro', img: 'https://loremflickr.com/1000/1000/mansion,villa/all?lock=2' },
  { id: 3, type: 'VILLA', price: '8.900.000€', name: 'Mansion Horizon', location: 'La Zagaleta', img: 'https://loremflickr.com/1000/1000/mansion,villa/all?lock=3' },
  { id: 4, type: 'RETIRO', price: '2.100.000€', name: 'Oasis Forestal', location: 'Sotogrande', img: 'https://loremflickr.com/1000/1000/mansion,villa/all?lock=4' }
];

export default function InmobiliariaDemo() {
  const [filter, setFilter] = useState('ALL');
  const filteredProps = filter === 'ALL' ? properties : properties.filter(p => p.type === filter);

  const { scrollY } = useScroll();
  const yHero = useTransform(scrollY, [0, 1000], [0, 300]);
  const opacityHero = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <LazyMotion features={domAnimation}>
      <style dangerouslySetInnerHTML={{__html: `body { cursor: none !important; overflow-x: hidden; }`}} />
      <main className="bg-[#E8E6E1] text-[#1a1a1a] font-sans selection:bg-[#1a1a1a] selection:text-white min-h-screen relative overflow-hidden">
        
        <CustomCursor />

        {/* FLOATING BACK BUTTON */}
        <div className="fixed bottom-8 right-8 z-[100] interactive-el">
          <Link href="/">
            <m.div 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="flex items-center justify-center w-14 h-14 rounded-full bg-white border border-black/10 backdrop-blur-md text-black hover:bg-black hover:text-white transition-colors shadow-2xl group cursor-none"
            >
              <ChevronLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
            </m.div>
          </Link>
        </div>

        {/* NAV */}
        <nav className="fixed top-0 w-full p-8 flex justify-between items-center z-50 mix-blend-difference text-white pointer-events-none">
          <div className="font-serif italic text-2xl tracking-widest pointer-events-auto">Horizon Estates</div>
          <button className="font-mono text-xs uppercase tracking-[0.2em] pointer-events-auto cursor-none interactive-el border-b border-white pb-1 hover:opacity-50 transition-opacity">
            Private Desk
          </button>
        </nav>

        {/* HERO PARALLAX */}
        <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
          <m.div style={{ y: yHero, opacity: opacityHero }} className="absolute inset-0 z-0">
            <Image 
              src="https://loremflickr.com/1000/1000/mansion,villa/all?lock=5" 
              alt="Luxury Villa" 
              fill 
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/40" />
          </m.div>
          
          <div className="relative z-10 flex flex-col items-center text-center px-6">
            <m.span 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="font-mono text-xs tracking-[0.4em] uppercase text-white/80 mb-8"
            >
              Colección Privada
            </m.span>
            <m.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="text-6xl md:text-[10rem] font-serif font-light tracking-tighter text-white leading-[0.8]"
            >
              Vivir El <br/><span className="italic font-light">Espacio.</span>
            </m.h1>
          </div>

          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-4 text-white opacity-60">
            <div className="w-[1px] h-16 bg-gradient-to-b from-white to-transparent" />
            <span className="font-mono text-[10px] uppercase tracking-widest">Descubrir</span>
          </div>
        </section>

        {/* FILTER & GRID */}
        <section className="py-32 px-6 max-w-[100rem] mx-auto z-20 relative bg-[#E8E6E1]">
          
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <h2 className="text-4xl md:text-6xl font-serif font-light tracking-tight max-w-2xl">Refugios arquitectónicos de excepción.</h2>
            
            <div className="flex gap-4 overflow-x-auto pb-4 md:pb-0 scrollbar-hide">
              {['ALL', 'VILLA', 'ÁTICO', 'RETIRO'].map(cat => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-6 py-2 rounded-full font-mono text-xs uppercase tracking-widest cursor-none interactive-el transition-all duration-300 ${
                    filter === cat ? 'bg-black text-white' : 'bg-transparent text-zinc-500 hover:text-black border border-black/10'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <m.div layout className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-24">
            <AnimatePresence mode="popLayout">
              {filteredProps.map((prop, idx) => (
                <m.div
                  layout
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  key={prop.id}
                  className={`group flex flex-col cursor-none interactive-el ${idx % 2 !== 0 ? 'md:mt-32' : ''}`}
                >
                  <div className="relative aspect-[4/5] w-full overflow-hidden mb-6">
                    <Image 
                      src={prop.img} 
                      alt={prop.name} 
                      fill 
                      loading="lazy"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover object-center scale-100 group-hover:scale-105 transition-transform duration-[1.5s] ease-out"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
                    
                    {/* Hover Info */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center">
                      <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white mb-4 transform scale-50 group-hover:scale-100 transition-transform duration-500 delay-100">
                        <ArrowUpRight className="w-6 h-6" />
                      </div>
                      <span className="font-mono text-xs uppercase tracking-widest text-white drop-shadow-md">Ver Dossier</span>
                    </div>

                    <div className="absolute top-6 left-6">
                      <span className="bg-white/90 backdrop-blur-sm text-black px-4 py-2 text-[10px] font-mono tracking-widest uppercase">
                        {prop.type}
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-3xl font-serif font-light mb-2">{prop.name}</h3>
                      <div className="flex items-center gap-2 text-zinc-500 font-mono text-xs uppercase tracking-widest">
                        <Compass className="w-4 h-4" /> {prop.location}
                      </div>
                    </div>
                    <span className="text-xl font-light">{prop.price}</span>
                  </div>
                </m.div>
              ))}
            </AnimatePresence>
          </m.div>

        </section>

        {/* CTA FOOTER */}
        <section className="py-48 bg-[#1a1a1a] text-white relative flex flex-col items-center text-center px-6">
          <Key className="w-12 h-12 text-white/20 mb-8" />
          <h2 className="text-5xl md:text-[7rem] font-serif font-light tracking-tighter leading-none mb-12">
            Desbloquea el <br/><span className="italic">acceso.</span>
          </h2>
          <a
            href="mailto:private@horizonestates.com"
            className="group relative px-12 py-6 border border-white/30 font-mono tracking-widest text-xs uppercase overflow-hidden bg-transparent inline-block cursor-none interactive-el rounded-full"
          >
            <span className="relative z-10 text-white group-hover:text-black transition-colors duration-500">
              Contactar Asesor
            </span>
            <m.div 
              className="absolute inset-0 z-0 origin-bottom bg-white"
              initial={{ scaleY: 0 }}
              whileHover={{ scaleY: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          </a>
        </section>

      </main>
    </LazyMotion>
  );
}
