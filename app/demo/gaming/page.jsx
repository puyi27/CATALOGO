"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { 
  Terminal, Crosshair, Cpu, Shield, Zap, RefreshCw, ChevronLeft, 
  Menu, X, Trophy, Target, Globe, Mouse, Keyboard, Headphones, CheckCircle2,
  ChevronDown
, Package} from 'lucide-react';
import DemoLayout from '@/components/DemoLayout';

export default function GamingDemo() {
  const [leaderboard, setLeaderboard] = useState([
    { id: "p1", name: "V01D", role: "IGL", kd: "1.45", score: 9450, ping: 12 },
    { id: "p2", name: "N3XUS", role: "AWP", kd: "1.32", score: 8200, ping: 15 },
    { id: "p3", name: "GL1TCH", role: "RIFLER", kd: "1.18", score: 7150, ping: 14 },
    { id: "p4", name: "SYNTAX", role: "SUPPORT", kd: "1.05", score: 6800, ping: 11 },
    { id: "p5", name: "CRASH", role: "LURK", kd: "0.98", score: 6100, ping: 18 },
    { id: "p6", name: "PHANTOM", role: "ENTRY", kd: "1.12", score: 7000, ping: 13 },
    { id: "p7", name: "VENOM", role: "FLEX", kd: "1.25", score: 7800, ping: 16 }
  ]);
  const [isSimulating, setIsSimulating] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);

  const { scrollYProgress } = useScroll();
  const parallaxY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const simulateMatch = () => {
    setIsSimulating(true);
    setTimeout(() => {
      setLeaderboard([...leaderboard].sort(() => Math.random() - 0.5).map(p => ({
        ...p,
        score: p.score + Math.floor(Math.random() * 500)
      })));
      setIsSimulating(false);
    }, 800);
  };

  const roster = [
    { id: "r1", name: "V01D", role: "CAPTAIN", img: "/images/demo/gaming/1.jpg", code: "7492", agent: "DUELIST" },
    { id: "r2", name: "N3XUS", role: "FRAGGER", img: "/images/demo/gaming/2.jpg", code: "8134", agent: "INITIATOR" },
    { id: "r3", name: "GL1TCH", role: "TACTICIAN", img: "/images/demo/gaming/3.jpg", code: "2951", agent: "CONTROLLER" },
    { id: "r4", name: "SYNTAX", role: "SUPPORT", img: "/images/demo/gaming/4.jpg", code: "5501", agent: "SENTINEL" }
  ];

  const equipment = [
    { id: 1, name: "NEXUS PRO MOUSE", type: "PERIPHERAL", price: "$129.99", icon: Mouse, img: "/images/demo/gaming/5.jpg" },
    { id: 2, name: "TACTICAL KEYBOARD", type: "PERIPHERAL", price: "$189.99", icon: Keyboard, img: "/images/demo/gaming/6.jpg" },
    { id: 3, name: "VOID HEADSET V2", type: "AUDIO", price: "$149.99", icon: Headphones, img: "/images/demo/gaming/1.jpg" },
  ];

  const faqs = [
    { q: "WHEN ARE TRYOUTS FOR THE ACADEMY TEAM?", a: "Academy tryouts are held quarterly. Follow our comms channels to get notified when the next registration window opens. Rank requirements apply." },
    { q: "DO YOU SHIP MERCHANDISE INTERNATIONALLY?", a: "Yes. Our logistics network supports global shipping for all tactical gear and apparel. Tariffs and duties are calculated at checkout." },
    { q: "WHAT PERIPHERALS DO YOUR PROS USE?", a: "All NEXUS.GG operatives use our proprietary line of equipment, available in the STORE section. Specifically engineered for sub-millisecond latency." },
    { q: "HOW CAN I BECOME A SPONSOR?", a: "Corporate inquiries should be directed to operations@nexus.gg. We partner exclusively with brands that align with our high-performance ethos." }
  ];

  useEffect(() => {
    import('animejs').then((animeModule) => {
      const anime = animeModule.default;
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            anime({
              targets: '.anime-tournament-item',
              translateX: [-50, 0],
              opacity: [0, 1],
              delay: anime.stagger(150),
              easing: 'easeOutExpo',
              duration: 800
            });
            observer.disconnect();
          }
        });
      });
      const el = document.querySelector('.anime-tournament-container');
      if(el) observer.observe(el);
    });
  }, []);

  return (
    <DemoLayout title="Gaming eSports">
      <div className="text-zinc-300 font-mono selection:bg-cyan-500 selection:text-zinc-950 overflow-x-hidden relative md:cursor-none bg-zinc-950 min-h-screen">
      
      {/* Custom Cursor */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border border-cyan-500 rounded-none pointer-events-none z-50 mix-blend-difference items-center justify-center hidden md:flex"
        animate={{ x: mousePosition.x - 16, y: mousePosition.y - 16 }}
        transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.5 }}
      >
        <div className="w-1 h-1 bg-red-500 rounded-none" />
      </motion.div>

      {/* Grid Background */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-0"
           style={{ backgroundImage: 'linear-gradient(to right, #06b6d4 1px, transparent 1px), linear-gradient(to bottom, #06b6d4 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-40 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-md">
        <div className="max-w-[1400px] mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-xs md:hover:text-cyan-400 active:scale-95 transition-all uppercase tracking-widest z-50">
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Catálogo</span>
          </Link>
          <div className="flex items-center gap-4 z-50 absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0">
            <Terminal className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-500" />
            <span className="text-lg sm:text-xl font-bold tracking-tighter text-white">NEXUS<span className="text-red-500">.GG</span></span>
          </div>
          <div className="flex items-center gap-6 text-xs tracking-widest hidden md:flex">
            <a href="#about" className="hover:text-cyan-400 md:cursor-none transition-colors">ABOUT</a>
            <a href="#roster" className="hover:text-cyan-400 md:cursor-none transition-colors">ROSTER</a>
            <a href="#store" className="hover:text-cyan-400 md:cursor-none transition-colors">STORE</a>
            <a href="#faq" className="hover:text-cyan-400 md:cursor-none transition-colors">FAQ</a>
          </div>
          <button 
            className="md:hidden z-50 active:scale-90 transition-transform text-white" 
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-30 bg-zinc-950 flex flex-col items-center justify-center gap-8 md:hidden"
          >
            {["ABOUT", "ROSTER", "STORE", "FAQ"].map((item, i) => (
              <motion.a 
                href={`#${item.toLowerCase()}`}
                key={item}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i }}
                onClick={() => setMenuOpen(false)}
                className="text-4xl font-black text-white tracking-tighter active:text-cyan-500 active:scale-95 transition-all uppercase"
              >
                {item}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <main className="relative z-10 pb-0">
        
        {/* Section 1: HERO */}
        <section className="relative min-h-screen flex flex-col justify-center items-start border-b border-zinc-800 overflow-hidden pt-20">
          <motion.div style={{ y: parallaxY }} className="absolute inset-0 z-0">
            <img src="/images/demo/gaming/hero.jpg" alt="Hero" className="w-full h-full object-cover opacity-20 mix-blend-luminosity" />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/50 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/80 to-transparent" />
          </motion.div>

          <div className="max-w-[1400px] mx-auto px-6 w-full relative z-10">
            <div className="border-l-2 border-cyan-500 pl-6 sm:pl-12 py-8 relative backdrop-blur-sm bg-zinc-950/30">
              <div className="absolute top-0 -left-[2px] w-[2px] h-32 bg-gradient-to-b from-cyan-400 to-transparent" />
              
              <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, ease: "easeOut" }}>
                <div className="flex items-center gap-3 mb-6">
                  <span className="inline-block w-2 h-2 sm:w-3 sm:h-3 bg-red-500 animate-pulse rounded-none" />
                  <span className="text-xs sm:text-sm tracking-[0.3em] text-cyan-500 font-bold">STATUS: ACTIVE // PROTOCOL ZERO</span>
                </div>
                
                <h1 className="text-6xl sm:text-8xl md:text-[10rem] font-black text-white uppercase tracking-tighter leading-[0.85] mb-8 relative group">
                  <span className="relative z-10 block">DOMINATE.</span>
                  <span className="relative z-10 block text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-400 to-zinc-800">EXECUTE.</span>
                  
                  {/* Glitch effects */}
                  <span className="absolute top-0 left-[2px] -z-10 text-cyan-500 opacity-50 md:group-hover:translate-x-3 md:group-hover:-translate-y-2 transition-transform duration-200 block hidden md:block">DOMINATE. <br/>EXECUTE.</span>
                  <span className="absolute top-0 -left-[2px] -z-10 text-red-500 opacity-50 md:group-hover:-translate-x-3 md:group-hover:translate-y-2 transition-transform duration-200 block hidden md:block">DOMINATE. <br/>EXECUTE.</span>
                </h1>
                
                <p className="text-sm sm:text-xl md:text-2xl text-zinc-400 max-w-2xl uppercase tracking-widest leading-relaxed mb-10">
                  We are the vanguard of competitive esports. Engineering victory through flawless execution and tactical superiority.
                </p>

                <div className="flex flex-wrap gap-6">
                  <a href="#roster" className="group relative px-8 py-4 bg-white text-zinc-950 font-black tracking-widest text-sm uppercase overflow-hidden">
                    <div className="absolute inset-0 w-full h-full bg-cyan-500 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                    <span className="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors">
                      <Target className="w-5 h-5" /> VIEW ROSTER
                    </span>
                  </a>
                  <a href="#about" className="group relative px-8 py-4 bg-zinc-900 border border-zinc-700 text-white font-bold tracking-widest text-sm uppercase md:hover:border-red-500 transition-colors">
                    <span className="flex items-center gap-2">
                      <Terminal className="w-5 h-5 text-red-500" /> INITIALIZE
                    </span>
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Section 2: ABOUT */}
        <section id="about" className="py-24 sm:py-32 border-b border-zinc-800 relative bg-zinc-950">
          <div className="max-w-[1400px] mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl sm:text-6xl font-black text-white uppercase tracking-tighter mb-6 flex items-center gap-4">
                  <Globe className="w-8 h-8 sm:w-12 sm:h-12 text-cyan-500" />
                  THE ORG
                </h2>
                <div className="w-20 h-1 bg-red-500 mb-8" />
                <p className="text-zinc-400 text-lg sm:text-xl leading-relaxed mb-6">
                  Founded in 2024, NEXUS.GG was built on a single premise: absolute dominance in the digital arena. We combine elite talent with data-driven analytics and military-grade training protocols.
                </p>
                <p className="text-zinc-400 text-lg sm:text-xl leading-relaxed mb-10">
                  Our facilities house the world's most advanced simulation tech, ensuring our operatives remain at the bleeding edge of the meta.
                </p>
                <div className="grid grid-cols-2 gap-8 border-t border-zinc-800 pt-8">
                  <div>
                    <div className="text-4xl sm:text-5xl font-black text-white tracking-tighter">14</div>
                    <div className="text-xs text-cyan-500 tracking-widest font-bold mt-2">MAJOR TITLES</div>
                  </div>
                  <div>
                    <div className="text-4xl sm:text-5xl font-black text-white tracking-tighter">$8.5M</div>
                    <div className="text-xs text-red-500 tracking-widest font-bold mt-2">PRIZE POOL WON</div>
                  </div>
                </div>
              </div>
              <div className="relative aspect-square">
                <img src="/images/demo/gaming/2.jpg" alt="HQ" className="w-full h-full object-cover grayscale opacity-60 border border-zinc-800" />
                <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 to-transparent mix-blend-overlay" />
                
                {/* Decorative tech elements */}
                <div className="absolute top-4 left-4 w-16 h-16 border-t-2 border-l-2 border-cyan-500" />
                <div className="absolute bottom-4 right-4 w-16 h-16 border-b-2 border-r-2 border-red-500" />
                
                <div className="absolute -bottom-8 -left-8 bg-zinc-900 border border-zinc-800 p-6 backdrop-blur-md hidden sm:block">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-cyan-500/20 flex items-center justify-center border border-cyan-500/50">
                      <Shield className="w-6 h-6 text-cyan-500" />
                    </div>
                    <div>
                      <div className="text-sm font-bold tracking-widest text-white">HQ SECURE</div>
                      <div className="text-xs text-zinc-500">BERLIN, DE</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: LEADERBOARD */}
        <section className="py-24 sm:py-32 border-b border-zinc-800 relative bg-zinc-950/50">
          <div className="absolute top-0 right-0 w-32 h-[1px] bg-cyan-500" />
          <div className="max-w-[1400px] mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6 w-full">
              <div>
                <h2 className="text-4xl sm:text-6xl font-black text-white uppercase tracking-tighter flex items-center gap-4 mb-2">
                  <Crosshair className="w-8 h-8 sm:w-12 sm:h-12 text-cyan-500" />
                  LIVE OPS
                </h2>
                <p className="text-sm text-zinc-500 uppercase tracking-widest">Global Rank Tracking System // Top 500</p>
              </div>
              <button
                onClick={simulateMatch}
                disabled={isSimulating}
                className="group relative px-6 py-4 bg-zinc-900 border border-zinc-700 md:hover:border-cyan-500 active:scale-95 text-xs sm:text-sm uppercase tracking-widest transition-all disabled:opacity-50 overflow-hidden w-full md:w-auto"
              >
                <div className="absolute inset-0 bg-cyan-500/10 translate-y-full md:group-hover:translate-y-0 transition-transform duration-300 ease-out hidden md:block" />
                <span className="relative z-10 flex items-center justify-center gap-2 font-bold text-white md:group-hover:text-cyan-400 transition-colors">
                  <RefreshCw className={`w-4 h-4 ${isSimulating ? "animate-spin text-cyan-500" : ""}`} />
                  {isSimulating ? "COMPUTING..." : "SIMULATE MATCH"}
                </span>
              </button>
            </div>

            <div className="bg-zinc-900/50 border border-zinc-800 backdrop-blur-sm rounded-none overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              <div className="min-w-[800px] w-full">
                <div className="grid grid-cols-12 gap-4 p-6 border-b border-zinc-800 text-xs sm:text-sm text-zinc-500 uppercase tracking-widest font-bold bg-zinc-950/50">
                  <div className="col-span-1">RANK</div>
                  <div className="col-span-4">OPERATIVE ID</div>
                  <div className="col-span-2">CLASS</div>
                  <div className="col-span-2 text-right">K/D RATIO</div>
                  <div className="col-span-1 text-right">PING</div>
                  <div className="col-span-2 text-right">SCORE</div>
                </div>
                <div className="flex flex-col relative overflow-hidden">
                  {leaderboard.map((player, index) => (
                    <motion.div
                      layout
                      initial={false}
                      key={player.id}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      className="grid grid-cols-12 gap-4 p-6 border-b border-zinc-800/50 items-center md:hover:bg-zinc-800/50 transition-colors group active:bg-zinc-800"
                    >
                      <div className="col-span-1 font-black text-cyan-500 text-xl sm:text-2xl">
                        {index + 1 < 10 ? `0${index + 1}` : index + 1}
                      </div>
                      <div className="col-span-4 text-white font-black text-lg sm:text-2xl tracking-widest md:group-hover:text-cyan-400 transition-colors truncate">
                        {player.name}
                      </div>
                      <div className="col-span-2 text-xs sm:text-sm tracking-widest text-zinc-400 border border-zinc-700 px-3 py-1 w-max bg-zinc-950/50">
                        {player.role}
                      </div>
                      <div className="col-span-2 text-right font-black text-red-400 text-lg">
                        {player.kd}
                      </div>
                      <div className="col-span-1 text-right font-mono text-zinc-500 text-sm">
                        {player.ping}ms
                      </div>
                      <div className="col-span-2 text-right font-black text-white text-xl sm:text-2xl">
                        {player.score.toLocaleString()}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: ROSTER */}
        <section id="roster" className="py-24 sm:py-32 border-b border-zinc-800 overflow-hidden bg-zinc-950">
          <div className="max-w-[1400px] mx-auto px-6">
            <div className="mb-12">
              <h2 className="text-4xl sm:text-6xl font-black text-white uppercase tracking-tighter flex items-center gap-4 mb-2">
                <Cpu className="w-8 h-8 sm:w-12 sm:h-12 text-cyan-500" />
                ROSTER
              </h2>
              <p className="text-sm text-zinc-500 uppercase tracking-widest">Alpha Squad // Active Duty</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {roster.map((member, idx) => (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="group relative border border-zinc-800 hover:border-cyan-500 transition-colors p-3 bg-zinc-900/30"
                >
                  <div className="relative aspect-[3/4] overflow-hidden bg-zinc-900 mb-4">
                    <div className="absolute inset-0 bg-cyan-500/20 mix-blend-overlay z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                    <img src={member.img} alt={member.name} className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out" />
                    <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-transparent z-20">
                      <div className="text-xs text-cyan-400 tracking-widest mb-1 font-bold">{member.role}</div>
                      <div className="text-4xl font-black text-white tracking-tighter leading-none">{member.name}</div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center px-2 pb-2">
                    <div className="flex gap-3">
                      <Shield className="w-5 h-5 text-zinc-600 group-hover:text-cyan-500 transition-colors" />
                      <Zap className="w-5 h-5 text-zinc-600 group-hover:text-red-500 transition-colors" />
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-zinc-400 font-bold tracking-widest">{member.agent}</div>
                      <div className="text-[10px] text-zinc-600 tracking-[0.2em] mt-1">ID: {member.id.toUpperCase()}-{member.code}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 5: STORE / MERCH */}
        <section id="store" className="py-24 sm:py-32 border-b border-zinc-800 bg-zinc-950/50">
          <div className="max-w-[1400px] mx-auto px-6">
            <div className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
              <div>
                <h2 className="text-4xl sm:text-6xl font-black text-white uppercase tracking-tighter flex items-center gap-4 mb-2">
                  <Package className="w-8 h-8 sm:w-12 sm:h-12 text-cyan-500" />
                  ARMORY
                </h2>
                <p className="text-sm text-zinc-500 uppercase tracking-widest">Official Org Equipment</p>
              </div>
              <a href="#" className="text-cyan-500 font-bold tracking-widest text-sm hover:text-white transition-colors flex items-center gap-2">
                VIEW ALL GEAR <ChevronRight className="w-4 h-4" />
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {equipment.map((item, i) => (
                <motion.div 
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-zinc-900 border border-zinc-800 p-6 group hover:border-cyan-500 transition-colors"
                >
                  <div className="aspect-video bg-zinc-950 border border-zinc-800 mb-6 relative overflow-hidden flex items-center justify-center">
                    <img src={item.img} alt={item.name} className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity" />
                    <item.icon className="w-16 h-16 text-zinc-700 group-hover:text-cyan-500 transition-colors relative z-10" />
                  </div>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="text-xs text-zinc-500 font-bold tracking-widest mb-1">{item.type}</div>
                      <h3 className="text-2xl font-black tracking-tighter text-white">{item.name}</h3>
                    </div>
                    <div className="text-cyan-500 font-black text-xl">{item.price}</div>
                  </div>
                  <button className="w-full py-4 border border-zinc-700 text-sm font-bold tracking-widest hover:bg-white hover:text-black transition-colors uppercase">
                    Acquire
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 6: TOURNAMENTS */}
        <section className="py-24 sm:py-32 border-b border-zinc-800 overflow-hidden relative bg-zinc-950">
          <div className="absolute top-0 left-0 w-1/3 h-[1px] bg-red-500" />
          <div className="max-w-[1400px] mx-auto px-6">
            <div className="mb-12">
              <h2 className="text-4xl sm:text-6xl font-black text-white uppercase tracking-tighter flex items-center gap-4 mb-2">
                <Trophy className="w-8 h-8 sm:w-12 sm:h-12 text-red-500" />
                CAMPAIGNS
              </h2>
              <p className="text-sm text-zinc-500 uppercase tracking-widest">Recent Tournaments & Operations</p>
            </div>
            
            <div className="flex flex-col gap-4 anime-tournament-container">
              {[
                { name: "NEO-TOKYO MASTERS", placement: "1ST PLACE", prize: "$250,000", year: "2025", tier: "S-TIER" },
                { name: "CYBER-LEAGUE FINALS", placement: "2ND PLACE", prize: "$100,000", year: "2025", tier: "A-TIER" },
                { name: "GLOBAL INVITATIONAL", placement: "1ST PLACE", prize: "$500,000", year: "2024", tier: "S-TIER" },
                { name: "WINTER SHOWDOWN", placement: "1ST PLACE", prize: "$75,000", year: "2024", tier: "B-TIER" }
              ].map((tourney, i) => (
                <div key={i} className="anime-tournament-item opacity-0 flex flex-col md:flex-row justify-between items-start md:items-center p-6 sm:p-8 bg-zinc-900/40 border border-zinc-800 md:hover:border-red-500 transition-colors group">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-2">
                      <div className="text-xs text-red-500 tracking-widest font-bold">{tourney.year}</div>
                      <div className="text-[10px] bg-zinc-800 px-2 py-1 tracking-widest font-bold">{tourney.tier}</div>
                    </div>
                    <div className="text-2xl sm:text-4xl font-black text-white tracking-tighter group-hover:text-cyan-400 transition-colors">{tourney.name}</div>
                  </div>
                  <div className="flex items-center gap-8 mt-6 md:mt-0 w-full md:w-auto border-t border-zinc-800 md:border-none pt-4 md:pt-0">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-cyan-500" />
                      <span className="text-sm sm:text-base font-bold tracking-widest text-zinc-300">{tourney.placement}</span>
                    </div>
                    <div className="text-2xl sm:text-3xl font-black text-white">{tourney.prize}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 7: FAQ */}
        <section id="faq" className="py-24 sm:py-32 border-b border-zinc-800 bg-zinc-950/50">
          <div className="max-w-[1400px] mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-6xl font-black text-white uppercase tracking-tighter mb-4">COMMS / INTEL</h2>
              <p className="text-zinc-500 tracking-widest font-bold">FREQUENTLY ASKED QUESTIONS</p>
            </div>

            <div className="max-w-3xl mx-auto flex flex-col gap-4">
              {faqs.map((faq, i) => (
                <div key={i} className="border border-zinc-800 bg-zinc-900/50 p-2">
                  <button 
                    onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                    className="w-full flex justify-between items-center p-4 text-left"
                  >
                    <span className="font-bold text-sm sm:text-base tracking-widest text-white pr-4">{faq.q}</span>
                    <ChevronDown className={`w-5 h-5 text-cyan-500 transition-transform ${activeFaq === i ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {activeFaq === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="p-4 pt-0 text-zinc-400 text-sm leading-relaxed border-t border-zinc-800/50 mt-2">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="bg-zinc-950 relative z-10 border-t-4 border-cyan-500 pt-20">
        <div className="max-w-[1400px] mx-auto px-6 pb-12 grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-zinc-800">
          <div className="md:col-span-2">
            <div className="flex items-center gap-4 mb-6">
              <Terminal className="w-8 h-8 text-cyan-500" />
              <span className="text-3xl font-black tracking-tighter text-white">NEXUS<span className="text-red-500">.GG</span></span>
            </div>
            <p className="text-zinc-400 max-w-sm mb-8 leading-relaxed">
              We are the new standard. Join the syndicate and witness the future of competitive gaming. 
            </p>
            <div className="flex gap-4">
              <input type="email" placeholder="EMAIL ADDRESS" className="bg-zinc-900 border border-zinc-800 px-4 py-3 text-sm tracking-widest outline-none focus:border-cyan-500 w-full max-w-xs" />
              <button className="bg-cyan-500 text-zinc-950 font-black px-6 py-3 tracking-widest hover:bg-white transition-colors">
                SUBSCRIBE
              </button>
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-black tracking-widest mb-6">SITEMAP</h4>
            <div className="flex flex-col gap-4 text-sm font-bold tracking-widest text-zinc-500">
              <a href="#about" className="hover:text-cyan-500 transition-colors">ABOUT</a>
              <a href="#roster" className="hover:text-cyan-500 transition-colors">ROSTER</a>
              <a href="#store" className="hover:text-cyan-500 transition-colors">STORE</a>
              <a href="#faq" className="hover:text-cyan-500 transition-colors">FAQ</a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-black tracking-widest mb-6">NETWORK</h4>
            <div className="flex flex-col gap-4 text-sm font-bold tracking-widest text-zinc-500">
              <a href="#" className="hover:text-cyan-500 transition-colors">TWITTER</a>
              <a href="#" className="hover:text-cyan-500 transition-colors">DISCORD</a>
              <a href="#" className="hover:text-cyan-500 transition-colors">YOUTUBE</a>
              <a href="#" className="hover:text-cyan-500 transition-colors">TWITCH</a>
            </div>
          </div>
        </div>

        <div className="max-w-[1400px] mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-[10px] sm:text-xs text-zinc-600 tracking-widest flex flex-col sm:flex-row gap-2 sm:gap-6 text-center md:text-left">
            <span>[SYS_MSG] ALL SYSTEMS OPTIMAL</span>
            <span className="text-cyan-500">DATA INTEGRITY: 100%</span>
          </div>
          <div className="text-[10px] sm:text-xs text-zinc-600 tracking-widest">
            © 2026 NEXUS ESPORTS. ALL RIGHTS RESERVED.
          </div>
        </div>
      </footer>
    </div>
    </DemoLayout>
  );
}

// Dummy ChevronRight since lucide-react might not have it imported
const ChevronRight = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
);
