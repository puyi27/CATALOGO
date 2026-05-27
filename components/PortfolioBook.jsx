"use client";

import React, { useRef, useState } from 'react';
import HTMLFlipBook from 'react-pageflip';
import Image from 'next/image';
import Link from 'next/link';
import { m, AnimatePresence } from 'framer-motion';

const demos = [
  { id: 'metal', color: '#ff4500', nombre: 'INDUSTRIA PESADA', path: '/demo/metal', tags: ['industrial', 'backend'], img: '/previews/metal.jpg', fontClass: 'font-mono font-black uppercase tracking-tighter' },
  { id: 'panaderia', color: '#d4a373', nombre: 'OBRADOR ARTESANO', path: '/demo/panaderia', tags: ['alimentación', 'ecommerce'], img: '/previews/panaderia.jpg', fontClass: 'font-serif italic tracking-wide' },
  { id: 'interiorismo', color: '#e5e7eb', nombre: 'ARQUITECTURA', path: '/demo/interiorismo', tags: ['construcción', 'portfolio'], img: '/previews/interiorismo.jpg', fontClass: 'font-sans font-light tracking-[0.2em]' },
  { id: 'almazara', color: '#4E6840', nombre: 'AGROTECH', path: '/demo/almazara', tags: ['agro', 'backend'], img: '/previews/almazara.jpg', fontClass: 'font-serif tracking-tight' },
  { id: 'clinica', color: '#008080', nombre: 'CLÍNICA DENTAL', path: '/demo/clinica', tags: ['salud', 'crm'], img: '/previews/clinica.jpg', fontClass: 'font-sans font-medium tracking-tight' },
  { id: 'restaurante', color: '#1a1a1a', nombre: 'ALTA GASTRONOMÍA', path: '/demo/restaurante', tags: ['alimentación', 'portfolio'], img: '/previews/restaurante.jpg', fontClass: 'font-serif tracking-widest' },
  { id: 'agencia', color: '#ff00ff', nombre: 'AGENCIA CREATIVA', path: '/demo/agencia', tags: ['portfolio', 'branding'], img: '/previews/agencia.jpg', fontClass: 'font-serif italic tracking-tighter' },
  { id: 'barberia', color: '#b91c1c', nombre: 'BARBERÍA VINTAGE', path: '/demo/barberia', tags: ['servicios', 'ecommerce'], img: '/previews/barberia.jpg', fontClass: 'font-serif font-black uppercase' },
  { id: 'gaming', color: '#8b5cf6', nombre: 'E-SPORTS', path: '/demo/gaming', tags: ['entretenimiento', 'backend'], img: '/previews/gaming.jpg', fontClass: 'font-mono font-black italic tracking-tighter' },
  { id: 'inmobiliaria', color: '#3b82f6', nombre: 'REAL ESTATE', path: '/demo/inmobiliaria', tags: ['inmobiliaria', 'vr'], img: '/previews/inmobiliaria.jpg', fontClass: 'font-sans font-light tracking-[0.15em]' },
  { id: 'saas', color: '#0ea5e9', nombre: 'SAAS B2B', path: '/demo/saas', tags: ['tecnología', 'backend'], img: '/previews/saas.jpg', fontClass: 'font-sans font-black tracking-tighter' },
  { id: 'tienda', color: '#ec4899', nombre: 'ALTA JOYERÍA', path: '/demo/tienda', tags: ['ecommerce', 'lujo'], img: '/previews/tienda.jpg', fontClass: 'font-serif tracking-[0.25em]' },
  { id: 'tech', color: '#06b6d4', nombre: 'SOFTWARE HOUSE', path: '/demo/tech', tags: ['tecnología', 'backend'], img: '/previews/tech.jpg', fontClass: 'font-mono font-bold tracking-tight' },
  { id: 'creativo', color: '#f97316', nombre: 'ESTUDIO CREATIVO', path: '/demo/creativo', tags: ['portfolio', 'branding'], img: '/previews/creativo.jpg', fontClass: 'font-sans font-black italic uppercase' },
  { id: 'editorial', color: '#a855f7', nombre: 'REVISTA DIGITAL', path: '/demo/editorial', tags: ['portfolio', 'branding'], img: '/previews/editorial.jpg', fontClass: 'font-serif font-light tracking-wide' },
  { id: 'gastronomia', color: '#ef4444', nombre: 'CHEF ESTRELLA', path: '/demo/gastronomia', tags: ['alimentación', 'portfolio'], img: '/previews/gastronomia.jpg', fontClass: 'font-serif italic' },
  { id: 'premium', color: '#fbbf24', nombre: 'RELOJERÍA SUIZA', path: '/demo/premium', tags: ['lujo', 'ecommerce'], img: '/previews/premium.jpg', fontClass: 'font-serif tracking-widest uppercase' },
  { id: 'sostenibilidad', color: '#22c55e', nombre: 'ENERGÍA VERDE', path: '/demo/sostenibilidad', tags: ['agro', 'backend'], img: '/previews/sostenibilidad.jpg', fontClass: 'font-sans font-medium tracking-tight' },
  { id: 'urbano', color: '#f43f5e', nombre: 'STREETWEAR', path: '/demo/urbano', tags: ['ecommerce', 'lujo'], img: '/previews/urbano.jpg', fontClass: 'font-sans font-black italic tracking-tighter' },
  { id: 'zen', color: '#a3e635', nombre: 'RETIRO WELLNESS', path: '/demo/zen', tags: ['servicios', 'crm'], img: '/previews/zen.jpg', fontClass: 'font-serif font-light tracking-[0.1em]' },
  { id: 'nightlife', color: '#e879f9', nombre: 'CLUB & NIGHTLIFE', path: '/demo/nightlife', tags: ['entretenimiento', 'backend'], img: '/previews/nightlife.jpg', fontClass: 'font-sans font-black tracking-tighter uppercase' },
  { id: 'transporte', color: '#38bdf8', nombre: 'LOGÍSTICA & FLOTA', path: '/demo/transporte', tags: ['industrial', 'backend'], img: '/previews/transporte.jpg', fontClass: 'font-mono font-bold tracking-tight' },
];

