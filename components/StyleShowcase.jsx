"use client";

import React, { useState } from 'react';
import { LazyMotion, domAnimation, m, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

const models = [
  { id: 'metal', color: '#ff4500', nombre: 'INDUSTRIA PESADA', desc: 'Sistemas de telemetría y control CNC.', path: '/demo/metal', img: 'https://loremflickr.com/1000/1000/welding,steel/all?lock=1' },
  { id: 'panaderia', color: '#d4a373', nombre: 'OBRADOR ARTESANO', desc: 'Flujos B2B y físicas GSAP avanzadas.', path: '/demo/panaderia', img: 'https://loremflickr.com/1000/1000/bread,bakery/all?lock=1' },
  { id: 'interiorismo', color: '#e5e7eb', nombre: 'ARQUITECTURA', desc: 'Bento Grid con expansión dom-layoutId.', path: '/demo/interiorismo', img: 'https://loremflickr.com/1000/1000/minimalist,interior/all?lock=1' },
  { id: 'almazara', color: '#4E6840', nombre: 'AGROTECH PREMIUM', desc: 'Soberanía de datos. React Three Fiber.', path: '/demo/almazara', img: 'https://loremflickr.com/1000/1000/olive,farm/all?lock=1' },
  { id: 'clinica', color: '#008080', nombre: 'CLÍNICA DENTAL', desc: 'Gestión cifrada y alta conversión visual.', path: '/demo/clinica', img: 'https://loremflickr.com/1000/1000/surgery,doctor/all?lock=1' },
  { id: 'restaurante', color: '#1a1a1a', nombre: 'ALTA GASTRONOMÍA', desc: 'Cine culinario. Renderizado dinámico.', path: '/demo/restaurante', img: 'https://loremflickr.com/1000/1000/restaurant,food/all?lock=1' },
  { id: 'agencia', color: '#ff00ff', nombre: 'AGENCIA CREATIVA', desc: 'Portfolio inmersivo y WebGL.', path: '/demo/agencia', img: 'https://loremflickr.com/1000/1000/branding,design/all?lock=1' },
  { id: 'barberia', color: '#b91c1c', nombre: 'BARBERÍA VINTAGE', desc: 'Reservas en tiempo real.', path: '/demo/barberia', img: 'https://loremflickr.com/1000/1000/barber,vintage/all?lock=1' },
  { id: 'creativo', color: '#10b981', nombre: 'ESTUDIO DE ARTE', desc: 'Exhibición asíncrona de obras.', path: '/demo/creativo', img: 'https://loremflickr.com/1000/1000/art,creative/all?lock=1' },
  { id: 'editorial', color: '#facc15', nombre: 'REVISTA DIGITAL', desc: 'Tipografía fluida y layouts asimétricos.', path: '/demo/editorial', img: 'https://loremflickr.com/1000/1000/fashion,editorial/all?lock=1' },
  { id: 'gaming', color: '#8b5cf6', nombre: 'E-SPORTS', desc: 'Rendimiento extremo y neon brutalism.', path: '/demo/gaming', img: 'https://loremflickr.com/1000/1000/esports,gaming/all?lock=1' },
  { id: 'gastronomia', color: '#f43f5e', nombre: 'CHEF ESTRELLA', desc: 'Plating showcase y reservas.', path: '/demo/gastronomia', img: 'https://loremflickr.com/1000/1000/finedining,plating/all?lock=1' },
  { id: 'inmobiliaria', color: '#3b82f6', nombre: 'REAL ESTATE', desc: 'Villas de lujo y tours virtuales.', path: '/demo/inmobiliaria', img: 'https://loremflickr.com/1000/1000/mansion,villa/all?lock=1' },
  { id: 'nightlife', color: '#6366f1', nombre: 'CLUB & NIGHTLIFE', desc: 'Tickets y line-ups dinámicos.', path: '/demo/nightlife', img: 'https://loremflickr.com/1000/1000/nightclub,dj/all?lock=1' },
  { id: 'premium', color: '#d97706', nombre: 'RELOJERÍA SUIZA', desc: 'Detalle microscópico y scrolljacking.', path: '/demo/premium', img: 'https://loremflickr.com/1000/1000/luxury,watch/all?lock=1' },
  { id: 'saas', color: '#0ea5e9', nombre: 'SAAS B2B', desc: 'Métricas en vivo y dark mode.', path: '/demo/saas', img: 'https://loremflickr.com/1000/1000/code,server/all?lock=1' },
  { id: 'sostenibilidad', color: '#22c55e', nombre: 'ENERGÍA VERDE', desc: 'Misión corporativa interactiva.', path: '/demo/sostenibilidad', img: 'https://loremflickr.com/1000/1000/nature,green/all?lock=1' },
  { id: 'tech', color: '#14b8a6', nombre: 'SOFTWARE HOUSE', desc: 'Cyberpunk estético y APIs.', path: '/demo/tech', img: 'https://loremflickr.com/1000/1000/technology,circuit/all?lock=1' },
  { id: 'tienda', color: '#ec4899', nombre: 'ALTA JOYERÍA', desc: 'E-commerce headless.', path: '/demo/tienda', img: 'https://loremflickr.com/1000/1000/jewelry,luxury/all?lock=1' },
  { id: 'urbano', color: '#f97316', nombre: 'STREETWEAR', desc: 'Drop culture y cuenta atrás.', path: '/demo/urbano', img: 'https://loremflickr.com/1000/1000/streetwear,urban/all?lock=1' },
  { id: 'zen', color: '#94a3b8', nombre: 'RETIRO WELLNESS', desc: 'Paz visual y micro-interacciones.', path: '/demo/zen', img: 'https://loremflickr.com/1000/1000/zen,meditation/all?lock=1' },
];


export default function StyleShowcase() {
  const [hovered, setHovered] = useState(models[0]);

  return (
    <LazyMotion features={domAnimation}>
      <section className="relative min-h-screen bg-[#050505] text-white overflow-hidden py-24 md:py-32 flex flex-col cursor-default" id="alma">
        
        {/* Dynamic Background Image Reveal */}
        <div className="absolute inset-0 z-0 opacity-20 hidden md:block">
          <AnimatePresence mode="wait">
             <m.img 
                key={hovered.id}
                src={hovered.img}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="w-full h-full object-cover grayscale"
             />
          </AnimatePresence>
          <div className="absolute inset-0 bg-black/60" />
        </div>

        <div className="relative z-10 w-full max-w-[90rem] mx-auto px-6 md:px-12 flex-1 flex flex-col">
           
           {/* Header */}
           <div className="mb-16 md:mb-24 flex justify-between items-end border-b border-white/10 pb-8">
             <div>
               <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter">Catálogo <br/> en Directo.</h2>
             </div>
              <p className="text-zinc-500 font-mono text-xs md:text-sm max-w-xs text-right uppercase tracking-widest hidden md:block">
                21 marcas. 21 universos visuales. Pulsa cualquiera para entrar.
              </p>
           </div>

           {/* Interactive List */}
           <div className="flex-1 flex flex-col justify-center">
             {models.map((model, idx) => (
               <Link 
                 href={model.path} 
                 key={model.id}
                 onMouseEnter={() => setHovered(model)}
                 onFocus={() => setHovered(model)}
                 className="group relative border-b border-white/5 last:border-transparent py-6 md:py-10 cursor-none block overflow-hidden"
               >
                 {/* Hover Background Accent */}
                 <m.div 
                   className="absolute inset-0 origin-left -z-10"
                   initial={{ scaleX: 0 }}
                   whileHover={{ scaleX: 1 }}
                   transition={{ type: "spring", stiffness: 300, damping: 30 }}
                   style={{ backgroundColor: model.color, opacity: 0.1 }}
                 />

                 <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                   <div className="flex items-center gap-6 md:gap-12">
                     <span className="font-mono text-zinc-600 text-sm md:text-xl group-hover:text-white transition-colors duration-300">
                       0{idx + 1}
                     </span>
                     <h3 
                       className="text-4xl md:text-6xl lg:text-8xl font-black uppercase tracking-tighter text-white/50 group-hover:text-white transition-colors duration-300"
                     >
                       {model.nombre}
                     </h3>
                   </div>
                   
                   <div className="flex items-center justify-end w-full md:w-auto md:opacity-0 group-hover:opacity-100 transition-all duration-300 md:-translate-x-10 group-hover:translate-x-0 gap-8">
                     <p className="font-mono text-zinc-400 text-xs md:text-sm max-w-[200px] text-right hidden lg:block">
                       {model.desc}
                     </p>
                     <div 
                       className="w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center border-2 transition-transform duration-300 group-hover:rotate-45"
                       style={{ borderColor: model.color }}
                     >
                       <ArrowUpRight className="w-6 h-6 md:w-8 md:h-8" style={{ color: model.color }} />
                     </div>
                   </div>
                 </div>
               </Link>
             ))}
           </div>

        </div>
      </section>
    </LazyMotion>
  );
}
