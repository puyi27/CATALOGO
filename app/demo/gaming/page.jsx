"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Terminal, Crosshair, Cpu, Shield, Zap, RefreshCw, ChevronLeft } from 'lucide-react';

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
    { id: "r1", name: "V01D", role: "CAPTAIN", img: "https://loremflickr.com/600/800/cyberpunk,face?random=1", code: "7492" },
    { id: "r2", name: "N3XUS", role: "FRAGGER", img: "https://loremflickr.com/600/800/neon,person?random=2", code: "8134" },
    { id: "r3", name: "GL1TCH", role: "TACTICIAN", img: "https://loremflickr.com/600/800/gamer,portrait?random=3", code: "2951" }
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-300 font-mono selection:bg-cyan-500 selection:text-zinc-950 overflow-hidden relative cursor-default">
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border border-cyan-500 rounded-none pointer-events-none z-50 mix-blend-difference flex items-center justify-center hidden md:flex"
        animate={{ x: mousePosition.x - 16, y: mousePosition.y - 16 }}
        transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.5 }}
      >
        <div className="w-1 h-1 bg-red-500 rounded-none" />
      </motion.div>

      <div className="fixed inset-0 pointer-events-none opacity-20 z-0"
           style={{ backgroundImage: 'linear-gradient(to right, rgba(6,182,212,0.2) 1px, transparent 1px), linear-gradient(to bottom, rgba(6,182,212,0.2) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      <nav className="fixed top-0 w-full z-40 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-xs hover:text-cyan-400 transition-colors uppercase tracking-widest">
            <ChevronLeft className="w-4 h-4" />
            <span>Catálogo</span>
          </Link>
          <div className="flex items-center gap-4">
            <Terminal className="w-6 h-6 text-cyan-500" />
            <span className="text-xl font-bold tracking-tighter text-white">NEXUS<span className="text-red-500">.GG</span></span>
          </div>
          <div className="flex items-center gap-6 text-xs tracking-widest hidden md:flex">
            <span className="hover:text-cyan-400 cursor-pointer transition-colors">ROSTER</span>
            <span className="hover:text-cyan-400 cursor-pointer transition-colors">STATS</span>
            <span className="hover:text-cyan-400 cursor-pointer transition-colors">COMM</span>
          </div>
        </div>
      </nav>

      <main className="relative z-10 pt-32 pb-24 max-w-7xl mx-auto px-6">
        <section className="min-h-[70vh] flex flex-col justify-center items-start border-l border-zinc-800 pl-8 md:pl-16 relative">
          <div className="absolute top-0 -left-[1px] w-[2px] h-32 bg-gradient-to-b from-cyan-500 to-transparent" />
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="inline-block w-3 h-3 bg-red-500 animate-pulse rounded-none" />
              <span className="text-sm tracking-[0.3em] text-cyan-500 font-bold">STATUS: ACTIVE</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black text-white uppercase tracking-tighter leading-none mb-6 relative group">
              <span className="relative z-10 block">SYSTEM ONLINE.</span>
              <span className="absolute top-0 left-[2px] -z-10 text-cyan-500 opacity-50 group-hover:translate-x-2 group-hover:-translate-y-1 transition-transform duration-200 block">SYSTEM ONLINE.</span>
              <span className="absolute top-0 -left-[2px] -z-10 text-red-500 opacity-50 group-hover:-translate-x-2 group-hover:translate-y-1 transition-transform duration-200 block">SYSTEM ONLINE.</span>
            </h1>
            <p className="text-xl md:text-2xl text-zinc-400 max-w-2xl uppercase tracking-widest border-l-4 border-red-500 pl-4 py-1">
              Dominate the meta. Execute with precision. We are the new era of competitive gaming.
            </p>
          </motion.div>
        </section>

        <section className="py-24 border-t border-zinc-800 relative">
          <div className="absolute top-0 right-0 w-32 h-[1px] bg-cyan-500" />
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
            <div>
              <h2 className="text-4xl font-bold text-white uppercase tracking-tighter flex items-center gap-4 mb-2">
                <Crosshair className="w-8 h-8 text-cyan-500" />
                Live Leaderboard
              </h2>
              <p className="text-sm text-zinc-500 uppercase tracking-widest">Global Rank Tracking System</p>
            </div>
            <button
              onClick={simulateMatch}
              disabled={isSimulating}
              className="group relative px-6 py-3 bg-zinc-900 border border-zinc-700 hover:border-cyan-500 text-sm uppercase tracking-widest transition-colors disabled:opacity-50 overflow-hidden rounded-none"
            >
              <div className="absolute inset-0 bg-cyan-500/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
              <span className="relative z-10 flex items-center gap-2 font-bold text-white group-hover:text-cyan-400 transition-colors">
                <RefreshCw className={`w-4 h-4 ${isSimulating ? "animate-spin text-cyan-500" : ""}`} />
                {isSimulating ? "Computing..." : "Simulate Match"}
              </span>
            </button>
          </div>

          <div className="bg-zinc-900/50 border border-zinc-800 backdrop-blur-sm rounded-none">
            <div className="grid grid-cols-12 gap-4 p-4 border-b border-zinc-800 text-xs text-zinc-500 uppercase tracking-widest">
              <div className="col-span-2 md:col-span-1">Rank</div>
              <div className="col-span-5 md:col-span-4">Callsign</div>
              <div className="col-span-5 md:col-span-3">Role</div>
              <div className="col-span-6 md:col-span-2 text-left md:text-right mt-4 md:mt-0 hidden md:block">K/D Ratio</div>
              <div className="col-span-6 md:col-span-2 text-left md:text-right mt-4 md:mt-0 hidden md:block">Score</div>
            </div>
            <div className="flex flex-col relative overflow-hidden">
              {leaderboard.map((player, index) => (
                <motion.div
                  layout
                  initial={false}
                  key={player.id}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  className="grid grid-cols-12 gap-4 p-4 border-b border-zinc-800/50 items-center hover:bg-zinc-800/50 transition-colors group"
                >
                  <div className="col-span-2 md:col-span-1 font-black text-cyan-500 text-xl">0{index + 1}</div>
                  <div className="col-span-5 md:col-span-4 text-white font-bold text-lg md:text-xl tracking-wider group-hover:text-cyan-400 transition-colors">{player.name}</div>
                  <div className="col-span-5 md:col-span-3 text-xs tracking-widest text-zinc-400 border border-zinc-700 px-2 py-1 w-max rounded-none">{player.role}</div>
                  <div className="col-span-6 md:col-span-2 text-left md:text-right font-bold text-red-400 mt-2 md:mt-0"><span className="md:hidden text-zinc-600 text-xs mr-2">K/D</span>{player.kd}</div>
                  <div className="col-span-6 md:col-span-2 text-left md:text-right font-bold text-white mt-2 md:mt-0"><span className="md:hidden text-zinc-600 text-xs mr-2">SCR</span>{player.score}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 border-t border-zinc-800">
          <div className="mb-12">
            <h2 className="text-4xl font-bold text-white uppercase tracking-tighter flex items-center gap-4 mb-2">
              <Cpu className="w-8 h-8 text-cyan-500" />
              Core Roster
            </h2>
            <p className="text-sm text-zinc-500 uppercase tracking-widest">Alpha Squad Operatives</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {roster.map((member, idx) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: idx * 0.2 }}
                className="group relative border border-zinc-800 hover:border-cyan-500 transition-colors p-2 bg-zinc-900/30 rounded-none cursor-crosshair"
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-zinc-900 mb-4 rounded-none">
                  <div className="absolute inset-0 bg-cyan-500/20 mix-blend-overlay z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  <img
                    src={member.img}
                    alt={member.name}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                  />
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
      </main>

      <footer className="border-t border-zinc-800 bg-zinc-950 relative z-10">
        <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <Terminal className="w-5 h-5 text-zinc-500" />
            <span className="text-lg font-bold tracking-tighter text-zinc-400">NEXUS<span className="text-zinc-600">.GG</span></span>
          </div>
          <div className="text-xs text-zinc-600 tracking-widest text-center md:text-left flex flex-col gap-1">
            <span>[SYS_MSG] ALL SYSTEMS OPTIMAL</span>
            <span>DATA INTEGRITY: 100%</span>
          </div>
          <div className="text-xs text-zinc-600 tracking-widest flex flex-wrap justify-center items-center gap-4">
            <span className="hover:text-cyan-500 cursor-pointer transition-colors">TWITTER</span>
            <span className="hover:text-cyan-500 cursor-pointer transition-colors">DISCORD</span>
            <span className="hover:text-cyan-500 cursor-pointer transition-colors">TWITCH</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
