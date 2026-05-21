"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HeartPulse, UserCircle, Calendar, Clock, Shield, ChevronRight, Star, Check, Phone, Mail, MapPin, X, Lock } from 'lucide-react';
import Link from 'next/link';

const therapists = [
  { id: 1, name: 'Dra. Elena Vidal', spec: 'Psicología Clínica · Ansiedad y Depresión', exp: '12 años', rate: '€75 / sesión', available: true, img: 'https://loremflickr.com/1000/1000/zen,meditation/all?lock=1' },
  { id: 2, name: 'D. Carlos Mena', spec: 'Terapia de Pareja · Gestión del Estrés', exp: '8 años', rate: '€80 / sesión', available: true, img: 'https://loremflickr.com/1000/1000/zen,meditation/all?lock=2' },
  { id: 3, name: 'Dra. Sofía Ramírez', spec: 'Psicología Infantil y Adolescente', exp: '15 años', rate: '€70 / sesión', available: false, img: 'https://loremflickr.com/1000/1000/zen,meditation/all?lock=3' },
];

const services = [
  { icon: UserCircle, title: 'Psicología Individual', desc: 'Sesiones individuales para ansiedad, depresión, fobias, trauma, autoestima y mucho más.', duration: '50 min', format: 'Presencial u Online' },
  { icon: HeartPulse, title: 'Terapia de Pareja', desc: 'Mejora la comunicación, gestiona los conflictos y fortalece el vínculo afectivo.', duration: '70 min', format: 'Presencial u Online' },
  { icon: Shield, title: 'Psicología Infantil', desc: 'Apoyo especializado para niños y adolescentes en etapas de desarrollo y cambio.', duration: '45 min', format: 'Presencial' },
  { icon: Star, title: 'Evaluación Psicológica', desc: 'Diagnóstico clínico completo con informe detallado. Reconocido por mutuas y seguros.', duration: '3–5 sesiones', format: 'Presencial' },
];

const testimonials = [
  { name: 'M.G.', text: 'Después de 6 meses con la Dra. Vidal, he recuperado el control de mi vida. El espacio digital es impecable, muy fácil reservar.', stars: 5 },
  { name: 'R.P.', text: 'La terapia online me ha dado una flexibilidad que no encontré en ningún otro centro. Totalmente recomendable.', stars: 5 },
  { name: 'L.F.', text: 'El protocolo de privacidad te da mucha tranquilidad. Sientes que tus datos están completamente seguros.', stars: 5 },
];

const faqs = [
  { q: '¿Las sesiones son confidenciales?', a: 'Absolutamente. Todas nuestras sesiones, notas clínicas y comunicaciones están protegidas por el secreto profesional y encriptadas de extremo a extremo. Nunca compartimos datos con terceros.' },
  { q: '¿Cómo funciona la primera sesión?', a: 'La primera sesión (valoración gratuita de 20 min) sirve para conocer tu situación, respondemos tus preguntas y acordamos un plan terapéutico personalizado sin compromiso.' },
  { q: '¿Aceptáis seguros de salud?', a: 'Sí, trabajamos con las principales mutuas: Sanitas, Adeslas, Mapfre Salud, Asisa y Segurcaixa. Consulta la cobertura de tu póliza.' },
];

