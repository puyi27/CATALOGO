"use client";

import React, { useState } from 'react';
import { LazyMotion, domAnimation, m, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ArrowUpRight, LayoutGrid, Filter } from 'lucide-react';

const demos = [
  { id: 'metal', color: '#ff4500', nombre: 'INDUSTRIA PESADA', path: '/demo/metal', tags: ['industrial', 'backend'], img: '/previews/metal.jpg', fontClass: 'font-mono font-black uppercase tracking-tighter', styleDesc: 'Brutalismo Neón B2B', explanation: 'Diseño hiper-técnico para el sector industrial. Predomina el contraste extremo, fondos oscuros y acentos de color naranja fuego para transmitir precisión milimétrica.' },
  { id: 'panaderia', color: '#d4a373', nombre: 'OBRADOR ARTESANO', path: '/demo/panaderia', tags: ['alimentación', 'ecommerce'], img: '/previews/panaderia.jpg', fontClass: 'font-serif italic tracking-wide', styleDesc: 'Cálido y Orgánico', explanation: 'Estética cálida y cercana. Tonos tierra, tipografías serif clásicas y un flujo visual orgánico pensado para resaltar la artesanía y el producto horneado.' },
  { id: 'interiorismo', color: '#e5e7eb', nombre: 'ARQUITECTURA', path: '/demo/interiorismo', tags: ['construcción', 'portfolio'], img: '/previews/interiorismo.jpg', fontClass: 'font-sans font-light tracking-[0.2em]', styleDesc: 'Espacial y Minimalista', explanation: 'Líneas puras y espacios en blanco masivos. Inspirado en el diseño suizo, permite que la fotografía arquitectónica respire sin interrupciones visuales.' },
  { id: 'almazara', color: '#4E6840', nombre: 'AGROTECH', path: '/demo/almazara', tags: ['agro', 'backend'], img: '/previews/almazara.jpg', fontClass: 'font-serif tracking-tight', styleDesc: 'Terrenal y Elegante', explanation: 'Conexión directa con la naturaleza a través de tonos verde oliva y beige. Interacciones lentas y tipografía editorial para un producto de la tierra.' },
  { id: 'clinica', color: '#008080', nombre: 'CLÍNICA DENTAL', path: '/demo/clinica', tags: ['salud', 'crm'], img: '/previews/clinica.jpg', fontClass: 'font-sans font-medium tracking-tight', styleDesc: 'Clínico e Inmaculado', explanation: 'Diseño limpio y estéril que transmite confianza y profesionalidad médica. Uso intensivo de blancos, azules turquesa y tipografías san-serif ultra legibles.' },
  { id: 'restaurante', color: '#1a1a1a', nombre: 'ALTA GASTRONOMÍA', path: '/demo/restaurante', tags: ['alimentación', 'portfolio'], img: '/previews/restaurante.jpg', fontClass: 'font-serif tracking-widest', styleDesc: 'Oscuro y Premium', explanation: 'Experiencia inmersiva en modo oscuro absoluto. Minimalismo fotográfico para centrar la atención exclusivamente en la alta cocina y la exclusividad.' },
  { id: 'agencia', color: '#ff00ff', nombre: 'AGENCIA CREATIVA', path: '/demo/agencia', tags: ['portfolio', 'branding'], img: '/previews/agencia.jpg', fontClass: 'font-serif italic tracking-tighter', styleDesc: 'Awwwards Brutalism', explanation: 'Brutalismo digital en estado puro. Tipografías desmesuradas, colores ácidos, scroll cinético y ausencia total de reglas convencionales de maquetación.' },
  { id: 'barberia', color: '#b91c1c', nombre: 'BARBERÍA VINTAGE', path: '/demo/barberia', tags: ['servicios', 'ecommerce'], img: '/previews/barberia.jpg', fontClass: 'font-serif font-black uppercase', styleDesc: 'Vintage & Raw', explanation: 'Atmósfera cruda e industrial-vintage. Bloques de color contundentes, tipografía pesada en mayúsculas y transiciones secas que evocan autenticidad.' },
  { id: 'gaming', color: '#8b5cf6', nombre: 'E-SPORTS', path: '/demo/gaming', tags: ['entretenimiento', 'backend'], img: '/previews/gaming.jpg', fontClass: 'font-mono font-black italic tracking-tighter', styleDesc: 'Cyberpunk Neón', explanation: 'Estética ciberpunk de altísimo contraste. Bordes brillantes, colores púrpura radiantes y una interfaz hiperdinámica inspirada en HUDs de videojuegos.' },
  { id: 'inmobiliaria', color: '#3b82f6', nombre: 'REAL ESTATE', path: '/demo/inmobiliaria', tags: ['inmobiliaria', 'vr'], img: '/previews/inmobiliaria.jpg', fontClass: 'font-sans font-light tracking-[0.15em]', styleDesc: 'Ultra Lujo Cinematográfico', explanation: 'Proporciones cinematográficas y movimientos panorámicos. Un diseño elitista desarrollado para comercializar propiedades exclusivas y de ultra-lujo.' },
  { id: 'saas', color: '#0ea5e9', nombre: 'SAAS B2B', path: '/demo/saas', tags: ['tecnología', 'backend'], img: '/previews/saas.jpg', fontClass: 'font-sans font-black tracking-tighter', styleDesc: 'High-Tech Dashboard', explanation: 'Líneas de luz y gradientes fluidos sobre interfaces oscuras. Optimizado para mostrar métricas, datos y la potencia incombustible de un producto SaaS moderno.' },
  { id: 'tienda', color: '#f472b6', nombre: 'LUNA KIDS', path: '/demo/tienda', tags: ['ecommerce', 'infantil'], img: '/previews/tienda.jpg', fontClass: 'font-sans font-medium tracking-wide', styleDesc: 'Dulce y Alegre', explanation: 'Estética cálida y onírica. Paleta de colores empolvados (blanco nube, rosa palo, vainilla) con tipografías redondeadas que transmiten la magia y delicadeza de la moda infantil.' },
  { id: 'tech', color: '#06b6d4', nombre: 'SOFTWARE HOUSE', path: '/demo/tech', tags: ['tecnología', 'backend'], img: '/previews/tech.jpg', fontClass: 'font-mono font-bold tracking-tight', styleDesc: 'Futurista y Limpio', explanation: 'Estructura modular hiper-limpia. Bloques de cristal (glassmorphism), tipografía monoespaciada de código y animaciones microscópicas de extrema precisión.' },
  { id: 'creativo', color: '#f97316', nombre: 'ESTUDIO CREATIVO', path: '/demo/creativo', tags: ['portfolio', 'branding'], img: '/previews/creativo.jpg', fontClass: 'font-sans font-black italic uppercase', styleDesc: 'Ácido y Cinético', explanation: 'Tipografía en movimiento constante. Paleta de colores estridente que busca romper la barrera de lo convencional mediante animaciones y layouts agresivos.' },
  { id: 'editorial', color: '#a855f7', nombre: 'REVISTA DIGITAL', path: '/demo/editorial', tags: ['portfolio', 'branding'], img: '/previews/editorial.jpg', fontClass: 'font-serif font-light tracking-wide', styleDesc: 'Avant-Garde Magazine', explanation: 'Grid complejo y desestructurado. Mezcla intencionada de fuentes Serif romanas gigantes con Sans pequeñas, replicando la maquetación editorial física contemporánea.' },
  { id: 'gastronomia', color: '#ef4444', nombre: 'CHEF ESTRELLA', path: '/demo/gastronomia', tags: ['alimentación', 'portfolio'], img: '/previews/gastronomia.jpg', fontClass: 'font-serif italic', styleDesc: 'Clásico y Sutil', explanation: 'La elegancia de lo intemporal. Párrafos centrales simétricos, animaciones de aparición muy difuminadas e interacciones de ratón extraordinariamente suaves.' },
  { id: 'premium', color: '#fbbf24', nombre: 'RELOJERÍA SUIZA', path: '/demo/premium', tags: ['lujo', 'ecommerce'], img: '/previews/premium.jpg', fontClass: 'font-serif tracking-widest uppercase', styleDesc: 'Sofisticación Heritage', explanation: 'Opulencia dorada sobre negro piano. Animaciones vinculadas al scroll milimétrico para revelar poco a poco los detalles mecánicos de la artesanía de lujo.' },
  { id: 'sostenibilidad', color: '#22c55e', nombre: 'ENERGÍA VERDE', path: '/demo/sostenibilidad', tags: ['agro', 'backend'], img: '/previews/sostenibilidad.jpg', fontClass: 'font-sans font-medium tracking-tight', styleDesc: 'Ecológico Transparente', explanation: 'Diseño abierto, luminoso y positivo. Gráficos de impacto medioambiental, uso del verde como conductor narrativo y micro-interacciones muy amigables.' },
  { id: 'urbano', color: '#f43f5e', nombre: 'STREETWEAR', path: '/demo/urbano', tags: ['ecommerce', 'lujo'], img: '/previews/urbano.jpg', fontClass: 'font-sans font-black italic tracking-tighter', styleDesc: 'Street Culture', explanation: 'Estética callejera cruda, márgenes inexistentes y ritmo agresivo. Marquesinas de texto en bucle y elementos superpuestos con estética de pegatinas urbanas.' },
  { id: 'zen', color: '#a3e635', nombre: 'RETIRO WELLNESS', path: '/demo/zen', tags: ['servicios', 'crm'], img: '/previews/zen.jpg', fontClass: 'font-serif font-light tracking-[0.1em]', styleDesc: 'Paz Visual y Whitespace', explanation: 'El diseño se convierte en meditación pura. Efectos Parallax lentísimos, toneladas de espacio vacío y colores pastel muy desaturados que transmiten paz.' },
  { id: 'nightlife', color: '#e879f9', nombre: 'CLUB & NIGHTLIFE', path: '/demo/nightlife', tags: ['entretenimiento', 'backend'], img: '/previews/nightlife.jpg', fontClass: 'font-sans font-black tracking-tighter uppercase', styleDesc: 'Dark Clubbing', explanation: 'La oscuridad rítmica de la discoteca. Destellos de luz intensa, tipografías condensadas masivas e interacciones que reaccionan de manera vibrante.' },
  { id: 'transporte', color: '#38bdf8', nombre: 'LOGÍSTICA & FLOTA', path: '/demo/transporte', tags: ['industrial', 'backend'], img: '/previews/transporte.jpg', fontClass: 'font-mono font-bold tracking-tight', styleDesc: 'Industrial Dashboard', explanation: 'Máxima eficiencia funcional. Uso de grids de datos rígidos, líneas divisorias técnicas y un enfoque puramente brutalista inspirado en interfaces militares/logísticas.' },
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
                <span className="block text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">Prototipos</span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white/80 to-white/20">Listos para desplegar.</span>
              </h2>
              <p className="text-zinc-500 font-mono text-xs md:text-sm max-w-xs uppercase tracking-widest leading-relaxed">
                Sin coste de alta. Sin compromiso. Elegir, desplegar, vender.
              </p>
            </div>
          </m.div>

          <div className="flex flex-wrap gap-2 mb-10">
            <button
              onClick={() => setActiveTag(null)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-[10px] font-mono uppercase tracking-widest border transition-all duration-300 ${
                !activeTag
                  ? 'bg-white/10 text-white border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.1)] backdrop-blur-md'
                  : 'text-zinc-500 border-white/5 hover:border-white/20 hover:bg-white/5 backdrop-blur-sm'
              }`}
            >
              <Filter className="w-3 h-3" />
              Todos
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                className={`px-4 py-2 rounded-full text-[10px] font-mono uppercase tracking-widest border transition-all duration-300 ${
                  activeTag === tag
                    ? 'bg-white/10 text-white border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.1)] backdrop-blur-md'
                    : 'text-zinc-500 border-white/5 hover:border-white/20 hover:bg-white/5 backdrop-blur-sm'
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
                    className="group block relative aspect-[4/5] overflow-hidden rounded-lg border border-white/5 hover:border-white/20 transition-all duration-500"
                    style={{ boxShadow: `0 0 0px ${demo.color}00` }}
                    onMouseEnter={(e) => e.currentTarget.style.boxShadow = `0 20px 40px -10px ${demo.color}40, inset 0 0 20px ${demo.color}10`}
                    onMouseLeave={(e) => e.currentTarget.style.boxShadow = `0 0 0px ${demo.color}00`}
                  >
                    {/* The new automated screenshot */}
                    <img
                      src={demo.img}
                      alt={demo.nombre}
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 w-full h-full object-cover grayscale opacity-70 group-hover:grayscale-0 transition-all duration-700 transform-gpu will-change-transform scale-105 group-hover:scale-100 z-0"
                    />

                    {/* Generative Hover Background overlay */}
                    <div className="absolute inset-0 z-10 pointer-events-none">
                      <div 
                        className="absolute top-1/2 left-1/2 w-[150%] h-[150%] opacity-0 group-hover:opacity-40 transition-all duration-1000 ease-out transform-gpu will-change-transform -translate-x-1/2 -translate-y-1/2 scale-100 group-hover:scale-125 group-hover:rotate-12 mix-blend-screen"
                        style={{
                          background: `radial-gradient(circle at center, ${demo.color} 0%, transparent 55%)`
                        }}
                      />
                      
                      {/* Grid Pattern Overlay */}
                      <div className="absolute inset-0 opacity-10 group-hover:opacity-30 transition-opacity duration-700 mix-blend-overlay transform-gpu" 
                           style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)', backgroundSize: '30px 30px' }} 
                      />

                      {/* Bottom Fade for Text Readability */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/70 to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />
                    </div>

                    <div className="absolute top-3 left-3 z-20">
                      <span
                        className="text-[10px] font-mono uppercase tracking-widest px-2 py-1 rounded"
                        style={{ backgroundColor: `${demo.color}20`, color: demo.color, border: `1px solid ${demo.color}40` }}
                      >
                        {demo.tags[0]}
                      </span>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-5 z-20">
                      <div className="flex flex-col gap-1">
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
                        {/* Style Description & Explanation */}
                        <div>
                          <p className="text-[10px] sm:text-xs text-white/50 font-mono tracking-widest uppercase mt-1 opacity-70 group-hover:opacity-100 transition-opacity" style={{ color: demo.color }}>
                            {demo.styleDesc}
                          </p>
                          <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
                            <p className="overflow-hidden text-[10px] sm:text-xs text-zinc-300 font-sans tracking-normal leading-relaxed mt-0 group-hover:mt-2 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100 line-clamp-3">
                              {demo.explanation}
                            </p>
                          </div>
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
