'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion'
import { Star, MessageCircle, ArrowUpRight, Mail, Zap } from 'lucide-react'
import Link from 'next/link'

/* ─────────────────────────── DATA ─────────────────────────── */
const PROJECTS = [
  { name: 'TERRANOVA Rebrand',         cat: 'Identidad Visual',         color: '#FF4444', img: 'https://loremflickr.com/600/700/branding,design?lock=1',   h: 'tall'   },
  { name: 'MODA NUO Website',          cat: 'Web · Motion',             color: '#00C2CB', img: 'https://loremflickr.com/600/500/fashion,website?lock=2',    h: 'normal' },
  { name: 'CERVEZA NÓRDICA Campaign',  cat: 'Publicidad · Social',      color: '#FFE500', img: 'https://loremflickr.com/600/600/beer,advertising?lock=3',   h: 'normal' },
  { name: 'FINTECH IBERIA App',        cat: 'UX · Product',             color: '#FF4444', img: 'https://loremflickr.com/600/500/fintech,app?lock=4',        h: 'normal' },
  { name: 'CLOUD BURGER Brand',        cat: 'Branding · Packaging',     color: '#00C2CB', img: 'https://loremflickr.com/600/700/burger,packaging?lock=5',   h: 'tall'   },
  { name: 'FESTIVAL BRUTAL Identity',  cat: 'Evento · Tipografía',      color: '#FFE500', img: 'https://loremflickr.com/600/500/festival,poster?lock=6',   h: 'normal' },
]

const SERVICES = [
  { num: '01', title: 'Branding & Identidad', price: '2.500€ – 12.000€', desc: 'Logos, paletas, tipografías, brand books y todo lo que necesitas para existir con fuerza en el mundo.' },
  { num: '02', title: 'Diseño Web',           price: '3.000€ – 18.000€', desc: 'Sitios que venden, sorprenden y convierten. UX/UI, prototipado, diseño responsivo y motion integrado.' },
  { num: '03', title: 'Motion & Video',        price: '1.200€ – 8.000€',  desc: 'Animaciones de marca, spots digitales, reels y todo el movimiento que tu marca necesita para brillar.' },
  { num: '04', title: 'Social Media',          price: '800€ – 3.500€/mes', desc: 'Sistema visual para redes. Templates, directrices de contenido, kits de activos. Consistencia real.' },
  { num: '05', title: 'Packaging',             price: '1.800€ – 9.000€',  desc: 'Desde la etiqueta hasta la caja. Diseño que enamora en el lineal y deja huella en el unboxing.' },
]

const PROCESS = [
  { step: '01', title: 'Escuchar',  emoji: '👂', color: '#FF4444', desc: 'Nos obsesionamos con tu marca. Entendemos tu mundo antes de dibujar ni una línea.' },
  { step: '02', title: 'Explorar',  emoji: '🔭', color: '#00C2CB', desc: '20+ conceptos. Sin filtros. El caos creativo controlado produce las mejores ideas.' },
  { step: '03', title: 'Crear',     emoji: '⚡', color: '#FFE500', desc: 'Producimos rápido. Iteramos más rápido. Tu feedback es nuestro combustible.' },
  { step: '04', title: 'Lanzar',    emoji: '🚀', color: '#FF4444', desc: 'Entrega perfecta, archivos maestros, guía de marca y soporte post-lanzamiento.' },
]

const TESTIMONIALS = [
  { author: 'CEO Terranova',        role: 'Terranova Group',  quote: 'Transformaron nuestra marca en 3 semanas. No es un estudio, es un misil creativo.', stars: 5 },
  { author: 'Marketing, Moda Nuo',  role: 'Moda Nuo S.L.',   quote: 'Nuestras ventas subieron un 40% tras el rediseño. Puro impacto visual, pura estrategia.', stars: 5 },
  { author: 'Dir. Festi Brutal',    role: 'Festival Brutal',  quote: 'Son los únicos que captaron la energía del festival. Alucinante. Repito sin duda.', stars: 5 },
]