export default function ZenDemo() {
  const [selectedTherapist, setSelectedTherapist] = useState(null);
  const [activeQ, setActiveQ] = useState(null);
  const [bookingStep, setBookingStep] = useState(1);
  const [bookingData, setBookingData] = useState({ therapist: '', service: '', date: '', time: '10:00', name: '', email: '' });

  return (
    <div className="min-h-screen bg-[#F4F1EA] text-[#3A3A35] font-sans selection:bg-[#98A393]/40 overflow-x-hidden">

      {/* Nav */}
      <nav className="fixed w-full px-6 md:px-10 py-5 flex justify-between items-center z-50 bg-[#F4F1EA]/90 backdrop-blur-md border-b border-[#D5D0C5]">
        <div className="flex items-center gap-3">
          <HeartPulse className="w-5 h-5 text-[#98A393]" />
          <span className="font-serif text-xl tracking-wide text-[#4A4A45]">Savia <span className="font-light italic">Espacio</span></span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm">
          {['Servicios', 'Terapeutas', 'Precios', 'Blog'].map(item => (
            <button key={item} className="text-[#7C8578] hover:text-[#4A4A45] transition-colors font-light">{item}</button>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <Link href="/" className="text-xs font-mono uppercase tracking-widest text-[#98A393] hover:text-[#4A4A45] transition-colors">← Catálogo</Link>
          <a href="tel:+34912000000" className="flex items-center gap-2 bg-[#4A4A45] text-[#F4F1EA] px-5 py-2.5 rounded-full text-sm font-medium hover:bg-[#2C3E2A] transition-colors">
            <Phone className="w-3.5 h-3.5" /> Llamar
          </a>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative pt-40 pb-32 px-6 md:px-12 overflow-hidden">
        {/* Morphing SVG bg */}
        <div className="absolute inset-0 pointer-events-none z-0 flex items-center justify-center opacity-20">
          <motion.svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-[70vw] h-[70vw] fill-[#98A393]">
            <motion.path
              animate={{ d: ["M45.7,-76.4C58.9,-70.5,69,-56.3,77.5,-42.2C85.9,-28.2,92.6,-14.1,91.8,-0.5C91,13.2,82.5,26.4,73.5,38.8C64.5,51.3,54.9,63,42.5,70.9C30.2,78.8,15.1,83,1.3,80.7C-12.5,78.5,-25.1,69.9,-37.2,61.9C-49.3,53.8,-60.9,46.3,-69.5,35.3C-78,24.2,-83.4,9.6,-83.6,-5C-83.8,-19.7,-78.9,-34.5,-70.4,-46.3C-61.9,-58,-49.7,-66.8,-36.8,-73.2C-23.8,-79.6,-11.9,-83.6,1.4,-86C14.7,-88.4,29.3,-89.2,45.7,-76.4Z", "M38,-65.4C51.6,-61,66.6,-55,75.2,-43.5C83.7,-32,85.9,-16,84.1,-1.1C82.3,13.8,76.5,27.6,67.6,38.9C58.8,50.1,46.9,58.8,33.8,66.3C20.6,73.7,6.1,80,-8.1,82.8C-22.3,85.6,-36.2,84.9,-48.5,77.7C-60.7,70.5,-71.4,56.8,-78.2,41.4C-84.9,26,-87.8,8.8,-83.4,-6.2C-79,-21.2,-67.3,-34,-55.8,-45.5C-44.2,-57.1,-32.8,-67.4,-19.6,-71.2C-6.3,-75.1,8.7,-72.5,38,-65.4Z"] }}
              transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", repeatType: "mirror" }}
            />
          </motion.svg>
        </div>

        <div className="max-w-[90rem] mx-auto relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2 }}>
            <span className="inline-flex items-center gap-2 bg-[#98A393]/20 text-[#4A4A45] text-xs font-mono uppercase tracking-[0.3em] px-4 py-2 rounded-full mb-8 border border-[#98A393]/30">
              <Lock className="w-3 h-3" /> Sesiones 100% confidenciales
            </span>
            <h1 className="text-6xl md:text-[10rem] font-serif font-light tracking-tighter leading-[0.85] mb-8 text-[#4A4A45]">
              Un refugio<br />para la <span className="italic text-[#7C8578]">mente.</span>
            </h1>
            <div className="flex flex-col md:flex-row gap-8 items-start md:items-end justify-between max-w-4xl">
              <p className="text-xl font-light text-[#7C8578] leading-relaxed max-w-xl">
                Psicología clínica y bienestar emocional. Terapia presencial y online con profesionales colegiados. Primera valoración gratuita.
              </p>
              <div className="flex gap-4 flex-shrink-0">
                <a href="#reserva" className="bg-[#4A4A45] text-[#F4F1EA] px-8 py-4 rounded-full text-sm font-medium hover:bg-[#2C3E2A] transition-colors whitespace-nowrap">
                  Cita Gratuita
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SERVICIOS */}
      <section className="py-24 px-6 md:px-12 bg-white border-y border-[#D5D0C5]">
        <div className="max-w-[90rem] mx-auto">
          <div className="mb-16">
            <span className="font-mono text-[#98A393] text-xs tracking-widest uppercase block mb-3">Qué ofrecemos</span>
            <h2 className="text-4xl md:text-6xl font-serif font-light text-[#4A4A45] tracking-tighter">Servicios</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group p-8 md:p-10 border border-[#D5D0C5] rounded-2xl hover:border-[#98A393] hover:bg-[#F4F1EA]/50 transition-all cursor-pointer"
              >
                <div className="flex justify-between items-start mb-6">
                  <s.icon className="w-8 h-8 text-[#98A393]" />
                  <div className="text-right">
                    <div className="text-xs font-mono text-[#B8B4A8] uppercase tracking-widest">{s.duration}</div>
                    <div className="text-xs font-mono text-[#98A393] uppercase tracking-widest">{s.format}</div>
                  </div>
                </div>
                <h3 className="text-xl font-serif text-[#4A4A45] mb-3 group-hover:text-[#2C3E2A] transition-colors">{s.title}</h3>
                <p className="text-sm text-[#7C8578] font-light leading-relaxed">{s.desc}</p>
                <div className="mt-6 flex items-center gap-2 text-xs font-mono text-[#98A393] uppercase tracking-widest group-hover:gap-3 transition-all">
                  Más info <ChevronRight className="w-3 h-3" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TERAPEUTAS */}
      <section className="py-32 px-6 md:px-12">
        <div className="max-w-[90rem] mx-auto">
          <div className="mb-16">
            <span className="font-mono text-[#98A393] text-xs tracking-widest uppercase block mb-3">Nuestro equipo</span>
            <h2 className="text-4xl md:text-6xl font-serif font-light text-[#4A4A45] tracking-tighter">Profesionales</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {therapists.map((t, i) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                onClick={() => t.available && setSelectedTherapist(t)}
                className={`group rounded-2xl overflow-hidden border border-[#D5D0C5] bg-white hover:border-[#98A393] transition-all duration-500 ${t.available ? 'cursor-pointer' : 'opacity-70'}`}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <motion.img
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.8 }}
                    src={t.img}
                    alt={t.name}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                  />
                  <div className="absolute top-4 right-4">
                    <span className={`text-[9px] font-mono uppercase tracking-widest px-3 py-1 rounded-full ${t.available ? 'bg-green-100 text-green-700' : 'bg-zinc-100 text-zinc-500'}`}>
                      {t.available ? '● Disponible' : '● Llena agenda'}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-serif text-[#4A4A45] mb-1">{t.name}</h3>
                  <p className="text-xs font-mono text-[#98A393] uppercase tracking-widest mb-3">{t.spec}</p>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-[#7C8578] font-light">{t.exp} experiencia</span>
                    <span className="font-semibold text-[#4A4A45]">{t.rate}</span>
                  </div>
                  {t.available && (
                    <button className="mt-4 w-full py-2.5 border border-[#98A393] text-[#4A4A45] text-xs font-mono uppercase tracking-widest rounded-full group-hover:bg-[#4A4A45] group-hover:text-[#F4F1EA] transition-colors">
                      Reservar cita
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIOS */}
      <section className="py-24 px-6 bg-[#4A4A45] text-[#F4F1EA]">
        <div className="max-w-[90rem] mx-auto">
          <div className="mb-12">
            <span className="font-mono text-[#98A393] text-xs tracking-widest uppercase block mb-3">Experiencias reales</span>
            <h2 className="text-4xl md:text-5xl font-serif font-light tracking-tighter">Testimonios</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/5 border border-white/10 p-8 rounded-2xl"
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.stars }).map((_, j) => <Star key={j} className="w-4 h-4 fill-[#98A393] text-[#98A393]" />)}
                </div>
                <p className="text-[#D5D0C5] font-light leading-relaxed text-sm mb-4 italic">"{t.text}"</p>
                <span className="font-mono text-xs text-[#7C8578] uppercase tracking-widest">— {t.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-32 px-6 md:px-12 bg-white border-y border-[#D5D0C5]">
        <div className="max-w-3xl mx-auto">
          <div className="mb-16">
            <span className="font-mono text-[#98A393] text-xs tracking-widest uppercase block mb-3">Preguntas frecuentes</span>
            <h2 className="text-4xl md:text-5xl font-serif font-light text-[#4A4A45] tracking-tighter">FAQ</h2>
          </div>
          <div className="space-y-2">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-[#D5D0C5] rounded-xl overflow-hidden">
                <button
                  onClick={() => setActiveQ(activeQ === i ? null : i)}
                  className="w-full px-6 py-5 flex justify-between items-center text-left hover:bg-[#F4F1EA]/50 transition-colors"
                >
                  <span className="font-serif text-[#4A4A45] font-medium pr-4">{faq.q}</span>
                  <ChevronRight className={`w-4 h-4 text-[#98A393] flex-shrink-0 transition-transform ${activeQ === i ? 'rotate-90' : ''}`} />
                </button>
                <AnimatePresence>
                  {activeQ === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-5 text-sm text-[#7C8578] font-light leading-relaxed border-t border-[#D5D0C5]">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA / RESERVA */}
      <section id="reserva" className="py-32 px-6 md:px-12 bg-[#F4F1EA]">
        <div className="max-w-2xl mx-auto text-center">
          <HeartPulse className="w-10 h-10 text-[#98A393] mx-auto mb-8" />
          <h2 className="text-5xl md:text-7xl font-serif font-light text-[#4A4A45] tracking-tighter mb-6">
            Empieza<br /><span className="italic text-[#7C8578]">hoy.</span>
          </h2>
          <p className="text-lg text-[#7C8578] font-light mb-12 leading-relaxed">
            Primera valoración gratuita de 20 minutos. Sin compromiso. Respuesta garantizada en menos de 24h.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+34912000000" className="flex items-center justify-center gap-2 bg-[#4A4A45] text-[#F4F1EA] px-8 py-4 rounded-full font-medium hover:bg-[#2C3E2A] transition-colors">
              <Phone className="w-4 h-4" /> +34 912 000 000
            </a>
            <a href="mailto:citas@savia-espacio.es" className="flex items-center justify-center gap-2 border border-[#98A393] text-[#4A4A45] px-8 py-4 rounded-full font-medium hover:bg-[#98A393]/10 transition-colors">
              <Mail className="w-4 h-4" /> citas@savia-espacio.es
            </a>
          </div>
          <div className="mt-8 flex items-center justify-center gap-4 text-xs font-mono text-[#98A393] uppercase tracking-widest">
            <Lock className="w-3 h-3" />
            <span>Datos encriptados E2E · Secreto profesional garantizado</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-[#D5D0C5] bg-[#F4F1EA]">
        <div className="max-w-[90rem] mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-[#B8B4A8] font-mono uppercase tracking-widest">
          <span>© {new Date().getFullYear()} Savia Espacio · Centro de Psicología</span>
          <div className="flex items-center gap-2"><MapPin className="w-3 h-3" /> C/ del Bienestar, 14 — Madrid</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-[#4A4A45] transition-colors">Aviso Legal</a>
            <a href="#" className="hover:text-[#4A4A45] transition-colors">Privacidad</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
