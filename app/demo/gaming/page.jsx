'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import Link from 'next/link';
import {
  Gamepad2, Trophy, Users, ShoppingBag, ChevronRight,
  Zap, Star, ArrowUpRight, X, Check
} from 'lucide-react';

/* ─── DATA ──────────────────────────────────────────────────── */
const ROSTER = [
  { name: 'PHANTOM_X',   role: 'IGL / Entry Fragger',    country: '🇪🇸 ES', rank: 'S-Tier', kd: '3.2', games: ['Valorant', 'CS2'],         img: 'https://loremflickr.com/400/500/esports,gamer/all?lock=1' },
  { name: 'STORM_77',    role: 'AWPer / Sniper',          country: '🇩🇪 DE', rank: 'S-Tier', kd: '4.1', games: ['CS2'],                     img: 'https://loremflickr.com/400/500/esports,gamer/all?lock=2' },
  { name: 'NOVA_ECLIPSE',role: 'Support / Controller',    country: '🇫🇷 FR', rank: 'A-Tier', kd: '2.8', games: ['Valorant', 'R6'],          img: 'https://loremflickr.com/400/500/esports,gamer/all?lock=3' },
  { name: 'BLAZE_RUN',   role: 'Rifler / Lurker',         country: '🇧🇷 BR', rank: 'S-Tier', kd: '3.7', games: ['CS2', 'Apex'],             img: 'https://loremflickr.com/400/500/esports,gamer/all?lock=4' },
  { name: 'ZERO_DAY',    role: 'Flex / Duelist',          country: '🇯🇵 JP', rank: 'S-Tier', kd: '3.5', games: ['Valorant'],                img: 'https://loremflickr.com/400/500/esports,gamer/all?lock=5' },
];

const TOURNAMENTS = [
  { name: 'ESL Pro League Season 20',  prize: '€500,000',   date: 'Jul 15–30, 2025', status: 'CLASIFICADO',  color: '#00f0ff' },
  { name: 'BLAST Premier Spring Final',prize: '€250,000',   date: 'Aug 5–10, 2025',  status: 'EN PROGRESO',  color: '#ff003c' },
  { name: 'IEM Cologne 2025',          prize: '€1,000,000', date: 'Sep 3–14, 2025',  status: 'PRÓXIMO',      color: '#ffe600' },
];

const MERCH = [
  { name: 'Jersey Oficial', price: '€89',  img: 'https://loremflickr.com/600/700/jersey,esports/all?lock=6',   tag: 'BEST SELLER' },
  { name: 'Hoodie Team',    price: '€120', img: 'https://loremflickr.com/600/700/hoodie,gaming/all?lock=7',    tag: 'LIMITED' },
  { name: 'Cap Snapback',   price: '€45',  img: 'https://loremflickr.com/600/700/cap,gaming/all?lock=8',       tag: 'NEW' },
];

const STATS = [
  { label: 'Torneos Ganados', value: 127,     suffix: '' },
  { label: 'Prize Pool',      value: 2.4,     suffix: 'M€', decimal: true },
  { label: 'Jugadores Activos',value: 12,     suffix: '' },
  { label: 'Seguidores',      value: 4,       suffix: 'M' },
];

const SPONSORS = ['REDBULL', 'RAZER', 'NVIDIA', 'SAMSUNG', 'ALIENWARE', 'REDBULL', 'RAZER', 'NVIDIA', 'SAMSUNG', 'ALIENWARE'];

/* ─── ANIMATED COUNTER ──────────────────────────────────────── */
function Counter({ target, suffix, decimal }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    const steps = 60;
    let i = 0;
    const inc = target / steps;
    const timer = setInterval(() => {
      i++;
      setCount(parseFloat((inc * i).toFixed(decimal ? 1 : 0)));
      if (i >= steps) { setCount(target); clearInterval(timer); }
    }, 25);
    return () => clearInterval(timer);
  }, [inView, target, decimal]);

  return <span ref={ref}>{decimal ? count.toFixed(1) : count}{suffix}</span>;
}

