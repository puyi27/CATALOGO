"use client";

import React, { useState } from 'react';
import { LazyMotion, domAnimation, m, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ArrowUpRight, LayoutGrid, Filter } from 'lucide-react';

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

const allTags = [...new Set(demos.flatMap((d) => d.tags))];

export default function PortfolioGrid() {
  const [activeTag, setActiveTag] = useState(null);
  const filtered = activeTag ? demos.filter((d) => d.tags.includes(activeTag)) : demos;

  return (
    <LazyMotion features={domAnimation}>
      <section id="catalogo" className="relative bg-[#050505] text-white overflow-hidden py-24 md:py-32 border-t border-white/5">
        <div className="max-w-[90rem] mx-auto px-6 md:px-12">
          <m.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-12 md:mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 mb-6">
              <LayoutGrid className="w-4 h-4 text-zinc-400" />
              <span className="text-xs font-mono text-zinc-400 uppercase tracking-[0.25em]">Website as a Service</span>
            </div>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter leading-[0.85]">
                <span className="block text-white">Prototipos</span>
                <span className="block text-white/60">Listos para desplegar.</span>
              </h2>
              <p className="text-zinc-500 font-mono text-xs md:text-sm max-w-xs uppercase tracking-widest leading-relaxed">
                Sin coste de alta. Sin compromiso. Elegir, desplegar, vender.
              </p>
            </div>
          </m.div>

          <div className="flex flex-wrap gap-2 mb-10">
            <button
              onClick={() => setActiveTag(null)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-[10px] font-mono uppercase tracking-widest border transition-all ${
                !activeTag
                  ? 'bg-white text-black border-white'
                  : 'text-zinc-500 border-white/10 hover:border-white/30'
              }`}
            >
              <Filter className="w-3 h-3" />
              Todos
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                className={`px-4 py-2 rounded-full text-[10px] font-mono uppercase tracking-widest border transition-all ${
                  activeTag === tag
                    ? 'bg-white text-black border-white'
                    : 'text-zinc-500 border-white/10 hover:border-white/30'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

          <m.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((demo, i) => (
                <m.div
                  key={demo.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                >
                  <Link
                    href={demo.path}
                    className="group block relative aspect-[4/5] overflow-hidden rounded-lg border border-white/5 hover:border-white/20 transition-colors"
                  >
                    <img
                      src={demo.img}
                      alt={demo.nombre}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                    <div className="absolute top-3 left-3">
                      <span
                        className="text-[10px] font-mono uppercase tracking-widest px-2 py-1 rounded"
                        style={{ backgroundColor: `${demo.color}20`, color: demo.color, border: `1px solid ${demo.color}40` }}
                      >
                        {demo.tags[0]}
                      </span>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <div className="flex items-center justify-between">
                        <h3 className={`text-xl md:text-2xl text-white ${demo.fontClass || 'font-black uppercase tracking-tighter'}`}>
                          {demo.nombre}
                        </h3>
                        <div
                          className="w-10 h-10 rounded-full flex items-center justify-center border-2 opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-2 group-hover:translate-x-0"
                          style={{ borderColor: demo.color }}
                        >
                          <ArrowUpRight className="w-5 h-5" style={{ color: demo.color }} />
                        </div>
                      </div>
                    </div>
                  </Link>
                </m.div>
              ))}
            </AnimatePresence>
          </m.div>

          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <div className="inline-flex items-center gap-3 px-6 py-4 rounded-full border border-white/10 bg-white/5">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest">
                Todos los prototipos están listos para desplegar bajo demanda. —{' '}
                <span className="text-white">Coste de alta: 0€</span>
              </span>
            </div>
          </m.div>
        </div>
      </section>
    </LazyMotion>
  );
}
