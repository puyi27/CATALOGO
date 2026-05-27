'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import DemoLayout from '@/components/DemoLayout'
import { Menu, X, Music, Users, Ticket, Instagram, Twitter, Youtube, ChevronDown, Plus, Minus, Check, Send, MapPin, Phone, Clock } from 'lucide-react'

// ─────────────────────────────────────────────
//  DATA
// ─────────────────────────────────────────────
const EVENTS = [
  { date: "SAB 14 JUN", name: "CHARLOTTE DE WITTE", genre: "TECHNO", price: "€25", vip: "€80", capacity: "Aforo: 800", sold: 78 },
  { date: "SAB 21 JUN", name: "ADAM BEYER", genre: "DRUM CODE", price: "€28", vip: "€95", capacity: "Aforo: 800", sold: 100 },
  { date: "SAB 05 JUL", name: "PEGGY GOU", genre: "HOUSE / DISCO", price: "€22", vip: "€75", capacity: "Aforo: 800", sold: 45 },
  { date: "SAB 12 JUL", name: "JAMIE XX", genre: "INDIE DANCE", price: "€20", vip: "€65", capacity: "Aforo: 800", sold: 60 },
  { date: "VIE 25 JUL", name: "RICHIE HAWTIN", genre: "MINIMAL", price: "€30", vip: "€100", capacity: "Aforo: 800", sold: 92 },
]

const GALLERY_COLORS = [
  "from-fuchsia-900/80 to-violet-950",
  "from-cyan-900/80 to-blue-950",
  "from-fuchsia-800/60 to-black",
  "from-violet-900/80 to-fuchsia-950",
  "from-cyan-950 to-indigo-950",
  "from-pink-900/80 to-violet-900",
]

const COCKTAILS = [
  { name: "VOID", desc: "Vodka negro · Triple sec · Blue curaçao · Lima", price: "€14" },
  { name: "STROBE", desc: "Gin · Elderflower · Tónica neon · Hielo seco", price: "€13" },
  { name: "ACID TRIP", desc: "Mezcal · Maracuyá · Jalapeño · Espuma de lima", price: "€15" },
  { name: "BASSLINE", desc: "Ron añejo · Café express · Cardamomo · Coco", price: "€12" },
  { name: "HYPER", desc: "Bourbon · Miel de trufa · Angostura · Naranja", price: "€16" },
  { name: "DOM PÉRIGNON", desc: "Botella. Servicio VIP incluido. Mesa exclusiva.", price: "€280" },
]

const SPACES = [
  { name: "MAIN FLOOR", cap: "600 personas", sys: "D&B Audiotechnik · 80.000W", color: "bg-fuchsia-500" },
  { name: "THE TUNNEL", cap: "150 personas", sys: "Funktion One · 20.000W", color: "bg-cyan-500" },
  { name: "TERRACE ROOF", cap: "50 personas", sys: "Mackie · Vista 360°", color: "bg-violet-500" },
]

// ─────────────────────────────────────────────
//  TICKER
// ─────────────────────────────────────────────
function Ticker({ text, color }) {
  return (
    <div className="overflow-hidden whitespace-nowrap border-y-2 border-white/10 py-3">
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        className="inline-flex gap-16 text-xs uppercase tracking-[0.3em] font-mono"
        style={{ color }}
      >
        {[...Array(8)].map((_, i) => <span key={i}>{text}</span>)}
      </motion.div>
    </div>
  )
}