/* ─── MAIN PAGE ─────────────────────────────────────────────── */
export default function NexusGGPage() {
  const [cart, setCart] = useState([]);
  const [addedIdx, setAddedIdx] = useState(null);
  const [formState, setFormState] = useState({ name: '', game: '', rank: '', submitted: false });
  const [formError, setFormError] = useState('');
  const [hoveredPlayer, setHoveredPlayer] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  // ---- PERFORMANCE: use refs+RAF instead of useState for mousemove ----
  const gridRef = useRef(null);
  const rafRef = useRef(null);
  const mousePosRef = useRef({ x: 0, y: 0 });

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springX = useSpring(cursorX, { stiffness: 500, damping: 40 });
  const springY = useSpring(cursorY, { stiffness: 500, damping: 40 });

  const { scrollYProgress } = useScroll();
  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  useEffect(() => {
    const move = (e) => {
      cursorX.set(e.clientX - 12);
      cursorY.set(e.clientY - 12);
      mousePosRef.current = { x: e.clientX, y: e.clientY };
      // Move grid via direct DOM manipulation — zero React re-renders
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        if (gridRef.current) {
          const gx = (e.clientX / window.innerWidth - 0.5) * 30;
          const gy = (e.clientY / window.innerHeight - 0.5) * 30;
          gridRef.current.style.transform = `translate(${gx}px, ${gy}px)`;
        }
      });
    };
    window.addEventListener('mousemove', move, { passive: true });
    return () => {
      window.removeEventListener('mousemove', move);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);


  const handleAddToCart = (idx) => {
    setCart((c) => [...c, idx]);
    setAddedIdx(idx);
    setTimeout(() => setAddedIdx(null), 1200);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formState.name || !formState.game || !formState.rank) { setFormError('Completa todos los campos.'); return; }
    setFormError('');
    setFormState((s) => ({ ...s, submitted: true }));
  };

  /* glitch effect via CSS keyframes — no setInterval, no re-renders */
  const glitchCSS = `
    @keyframes nexus-glitch {
      0%,100% { text-shadow: 4px 4px 0px #00f0ff, -4px -4px 0px #ff003c; transform: translateX(0); }
      20%     { text-shadow: -4px 4px 0px #ff003c, 4px -4px 0px #00f0ff; transform: translateX(2px); }
      40%     { text-shadow: 4px -4px 0px #00f0ff, -4px 4px 0px #ff003c; transform: translateX(-2px); }
      60%,80% { text-shadow: none; transform: translateX(0); }
    }
    @keyframes nexus-glitch2 {
      0%,100% { text-shadow: -4px 4px 0px #ff003c, 4px -4px 0px #00f0ff; transform: translateX(0); }
      20%     { text-shadow: 4px 4px 0px #00f0ff, -4px -4px 0px #ff003c; transform: translateX(-2px); }
      40%     { text-shadow: none; transform: translateX(2px); }
      60%,80% { text-shadow: none; transform: translateX(0); }
    }
    .nexus-glitch-1 { animation: nexus-glitch 1.8s steps(1) infinite; }
    .nexus-glitch-2 { animation: nexus-glitch2 1.8s steps(1) 0.3s infinite; }
  `;

  return (
    <div
      style={{
        background: '#09090b',
        color: '#e8e8e8',
        fontFamily: "'JetBrains Mono', 'Courier New', monospace",
        overflowX: 'hidden',
        cursor: 'none',
        minHeight: '100vh',
      }}
    >
      {/* Glitch CSS keyframes */}
      <style dangerouslySetInnerHTML={{ __html: glitchCSS }} />
      {/* ── PROGRESS BAR ─────────────────────────────────── */}
      <motion.div
        style={{
          position: 'fixed', top: 0, left: 0, height: 3,
          background: 'linear-gradient(90deg, #ff003c, #00f0ff)',
          width: progressWidth, zIndex: 9999,
          boxShadow: '0 0 12px #ff003c',
        }}
      />

      {/* ── CUSTOM CURSOR ────────────────────────────────── */}
      <motion.div
        style={{
          position: 'fixed', top: 0, left: 0,
          width: 24, height: 24,
          borderRadius: '50%',
          background: '#fff',
          mixBlendMode: 'difference',
          zIndex: 99999,
          pointerEvents: 'none',
          x: springX, y: springY,
        }}
      />

      {/* ── NAV ──────────────────────────────────────────── */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 40px', height: 64,
        background: 'rgba(9,9,11,0.85)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(0,240,255,0.15)',
      }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Gamepad2 size={26} color="#ff003c" />
          <span style={{ fontSize: 20, fontWeight: 800, letterSpacing: 2, color: '#fff' }}>
            NEXUS<span style={{ color: '#ff003c' }}>GG</span>
          </span>
        </div>

        {/* Desktop Links */}
        <div style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
          <Link href="/" style={{ color: '#aaa', textDecoration: 'none', fontSize: 13, letterSpacing: 1, display: 'flex', alignItems: 'center', gap: 6 }}>
            ← Catálogo
          </Link>
          {['Roster', 'Torneos', 'Merch'].map((l) => (
            <a key={l} href={`#${l.toLowerCase()}`}
              style={{ color: '#aaa', textDecoration: 'none', fontSize: 13, letterSpacing: 1 }}>
              {l}
            </a>
          ))}
        </div>

        {/* Skewed CTA */}
        <motion.a
          href="#join"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          style={{
            display: 'inline-block',
            background: '#ff003c',
            color: '#fff',
            fontSize: 12,
            fontWeight: 800,
            letterSpacing: 2,
            padding: '10px 24px',
            transform: 'skewX(-10deg)',
            textDecoration: 'none',
            boxShadow: '0 0 20px rgba(255,0,60,0.4)',
          }}
        >
          <span style={{ display: 'inline-block', transform: 'skewX(10deg)' }}>JOIN THE TEAM</span>
        </motion.a>
      </nav>

      {/* ── HERO ─────────────────────────────────────────── */}
      <section
        style={{
          position: 'relative',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          paddingTop: 64,
        }}
      >
        {/* Cyberpunk Grid Background — moved via ref, no state */}
        <div
          ref={gridRef}
          style={{
            position: 'absolute', inset: 0,
            backgroundImage: `
              linear-gradient(rgba(0,240,255,0.07) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,240,255,0.07) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
            transition: 'transform 0.12s linear',
            willChange: 'transform',
          }}
        />
        {/* Radial Glow */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(255,0,60,0.12) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        {/* Corner Decorations */}
        <div style={{ position: 'absolute', top: 80, left: 40, width: 80, height: 80, borderTop: '2px solid #00f0ff', borderLeft: '2px solid #00f0ff', opacity: 0.5 }} />
        <div style={{ position: 'absolute', bottom: 80, right: 40, width: 80, height: 80, borderBottom: '2px solid #ff003c', borderRight: '2px solid #ff003c', opacity: 0.5 }} />

        {/* Hero Content */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          style={{ textAlign: 'center', zIndex: 1, padding: '0 20px' }}
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            style={{ color: '#00f0ff', fontSize: 13, letterSpacing: 6, marginBottom: 24, fontWeight: 700 }}
          >
            // ELITE E-SPORTS ORGANIZATION //
          </motion.p>

          <h1
            className="nexus-glitch-1"
            style={{
              fontSize: 'clamp(56px, 12vw, 140px)',
              fontWeight: 900,
              letterSpacing: -2,
              lineHeight: 0.9,
              color: '#fff',
              marginBottom: 12,
              userSelect: 'none',
            }}
          >
            NEXUS
          </h1>
          <h1
            className="nexus-glitch-2"
            style={{
              fontSize: 'clamp(56px, 12vw, 140px)',
              fontWeight: 900,
              letterSpacing: -2,
              lineHeight: 0.9,
              color: '#ff003c',
              marginBottom: 40,
              userSelect: 'none',
            }}
          >
            GG
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            style={{ color: '#888', fontSize: 16, maxWidth: 480, margin: '0 auto 48px', lineHeight: 1.7, letterSpacing: 0.5 }}
          >
            Competimos en el más alto nivel. Dominamos cada meta.
            Somos la nueva generación del e-sport europeo.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}
          >
            <motion.a
              href="#roster"
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(0,240,255,0.4)' }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                border: '1px solid #00f0ff', color: '#00f0ff',
                padding: '14px 32px', fontSize: 13, letterSpacing: 2,
                fontWeight: 700, textDecoration: 'none',
                background: 'rgba(0,240,255,0.05)',
              }}
            >
              VER ROSTER <ChevronRight size={16} />
            </motion.a>
            <motion.a
              href="#torneos"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: 'transparent', color: '#666',
                padding: '14px 32px', fontSize: 13, letterSpacing: 2,
                fontWeight: 700, textDecoration: 'none',
                border: '1px solid #333',
              }}
            >
              TORNEOS <Trophy size={16} />
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          style={{
            position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
            color: '#444', fontSize: 11, letterSpacing: 3,
          }}
        >
          <span>SCROLL</span>
          <div style={{ width: 1, height: 40, background: 'linear-gradient(to bottom, #00f0ff, transparent)' }} />
        </motion.div>
      </section>

      {/* ── STATS BAR ────────────────────────────────────── */}
      <section style={{ background: '#0d0d10', borderTop: '1px solid #1a1a1f', borderBottom: '1px solid #1a1a1f' }}>
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
          maxWidth: 1200, margin: '0 auto',
        }}>
          {STATS.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              style={{
                padding: '40px 32px',
                borderRight: i < 3 ? '1px solid #1a1a1f' : 'none',
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 900, color: i % 2 === 0 ? '#fff' : '#ff003c', lineHeight: 1 }}>
                <Counter target={s.value} suffix={s.suffix} decimal={s.decimal} />
              </div>
              <div style={{ fontSize: 12, color: '#555', letterSpacing: 3, marginTop: 8, textTransform: 'uppercase' }}>{s.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── ROSTER ───────────────────────────────────────── */}
      <section id="roster" style={{ padding: '120px 40px', maxWidth: 1400, margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ marginBottom: 64 }}
        >
          <p style={{ color: '#ff003c', fontSize: 12, letterSpacing: 6, fontWeight: 700, marginBottom: 12 }}>// LINEUP ACTIVO</p>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap' }}>
            <h2 style={{ fontSize: 'clamp(36px, 5vw, 72px)', fontWeight: 900, letterSpacing: -2, margin: 0 }}>
              NUESTRO <span style={{ color: '#00f0ff' }}>ROSTER</span>
            </h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#555', fontSize: 13 }}>
              <Users size={16} />
              <span>5 JUGADORES ACTIVOS</span>
            </div>
          </div>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: 2,
        }}>
          {ROSTER.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              onHoverStart={() => setHoveredPlayer(i)}
              onHoverEnd={() => setHoveredPlayer(null)}
              style={{
                position: 'relative',
                overflow: 'hidden',
                aspectRatio: '4/5',
                cursor: 'none',
              }}
            >
              {/* Player Image */}
              <motion.img
                src={p.img}
                alt={p.name}
                animate={{ filter: hoveredPlayer === i ? 'grayscale(0%) brightness(0.7)' : 'grayscale(100%) brightness(0.5)' }}
                transition={{ duration: 0.4 }}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />

              {/* Always-visible name bar */}
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0,
                background: 'linear-gradient(to top, rgba(9,9,11,0.95) 0%, transparent 100%)',
                padding: '60px 20px 20px',
              }}>
                <p style={{ color: '#00f0ff', fontSize: 10, letterSpacing: 3, margin: '0 0 4px', fontWeight: 700 }}>{p.country} · {p.rank}</p>
                <h3 style={{ color: '#fff', fontSize: 20, fontWeight: 900, margin: 0, letterSpacing: 1 }}>{p.name}</h3>
                <p style={{ color: '#777', fontSize: 12, margin: '4px 0 0', letterSpacing: 1 }}>{p.role}</p>
              </div>

              {/* Hover Stats Overlay */}
              <AnimatePresence>
                {hoveredPlayer === i && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.25 }}
                    style={{
                      position: 'absolute', top: 0, left: 0, right: 0,
                      padding: '20px',
                      background: 'linear-gradient(to bottom, rgba(9,9,11,0.9) 0%, transparent 60%)',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div>
                        <p style={{ color: '#555', fontSize: 10, letterSpacing: 2, margin: '0 0 4px' }}>K/D RATIO</p>
                        <p style={{ color: '#ff003c', fontSize: 32, fontWeight: 900, margin: 0 }}>{p.kd}</p>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <p style={{ color: '#555', fontSize: 10, letterSpacing: 2, margin: '0 0 6px' }}>JUEGOS</p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'flex-end' }}>
                          {p.games.map((g) => (
                            <span key={g} style={{
                              background: 'rgba(0,240,255,0.1)',
                              border: '1px solid rgba(0,240,255,0.3)',
                              color: '#00f0ff',
                              fontSize: 10,
                              padding: '2px 8px',
                              letterSpacing: 1,
                            }}>{g}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Red corner accent */}
              <div style={{
                position: 'absolute', top: 0, left: 0,
                width: 3, height: hoveredPlayer === i ? '100%' : '30%',
                background: '#ff003c',
                transition: 'height 0.4s ease',
                boxShadow: '2px 0 12px rgba(255,0,60,0.5)',
              }} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── TOURNAMENTS ──────────────────────────────────── */}
      <section id="torneos" style={{ padding: '120px 40px', background: '#0a0a0d' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ marginBottom: 64 }}
          >
            <p style={{ color: '#00f0ff', fontSize: 12, letterSpacing: 6, fontWeight: 700, marginBottom: 12 }}>// TEMPORADA 2025</p>
            <h2 style={{ fontSize: 'clamp(36px, 5vw, 72px)', fontWeight: 900, letterSpacing: -2, margin: 0 }}>
              <span style={{ color: '#ff003c' }}>TORNEOS</span> ACTIVOS
            </h2>
          </motion.div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {TOURNAMENTS.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                whileHover={{ x: 8, background: 'rgba(255,255,255,0.03)' }}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr auto auto auto',
                  alignItems: 'center',
                  gap: 32,
                  padding: '28px 32px',
                  border: '1px solid #1a1a1f',
                  cursor: 'none',
                  transition: 'background 0.3s',
                }}
              >
                {/* Name + status dot */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <motion.div
                    animate={{ opacity: [1, 0.3, 1], scale: [1, 1.3, 1] }}
                    transition={{ repeat: Infinity, duration: 1.8 }}
                    style={{ width: 10, height: 10, borderRadius: '50%', background: t.color, flexShrink: 0, boxShadow: `0 0 10px ${t.color}` }}
                  />
                  <div>
                    <p style={{ color: '#fff', fontWeight: 800, fontSize: 18, margin: '0 0 4px', letterSpacing: 0.5 }}>{t.name}</p>
                    <p style={{ color: '#555', fontSize: 12, margin: 0, letterSpacing: 2 }}>{t.date}</p>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ color: '#555', fontSize: 10, letterSpacing: 2, margin: '0 0 4px' }}>PRIZE POOL</p>
                  <p style={{ color: '#fff', fontSize: 20, fontWeight: 900, margin: 0 }}>{t.prize}</p>
                </div>
                <div style={{
                  padding: '6px 14px',
                  border: `1px solid ${t.color}`,
                  color: t.color,
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: 2,
                  whiteSpace: 'nowrap',
                }}>
                  {t.status}
                </div>
                <ArrowUpRight size={20} color="#333" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MERCH ────────────────────────────────────────── */}
      <section id="merch" style={{ padding: '120px 40px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ marginBottom: 64, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 24 }}
          >
            <div>
              <p style={{ color: '#ff003c', fontSize: 12, letterSpacing: 6, fontWeight: 700, marginBottom: 12 }}>// TIENDA OFICIAL</p>
              <h2 style={{ fontSize: 'clamp(36px, 5vw, 72px)', fontWeight: 900, letterSpacing: -2, margin: 0 }}>
                NEXUS <span style={{ color: '#00f0ff' }}>MERCH</span>
              </h2>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#555', fontSize: 13 }}>
              <ShoppingBag size={16} />
              <span>{cart.length} en carrito</span>
            </div>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
            {MERCH.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                style={{ border: '1px solid #1a1a1f', overflow: 'hidden', background: '#0d0d10' }}
              >
                <div style={{ position: 'relative', overflow: 'hidden', aspectRatio: '6/7' }}>
                  <motion.img
                    src={m.img}
                    alt={m.name}
                    whileHover={{ scale: 1.06 }}
                    transition={{ duration: 0.5 }}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', filter: 'grayscale(20%)' }}
                  />
                  <div style={{
                    position: 'absolute', top: 16, left: 16,
                    background: '#ff003c',
                    color: '#fff', fontSize: 10, fontWeight: 800, letterSpacing: 2,
                    padding: '4px 10px',
                    transform: 'skewX(-8deg)',
                  }}>
                    {m.tag}
                  </div>
                </div>
                <div style={{ padding: '24px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                    <h3 style={{ color: '#fff', fontWeight: 800, fontSize: 18, margin: 0 }}>{m.name}</h3>
                    <span style={{ color: '#ff003c', fontSize: 22, fontWeight: 900 }}>{m.price}</span>
                  </div>
                  <motion.button
                    onClick={() => handleAddToCart(i)}
                    whileTap={{ scale: 0.96 }}
                    animate={addedIdx === i ? { background: '#00a854', borderColor: '#00a854' } : { background: 'transparent', borderColor: '#333' }}
                    style={{
                      width: '100%', padding: '14px',
                      border: '1px solid #333',
                      color: addedIdx === i ? '#fff' : '#aaa',
                      fontSize: 12, fontWeight: 700, letterSpacing: 2,
                      cursor: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                      transition: 'color 0.3s',
                    }}
                  >
                    {addedIdx === i ? (
                      <><Check size={14} /> AÑADIDO</>
                    ) : (
                      <><ShoppingBag size={14} /> AÑADIR AL CARRITO</>
                    )}
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SPONSORS MARQUEE ─────────────────────────────── */}
      <section style={{
        padding: '40px 0',
        background: '#0a0a0d',
        borderTop: '1px solid #1a1a1f',
        borderBottom: '1px solid #1a1a1f',
        overflow: 'hidden',
      }}>
        <motion.div
          animate={{ x: [0, -1200] }}
          transition={{ repeat: Infinity, duration: 16, ease: 'linear' }}
          style={{ display: 'flex', gap: 80, whiteSpace: 'nowrap', width: 'max-content' }}
        >
          {SPONSORS.map((s, i) => (
            <span key={i} style={{
              fontSize: 13, fontWeight: 800, letterSpacing: 6,
              color: i % 2 === 0 ? '#2a2a2f' : '#333',
              userSelect: 'none',
            }}>
              {s}
            </span>
          ))}
        </motion.div>
      </section>

      {/* ── JOIN / APPLICATION FORM ───────────────────────── */}
      <section id="join" style={{ padding: '140px 40px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ textAlign: 'center', marginBottom: 64 }}
          >
            <p style={{ color: '#00f0ff', fontSize: 12, letterSpacing: 6, fontWeight: 700, marginBottom: 12 }}>// CONVOCATORIA ABIERTA</p>
            <h2 style={{ fontSize: 'clamp(36px, 5vw, 72px)', fontWeight: 900, letterSpacing: -2, margin: '0 0 20px' }}>
              ÚNETE A LA<br /><span style={{ color: '#ff003c' }}>ORGANIZACIÓN</span>
            </h2>
            <p style={{ color: '#555', fontSize: 15, lineHeight: 1.8, maxWidth: 500, margin: '0 auto' }}>
              Buscamos talento de élite. Si crees que tienes lo necesario para competir al más alto nivel, aplica ahora.
            </p>
          </motion.div>

          <AnimatePresence mode="wait">
            {formState.submitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                style={{
                  textAlign: 'center', padding: '60px 40px',
                  border: '1px solid rgba(0,240,255,0.3)',
                  background: 'rgba(0,240,255,0.03)',
                }}
              >
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: 2, duration: 0.4 }}
                  style={{ marginBottom: 24 }}
                >
                  <Check size={48} color="#00f0ff" />
                </motion.div>
                <h3 style={{ fontSize: 28, fontWeight: 900, color: '#fff', marginBottom: 12 }}>SOLICITUD RECIBIDA</h3>
                <p style={{ color: '#555', fontSize: 14, lineHeight: 1.8 }}>
                  Nuestro equipo de scouting revisará tu perfil en los próximos 7 días.<br />
                  Permanece atento a tu correo electrónico.
                </p>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '80px' }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  style={{ height: 2, background: '#00f0ff', margin: '32px auto 0' }}
                />
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleFormSubmit}
                style={{ display: 'flex', flexDirection: 'column', gap: 16 }}
              >
                {[
                  { label: 'NOMBRE / ALIAS',      field: 'name',  type: 'text',   placeholder: 'Tu nickname en el juego' },
                  { label: 'JUEGO PRINCIPAL',      field: 'game',  type: 'text',   placeholder: 'Valorant, CS2, Apex...' },
                  { label: 'RANGO / TIER ACTUAL',  field: 'rank',  type: 'text',   placeholder: 'Radiant, Global Elite, Predator...' },
                ].map(({ label, field, type, placeholder }) => (
                  <div key={field}>
                    <label style={{ display: 'block', color: '#555', fontSize: 11, letterSpacing: 3, marginBottom: 8 }}>
                      {label}
                    </label>
                    <input
                      type={type}
                      placeholder={placeholder}
                      value={formState[field]}
                      onChange={(e) => setFormState((s) => ({ ...s, [field]: e.target.value }))}
                      style={{
                        width: '100%', padding: '16px 20px',
                        background: '#0d0d10',
                        border: '1px solid #222',
                        color: '#fff',
                        fontSize: 14,
                        fontFamily: 'inherit',
                        outline: 'none',
                        boxSizing: 'border-box',
                        transition: 'border-color 0.2s',
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#00f0ff'}
                      onBlur={(e) => e.target.style.borderColor = '#222'}
                    />
                  </div>
                ))}

                {formError && (
                  <p style={{ color: '#ff003c', fontSize: 13, margin: 0 }}>{formError}</p>
                )}

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02, boxShadow: '0 0 40px rgba(255,0,60,0.3)' }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    marginTop: 16,
                    padding: '18px 48px',
                    background: '#ff003c',
                    color: '#fff',
                    border: 'none',
                    fontSize: 13, fontWeight: 800, letterSpacing: 3,
                    cursor: 'none',
                    fontFamily: 'inherit',
                    transform: 'skewX(-6deg)',
                  }}
                >
                  <span style={{ display: 'inline-block', transform: 'skewX(6deg)' }}>
                    ENVIAR SOLICITUD <Zap size={14} style={{ display: 'inline', verticalAlign: 'middle' }} />
                  </span>
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────── */}
      <footer style={{
        background: '#050507',
        borderTop: '1px solid #111',
        padding: '60px 40px 40px',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 48, marginBottom: 60,
          }}>
            {/* Brand */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
                <Gamepad2 size={22} color="#ff003c" />
                <span style={{ fontSize: 18, fontWeight: 800, color: '#fff', letterSpacing: 2 }}>
                  NEXUS<span style={{ color: '#ff003c' }}>GG</span>
                </span>
              </div>
              <p style={{ color: '#444', fontSize: 13, lineHeight: 1.8, maxWidth: 240 }}>
                Elite e-sports organization. Dominating the competitive scene since 2019.
              </p>
            </div>
            {/* Links */}
            {[
              { title: 'ORGANIZACIÓN', links: ['Sobre Nosotros', 'Nuestro Equipo', 'Historia', 'Patrocinadores'] },
              { title: 'COMPETICIÓN',  links: ['Torneos', 'Resultados', 'Rankings', 'VODs'] },
              { title: 'COMUNIDAD',    links: ['Discord', 'Twitter / X', 'Twitch', 'YouTube'] },
            ].map((col) => (
              <div key={col.title}>
                <p style={{ color: '#ff003c', fontSize: 10, letterSpacing: 4, fontWeight: 700, marginBottom: 20 }}>{col.title}</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {col.links.map((l) => (
                    <a key={l} href="#" style={{ color: '#444', fontSize: 13, textDecoration: 'none', letterSpacing: 0.5 }}
                      onMouseEnter={(e) => e.target.style.color = '#fff'}
                      onMouseLeave={(e) => e.target.style.color = '#444'}
                    >
                      {l}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Bar */}
          <div style={{
            borderTop: '1px solid #111',
            paddingTop: 32,
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            flexWrap: 'wrap', gap: 16,
          }}>
            <p style={{ color: '#333', fontSize: 12, margin: 0 }}>
              © 2025 NEXUS GG. Todos los derechos reservados.
            </p>
            <div style={{ display: 'flex', gap: 24 }}>
              {['Privacidad', 'Términos', 'Cookies'].map((l) => (
                <a key={l} href="#" style={{ color: '#333', fontSize: 12, textDecoration: 'none', letterSpacing: 1 }}>{l}</a>
              ))}
            </div>
            <Link href="/" style={{
              display: 'flex', alignItems: 'center', gap: 6,
              color: '#444', fontSize: 12, textDecoration: 'none', letterSpacing: 1,
            }}>
              ← Volver al Catálogo
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
