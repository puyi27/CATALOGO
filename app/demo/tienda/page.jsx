"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ShoppingBag, X, Search, Heart, ChevronDown, ArrowRight, Star, Truck, Shield, RotateCcw, Menu } from "lucide-react";
import DemoLayout from "@/components/DemoLayout";

const collections = [
  { id: "essentials", name: "Esenciales", season: "Todo el año" },
  { id: "summer", name: "Verano 26", season: "Junio — Septiembre" },
  { id: "limited", name: "Edición Limitada", season: "Solo 200 uds." },
];

const products = [
  { id: 1, name: "Camisa Oversize Lino", price: 79, originalPrice: null, color: "Blanco Roto", collection: "essentials", new: false, bestseller: true, gradient: "from-[#f5f0e8] to-[#e8e0d0]" },
  { id: 2, name: "Pantalón Wide Leg", price: 89, originalPrice: null, color: "Negro", collection: "essentials", new: false, bestseller: false, gradient: "from-[#1a1a1a] to-[#2d2d2d]" },
  { id: 3, name: "Blazer Desestructurado", price: 149, originalPrice: 189, color: "Arena", collection: "summer", new: true, bestseller: false, gradient: "from-[#d4c5a9] to-[#b8a88a]" },
  { id: 4, name: "Jersey Cashmere Blend", price: 119, originalPrice: null, color: "Gris Perla", collection: "essentials", new: false, bestseller: true, gradient: "from-[#c8c8c8] to-[#a8a8a8]" },
  { id: 5, name: "Vestido Midi Fluido", price: 99, originalPrice: null, color: "Salvia", collection: "summer", new: true, bestseller: false, gradient: "from-[#9caf88] to-[#7d8f6e]" },
  { id: 6, name: "Abrigo Cocoon", price: 229, originalPrice: null, color: "Camel", collection: "limited", new: true, bestseller: false, gradient: "from-[#c4a77d] to-[#a8885d]" },
  { id: 7, name: "Top Asimétrico", price: 59, originalPrice: 79, color: "Crudo", collection: "summer", new: false, bestseller: false, gradient: "from-[#f0ebe0] to-[#ddd5c5]" },
  { id: 8, name: "Bermuda Tailored", price: 69, originalPrice: null, color: "Marino", collection: "summer", new: false, bestseller: true, gradient: "from-[#1e2a3a] to-[#344a5f]" },
];

const reviews = [
  { name: "Elena M.", rating: 5, text: "La calidad del lino es increíble. Llevo comprando aquí 3 años y nunca decepciona.", product: "Camisa Oversize Lino", date: "Mayo 2026" },
  { name: "Marta G.", rating: 5, text: "El blazer desestructurado es exactamente lo que buscaba. Corte perfecto, tela con caída espectacular.", product: "Blazer Desestructurado", date: "Abril 2026" },
  { name: "Pablo R.", rating: 4, text: "Gran relación calidad-precio. El pantalón wide leg es muy cómodo y versátil.", product: "Pantalón Wide Leg", date: "Marzo 2026" },
];

