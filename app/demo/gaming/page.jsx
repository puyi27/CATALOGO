"use client";
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import Link from 'next/link';
import {
  Terminal, Crosshair, Cpu, Shield, Zap, RefreshCw, ChevronLeft,
  Menu, X, Star, Trophy, Users, ShoppingCart, Gamepad2, Twitch,
  Youtube, MessageSquare, ChevronDown, Check, ArrowRight
} from 'lucide-react';
import DemoLayout from '@/components/DemoLayout';

/* ── DATA ── */
const PRODUCTS = [
  {
    id: 1, name: 'NX-PRO Controller Elite', cat: 'Hardware',
    price: '€129.99', oldPrice: '€159.99', badge: 'BESTSELLER',
    gradient: 'from-violet-900 via-violet-800 to-purple-900',
    accent: '#00ff88',
    features: ['Haptic feedback 4D', 'Batería 40h', 'Switches Hall Effect'],
    rating: 4.9, reviews: 2847,
  },
  {
    id: 2, name: 'NEXUS Headset 7.1', cat: 'Audio',
    price: '€89.99', oldPrice: null, badge: 'NUEVO',
    gradient: 'from-cyan-950 via-slate-900 to-cyan-900',
    accent: '#00ffff',
    features: ['Sonido 7.1 Virtual', 'Mic cancelación ruido', 'RGB Sync'],
    rating: 4.7, reviews: 1203,
  },
  {
    id: 3, name: 'Reflex Mouse 16K DPI', cat: 'Periférico',
    price: '€69.99', oldPrice: '€84.99', badge: 'OFERTA',
    gradient: 'from-red-950 via-slate-900 to-red-900',
    accent: '#ff0066',
    features: ['16.000 DPI ajustable', 'Polling rate 1000Hz', '8 botones prog.'],
    rating: 4.8, reviews: 3541,
  },
  {
    id: 4, name: 'NEXUS Gaming Chair Pro', cat: 'Mobiliario',
    price: '€349.00', oldPrice: '€429.00', badge: 'TOP',
    gradient: 'from-slate-900 via-zinc-900 to-slate-800',
    accent: '#7c3aed',
    features: ['Lumbar 4D ajustable', 'Reclinable 165°', 'Reposabrazos 4D'],
    rating: 4.6, reviews: 892,
  },
];

const PLANS = [
  {
    name: 'FREE', price: '€0', period: '/mes',
    color: '#64748b',
    features: ['Acceso foros básico', '5 torneos/mes', 'Chat comunidad', 'Perfil público'],
    notIncluded: ['Torneos premium', 'Servidor privado', 'Soporte prioritario'],
  },
  {
    name: 'PRO', price: '€9.99', period: '/mes',
    color: '#00ff88',
    badge: 'MÁS POPULAR',
    features: ['Torneos ilimitados', 'Servidor privado 10p', 'Soporte 24/7', 'Insignias exclusivas', 'Estadísticas avanzadas'],
    notIncluded: ['Servidor clan 50p'],
  },
  {
    name: 'CLAN', price: '€24.99', period: '/mes',
    color: '#7c3aed',
    features: ['Todo de PRO', 'Servidor clan 50 jugadores', 'Panel admin clan', 'Torneos privados', 'Discord bot premium', 'Branding personalizado'],
    notIncluded: [],
  },
];

const TESTIMONIALS = [
  { name: 'AdrianXX', role: 'Streamer · 80K seguidores', quote: 'Llevo 3 años comprando aquí. La calidad del hardware es brutal y la comunidad NEXUS es lo mejor de la escena española.', rating: 5, game: 'Valorant' },
  { name: 'Laura_GG', role: 'Pro Player · Team Ibérica', quote: 'El controller elite cambió mi juego completamente. La latencia es cero y el grip es perfecto para maratones de torneo.', rating: 5, game: 'CS2' },
  { name: 'KarmaBot99', role: 'Community Manager', quote: 'La membresía PRO vale cada euro. Los torneos semanales son súper organizados y los premios reales.', rating: 5, game: 'League of Legends' },
];

