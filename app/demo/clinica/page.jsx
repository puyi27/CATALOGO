"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Mail, MapPin, Clock, Star, Shield, Heart, Smile, ChevronDown, ArrowRight, X, Menu, Check, Calendar } from "lucide-react";
import DemoLayout from "@/components/DemoLayout";

const treatments = [
  { name: "Limpieza Dental Profesional", price: "60€", duration: "45 min", desc: "Eliminación de placa y sarro con ultrasonidos. Pulido y fluorización. Revisión completa incluida." },
  { name: "Blanqueamiento LED", price: "290€", duration: "60 min", desc: "Tecnología LED de última generación. Hasta 8 tonos más blanco en una sola sesión. Resultado inmediato." },
  { name: "Ortodoncia Invisible", price: "Desde 2.400€", duration: "12-18 meses", desc: "Alineadores transparentes Invisalign. Planificación 3D personalizada. Sin brackets metálicos visibles." },
  { name: "Implantes Dentales", price: "Desde 890€", duration: "3-6 meses", desc: "Implantes de titanio grado 5. Cirugía mínimamente invasiva. Garantía de por vida en el implante." },
  { name: "Carillas de Porcelana", price: "Desde 450€/ud", duration: "2 visitas", desc: "Láminas ultrafinas de cerámica. Diseño digital de sonrisa previo. Aspecto completamente natural." },
  { name: "Endodoncia", price: "Desde 180€", duration: "60-90 min", desc: "Tratamiento de conducto con microscopio. Anestesia local indolora. Salvamos tu diente natural." },
];

const team = [
  { name: "Dra. Lucía Martín", specialty: "Directora Médica · Implantología", exp: "18 años", initial: "LM" },
  { name: "Dr. Carlos Rivas", specialty: "Ortodoncia y Estética", exp: "12 años", initial: "CR" },
  { name: "Dra. Ana Beltrán", specialty: "Odontología General", exp: "9 años", initial: "AB" },
  { name: "Marta Sánchez", specialty: "Higienista Dental", exp: "7 años", initial: "MS" },
];

const reviews = [
  { name: "Patricia G.", rating: 5, text: "Tenía verdadero pánico al dentista. La Dra. Lucía me trató con una paciencia infinita. Ahora vengo sin miedo.", date: "Mayo 2026" },
  { name: "Alejandro R.", rating: 5, text: "El blanqueamiento fue espectacular. En una hora noté un cambio brutal. El equipo es muy profesional.", date: "Abril 2026" },
  { name: "Carmen L.", rating: 5, text: "Mi hijo de 8 años sale encantado de cada visita. El trato con niños es excepcional. Recomendadísima.", date: "Marzo 2026" },
];

const faqs = [
  { q: "¿La primera consulta tiene coste?", a: "No. La primera visita incluye exploración completa, radiografía panorámica digital y diagnóstico personalizado sin coste ni compromiso." },
  { q: "¿Aceptan seguro dental?", a: "Sí. Trabajamos con Adeslas, Sanitas, Asisa, DKV, Mapfre Salud y la mayoría de aseguradoras. Consulta la tuya." },
  { q: "¿Ofrecen facilidades de pago?", a: "Financiación sin intereses hasta 24 meses en tratamientos superiores a 500€. También aceptamos Bizum." },
  { q: "¿Es doloroso el implante dental?", a: "El procedimiento se realiza con anestesia local y no produce dolor. Post-operatorio con molestias leves controladas con analgésicos convencionales." },
];

