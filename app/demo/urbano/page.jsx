"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, X, Menu, Instagram, Zap, ShoppingBag, Play, Volume2, MapPin, Star, Music } from "lucide-react";
import DemoLayout from "@/components/DemoLayout";

const drops = [
  { id: 1, name: "BETON HOODIE", price: "89€", status: "LIVE", desc: "Algodón orgánico 400gsm. Oversized fit. Serigrafía manual. Lavado enzimático vintage.", gradient: "from-[#333] to-[#1a1a1a]", sizes: "S M L XL" },
  { id: 2, name: "FRACTURA TEE", price: "45€", status: "LIVE", desc: "Jersey 180gsm. Estampado split graphic. Costuras expuestas. Corte boxy.", gradient: "from-[#1a1a1a] to-[#2a2a2a]", sizes: "S M L XL XXL" },
  { id: 3, name: "ASFALTO CARGO", price: "110€", status: "SOON", desc: "Ripstop reforzado. 6 bolsillos utilidad. Cintura ajustable. Cordones en bajo.", gradient: "from-[#2a2a2a] to-[#444]", sizes: "28 30 32 34 36" },
  { id: 4, name: "MURO CAP", price: "35€", status: "LIVE", desc: "5 panel. Bordado frontal 3D. Cierre latón envejecido. Talla única.", gradient: "from-[#444] to-[#333]", sizes: "Única" },
  { id: 5, name: "CONCRETE JACKET", price: "150€", status: "SOLD OUT", desc: "Coach jacket en nylon ripstop. Forro de mesh. Print trasero completo.", gradient: "from-[#222] to-[#111]", sizes: "—" },
  { id: 6, name: "NOISE TOTE", price: "28€", status: "LIVE", desc: "Lona 12oz. Print a una tinta. Asas reforzadas con doble costura.", gradient: "from-[#3a3a3a] to-[#2a2a2a]", sizes: "Única" },
];

const events = [
  { date: "15 JUN", title: "POP-UP: Alameda", desc: "Venta flash + DJ set con Mala Rodríguez. Solo efectivo. 17h-22h.", where: "Plaza Alameda, Sevilla" },
  { date: "28 JUN", title: "MURAL JAM", desc: "Sesión de graffiti abierta con artistas locales. Sprays gratis. Ven a pintar.", where: "Polígono San Pablo" },
  { date: "12 JUL", title: "DROP 003: RUIDO", desc: "Lanzamiento de la tercera colección. Pre-venta exclusiva para newsletter.", where: "Online + tienda" },
];

const artists = [
  { name: "ZETA", medium: "Graffiti · Muralismo", desc: "Pinta las calles de Sevilla desde 2010. Geométrico y salvaje." },
  { name: "NADA", medium: "Serigrafía · Collage", desc: "Diseña todos los prints de HORMIGÓN. Corta, pega y destruye." },
  { name: "RUIDO", medium: "Fotografía · Documental", desc: "Documenta la escena urbana sevillana. 35mm y blanco y negro." },
];

