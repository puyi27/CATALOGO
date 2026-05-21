"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { Flame, Calendar, Clock, Star, MapPin, Phone, ChevronRight, X, Check, Wine, UtensilsCrossed } from 'lucide-react';
import Link from 'next/link';

const menuSections = [
  {
    id: 'carnes',
    label: 'Carnes a la Brasa',
    items: [
      { name: 'Chuletón Rubia Gallega', desc: '90 días de maduración en cámara propia. Sal de Añana, aceite de oliva virgen extra.', price: '€58', badge: 'Firma', img: 'https://loremflickr.com/1000/1000/finedining,plating/all?lock=1', maduración: '90 días', origen: 'Galicia', peso: '~800g' },
      { name: 'Entrecot de Wagyu A5', desc: 'Grado máximo de infiltración grasa. Plancha de piedra volcánica en mesa. 250g.', price: '€72', badge: 'Premium', img: 'https://loremflickr.com/1000/1000/finedining,plating/all?lock=2', maduración: 'Sin madurar', origen: 'Japón', peso: '250g' },
      { name: 'Costillar Ibérico 12h', desc: 'Cerdo ibérico de bellota. Cocción lenta 12 horas a 80°C. Braseado al momento.', price: '€38', badge: 'Lento', img: 'https://loremflickr.com/1000/1000/finedining,plating/all?lock=3', maduración: '—', origen: 'Extremadura', peso: '~600g' },
    ]
  },
  {
    id: 'entrantes',
    label: 'Entrantes',
    items: [
      { name: 'Tataki de Atún Rojo', desc: 'Almadraba de Barbate. Soja negra, jengibre, sésamo tostado y brotes de shiso.', price: '€22', badge: '', img: 'https://loremflickr.com/1000/1000/finedining,plating/all?lock=4', maduración: '—', origen: 'Cádiz', peso: '180g' },
      { name: 'Burrata Nómada', desc: 'Burrata fresca de Puglia, tomate cherry confitado, pistachos y pesto de rúcula.', price: '€16', badge: '', img: 'https://loremflickr.com/1000/1000/finedining,plating/all?lock=5', maduración: '—', origen: 'Italia', peso: '—' },
    ]
  },
];

const eventosProximos = [
  { fecha: '28 Jun', evento: 'Cata de Vinos de Jerez', plazas: 14, precio: '€65/pers' },
  { fecha: '12 Jul', evento: 'Maridaje Wagyu & Sake', plazas: 8, precio: '€120/pers' },
  { fecha: '20 Jul', evento: 'Noche de Brasa con Chef', plazas: 20, precio: '€85/pers' },
];

const horarios = [
  { dia: 'Lun – Jue', comida: '13:00 – 16:00', cena: '20:30 – 23:30' },
  { dia: 'Vie – Sáb', comida: '13:00 – 16:30', cena: '20:00 – 00:00' },
  { dia: 'Domingo', comida: '13:00 – 17:00', cena: 'Cerrado' },
];

function useCounterStat(base, variance, ms) {
  const [v, setV] = useState(base);
  useEffect(() => {
    const id = setInterval(() => setV(base + (Math.random() * variance - variance / 2)), ms);
    return () => clearInterval(id);
  }, [base, variance, ms]);
  return v.toFixed(1);
}

