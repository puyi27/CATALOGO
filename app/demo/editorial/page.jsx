"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, X, Menu, BookOpen, Star, Mail, Instagram, ChevronRight } from "lucide-react";
import DemoLayout from "@/components/DemoLayout";

const latestIssue = {
  number: "N°47", season: "Primavera/Verano 2026",
  headline: "El Nuevo Lujo Silencioso",
  features: [
    { title: "La era del quiet luxury", author: "Clara Montero", page: "22" },
    { title: "Sevilla: capital de la moda lenta", author: "Javier Reyes", page: "38" },
    { title: "Portfolio: Luz del Sur", author: "Ana Estudio", page: "56" },
    { title: "Entrevista: Palomo Spain", author: "Redacción", page: "74" },
    { title: "Artesanos del lino: Carmona", author: "Lucía Torres", page: "88" },
  ]
};

const backIssues = [
  { number: "N°46", title: "Brutalismo Textil", season: "Otoño/Invierno 25", gradient: "from-[#1a1a1a] to-[#333]" },
  { number: "N°45", title: "Cuerpo y Hormigón", season: "Primavera/Verano 25", gradient: "from-[#2a2a2a] to-[#444]" },
  { number: "N°44", title: "El Color del Silencio", season: "Otoño/Invierno 24", gradient: "from-[#3a3a3a] to-[#222]" },
  { number: "N°43", title: "Raíz Mediterránea", season: "Primavera/Verano 24", gradient: "from-[#4a3a2a] to-[#333]" },
];

const contributors = [
  { name: "Clara Montero", role: "Editora Jefa", bio: "15 años en Vogue España. Fundó MAISON en 2019." },
  { name: "Javier Reyes", role: "Director de Arte", bio: "Ex-Apartamento Magazine. Tipógrafo obsesivo." },
  { name: "Ana Vidal", role: "Directora de Fotografía", bio: "Premio PHotoEspaña 2023. Analógico y digital." },
  { name: "Lucía Torres", role: "Redactora Senior", bio: "Moda y cultura. Colabora con The New York Times." },
];

const collaborators = ["Loewe", "Palomo Spain", "Massimo Dutti", "Zara SRPLS", "Lemaire", "The Row"];

