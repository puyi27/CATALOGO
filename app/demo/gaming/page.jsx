"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Terminal, Crosshair, Cpu, Shield, Zap, RefreshCw, ChevronLeft, Menu, X } from 'lucide-react';
import DemoLayout from '@/components/DemoLayout';

export default function GamingDemo() {
  const [leaderboard, setLeaderboard] = useState([
    { id: "p1", name: "V01D", role: "IGL", kd: "1.45", score: 9450, ping: 12 },
    { id: "p2", name: "N3XUS", role: "AWP", kd: "1.32", score: 8200, ping: 15 },
    { id: "p3", name: "GL1TCH", role: "RIFLER", kd: "1.18", score: 7150, ping: 14 },
    { id: "p4", name: "SYNTAX", role: "SUPPORT", kd: "1.05", score: 6800, ping: 11 },
    { id: "p5", name: "CRASH", role: "LURK", kd: "0.98", score: 6100, ping: 18 }
  ]);
  const [isSimulating, setIsSimulating] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [menuOpen, setMenuOpen] = useState(false);

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
    }, 600);
  };

  const roster = [
    { id: "r1", name: "V01D", role: "CAPTAIN", img: "/images/demo/gaming/1.jpg", code: "7492" },
    { id: "r2", name: "N3XUS", role: "FRAGGER", img: "/images/demo/gaming/2.jpg", code: "8134" },
    { id: "r3", name: "GL1TCH", role: "TACTICIAN", img: "/images/demo/gaming/3.jpg", code: "2951" }
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
      <div className="text-zinc-300 font-mono selection:bg-cyan-500 selection:text-zinc-950 overflow-x-hidden relative md:cursor-none">
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border border-cyan-500 rounded-none pointer-events-none z-50 mix-blend-difference items-center justify-center hidden md:flex"
        animate={{ x: mousePosition.x - 16, y: mousePosition.y - 16 }}
        transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.5 }}
      >
        <div className="w-1 h-1 bg-red-500 rounded-none" />
      </motion.div>

      <div className="fixed inset-0 pointer-events-none opacity-20 z-0"
           style={{ backgroundImage: 'linear-gradient(to right, rgba(6,182,212,0.2) 1px, transparent 1px), linear-gradient(to bottom, rgba(6,182,212,0.2) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      <nav className="fixed top-0 w-full z-40 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-xs md:hover:text-cyan-400 active:scale-95 transition-all uppercase tracking-widest z-50">
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Catálogo</span>
          </Link>
          <div className="flex items-center gap-4 z-50 absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0">
            <Terminal className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-500" />
            <span className="text-lg sm:text-xl font-bold tracking-tighter text-white">NEXUS<span className="text-red-500">.GG</span></span>
          </div>
          <div className="flex items-center gap-6 text-xs tracking-widest hidden md:flex">
            <span className="hover:text-cyan-400 md:cursor-none transition-colors">ROSTER</span>
            <span className="hover:text-cyan-400 md:cursor-none transition-colors">STATS</span>
            <span className="hover:text-cyan-400 md:cursor-none transition-colors">COMM</span>
          </div>
          <button 
            className="md:hidden z-50 active:scale-90 transition-transform text-white" 
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-30 bg-zinc-950 flex flex-col items-center justify-center gap-8 md:hidden"
          >
            {["ROSTER", "STATS", "COMM"].map((item, i) => (
              <motion.span 
                key={item}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i }}
                onClick={() => setMenuOpen(false)}
                className="text-4xl font-black text-white tracking-tighter active:text-cyan-500 active:scale-95 transition-all uppercase"
              >
                {item}
              </motion.span>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <main className="relative z-10 pb-24 max-w-7xl mx-auto px-4 sm:px-6">
        <section className="min-h-[60vh] sm:min-h-[70vh] flex flex-col justify-center items-start border-l border-cyan-500/30 pl-6 sm:pl-16 relative">
          <div className="absolute top-0 -left-[1px] w-[2px] h-20 sm:h-32 bg-gradient-to-b from-cyan-500 to-transparent" />
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="inline-block w-2 h-2 sm:w-3 sm:h-3 bg-red-500 animate-pulse rounded-none" />
              <span className="text-xs sm:text-sm tracking-[0.3em] text-cyan-500 font-bold">STATUS: ACTIVE</span>
            </div>
            <h1 className="text-6xl md:text-9xl font-black text-white uppercase tracking-tighter leading-[0.85] mb-6 relative group">
              <span className="relative z-10 block">SYSTEM ONLINE.</span>
              <span className="absolute top-0 left-[2px] -z-10 text-cyan-500 opacity-50 md:group-hover:translate-x-2 md:group-hover:-translate-y-1 transition-transform duration-200 block hidden md:block">SYSTEM ONLINE.</span>
              <span className="absolute top-0 -left-[2px] -z-10 text-red-500 opacity-50 md:group-hover:-translate-x-2 md:group-hover:translate-y-1 transition-transform duration-200 block hidden md:block">SYSTEM ONLINE.</span>
            </h1>
            <p className="text-sm sm:text-xl md:text-2xl text-zinc-400 max-w-2xl uppercase tracking-widest border-l-4 border-red-500 pl-4 py-1 leading-relaxed">
              Dominate the meta. Execute with precision. We are the new era of competitive gaming.
            </p>
          </motion.div>
        </section>

        <section className="py-16 sm:py-24 border-t border-zinc-800 relative">
          <div className="absolute top-0 right-0 w-20 sm:w-32 h-[1px] bg-cyan-500" />
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 sm:mb-12 gap-6 w-full">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white uppercase tracking-tighter flex items-center gap-3 sm:gap-4 mb-2">
                <Crosshair className="w-6 h-6 sm:w-8 sm:h-8 text-cyan-500" />
                Live Leaderboard
              </h2>
              <p className="text-xs sm:text-sm text-zinc-500 uppercase tracking-widest">Global Rank Tracking System</p>
            </div>
            <button
              onClick={simulateMatch}
              disabled={isSimulating}
              className="group relative px-4 sm:px-6 py-3 sm:py-4 bg-zinc-900 border border-zinc-700 md:hover:border-cyan-500 active:scale-95 text-xs sm:text-sm uppercase tracking-widest transition-all disabled:opacity-50 overflow-hidden rounded-none w-full md:w-auto"
            >
              <div className="absolute inset-0 bg-cyan-500/10 translate-y-full md:group-hover:translate-y-0 transition-transform duration-300 ease-out hidden md:block" />
              <span className="relative z-10 flex items-center justify-center gap-2 font-bold text-white md:group-hover:text-cyan-400 transition-colors">
                <RefreshCw className={`w-4 h-4 ${isSimulating ? "animate-spin text-cyan-500" : ""}`} />
                {isSimulating ? "Computing..." : "Simulate Match"}
              </span>
            </button>
          </div>

          <div className="bg-zinc-900/50 border border-zinc-800 backdrop-blur-sm rounded-none overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            <div className="min-w-[600px] w-full">
              <div className="grid grid-cols-12 gap-4 p-4 border-b border-zinc-800 text-[10px] sm:text-xs text-zinc-500 uppercase tracking-widest">
                <div className="col-span-2 sm:col-span-1">Rank</div>
                <div className="col-span-4">Callsign</div>
                <div className="col-span-2">Role</div>
                <div className="col-span-2 text-right">K/D Ratio</div>
                <div className="col-span-2 sm:col-span-3 text-right">Score</div>
              </div>
              <div className="flex flex-col relative overflow-hidden">
                {leaderboard.map((player, index) => (
                  <motion.div
                    layout
                    initial={false}
                    key={player.id}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    className="grid grid-cols-12 gap-4 p-4 border-b border-zinc-800/50 items-center md:hover:bg-zinc-800/50 transition-colors group active:bg-zinc-800"
                  >
                    <div className="col-span-2 sm:col-span-1 font-black text-cyan-500 text-lg sm:text-xl">0{index + 1}</div>
                    <div className="col-span-4 text-white font-bold text-base sm:text-xl tracking-wider md:group-hover:text-cyan-400 transition-colors truncate">{player.name}</div>
                    <div className="col-span-2 text-[10px] sm:text-xs tracking-widest text-zinc-400 border border-zinc-700 px-1 sm:px-2 py-1 w-max rounded-none">{player.role}</div>
                    <div className="col-span-2 text-right font-bold text-red-400 text-sm sm:text-base">{player.kd}</div>
                    <div className="col-span-2 sm:col-span-3 text-right font-bold text-white text-sm sm:text-base">{player.score}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-24 border-t border-zinc-800 overflow-hidden">
          <div className="mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white uppercase tracking-tighter flex items-center gap-3 sm:gap-4 mb-2">
              <Cpu className="w-6 h-6 sm:w-8 sm:h-8 text-cyan-500" />
              Core Roster
            </h2>
            <p className="text-xs sm:text-sm text-zinc-500 uppercase tracking-widest">Alpha Squad Operatives</p>
          </div>

          <div className="md:hidden overflow-x-auto snap-x snap-mandatory flex gap-4 pb-8 -mx-4 px-4 w-[calc(100%+32px)] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {roster.map((member, idx) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="w-[280px] shrink-0 snap-center relative border border-zinc-800 p-2 bg-zinc-900/30 rounded-none"
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-zinc-900 mb-4 rounded-none">
                  <img src={member.img} alt="Item" className={`absolute inset-0 object-cover  pointer-events-none opacity-80`} />
                  <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-transparent z-20">
                    <div className="text-[10px] text-cyan-400 tracking-widest mb-1 font-bold">{member.role}</div>
                    <div className="text-2xl font-black text-white tracking-tighter">{member.name}</div>
                  </div>
                </div>
                <div className="flex justify-between items-center px-2 pb-2">
                  <div className="flex gap-2">
                    <Shield className="w-4 h-4 text-zinc-600" />
                    <Zap className="w-4 h-4 text-zinc-600" />
                  </div>
                  <div className="text-[10px] text-zinc-500 tracking-[0.2em]">ID: {member.id.toUpperCase()}-{member.code}</div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="hidden md:grid grid-cols-3 gap-8">
            {roster.map((member, idx) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: idx * 0.2 }}
                className="group relative border border-zinc-800 hover:border-cyan-500 transition-colors p-2 bg-zinc-900/30 rounded-none md:cursor-none"
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-zinc-900 mb-4 rounded-none">
                  <div className="absolute inset-0 bg-cyan-500/20 mix-blend-overlay z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  <img src={member.img} alt="Item" className={`absolute inset-0 object-cover  pointer-events-none opacity-60 group-hover:opacity-100 transition-opacity duration-700 ease-out`} />
                  <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-transparent z-20">
                    <div className="text-xs text-cyan-400 tracking-widest mb-1 font-bold">{member.role}</div>
                    <div className="text-3xl font-black text-white tracking-tighter">{member.name}</div>
                  </div>
                </div>
                <div className="flex justify-between items-center px-2 pb-2">
                  <div className="flex gap-2">
                    <Shield className="w-4 h-4 text-zinc-600 group-hover:text-cyan-500 transition-colors" />
                    <Zap className="w-4 h-4 text-zinc-600 group-hover:text-red-500 transition-colors" />
                  </div>
                  <div className="text-[10px] text-zinc-500 tracking-[0.2em]">ID: {member.id.toUpperCase()}-{member.code}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="py-16 sm:py-24 border-t border-zinc-800 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-1/3 h-[1px] bg-red-500" />
          <div className="mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white uppercase tracking-tighter flex items-center gap-3 sm:gap-4 mb-2">
              <Zap className="w-6 h-6 sm:w-8 sm:h-8 text-red-500" />
              Operations
            </h2>
            <p className="text-xs sm:text-sm text-zinc-500 uppercase tracking-widest">Recent Tournaments</p>
          </div>
          
          <div className="flex flex-col gap-4 anime-tournament-container">
            {[
              { name: "NEO-TOKYO MASTERS", placement: "1ST PLACE", prize: "$250,000", year: "2025" },
              { name: "CYBER-LEAGUE FINALS", placement: "2ND PLACE", prize: "$100,000", year: "2025" },
              { name: "GLOBAL INVITATIONAL", placement: "1ST PLACE", prize: "$500,000", year: "2024" }
            ].map((tourney, i) => (
              <div key={i} className="anime-tournament-item opacity-0 flex flex-col sm:flex-row justify-between items-start sm:items-center p-6 bg-zinc-900/40 border border-zinc-800 md:hover:border-red-500 transition-colors">
                <div>
                  <div className="text-xs text-red-500 tracking-widest font-bold mb-1">{tourney.year}</div>
                  <div className="text-xl sm:text-2xl font-black text-white tracking-tighter">{tourney.name}</div>
                </div>
                <div className="flex flex-wrap items-center gap-6 mt-4 sm:mt-0">
                  <div className="text-sm font-bold tracking-widest text-zinc-400">{tourney.placement}</div>
                  <div className="text-lg font-black text-cyan-500">{tourney.prize}</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-zinc-800 bg-zinc-950 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <Terminal className="w-5 h-5 text-zinc-500" />
            <span className="text-lg font-bold tracking-tighter text-zinc-400">NEXUS<span className="text-zinc-600">.GG</span></span>
          </div>
          <div className="text-[10px] sm:text-xs text-zinc-600 tracking-widest text-center md:text-left flex flex-col gap-1">
            <span>[SYS_MSG] ALL SYSTEMS OPTIMAL</span>
            <span>DATA INTEGRITY: 100%</span>
          </div>
          <div className="text-[10px] sm:text-xs text-zinc-600 tracking-widest flex flex-wrap justify-center items-center gap-4">
            <span className="md:hover:text-cyan-500 active:scale-95 transition-all md:cursor-none uppercase">TWITTER</span>
            <span className="md:hover:text-cyan-500 active:scale-95 transition-all md:cursor-none uppercase">DISCORD</span>
            <span className="md:hover:text-cyan-500 active:scale-95 transition-all md:cursor-none uppercase">TWITCH</span>
          </div>
        </div>
      </footer>
    </div>
    </DemoLayout>
  );
}
