"use client";

import React, { useRef } from 'react';
import HTMLFlipBook from 'react-pageflip';
import Image from 'next/image';
import Link from 'next/link';

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

  return (
    <section id="catalogo" className="flex justify-center items-center min-h-screen bg-stone-200 py-24 md:py-32 relative z-20">
      {/* Configuración premium: 
        - drawShadow: false (evita sombras baratas por defecto)
        - usePortrait: true (responsive)
      */}
      <HTMLFlipBook 
        width={550} 
        height={750} 
        size="stretch"
        minWidth={315}
        maxWidth={1000}
        minHeight={400}
        maxHeight={1533}
        maxShadowOpacity={0.1}
        showCover={true}
        mobileScrollSupport={true}
        ref={bookRef}
        className="shadow-2xl shadow-blue-950/20"
      >
        {/* PORTADA */}
        <div className="demoPage bg-stone-100 text-blue-950 flex flex-col justify-center items-center border-r border-stone-300">
          <h1 className="text-6xl md:text-8xl font-serif tracking-tighter uppercase mb-4 text-center leading-[0.85]">
            The<br/>Prototypes
          </h1>
          <p className="text-sm tracking-[0.3em] uppercase font-light mt-8 text-stone-500">2026 Edition</p>
        </div>

        {/* PÁGINAS INTERNAS (1 Demo por página) */}
        {demos.map((demo, index) => (
          <div key={index} className="demoPage bg-stone-50 overflow-hidden relative group">
            <Image 
              src={demo.img} 
              alt={demo.nombre} 
              fill
              className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-out scale-105 group-hover:scale-100"
            />
            {/* Overlay Editorial */}
            <div className="absolute inset-0 bg-gradient-to-t from-blue-950/90 via-blue-950/20 to-transparent flex flex-col justify-end p-8 md:p-12">
              <h2 className={`text-white text-3xl md:text-5xl mb-2 ${demo.fontClass || 'font-serif'}`}>
                {demo.nombre}
              </h2>
              <div className="flex items-center gap-3 mb-8">
                <span className="w-1.5 h-1.5 rounded-full bg-white/50" />
                <p className="text-stone-300 text-[10px] md:text-xs font-mono tracking-[0.2em] uppercase">{demo.tags[0]}</p>
              </div>
              <Link 
                href={demo.path}
                className="w-fit border-b border-white/30 text-white uppercase text-[10px] md:text-xs font-mono tracking-[0.2em] pb-2 hover:text-stone-300 hover:border-stone-300 transition-colors"
              >
                Explorar Prototipo
              </Link>
            </div>
          </div>
        ))}

        {/* CONTRAPORTADA */}
        <div className="demoPage bg-blue-950 text-stone-100 flex flex-col items-center justify-center">
          <h2 className="text-4xl font-serif tracking-tighter uppercase mb-4 text-center leading-none text-white/20">
            End of<br/>Catalog
          </h2>
          <p className="text-[10px] font-mono tracking-[0.3em] uppercase text-white/50 mt-12">Powered by Antigravity</p>
        </div>
      </HTMLFlipBook>
    </section>
  );
}