export default function UrbanoDemo() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedDrop, setSelectedDrop] = useState(null);
  const [glitch, setGlitch] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 150);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <DemoLayout title="HORMIGÓN" year="2026">
      <div className="text-white selection:bg-[#ff3333] selection:text-black overflow-x-hidden bg-[#0a0a0a] uppercase" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>

        {/* ═══ MOBILE MENU ═══ */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
              transition={{ type: "tween", duration: 0.4, ease: [0.7, 0, 0.3, 1] }}
              className="fixed inset-0 bg-[#ff3333] z-[90] flex flex-col justify-center p-8 md:hidden">
              <button onClick={() => setMenuOpen(false)} className="absolute top-6 right-6 text-black"><X className="w-8 h-8" /></button>
              <nav className="flex flex-col gap-4 text-black">
                {["Drop", "Eventos", "Crew", "Newsletter"].map((item, i) => (
                  <motion.a key={item} initial={{ x: -30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: i * 0.08 }}
                    className="text-5xl font-black tracking-tighter" onClick={() => setMenuOpen(false)} href={`#${item.toLowerCase()}`}>{item}</motion.a>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ═══ NAV ═══ */}
        <nav className="fixed top-0 left-0 w-full px-6 md:px-12 py-4 flex justify-between items-center z-[80] mix-blend-difference">
          <span className="text-xs font-black tracking-[0.4em]">HORMIGÓN</span>
          <div className="hidden md:flex items-center gap-6">
            {["Drop", "Eventos", "Crew"].map(item => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-[10px] font-bold tracking-widest hover:opacity-50 transition-opacity">{item}</a>
            ))}
            <a href="#newsletter" className="px-4 py-2 bg-[#ff3333] text-black text-[10px] font-black tracking-widest">JOIN</a>
          </div>
          <button onClick={() => setMenuOpen(true)} className="md:hidden"><Menu className="w-6 h-6" /></button>
        </nav>

        {/* ═══════════════════════════════════
            1. HERO — RAW URBAN
        ═══════════════════════════════════ */}
        <section className="h-screen flex flex-col justify-end px-6 md:px-12 pb-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#111] to-[#0a0a0a]" />

          {/* Noise texture */}
          <div className="absolute inset-0 opacity-[0.15] mix-blend-overlay" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E\")" }} />

          {/* Glitch lines */}
          {glitch && (
            <div className="absolute inset-0 z-20 pointer-events-none">
              <div className="absolute top-[30%] left-0 right-0 h-[2px] bg-[#ff3333]" />
              <div className="absolute top-[60%] left-0 right-0 h-[1px] bg-[#00ff00]/30" />
              <div className="absolute top-[45%] left-0 w-[60%] h-[3px] bg-[#ff3333]/50" />
            </div>
          )}

          <div className="relative z-10 max-w-6xl mx-auto w-full">
            <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-2 h-2 bg-[#ff3333] animate-pulse" />
                <span className="text-[10px] font-bold tracking-widest text-[#ff3333]">DROP 002 — LIVE NOW</span>
              </div>

              <h1 className="text-[clamp(4rem,20vw,14rem)] font-black leading-[0.8] tracking-tighter">
                HORM<span className={`${glitch ? 'text-[#ff3333]' : 'text-white'} transition-colors`}>I</span>GÓN
              </h1>

              <p className="text-xs font-bold tracking-[0.3em] text-white/20 mt-6 normal-case max-w-md">
                Streetwear from the concrete. Sevilla underground. Limited runs. No restocks.
              </p>

              <div className="flex gap-4 mt-8">
                <a href="#drop" className="px-8 py-4 bg-[#ff3333] text-black text-xs font-black tracking-widest hover:bg-white hover:text-black transition-colors">SHOP DROP</a>
                <a href="#eventos" className="px-8 py-4 border-2 border-white/10 text-xs font-bold tracking-widest hover:border-[#ff3333] hover:text-[#ff3333] transition-all">EVENTS</a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ═══════════════════════════════════
            2. DROP — PRODUCT GRID
        ═══════════════════════════════════ */}
        <section id="drop" className="py-20 md:py-32 px-6 md:px-12">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-end justify-between mb-12">
              <h2 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.85]">DROP<br/>002.</h2>
              <span className="text-[10px] font-bold tracking-widest text-[#ff3333]">6 PIEZAS · EDICIÓN LIMITADA</span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
              {drops.map((d, i) => (
                <motion.div key={d.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }} viewport={{ once: true }}
                  className="group cursor-pointer" onClick={() => setSelectedDrop(d)}>
                  <div className={`aspect-[3/4] bg-gradient-to-br ${d.gradient} relative overflow-hidden mb-3`}>
                    <span className={`absolute top-3 left-3 px-2 py-1 text-[8px] font-black tracking-widest ${
                      d.status === 'SOLD OUT' ? 'bg-white/10 text-white/30 line-through' :
                      d.status === 'SOON' ? 'bg-[#ff3333]/20 text-[#ff3333]' :
                      'bg-[#ff3333] text-black'
                    }`}>{d.status}</span>
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#ff3333] scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                  </div>
                  <h3 className="text-xs font-black tracking-widest group-hover:text-[#ff3333] transition-colors">{d.name}</h3>
                  <span className="text-sm font-black text-[#ff3333] block mt-1">{d.price}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ PRODUCT MODAL ═══ */}
        <AnimatePresence>
          {selectedDrop && (
            <>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onClick={() => setSelectedDrop(null)} className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[100]" />
              <motion.div initial={{ opacity: 0, y: "100%" }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: "100%" }}
                transition={{ type: "tween", ease: [0.16, 1, 0.3, 1] }}
                className="fixed bottom-0 left-0 right-0 md:inset-4 bg-[#0a0a0a] z-[101] overflow-y-auto p-8 md:p-16 border-t-4 md:border-4 border-[#ff3333]">
                <button onClick={() => setSelectedDrop(null)} className="absolute top-6 right-6"><X className="w-6 h-6 text-[#ff3333]" /></button>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start max-w-4xl mx-auto">
                  <div className={`aspect-[3/4] bg-gradient-to-br ${selectedDrop.gradient} sticky top-8`} />
                  <div>
                    <span className={`px-2 py-1 text-[8px] font-black tracking-widest ${selectedDrop.status === 'SOLD OUT' ? 'bg-white/10 text-white/30' : 'bg-[#ff3333] text-black'}`}>{selectedDrop.status}</span>
                    <h2 className="text-4xl font-black tracking-tighter mt-4 mb-2">{selectedDrop.name}</h2>
                    <span className="text-3xl font-black text-[#ff3333]">{selectedDrop.price}</span>
                    <p className="text-xs text-white/30 mt-6 leading-relaxed normal-case">{selectedDrop.desc}</p>
                    <div className="mt-6">
                      <span className="text-[10px] font-bold tracking-widest text-white/20 block mb-2">Tallas</span>
                      <div className="flex gap-2">
                        {selectedDrop.sizes.split(' ').map((s, si) => (
                          <span key={si} className="px-3 py-2 border border-white/10 text-[10px] font-bold hover:border-[#ff3333] hover:text-[#ff3333] transition-colors cursor-pointer">{s}</span>
                        ))}
                      </div>
                    </div>
                    {selectedDrop.status !== 'SOLD OUT' && (
                      <button className="mt-8 w-full py-4 bg-[#ff3333] text-black text-xs font-black tracking-widest hover:bg-white transition-colors">
                        {selectedDrop.status === 'SOON' ? 'NOTIFY ME' : 'ADD TO CART'}
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* ═══════════════════════════════════
            3. MARQUEE
        ═══════════════════════════════════ */}
        <section className="py-8 overflow-hidden border-y border-[#ff3333]/10">
          <motion.div animate={{ x: [0, -1200] }} transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
            className="whitespace-nowrap text-6xl md:text-8xl font-black tracking-tighter text-[#ff3333]/5">
            NO RESTOCK ✦ LIMITED RUNS ✦ SEVILLA UNDERGROUND ✦ CONCRETE CULTURE ✦ NO RESTOCK ✦ LIMITED RUNS ✦ SEVILLA UNDERGROUND ✦
          </motion.div>
        </section>

        {/* ═══════════════════════════════════
            4. EVENTOS
        ═══════════════════════════════════ */}
        <section id="eventos" className="py-20 md:py-32 px-6 md:px-12">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-6xl md:text-8xl font-black tracking-tighter mb-16 leading-[0.85]">WHAT'S<br/>NEXT.</h2>
            <div className="space-y-0">
              {events.map((e, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }} viewport={{ once: true }}
                  className="flex flex-col md:flex-row md:items-center justify-between py-6 border-b border-white/5 group hover:border-[#ff3333]/20 transition-colors">
                  <div className="flex items-start gap-4 md:gap-8 mb-2 md:mb-0">
                    <span className="text-2xl md:text-3xl font-black text-[#ff3333] shrink-0 w-24">{e.date}</span>
                    <div>
                      <h3 className="text-xl md:text-2xl font-black tracking-tighter group-hover:text-[#ff3333] transition-colors">{e.title}</h3>
                      <p className="text-[10px] text-white/20 mt-1 normal-case max-w-md">{e.desc}</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold tracking-widest text-white/10 flex items-center gap-1 ml-24 md:ml-0"><MapPin className="w-3 h-3" />{e.where}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════
            5. CREW
        ═══════════════════════════════════ */}
        <section id="crew" className="py-20 md:py-32 px-6 md:px-12 bg-[#ff3333] text-black">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-6xl md:text-8xl font-black tracking-tighter mb-16 leading-[0.85]">THE<br/>CREW.</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {artists.map((a, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.15 }} viewport={{ once: true }}>
                  <div className="aspect-square bg-black/10 mb-4 relative overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-8xl font-black text-black/[0.06] select-none">{a.name[0]}</span>
                    </div>
                  </div>
                  <h3 className="text-2xl font-black tracking-tighter">{a.name}</h3>
                  <p className="text-[10px] font-bold tracking-widest text-black/50 mt-1">{a.medium}</p>
                  <p className="text-xs text-black/60 mt-2 normal-case">{a.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════
            6. MANIFIESTO
        ═══════════════════════════════════ */}
        <section className="py-24 md:py-40 px-6 md:px-12">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-8">MANIFIESTO</h2>
            <p className="text-base md:text-lg text-white/30 leading-[2] normal-case italic" style={{ fontFamily: "Georgia, serif" }}>
              HORMIGÓN nace en las aceras de Sevilla. En los muros que nadie mira. En la tinta que se queda en las manos.
              No hacemos moda. Hacemos ropa para gente que camina, que pinta, que rompe.
              Sin inversores. Sin influencers. Sin prisa.
              Cada pieza se fabrica en talleres locales. Tiramos de 50 unidades por modelo. Cuando se acaba, se acabó.
              Esto no es una marca. Es un muro en blanco esperando tu firma.
            </p>
          </div>
        </section>

        {/* ═══════════════════════════════════
            7. NEWSLETTER
        ═══════════════════════════════════ */}
        <section id="newsletter" className="py-20 md:py-32 px-6 md:px-12 border-t border-white/5">
          <div className="max-w-xl mx-auto text-center">
            <h2 className="text-4xl font-black tracking-tighter mb-4">GET IN.</h2>
            <p className="text-xs text-white/20 mb-8 normal-case">Acceso anticipado a drops. Invitaciones a eventos. Sin spam. Solo hormigón.</p>
            <div className="flex gap-2">
              <input type="email" placeholder="TU@EMAIL.COM"
                className="flex-1 px-4 py-3 text-xs font-bold tracking-widest bg-white/5 border-2 border-white/10 outline-none focus:border-[#ff3333] transition-colors placeholder:text-white/10" />
              <button className="px-6 py-3 bg-[#ff3333] text-black text-xs font-black tracking-widest hover:bg-white transition-colors">JOIN</button>
            </div>
          </div>
        </section>

        {/* ═══ FOOTER ═══ */}
        <footer className="py-8 px-6 md:px-12 border-t border-white/5">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[10px] font-bold tracking-widest text-white/10">© 2026 HORMIGÓN SEVILLA. NO RESTOCK.</p>
            <a href="#" className="flex items-center gap-2 text-[10px] font-bold tracking-widest text-white/10 hover:text-[#ff3333] transition-colors">
              <Instagram className="w-3 h-3" /> @HORMIGON.SVQ
            </a>
          </div>
        </footer>

      </div>
    </DemoLayout>
  );
}