export default function ClinicaDemo() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const [selectedTreatment, setSelectedTreatment] = useState(null);

  return (
    <DemoLayout title="Clínica Sonrisa" year="2026">
      <div className="text-[#0c4a6e] selection:bg-[#0369a1] selection:text-white overflow-x-hidden bg-white" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>

        {/* ═══ MOBILE MENU ═══ */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-white z-[90] flex flex-col justify-center items-center md:hidden">
              <button onClick={() => setMenuOpen(false)} className="absolute top-6 right-6"><X className="w-6 h-6" /></button>
              <nav className="flex flex-col gap-6 text-center">
                {["Tratamientos", "Equipo", "Opiniones", "Contacto"].map((item, i) => (
                  <motion.a key={item} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: i * 0.08 }}
                    className="text-2xl font-light" onClick={() => setMenuOpen(false)} href={`#${item.toLowerCase()}`}>{item}</motion.a>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ═══ NAV ═══ */}
        <nav className="fixed top-0 left-0 w-full px-6 md:px-12 py-5 flex justify-between items-center z-[80] bg-white/90 backdrop-blur-xl border-b border-sky-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-sky-400 to-sky-600 flex items-center justify-center"><Smile className="w-4 h-4 text-white" /></div>
            <span className="text-sm font-semibold text-sky-900 hidden md:block">Clínica Sonrisa</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            {["Tratamientos", "Equipo", "Opiniones"].map(item => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-xs text-sky-700/50 hover:text-sky-900 transition-colors">{item}</a>
            ))}
            <a href="#contacto" className="px-5 py-2.5 bg-sky-600 text-white text-xs font-medium rounded-full hover:bg-sky-700 transition-colors flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5" /> Pedir Cita
            </a>
          </div>
          <button onClick={() => setMenuOpen(true)} className="md:hidden"><Menu className="w-5 h-5 text-sky-700" /></button>
        </nav>

        {/* ═══════════════════════════════════
            1. HERO — LIMPIA Y CONFIABLE
        ═══════════════════════════════════ */}
        <section className="pt-28 md:pt-32 pb-16 md:pb-24 px-6 md:px-12">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              <div className="flex items-center gap-2 mb-6">
                <div className="flex">
                  {[1,2,3,4,5].map(s => <Star key={s} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />)}
                </div>
                <span className="text-xs text-sky-700/50">4.9/5 — 523 reseñas en Google</span>
              </div>
              <h1 className="text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-[1.15] tracking-tight text-sky-950 mb-6">
                Tu sonrisa merece<br/>
                <span className="text-sky-600">la mejor clínica.</span>
              </h1>
              <p className="text-base text-sky-800/40 leading-relaxed max-w-md mb-8">
                Odontología avanzada con tecnología de última generación y un equipo que te trata como familia. Primera consulta gratuita.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a href="#contacto" className="px-6 py-3.5 bg-sky-600 text-white text-sm font-medium rounded-full hover:bg-sky-700 transition-colors flex items-center gap-2 justify-center">
                  <Calendar className="w-4 h-4" /> Pedir Cita Gratuita
                </a>
                <a href="tel:+34955567890" className="px-6 py-3.5 border border-sky-200 text-sky-700 text-sm rounded-full hover:border-sky-300 transition-colors flex items-center gap-2 justify-center">
                  <Phone className="w-4 h-4" /> 955 567 890
                </a>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.2 }}
              className="aspect-square rounded-3xl bg-gradient-to-br from-sky-50 via-sky-100 to-sky-200 relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <Smile className="w-32 h-32 text-sky-300/30" strokeWidth={1} />
              </div>
              <div className="absolute bottom-6 left-6 right-6 p-4 bg-white/80 backdrop-blur-md rounded-2xl border border-sky-100 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center"><Check className="w-5 h-5 text-green-600" /></div>
                <div>
                  <p className="text-sm font-medium text-sky-900">Próxima cita disponible</p>
                  <p className="text-xs text-sky-600">Hoy a las 17:30h</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ═══════════════════════════════════
            2. CONFIANZA — BADGES
        ═══════════════════════════════════ */}
        <section className="py-12 md:py-16 px-6 md:px-12 bg-sky-50 border-y border-sky-100">
          <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {[
              { icon: Shield, title: "15 años", sub: "de experiencia" },
              { icon: Heart, title: "+8.000", sub: "pacientes felices" },
              { icon: Star, title: "4.9/5", sub: "valoración media" },
              { icon: Clock, title: "Urgencias", sub: "mismo día" },
            ].map((b, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }} viewport={{ once: true }}
                className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white border border-sky-100 flex items-center justify-center shrink-0">
                  <b.icon className="w-4 h-4 text-sky-600" />
                </div>
                <div>
                  <span className="text-lg font-semibold text-sky-900">{b.title}</span>
                  <p className="text-[10px] text-sky-600/50 uppercase tracking-wide">{b.sub}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ═══════════════════════════════════
            3. TRATAMIENTOS — GRID
        ═══════════════════════════════════ */}
        <section id="tratamientos" className="py-20 md:py-32 px-6 md:px-12">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <span className="text-[10px] tracking-[0.3em] uppercase text-sky-600 block mb-3">Nuestros servicios</span>
              <h2 className="text-3xl md:text-4xl font-semibold text-sky-950 tracking-tight">Tratamientos dentales</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {treatments.map((t, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }} viewport={{ once: true }}
                  className="p-6 rounded-2xl border border-sky-100 bg-white hover:border-sky-200 hover:shadow-lg hover:shadow-sky-100/50 transition-all cursor-pointer group"
                  onClick={() => setSelectedTreatment(t)}>
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-base font-semibold text-sky-900 group-hover:text-sky-600 transition-colors">{t.name}</h3>
                    <ArrowRight className="w-4 h-4 text-sky-300 group-hover:text-sky-600 group-hover:translate-x-1 transition-all shrink-0 mt-1" />
                  </div>
                  <p className="text-sm text-sky-800/40 leading-relaxed mb-4 line-clamp-2">{t.desc}</p>
                  <div className="flex items-center justify-between pt-4 border-t border-sky-50">
                    <span className="text-lg font-semibold text-sky-600">{t.price}</span>
                    <span className="text-[10px] text-sky-400 tracking-wide uppercase">{t.duration}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ TREATMENT DETAIL MODAL ═══ */}
        <AnimatePresence>
          {selectedTreatment && (
            <>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onClick={() => setSelectedTreatment(null)} className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[100]" />
              <motion.div initial={{ opacity: 0, y: 50, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 50, scale: 0.95 }}
                className="fixed inset-x-4 md:inset-x-auto md:left-1/2 md:-translate-x-1/2 top-1/2 -translate-y-1/2 md:max-w-lg w-full bg-white rounded-3xl z-[101] p-8 md:p-10 shadow-2xl border border-sky-100">
                <button onClick={() => setSelectedTreatment(null)} className="absolute top-4 right-4"><X className="w-5 h-5 text-sky-300" /></button>
                <h3 className="text-2xl font-semibold text-sky-900 mb-2">{selectedTreatment.name}</h3>
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-xl font-semibold text-sky-600">{selectedTreatment.price}</span>
                  <span className="text-xs text-sky-400">·</span>
                  <span className="text-xs text-sky-400">{selectedTreatment.duration}</span>
                </div>
                <p className="text-sm text-sky-800/50 leading-relaxed mb-8">{selectedTreatment.desc}</p>
                <a href="#contacto" onClick={() => setSelectedTreatment(null)}
                  className="block w-full py-3.5 bg-sky-600 text-white text-sm font-medium rounded-full text-center hover:bg-sky-700 transition-colors">
                  Pedir cita para este tratamiento
                </a>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* ═══════════════════════════════════
            4. EQUIPO
        ═══════════════════════════════════ */}
        <section id="equipo" className="py-20 md:py-32 px-6 md:px-12 bg-sky-50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <span className="text-[10px] tracking-[0.3em] uppercase text-sky-600 block mb-3">Profesionales</span>
              <h2 className="text-3xl md:text-4xl font-semibold text-sky-950 tracking-tight">Nuestro equipo</h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {team.map((m, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }} viewport={{ once: true }} className="text-center">
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-sky-100 to-sky-200 flex items-center justify-center mx-auto mb-4">
                    <span className="text-lg font-semibold text-sky-600">{m.initial}</span>
                  </div>
                  <h3 className="text-sm font-semibold text-sky-900">{m.name}</h3>
                  <p className="text-[10px] text-sky-600/50 mt-1 leading-relaxed">{m.specialty}</p>
                  <p className="text-[10px] text-sky-400 mt-1">{m.exp} de experiencia</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════
            5. RESEÑAS
        ═══════════════════════════════════ */}
        <section id="opiniones" className="py-20 md:py-32 px-6 md:px-12">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <span className="text-[10px] tracking-[0.3em] uppercase text-sky-600 block mb-3">Opiniones verificadas</span>
              <h2 className="text-3xl md:text-4xl font-semibold text-sky-950 tracking-tight">Lo que dicen nuestros pacientes</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {reviews.map((r, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }} viewport={{ once: true }}
                  className="p-6 md:p-8 rounded-2xl bg-sky-50 border border-sky-100">
                  <div className="flex mb-4">
                    {Array.from({ length: r.rating }).map((_, s) => <Star key={s} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />)}
                  </div>
                  <p className="text-sm text-sky-800/60 leading-relaxed mb-6">"{r.text}"</p>
                  <div className="flex justify-between items-end">
                    <p className="text-sm font-medium text-sky-900">{r.name}</p>
                    <span className="text-[10px] text-sky-400">{r.date}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════
            6. FAQ
        ═══════════════════════════════════ */}
        <section className="py-20 md:py-32 px-6 md:px-12 bg-sky-50">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-16">
              <span className="text-[10px] tracking-[0.3em] uppercase text-sky-600 block mb-3">Preguntas frecuentes</span>
              <h2 className="text-3xl md:text-4xl font-semibold text-sky-950 tracking-tight">¿Tienes dudas?</h2>
            </div>

            <div className="space-y-0">
              {faqs.map((f, i) => (
                <div key={i} className="border-b border-sky-200/50">
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full py-5 flex justify-between items-center text-left">
                    <span className="text-sm font-medium text-sky-900 pr-8">{f.q}</span>
                    <ChevronDown className={`w-4 h-4 text-sky-300 shrink-0 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {openFaq === i && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden">
                        <p className="pb-5 text-sm text-sky-800/40 leading-relaxed">{f.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════
            7. CONTACTO / CITA
        ═══════════════════════════════════ */}
        <section id="contacto" className="py-20 md:py-32 px-6 md:px-12">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <span className="text-[10px] tracking-[0.3em] uppercase text-sky-600 block mb-3">Pide tu cita</span>
                <h2 className="text-3xl md:text-4xl font-semibold text-sky-950 tracking-tight mb-6">
                  Tu primera visita<br/><span className="text-sky-600">es gratuita.</span>
                </h2>
                <p className="text-sm text-sky-800/40 leading-relaxed mb-8">
                  Incluye exploración completa, radiografía panorámica digital y diagnóstico personalizado. Sin coste ni compromiso.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-sm text-sky-800/60"><Phone className="w-4 h-4 text-sky-400" /> +34 955 567 890</div>
                  <div className="flex items-center gap-3 text-sm text-sky-800/60"><Mail className="w-4 h-4 text-sky-400" /> cita@clinicasonrisa.es</div>
                  <div className="flex items-center gap-3 text-sm text-sky-800/60"><MapPin className="w-4 h-4 text-sky-400" /> Av. de la Constitución 18, 1ºB, Sevilla</div>
                  <div className="flex items-center gap-3 text-sm text-sky-800/60"><Clock className="w-4 h-4 text-sky-400" /> Lun-Vie 9:00-14:00 / 16:00-20:30</div>
                </div>
              </div>
              <div className="p-6 md:p-8 rounded-2xl bg-sky-50 border border-sky-100 space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <input type="text" placeholder="Nombre" className="px-4 py-3 text-sm bg-white border border-sky-100 rounded-xl outline-none focus:border-sky-300 transition-colors placeholder:text-sky-300" />
                  <input type="text" placeholder="Apellidos" className="px-4 py-3 text-sm bg-white border border-sky-100 rounded-xl outline-none focus:border-sky-300 transition-colors placeholder:text-sky-300" />
                </div>
                <input type="tel" placeholder="Teléfono" className="w-full px-4 py-3 text-sm bg-white border border-sky-100 rounded-xl outline-none focus:border-sky-300 transition-colors placeholder:text-sky-300" />
                <input type="email" placeholder="Email" className="w-full px-4 py-3 text-sm bg-white border border-sky-100 rounded-xl outline-none focus:border-sky-300 transition-colors placeholder:text-sky-300" />
                <select className="w-full px-4 py-3 text-sm bg-white border border-sky-100 rounded-xl outline-none focus:border-sky-300 transition-colors text-sky-400">
                  <option>Selecciona tratamiento</option>
                  {treatments.map(t => <option key={t.name}>{t.name}</option>)}
                </select>
                <textarea placeholder="¿Algo que debamos saber?" rows={3}
                  className="w-full px-4 py-3 text-sm bg-white border border-sky-100 rounded-xl outline-none focus:border-sky-300 transition-colors placeholder:text-sky-300 resize-none" />
                <button className="w-full py-3.5 bg-sky-600 text-white text-sm font-medium rounded-full hover:bg-sky-700 transition-colors">
                  Solicitar Cita Gratuita
                </button>
                <p className="text-center text-[10px] text-sky-400">Te confirmamos en menos de 2 horas</p>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ FOOTER ═══ */}
        <footer className="py-8 px-6 md:px-12 border-t border-sky-100">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Smile className="w-4 h-4 text-sky-400" />
              <p className="text-[10px] tracking-wide text-sky-400">© 2026 Clínica Sonrisa. Nº Registro Sanitario: NICA 45.XXX</p>
            </div>
            <p className="text-[10px] tracking-wide text-sky-400">Av. de la Constitución 18, 1ºB · Sevilla</p>
          </div>
        </footer>

      </div>
    </DemoLayout>
  );
}