const LEADERBOARD = [
  { rank: 1, name: 'V01D_ES', kd: '3.42', wins: 847, tier: 'RADIANT', color: '#ffd700' },
  { rank: 2, name: 'N3XUS_PRO', kd: '2.91', wins: 723, tier: 'IMMORTAL', color: '#e040fb' },
  { rank: 3, name: 'GL1TCH', kd: '2.67', wins: 698, tier: 'IMMORTAL', color: '#e040fb' },
  { rank: 4, name: 'SYNTAX_X', kd: '2.34', wins: 612, tier: 'DIAMOND', color: '#00b0ff' },
  { rank: 5, name: 'CRASH_GG', kd: '2.18', wins: 589, tier: 'DIAMOND', color: '#00b0ff' },
];

const FAQS = [
  { q: '¿Cuánto tarda en llegar mi pedido?', a: 'Envíos express 24h para península. Islas y Portugal 48-72h. Todos los pedidos incluyen tracking en tiempo real.' },
  { q: '¿Puedo devolver un producto?', a: '30 días de devolución sin preguntas. Si el hardware tiene defecto de fábrica, sustitución inmediata. Política 100% sin riesgos.' },
  { q: '¿Los torneos tienen premios reales?', a: 'Sí. Los torneos PRO tienen prize pool en metálico. El torneo mensual estrella reparte hasta €2.000 entre los top 3.' },
  { q: '¿Cómo funciona el servidor privado?', a: 'Con PRO obtienes un servidor dedicado de 10 slots. Con CLAN, hasta 50 slots con panel de administración propio.' },
  { q: '¿Puedo cancelar mi suscripción cuando quiera?', a: 'Absolutamente. Sin permanencias. Cancelas en 2 clics desde tu panel y el acceso continúa hasta fin de periodo pagado.' },
];

/* ── COUNTER ── */
function Counter({ target, suffix = '', duration = 2 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const steps = 60;
    const increment = target / steps;
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, (duration * 1000) / steps);
    return () => clearInterval(timer);
  }, [isInView, target, duration]);
  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

