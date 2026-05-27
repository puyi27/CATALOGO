"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, MapPin, Clock, Star, Wine, Utensils, Flame, X, Menu, Instagram, ChevronRight } from "lucide-react";
import DemoLayout from "@/components/DemoLayout";

const menuItems = {
  entrantes: [
    { name: "Salmorejo Cordobés", desc: "Con virutas de jamón ibérico y huevo de codorniz confitado", price: "9€" },
    { name: "Croquetas de Puchero", desc: "Crujientes por fuera, cremosas por dentro. Receta de la abuela Concha", price: "11€" },
    { name: "Ensaladilla Rusa Deconstruida", desc: "Mayonesa de ajo negro, langostino de Sanlúcar, alcaparras", price: "13€" },
    { name: "Tortillita de Camarones", desc: "Con alioli de lima y cilantro fresco", price: "10€" },
  ],
  principales: [
    { name: "Rabo de Toro a la Cordobesa", desc: "Guisado durante 6 horas con vino Pedro Ximénez. Puré de patata trufado", price: "22€" },
    { name: "Atún Rojo de Almadraba", desc: "Tataki con sésamo negro, ponzu casero y wakame", price: "26€" },
    { name: "Carrillada Ibérica", desc: "Braseada con reducción de Oloroso. Verduras de temporada asadas", price: "19€" },
    { name: "Bacalao al Pil-Pil", desc: "Con espuma de ajo suave y pimiento choricero confitado", price: "21€" },
  ],
  postres: [
    { name: "Torrija Caramelizada", desc: "Con helado de canela y miel de caña de Frigiliana", price: "8€" },
    { name: "Coulant de Chocolate 70%", desc: "Con crema inglesa de naranja amarga y sal Maldon", price: "9€" },
    { name: "Crema Catalana", desc: "Clásica. Vainilla de Madagascar y azúcar quemado al momento", price: "7€" },
  ],
};

const wines = [
  { name: "Fino La Barajuela", bodega: "Luis Pérez", region: "Jerez", price: "Copa 4€ / Bot. 22€" },
  { name: "Ribera del Duero Reserva", bodega: "Pesquera", region: "Valladolid", price: "Copa 6€ / Bot. 38€" },
  { name: "Albariño Mar de Frades", bodega: "Mar de Frades", region: "Rías Baixas", price: "Copa 5€ / Bot. 28€" },
];

const reviews = [
  { name: "Miguel A.", rating: 5, text: "El rabo de toro es el mejor que he probado fuera de Córdoba. El servicio, impecable. Volveremos.", source: "Google" },
  { name: "Laura P.", rating: 5, text: "Cenamos en la terraza. El ambiente, la comida, los vinos... todo perfecto. Una experiencia.", source: "TripAdvisor" },
  { name: "Antonio S.", rating: 5, text: "Las croquetas de puchero me recordaron a las de mi madre. Eso es lo más grande que puedo decir.", source: "Google" },
];