const STATS = [
  { num: '180+', label: 'Proyectos' },
  { num: '6',    label: 'Años' },
  { num: '98%',  label: 'Clientes Felices' },
  { num: '12',   label: 'Premios' },
]

/* ─────────────────────── CONFETTI PARTICLE ─────────────────── */
const COLORS_CONF = ['#FF4444', '#00C2CB', '#FFE500', '#FF8C00', '#FF69B4', '#7B2FFF']
function ConfettiParticle({ x, y, color, rotation }) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ left: '50%', top: '60%', width: 10, height: 10, borderRadius: Math.random() > 0.5 ? '50%' : 2, background: color, zIndex: 999 }}
      initial={{ x: 0, y: 0, opacity: 1, rotate: 0, scale: 1 }}
      animate={{ x, y, opacity: 0, rotate: rotation, scale: 0.3 }}
      transition={{ duration: 1.2 + Math.random() * 0.6, ease: 'easeOut' }}
    />
  )
}

/* ─────────────────────── CUSTOM CURSOR ─────────────────────── */
function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 })
  const [hovered, setHovered] = useState(false)
  useEffect(() => {
    const move = (e) => setPos({ x: e.clientX, y: e.clientY })
    const over = (e) => { if (e.target.closest('a,button,[data-hover]')) setHovered(true) }
    const out  = () => setHovered(false)
    window.addEventListener('mousemove', move)
    window.addEventListener('mouseover', over)
    window.addEventListener('mouseout',  out)
    return () => { window.removeEventListener('mousemove', move); window.removeEventListener('mouseover', over); window.removeEventListener('mouseout', out) }
  }, [])
  return (
    <>
      <motion.div className="fixed top-0 left-0 z-[9999] rounded-full pointer-events-none mix-blend-difference"
        animate={{ x: pos.x - 6, y: pos.y - 6, scale: hovered ? 0.4 : 1 }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        style={{ width: 12, height: 12, background: '#fff' }}
      />
      <motion.div className="fixed top-0 left-0 z-[9998] rounded-full pointer-events-none mix-blend-difference border border-white"
        animate={{ x: pos.x - 22, y: pos.y - 22, scale: hovered ? 1.6 : 1 }}
        transition={{ type: 'spring', stiffness: 150, damping: 20 }}
        style={{ width: 44, height: 44 }}
      />
    </>
  )
}