/* ── MAIN ── */
export default function GamingDemo() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [cartCount, setCartCount] = useState(0);
  const [addedId, setAddedId] = useState(null);

  useEffect(() => {
    const h = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', h);
    return () => window.removeEventListener('mousemove', h);
  }, []);

  const addToCart = (id) => {
    setCartCount(c => c + 1);
    setAddedId(id);
    setTimeout(() => setAddedId(null), 1500);
  };

  return (
    <DemoLayout title="Gaming & eSports" year="2026">
      {/* Global styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Inter:wght@300;400;500;600&display=swap');
        .gaming-font { font-family: 'Orbitron', monospace; }
        .neon-text { text-shadow: 0 0 20px currentColor, 0 0 40px currentColor; }
        .scanline { background: repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,136,0.03) 2px, rgba(0,255,136,0.03) 4px); }
        ::-webkit-scrollbar { width: 4px; background: #0a0a0a; }
        ::-webkit-scrollbar-thumb { background: #00ff88; border-radius: 2px; }
      `}</style>

      {/* Custom cursor */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference hidden md:block"
        animate={{ x: mousePos.x - 10, y: mousePos.y - 10 }}
        transition={{ type: 'spring', stiffness: 500, damping: 28 }}
      >
        <div className="w-5 h-5 border border-[#00ff88] rotate-45" />
      </motion.div>

      <div className="bg-[#0a0a0a] text-zinc-200 overflow-x-hidden scanline">

        {/* ══════ NAV ══════ */}
        <nav className="fixed top-0 w-full z-50 bg-[#0a0a0a]/90 backdrop-blur-md border-b border-[#00ff88]/20">
          <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
            <Link href="/" className="text-xs tracking-widest uppercase text-zinc-500 hover:text-[#00ff88] transition-colors flex items-center gap-1">
              <ChevronLeft className="w-3 h-3" /> Catálogo
            </Link>
            <div className="flex items-center gap-3 absolute left-1/2 -translate-x-1/2">
              <Gamepad2 className="w-5 h-5 text-[#00ff88]" />
              <span className="gaming-font font-black text-white text-lg tracking-widest">NEXUS<span className="text-[#00ff88]">.GG</span></span>
            </div>
            <div className="hidden md:flex items-center gap-8 text-xs tracking-widest uppercase">
              {['Tienda', 'Torneos', 'Comunidad', 'Ranking'].map(item => (
                <span key={item} className="hover:text-[#00ff88] transition-colors cursor-pointer">{item}</span>
              ))}
              <div className="relative">
                <ShoppingCart className="w-4 h-4 text-zinc-400 hover:text-[#00ff88] transition-colors cursor-pointer" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 w-4 h-4 bg-[#00ff88] text-black text-[10px] font-bold rounded-full flex items-center justify-center gaming-font">{cartCount}</span>
                )}
              </div>
            </div>
            <button className="md:hidden text-zinc-400" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed inset-0 z-40 bg-[#0a0a0a] flex flex-col items-center justify-center gap-10 md:hidden"
            >
              {['Tienda', 'Torneos', 'Comunidad', 'Ranking'].map((item, i) => (
                <motion.span
                  key={item}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                  onClick={() => setMenuOpen(false)}
                  className="gaming-font text-4xl font-black text-white uppercase hover:text-[#00ff88] transition-colors cursor-pointer"
                >
                  {item}
                </motion.span>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* ══════ 1. HERO ══════ */}
        <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
          {/* Grid bg */}
          <div className="absolute inset-0 opacity-10"
            style={{ backgroundImage: 'linear-gradient(#00ff88 1px, transparent 1px), linear-gradient(90deg, #00ff88 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
          {/* Glow orb */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#7c3aed]/20 rounded-full blur-[120px] pointer-events-none" />

          <div className="max-w-7xl mx-auto px-6 py-20 relative z-10">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <div className="flex items-center gap-3 mb-8">
                <span className="w-2 h-2 bg-[#00ff88] rounded-full animate-pulse" />
                <span className="gaming-font text-xs text-[#00ff88] tracking-widest">SISTEMA ACTIVO · TEMPORADA 12</span>
              </div>
              <h1 className="gaming-font font-black leading-none mb-6">
                <span className="block text-5xl md:text-8xl text-white">DOMINA</span>
                <span className="block text-5xl md:text-8xl text-[#00ff88] neon-text">EL META.</span>
              </h1>
              <p className="text-lg text-zinc-400 max-w-xl mb-10 leading-relaxed">
                Hardware profesional, comunidad competitiva y torneos con premios reales. 
                La plataforma gaming más grande de España.
              </p>
              <div className="flex flex-wrap gap-4">
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  className="gaming-font bg-[#00ff88] text-black px-8 py-4 text-xs tracking-widest font-bold uppercase flex items-center gap-2"
                >
                  Explorar Tienda <ArrowRight className="w-4 h-4" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  className="gaming-font border border-[#00ff88]/40 text-[#00ff88] px-8 py-4 text-xs tracking-widest uppercase"
                >
                  Ver Torneos
                </motion.button>
              </div>
            </motion.div>

            {/* Live match ticker */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-16 border border-[#00ff88]/20 bg-[#00ff88]/5 px-6 py-4 flex items-center gap-6 flex-wrap"
            >
              <span className="flex items-center gap-2 text-xs gaming-font text-[#00ff88]">
                <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" /> LIVE
              </span>
              <span className="text-xs text-zinc-400">TORNEO OPEN S12 — Semifinal: <span className="text-white font-bold">Team Ibérica vs NightWolves</span></span>
              <span className="text-xs text-zinc-500">· 1.247 espectadores</span>
              <span className="text-[#00ff88] text-xs gaming-font ml-auto">VER AHORA →</span>
            </motion.div>
          </div>
        </section>

        {/* ══════ 2. STATS ══════ */}
        <section className="py-16 border-y border-[#00ff88]/10 bg-[#0d0d0d]">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: 'Jugadores activos', value: 142000, suffix: '+', icon: Users },
              { label: 'Torneos celebrados', value: 3800, suffix: '+', icon: Trophy },
              { label: 'Productos en tienda', value: 1200, suffix: '+', icon: ShoppingCart },
              { label: 'Premio repartido', value: 280, suffix: 'K€', icon: Zap },
            ].map(({ label, value, suffix, icon: Icon }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <Icon className="w-5 h-5 text-[#00ff88] mx-auto mb-3" />
                <div className="gaming-font text-4xl font-black text-white mb-1">
                  <Counter target={value} suffix={suffix} />
                </div>
                <div className="text-xs text-zinc-500 uppercase tracking-widest">{label}</div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ══════ 3. TIENDA ══════ */}
        <section className="py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <span className="gaming-font text-xs text-[#00ff88] tracking-widest uppercase block mb-3">— Equipo Pro</span>
              <h2 className="gaming-font text-5xl md:text-6xl font-black text-white">TIENDA</h2>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {PRODUCTS.map((p, i) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -6 }}
                  className="group border border-zinc-800 hover:border-[#00ff88]/40 transition-colors bg-zinc-900/50 relative overflow-hidden"
                >
                  {/* Visual gradient placeholder */}
                  <div className={`h-48 bg-gradient-to-br ${p.gradient} relative overflow-hidden`}>
                    <div className="absolute inset-0 opacity-30"
                      style={{ backgroundImage: `radial-gradient(circle at 50% 50%, ${p.accent}, transparent 60%)` }} />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Gamepad2 className="w-16 h-16 opacity-20 text-white" style={{ color: p.accent }} />
                    </div>
                    {p.badge && (
                      <span className="absolute top-3 left-3 gaming-font text-[10px] font-black px-2 py-1"
                        style={{ background: p.accent, color: '#000' }}>
                        {p.badge}
                      </span>
                    )}
                  </div>
                  <div className="p-5">
                    <div className="text-[10px] text-zinc-500 uppercase tracking-widest mb-1">{p.cat}</div>
                    <h3 className="gaming-font text-sm font-bold text-white mb-2">{p.name}</h3>
                    <div className="flex items-center gap-1 mb-3">
                      {[...Array(5)].map((_, j) => <Star key={j} className="w-3 h-3 fill-[#00ff88] text-[#00ff88]" />)}
                      <span className="text-[10px] text-zinc-500 ml-1">({p.reviews})</span>
                    </div>
                    <ul className="space-y-1 mb-4">
                      {p.features.map(f => (
                        <li key={f} className="text-[11px] text-zinc-400 flex items-center gap-2">
                          <span className="w-1 h-1 bg-[#00ff88] rounded-full flex-shrink-0" />{f}
                        </li>
                      ))}
                    </ul>
                    <div className="flex items-end justify-between">
                      <div>
                        <span className="gaming-font text-xl font-black text-white">{p.price}</span>
                        {p.oldPrice && <span className="text-xs text-zinc-600 line-through ml-2">{p.oldPrice}</span>}
                      </div>
                      <motion.button
                        whileTap={{ scale: 0.92 }}
                        onClick={() => addToCart(p.id)}
                        className="gaming-font text-[10px] px-3 py-2 font-bold uppercase transition-all"
                        style={{
                          background: addedId === p.id ? '#00ff88' : 'transparent',
                          border: `1px solid ${p.accent}`,
                          color: addedId === p.id ? '#000' : p.accent,
                        }}
                      >
                        {addedId === p.id ? '✓ OK' : 'Añadir'}
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════ 4. RANKING ══════ */}
        <section className="py-24 px-6 bg-[#0d0d0d] border-y border-zinc-800/50">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12 flex items-end justify-between"
            >
              <div>
                <span className="gaming-font text-xs text-[#00ff88] tracking-widest block mb-3">— Temporada 12</span>
                <h2 className="gaming-font text-5xl font-black text-white flex items-center gap-4">
                  <Trophy className="w-10 h-10 text-[#ffd700]" /> RANKING
                </h2>
              </div>
              <span className="gaming-font text-xs text-zinc-500 uppercase tracking-widest">Global Leaderboard</span>
            </motion.div>

            <div className="border border-zinc-800 overflow-hidden">
              <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-zinc-900 text-[10px] gaming-font text-zinc-500 uppercase tracking-widest">
                <div className="col-span-1">#</div>
                <div className="col-span-4">Jugador</div>
                <div className="col-span-3">Tier</div>
                <div className="col-span-2 text-right">K/D</div>
                <div className="col-span-2 text-right">Victorias</div>
              </div>
              {LEADERBOARD.map((player, i) => (
                <motion.div
                  key={player.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="grid grid-cols-12 gap-4 px-6 py-4 border-t border-zinc-800/50 items-center hover:bg-zinc-900/50 transition-colors"
                >
                  <div className="col-span-1 gaming-font font-black text-2xl"
                    style={{ color: i === 0 ? '#ffd700' : i === 1 ? '#c0c0c0' : i === 2 ? '#cd7f32' : '#64748b' }}>
                    {player.rank}
                  </div>
                  <div className="col-span-4 gaming-font font-bold text-white text-sm">{player.name}</div>
                  <div className="col-span-3">
                    <span className="gaming-font text-[10px] px-2 py-1 font-bold"
                      style={{ background: player.color + '20', border: `1px solid ${player.color}50`, color: player.color }}>
                      {player.tier}
                    </span>
                  </div>
                  <div className="col-span-2 text-right gaming-font font-bold text-[#00ff88] text-sm">{player.kd}</div>
                  <div className="col-span-2 text-right gaming-font text-white font-bold text-sm">{player.wins}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════ 5. PLANES ══════ */}
        <section className="py-24 px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <span className="gaming-font text-xs text-[#00ff88] tracking-widest block mb-3">— Membresía</span>
              <h2 className="gaming-font text-5xl font-black text-white">ÚNETE AL CLAN</h2>
              <p className="text-zinc-400 mt-4 max-w-xl mx-auto">Elige tu nivel y accede a torneos exclusivos, servidores privados y la comunidad competitiva más activa de España.</p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {PLANS.map((plan, i) => (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -4 }}
                  className="relative border p-8 bg-zinc-900/50"
                  style={{ borderColor: plan.color + '40' }}
                >
                  {plan.badge && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="gaming-font text-[10px] font-black px-4 py-1"
                        style={{ background: plan.color, color: '#000' }}>
                        {plan.badge}
                      </span>
                    </div>
                  )}
                  <div className="gaming-font text-xs font-black uppercase tracking-widest mb-4" style={{ color: plan.color }}>
                    {plan.name}
                  </div>
                  <div className="mb-6">
                    <span className="gaming-font text-5xl font-black text-white">{plan.price}</span>
                    <span className="text-zinc-500 text-sm">{plan.period}</span>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map(f => (
                      <li key={f} className="flex items-center gap-2 text-sm text-zinc-300">
                        <Check className="w-4 h-4 flex-shrink-0" style={{ color: plan.color }} />
                        {f}
                      </li>
                    ))}
                    {plan.notIncluded.map(f => (
                      <li key={f} className="flex items-center gap-2 text-sm text-zinc-600 line-through">
                        <X className="w-4 h-4 flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <motion.button
                    whileTap={{ scale: 0.96 }}
                    className="w-full gaming-font text-xs font-black uppercase py-3 tracking-widest transition-all"
                    style={{ background: plan.badge ? plan.color : 'transparent', border: `1px solid ${plan.color}`, color: plan.badge ? '#000' : plan.color }}
                  >
                    Elegir {plan.name}
                  </motion.button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════ 6. TESTIMONIOS ══════ */}
        <section className="py-24 px-6 bg-[#0d0d0d] border-t border-zinc-800">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <span className="gaming-font text-xs text-[#00ff88] tracking-widest block mb-3">— La Comunidad Habla</span>
              <h2 className="gaming-font text-5xl font-black text-white">RESEÑAS</h2>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {TESTIMONIALS.map((t, i) => (
                <motion.div
                  key={t.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12 }}
                  className="border border-zinc-800 p-6 bg-zinc-900/30 hover:border-[#00ff88]/30 transition-colors"
                >
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(t.rating)].map((_, j) => <Star key={j} className="w-3 h-3 fill-[#00ff88] text-[#00ff88]" />)}
                  </div>
                  <p className="text-zinc-300 text-sm leading-relaxed mb-6">"{t.quote}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#00ff88]/20 to-[#7c3aed]/20 border border-[#00ff88]/20 flex items-center justify-center gaming-font text-sm font-black text-[#00ff88]">
                      {t.name[0]}
                    </div>
                    <div>
                      <div className="gaming-font text-sm font-bold text-white">{t.name}</div>
                      <div className="text-[11px] text-zinc-500">{t.role}</div>
                    </div>
                    <span className="ml-auto gaming-font text-[10px] text-[#00ff88] border border-[#00ff88]/30 px-2 py-1">{t.game}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════ 7. FAQ ══════ */}
        <section className="py-24 px-6">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <span className="gaming-font text-xs text-[#00ff88] tracking-widest block mb-3">— Soporte</span>
              <h2 className="gaming-font text-5xl font-black text-white">FAQ</h2>
            </motion.div>
            <div className="space-y-2">
              {FAQS.map((faq, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className="border border-zinc-800 overflow-hidden"
                >
                  <button
                    onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                    className="w-full flex items-center justify-between p-5 text-left hover:bg-zinc-900/50 transition-colors"
                  >
                    <span className="gaming-font text-sm font-bold text-white">{faq.q}</span>
                    <motion.div animate={{ rotate: activeFaq === i ? 180 : 0 }}>
                      <ChevronDown className="w-4 h-4 text-[#00ff88]" />
                    </motion.div>
                  </button>
                  <AnimatePresence>
                    {activeFaq === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <p className="px-5 pb-5 text-sm text-zinc-400 leading-relaxed">{faq.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════ 8. CTA + CONTACT ══════ */}
        <section className="py-24 px-6 bg-[#0d0d0d] border-t border-zinc-800">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="gaming-font text-xs text-[#00ff88] tracking-widest block mb-4">— Únete Ahora</span>
              <h2 className="gaming-font text-6xl font-black text-white leading-none mb-6">
                ¿LISTO<br />
                <span className="text-[#00ff88] neon-text">PARA GANAR?</span>
              </h2>
              <p className="text-zinc-400 mb-8 leading-relaxed">
                Más de 142.000 jugadores ya forman parte de NEXUS.GG. 
                Crea tu cuenta gratis y empieza a competir hoy mismo.
              </p>
              <div className="flex items-center gap-4 text-xs text-zinc-500 flex-wrap mb-8">
                <span className="flex items-center gap-2"><Twitch className="w-4 h-4 text-[#9146ff]" /> Twitch Partner</span>
                <span className="flex items-center gap-2"><Youtube className="w-4 h-4 text-red-500" /> YouTube Gaming</span>
                <span className="flex items-center gap-2"><MessageSquare className="w-4 h-4 text-[#5865f2]" /> Discord · 58K miembros</span>
              </div>
              <div className="grid grid-cols-2 gap-3 text-xs text-zinc-400">
                <div className="border border-zinc-800 p-4">
                  <div className="gaming-font text-white font-bold mb-1">Sede Central</div>
                  <div>C/ Sierpes, 45 — Sevilla</div>
                  <div>+34 955 124 830</div>
                </div>
                <div className="border border-zinc-800 p-4">
                  <div className="gaming-font text-white font-bold mb-1">Gaming Hub</div>
                  <div>Avda. de la Constitución, 12</div>
                  <div>hola@nexus.gg</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="border border-[#00ff88]/20 bg-zinc-900/50 p-8"
            >
              <h3 className="gaming-font text-xl font-black text-white mb-6">CREAR CUENTA GRATIS</h3>
              <form className="space-y-4" onSubmit={e => e.preventDefault()}>
                <div>
                  <label className="gaming-font text-[10px] text-zinc-500 uppercase tracking-widest block mb-2">Nickname</label>
                  <input type="text" placeholder="Tu callsign..." className="w-full bg-zinc-900 border border-zinc-700 focus:border-[#00ff88] px-4 py-3 text-sm text-white outline-none transition-colors" />
                </div>
                <div>
                  <label className="gaming-font text-[10px] text-zinc-500 uppercase tracking-widest block mb-2">Email</label>
                  <input type="email" placeholder="gamer@nexus.gg" className="w-full bg-zinc-900 border border-zinc-700 focus:border-[#00ff88] px-4 py-3 text-sm text-white outline-none transition-colors" />
                </div>
                <div>
                  <label className="gaming-font text-[10px] text-zinc-500 uppercase tracking-widest block mb-2">Juego Principal</label>
                  <select className="w-full bg-zinc-900 border border-zinc-700 focus:border-[#00ff88] px-4 py-3 text-sm text-zinc-400 outline-none transition-colors">
                    {['Valorant', 'CS2', 'League of Legends', 'FIFA', 'Fortnite', 'Apex Legends'].map(g => <option key={g}>{g}</option>)}
                  </select>
                </div>
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  type="submit"
                  className="w-full gaming-font bg-[#00ff88] text-black py-4 text-xs font-black uppercase tracking-widest hover:bg-[#00cc6a] transition-colors"
                >
                  Activar Cuenta · Gratis
                </motion.button>
                <p className="text-[11px] text-zinc-600 text-center">Sin tarjeta de crédito. Sin compromisos.</p>
              </form>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-zinc-800 py-8 px-6">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Gamepad2 className="w-4 h-4 text-[#00ff88]" />
              <span className="gaming-font font-black text-zinc-400">NEXUS<span className="text-zinc-600">.GG</span></span>
            </div>
            <div className="gaming-font text-[10px] text-zinc-600 tracking-widest">[SYS] © 2026 NEXUS Gaming · Sevilla, España · Todos los derechos reservados</div>
            <div className="gaming-font text-[10px] text-zinc-600 tracking-widest">DATA INTEGRITY: 100%</div>
          </div>
        </footer>
      </div>
    </DemoLayout>
  );
}