// ─────────────────────────────────────────────
//  TICKET MODAL
// ─────────────────────────────────────────────
function TicketModal({ event, onClose }) {
  const [step, setStep] = useState(1)
  const [qty, setQty] = useState(1)
  const [type, setType] = useState('GA')
  const [done, setDone] = useState(false)

  const price = type === 'VIP' ? parseInt(event.vip.replace('€','')) : parseInt(event.price.replace('€',''))

  function handleConfirm() {
    if (step < 3) { setStep(s => s + 1); return }
    setDone(true)
    setTimeout(() => { onClose(); setStep(1); setDone(false) }, 2200)
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl"
      onClick={(e) => e.target === e.currentTarget && onClose()}>
      <motion.div initial={{ scale: 0.85, y: 40 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.85, y: 40 }}
        className="bg-[#0a0a0a] border-2 border-white/20 w-full max-w-md p-8 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors">
          <X size={20} />
        </button>

        {done ? (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center py-8 flex flex-col items-center gap-4">
            <div className="w-16 h-16 rounded-full border-2 border-[#00FFFF] flex items-center justify-center">
              <Check size={28} className="text-[#00FFFF]" />
            </div>
            <h3 className="text-2xl font-black uppercase tracking-tighter">¡Confirmado!</h3>
            <p className="text-white/50 text-sm">Recibirás tus entradas por email en instantes.</p>
          </motion.div>
        ) : (
          <>
            <p className="text-[#FF00FF] text-xs uppercase tracking-[0.3em] font-mono mb-2">{event.date}</p>
            <h3 className="text-3xl font-black uppercase tracking-tighter mb-6">{event.name}</h3>

            {/* Steps indicator */}
            <div className="flex gap-2 mb-8">
              {[1,2,3].map(s => (
                <div key={s} className={`h-0.5 flex-1 transition-all duration-500 ${step >= s ? 'bg-[#FF00FF]' : 'bg-white/10'}`} />
              ))}
            </div>

            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div key="s1" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }} className="space-y-6">
                  <div className="flex gap-3">
                    {['GA', 'VIP'].map(t => (
                      <button key={t} onClick={() => setType(t)}
                        className={`flex-1 py-4 text-sm font-black uppercase tracking-widest border-2 transition-all ${type === t ? 'border-[#FF00FF] text-[#FF00FF] bg-[#FF00FF]/10' : 'border-white/20 text-white/40'}`}>
                        {t} {t === 'GA' ? event.price : event.vip}
                      </button>
                    ))}
                  </div>
                  <div className="flex items-center justify-between bg-white/5 border border-white/10 p-4">
                    <button onClick={() => setQty(q => Math.max(1, q - 1))} className="p-2 hover:text-[#FF00FF] transition-colors"><Minus size={18} /></button>
                    <span className="text-4xl font-black">{qty}</span>
                    <button onClick={() => setQty(q => Math.min(8, q + 1))} className="p-2 hover:text-[#FF00FF] transition-colors"><Plus size={18} /></button>
                  </div>
                  <p className="text-center text-white/40 text-xs font-mono">TOTAL: <span className="text-white text-lg font-bold">€{qty * price}</span></p>
                </motion.div>
              )}
              {step === 2 && (
                <motion.div key="s2" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }} className="space-y-4">
                  <input type="text" required placeholder="Nombre completo" className="w-full bg-white/5 border border-white/10 p-4 text-sm outline-none focus:border-[#FF00FF] transition-colors" />
                  <input type="email" required placeholder="tu@email.com" className="w-full bg-white/5 border border-white/10 p-4 text-sm outline-none focus:border-[#FF00FF] transition-colors" />
                </motion.div>
              )}
              {step === 3 && (
                <motion.div key="s3" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }}
                  className="bg-white/5 border border-white/10 p-6 text-center space-y-3">
                  <p className="text-white/40 text-xs uppercase tracking-widest font-mono">Resumen</p>
                  <p className="text-xl font-black">{qty} × {type === 'VIP' ? 'VIP BOOTH' : 'ENTRADA GENERAL'}</p>
                  <p className="text-4xl font-black text-[#FF00FF]">€{qty * price}</p>
                  <p className="text-white/40 text-xs font-mono">{event.name} · {event.date}</p>
                </motion.div>
              )}
            </AnimatePresence>

            <button onClick={handleConfirm}
              className="w-full mt-6 py-4 bg-[#FF00FF] text-black font-black text-sm uppercase tracking-widest hover:bg-white transition-colors">
              {step < 3 ? 'Continuar' : 'Pagar Ahora'}
            </button>
          </>
        )}
      </motion.div>
    </motion.div>
  )
}