export default function EditorialDemo() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [expandedFeature, setExpandedFeature] = useState(null);

  return (
    <DemoLayout title="MAISON" year="2026">
      <div className="text-[#111] selection:bg-[#111] selection:text-white overflow-x-hidden bg-white" style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}>

        {/* ═══ MOBILE MENU ═══ */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-white z-[90] flex flex-col justify-center items-center md:hidden">
              <button onClick={() => setMenuOpen(false)} className="absolute top-6 right-6"><X className="w-6 h-6" /></button>
              <nav className="flex flex-col gap-6 text-center">
                {["Último Número", "Archivo", "Equipo", "Suscripción"].map((item, i) => (
                  <motion.a key={item} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: i * 0.1 }}
                    className="text-3xl tracking-tight font-light" onClick={() => setMenuOpen(false)} href={`#${item.toLowerCase().replace(' ', '-')}`}>{item}</motion.a>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ═══ NAV ═══ */}
        <nav className="fixed top-0 left-0 w-full px-6 md:px-16 py-6 flex justify-between items-center z-[80] bg-white/90 backdrop-blur-xl border-b border-black/5">
          <span className="text-lg md:text-xl tracking-[0.3em] uppercase font-light">MAISON</span>
          <div className="hidden md:flex items-center gap-8" style={{ fontFamily: "system-ui" }}>
            {["Último Número", "Archivo", "Equipo"].map(item => (
              <a key={item} href={`#${item.toLowerCase().replace(' ', '-')}`} className="text-[10px] tracking-[0.15em] uppercase text-black/30 hover:text-black transition-colors">{item}</a>
            ))}
            <a href="#suscripción" className="px-4 py-2 text-[10px] tracking-[0.15em] uppercase border border-black text-black hover:bg-black hover:text-white transition-all">Suscribirse</a>
          </div>
          <button onClick={() => setMenuOpen(true)} className="md:hidden"><Menu className="w-5 h-5" /></button>
        </nav>

        {/* ═══════════════════════════════════
            1. HERO — EDITORIAL DRAMÁTICO
        ═══════════════════════════════════ */}
        <section className="min-h-screen grid grid-cols-1 md:grid-cols-2">
          <div className="flex flex-col justify-center px-8 md:px-20 pt-32 md:pt-0 pb-12 md:pb-0 bg-white">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1 }}>
              <span className="text-[10px] tracking-[0.5em] uppercase text-black/20 block mb-8" style={{ fontFamily: "system-ui" }}>
                {latestIssue.number} · {latestIssue.season}
              </span>
              <h1 className="text-[clamp(2.5rem,7vw,5rem)] font-light leading-[1.05] tracking-tight mb-8 italic">
                {latestIssue.headline}
              </h1>
              <p className="text-sm text-black/40 leading-relaxed max-w-sm mb-10" style={{ fontFamily: "system-ui" }}>
                104 páginas sobre moda, cultura y artesanía. Fotografía analógica. Papel FSC 150gr. Impreso en Sevilla.
              </p>
              <div className="flex gap-4" style={{ fontFamily: "system-ui" }}>
                <a href="#suscripción" className="px-8 py-3 bg-black text-white text-[10px] tracking-[0.2em] uppercase hover:bg-black/80 transition-colors">Comprar N°47</a>
                <a href="#último-número" className="px-8 py-3 border border-black/10 text-[10px] tracking-[0.2em] uppercase hover:border-black/30 transition-colors">Contenido</a>
              </div>
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.3 }}
            className="min-h-[50vh] md:min-h-0 bg-gradient-to-br from-[#111] to-[#2a2a2a] relative overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-[25vw] md:text-[15vw] font-light italic text-white/[0.03] select-none tracking-tight">47</span>
            </div>
            <div className="absolute bottom-8 left-8 right-8 text-white/20">
              <p className="text-[10px] tracking-[0.3em] uppercase" style={{ fontFamily: "system-ui" }}>Fotografía: Ana Vidal · Portada: Modelo lleva Loewe</p>
            </div>
          </motion.div>
        </section>

        {/* ═══════════════════════════════════
            2. CONTENIDO DEL NÚMERO
        ═══════════════════════════════════ */}
        <section id="último-número" className="py-24 md:py-40 px-8 md:px-20 bg-white">
          <div className="max-w-3xl mx-auto">
            <span className="text-[10px] tracking-[0.5em] uppercase text-black/20 block mb-4" style={{ fontFamily: "system-ui" }}>En este número</span>
            <h2 className="text-4xl font-light tracking-tight mb-16 italic">Contenido</h2>

            <div className="space-y-0">
              {latestIssue.features.map((f, i) => (
                <motion.div key={i} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                  className="flex items-start justify-between py-6 border-b border-black/5 group cursor-pointer hover:border-black/20 transition-colors"
                  onClick={() => setExpandedFeature(expandedFeature === i ? null : i)}>
                  <div className="flex items-start gap-6 flex-1">
                    <span className="text-3xl font-light text-black/10">{f.page}</span>
                    <div>
                      <h3 className="text-lg tracking-tight group-hover:italic transition-all">{f.title}</h3>
                      <p className="text-[10px] text-black/30 mt-1 tracking-wide" style={{ fontFamily: "system-ui" }}>Por {f.author}</p>
                    </div>
                  </div>
                  <ChevronRight className={`w-4 h-4 text-black/10 mt-2 transition-transform ${expandedFeature === i ? 'rotate-90' : ''}`} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════
            3. CITA EDITORIAL
        ═══════════════════════════════════ */}
        <section className="py-24 md:py-40 px-8 md:px-20 bg-[#111] text-white">
          <div className="max-w-3xl mx-auto text-center">
            <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="text-2xl md:text-3xl italic leading-[1.6] text-white/60 mb-8">
              "La moda no es lo que llevas. Es la conversación que inicias cuando entras en una habitación."
            </motion.p>
            <p className="text-[10px] tracking-[0.3em] uppercase text-white/20" style={{ fontFamily: "system-ui" }}>— Clara Montero, Carta de la editora, N°47</p>
          </div>
        </section>

        {/* ═══════════════════════════════════
            4. ARCHIVO — BACK ISSUES
        ═══════════════════════════════════ */}
        <section id="archivo" className="py-24 md:py-40 px-8 md:px-20 bg-white">
          <div className="max-w-5xl mx-auto">
            <span className="text-[10px] tracking-[0.5em] uppercase text-black/20 block mb-4" style={{ fontFamily: "system-ui" }}>Números anteriores</span>
            <h2 className="text-4xl font-light tracking-tight mb-16 italic">Archivo</h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {backIssues.map((issue, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }} viewport={{ once: true }}
                  className="group cursor-pointer">
                  <div className={`aspect-[3/4] bg-gradient-to-br ${issue.gradient} mb-4 relative overflow-hidden`}>
                    <div className="absolute inset-0 flex flex-col justify-between p-4 md:p-6 text-white">
                      <span className="text-[10px] tracking-[0.3em] uppercase text-white/30" style={{ fontFamily: "system-ui" }}>{issue.number}</span>
                      <h3 className="text-base md:text-lg italic tracking-tight">{issue.title}</h3>
                    </div>
                  </div>
                  <p className="text-[10px] text-black/30 tracking-wide" style={{ fontFamily: "system-ui" }}>{issue.season}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════
            5. COLABORADORES
        ═══════════════════════════════════ */}
        <section className="py-16 md:py-24 px-8 md:px-20 border-y border-black/5">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
            <span className="text-[10px] tracking-[0.3em] uppercase text-black/20 shrink-0" style={{ fontFamily: "system-ui" }}>Han colaborado con nosotros</span>
            <div className="flex flex-wrap justify-center gap-6 md:gap-10">
              {collaborators.map((name, i) => (
                <motion.span key={i} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
                  transition={{ delay: i * 0.05 }} viewport={{ once: true }}
                  className="text-lg md:text-xl italic text-black/15 hover:text-black/40 transition-colors cursor-default">{name}</motion.span>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════
            6. EQUIPO
        ═══════════════════════════════════ */}
        <section id="equipo" className="py-24 md:py-40 px-8 md:px-20 bg-white">
          <div className="max-w-4xl mx-auto">
            <span className="text-[10px] tracking-[0.5em] uppercase text-black/20 block mb-4" style={{ fontFamily: "system-ui" }}>Redacción</span>
            <h2 className="text-4xl font-light tracking-tight mb-16 italic">Equipo</h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {contributors.map((c, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }} viewport={{ once: true }}>
                  <div className="aspect-[3/4] bg-gradient-to-br from-[#f5f5f5] to-[#e5e5e5] mb-4 relative overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-4xl font-light text-black/[0.06] select-none">{c.name.split(' ').map(n => n[0]).join('')}</span>
                    </div>
                  </div>
                  <h3 className="text-sm tracking-tight">{c.name}</h3>
                  <p className="text-[10px] text-black/30 mt-0.5" style={{ fontFamily: "system-ui" }}>{c.role}</p>
                  <p className="text-[10px] text-black/20 mt-1 leading-relaxed" style={{ fontFamily: "system-ui" }}>{c.bio}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════
            7. SUSCRIPCIÓN
        ═══════════════════════════════════ */}
        <section id="suscripción" className="py-24 md:py-40 px-8 md:px-20 bg-[#111] text-white">
          <div className="max-w-3xl mx-auto text-center">
            <BookOpen className="w-8 h-8 text-white/10 mx-auto mb-8" strokeWidth={1} />
            <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-6 italic leading-[1.1]">
              Cuatro números.<br/>Un año de cultura.
            </h2>
            <p className="text-sm text-white/30 max-w-md mx-auto mb-12" style={{ fontFamily: "system-ui" }}>
              Suscripción anual: 48€ (4 números). Envío gratuito a toda España. Incluye acceso al archivo digital completo.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12" style={{ fontFamily: "system-ui" }}>
              <input type="email" placeholder="tu@email.com"
                className="px-6 py-3.5 text-sm bg-white/5 border border-white/10 outline-none focus:border-white/30 transition-colors w-full sm:w-64 placeholder:text-white/15" />
              <button className="px-8 py-3.5 bg-white text-black text-[10px] tracking-[0.2em] uppercase font-medium hover:bg-white/90 transition-colors w-full sm:w-auto">Suscribirme</button>
            </div>
            <p className="text-[10px] text-white/15" style={{ fontFamily: "system-ui" }}>Número suelto: 14€. Internacional: +5€ por número.</p>
          </div>
        </section>

        {/* ═══════════════════════════════════
            8. CONTACTO
        ═══════════════════════════════════ */}
        <section className="py-16 md:py-24 px-8 md:px-20 bg-white border-t border-black/5">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-8" style={{ fontFamily: "system-ui" }}>
            <div className="flex items-center gap-8">
              <a href="mailto:redaccion@maisonmag.com" className="flex items-center gap-2 text-xs text-black/30 hover:text-black transition-colors">
                <Mail className="w-4 h-4" /> redaccion@maisonmag.com
              </a>
              <a href="#" className="flex items-center gap-2 text-xs text-black/30 hover:text-black transition-colors">
                <Instagram className="w-4 h-4" /> @maisonmagazine
              </a>
            </div>
            <p className="text-[10px] text-black/20">Sevilla, España · ISSN 2000-0000</p>
          </div>
        </section>

        {/* ═══ FOOTER ═══ */}
        <footer className="py-8 px-8 md:px-20 border-t border-black/5">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4" style={{ fontFamily: "system-ui" }}>
            <p className="text-[10px] text-black/15 tracking-wide">© 2026 MAISON Magazine. Todos los derechos reservados.</p>
            <p className="text-[10px] text-black/15 tracking-wide">Impreso en papel FSC reciclado · Sevilla</p>
          </div>
        </footer>

      </div>
    </DemoLayout>
  );
}