/* ══════════════════════════ PAGE ══════════════════════════════ */
export default function PixelPopStudio() {
  const [confetti, setConfetti] = useState([])
  const [openService, setOpenService] = useState(null)
  const [formSent, setFormSent] = useState(false)
  const constraintsRef = useRef(null)
  const heroRef = useRef(null)

  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })

  /* ── Confetti burst ── */
  function fireConfetti() {
    const particles = Array.from({ length: 60 }, (_, i) => ({
      id: Date.now() + i,
      x: (Math.random() - 0.5) * 700,
      y: -(Math.random() * 500 + 150),
      color: COLORS_CONF[Math.floor(Math.random() * COLORS_CONF.length)],
      rotation: (Math.random() - 0.5) * 720,
    }))
    setConfetti(particles)
    setTimeout(() => setConfetti([]), 2500)
  }

  function handleFormSubmit(e) {
    e.preventDefault()
    setFormSent(true)
    setTimeout(() => setFormSent(false), 4000)
  }

  return (
    <div className="relative overflow-x-hidden" style={{ background: '#FFFBF0', fontFamily: "'Arial Black', 'Arial Bold', Arial, sans-serif", cursor: 'none' }}>
      <CustomCursor />

      {/* ── Progress bar ── */}
      <motion.div className="fixed top-0 left-0 right-0 h-1 z-[100] origin-left" style={{ scaleX, background: '#FF4444' }} />

      {/* ════════════ NAV ════════════ */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4"
        style={{ background: '#FFFBF0', borderBottom: '3px solid #000' }}>
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2 text-sm font-black tracking-tight hover:text-[#FF4444] transition-colors" style={{ fontFamily: 'Arial, sans-serif' }}>
            <span>←</span><span>Catálogo</span>
          </Link>
        </div>

        <motion.div className="text-center leading-none select-none" whileHover={{ scale: 1.05 }}>
          <div className="text-3xl font-black tracking-tighter" style={{ color: '#FF4444' }}>PIXEL</div>
          <div className="text-3xl font-black tracking-tighter" style={{ color: '#000', marginTop: -4 }}>POP!</div>
        </motion.div>

        <motion.button
          whileHover={{ y: -2, boxShadow: '10px 10px 0px #000' }}
          whileTap={{ y: 2, boxShadow: '4px 4px 0px #000' }}
          className="font-black text-sm px-6 py-3 uppercase tracking-widest"
          style={{ background: '#FF4444', color: '#fff', border: '3px solid #000', boxShadow: '8px 8px 0px #000' }}
        >
          Get a Quote
        </motion.button>
      </nav>

      {/* ════════════ HERO ════════════ */}
      <section ref={heroRef} className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-20 overflow-hidden"
        style={{ background: '#FFFBF0' }}>
        {/* Confetti layer */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {confetti.map(p => <ConfettiParticle key={p.id} {...p} />)}
        </div>

        {/* Giant background text */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.045 }}
            transition={{ duration: 1.5 }}
            className="text-center font-black leading-none"
            style={{ fontSize: 'clamp(40px, 9vw, 120px)', color: '#000', whiteSpace: 'nowrap' }}>
            100% DESIGN,<br />0% BO-RING
          </motion.div>
        </div>

        {/* Draggable stickers */}
        <div ref={constraintsRef} className="absolute inset-0">
          {/* Star sticker */}
          <motion.div drag dragConstraints={constraintsRef} dragElastic={0.2} whileDrag={{ scale: 1.15, zIndex: 50 }}
            className="absolute cursor-grab active:cursor-grabbing select-none"
            style={{ top: '18%', left: '8%', zIndex: 10 }}
            initial={{ rotate: -15, scale: 0 }}
            animate={{ rotate: -15, scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 14, delay: 0.8 }}>
            <div className="relative flex items-center justify-center" style={{ width: 90, height: 90 }}>
              <svg viewBox="0 0 100 100" width="90" height="90">
                <polygon points="50,5 61,35 95,35 68,57 79,91 50,70 21,91 32,57 5,35 39,35"
                  fill="#FFE500" stroke="#000" strokeWidth="4" />
              </svg>
              <span className="absolute text-xs font-black text-black" style={{ fontSize: 9 }}>DRAG!</span>
            </div>
          </motion.div>

          {/* Speech bubble WOW! */}
          <motion.div drag dragConstraints={constraintsRef} dragElastic={0.2} whileDrag={{ scale: 1.1, zIndex: 50 }}
            className="absolute cursor-grab active:cursor-grabbing select-none"
            style={{ top: '25%', right: '10%', zIndex: 10 }}
            initial={{ rotate: 12, scale: 0 }}
            animate={{ rotate: 12, scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 14, delay: 1.0 }}>
            <div className="relative px-5 py-3 font-black text-lg text-black"
              style={{ background: '#00C2CB', border: '3px solid #000', borderRadius: 12, boxShadow: '4px 4px 0 #000' }}>
              WOW!
              <div style={{ position: 'absolute', bottom: -14, left: 16, width: 0, height: 0,
                borderLeft: '10px solid transparent', borderRight: '10px solid transparent',
                borderTop: '14px solid #000' }} />
              <div style={{ position: 'absolute', bottom: -10, left: 19, width: 0, height: 0,
                borderLeft: '7px solid transparent', borderRight: '7px solid transparent',
                borderTop: '11px solid #00C2CB' }} />
            </div>
          </motion.div>

          {/* Circle EST.2018 */}
          <motion.div drag dragConstraints={constraintsRef} dragElastic={0.2} whileDrag={{ scale: 1.1, zIndex: 50 }}
            className="absolute cursor-grab active:cursor-grabbing select-none"
            style={{ bottom: '25%', left: '12%', zIndex: 10 }}
            initial={{ rotate: 20, scale: 0 }}
            animate={{ rotate: 20, scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 14, delay: 1.2 }}>
            <div className="flex items-center justify-center rounded-full font-black text-xs text-white"
              style={{ width: 80, height: 80, background: '#FF4444', border: '3px solid #000',
                boxShadow: '4px 4px 0 #000', flexDirection: 'column', lineHeight: 1.1 }}>
              <span style={{ fontSize: 8 }}>EST.</span>
              <span style={{ fontSize: 14 }}>2018</span>
            </div>
          </motion.div>

          {/* Zap sticker */}
          <motion.div drag dragConstraints={constraintsRef} dragElastic={0.2} whileDrag={{ scale: 1.1, zIndex: 50 }}
            className="absolute cursor-grab active:cursor-grabbing select-none"
            style={{ bottom: '30%', right: '14%', zIndex: 10 }}
            initial={{ rotate: -8, scale: 0 }}
            animate={{ rotate: -8, scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 14, delay: 1.4 }}>
            <div className="flex items-center justify-center font-black text-black px-4 py-2"
              style={{ background: '#FFE500', border: '3px solid #000', borderRadius: 8, boxShadow: '4px 4px 0 #000', gap: 6 }}>
              <Zap size={18} fill="#000" />
              <span style={{ fontSize: 13 }}>BOLD IDEAS</span>
            </div>
          </motion.div>
        </div>

        {/* Main headline */}
        <div className="relative z-20 text-center">
          <motion.h1
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 120, damping: 16, delay: 0.1 }}
            className="font-black leading-none tracking-tighter"
            style={{ fontSize: 'clamp(56px, 10vw, 140px)', color: '#000' }}>
            We make<br />
            brands go{' '}
            <motion.span
              style={{ color: '#FF4444', display: 'inline-block' }}
              animate={{ rotate: [0, -3, 3, -2, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}>
              POP.
            </motion.span>
          </motion.h1>

          <motion.p
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.35 }}
            className="mt-6 text-lg font-bold max-w-lg mx-auto"
            style={{ color: '#555', fontFamily: 'Arial, sans-serif', fontWeight: 400 }}>
            Estudio creativo de branding & experiencias digitales.<br />
            Hacemos que tu marca sea imposible de ignorar.
          </motion.p>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.55 }}
            className="flex flex-wrap items-center justify-center gap-4 mt-10">
            <motion.button
              onClick={fireConfetti}
              whileHover={{ y: -3, boxShadow: '10px 10px 0px #000' }}
              whileTap={{ y: 2, boxShadow: '3px 3px 0px #000' }}
              className="font-black text-base px-8 py-4 uppercase tracking-widest"
              style={{ background: '#FF4444', color: '#fff', border: '3px solid #000', boxShadow: '7px 7px 0px #000' }}>
              Dispara la magia ✨
            </motion.button>
            <motion.button
              whileHover={{ y: -3, boxShadow: '10px 10px 0px #000' }}
              whileTap={{ y: 2, boxShadow: '3px 3px 0px #000' }}
              className="font-black text-base px-8 py-4 uppercase tracking-widest"
              style={{ background: '#FFFBF0', color: '#000', border: '3px solid #000', boxShadow: '7px 7px 0px #000' }}>
              Ver trabajo →
            </motion.button>
          </motion.div>
        </div>

        {/* Scroll hint */}
        <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
          <span className="text-xs font-black tracking-widest uppercase" style={{ color: '#999' }}>Scroll</span>
          <div style={{ width: 2, height: 30, background: '#000' }} />
        </motion.div>
      </section>

      {/* ════════════ STATS ════════════ */}
      <section style={{ background: '#FF4444', borderTop: '4px solid #000', borderBottom: '4px solid #000' }}>
        <div className="max-w-6xl mx-auto px-8 py-16 grid grid-cols-2 md:grid-cols-4 gap-0">
          {STATS.map((s, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center py-8 px-4"
              style={{ borderRight: i < 3 ? '3px solid rgba(0,0,0,0.2)' : 'none' }}>
              <div className="font-black leading-none" style={{ fontSize: 'clamp(44px, 7vw, 80px)', color: '#FFE500' }}>
                {s.num}
              </div>
              <div className="font-black mt-2 uppercase tracking-widest text-sm" style={{ color: '#fff' }}>
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ════════════ PORTFOLIO ════════════ */}
      <section className="py-24 px-8 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="mb-14 flex items-end justify-between flex-wrap gap-4">
          <div>
            <div className="text-sm font-black tracking-widest uppercase mb-2" style={{ color: '#FF4444' }}>Nuestro Trabajo</div>
            <h2 className="font-black leading-none tracking-tighter" style={{ fontSize: 'clamp(40px, 6vw, 80px)' }}>
              Proyectos que<br />dejan huella.
            </h2>
          </div>
          <motion.button
            whileHover={{ y: -2, boxShadow: '8px 8px 0 #000' }}
            whileTap={{ y: 1, boxShadow: '3px 3px 0 #000' }}
            className="font-black uppercase tracking-widest text-sm px-6 py-3"
            style={{ border: '3px solid #000', boxShadow: '5px 5px 0 #000', background: '#FFFBF0' }}>
            Ver todos →
          </motion.button>
        </motion.div>

        {/* Masonry grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gridTemplateRows: 'auto', gap: 16 }}
          className="max-md:grid-cols-2">
          {PROJECTS.map((p, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="relative overflow-hidden group"
              style={{
                gridRow: p.h === 'tall' ? 'span 2' : 'span 1',
                border: '3px solid #000',
                boxShadow: '6px 6px 0 #000',
                minHeight: p.h === 'tall' ? 480 : 260,
              }}>
              <img src={p.img} alt={p.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                style={{ display: 'block', minHeight: p.h === 'tall' ? 480 : 260 }} />

              {/* Hover overlay */}
              <motion.div
                className="absolute inset-0 flex flex-col justify-end p-6"
                style={{ background: p.color, opacity: 0 }}
                whileHover={{ opacity: 0.96 }}
                transition={{ duration: 0.25 }}>
                <span className="text-xs font-black uppercase tracking-widest mb-2 opacity-70" style={{ color: '#000' }}>{p.cat}</span>
                <h3 className="font-black leading-tight" style={{ fontSize: 'clamp(20px, 2.5vw, 30px)', color: '#000' }}>{p.name}</h3>
                <div className="flex items-center gap-2 mt-4">
                  <ArrowUpRight size={20} />
                  <span className="font-black text-sm uppercase tracking-wider">Ver proyecto</span>
                </div>
              </motion.div>

              {/* Category badge always visible */}
              <div className="absolute top-4 left-4 px-3 py-1 font-black text-xs uppercase tracking-widest"
                style={{ background: p.color, border: '2px solid #000', boxShadow: '3px 3px 0 #000' }}>
                {p.cat}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ════════════ SERVICES ════════════ */}
      <section style={{ background: '#000' }} className="py-24 px-8">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-14">
            <div className="text-sm font-black tracking-widest uppercase mb-2" style={{ color: '#00C2CB' }}>Lo que hacemos</div>
            <h2 className="font-black leading-none tracking-tighter" style={{ fontSize: 'clamp(40px, 6vw, 80px)', color: '#FFFBF0' }}>
              Servicios.
            </h2>
          </motion.div>

          <div className="space-y-0">
            {SERVICES.map((s, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                onClick={() => setOpenService(openService === i ? null : i)}
                data-hover
                className="border-t border-gray-700 cursor-pointer group"
                style={{ borderBottom: i === SERVICES.length - 1 ? '1px solid #333' : undefined }}>
                <div className="flex items-center justify-between py-6 px-2">
                  <div className="flex items-center gap-6">
                    <span className="font-black text-2xl" style={{ color: '#FF4444', minWidth: 48 }}>{s.num}</span>
                    <span className="font-black text-xl md:text-3xl tracking-tight group-hover:text-[#FFE500] transition-colors" style={{ color: '#FFFBF0' }}>
                      {s.title}
                    </span>
                  </div>
                  <motion.div animate={{ rotate: openService === i ? 45 : 0 }} transition={{ duration: 0.2 }}>
                    <span className="font-black text-3xl" style={{ color: '#00C2CB' }}>+</span>
                  </motion.div>
                </div>

                <AnimatePresence>
                  {openService === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden">
                      <div className="px-2 pb-6 flex flex-wrap items-start gap-8">
                        <div className="flex-1 min-w-60">
                          <p style={{ color: '#aaa', fontFamily: 'Arial, sans-serif', fontWeight: 400, lineHeight: 1.7 }}>{s.desc}</p>
                        </div>
                        <div className="px-5 py-3 font-black"
                          style={{ background: '#FFE500', border: '3px solid #FFE500', color: '#000', whiteSpace: 'nowrap', fontSize: 18 }}>
                          {s.price}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════ PROCESS ════════════ */}
      <section className="py-24 px-8" style={{ background: '#FFFBF0' }}>
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16">
            <div className="text-sm font-black tracking-widest uppercase mb-2" style={{ color: '#00C2CB' }}>Cómo trabajamos</div>
            <h2 className="font-black leading-none tracking-tighter" style={{ fontSize: 'clamp(40px, 6vw, 80px)' }}>
              El proceso<br />
              <span style={{ color: '#FF4444' }}>POP.</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {PROCESS.map((p, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 50, rotate: i % 2 === 0 ? -2 : 2 }}
                whileInView={{ opacity: 1, y: 0, rotate: i % 2 === 0 ? -2 : 2 }}
                whileHover={{ y: -8, rotate: 0, zIndex: 10 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative p-7"
                style={{ background: p.color, border: '3px solid #000', boxShadow: '7px 7px 0 #000' }}>
                <div className="text-6xl mb-4">{p.emoji}</div>
                <div className="font-black text-4xl mb-1" style={{ color: 'rgba(0,0,0,0.15)' }}>{p.step}</div>
                <h3 className="font-black text-2xl mb-3" style={{ color: '#000' }}>{p.title}</h3>
                <p style={{ fontFamily: 'Arial, sans-serif', fontWeight: 400, color: '#000', opacity: 0.75, lineHeight: 1.6, fontSize: 14 }}>
                  {p.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════ TESTIMONIALS ════════════ */}
      <section style={{ background: '#00C2CB', borderTop: '4px solid #000', borderBottom: '4px solid #000' }} className="py-24 px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16">
            <div className="text-sm font-black tracking-widest uppercase mb-2" style={{ color: '#000', opacity: 0.6 }}>Lo dicen ellos</div>
            <h2 className="font-black leading-none tracking-tighter" style={{ fontSize: 'clamp(40px, 6vw, 80px)', color: '#000' }}>
              Clientes felices.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                whileHover={{ y: -6 }}
                className="relative p-7"
                style={{ background: '#FFFBF0', border: '3px solid #000', boxShadow: '7px 7px 0 #000', borderRadius: 4 }}>
                {/* Speech bubble tail */}
                <div style={{ position: 'absolute', bottom: -18, left: 28, width: 0, height: 0,
                  borderLeft: '12px solid transparent', borderRight: '12px solid transparent',
                  borderTop: '18px solid #000' }} />
                <div style={{ position: 'absolute', bottom: -13, left: 31, width: 0, height: 0,
                  borderLeft: '9px solid transparent', borderRight: '9px solid transparent',
                  borderTop: '14px solid #FFFBF0' }} />

                <MessageCircle size={28} fill="#FF4444" color="#FF4444" className="mb-4" />

                <div className="flex gap-1 mb-4">
                  {Array(t.stars).fill(0).map((_, j) => (
                    <Star key={j} size={14} fill="#FFE500" color="#000" />
                  ))}
                </div>

                <p className="font-bold mb-8" style={{ fontFamily: 'Arial, sans-serif', lineHeight: 1.7, color: '#000', fontSize: 16 }}>
                  "{t.quote}"
                </p>

                <div className="mt-6 pt-4" style={{ borderTop: '2px solid #000' }}>
                  <div className="font-black text-sm" style={{ color: '#000' }}>{t.author}</div>
                  <div className="text-xs mt-0.5" style={{ color: '#555', fontFamily: 'Arial, sans-serif' }}>{t.role}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════ MARQUEE ════════════ */}
      <div style={{ background: '#FFE500', borderTop: '4px solid #000', borderBottom: '4px solid #000', overflow: 'hidden', padding: '14px 0' }}>
        <motion.div
          animate={{ x: [0, -1200] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
          className="flex gap-10 whitespace-nowrap font-black text-xl uppercase tracking-widest"
          style={{ color: '#000' }}>
          {Array(4).fill('★ BRANDING ✦ WEB ✦ MOTION ✦ PACKAGING ✦ SOCIAL MEDIA ✦ IDENTIDAD VISUAL ✦ ART DIRECTION ✦').map((t, i) => (
            <span key={i} style={{ paddingRight: 40 }}>{t}</span>
          ))}
        </motion.div>
      </div>

      {/* ════════════ CTA / CONTACT ════════════ */}
      <section className="py-28 px-8" style={{ background: '#FFFBF0' }}>
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14">
            <div className="text-sm font-black tracking-widest uppercase mb-4" style={{ color: '#00C2CB' }}>Hablemos</div>
            <h2 className="font-black leading-none tracking-tighter" style={{ fontSize: 'clamp(48px, 8vw, 110px)' }}>
              Let's make<br />something<br />
              <span style={{ color: '#FF4444', fontStyle: 'italic' }}>«raro».</span>
            </h2>
            <p className="mt-6 text-base" style={{ fontFamily: 'Arial, sans-serif', color: '#666', maxWidth: 480, margin: '24px auto 0' }}>
              No mordemos. Sí hacemos preguntas raras. Cuéntanos tu proyecto y te respondemos en menos de 24 horas.
            </p>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            onSubmit={handleFormSubmit}
            className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input required
                style={{ border: '3px solid #000', background: '#fff', padding: '16px 20px', fontFamily: 'Arial Black, Arial, sans-serif', fontWeight: 700, fontSize: 15, width: '100%', outline: 'none', boxShadow: '5px 5px 0 #000' }}
                placeholder="Tu nombre (sin miedo)" />
              <input required type="email"
                style={{ border: '3px solid #000', background: '#fff', padding: '16px 20px', fontFamily: 'Arial Black, Arial, sans-serif', fontWeight: 700, fontSize: 15, width: '100%', outline: 'none', boxShadow: '5px 5px 0 #000' }}
                placeholder="Email donde respondemos rápido" />
            </div>
            <input
              style={{ border: '3px solid #000', background: '#fff', padding: '16px 20px', fontFamily: 'Arial Black, Arial, sans-serif', fontWeight: 700, fontSize: 15, width: '100%', outline: 'none', boxShadow: '5px 5px 0 #000' }}
              placeholder="Tu empresa / proyecto (o futura empresa)" />
            <textarea required rows={5}
              style={{ border: '3px solid #000', background: '#fff', padding: '16px 20px', fontFamily: 'Arial, sans-serif', fontWeight: 400, fontSize: 15, width: '100%', outline: 'none', resize: 'vertical', boxShadow: '5px 5px 0 #000' }}
              placeholder="Cuéntanos tu idea. Cuanto más loco suene, mejor." />

            <div className="flex items-center gap-4 flex-wrap">
              <motion.button type="submit"
                whileHover={{ y: -3, boxShadow: '11px 11px 0 #000' }}
                whileTap={{ y: 2, boxShadow: '4px 4px 0 #000' }}
                className="font-black text-base px-10 py-4 uppercase tracking-widest flex items-center gap-3"
                style={{ background: '#FF4444', color: '#fff', border: '3px solid #000', boxShadow: '8px 8px 0 #000' }}>
                <Mail size={20} />
                Lanzar el brief 🚀
              </motion.button>

              <AnimatePresence>
                {formSent && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="font-black text-sm px-5 py-4"
                    style={{ background: '#00C2CB', border: '3px solid #000', boxShadow: '5px 5px 0 #000', color: '#000' }}>
                    ¡Recibido! Te respondemos en &lt;24h ✓
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.form>

          {/* Direct contact */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-12 flex flex-wrap gap-6 items-center">
            <span style={{ fontFamily: 'Arial, sans-serif', color: '#888', fontSize: 13 }}>O directamente:</span>
            <a href="mailto:hola@pixelpopstudio.com"
              className="font-black text-sm hover:text-[#FF4444] transition-colors flex items-center gap-2"
              style={{ color: '#000' }}>
              <Mail size={16} /> hola@pixelpopstudio.com
            </a>
            <span style={{ color: '#ccc' }}>|</span>
            <span className="font-black text-sm" style={{ color: '#000' }}>📞 +34 911 234 567</span>
          </motion.div>
        </div>
      </section>

      {/* ════════════ FOOTER ════════════ */}
      <footer style={{ background: '#FFFBF0', borderTop: '4px solid #000' }}>
        <div className="max-w-7xl mx-auto px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-14">
            {/* Brand */}
            <div className="md:col-span-2">
              <div className="font-black leading-none tracking-tighter mb-4" style={{ fontSize: 60, color: '#000' }}>
                <span style={{ color: '#FF4444' }}>PIXEL</span><br />POP!
              </div>
              <p style={{ fontFamily: 'Arial, sans-serif', color: '#666', lineHeight: 1.7, maxWidth: 320 }}>
                Estudio creativo de branding & experiencias digitales. Madrid · Barcelona · Remoto.
              </p>
              <div className="flex gap-3 mt-6 flex-wrap">
                {[['📸', 'Instagram'], ['🐦', 'Twitter/X'], ['💼', 'LinkedIn'], ['▶️', 'YouTube'], ['🎨', 'Behance']].map(([icon, name]) => (
                  <motion.a key={name} href="#" title={name}
                    whileHover={{ y: -4, scale: 1.1 }}
                    className="text-xl p-2 font-black text-sm"
                    style={{ background: '#fff', border: '2px solid #000', boxShadow: '3px 3px 0 #000', display: 'flex', alignItems: 'center', gap: 6 }}>
                    {icon}
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Links */}
            <div>
              <h4 className="font-black uppercase tracking-widest text-xs mb-5" style={{ color: '#FF4444' }}>Estudio</h4>
              <ul className="space-y-3">
                {['Quiénes Somos', 'Servicios', 'Portfolio', 'Proceso', 'Blog'].map(l => (
                  <li key={l}>
                    <a href="#" className="font-bold hover:text-[#FF4444] transition-colors text-sm"
                      style={{ fontFamily: 'Arial, sans-serif', color: '#000' }}>{l}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-black uppercase tracking-widest text-xs mb-5" style={{ color: '#00C2CB' }}>Contacto</h4>
              <ul className="space-y-3">
                <li className="text-sm font-bold" style={{ fontFamily: 'Arial, sans-serif', color: '#000' }}>hola@pixelpopstudio.com</li>
                <li className="text-sm" style={{ fontFamily: 'Arial, sans-serif', color: '#666' }}>+34 911 234 567</li>
                <li className="text-sm" style={{ fontFamily: 'Arial, sans-serif', color: '#666' }}>Calle Gran Vía 42<br />28013 Madrid, España</li>
              </ul>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-6" style={{ borderTop: '3px solid #000' }}>
            <p className="text-xs font-bold" style={{ fontFamily: 'Arial, sans-serif', color: '#888' }}>
              © 2024 PIXELPOP STUDIO S.L. — Todos los derechos reservados.
            </p>
            <div className="flex gap-6">
              {['Aviso Legal', 'Privacidad', 'Cookies'].map(l => (
                <a key={l} href="#" className="text-xs font-bold hover:text-[#FF4444] transition-colors"
                  style={{ fontFamily: 'Arial, sans-serif', color: '#888' }}>{l}</a>
              ))}
            </div>
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
              className="font-black text-xs tracking-widest"
              style={{ color: '#FF4444' }}>
              ★ MADE WITH POP ★
            </motion.div>
          </div>
        </div>
      </footer>
    </div>
  )
}