// ─────────────────────────────────────────────
//  MAIN PAGE
// ─────────────────────────────────────────────
export default function NightlifeDemo() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [showBar, setShowBar] = useState(false)
  const [guestName, setGuestName] = useState('')
  const [guestSent, setGuestSent] = useState(false)
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] })
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.15])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  useEffect(() => {
    if (menuOpen) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <DemoLayout title="VOID Club Sevilla" year="2026">
      <div className="bg-black text-white font-sans overflow-x-hidden selection:bg-[#FF00FF] selection:text-black">

        {/* NAV */}
        <nav className="fixed top-0 w-full z-50 flex justify-between items-center px-4 md:px-8 h-14 border-b border-white/10 bg-black/80 backdrop-blur-sm">
          <span className="text-xs uppercase tracking-[0.4em] font-mono text-white/50">VOID · SVQ</span>
          <span className="text-xl font-black tracking-tighter" style={{ letterSpacing: '-0.05em' }}>VOID</span>
          <div className="hidden md:flex items-center gap-8 text-xs uppercase tracking-[0.2em] text-white/50">
            {["Lineup", "Espacios", "Bar", "Guestlist"].map(item => (
              <button key={item} onClick={() => item === 'Bar' && setShowBar(true)}
                className="hover:text-[#FF00FF] transition-colors">{item}</button>
            ))}
          </div>
          <button onClick={() => setMenuOpen(true)} className="md:hidden">
            <Menu size={20} />
          </button>
        </nav>

        {/* MOBILE MENU */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-[200] bg-black flex flex-col">
              <div className="flex justify-between items-center p-6 border-b border-white/10">
                <span className="text-xl font-black">VOID</span>
                <button onClick={() => setMenuOpen(false)}><X size={22} /></button>
              </div>
              <div className="flex-1 flex flex-col justify-center px-8 gap-10">
                {["Lineup", "Espacios", "Bar", "Guestlist", "Contacto"].map((item, i) => (
                  <motion.button key={item} initial={{ x: -30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: i * 0.07 }}
                    onClick={() => { setMenuOpen(false); if (item === 'Bar') setShowBar(true) }}
                    className="text-left text-4xl font-black uppercase tracking-tighter hover:text-[#FF00FF] transition-colors">
                    {item}
                  </motion.button>
                ))}
              </div>
              <div className="p-8 flex gap-6">
                <Instagram size={20} className="text-white/30" />
                <Twitter size={20} className="text-white/30" />
                <Youtube size={20} className="text-white/30" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* TICKET MODAL */}
        <AnimatePresence>
          {selectedEvent && <TicketModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />}
        </AnimatePresence>

        {/* HERO */}
        <section ref={heroRef} className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
          {/* Animated BG */}
          <motion.div style={{ scale: heroScale }} className="absolute inset-0">
            <div className="absolute inset-0 bg-black" />
            <motion.div
              animate={{ opacity: [0.15, 0.35, 0.15], scale: [1, 1.2, 1] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full blur-[150px] bg-[#FF00FF]/30"
            />
            <motion.div
              animate={{ opacity: [0.1, 0.25, 0.1], scale: [1.2, 1, 1.2] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full blur-[150px] bg-[#00FFFF]/20"
            />
          </motion.div>

          <motion.div style={{ opacity: heroOpacity }} className="relative z-10 text-center px-4">
            <motion.p
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
              className="text-[#00FFFF] text-xs uppercase tracking-[0.6em] font-mono mb-8">
              Sevilla · Open Thursday–Sunday · 00:00–07:00
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-[20vw] md:text-[18vw] font-black uppercase leading-none tracking-tighter"
              style={{ textShadow: "0 0 80px rgba(255,0,255,0.4), 0 0 160px rgba(0,255,255,0.2)" }}>
              VOID
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
              className="text-white/30 text-sm uppercase tracking-[0.4em] font-mono mt-4">
              Club · Techno · House · Experience
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
              <button onClick={() => setSelectedEvent(EVENTS[0])}
                className="px-8 py-4 bg-[#FF00FF] text-black font-black text-sm uppercase tracking-widest hover:bg-white transition-colors">
                Comprar Entradas
              </button>
              <button className="px-8 py-4 border border-[#00FFFF]/40 text-[#00FFFF] font-black text-sm uppercase tracking-widest hover:border-[#00FFFF] hover:bg-[#00FFFF]/10 transition-all">
                Ver Lineup
              </button>
            </motion.div>
          </motion.div>

          <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2 }}
            className="absolute bottom-8 flex flex-col items-center gap-2 text-white/20">
            <ChevronDown size={18} />
          </motion.div>
        </section>

        {/* TICKER */}
        <Ticker text="TECHNO · HOUSE · MINIMAL · DRUM & BASS · AMBIENT · EXPERIMENTAL ·" color="#FF00FF" />

        {/* LINEUP */}
        <section className="py-20 md:py-28 bg-[#050505]">
          <div className="max-w-6xl mx-auto px-4 md:px-8">
            <div className="flex justify-between items-end mb-12">
              <div>
                <p className="text-[#FF00FF] text-xs uppercase tracking-[0.4em] font-mono mb-3">Próximos Eventos</p>
                <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none">LINEUP</h2>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-white/30 uppercase tracking-widest">
                <span className="w-2 h-2 bg-[#00FFFF] rounded-full animate-pulse" />
                2026
              </div>
            </div>

            <div className="divide-y divide-white/5">
              {EVENTS.map((event, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                  className="group flex flex-col md:flex-row md:items-center gap-4 md:gap-0 py-8 md:py-10 cursor-pointer"
                  onClick={() => setSelectedEvent(event)}>
                  <span className="text-[#FF00FF] font-mono text-sm w-36 shrink-0">{event.date}</span>
                  <div className="flex-1">
                    <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tighter group-hover:text-[#FF00FF] transition-colors duration-300">
                      {event.name}
                    </h3>
                    <p className="text-white/30 text-xs uppercase tracking-widest font-mono mt-1">{event.genre}</p>
                  </div>
                  {/* Sold out bar */}
                  <div className="flex items-center gap-4 md:w-48">
                    <div className="flex-1 h-0.5 bg-white/10 relative">
                      <motion.div className="absolute inset-y-0 left-0 bg-[#FF00FF]"
                        initial={{ width: 0 }} whileInView={{ width: `${event.sold}%` }} viewport={{ once: true }}
                        transition={{ duration: 1.2, delay: i * 0.1 }} />
                    </div>
                    <span className="text-xs font-mono text-white/30 shrink-0">{event.sold}%</span>
                  </div>
                  <div className="md:ml-8 shrink-0">
                    <span className="px-4 py-2 border border-[#FF00FF]/30 text-[#FF00FF] text-xs font-black uppercase tracking-widest group-hover:bg-[#FF00FF] group-hover:text-black transition-all">
                      {event.sold >= 100 ? 'AGOTADO' : event.price}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* SPACES */}
        <section className="py-20 md:py-28 bg-black border-y border-white/5">
          <div className="max-w-6xl mx-auto px-4 md:px-8">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16">
              <p className="text-[#00FFFF] text-xs uppercase tracking-[0.4em] font-mono mb-3">El Club</p>
              <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none">ESPACIOS</h2>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {SPACES.map((s, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }}
                  whileHover={{ scale: 1.02 }}
                  className="bg-[#080808] border border-white/5 p-8 flex flex-col justify-between h-64 group">
                  <div className={`w-3 h-3 rounded-full ${s.color} group-hover:animate-ping`} />
                  <div>
                    <h3 className="text-2xl font-black uppercase tracking-tighter mb-2">{s.name}</h3>
                    <p className="text-white/30 text-xs font-mono mb-1">{s.cap}</p>
                    <p className="text-white/20 text-xs font-mono">{s.sys}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* GALLERY — colored gradient blocks */}
        <section className="py-20 md:py-28 bg-[#050505]">
          <div className="max-w-6xl mx-auto px-4 md:px-8">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
              <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none text-[#FF00FF]">
                ATMOSPHERE
              </h2>
            </motion.div>
            <div className="columns-2 md:columns-3 gap-3 space-y-3">
              {GALLERY_COLORS.map((grad, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}
                  whileHover={{ scale: 1.02 }}
                  className={`break-inside-avoid bg-gradient-to-br ${grad} border border-white/5 relative overflow-hidden cursor-pointer`}
                  style={{ height: i % 2 === 0 ? '220px' : '160px' }}>
                  {/* Animated noise overlay */}
                  <motion.div
                    animate={{ opacity: [0.05, 0.15, 0.05] }}
                    transition={{ duration: 2 + i * 0.3, repeat: Infinity }}
                    className="absolute inset-0 bg-[#FF00FF] mix-blend-overlay" />
                  <div className="absolute bottom-3 left-3">
                    <span className="text-white/30 text-xs font-mono uppercase tracking-widest">0{i + 1}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* BAR */}
        <section className="py-20 md:py-28 bg-black border-t border-white/5">
          <div className="max-w-6xl mx-auto px-4 md:px-8">
            <div className="flex justify-between items-end mb-12">
              <div>
                <p className="text-[#00FFFF] text-xs uppercase tracking-[0.4em] font-mono mb-3">Selección</p>
                <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none">BAR</h2>
              </div>
              <button onClick={() => setShowBar(!showBar)}
                className="text-xs font-mono uppercase tracking-widest text-white/40 hover:text-[#00FFFF] transition-colors">
                {showBar ? 'Ocultar' : 'Ver carta'}
              </button>
            </div>

            <AnimatePresence>
              {showBar && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {COCKTAILS.map((c, i) => (
                    <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.06 }}
                      className="flex justify-between items-start p-5 bg-white/3 border border-white/5 hover:border-[#00FFFF]/30 transition-colors group">
                      <div>
                        <h3 className="font-black text-sm uppercase tracking-widest mb-1 group-hover:text-[#00FFFF] transition-colors">{c.name}</h3>
                        <p className="text-white/30 text-xs font-mono">{c.desc}</p>
                      </div>
                      <span className="text-[#FF00FF] font-black text-sm ml-6 shrink-0">{c.price}</span>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* TICKER 2 */}
        <Ticker text="VOID CLUB · SEVILLA · ABIERTO JUE–DOM · DRESSECODE OBLIGATORIO · ESTRICTAMENTE MAYORES DE 18 ·" color="#00FFFF" />

        {/* GUESTLIST */}
        <section className="py-20 md:py-28 bg-[#050505]">
          <div className="max-w-4xl mx-auto px-4 md:px-8">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
              <p className="text-[#FF00FF] text-xs uppercase tracking-[0.4em] font-mono mb-4">Acceso Prioritario</p>
              <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-6">
                GUEST<br />LIST
              </h2>
              <p className="text-white/30 text-sm font-mono max-w-md mx-auto">
                Apúntate a la guestlist para acceso prioritario y descuento del 30% en la primera consumición.
              </p>
            </motion.div>

            {guestSent ? (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                className="text-center py-16 flex flex-col items-center gap-4">
                <div className="w-16 h-16 border-2 border-[#00FFFF] flex items-center justify-center">
                  <Check size={28} className="text-[#00FFFF]" />
                </div>
                <p className="font-black text-xl uppercase tracking-widest">¡En la lista!</p>
                <p className="text-white/30 text-sm">Te confirmaremos antes de 48h.</p>
              </motion.div>
            ) : (
              <motion.form initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                onSubmit={(e) => { e.preventDefault(); setGuestSent(true) }}
                className="flex flex-col md:flex-row gap-3">
                <input type="text" required value={guestName} onChange={e => setGuestName(e.target.value)}
                  placeholder="Tu nombre completo"
                  className="flex-1 bg-white/5 border border-white/10 px-5 py-4 text-sm outline-none focus:border-[#FF00FF] transition-colors" />
                <input type="email" required placeholder="tu@email.com"
                  className="flex-1 bg-white/5 border border-white/10 px-5 py-4 text-sm outline-none focus:border-[#FF00FF] transition-colors" />
                <button type="submit"
                  className="bg-[#FF00FF] text-black px-8 py-4 font-black text-sm uppercase tracking-widest hover:bg-white transition-colors flex items-center gap-2 whitespace-nowrap">
                  <Send size={14} /> Apuntarse
                </button>
              </motion.form>
            )}
          </div>
        </section>

        {/* INFO */}
        <section className="py-20 bg-black border-t border-white/5">
          <div className="max-w-6xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: MapPin, title: "Ubicación", lines: ["Calle Feria 42, Planta -1", "41003 Sevilla, España"] },
              { icon: Clock, title: "Horario", lines: ["Jue–Vie: 00:00–06:30", "Sáb–Dom: 00:00–07:00"] },
              { icon: Phone, title: "Reservas VIP", lines: ["+34 955 021 988", "reservas@voidclub.es"] },
            ].map(({ icon: Icon, title, lines }, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="flex gap-4">
                <div className="w-10 h-10 border border-[#FF00FF]/30 flex items-center justify-center shrink-0">
                  <Icon size={16} className="text-[#FF00FF]" />
                </div>
                <div>
                  <p className="font-black text-sm uppercase tracking-widest mb-2">{title}</p>
                  {lines.map((l, j) => <p key={j} className="text-white/40 text-sm font-mono">{l}</p>)}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* FOOTER */}
        <footer className="py-10 bg-black border-t border-white/5">
          <div className="max-w-6xl mx-auto px-4 md:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
            <span className="text-3xl font-black tracking-tighter" style={{ textShadow: "0 0 20px rgba(255,0,255,0.5)" }}>VOID</span>
            <p className="text-white/20 text-xs font-mono uppercase tracking-widest">© 2026 VOID Club Sevilla · Prohibida la reventa · +18</p>
            <div className="flex gap-5">
              <Instagram size={18} className="text-white/30 hover:text-[#FF00FF] transition-colors cursor-pointer" />
              <Twitter size={18} className="text-white/30 hover:text-[#00FFFF] transition-colors cursor-pointer" />
              <Youtube size={18} className="text-white/30 hover:text-[#FF00FF] transition-colors cursor-pointer" />
            </div>
          </div>
        </footer>

      </div>
    </DemoLayout>
  )
}
