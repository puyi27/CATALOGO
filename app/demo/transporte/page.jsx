"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Truck, Package, Clock, MapPin, Shield, Phone, Mail, BarChart3, Users, Globe, ChevronDown, ArrowRight, X, Menu, CheckCircle } from "lucide-react";
import DemoLayout from "@/components/DemoLayout";

const services = [
  { icon: Truck, title: "Transporte Nacional", desc: "Red de distribución en toda España peninsular e islas. Entregas en 24-48h con seguimiento en tiempo real.", highlight: "24-48h" },
  { icon: Package, title: "Paquetería Express", desc: "Envíos urgentes puerta a puerta. Recogida antes de las 14h, entrega al día siguiente.", highlight: "Mismo día" },
  { icon: Globe, title: "Transporte Internacional", desc: "Conexión con las principales rutas europeas. Soluciones multimodales: carretera, marítimo y aéreo.", highlight: "27 países" },
  { icon: Shield, title: "Logística Integral", desc: "Almacenaje, preparación de pedidos, gestión de stock y distribución. Todo en un solo partner.", highlight: "3PL" },
];

const stats = [
  { value: "2.4M", label: "Envíos anuales", icon: Package },
  { value: "98.7%", label: "Entregas a tiempo", icon: Clock },
  { value: "127", label: "Vehículos en flota", icon: Truck },
  { value: "340", label: "Empleados", icon: Users },
];

const fleet = [
  { type: "Furgonetas", count: "52", capacity: "Hasta 1.400 kg", use: "Distribución urbana y última milla" },
  { type: "Camiones Rígidos", count: "38", capacity: "Hasta 12.000 kg", use: "Distribución regional y nacional" },
  { type: "Tráilers", count: "27", capacity: "Hasta 24.000 kg", use: "Largas distancias y cargas completas" },
  { type: "Vehículos Refrigerados", count: "10", capacity: "Hasta 8.000 kg", use: "Temperatura controlada -20° a +8°" },
];

const testimonials = [
  { company: "Mercadona", name: "Javier López", role: "Director de Logística", text: "Llevamos 8 años trabajando con TransAndalus. Su fiabilidad en entregas es excepcional y el trato humano marca la diferencia." },
  { company: "Decathlon", name: "Ana Beltrán", role: "Supply Chain Manager", text: "La flexibilidad de su servicio nos permite escalar operaciones en temporada alta sin fricciones. Partner de confianza." },
  { company: "Grupo Cosentino", name: "Miguel Herrera", role: "Responsable de Expediciones", text: "La gestión de cargas especiales de mármol y cuarzo requiere especialización. TransAndalus lo borda." },
];

const faqs = [
  { q: "¿Cuál es el plazo de entrega estándar?", a: "Para envíos nacionales peninsulares, 24-48 horas hábiles. Baleares y Canarias entre 3-5 días. Internacional varía según destino." },
  { q: "¿Ofrecen seguimiento en tiempo real?", a: "Sí. Todos nuestros vehículos cuentan con GPS. Proporcionamos acceso a nuestra plataforma de tracking con actualizaciones cada 15 minutos." },
  { q: "¿Tienen seguro de mercancía?", a: "Todas las cargas viajan aseguradas. Seguro básico incluido. Opciones de seguro a todo riesgo disponibles bajo solicitud." },
  { q: "¿Cuál es la zona de cobertura?", a: "España completa (península e islas), Portugal, Francia, Alemania, Italia, Países Bajos, Bélgica y 20 países más de la UE." },
];