export default function GastronomiaDemo() {
  const [activeSection, setActiveSection] = useState('carnes');
  const [selectedItem, setSelectedItem] = useState(null);
  const [reservaOpen, setReservaOpen] = useState(false);
  const cursorX = useMotionValue(-200);
  const cursorY = useMotionValue(-200);
  const springX = useSpring(cursorX, { stiffness: 500, damping: 40, mass: 0.3 });
  const springY = useSpring(cursorY, { stiffness: 500, damping: 40, mass: 0.3 });
  const [hoveredItem, setHoveredItem] = useState(null);
  const ocupacion = useCounterStat(73, 12, 3000);

  useEffect(() => {
    const h = (e) => { cursorX.set(e.clientX); cursorY.set(e.clientY); };
    window.addEventListener('mousemove', h, { passive: true });
    return () => window.removeEventListener('mousemove', h);
  }, []);

  const currentSection = menuSections.find(s => s.id === activeSection);

  return (
    <div className="min-h-screen bg-[#0f0d0b] text-[#e8dac1] font-sans selection:bg-[#8b2615] overflow-x-hidden cursor-none">

      {/* Custom cursor — x/y via MotionValue, size via hoveredItem */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          x: springX,
          y: springY,
          translateX: hoveredItem ? -48 : -6,
          translateY: hoveredItem ? -48 : -6,
        }}
      >
        {hoveredItem ? (
          <div className="w-24 h-24 rounded-full bg-[#d4af37] flex items-center justify-center text-black font-bold text-xs uppercase tracking-wider">VER</div>
        ) : (
          <div className="w-3 h-3 rounded-full bg-[#d4af37]" />
        )}
      </motion.div>

      {/* Nav */}
      <nav className="fixed w-full px-6 md:px-10 py-5 flex justify-between items-center z-50 bg-[#0f0d0b]/90 backdrop-blur-md border-b border-white/5">
        <Link href="/" className="font-mono text-xs tracking-widest uppercase text-zinc-500 hover:text-white transition-colors">← Catálogo</Link>
        <div className="flex items-center gap-3">
          <Flame className="w-5 h-5 text-[#8b2615]" />
          <h1 className="font-serif text-2xl md:text-3xl tracking-widest uppercase text-[#d4af37]">La Brasa.</h1>
        </div>
        <button
          onClick={() => setReservaOpen(true)}
          className="border border-[#d4af37] text-[#d4af37] px-5 py-2.5 uppercase tracking-widest text-xs hover:bg-[#d4af37] hover:text-black transition-colors font-mono"
        >
          Reservar
        </button>
      </nav>

      {/* HERO */}
      <section className="relative h-screen flex flex-col justify-end pb-20 px-6 md:px-12 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="w-full h-full bg-[url('https://loremflickr.com/1000/1000/finedining,plating/all?lock=6')] bg-cover bg-center" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f0d0b] via-[#0f0d0b]/60 to-transparent" />
        </div>

        <div className="relative z-10 max-w-[90rem] mx-auto w-full">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
            <div className="flex items-center gap-3 mb-6">
              {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-[#d4af37] text-[#d4af37]" />)}
              <span className="text-sm text-[#d4af37] font-mono ml-2">4.9 · 847 reseñas</span>
            </div>
          </motion.div>
          <motion.h2
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1] }}
            className="text-7xl md:text-[11rem] font-serif font-black uppercase tracking-tighter text-[#d4af37] leading-[0.8] mb-8"
          >
            Fuego &<br />Tradición
          </motion.h2>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }} className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <p className="text-lg text-zinc-400 max-w-lg leading-relaxed">
              Carnes de extrema maduración cocinadas a la brasa de encina. El fuego como técnica, el tiempo como ingrediente.
            </p>
            <div className="flex items-center gap-6 text-xs font-mono uppercase tracking-widest text-zinc-500">
              <span className="flex items-center gap-2"><MapPin className="w-3 h-3" /> C/ del Fuego, 7 — Sevilla</span>
              <span className="flex items-center gap-2"><Phone className="w-3 h-3" /> +34 954 000 000</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* LIVE STATUS */}
      <section className="py-8 px-6 bg-[#1a1209] border-y border-white/5">
        <div className="max-w-[90rem] mx-auto flex flex-wrap gap-8 items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" />
            <span className="font-mono text-xs text-zinc-400 uppercase tracking-widest">Abierto ahora · Cierra 23:30</span>
          </div>
          <div className="flex gap-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-[#d4af37] font-mono">{ocupacion}%</div>
              <div className="text-[9px] font-mono text-zinc-600 uppercase tracking-widest">Ocupación</div>
            </div>
            <div className="w-px bg-white/5" />
            <div className="text-center">
              <div className="text-2xl font-bold text-white font-mono">~35min</div>
              <div className="text-[9px] font-mono text-zinc-600 uppercase tracking-widest">Espera sin reserva</div>
            </div>
            <div className="w-px bg-white/5" />
            <div className="text-center">
              <div className="text-2xl font-bold text-[#8b2615] font-mono">8</div>
              <div className="text-[9px] font-mono text-zinc-600 uppercase tracking-widest">Mesas libres</div>
            </div>
          </div>
        </div>
      </section>

      {/* MENÚ */}
      <section className="py-32 px-6 md:px-12">
        <div className="max-w-[90rem] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            <div>
              <span className="font-mono text-[#8b2615] text-xs tracking-widest uppercase block mb-3">Temporada 2024</span>
              <h2 className="text-5xl md:text-7xl font-serif font-light text-[#d4af37] tracking-tighter">Nuestra Carta</h2>
            </div>
            <div className="flex gap-3">
              {menuSections.map(s => (
                <button
                  key={s.id}
                  onClick={() => setActiveSection(s.id)}
                  className={`px-5 py-2.5 font-mono text-xs uppercase tracking-widest transition-colors border ${
                    activeSection === s.id ? 'bg-[#d4af37] text-black border-[#d4af37]' : 'text-zinc-500 border-white/10 hover:border-white/30'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-1">
            {currentSection.items.map((item, i) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                onMouseEnter={() => setHoveredItem(item.name)}
                onMouseLeave={() => setHoveredItem(null)}
                onClick={() => setSelectedItem(item)}
                className="group border border-white/5 p-6 md:p-8 flex flex-col md:flex-row md:items-center gap-6 hover:bg-white/5 transition-colors cursor-none"
              >
                <div className="w-full md:w-32 h-24 md:h-20 rounded overflow-hidden flex-shrink-0">
                  <img src={item.img} alt={item.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-110 group-hover:scale-100" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-xl md:text-2xl font-serif text-[#e8dac1] group-hover:text-[#d4af37] transition-colors">{item.name}</h3>
                    {item.badge && <span className="text-[9px] font-mono uppercase tracking-widest bg-[#8b2615]/30 text-[#d4af37] px-2 py-0.5 border border-[#8b2615]/50">{item.badge}</span>}
                  </div>
                  <p className="text-sm text-zinc-500 font-light leading-relaxed">{item.desc}</p>
                  <div className="flex gap-6 mt-3 text-[10px] font-mono text-zinc-600 uppercase tracking-widest">
                    <span>Origen: {item.origen}</span>
                    <span>Peso: {item.peso}</span>
                    {item.maduración !== '—' && <span>Maduración: {item.maduración}</span>}
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className="text-2xl font-bold text-[#d4af37] font-serif">{item.price}</span>
                  <ChevronRight className="w-4 h-4 text-zinc-600 group-hover:text-[#d4af37] transition-colors group-hover:translate-x-1 transform" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PRÓXIMOS EVENTOS */}
      <section className="py-24 px-6 bg-[#0a0806] border-t border-white/5">
        <div className="max-w-[90rem] mx-auto">
          <div className="mb-12">
            <span className="font-mono text-[#8b2615] text-xs tracking-widest uppercase block mb-3">Agenda</span>
            <h2 className="text-4xl md:text-5xl font-serif font-light text-[#d4af37]">Próximos Eventos</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {eventosProximos.map((ev, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-[#1a1209] border border-white/5 p-8 group hover:border-[#d4af37]/30 transition-colors cursor-none"
                onMouseEnter={() => setHoveredItem('event')}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <div className="text-3xl font-bold text-[#8b2615] font-mono mb-4">{ev.fecha}</div>
                <h3 className="text-lg font-serif text-[#e8dac1] mb-3 group-hover:text-[#d4af37] transition-colors">{ev.evento}</h3>
                <div className="flex justify-between items-center text-xs font-mono text-zinc-500 uppercase tracking-widest">
                  <span>{ev.plazas} plazas</span>
                  <span className="text-[#d4af37]">{ev.precio}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* HORARIOS */}
      <section className="py-24 px-6 border-t border-white/5">
        <div className="max-w-[90rem] mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <span className="font-mono text-[#8b2615] text-xs tracking-widest uppercase block mb-3">Visítenos</span>
            <h2 className="text-4xl md:text-6xl font-serif font-light text-[#d4af37] mb-8">Horarios</h2>
            <div className="space-y-4">
              {horarios.map((h, i) => (
                <div key={i} className="flex flex-col md:flex-row md:items-center gap-2 md:gap-8 border-b border-white/5 pb-4">
                  <span className="text-sm font-mono text-zinc-400 uppercase tracking-widest w-28 flex-shrink-0">{h.dia}</span>
                  <div className="flex gap-6 text-sm font-light">
                    <span className="text-[#e8dac1]">Comida: <span className="text-[#d4af37]">{h.comida}</span></span>
                    <span className="text-[#e8dac1]">Cena: <span className={h.cena === 'Cerrado' ? 'text-zinc-600' : 'text-[#d4af37]'}>{h.cena}</span></span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative aspect-square rounded-2xl overflow-hidden">
            <img src="https://loremflickr.com/1000/1000/finedining,plating/all?lock=7" alt="Restaurante" className="w-full h-full object-cover grayscale" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0f0d0b]/80 to-transparent" />
            <div className="absolute bottom-8 left-8">
              <p className="text-xs font-mono text-zinc-400 uppercase tracking-widest mb-1">Nuestra sala</p>
              <p className="text-2xl font-serif text-[#d4af37]">60 comensales</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA RESERVA */}
      <section className="py-32 px-6 bg-[#d4af37] text-black text-center">
        <h2 className="text-5xl md:text-8xl font-serif font-black uppercase tracking-tighter mb-8">Reserva tu<br />Mesa.</h2>
        <p className="text-lg font-light mb-12 max-w-md mx-auto text-black/60">Garantiza tu experiencia. Aceptamos reservas con hasta 30 días de antelación.</p>
        <button
          onClick={() => setReservaOpen(true)}
          className="bg-black text-[#d4af37] px-12 py-5 text-sm font-mono uppercase tracking-widest hover:bg-[#111] transition-colors"
        >
          Reservar Ahora
        </button>
      </section>

      {/* MODAL RESERVA */}
      <AnimatePresence>
        {reservaOpen && (
          <motion.div
            className="fixed inset-0 z-[9000] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setReservaOpen(false)} />
            <motion.div
              initial={{ y: 60, scale: 0.95 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ y: 40, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative bg-[#0f0d0b] border border-[#d4af37]/30 p-8 md:p-12 w-full max-w-lg z-10"
            >
              <button onClick={() => setReservaOpen(false)} className="absolute top-6 right-6 text-zinc-500 hover:text-white transition-colors">
                <X className="w-6 h-6" />
              </button>
              <h3 className="text-3xl font-serif text-[#d4af37] mb-8">Reservar Mesa</h3>
              <form className="space-y-4" onSubmit={e => { e.preventDefault(); setReservaOpen(false); }}>
                <input type="text" placeholder="Nombre completo" required className="w-full bg-white/5 border border-white/10 p-4 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#d4af37]/50" />
                <input type="tel" placeholder="Teléfono" required className="w-full bg-white/5 border border-white/10 p-4 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#d4af37]/50" />
                <div className="grid grid-cols-2 gap-4">
                  <input type="date" className="w-full bg-white/5 border border-white/10 p-4 text-sm text-zinc-400 focus:outline-none focus:border-[#d4af37]/50" />
                  <select className="w-full bg-white/5 border border-white/10 p-4 text-sm text-zinc-400 focus:outline-none focus:border-[#d4af37]/50">
                    {['1 persona','2 personas','3 personas','4 personas','5+ personas'].map(o => <option key={o} className="bg-[#0f0d0b]">{o}</option>)}
                  </select>
                </div>
                <textarea placeholder="Notas especiales (alergias, celebraciones...)" rows={3} className="w-full bg-white/5 border border-white/10 p-4 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#d4af37]/50 resize-none" />
                <button type="submit" className="w-full bg-[#d4af37] text-black py-4 text-sm font-bold uppercase tracking-widest hover:bg-[#c49b30] transition-colors">
                  Confirmar Reserva
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="py-8 px-6 bg-[#0a0806] border-t border-white/5">
        <div className="max-w-[90rem] mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-zinc-600 font-mono uppercase tracking-widest">
          <span>© {new Date().getFullYear()} La Brasa — Restaurante de Autor</span>
          <div className="flex items-center gap-2 text-zinc-500">
            <MapPin className="w-3 h-3" /> C/ del Fuego, 7 · Sevilla · <Phone className="w-3 h-3 ml-2" /> +34 954 000 000
          </div>
        </div>
      </footer>
    </div>
  );
}
