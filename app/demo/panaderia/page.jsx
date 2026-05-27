"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, MapPin, Clock, Wheat, CakeSlice, Coffee, X, Menu, Instagram, Heart, ShoppingBag, Star, Croissant } from "lucide-react";
import DemoLayout from "@/components/DemoLayout";

const categories = ["Todo", "Panes", "Bollería", "Tartas", "Salado"];

const products = [
  { id: 1, name: "Pan de Masa Madre", desc: "Fermentación 48h. Corteza crujiente, miga alveolada. Harina ecológica de trigo T80.", price: "4.20€", cat: "Panes", bestseller: true, gradient: "from-[#d4a574] to-[#c49464]" },
  { id: 2, name: "Hogaza de Centeno", desc: "70% centeno integral. Notas ácidas y terrosas. Ideal para quesos y embutidos.", price: "5.50€", cat: "Panes", bestseller: false, gradient: "from-[#8B6F47] to-[#7a5e37]" },
  { id: 3, name: "Croissant de Mantequilla", desc: "Mantequilla francesa 82% MG. 72 capas. Se hornea cada mañana a las 6:30.", price: "2.80€", cat: "Bollería", bestseller: true, gradient: "from-[#e8c87a] to-[#d4b46a]" },
  { id: 4, name: "Napolitana de Chocolate", desc: "Chocolate Valrhona 64%. Masa hojaldrada de mantequilla. Crujiente y fundente.", price: "2.90€", cat: "Bollería", bestseller: false, gradient: "from-[#5c3d2e] to-[#4a2e20]" },
  { id: 5, name: "Tarta de Zanahoria", desc: "Con nueces pecanas, canela de Ceilán y frosting de queso crema. Pieza entera.", price: "22€", cat: "Tartas", bestseller: true, gradient: "from-[#d97706] to-[#b45309]" },
  { id: 6, name: "Tarta Tatín de Manzana", desc: "Manzana Reineta caramelizada. Hojaldre artesano. Servir tibia con nata montada.", price: "24€", cat: "Tartas", bestseller: false, gradient: "from-[#c4956a] to-[#a8795a]" },
  { id: 7, name: "Empanada Gallega", desc: "Atún, cebolla pochada, pimiento asado. Masa de pan con aceite de oliva.", price: "3.80€", cat: "Salado", bestseller: false, gradient: "from-[#b8956e] to-[#a8855e]" },
  { id: 8, name: "Coca de Recapte", desc: "Berenjena asada, pimiento, cebolla, sardina. Masa fina y crujiente.", price: "4.50€", cat: "Salado", bestseller: false, gradient: "from-[#a87a5a] to-[#987050]" },
];

const dailySchedule = [
  { time: "5:30", event: "Encendemos el horno de leña", icon: "🔥" },
  { time: "6:00", event: "Primera masa al horno: panes de masa madre", icon: "🍞" },
  { time: "6:30", event: "Horneamos bollería: croissants, napolitanas", icon: "🥐" },
  { time: "7:00", event: "Abrimos puertas. Café recién hecho", icon: "☕" },
  { time: "10:00", event: "Segunda hornada: panes especiales y empanadas", icon: "🫓" },
  { time: "13:00", event: "Última hornada del día", icon: "✨" },
];

const reviews = [
  { name: "Beatriz M.", text: "El mejor croissant de Sevilla, sin discusión. Cada sábado compramos media docena.", rating: 5 },
  { name: "Fernando R.", text: "El pan de masa madre es adictivo. Desde que lo probamos no compramos en otro sitio.", rating: 5 },
  { name: "Rocío P.", text: "La tarta de zanahoria nos la encargaron para una boda y fue el centro de atención.", rating: 5 },
];