export default function RestauranteDemo() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("entrantes");

  return (
    <DemoLayout title="Casa Concha" year="2026">
      <div className="text-[#1a0505] selection:bg-[#8B0000] selection:text-[#f5f0e8] overflow-x-hidden bg-[#f5f0e8]" style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}>

        {/* ═══ MOBILE MENU ═══ */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-[#1a0505] z-[90] flex flex-col justify-center items-center md:hidden">
              <button onClick={() => setMenuOpen(false)} className="absolute top-6 right-6"><X className="w-6 h-6 text-[#f5f0e8]" /></button>
              <nav className="flex flex-col gap-6 text-center">
                {["La Carta", "Bodega", "Nosotros", "Reservar"].map((item, i) => (
                  <motion.a key={item} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: i * 0.1 }}
                    className="text-3xl text-[#f5f0e8] tracking-wide" onClick={() => setMenuOpen(false)} href={`#${item.toLowerCase().replace(' ', '-')}`}>{item}</motion.a>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ═══ NAV ═══ */}
        <nav className="fixed top-0 left-0 w-full px-6 md:px-16 py-5 flex justify-between items-center z-[80] bg-[#f5f0e8]/90 backdrop-blur-lg border-b border-[#8B0000]/5">
          <span className="text-xs tracking-[0.3em] uppercase text-[#8B0000]">Casa Concha</span>
          <div className="hidden md:flex items-center gap-8">
            {["La Carta", "Bodega", "Nosotros"].map(item => (
              <a key={item} href={`#${item.toLowerCase().replace(' ', '-')}`} className="text-[11px] tracking-[0.15em] uppercase text-[#1a0505]/40 hover:text-[#8B0000] transition-colors">{item}</a>
            ))}
            <a href="#reservar" className="px-5 py-2 bg-[#8B0000] text-[#f5f0e8] text-xs tracking-[0.15em] uppercase rounded-full hover:bg-[#6d0000] transition-colors">Reservar Mesa</a>
          </div>
          <button onClick={() => setMenuOpen(true)} className="md:hidden"><Menu className="w-5 h-5 text-[#8B0000]" /></button>
        </nav>

        {/* ═══════════════════════════════════
            1. HERO — CÁLIDA Y TÁCTIL
        ═══════════════════════════════════ */}
        <section className="min-h-[80vh] md:min-h-screen flex flex-col justify-end px-6 md:px-16 pb-16 md:pb-24 pt-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-[#f5f0e8] via-[#f5f0e8] to-[#ede5d8]" />
          
          <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[50vw] h-[70vh] rounded-l-[3rem] bg-gradient-to-br from-[#8B0000]/5 to-[#8B0000]/10 hidden md:block" />

          <div className="relative z-10 max-w-5xl">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}
              className="flex items-center gap-4 mb-8">
              <div className="w-10 h-[1px] bg-[#8B0000]/30" />
              <span className="text-[10px] tracking-[0.5em] uppercase text-[#8B0000]/50">Cocina andaluza de autor · Desde 1987</span>
            </motion.div>
            
            <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.3 }}
              className="text-[clamp(2.5rem,8vw,6rem)] leading-[1.05] tracking-tight mb-8">
              Donde la tradición<br/>
              <span className="italic text-[#8B0000]">se sirve en mesa.</span>
            </motion.h1>

            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
              className="text-base text-[#1a0505]/40 max-w-lg leading-relaxed mb-10" style={{ fontFamily: "system-ui" }}>
              Recetas heredadas, producto de mercado, vinos con historia. Un rincón donde el tiempo sabe a lumbre lenta.
            </motion.p>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
              className="flex flex-col sm:flex-row gap-3">
              <a href="#reservar" className="px-8 py-3.5 bg-[#8B0000] text-[#f5f0e8] text-xs tracking-[0.15em] uppercase rounded-full hover:bg-[#6d0000] transition-colors text-center">Reservar Mesa</a>
              <a href="#la-carta" className="px-8 py-3.5 border border-[#8B0000]/20 text-[#8B0000] text-xs tracking-[0.15em] uppercase rounded-full hover:border-[#8B0000]/40 transition-colors text-center">Ver la Carta</a>
            </motion.div>
          </div>
        </section>

        {/* ═══════════════════════════════════
            2. LA CARTA — TABS
        ═══════════════════════════════════ */}
        <section id="la-carta" className="py-20 md:py-32 px-6 md:px-16 bg-[#1a0505] text-[#f5f0e8]">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <span className="text-[10px] tracking-[0.5em] uppercase text-[#8B0000] block mb-4">Nuestra carta</span>
              <h2 className="text-4xl md:text-5xl tracking-tight font-light">Sabores de siempre</h2>
            </div>

            <div className="flex justify-center gap-6 mb-12">
              {[
                { key: "entrantes", label: "Entrantes", icon: Flame },
                { key: "principales", label: "Principales", icon: Utensils },
                { key: "postres", label: "Postres", icon: Star },
              ].map(t => (
                <button key={t.key} onClick={() => setActiveTab(t.key)}
                  className={`flex items-center gap-2 px-4 py-2 text-[10px] tracking-[0.2em] uppercase rounded-full border transition-all ${activeTab === t.key ? 'border-[#8B0000] bg-[#8B0000]/10 text-[#f5f0e8]' : 'border-[#f5f0e8]/10 text-[#f5f0e8]/40 hover:border-[#f5f0e8]/20'}`}
                  style={{ fontFamily: "system-ui" }}>
                  <t.icon className="w-3 h-3" /> {t.label}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                className="space-y-0">
                {menuItems[activeTab].map((item, i) => (
                  <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.08 }}
                    className="flex justify-between items-start py-6 border-b border-[#f5f0e8]/5 group">
                    <div className="flex-1 pr-8">
                      <h3 className="text-lg tracking-wide group-hover:text-[#8B0000] transition-colors" style={{ fontFamily: "Georgia, serif" }}>{item.name}</h3>
                      <p className="text-xs text-[#f5f0e8]/30 mt-1 leading-relaxed" style={{ fontFamily: "system-ui" }}>{item.desc}</p>
                    </div>
                    <span className="text-lg text-[#8B0000] font-light shrink-0">{item.price}</span>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>

            <p className="text-center text-[10px] text-[#f5f0e8]/20 mt-12 tracking-wide" style={{ fontFamily: "system-ui" }}>
              IVA incluido. Alérgenos disponibles bajo solicitud. Carta sujeta a disponibilidad de mercado.
            </p>
          </div>
        </section>

        {/* ═══════════════════════════════════
            3. BODEGA
        ═══════════════════════════════════ */}
        <section id="bodega" className="py-20 md:py-32 px-6 md:px-16 bg-[#f5f0e8]">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
              <div>
                <span className="text-[10px] tracking-[0.5em] uppercase text-[#8B0000] block mb-4">Selección de vinos</span>
                <h2 className="text-4xl font-light tracking-tight">La bodega</h2>
              </div>
              <Wine className="w-6 h-6 text-[#8B0000]/20" />
            </div>

            <div className="space-y-4">
              {wines.map((w, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }} viewport={{ once: true }}
                  className="p-6 rounded-2xl border border-[#8B0000]/10 bg-white hover:border-[#8B0000]/20 transition-colors">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                    <div>
                      <h3 className="text-lg tracking-wide">{w.name}</h3>
                      <p className="text-xs text-[#1a0505]/30 mt-1" style={{ fontFamily: "system-ui" }}>{w.bodega} · {w.region}</p>
                    </div>
                    <span className="text-sm text-[#8B0000] whitespace-nowrap" style={{ fontFamily: "system-ui" }}>{w.price}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════
            4. NOSOTROS
        ═══════════════════════════════════ */}
        <section id="nosotros" className="py-20 md:py-32 px-6 md:px-16 bg-[#ede5d8]">
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="aspect-[4/5] rounded-3xl bg-gradient-to-br from-[#8B0000]/10 to-[#8B0000]/20 relative overflow-hidden order-2 md:order-1">
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-[15rem] font-light text-[#8B0000]/[0.04] select-none">C</span>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <span className="text-[10px] tracking-[0.5em] uppercase text-[#8B0000] block mb-6">Nuestra historia</span>
              <h2 className="text-3xl md:text-4xl font-light tracking-tight mb-6 leading-[1.2]">
                Tres generaciones<br/><span className="italic text-[#8B0000]">de fogones.</span>
              </h2>
              <div className="space-y-4 text-sm text-[#1a0505]/50 leading-relaxed" style={{ fontFamily: "system-ui" }}>
                <p>Concha Romero abrió estas puertas en 1987 con una idea sencilla: cocinar como en casa, pero para todos. Su hija María tomó el relevo en 2005, y hoy su nieto Pablo lidera la cocina.</p>
                <p>Las recetas viajan de generación en generación. El salmorejo es el de Concha. El rabo de toro, el de María. Pablo aporta la técnica moderna sin traicionar la esencia.</p>
                <p>Cada mañana compramos en el Mercado de Triana. No hay carta fija: hay mercado.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════
            5. RESEÑAS
        ═══════════════════════════════════ */}
        <section className="py-20 md:py-32 px-6 md:px-16 bg-[#f5f0e8]">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <span className="text-[10px] tracking-[0.5em] uppercase text-[#8B0000] block mb-4">Opiniones</span>
              <h2 className="text-4xl font-light tracking-tight">Lo que dicen de nosotros</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {reviews.map((r, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }} viewport={{ once: true }}
                  className="p-6 rounded-2xl bg-white border border-[#8B0000]/5">
                  <div className="flex items-center gap-1 mb-4">
                    {Array.from({ length: r.rating }).map((_, s) => <Star key={s} className="w-3 h-3 fill-amber-500 text-amber-500" />)}
                  </div>
                  <p className="text-sm text-[#1a0505]/60 leading-relaxed mb-6 italic" style={{ fontFamily: "Georgia, serif" }}>"{r.text}"</p>
                  <div className="flex justify-between items-end" style={{ fontFamily: "system-ui" }}>
                    <p className="text-xs font-medium">{r.name}</p>
                    <span className="text-[10px] text-[#1a0505]/20">{r.source}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════
            6. RESERVAR
        ═══════════════════════════════════ */}
        <section id="reservar" className="py-20 md:py-32 px-6 md:px-16 bg-[#1a0505] text-[#f5f0e8]">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-[10px] tracking-[0.5em] uppercase text-[#8B0000] block mb-6">Reservas</span>
            <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-4 leading-[1.1]">
              Tu mesa<br/><span className="italic text-[#8B0000]">te espera.</span>
            </h2>
            <p className="text-sm text-[#f5f0e8]/30 max-w-md mx-auto mb-10" style={{ fontFamily: "system-ui" }}>
              Reserva por teléfono o WhatsApp. Grupos de más de 8 personas, menú cerrado con antelación.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <a href="tel:+34954678901" className="px-8 py-4 bg-[#8B0000] text-[#f5f0e8] text-xs tracking-[0.2em] uppercase rounded-full hover:bg-[#6d0000] transition-colors flex items-center gap-2">
                <Phone className="w-4 h-4" /> 954 678 901
              </a>
              <a href="https://wa.me/34654321098" className="px-8 py-4 border border-[#f5f0e8]/10 text-xs tracking-[0.2em] uppercase rounded-full hover:border-[#f5f0e8]/20 transition-colors">
                WhatsApp
              </a>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8" style={{ fontFamily: "system-ui" }}>
              <div><MapPin className="w-4 h-4 text-[#8B0000]/40 mx-auto mb-3" /><p className="text-xs text-[#f5f0e8]/30">C/ Betis 42<br/>Triana, Sevilla</p></div>
              <div><Clock className="w-4 h-4 text-[#8B0000]/40 mx-auto mb-3" /><p className="text-xs text-[#f5f0e8]/30">Mar-Sáb 13:00-16:00 / 20:30-23:30<br/>Dom 13:00-16:00</p></div>
              <div><Instagram className="w-4 h-4 text-[#8B0000]/40 mx-auto mb-3" /><p className="text-xs text-[#f5f0e8]/30">@casaconcha<br/>Platos del día en Stories</p></div>
            </div>
          </div>
        </section>

        {/* ═══ FOOTER ═══ */}
        <footer className="py-8 px-6 md:px-16 border-t border-[#8B0000]/5 bg-[#f5f0e8]">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4" style={{ fontFamily: "system-ui" }}>
            <p className="text-[10px] tracking-wide text-[#8B0000]/20">© 2026 Casa Concha. Cocina andaluza desde 1987.</p>
            <p className="text-[10px] tracking-wide text-[#8B0000]/20">C/ Betis 42, Triana, Sevilla</p>
          </div>
        </footer>

      </div>
    </DemoLayout>
  );
}