export default function TiendaDemo() {
  const [activeCollection, setActiveCollection] = useState("essentials");
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [hoveredProduct, setHoveredProduct] = useState(null);

  const filtered = activeCollection === "all" ? products : products.filter(p => p.collection === activeCollection);

  return (
    <DemoLayout title="Atelier" year="2026">
      <div className="text-[#111] selection:bg-black selection:text-white font-sans overflow-x-hidden bg-white">

        {/* ═══ SEARCH OVERLAY ═══ */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-white z-[100] flex flex-col items-center justify-start pt-32 px-6">
              <button onClick={() => setSearchOpen(false)} className="absolute top-6 right-6"><X className="w-6 h-6" /></button>
              <input type="text" placeholder="Buscar productos..." autoFocus
                className="w-full max-w-2xl text-3xl md:text-5xl font-light tracking-tight border-b border-black/10 pb-4 outline-none placeholder:text-black/20 bg-transparent" />
              <div className="mt-8 flex gap-4">
                {["Lino", "Verano", "Oversize", "Cashmere"].map(t => (
                  <span key={t} className="px-4 py-2 text-xs tracking-[0.15em] uppercase border border-black/10 rounded-full text-black/40 hover:border-black/30 cursor-pointer transition-colors">{t}</span>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ═══ CART DRAWER ═══ */}
        <AnimatePresence>
          {cartOpen && (
            <>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onClick={() => setCartOpen(false)} className="fixed inset-0 bg-black/20 z-[100]" />
              <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 30, stiffness: 300 }}
                className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-white z-[101] flex flex-col shadow-2xl"
              >
                <div className="p-6 border-b border-black/5 flex justify-between items-center">
                  <h3 className="text-sm tracking-[0.2em] uppercase">Bolsa (2)</h3>
                  <button onClick={() => setCartOpen(false)}><X className="w-5 h-5" /></button>
                </div>
                <div className="flex-1 p-6 space-y-6 overflow-y-auto">
                  {[products[0], products[3]].map(p => (
                    <div key={p.id} className="flex gap-4">
                      <div className={`w-20 h-24 rounded-lg bg-gradient-to-br ${p.gradient} shrink-0`} />
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <p className="text-sm font-medium">{p.name}</p>
                          <p className="text-xs text-black/40 mt-0.5">{p.color} — Talla M</p>
                        </div>
                        <div className="flex justify-between items-end">
                          <p className="text-sm">{p.price}€</p>
                          <button className="text-[10px] tracking-[0.15em] uppercase text-black/30 underline underline-offset-2">Eliminar</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-6 border-t border-black/5">
                  <div className="flex justify-between mb-4">
                    <span className="text-sm text-black/50">Subtotal</span>
                    <span className="text-sm font-medium">198€</span>
                  </div>
                  <button className="w-full bg-black text-white py-4 text-xs tracking-[0.2em] uppercase hover:bg-black/90 transition-colors">Finalizar Compra</button>
                  <p className="text-center text-[10px] text-black/30 mt-3 tracking-[0.1em] uppercase">Envío gratuito a partir de 100€</p>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* ═══ MOBILE MENU ═══ */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-white z-[90] flex flex-col p-6 md:hidden"
            >
              <div className="flex justify-end"><button onClick={() => setMenuOpen(false)}><X className="w-6 h-6" /></button></div>
              <nav className="flex-1 flex flex-col justify-center gap-8">
                {["Novedades", "Esenciales", "Edición Limitada", "Sobre Nosotros"].map((item, i) => (
                  <motion.a key={item} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }}
                    className="text-3xl font-light tracking-tight text-black/80" onClick={() => setMenuOpen(false)}>{item}</motion.a>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ═══ FIXED NAV ═══ */}
        <nav className="fixed top-0 left-0 w-full px-6 md:px-12 py-5 flex justify-between items-center z-[80] bg-white/80 backdrop-blur-xl border-b border-black/5">
          <div className="flex items-center gap-6">
            <button onClick={() => setMenuOpen(true)} className="md:hidden"><Menu className="w-5 h-5" /></button>
            <span className="text-xs tracking-[0.3em] uppercase font-medium hidden md:block">Atelier</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            {["Novedades", "Esenciales", "Edición Limitada"].map(item => (
              <a key={item} className="text-[11px] tracking-[0.15em] uppercase text-black/50 hover:text-black transition-colors cursor-pointer">{item}</a>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => setSearchOpen(true)} className="hover:opacity-50 transition-opacity"><Search className="w-[18px] h-[18px]" /></button>
            <button className="hover:opacity-50 transition-opacity hidden md:block"><Heart className="w-[18px] h-[18px]" /></button>
            <button onClick={() => setCartOpen(true)} className="relative hover:opacity-50 transition-opacity">
              <ShoppingBag className="w-[18px] h-[18px]" />
              <span className="absolute -top-1 -right-1.5 w-3.5 h-3.5 bg-black text-white text-[8px] flex items-center justify-center rounded-full">2</span>
            </button>
          </div>
        </nav>

        {/* ═══════════════════════════════════
            1. HERO — EDITORIAL MINIMAL
        ═══════════════════════════════════ */}
        <section className="pt-32 md:pt-40 pb-16 md:pb-24 px-6 md:px-12">
          <div className="max-w-7xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
              className="mb-8">
              <span className="text-[10px] tracking-[0.3em] uppercase text-black/30">Colección Verano 2026</span>
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="text-[clamp(2.5rem,8vw,6rem)] font-light tracking-tight leading-[0.95] mb-8">
              Lo esencial,<br/><span className="italic text-black/40">nada más.</span>
            </motion.h1>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
              className="flex items-center gap-3">
              <a className="flex items-center gap-2 text-xs tracking-[0.15em] uppercase border-b border-black pb-1 hover:opacity-50 transition-opacity cursor-pointer">
                Explorar colección <ArrowRight className="w-3 h-3" />
              </a>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.8 }}
              className="mt-12 aspect-[21/9] rounded-2xl bg-gradient-to-br from-[#f5f0e8] via-[#e8dcc8] to-[#d4c5a9] relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-[15vw] font-extralight tracking-tighter text-black/[0.04] select-none uppercase">Atelier</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ═══════════════════════════════════
            2. COLECCIONES — FILTER PILLS
        ═══════════════════════════════════ */}
        <section className="px-6 md:px-12 pb-20 md:pb-32">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
              <div>
                <span className="text-[10px] tracking-[0.3em] uppercase text-black/30 block mb-3">Colecciones</span>
                <h2 className="text-3xl md:text-4xl font-light tracking-tight">Nuestras piezas</h2>
              </div>
              <div className="flex gap-2 overflow-x-auto pb-2">
                <button onClick={() => setActiveCollection("all")}
                  className={`px-4 py-2 text-[10px] tracking-[0.15em] uppercase rounded-full border transition-all whitespace-nowrap ${activeCollection === "all" ? "bg-black text-white border-black" : "border-black/10 text-black/40 hover:border-black/30"}`}>
                  Todo
                </button>
                {collections.map(c => (
                  <button key={c.id} onClick={() => setActiveCollection(c.id)}
                    className={`px-4 py-2 text-[10px] tracking-[0.15em] uppercase rounded-full border transition-all whitespace-nowrap ${activeCollection === c.id ? "bg-black text-white border-black" : "border-black/10 text-black/40 hover:border-black/30"}`}>
                    {c.name}
                  </button>
                ))}
              </div>
            </div>

            {/* ═══ PRODUCT GRID ═══ */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              <AnimatePresence mode="popLayout">
                {filtered.map((p, i) => (
                  <motion.div key={p.id} layout
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: i * 0.05, duration: 0.4 }}
                    className="group cursor-pointer"
                    onMouseEnter={() => setHoveredProduct(p.id)}
                    onMouseLeave={() => setHoveredProduct(null)}
                  >
                    <div className={`aspect-[3/4] rounded-xl bg-gradient-to-br ${p.gradient} relative overflow-hidden mb-3`}>
                      {p.new && <span className="absolute top-3 left-3 px-2 py-1 text-[8px] tracking-[0.2em] uppercase bg-black text-white rounded-full">Nuevo</span>}
                      {p.bestseller && <span className="absolute top-3 left-3 px-2 py-1 text-[8px] tracking-[0.2em] uppercase bg-white/90 text-black rounded-full border border-black/5">Bestseller</span>}
                      <motion.div animate={{ opacity: hoveredProduct === p.id ? 1 : 0 }}
                        className="absolute inset-0 flex items-center justify-center bg-black/10 backdrop-blur-[2px]">
                        <span className="px-4 py-2 text-[10px] tracking-[0.2em] uppercase bg-white text-black rounded-full">Vista rápida</span>
                      </motion.div>
                      <button className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Heart className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <p className="text-sm font-medium tracking-tight">{p.name}</p>
                    <p className="text-xs text-black/40 mt-0.5">{p.color}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-sm">{p.price}€</span>
                      {p.originalPrice && <span className="text-xs text-black/30 line-through">{p.originalPrice}€</span>}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════
            3. LOOKBOOK BANNER
        ═══════════════════════════════════ */}
        <section className="px-6 md:px-12 pb-20 md:pb-32">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="aspect-[4/5] rounded-2xl bg-gradient-to-br from-[#1a1a1a] to-[#333] relative overflow-hidden group cursor-pointer">
              <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12">
                <span className="text-[10px] tracking-[0.3em] uppercase text-white/40 mb-2">Lookbook</span>
                <h3 className="text-3xl md:text-4xl font-light text-white tracking-tight mb-4">Temporada<br/>Verano 26</h3>
                <span className="text-xs tracking-[0.15em] uppercase text-white/60 border-b border-white/30 pb-1 w-fit group-hover:text-white group-hover:border-white transition-colors">Ver lookbook</span>
              </div>
            </div>
            <div className="aspect-[4/5] rounded-2xl bg-gradient-to-br from-[#f5f0e8] to-[#e0d5c0] relative overflow-hidden group cursor-pointer">
              <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12">
                <span className="text-[10px] tracking-[0.3em] uppercase text-black/30 mb-2">Edición Limitada</span>
                <h3 className="text-3xl md:text-4xl font-light text-black tracking-tight mb-4">Solo<br/>200 piezas</h3>
                <span className="text-xs tracking-[0.15em] uppercase text-black/50 border-b border-black/30 pb-1 w-fit group-hover:text-black group-hover:border-black transition-colors">Descubrir</span>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════
            4. VALORES DE MARCA
        ═══════════════════════════════════ */}
        <section className="py-20 md:py-32 border-y border-black/5">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
              {[
                { icon: Truck, title: "Envío Gratuito", desc: "En pedidos superiores a 100€. Entrega en 2-4 días." },
                { icon: RotateCcw, title: "Devolución Libre", desc: "30 días para devolver. Sin preguntas, sin costes." },
                { icon: Shield, title: "Pago Seguro", desc: "Cifrado SSL. Visa, Mastercard, PayPal, Bizum." },
                { icon: Star, title: "Calidad Premium", desc: "Tejidos europeos seleccionados. Confección artesanal." },
              ].map((v, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }} viewport={{ once: true }} className="text-center">
                  <v.icon className="w-6 h-6 mx-auto mb-4 text-black/30" strokeWidth={1.5} />
                  <h3 className="text-sm font-medium tracking-tight mb-2">{v.title}</h3>
                  <p className="text-xs text-black/40 leading-relaxed">{v.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════
            5. RESEÑAS
        ═══════════════════════════════════ */}
        <section className="py-20 md:py-32 px-6 md:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-end mb-12">
              <div>
                <span className="text-[10px] tracking-[0.3em] uppercase text-black/30 block mb-3">Opiniones</span>
                <h2 className="text-3xl md:text-4xl font-light tracking-tight">Lo que dicen nuestros clientes</h2>
              </div>
              <div className="hidden md:flex items-center gap-1">
                {[1,2,3,4,5].map(s => <Star key={s} className="w-4 h-4 fill-black text-black" />)}
                <span className="text-xs text-black/40 ml-2">4.9/5 (847 reseñas)</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {reviews.map((r, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }} viewport={{ once: true }}
                  className="p-6 md:p-8 rounded-2xl border border-black/5 bg-[#fafaf8]"
                >
                  <div className="flex items-center gap-0.5 mb-4">
                    {Array.from({ length: r.rating }).map((_, s) => <Star key={s} className="w-3 h-3 fill-black text-black" />)}
                  </div>
                  <p className="text-sm text-black/70 leading-relaxed mb-6">"{r.text}"</p>
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-sm font-medium">{r.name}</p>
                      <p className="text-[10px] text-black/30 tracking-[0.1em] uppercase mt-0.5">{r.product}</p>
                    </div>
                    <span className="text-[10px] text-black/20">{r.date}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════
            6. NEWSLETTER
        ═══════════════════════════════════ */}
        <section className="py-20 md:py-32 px-6 md:px-12 bg-[#fafaf8]">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-light tracking-tight mb-4">Únete a Atelier</h2>
            <p className="text-sm text-black/40 mb-8">Acceso anticipado a colecciones, eventos exclusivos y 10% en tu primera compra.</p>
            <div className="flex gap-2 max-w-md mx-auto">
              <input type="email" placeholder="tu@email.com"
                className="flex-1 px-5 py-3.5 text-sm border border-black/10 rounded-full outline-none focus:border-black/30 transition-colors bg-white" />
              <button className="px-6 py-3.5 bg-black text-white text-xs tracking-[0.15em] uppercase rounded-full hover:bg-black/90 transition-colors whitespace-nowrap">Suscribir</button>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════
            FOOTER
        ═══════════════════════════════════ */}
        <footer className="py-12 md:py-16 px-6 md:px-12 border-t border-black/5">
          <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            {[
              { title: "Tienda", links: ["Novedades", "Esenciales", "Edición Limitada", "Outlet"] },
              { title: "Ayuda", links: ["Envíos", "Devoluciones", "Tallas", "Contacto"] },
              { title: "Empresa", links: ["Nuestra Historia", "Sostenibilidad", "Empleo", "Prensa"] },
              { title: "Legal", links: ["Privacidad", "Cookies", "Términos", "Accesibilidad"] },
            ].map((col, i) => (
              <div key={i}>
                <h4 className="text-xs tracking-[0.2em] uppercase font-medium mb-4">{col.title}</h4>
                <ul className="space-y-2.5">
                  {col.links.map(l => <li key={l}><a className="text-xs text-black/40 hover:text-black transition-colors cursor-pointer">{l}</a></li>)}
                </ul>
              </div>
            ))}
          </div>
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-black/5">
            <p className="text-[10px] tracking-[0.15em] uppercase text-black/20">© 2026 Atelier. Calle Sierpes 42, Sevilla, España.</p>
            <p className="text-[10px] tracking-[0.15em] uppercase text-black/20">Diseñado con cuidado en Andalucía.</p>
          </div>
        </footer>

      </div>
    </DemoLayout>
  );
}