export default function PanaderiaDemo() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("Todo");
  const [hoveredProduct, setHoveredProduct] = useState(null);

  const filtered = activeFilter === "Todo" ? products : products.filter(p => p.cat === activeFilter);

  return (
    <DemoLayout title="Obrador La Espiga" year="2026">
      <div className="text-[#3d2b1a] selection:bg-[#8B5E3C] selection:text-white overflow-x-hidden bg-[#fdf6e3]" style={{ fontFamily: "'Georgia', serif" }}>

        {/* ═══ MOBILE MENU ═══ */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-[#fdf6e3] z-[90] flex flex-col justify-center items-center md:hidden">
              <button onClick={() => setMenuOpen(false)} className="absolute top-6 right-6"><X className="w-6 h-6" /></button>
              <nav className="flex flex-col gap-6 text-center">
                {["Productos", "Nuestro Día", "Nosotros", "Visítanos"].map((item, i) => (
                  <motion.a key={item} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: i * 0.1 }}
                    className="text-3xl tracking-wide" onClick={() => setMenuOpen(false)} href={`#${item.toLowerCase().replace(' ', '-')}`}>{item}</motion.a>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ═══ NAV ═══ */}
        <nav className="fixed top-0 left-0 w-full px-6 md:px-16 py-5 flex justify-between items-center z-[80] bg-[#fdf6e3]/90 backdrop-blur-lg border-b border-[#8B5E3C]/5">
          <div className="flex items-center gap-2">
            <Wheat className="w-5 h-5 text-[#8B5E3C]" />
            <span className="text-xs tracking-[0.3em] uppercase text-[#8B5E3C]">La Espiga</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            {["Productos", "Nuestro Día", "Visítanos"].map(item => (
              <a key={item} href={`#${item.toLowerCase().replace(' ', '-')}`} className="text-[11px] tracking-[0.15em] uppercase text-[#3d2b1a]/40 hover:text-[#8B5E3C] transition-colors" style={{ fontFamily: "system-ui" }}>{item}</a>
            ))}
          </div>
          <button onClick={() => setMenuOpen(true)} className="md:hidden"><Menu className="w-5 h-5 text-[#8B5E3C]" /></button>
        </nav>

        {/* ═══════════════════════════════════
            1. HERO — ARTESANAL Y CÁLIDA
        ═══════════════════════════════════ */}
        <section className="min-h-[85vh] flex flex-col justify-center items-center text-center px-6 pt-20 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-[#fdf6e3] via-[#faf0d7] to-[#f5e8c8]" />

          <motion.div className="relative z-10 max-w-3xl" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
            <span className="text-6xl mb-6 block">🥖</span>
            <p className="text-[10px] tracking-[0.5em] uppercase text-[#8B5E3C]/50 mb-8" style={{ fontFamily: "system-ui" }}>Obrador artesanal · Alcalá de Guadaíra · Desde 2018</p>
            <h1 className="text-[clamp(2.5rem,8vw,5rem)] leading-[1.1] tracking-tight mb-6">
              Horneado con<br/><span className="italic text-[#8B5E3C]">las manos.</span>
            </h1>
            <p className="text-base text-[#3d2b1a]/40 max-w-md mx-auto leading-relaxed mb-10" style={{ fontFamily: "system-ui" }}>
              Pan de masa madre, bollería de mantequilla real y tartas hechas con cariño. Sin atajos. Sin prisas. Sin aditivos.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3" style={{ fontFamily: "system-ui" }}>
              <a href="#productos" className="px-8 py-3.5 bg-[#8B5E3C] text-white text-xs tracking-[0.15em] uppercase rounded-full hover:bg-[#7a4e2c] transition-colors">Ver Productos</a>
              <a href="#visítanos" className="px-8 py-3.5 border border-[#8B5E3C]/20 text-[#8B5E3C] text-xs tracking-[0.15em] uppercase rounded-full hover:border-[#8B5E3C]/40 transition-colors">Dónde estamos</a>
            </div>
          </motion.div>
        </section>

        {/* ═══════════════════════════════════
            2. PRODUCTOS — GRID CON FILTROS
        ═══════════════════════════════════ */}
        <section id="productos" className="py-20 md:py-32 px-6 md:px-16">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
              <div>
                <span className="text-[10px] tracking-[0.4em] uppercase text-[#8B5E3C] block mb-3" style={{ fontFamily: "system-ui" }}>Del horno a tu mesa</span>
                <h2 className="text-4xl tracking-tight font-light">Nuestros productos</h2>
              </div>
              <div className="flex gap-2 overflow-x-auto pb-2" style={{ fontFamily: "system-ui" }}>
                {categories.map(c => (
                  <button key={c} onClick={() => setActiveFilter(c)}
                    className={`px-4 py-2 text-[10px] tracking-[0.15em] uppercase rounded-full border transition-all whitespace-nowrap ${activeFilter === c ? 'bg-[#8B5E3C] text-white border-[#8B5E3C]' : 'border-[#8B5E3C]/15 text-[#8B5E3C]/50 hover:border-[#8B5E3C]/30'}`}>
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              <AnimatePresence mode="popLayout">
                {filtered.map((p, i) => (
                  <motion.div key={p.id} layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: i * 0.05 }}
                    className="group cursor-pointer"
                    onMouseEnter={() => setHoveredProduct(p.id)} onMouseLeave={() => setHoveredProduct(null)}>
                    <div className={`aspect-square rounded-2xl bg-gradient-to-br ${p.gradient} relative overflow-hidden mb-3`}>
                      {p.bestseller && (
                        <span className="absolute top-3 left-3 px-2 py-1 text-[8px] tracking-[0.15em] uppercase bg-[#d97706] text-white rounded-full" style={{ fontFamily: "system-ui" }}>Bestseller</span>
                      )}
                      <motion.div animate={{ opacity: hoveredProduct === p.id ? 1 : 0 }}
                        className="absolute inset-0 flex items-center justify-center bg-black/10 backdrop-blur-[1px]">
                        <Heart className="w-6 h-6 text-white" />
                      </motion.div>
                    </div>
                    <h3 className="text-sm font-medium tracking-tight group-hover:text-[#8B5E3C] transition-colors" style={{ fontFamily: "Georgia" }}>{p.name}</h3>
                    <p className="text-[10px] text-[#3d2b1a]/30 mt-0.5 line-clamp-1" style={{ fontFamily: "system-ui" }}>{p.desc}</p>
                    <span className="text-sm text-[#8B5E3C] mt-1 block" style={{ fontFamily: "system-ui" }}>{p.price}</span>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════
            3. NUESTRO DÍA — TIMELINE
        ═══════════════════════════════════ */}
        <section id="nuestro-día" className="py-20 md:py-32 px-6 md:px-16 bg-[#8B5E3C] text-[#fdf6e3]">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-16">
              <span className="text-[10px] tracking-[0.4em] uppercase text-[#fdf6e3]/40 block mb-4" style={{ fontFamily: "system-ui" }}>Un día en el obrador</span>
              <h2 className="text-4xl tracking-tight font-light">Así empieza todo</h2>
            </div>

            <div className="space-y-0 relative">
              <div className="absolute left-[2.75rem] md:left-[3.25rem] top-4 bottom-4 w-[1px] bg-[#fdf6e3]/10" />
              {dailySchedule.map((s, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }} viewport={{ once: true }}
                  className="flex items-start gap-4 md:gap-6 py-4 relative">
                  <div className="w-12 md:w-14 text-right shrink-0">
                    <span className="text-lg md:text-xl font-light">{s.time}</span>
                  </div>
                  <div className="w-3 h-3 rounded-full bg-[#d97706] border-2 border-[#8B5E3C] shrink-0 mt-2 relative z-10" />
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{s.icon}</span>
                    <p className="text-sm text-[#fdf6e3]/70" style={{ fontFamily: "system-ui" }}>{s.event}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════
            4. FILOSOFÍA
        ═══════════════════════════════════ */}
        <section className="py-20 md:py-32 px-6 md:px-16 bg-[#fdf6e3]">
          <div className="max-w-4xl mx-auto text-center">
            <span className="text-[10px] tracking-[0.4em] uppercase text-[#8B5E3C] block mb-6" style={{ fontFamily: "system-ui" }}>Nuestros valores</span>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
              {[
                { emoji: "🌾", title: "Sin Aditivos", desc: "Harina, agua, sal y tiempo. No usamos mejorantes, conservantes ni aceleradores de fermentación." },
                { emoji: "🫶", title: "100% Artesanal", desc: "Cada pieza se forma a mano. No usamos maquinaria de moldeo industrial. Se nota en cada bocado." },
                { emoji: "🌍", title: "Km 0", desc: "Harina de trigo de Antequera. Mantequilla de Asturias. Huevos camperos de la Sierra Norte." },
              ].map((v, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.15 }} viewport={{ once: true }}>
                  <span className="text-4xl block mb-4">{v.emoji}</span>
                  <h3 className="text-lg tracking-wide mb-3">{v.title}</h3>
                  <p className="text-xs text-[#3d2b1a]/40 leading-relaxed" style={{ fontFamily: "system-ui" }}>{v.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════
            5. RESEÑAS
        ═══════════════════════════════════ */}
        <section className="py-20 md:py-32 px-6 md:px-16 bg-[#f5e8c8]">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <span className="text-[10px] tracking-[0.4em] uppercase text-[#8B5E3C] block mb-4" style={{ fontFamily: "system-ui" }}>Opiniones</span>
              <h2 className="text-4xl tracking-tight font-light">Lo que dicen nuestros vecinos</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {reviews.map((r, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }} viewport={{ once: true }}
                  className="p-6 rounded-2xl bg-[#fdf6e3] border border-[#8B5E3C]/5">
                  <div className="flex mb-3">
                    {Array.from({ length: r.rating }).map((_, s) => <Star key={s} className="w-3 h-3 fill-[#d97706] text-[#d97706]" />)}
                  </div>
                  <p className="text-sm text-[#3d2b1a]/60 italic leading-relaxed mb-4">"{r.text}"</p>
                  <p className="text-xs font-medium" style={{ fontFamily: "system-ui" }}>{r.name}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════
            6. VISÍTANOS
        ═══════════════════════════════════ */}
        <section id="visítanos" className="py-20 md:py-32 px-6 md:px-16 bg-[#fdf6e3]">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-[10px] tracking-[0.4em] uppercase text-[#8B5E3C] block mb-6" style={{ fontFamily: "system-ui" }}>Encuéntranos</span>
            <h2 className="text-4xl md:text-5xl tracking-tight font-light mb-4 leading-[1.1]">
              Te esperamos<br/><span className="italic text-[#8B5E3C]">con café recién hecho.</span>
            </h2>
            <p className="text-sm text-[#3d2b1a]/40 max-w-md mx-auto mb-12" style={{ fontFamily: "system-ui" }}>
              También hacemos encargos especiales: tartas de cumpleaños, panes para eventos y cestas regalo.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8" style={{ fontFamily: "system-ui" }}>
              <div>
                <MapPin className="w-5 h-5 text-[#8B5E3C]/30 mx-auto mb-3" />
                <p className="text-sm text-[#3d2b1a]/60">C/ Mairena 8<br/>Alcalá de Guadaíra</p>
              </div>
              <div>
                <Clock className="w-5 h-5 text-[#8B5E3C]/30 mx-auto mb-3" />
                <p className="text-sm text-[#3d2b1a]/60">Lun-Sáb 7:00-14:00<br/>Dom 8:00-13:00</p>
              </div>
              <div>
                <Phone className="w-5 h-5 text-[#8B5E3C]/30 mx-auto mb-3" />
                <p className="text-sm text-[#3d2b1a]/60">955 789 012<br/>Encargos: 654 321 987</p>
              </div>
            </div>
            <div className="mt-12 flex items-center justify-center gap-2 text-[#8B5E3C]/40 hover:text-[#8B5E3C] transition-colors cursor-pointer">
              <Instagram className="w-4 h-4" />
              <span className="text-xs tracking-[0.15em] uppercase">@obradorlaespiga</span>
            </div>
          </div>
        </section>

        {/* ═══ FOOTER ═══ */}
        <footer className="py-8 px-6 md:px-16 border-t border-[#8B5E3C]/5 bg-[#fdf6e3]">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4" style={{ fontFamily: "system-ui" }}>
            <div className="flex items-center gap-2"><Wheat className="w-4 h-4 text-[#8B5E3C]/20" /><p className="text-[10px] text-[#8B5E3C]/20">© 2026 Obrador La Espiga</p></div>
            <p className="text-[10px] text-[#8B5E3C]/20">Hecho con harina, agua, sal y mucho cariño.</p>
          </div>
        </footer>

      </div>
    </DemoLayout>
  );
}