export default function TransporteDemo() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const [activeService, setActiveService] = useState(0);

  return (
    <DemoLayout title="TransAndalus" year="2026">
      <div className="text-white selection:bg-[#f97316] selection:text-white overflow-x-hidden bg-[#0c1445]" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>

        {/* ═══ MOBILE MENU ═══ */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-[#0c1445] z-[90] flex flex-col justify-center items-center md:hidden">
              <button onClick={() => setMenuOpen(false)} className="absolute top-6 right-6"><X className="w-6 h-6" /></button>
              <nav className="flex flex-col gap-6 text-center">
                {["Servicios", "Flota", "Empresa", "Contacto"].map((item, i) => (
                  <motion.a key={item} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: i * 0.08 }}
                    className="text-3xl font-bold tracking-tight" onClick={() => setMenuOpen(false)} href={`#${item.toLowerCase()}`}>{item}</motion.a>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ═══ NAV ═══ */}
        <nav className="fixed top-0 left-0 w-full px-6 md:px-12 py-5 flex justify-between items-center z-[80] bg-[#0c1445]/90 backdrop-blur-xl border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#f97316] flex items-center justify-center"><Truck className="w-4 h-4 text-white" /></div>
            <span className="text-sm font-bold tracking-tight hidden md:block">TransAndalus</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            {["Servicios", "Flota", "Empresa", "Contacto"].map(item => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-xs text-white/50 hover:text-white transition-colors">{item}</a>
            ))}
            <a href="#contacto" className="px-5 py-2 bg-[#f97316] text-white text-xs font-bold rounded-lg hover:bg-[#ea580c] transition-colors">Pedir Presupuesto</a>
          </div>
          <button onClick={() => setMenuOpen(true)} className="md:hidden"><Menu className="w-5 h-5" /></button>
        </nav>

        {/* ═══════════════════════════════════
            1. HERO — CORPORATIVA CON DATOS
        ═══════════════════════════════════ */}
        <section className="min-h-screen flex flex-col justify-center px-6 md:px-12 pt-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0c1445] via-[#101b5a] to-[#0a0f30]" />
          <div className="absolute top-0 right-0 w-[60%] h-full bg-gradient-to-l from-[#f97316]/5 to-transparent" />
          
          {/* Grid pattern */}
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

          <div className="relative z-10 max-w-6xl mx-auto w-full">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
              className="flex items-center gap-3 mb-8">
              <div className="w-2 h-2 rounded-full bg-[#f97316] animate-pulse" />
              <span className="text-xs text-white/40 tracking-wide">Operando 24/7 en toda España y Europa</span>
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
              className="text-[clamp(2.5rem,8vw,5.5rem)] font-black leading-[0.95] tracking-tight mb-8">
              Tu carga,<br/><span className="text-[#f97316]">nuestra ruta.</span>
            </motion.h1>

            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
              className="text-base md:text-lg text-white/40 max-w-xl mb-10 leading-relaxed">
              Soluciones logísticas integrales para empresas que necesitan fiabilidad, velocidad y trazabilidad total.
            </motion.p>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-3">
              <a href="#contacto" className="px-8 py-4 bg-[#f97316] text-white text-sm font-bold rounded-lg hover:bg-[#ea580c] transition-colors flex items-center gap-2 justify-center">
                Solicitar Presupuesto <ArrowRight className="w-4 h-4" />
              </a>
              <a href="#servicios" className="px-8 py-4 border border-white/10 text-white/70 text-sm rounded-lg hover:border-white/30 hover:text-white transition-all flex items-center gap-2 justify-center">
                Ver Servicios
              </a>
            </motion.div>

            {/* Stats strip */}
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }}
              className="mt-16 md:mt-24 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 p-6 md:p-8 rounded-2xl bg-white/[0.03] border border-white/5 backdrop-blur-sm">
              {stats.map((s, i) => (
                <div key={i} className="flex items-center gap-3">
                  <s.icon className="w-5 h-5 text-[#f97316]/50 shrink-0" />
                  <div>
                    <span className="text-2xl md:text-3xl font-bold tracking-tight">{s.value}</span>
                    <p className="text-[10px] text-white/30 tracking-wide uppercase mt-0.5">{s.label}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ═══════════════════════════════════
            2. SERVICIOS — TABS
        ═══════════════════════════════════ */}
        <section id="servicios" className="py-20 md:py-32 px-6 md:px-12 bg-[#0a0f30]">
          <div className="max-w-6xl mx-auto">
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#f97316] block mb-4">01 — Servicios</span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-16">Lo que hacemos</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {services.map((s, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }} viewport={{ once: true }}
                  className={`p-6 md:p-8 rounded-xl border cursor-pointer transition-all duration-300 ${activeService === i ? 'border-[#f97316]/30 bg-[#f97316]/5' : 'border-white/5 bg-white/[0.02] hover:border-white/10'}`}
                  onClick={() => setActiveService(i)}>
                  <div className="flex items-start justify-between mb-4">
                    <s.icon className={`w-6 h-6 transition-colors ${activeService === i ? 'text-[#f97316]' : 'text-white/20'}`} />
                    <span className={`px-3 py-1 text-[10px] font-bold tracking-wide rounded-full ${activeService === i ? 'bg-[#f97316] text-white' : 'bg-white/5 text-white/30'}`}>{s.highlight}</span>
                  </div>
                  <h3 className="text-xl font-bold tracking-tight mb-2">{s.title}</h3>
                  <p className="text-sm text-white/40 leading-relaxed">{s.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════
            3. FLOTA — DATA TABLE
        ═══════════════════════════════════ */}
        <section id="flota" className="py-20 md:py-32 px-6 md:px-12 bg-[#0c1445]">
          <div className="max-w-6xl mx-auto">
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#f97316] block mb-4">02 — Flota</span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">127 vehículos</h2>
            <p className="text-base text-white/30 max-w-lg mb-12">Flota propia con tecnología GPS, control de temperatura y sistema de comunicación en tiempo real.</p>

            <div className="space-y-3">
              <div className="hidden md:grid grid-cols-4 gap-4 px-6 py-3 text-[10px] tracking-[0.2em] uppercase text-white/20">
                <span>Tipo</span><span>Unidades</span><span>Capacidad</span><span>Uso principal</span>
              </div>
              {fleet.map((f, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }} viewport={{ once: true }}
                  className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-4 p-6 rounded-xl bg-white/[0.03] border border-white/5 hover:border-[#f97316]/20 transition-colors">
                  <span className="font-bold text-sm">{f.type}</span>
                  <span className="text-2xl font-bold text-[#f97316]">{f.count}</span>
                  <span className="text-sm text-white/40">{f.capacity}</span>
                  <span className="text-sm text-white/40">{f.use}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════
            4. VENTAJAS
        ═══════════════════════════════════ */}
        <section className="py-20 md:py-32 px-6 md:px-12 bg-[#f97316]">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-16 text-white">¿Por qué elegirnos?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: "Rastreo en Tiempo Real", desc: "GPS en cada vehículo. Sabes dónde está tu mercancía en todo momento desde nuestra plataforma web." },
                { title: "Sin Intermediarios", desc: "Flota propia al 100%. Sin subcontratas. Control total de la cadena, lo que reduce incidencias a mínimos." },
                { title: "Compromiso Verde", desc: "30% de la flota Euro 6. Plan de electrificación 2027. Compensación de huella de carbono certificada." },
              ].map((v, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.15 }} viewport={{ once: true }}
                  className="p-8 rounded-xl bg-white/10 backdrop-blur-sm">
                  <CheckCircle className="w-6 h-6 text-white mb-4 mx-auto" />
                  <h3 className="text-lg font-bold mb-3">{v.title}</h3>
                  <p className="text-sm text-white/70 leading-relaxed">{v.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════
            5. TESTIMONIOS
        ═══════════════════════════════════ */}
        <section className="py-20 md:py-32 px-6 md:px-12 bg-[#0a0f30]">
          <div className="max-w-6xl mx-auto">
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#f97316] block mb-4">03 — Clientes</span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-16">Confían en nosotros</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map((t, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }} viewport={{ once: true }}
                  className="p-6 md:p-8 rounded-xl border border-white/5 bg-white/[0.02]">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-lg bg-[#f97316]/10 flex items-center justify-center text-xs font-bold text-[#f97316]">
                      {t.company.substring(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm font-bold">{t.company}</p>
                      <p className="text-[10px] text-white/30">{t.name} · {t.role}</p>
                    </div>
                  </div>
                  <p className="text-sm text-white/50 leading-relaxed italic">"{t.text}"</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════
            6. FAQ
        ═══════════════════════════════════ */}
        <section className="py-20 md:py-32 px-6 md:px-12 bg-[#0c1445]">
          <div className="max-w-3xl mx-auto">
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#f97316] block mb-4">04 — FAQ</span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-16">Preguntas frecuentes</h2>

            <div className="space-y-0">
              {faqs.map((f, i) => (
                <div key={i} className="border-b border-white/5">
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full py-6 flex justify-between items-center text-left">
                    <span className="text-sm pr-8 font-medium">{f.q}</span>
                    <ChevronDown className={`w-4 h-4 text-white/20 shrink-0 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {openFaq === i && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden">
                        <p className="pb-6 text-sm text-white/40 leading-relaxed">{f.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════
            7. CONTACTO / CTA
        ═══════════════════════════════════ */}
        <section id="contacto" className="py-20 md:py-32 px-6 md:px-12 bg-[#0a0f30]">
          <div className="max-w-4xl mx-auto">
            <div className="p-8 md:p-16 rounded-2xl bg-gradient-to-br from-[#f97316]/10 to-transparent border border-[#f97316]/10">
              <div className="text-center mb-12">
                <span className="text-[10px] tracking-[0.3em] uppercase text-[#f97316] block mb-4">05 — Contacto</span>
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Pide presupuesto<br/><span className="text-[#f97316]">sin compromiso.</span></h2>
                <p className="text-sm text-white/30 max-w-md mx-auto">Respuesta en menos de 4 horas laborables. Presupuestos personalizados según volumen y frecuencia.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto mb-8">
                <input type="text" placeholder="Empresa" className="px-5 py-3.5 text-sm bg-white/5 border border-white/10 rounded-lg outline-none focus:border-[#f97316]/50 transition-colors placeholder:text-white/20" />
                <input type="email" placeholder="Email corporativo" className="px-5 py-3.5 text-sm bg-white/5 border border-white/10 rounded-lg outline-none focus:border-[#f97316]/50 transition-colors placeholder:text-white/20" />
                <input type="tel" placeholder="Teléfono" className="px-5 py-3.5 text-sm bg-white/5 border border-white/10 rounded-lg outline-none focus:border-[#f97316]/50 transition-colors placeholder:text-white/20" />
                <select className="px-5 py-3.5 text-sm bg-white/5 border border-white/10 rounded-lg outline-none focus:border-[#f97316]/50 transition-colors text-white/40">
                  <option>Tipo de servicio</option>
                  <option>Transporte Nacional</option>
                  <option>Paquetería Express</option>
                  <option>Internacional</option>
                  <option>Logística Integral</option>
                </select>
              </div>
              <div className="max-w-2xl mx-auto">
                <textarea placeholder="Describe tu necesidad logística..." rows={3}
                  className="w-full px-5 py-3.5 text-sm bg-white/5 border border-white/10 rounded-lg outline-none focus:border-[#f97316]/50 transition-colors placeholder:text-white/20 resize-none mb-4" />
                <button className="w-full py-4 bg-[#f97316] text-white text-sm font-bold rounded-lg hover:bg-[#ea580c] transition-colors">Solicitar Presupuesto</button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 text-center">
              <div>
                <Phone className="w-5 h-5 text-[#f97316]/40 mx-auto mb-3" />
                <p className="text-sm text-white/60">+34 955 456 789</p>
                <p className="text-[10px] text-white/20 mt-1">Lun-Vie 7:00-20:00</p>
              </div>
              <div>
                <Mail className="w-5 h-5 text-[#f97316]/40 mx-auto mb-3" />
                <p className="text-sm text-white/60">comercial@transandalus.es</p>
                <p className="text-[10px] text-white/20 mt-1">Respuesta en 4h</p>
              </div>
              <div>
                <MapPin className="w-5 h-5 text-[#f97316]/40 mx-auto mb-3" />
                <p className="text-sm text-white/60">Pol. Ind. La Red, Alcalá de Guadaíra</p>
                <p className="text-[10px] text-white/20 mt-1">Nave 12-14, CP 41500</p>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ FOOTER ═══ */}
        <footer className="py-8 px-6 md:px-12 border-t border-white/5 bg-[#0c1445]">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded bg-[#f97316] flex items-center justify-center"><Truck className="w-3 h-3" /></div>
              <p className="text-[10px] tracking-[0.15em] uppercase text-white/20">© 2026 TransAndalus Logística S.L.</p>
            </div>
            <p className="text-[10px] tracking-[0.15em] uppercase text-white/20">CIF: B-41XXXXXX · Alcalá de Guadaíra, Sevilla</p>
          </div>
        </footer>

      </div>
    </DemoLayout>
  );
}
