"use client";

import React, { useState } from 'react';
import { LazyMotion, domAnimation, m, AnimatePresence } from 'framer-motion';
import { Type, Palette, Layout, Zap, MousePointer2, Activity } from 'lucide-react';

export default function MicroInteractionsLab() {
  const [theme, setTheme] = useState('dark');
  const [font, setFont] = useState('sans');
  const [layout, setLayout] = useState('grid');
  const [animation, setAnimation] = useState('spring');
  
  const themes = {
    dark: { bg: '#050505', text: '#FFFFFF', accent: '#3b82f6', card: '#121212' },
    cyber: { bg: '#0f0c29', text: '#00ffcc', accent: '#ff00ff', card: '#1a1025' },
    minimal: { bg: '#f8fafc', text: '#0f172a', accent: '#0f172a', card: '#ffffff' },
    luxury: { bg: '#1c1917', text: '#f5e6d3', accent: '#d4af37', card: '#292524' },
    industrial: { bg: '#111111', text: '#e5e7eb', accent: '#ff4500', card: '#1f1f1f' },
    neon: { bg: '#000000', text: '#fff', accent: '#39ff14', card: '#0a0a0a' },
    monochrome: { bg: '#ffffff', text: '#000000', accent: '#000000', card: '#f0f0f0' },
    ocean: { bg: '#001a33', text: '#e6f2ff', accent: '#00e6e6', card: '#002b4d' },
  };

  const fonts = {
    sans: 'font-sans',
    serif: 'font-serif',
    mono: 'font-mono'
  };

  const animations = {
    spring: { type: "spring", stiffness: 400, damping: 25 },
    bounce: { type: "spring", stiffness: 300, damping: 10 },
    smooth: { type: "tween", duration: 0.5, ease: "easeInOut" },
    snap: { type: "spring", stiffness: 600, damping: 20 }
  };

  const activeTheme = themes[theme];
  const activeAnimation = animations[animation];

  return (
    <LazyMotion features={domAnimation}>
      <m.section 
        animate={{ backgroundColor: activeTheme.bg, color: activeTheme.text }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className={`py-32 relative overflow-hidden ${fonts[font]}`}
      >
        <div className="max-w-[90rem] mx-auto px-6 relative z-10">
          
          <div className="text-center mb-24">
            <m.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-6 text-xs font-bold uppercase tracking-widest"
              style={{ borderColor: `${activeTheme.accent}40`, color: activeTheme.accent, backgroundColor: `${activeTheme.accent}10` }}
            >
              <MousePointer2 className="w-4 h-4" />
              Laboratorio Interactivo
            </m.div>
            <m.h2 
              layout="position"
              className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 tracking-tight uppercase"
            >
              Tu Catálogo en Directo.
            </m.h2>
            <p className="text-xl max-w-3xl mx-auto opacity-70">
              Experimenta el núcleo de nuestra arquitectura. Intercambia docenas de variables en tiempo real y observa cómo el motor reactivo recompila la interfaz instantáneamente sin degradar el framerate de la GPU.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            <div className="lg:col-span-4 space-y-6">
              
              <m.div animate={{ backgroundColor: activeTheme.card }} className="p-6 rounded-3xl shadow-xl border border-black/5 dark:border-white/5">
                <div className="flex items-center gap-2 mb-5 opacity-70 font-bold uppercase text-xs tracking-widest">
                  <Palette className="w-4 h-4" /> Paleta de Marca
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {Object.keys(themes).map(t => (
                    <button 
                      key={t} onClick={() => setTheme(t)}
                      className={`py-3 px-4 rounded-xl text-sm font-bold capitalize transition-all hover:scale-[1.02] active:scale-95 ${theme === t ? 'ring-2 ring-offset-2' : 'opacity-60'}`}
                      style={{ 
                        backgroundColor: themes[t].bg, 
                        color: themes[t].text,
                        ringColor: activeTheme.accent,
                        ringOffsetColor: activeTheme.card
                      }}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </m.div>

              <m.div animate={{ backgroundColor: activeTheme.card }} className="p-6 rounded-3xl shadow-xl border border-black/5 dark:border-white/5">
                <div className="flex items-center gap-2 mb-5 opacity-70 font-bold uppercase text-xs tracking-widest">
                  <Layout className="w-4 h-4" /> Arquitectura (Layout)
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {['grid', 'bento', 'list', 'masonry'].map(l => (
                     <button 
                       key={l} onClick={() => setLayout(l)} 
                       className={`py-3 rounded-xl transition-all font-medium text-sm capitalize ${layout === l ? 'shadow-md opacity-100' : 'opacity-40 hover:opacity-80'}`}
                       style={{ backgroundColor: layout === l ? activeTheme.accent : 'transparent', color: layout === l ? (themes[theme].bg === '#ffffff' ? '#000' : '#fff') : 'inherit', border: `1px solid ${activeTheme.accent}40` }}
                     >
                       {l}
                     </button>
                  ))}
                </div>
              </m.div>

              <div className="grid grid-cols-2 gap-6">
                 <m.div animate={{ backgroundColor: activeTheme.card }} className="p-6 rounded-3xl shadow-xl border border-black/5 dark:border-white/5">
                   <div className="flex items-center gap-2 mb-5 opacity-70 font-bold uppercase text-xs tracking-widest">
                     <Activity className="w-4 h-4" /> Físicas
                   </div>
                   <div className="flex flex-col gap-2">
                     {Object.keys(animations).map(a => (
                       <button 
                         key={a} onClick={() => setAnimation(a)}
                         className={`py-2 rounded-lg text-xs capitalize transition-all ${animation === a ? 'font-bold' : 'opacity-50 hover:opacity-100'}`}
                         style={{ backgroundColor: animation === a ? `${activeTheme.accent}20` : 'transparent', color: animation === a ? activeTheme.accent : 'inherit' }}
                       >
                         {a}
                       </button>
                     ))}
                   </div>
                 </m.div>

                 <m.div animate={{ backgroundColor: activeTheme.card }} className="p-6 rounded-3xl shadow-xl border border-black/5 dark:border-white/5">
                   <div className="flex items-center gap-2 mb-5 opacity-70 font-bold uppercase text-xs tracking-widest">
                     <Type className="w-4 h-4" /> Fuentes
                   </div>
                   <div className="flex flex-col gap-2">
                     {Object.keys(fonts).map(f => (
                       <button 
                         key={f} onClick={() => setFont(f)}
                         className={`py-2 rounded-lg text-xs capitalize transition-all ${fonts[f]} ${font === f ? 'font-bold' : 'opacity-50 hover:opacity-100'}`}
                         style={{ backgroundColor: font === f ? `${activeTheme.accent}20` : 'transparent', color: font === f ? activeTheme.accent : 'inherit' }}
                       >
                         {f}
                       </button>
                     ))}
                   </div>
                 </m.div>
              </div>

            </div>

            <div className="lg:col-span-8">
              <m.div 
                layout
                className={`w-full h-full min-h-[600px] p-6 md:p-10 rounded-[40px] shadow-2xl border border-black/5 dark:border-white/5 flex 
                  ${layout === 'list' ? 'flex-col gap-4' : 
                    layout === 'bento' ? 'grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[160px]' : 
                    layout === 'masonry' ? 'grid grid-cols-1 md:grid-cols-2 gap-4' :
                    'grid grid-cols-1 md:grid-cols-2 gap-6'}`}
                animate={{ backgroundColor: activeTheme.card }}
              >
                 {[1, 2, 3, 4, 5, 6].map((i) => (
                   <m.div
                     layout
                     key={i}
                     whileHover={{ scale: 1.03, rotate: i % 2 === 0 ? 1 : -1, y: -5 }}
                     whileTap={{ scale: 0.97 }}
                     transition={activeAnimation}
                     className={`relative overflow-hidden rounded-3xl flex items-center justify-center cursor-pointer group shadow-lg
                       ${layout === 'bento' && i === 1 ? 'md:col-span-2 md:row-span-2' : ''}
                       ${layout === 'bento' && i === 4 ? 'md:col-span-2 md:row-span-1' : ''}
                       ${layout === 'masonry' && i % 3 === 0 ? 'row-span-2' : ''}
                       ${layout === 'list' ? 'h-24 w-full justify-start px-8' : 'h-full w-full min-h-[160px]'}
                     `}
                     style={{ backgroundColor: activeTheme.bg }}
                   >
                     <m.div 
                       className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                       style={{ backgroundColor: activeTheme.accent }}
                     />
                     
                     <div className={`flex items-center gap-5 z-10 ${layout === 'list' ? 'flex-row w-full' : 'flex-col text-center'}`}>
                       <div 
                          className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-inner" 
                          style={{ backgroundColor: activeTheme.card, color: activeTheme.accent }}
                       >
                         <Zap className="w-6 h-6" />
                       </div>
                       <div className={`${layout === 'list' ? 'flex-1 flex justify-between items-center' : ''}`}>
                         <div>
                           <h3 className={`font-bold ${layout === 'bento' && i === 1 ? 'text-4xl' : 'text-xl'}`}>Módulo {i}</h3>
                           <p className="text-sm opacity-60 mt-1 font-mono uppercase tracking-widest text-[10px]">Render Activo</p>
                         </div>
                         {layout === 'list' && (
                           <div className="w-8 h-8 rounded-full flex items-center justify-center border" style={{ borderColor: `${activeTheme.accent}40`, color: activeTheme.accent }}>
                             →
                           </div>
                         )}
                       </div>
                     </div>
                   </m.div>
                 ))}
              </m.div>
            </div>
            
          </div>

        </div>
      </m.section>
    </LazyMotion>
  );
}