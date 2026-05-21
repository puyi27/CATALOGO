"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { Sparkles, Music, Clock, Users, ChevronRight, Instagram, Mail, Phone, X, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

const events = [
  { id: 1, day: 'VIE', date: '23 Jun', name: 'Rober Sánchez B2B Djuma', genre: 'Techno · Minimal', time: '24:00 – 07:00', price: '€20 anticipada / €30 puerta', img: 'https://loremflickr.com/1000/1000/nightclub,dj/all?lock=1', sold: false },
  { id: 2, day: 'SÁB', date: '24 Jun', name: 'Âme (Live) + Innervisions Night', genre: 'House · Deep', time: '23:00 – 08:00', price: '€35 anticipada · Sold Out casi', img: 'https://loremflickr.com/1000/1000/nightclub,dj/all?lock=2', sold: false },
  { id: 3, day: 'VIE', date: '30 Jun', name: 'Resident Night: KODE9', genre: 'Bass · Grime Experimental', time: '24:00 – 06:00', price: '€15 anticipada', img: 'https://loremflickr.com/1000/1000/nightclub,dj/all?lock=3', sold: false },
  { id: 4, day: 'SÁB', date: '1 Jul', name: 'Closing Party ft. Bicep', genre: 'Electronic · Indie Dance', time: '22:00 – 07:00', price: '€45 anticipada · Limitado', img: 'https://loremflickr.com/1000/1000/nightclub,dj/all?lock=4', sold: false },
];

const cocktails = [
  { name: 'Neon Fog', base: 'Gin Roku', notas: 'Yuzu, violeta, agua de rosas, tónica Fever-Tree', price: '€14' },
  { name: 'Naked & Famous', base: 'Mezcal Montelobos', notas: 'Aperol, yellow Chartreuse, lima fresca', price: '€16' },
  { name: 'Purple Rain', base: 'Tequila Patrón Silver', notas: 'Mariposa butterfly pea, lima, sirope de lavanda', price: '€15' },
  { name: 'Dark Matter', base: 'Ron Zacapa 23', notas: 'Cold brew nitro, Kahlúa, espuma de vainilla', price: '€17' },
];

const rooms = [
  { name: 'Main Floor', cap: '600 pax', sistema: 'L-Acoustics K2 • d&b J-Series', lights: 'ROBELightMAX + Martin VDO' },
  { name: 'Terrace', cap: '200 pax', sistema: 'Funktion-One F218 + F81', lights: 'Chauvet COLORado 2' },
  { name: 'VIP Room', cap: '50 pax', sistema: 'Meyer Sound Bluehorn', lights: 'GLP impression X4 Bar' },
];

