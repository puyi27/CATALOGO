"use client";

import React, { useState } from 'react';
import { LazyMotion, domAnimation, m, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ArrowUpRight, Layers } from 'lucide-react';

const lineas = [
  {
    label: 'Línea Industrial / Pesada',
    desc: 'Oscuridad, alto contraste, tipografía contundente. Para talleres mecánicos, carpinterías metálicas y proveedores industriales.',
    color: '#ff4500',
    models: [
      { id: 'metal', nombre: 'TITAN PRECISION', desc: 'Sistemas de telemetría y control CNC.', path: '/demo/metal' },
      { id: 'gaming', nombre: 'E-SPORTS ARENA', desc: 'Rendimiento extremo y neon brutalism.', path: '/demo/gaming' },
      { id: 'tech', nombre: 'SOFTWARE HOUSE', desc: 'Cyberpunk estético y APIs.', path: '/demo/tech' },
      { id: 'saas', nombre: 'SAAS B2B', desc: 'Métricas en vivo y dark mode.', path: '/demo/saas' },
      { id: 'transporte', nombre: 'LOGÍSTICA & FLOTA', desc: 'Telemetría de flota en vivo.', path: '/demo/transporte' },
    ],
  },
  {
    label: 'Línea Boutique / Legado',
    desc: 'Minimalismo, espacios en blanco, serifas modernas. Para el gremio panadero, obradores, gastronomía y oficios con herencia.',
    color: '#d4a373',
    models: [
      { id: 'panaderia', nombre: 'L\'ATELIER DU PAIN', desc: 'Masa madre de 142 años. Flujos B2B.', path: '/demo/panaderia' },
      { id: 'almazara', nombre: 'AGROTECH PREMIUM', desc: 'Soberanía de datos. React Three Fiber.', path: '/demo/almazara' },
      { id: 'restaurante', nombre: 'ALTA GASTRONOMÍA', desc: 'Cine culinario. Renderizado dinámico.', path: '/demo/restaurante' },
      { id: 'gastronomia', nombre: 'CHEF ESTRELLA', desc: 'Plating showcase y reservas.', path: '/demo/gastronomia' },
      { id: 'premium', nombre: 'RELOJERÍA SUIZA', desc: 'Detalle microscópico y scrolljacking.', path: '/demo/premium' },
      { id: 'tienda', nombre: 'ALTA JOYERÍA', desc: 'E-commerce headless.', path: '/demo/tienda' },
      { id: 'barberia', nombre: 'BARBERÍA VINTAGE', desc: 'Reservas en tiempo real.', path: '/demo/barberia' },
    ],
  },
  {
    label: 'Línea Revista / Portafolio Visual',
    desc: 'Masonry asimétrico, tipografía fluida, carga instantánea. Para interiorismo, reformas, construcción y estudios creativos.',
    color: '#e5e7eb',
    models: [
      { id: 'interiorismo', nombre: 'AURA INTERIORS', desc: 'Bento Grid con expansión dom-layoutId.', path: '/demo/interiorismo' },
      { id: 'inmobiliaria', nombre: 'REAL ESTATE', desc: 'Villas de lujo y tours virtuales.', path: '/demo/inmobiliaria' },
      { id: 'creativo', nombre: 'ESTUDIO DE ARTE', desc: 'Exhibición asíncrona de obras.', path: '/demo/creativo' },
      { id: 'editorial', nombre: 'REVISTA DIGITAL', desc: 'Tipografía fluida y layouts asimétricos.', path: '/demo/editorial' },
      { id: 'agencia', nombre: 'AGENCIA CREATIVA', desc: 'Portfolio inmersivo y WebGL.', path: '/demo/agencia' },
      { id: 'sostenibilidad', nombre: 'ENERGÍA VERDE', desc: 'Misión corporativa interactiva.', path: '/demo/sostenibilidad' },
      { id: 'zen', nombre: 'RETIRO WELLNESS', desc: 'Paz visual y micro-interacciones.', path: '/demo/zen' },
      { id: 'urbano', nombre: 'STREETWEAR', desc: 'Drop culture y cuenta atrás.', path: '/demo/urbano' },
      { id: 'nightlife', nombre: 'CLUB & NIGHTLIFE', desc: 'Tickets y line-ups dinámicos.', path: '/demo/nightlife' },
      { id: 'clinica', nombre: 'CLÍNICA DENTAL', desc: 'Gestión cifrada y alta conversión visual.', path: '/demo/clinica' },
    ],
  },
];