export default function PortfolioBook() {
  const bookRef = useRef();
  const [currentPage, setCurrentPage] = useState(0);

  const activeDemo = currentPage > 0 && currentPage <= demos.length ? demos[currentPage - 1] : null;

  return (
    <div id="catalogo-mini" className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16 w-full relative z-20 max-w-6xl mx-auto">
      
      {/* Lado Izquierdo (Info) */}
      <div className="hidden md:flex flex-1 justify-end items-center">
         <AnimatePresence mode="wait">
           {activeDemo ? (
             <m.div 
               key={activeDemo.id}
               initial={{ opacity: 0, filter: "blur(10px)", x: -20 }}
               animate={{ opacity: 1, filter: "blur(0px)", x: 0 }}
               exit={{ opacity: 0, filter: "blur(10px)", x: -20 }}
               className="text-right flex flex-col items-end"
             >
               <div className="flex items-center gap-3 mb-4">
                 <p className="text-white/50 text-xs font-mono tracking-[0.2em] uppercase">{activeDemo.tags[0]}</p>
                 <span className="w-2 h-2 rounded-full" style={{ backgroundColor: activeDemo.color, boxShadow: `0 0 10px ${activeDemo.color}` }} />
               </div>
               <h2 className={`text-white text-5xl mb-6 leading-[0.9] ${activeDemo.fontClass || 'font-serif'}`}>
                 {activeDemo.nombre}
               </h2>
               <Link 
                 href={activeDemo.path}
                 className="w-fit border-b border-white/30 text-white uppercase text-xs font-mono tracking-[0.2em] pb-2 hover:text-white/80 transition-colors"
               >
                 Explorar Prototipo
               </Link>
             </m.div>
           ) : (
             <div className="text-right flex flex-col items-end opacity-50">
                <p className="text-white/50 text-xs font-mono tracking-[0.2em] uppercase mb-4">Book</p>
                <h2 className="text-white text-4xl font-serif">Abre para<br/>explorar</h2>
             </div>
           )}
         </AnimatePresence>
      </div>

      {/* Centro (Libro) */}
      <div className="shrink-0 relative">
          <HTMLFlipBook 
            width={300} 
            height={400} 
            size="stretch"
            minWidth={200}
            maxWidth={400}
            minHeight={250}
            maxHeight={500}
            maxShadowOpacity={0.1}
            showCover={true}
            mobileScrollSupport={true}
            onFlip={(e) => setCurrentPage(e.data)}
            ref={bookRef}
            className="shadow-2xl shadow-black"
          >
            {/* PORTADA */}
            <div className="demoPage bg-stone-100 text-blue-950 flex flex-col justify-center items-center border-r border-stone-300">
              <h1 className="text-5xl md:text-6xl font-serif tracking-tighter uppercase mb-4 text-center leading-[0.85]">
                The<br/>Prototypes
              </h1>
              <p className="text-xs tracking-[0.3em] uppercase font-light mt-8 text-stone-500">2026 Edition</p>
            </div>

            {/* PÁGINAS INTERNAS (Sin info superpuesta) */}
            {demos.map((demo, index) => (
              <div key={index} className="demoPage bg-[#050505] overflow-hidden relative group">
                <Image 
                  src={demo.img} 
                  alt={demo.nombre} 
                  fill
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-out scale-105 group-hover:scale-100"
                />
              </div>
            ))}

            {/* CONTRAPORTADA */}
            <div className="demoPage bg-[#111] text-stone-100 flex flex-col items-center justify-center border-l border-white/5">
              <h2 className="text-3xl font-serif tracking-tighter uppercase mb-4 text-center leading-none text-white/20">
                End of<br/>Catalog
              </h2>
              <p className="text-[9px] font-mono tracking-[0.3em] uppercase text-white/50 mt-12">Antigravity</p>
            </div>
          </HTMLFlipBook>
      </div>

      {/* Lado Derecho (Info extra o paginación) */}
      <div className="hidden md:flex flex-1 justify-start items-center">
         <AnimatePresence mode="wait">
           {activeDemo ? (
             <m.div 
               key={activeDemo.id}
               initial={{ opacity: 0, x: 20 }}
               animate={{ opacity: 1, x: 0 }}
               exit={{ opacity: 0, x: 20 }}
               className="text-left flex flex-col items-start"
             >
                <div className="text-white/20 font-mono text-[8rem] leading-none font-black opacity-20 selection:bg-transparent">
                  {String(currentPage).padStart(2, '0')}
                </div>
             </m.div>
           ) : (
             <div className="text-left flex flex-col items-start opacity-50">
                <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/20">
                  <span className="text-xs font-mono">{currentPage}</span>
                </div>
             </div>
           )}
         </AnimatePresence>
      </div>

      {/* Mobile Info */}
      <div className="md:hidden mt-8 w-full flex flex-col items-center text-center">
         <AnimatePresence mode="wait">
           {activeDemo && (
             <m.div 
               key={activeDemo.id}
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: 10 }}
               className="flex flex-col items-center"
             >
               <div className="flex items-center gap-2 mb-2">
                 <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: activeDemo.color }} />
                 <p className="text-white/50 text-[10px] font-mono tracking-[0.2em] uppercase">{activeDemo.tags[0]}</p>
               </div>
               <h2 className={`text-white text-3xl mb-4 ${activeDemo.fontClass || 'font-serif'}`}>
                 {activeDemo.nombre}
               </h2>
               <Link 
                 href={activeDemo.path}
                 className="w-fit border-b border-white/30 text-white uppercase text-[10px] font-mono tracking-[0.2em] pb-1"
               >
                 Explorar Prototipo
               </Link>
             </m.div>
           )}
         </AnimatePresence>
      </div>
    </div>
  );
}