export default function NightlifeDemo() {
  const [showFlash, setShowFlash] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [vipForm, setVipForm] = useState({ name: '', email: '', guests: '2' });
  const [vipSent, setVipSent] = useState(false);

  const cursorX = useMotionValue(-200);
  const cursorY = useMotionValue(-200);
  const springX = useSpring(cursorX, { stiffness: 600, damping: 40, mass: 0.2 });
  const springY = useSpring(cursorY, { stiffness: 600, damping: 40, mass: 0.2 });

  useEffect(() => {
    const h = (e) => { cursorX.set(e.clientX - 6); cursorY.set(e.clientY - 6); };
    window.addEventListener('mousemove', h, { passive: true });
    return () => window.removeEventListener('mousemove', h);
  }, []);

  const handleVipSubmit = (e) => {
    e.preventDefault();
    setVipSent(true);
    setTimeout(() => { setVipSent(false); setSelectedEvent(null); }, 3000);
  };

  return (
    <div className="min-h-screen bg-[#050014] text-white font-sans overflow-x-hidden cursor-none selection:bg-fuchsia-600">

      {/* Cursor */}
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 rounded-full bg-fuchsia-400 pointer-events-none z-[9999] mix-blend-difference"
        style={{ x: springX, y: springY }}
      />

      {/* Ambient BG — CSS only, no JS animation on blurs */}
      <div className="fixed inset-0 pointer-events-none opacity-30">
        <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-fuchsia-600 rounded-full blur-[150px]" style={{ animation: 'nightPulse1 8s ease-in-out infinite' }} />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-blue-700 rounded-full blur-[150px]" style={{ animation: 'nightPulse2 10s ease-in-out 2s infinite' }} />
        <div className="absolute top-[20%] right-[20%] w-[40%] h-[40%] bg-purple-600 rounded-full blur-[120px]" />
      </div>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes nightPulse1 { 0%,100%{transform:scale(1);opacity:.3} 50%{transform:scale(1.2);opacity:.6} }
        @keyframes nightPulse2 { 0%,100%{transform:scale(1)} 50%{transform:scale(1.15)} }
      ` }} />

      {/* Flash */}
      <AnimatePresence>
        {showFlash && (
          <motion.div initial={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-white z-[9998] pointer-events-none" />
        )}
      </AnimatePresence>

      {/* Nav */}
      <nav className="fixed w-full px-6 md:px-10 py-5 flex justify-between items-center z-50 mix-blend-difference">
        <Link href="/" className="font-mono text-xs tracking-widest uppercase text-white/60 hover:text-white transition-colors">← Catálogo</Link>
        <h1 className="text-2xl md:text-3xl font-black uppercase tracking-[0.3em]">
          Naked & <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-purple-600">Famous</span>
        </h1>
        <button className="font-mono text-xs tracking-widest uppercase text-white/60 hover:text-white transition-colors flex items-center gap-2">
          <Sparkles className="w-3 h-3" /> Agenda
        </button>
      </nav>

      {/* HERO */}
      <section className="relative h-screen flex flex-col justify-center items-center text-center px-6 overflow-hidden">
        <div className="relative z-10">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.5 }}>
            <p className="font-mono text-xs tracking-[0.5em] uppercase text-white/30 mb-6">Underground Mixology · Desde 1998</p>
            <h2 className="text-[4rem] md:text-[10rem] font-black uppercase tracking-tighter leading-[0.8] mb-8">
              No hay<br />carteles<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 via-purple-500 to-blue-500">en la puerta.</span>
            </h2>
            <p className="text-lg md:text-xl font-light text-white/60 max-w-xl mx-auto leading-relaxed">
              Si sabes dónde estamos, eres bienvenido. Alta coctelería, neones fundidos y el mejor sistema de sonido de la ciudad.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }} className="mt-12 flex flex-wrap gap-4 justify-center">
            <button
              onClick={() => { setShowFlash(true); setTimeout(() => setShowFlash(false), 150); document.getElementById('agenda')?.scrollIntoView({ behavior: 'smooth' }); }}
              className="group flex items-center gap-3 px-8 py-4 border border-fuchsia-500/50 rounded-full font-mono text-sm uppercase tracking-wider hover:bg-fuchsia-500/20 transition-colors"
            >
              <Sparkles className="w-4 h-4 text-fuchsia-400 group-hover:animate-spin" />
              Ver Agenda
            </button>
            <a href="#cocktails" className="px-8 py-4 bg-white/10 rounded-full font-mono text-sm uppercase tracking-wider hover:bg-white/20 transition-colors border border-white/10">
              Cocktail Menu
            </a>
          </motion.div>
        </div>
      </section>

      {/* AGENDA */}
      <section id="agenda" className="py-32 px-6 md:px-12 relative z-10">
        <div className="max-w-[90rem] mx-auto">
          <div className="mb-16">
            <span className="font-mono text-xs tracking-widest uppercase text-fuchsia-400/70 block mb-3">Próximas noches</span>
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter">Agenda</h2>
          </div>

          <div className="space-y-2">
            {events.map((event, i) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                onClick={() => setSelectedEvent(event)}
                className="group border border-white/10 p-6 md:p-8 flex flex-col md:flex-row md:items-center gap-6 hover:bg-white/5 hover:border-fuchsia-500/30 transition-all cursor-none"
              >
                <div className="text-center flex-shrink-0 w-16">
                  <div className="text-xs font-mono text-fuchsia-400 uppercase tracking-widest">{event.day}</div>
                  <div className="text-2xl font-black text-white leading-none">{event.date.split(' ')[0]}</div>
                  <div className="text-xs font-mono text-zinc-500">{event.date.split(' ')[1]}</div>
                </div>
                <div className="w-px h-16 bg-white/10 hidden md:block flex-shrink-0" />
                <div className="flex-1">
                  <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-fuchsia-300 transition-colors mb-1">{event.name}</h3>
                  <div className="flex flex-wrap gap-4 text-xs font-mono text-zinc-500 uppercase tracking-widest">
                    <span className="flex items-center gap-1.5"><Music className="w-3 h-3" />{event.genre}</span>
                    <span className="flex items-center gap-1.5"><Clock className="w-3 h-3" />{event.time}</span>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <span className="text-sm font-mono text-fuchsia-400">{event.price}</span>
                  <button className="flex items-center gap-2 px-5 py-2.5 border border-fuchsia-500/50 text-fuchsia-400 text-xs font-mono uppercase tracking-wider hover:bg-fuchsia-500/20 transition-colors rounded-full">
                    VIP <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* COCKTAILS */}
      <section id="cocktails" className="py-32 px-6 md:px-12 bg-black/40 border-y border-white/5 relative z-10">
        <div className="max-w-[90rem] mx-auto">
          <div className="mb-16">
            <span className="font-mono text-xs tracking-widest uppercase text-fuchsia-400/70 block mb-3">Propuestas de temporada</span>
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter">Cocktail Bar</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {cocktails.map((c, i) => (
              <motion.div
                key={c.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="border border-white/10 p-8 group hover:border-fuchsia-500/30 hover:bg-white/5 transition-all"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-bold group-hover:text-fuchsia-300 transition-colors">{c.name}</h3>
                  <span className="text-xl font-bold text-fuchsia-400 font-mono">{c.price}</span>
                </div>
                <p className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-2">Base: {c.base}</p>
                <p className="text-sm text-zinc-400 font-light leading-relaxed">{c.notas}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SALAS Y SONIDO */}
      <section className="py-32 px-6 md:px-12 relative z-10">
        <div className="max-w-[90rem] mx-auto">
          <div className="mb-16">
            <span className="font-mono text-xs tracking-widest uppercase text-fuchsia-400/70 block mb-3">Infraestructura</span>
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter">El Espacio</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            {rooms.map((r, i) => (
              <motion.div
                key={r.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/5 border border-white/10 p-8 md:p-10"
              >
                <div className="text-5xl font-black text-white/10 font-mono mb-4">{String(i+1).padStart(2,'0')}</div>
                <h3 className="text-2xl font-bold mb-2 text-fuchsia-300">{r.name}</h3>
                <div className="space-y-3 text-sm text-zinc-400">
                  <div className="flex items-center gap-2"><Users className="w-4 h-4 text-zinc-600" />{r.cap}</div>
                  <div className="text-xs font-mono text-zinc-500"><span className="text-zinc-400">Sonido: </span>{r.sistema}</div>
                  <div className="text-xs font-mono text-zinc-500"><span className="text-zinc-400">Iluminación: </span>{r.lights}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-6 text-center relative z-10 border-t border-white/5">
        <h2 className="text-5xl md:text-9xl font-black uppercase tracking-tighter mb-8">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-blue-500">Entra.</span>
        </h2>
        <p className="text-lg text-white/40 font-light mb-12 max-w-md mx-auto">Acceso sólo con reserva de lista VIP o entrada anticipada.</p>
        <div className="flex flex-wrap gap-4 justify-center">
          <a href="mailto:vip@naked-famous.club" className="flex items-center gap-2 px-8 py-4 border border-fuchsia-500 text-fuchsia-400 font-mono text-sm uppercase tracking-wider hover:bg-fuchsia-500/20 transition-colors rounded-full">
            <Mail className="w-4 h-4" /> vip@naked-famous.club
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-8 py-4 bg-white/10 text-white font-mono text-sm uppercase tracking-wider hover:bg-white/20 transition-colors rounded-full border border-white/10">
            <Instagram className="w-4 h-4" /> @nakedfamous
          </a>
        </div>
      </section>

      {/* MODAL EVENTO / VIP */}
      <AnimatePresence>
        {selectedEvent && (
          <motion.div className="fixed inset-0 z-[9000] flex items-center justify-center p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={() => setSelectedEvent(null)} />
            <motion.div
              initial={{ y: 60, scale: 0.95 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ y: 40, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative bg-[#0a0a1a] border border-fuchsia-500/30 p-8 md:p-12 w-full max-w-lg z-10"
            >
              <button onClick={() => setSelectedEvent(null)} className="absolute top-6 right-6 text-zinc-500 hover:text-white transition-colors">
                <X className="w-6 h-6" />
              </button>
              {vipSent ? (
                <div className="text-center py-8">
                  <CheckCircle2 className="w-16 h-16 text-fuchsia-400 mx-auto mb-4 animate-bounce" />
                  <h3 className="text-2xl font-bold text-white mb-2">¡Lista VIP Solicitada!</h3>
                  <p className="text-zinc-400">Te contactaremos en menos de 2h.</p>
                </div>
              ) : (
                <>
                  <div className="mb-8">
                    <span className="font-mono text-xs text-fuchsia-400 uppercase tracking-widest">{selectedEvent.day} {selectedEvent.date}</span>
                    <h3 className="text-2xl font-bold text-white mt-2">{selectedEvent.name}</h3>
                    <p className="text-sm text-zinc-500 font-mono mt-1">{selectedEvent.genre} · {selectedEvent.time}</p>
                  </div>
                  <form onSubmit={handleVipSubmit} className="space-y-4">
                    <input type="text" value={vipForm.name} onChange={e => setVipForm({...vipForm, name: e.target.value})} required placeholder="Tu nombre" className="w-full bg-white/5 border border-white/10 p-4 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-fuchsia-500/50" />
                    <input type="email" value={vipForm.email} onChange={e => setVipForm({...vipForm, email: e.target.value})} required placeholder="Email" className="w-full bg-white/5 border border-white/10 p-4 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-fuchsia-500/50" />
                    <select value={vipForm.guests} onChange={e => setVipForm({...vipForm, guests: e.target.value})} className="w-full bg-[#0a0a1a] border border-white/10 p-4 text-sm text-zinc-300 focus:outline-none focus:border-fuchsia-500/50">
                      {['1 persona','2 personas','3 personas','4 personas','Grupo (5+)'].map(o => <option key={o} className="bg-[#0a0a1a]">{o}</option>)}
                    </select>
                    <button type="submit" className="w-full bg-fuchsia-600 text-white py-4 text-sm font-bold uppercase tracking-widest hover:bg-fuchsia-700 transition-colors flex items-center justify-center gap-2">
                      <Sparkles className="w-4 h-4" /> Solicitar Lista VIP
                    </button>
                    <p className="text-[10px] text-zinc-600 text-center font-mono">Precio: {selectedEvent.price}</p>
                  </form>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="py-8 px-6 bg-black border-t border-white/5 relative z-10">
        <div className="max-w-[90rem] mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-zinc-600 font-mono uppercase tracking-widest">
          <span>© {new Date().getFullYear()} Naked & Famous Club — Underground Since 1998</span>
          <div className="flex gap-6">
            <a href="#" className="hover:text-fuchsia-400 transition-colors">Aviso Legal</a>
            <a href="#" className="hover:text-fuchsia-400 transition-colors">Accesibilidad</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