const allModels = lineas.flatMap((l) => l.models.map((m) => ({ ...m, lineaColor: l.color, lineaLabel: l.label })));

export default function StyleShowcase() {
  const [hovered, setHovered] = useState(allModels[0]);
  const [activeLinea, setActiveLinea] = useState(0);

  return (
    <LazyMotion features={domAnimation}>
      <section className="relative min-h-screen bg-[#050505] text-white overflow-hidden py-24 md:py-32 flex flex-col" id="alma">
        <div className="relative z-10 w-full max-w-[90rem] mx-auto px-6 md:px-12 flex-1 flex flex-col">
          <m.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 md:mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 mb-6">
              <Layers className="w-4 h-4 text-zinc-400" />
              <span className="text-xs font-mono text-zinc-400 uppercase tracking-[0.25em]">Líneas de Diseño</span>
            </div>
            <div className="flex justify-between items-end border-b border-white/10 pb-8">
              <div>
                <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter">Catálogo <br/> en Directo.</h2>
              </div>
              <p className="text-zinc-500 font-mono text-xs md:text-sm max-w-xs text-right uppercase tracking-widest hidden md:block">
                3 líneas. 22 universos. Pulsa para entrar.
              </p>
            </div>
          </m.div>

          <div className="flex flex-wrap gap-2 mb-10">
            {lineas.map((linea, i) => (
              <button
                key={linea.label}
                onClick={() => setActiveLinea(i)}
                className={`px-4 py-2 rounded-full text-[10px] font-mono uppercase tracking-widest border transition-all ${
                  activeLinea === i
                    ? 'bg-white text-black border-white'
                    : 'text-zinc-500 border-white/10 hover:border-white/30'
                }`}
              >
                {linea.label}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <m.div
              key={activeLinea}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="mb-8"
            >
              <p className="text-xs font-mono text-zinc-500 max-w-xl leading-relaxed uppercase tracking-widest">
                {lineas[activeLinea].desc}
              </p>
            </m.div>
          </AnimatePresence>

          <div className="flex-1 flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <m.div key={activeLinea} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                {lineas[activeLinea].models.map((model, idx) => (
                  <Link
                    href={model.path}
                    key={model.id}
                    className="group relative border-b border-white/5 last:border-transparent py-6 md:py-10 block overflow-hidden"
                  >
                    <m.div
                      className="absolute inset-0 origin-left -z-10"
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      style={{ backgroundColor: lineas[activeLinea].color, opacity: 0.1 }}
                    />

                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                      <div className="flex items-center gap-6 md:gap-12">
                        <span className="font-mono text-zinc-600 text-sm md:text-xl group-hover:text-white transition-colors duration-300">
                          0{idx + 1}
                        </span>
                        <h3 className="text-4xl md:text-6xl lg:text-8xl font-black uppercase tracking-tighter text-white/50 group-hover:text-white transition-colors duration-300">
                          {model.nombre}
                        </h3>
                      </div>

                      <div className="flex items-center justify-end w-full md:w-auto md:opacity-0 group-hover:opacity-100 transition-all duration-300 md:-translate-x-10 group-hover:translate-x-0 gap-8">
                        <p className="font-mono text-zinc-400 text-xs md:text-sm max-w-[200px] text-right hidden lg:block">
                          {model.desc}
                        </p>
                        <div
                          className="w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center border-2 transition-transform duration-300 group-hover:rotate-45"
                          style={{ borderColor: lineas[activeLinea].color }}
                        >
                          <ArrowUpRight className="w-6 h-6 md:w-8 md:h-8" style={{ color: lineas[activeLinea].color }} />
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </m.div>
            </AnimatePresence>
          </div>
        </div>
      </section>
    </LazyMotion>
  );
}
