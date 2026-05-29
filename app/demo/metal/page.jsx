"use client";
import React, { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence, useSpring } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import DemoLayout from "@/components/DemoLayout";
import { ArrowLeft, Crosshair, Cpu, Maximize, Activity, Menu, X, ArrowRight, Settings, ShieldAlert, Thermometer, ShieldCheck } from "lucide-react";

function CustomCursor() {
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const moveCursor = (e) => setCursorPos({ x: e.clientX, y: e.clientY });
    const handleMouseOver = (e) => {
      const target = e.target;
      if (target.tagName?.toLowerCase() === 'button' || target.tagName?.toLowerCase() === 'a' || target.closest('.interactable')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);
    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
    }
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 w-6 h-6 border-2 border-[#ff4500] pointer-events-none z-[9999] hidden md:flex items-center justify-center mix-blend-difference"
      animate={{
        x: cursorPos.x - 12,
        y: cursorPos.y - 12,
        scale: isHovering ? 2 : 1,
        rotate: isHovering ? 45 : 0
      }}
      transition={{ type: "tween", ease: "backOut", duration: 0.2 }}
      style={{ borderRadius: isHovering ? "0%" : "50%" }}
    >
      {isHovering && <div className="w-1 h-1 bg-[#ff4500]" />}
    </motion.div>
  );
}

function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 w-full p-4 md:p-6 flex justify-between items-center z-50 bg-[#050505]/90 backdrop-blur-md border-b border-white/5 uppercase tracking-[0.2em] text-sm font-bold text-white">
        <Link href="/" className="flex items-center gap-2 hover:text-[#ff4500] transition-all interactable">
          <ArrowLeft size={16} />
          <span className="hidden sm:inline">Catálogo</span>
        </Link>
        <div className="flex items-center gap-3 border border-white/10 px-4 py-2 bg-black/50">
          <Crosshair size={16} className="text-[#ff4500] animate-spin-slow" />
          <span>TITAN HEAVY IND.</span>
        </div>
        <div className="hidden md:flex gap-8">
          <a href="#" className="hover:text-[#ff4500] transition-colors interactable">Capabilities</a>
          <a href="#" className="hover:text-[#ff4500] transition-colors interactable">Facilities</a>
          <a href="#" className="hover:text-[#ff4500] transition-colors interactable">Contact</a>
        </div>
        <button className="md:hidden text-white interactable" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="fixed inset-0 z-40 bg-[#050505] flex flex-col justify-center items-center gap-8 md:hidden"
          >
            <a href="#" className="text-3xl font-black uppercase tracking-widest text-white hover:text-[#ff4500] transition-colors" onClick={() => setMenuOpen(false)}>Capabilities</a>
            <a href="#" className="text-3xl font-black uppercase tracking-widest text-white hover:text-[#ff4500] transition-colors" onClick={() => setMenuOpen(false)}>Facilities</a>
            <a href="#" className="text-3xl font-black uppercase tracking-widest text-white hover:text-[#ff4500] transition-colors" onClick={() => setMenuOpen(false)}>Contact</a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function HeroSection() {
  const typeWriterText = "ENGINEERING THE METALLURGY OF TOMORROW.";
  
  return (
    <section className="relative min-h-screen flex flex-col justify-center items-start px-6 md:px-12 pt-24 bg-[#050505] overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image src="/images/demo/metal/hero.jpg" alt="Industrial Facility" fill className="object-cover opacity-30 mix-blend-luminosity" priority />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] to-transparent" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz4KPC9zdmc+')] opacity-20 pointer-events-none" />
      </div>
      
      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-start border-l-4 border-[#ff4500] pl-6 md:pl-12">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-4 mb-6"
        >
          <div className="px-3 py-1 bg-[#ff4500]/10 border border-[#ff4500]/30 text-[#ff4500] font-mono text-sm tracking-widest uppercase">
            Protocol: Active
          </div>
          <div className="h-px bg-white/20 w-12 md:w-24" />
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-6xl md:text-8xl lg:text-[10rem] font-black uppercase tracking-tighter leading-[0.85] text-white mb-8"
        >
          FORGING <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-br from-white to-neutral-600">THE FUTURE</span>
        </motion.h1>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="font-mono text-sm sm:text-base text-[#ff4500] tracking-[0.2em] uppercase max-w-xl"
        >
          {typeWriterText}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-12 flex flex-wrap gap-6"
        >
          <button className="interactable bg-[#ff4500] text-black px-8 py-4 font-black uppercase tracking-widest hover:bg-white transition-colors flex items-center gap-3">
            Explore Capabilities <ArrowRight size={20} />
          </button>
          <button className="interactable bg-transparent border border-white/20 text-white px-8 py-4 font-bold uppercase tracking-widest hover:bg-white/5 transition-colors">
            View Specs
          </button>
        </motion.div>
      </div>
    </section>
  );
}

function LiveTelemetry() {
  const [temp, setTemp] = useState(1250);
  const [pressure, setPressure] = useState(48.2);
  const [power, setPower] = useState(840);

  useEffect(() => {
    const interval = setInterval(() => {
      setTemp(p => p + (Math.random() > 0.5 ? 1 : -1) * Math.floor(Math.random() * 8));
      setPressure(p => Number((p + (Math.random() > 0.5 ? 0.1 : -0.1)).toFixed(1)));
      setPower(p => p + (Math.random() > 0.5 ? 2 : -2));
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-8 bg-[#050505] border-y border-white/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
          <div className="bg-[#0a0a0a] border border-white/5 p-6 flex items-center justify-between group">
            <div>
              <div className="flex items-center gap-2 text-neutral-500 font-mono text-xs uppercase mb-2">
                <Thermometer size={14} /> Core Temperature
              </div>
              <div className="text-4xl font-black text-white font-mono">{temp}°C</div>
            </div>
            <div className="h-16 w-16 rounded-full border-4 border-[#ff4500]/20 border-t-[#ff4500] animate-spin-slow" />
          </div>
          <div className="bg-[#0a0a0a] border border-white/5 p-6 flex items-center justify-between group">
            <div>
              <div className="flex items-center gap-2 text-neutral-500 font-mono text-xs uppercase mb-2">
                <Activity size={14} /> Hydraulic Pressure
              </div>
              <div className="text-4xl font-black text-white font-mono">{pressure} PSI</div>
            </div>
            <div className="h-12 w-full max-w-[100px] flex items-end gap-1">
              {[1,2,3,4,5].map(i => (
                <motion.div 
                  key={i} 
                  animate={{ height: ["20%", "100%", "20%"] }} 
                  transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                  className="w-full bg-[#ff4500]/50" 
                />
              ))}
            </div>
          </div>
          <div className="bg-[#0a0a0a] border border-white/5 p-6 flex items-center justify-between group">
            <div>
              <div className="flex items-center gap-2 text-neutral-500 font-mono text-xs uppercase mb-2">
                <Cpu size={14} /> Power Output
              </div>
              <div className="text-4xl font-black text-white font-mono">{power} MW</div>
            </div>
            <div className="text-emerald-500 font-mono text-sm border border-emerald-500/30 px-2 py-1 bg-emerald-500/10">STABLE</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CapabilitiesSection() {
  const items = [
    { title: "5-Axis CNC Machining", img: "/images/demo/metal/1.jpg", desc: "Sub-millimeter precision for complex aerospace and automotive components." },
    { title: "Robotic Welding", img: "/images/demo/metal/2.jpg", desc: "Automated TIG/MIG welding ensuring perfect structural integrity and consistency." },
    { title: "Custom Extrusion", img: "/images/demo/metal/3.jpg", desc: "High-pressure extrusion for custom aluminum and titanium profiles." },
    { title: "Thermal Treatment", img: "/images/demo/metal/4.jpg", desc: "Advanced tempering and annealing processes to maximize material strength." }
  ];

  return (
    <section className="py-32 bg-[#050505] relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div>
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-white mb-4">Industrial<br/>Capabilities</h2>
            <p className="text-neutral-400 font-mono max-w-xl text-sm leading-relaxed">
              Our 500,000 sq ft facility houses state-of-the-art manufacturing equipment capable of handling the most demanding industrial requirements.
            </p>
          </div>
          <button className="interactable text-[#ff4500] font-mono font-bold uppercase flex items-center gap-2 border border-[#ff4500] px-6 py-3 hover:bg-[#ff4500] hover:text-black transition-colors">
            View Equipment List <ArrowRight size={16} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {items.map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative aspect-video md:aspect-[4/3] bg-neutral-900 overflow-hidden border border-white/10"
            >
              <Image src={item.img} alt={item.title} fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 opacity-60 group-hover:opacity-100" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 p-8 w-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <div className="flex items-center gap-3 text-[#ff4500] font-mono text-sm mb-2">
                  <Settings size={16} /> Process 0{i+1}
                </div>
                <h3 className="text-2xl md:text-3xl font-bold uppercase text-white mb-2">{item.title}</h3>
                <p className="text-neutral-400 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 max-w-md">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function BlueprintSection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const pathLength = useTransform(scrollYProgress, [0.2, 0.8], [0, 1]);

  return (
    <section ref={containerRef} className="py-32 border-y border-white/10 bg-[#0a0a0a] relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_white_1px,_transparent_1px)] bg-[size:32px_32px]" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <div className="inline-flex items-center gap-2 border border-[#ff4500]/30 bg-[#ff4500]/10 text-[#ff4500] px-4 py-1.5 font-mono text-xs uppercase tracking-widest mb-8">
            <ShieldAlert size={14} /> Structural Analysis
          </div>
          <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-white mb-8">
            Architectural<br />DNA
          </h2>
          <p className="text-neutral-400 font-mono leading-relaxed mb-8 text-justify">
            Tolerances are not optional; they are a strict requirement in our heavy manufacturing workflow. We analyze, simulate, and stress-test every component digitally before a single cut is made. Our proprietary engineering models predict thermal expansion and structural weaknesses with 99.9% accuracy.
          </p>
          <ul className="space-y-4 font-mono text-sm text-neutral-300 uppercase">
            <li className="flex items-center gap-4 border-b border-white/5 pb-2">
              <span className="text-[#ff4500] font-bold">01.</span> Digital Twin Simulation
            </li>
            <li className="flex items-center gap-4 border-b border-white/5 pb-2">
              <span className="text-[#ff4500] font-bold">02.</span> Finite Element Analysis
            </li>
            <li className="flex items-center gap-4 border-b border-white/5 pb-2">
              <span className="text-[#ff4500] font-bold">03.</span> Material Stress Testing
            </li>
          </ul>
        </div>
        
        <div className="relative w-full aspect-square border border-[#ff4500]/20 bg-black/50 p-8 flex justify-center items-center overflow-hidden">
          <svg viewBox="0 0 100 100" className="w-full h-full relative z-10 drop-shadow-[0_0_8px_rgba(255,69,0,0.5)]" fill="none" stroke="#ff4500" strokeWidth="0.5">
            <motion.path d="M10,10 L90,10 L90,90 L10,90 Z" style={{ pathLength }} />
            <motion.path d="M10,50 L90,50" style={{ pathLength }} />
            <motion.path d="M50,10 L50,90" style={{ pathLength }} />
            <motion.circle cx="50" cy="50" r="30" style={{ pathLength }} />
            <motion.path d="M20,20 L80,80" style={{ pathLength }} />
            <motion.path d="M80,20 L20,80" style={{ pathLength }} />
            <motion.circle cx="50" cy="50" r="15" strokeDasharray="2,2" style={{ pathLength }} />
            <motion.rect x="30" y="30" width="40" height="40" style={{ pathLength }} />
          </svg>
          <div className="absolute top-4 left-4 font-mono text-xs text-[#ff4500] uppercase">
            Schematic X-99
          </div>
          <div className="absolute bottom-4 right-4 font-mono text-xs text-neutral-500 uppercase">
            Render Status: 100%
          </div>
        </div>
      </div>
    </section>
  );
}

function GlobalScale() {
  return (
    <section className="py-32 bg-[#050505]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-white mb-4">Production at Scale</h2>
          <p className="text-neutral-500 font-mono uppercase">Delivering industrial materials globally</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {[
            { v: "2.4M", l: "Tons of Steel" },
            { v: "150+", l: "Global Partners" },
            { v: "45", l: "Years Active" },
            { v: "0.01", l: "Defect Rate (%)" }
          ].map((s, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-[#0a0a0a] border border-white/10 p-8 text-center hover:border-[#ff4500] transition-colors"
            >
              <div className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tighter">{s.v}</div>
              <div className="text-[#ff4500] font-mono text-sm uppercase tracking-widest">{s.l}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialSection() {
  return (
    <section className="py-32 border-t border-white/10 bg-[#0a0a0a] relative">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-16">
        <div className="md:w-1/3 relative aspect-square border border-white/10">
           <Image src="/images/demo/metal/5.jpg" alt="Partner" fill className="object-cover grayscale" />
        </div>
        <div className="md:w-2/3">
          <ShieldCheck size={48} className="text-[#ff4500] mb-8" />
          <p className="text-2xl md:text-4xl font-bold uppercase leading-snug text-white mb-8">
            "Titan Precision's custom titanium alloys reduced our aerospace components weight by 14% while exceeding all structural stress tests. They are unparalleled in heavy manufacturing."
          </p>
          <div className="font-mono">
            <div className="text-white font-bold text-lg">J. ROBERTSON</div>
            <div className="text-neutral-500 text-sm uppercase mt-1">Lead Engineer, AeroDynamics Corp</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-[#050505] border-t-4 border-[#ff4500] pt-24 pb-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-16 mb-16">
        <div className="max-w-md">
          <h3 className="text-3xl font-black uppercase tracking-tighter text-white mb-6">TITAN HEAVY IND.</h3>
          <p className="text-neutral-500 font-mono text-sm leading-relaxed mb-8">
            Global leaders in heavy metallurgy, custom fabrication, and structural engineering. Built to last.
          </p>
          <button className="interactable bg-[#ff4500] text-black px-6 py-3 font-bold uppercase tracking-widest hover:bg-white transition-colors w-full sm:w-auto">
            Request Quote
          </button>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-12 font-mono text-sm">
          <div>
            <h4 className="text-white font-bold uppercase mb-6 border-b border-white/20 pb-2">Operations</h4>
            <ul className="space-y-4 text-neutral-400">
              <li><a href="#" className="hover:text-[#ff4500] transition-colors interactable">Capabilities</a></li>
              <li><a href="#" className="hover:text-[#ff4500] transition-colors interactable">Equipment</a></li>
              <li><a href="#" className="hover:text-[#ff4500] transition-colors interactable">Quality Control</a></li>
              <li><a href="#" className="hover:text-[#ff4500] transition-colors interactable">Safety</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold uppercase mb-6 border-b border-white/20 pb-2">Company</h4>
            <ul className="space-y-4 text-neutral-400">
              <li><a href="#" className="hover:text-[#ff4500] transition-colors interactable">About Us</a></li>
              <li><a href="#" className="hover:text-[#ff4500] transition-colors interactable">Careers</a></li>
              <li><a href="#" className="hover:text-[#ff4500] transition-colors interactable">Investors</a></li>
              <li><a href="#" className="hover:text-[#ff4500] transition-colors interactable">News</a></li>
            </ul>
          </div>
          <div className="col-span-2 md:col-span-1">
            <h4 className="text-white font-bold uppercase mb-6 border-b border-white/20 pb-2">Contact</h4>
            <ul className="space-y-4 text-neutral-400">
              <li>1-800-TITAN-ENG</li>
              <li>info@titanheavy.com</li>
              <li>Industrial Park 4, Sector 7<br/>Detroit, MI</li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10 font-mono text-xs uppercase text-neutral-600 gap-4">
        <div>© 2026 Titan Heavy Industries Corp. All rights reserved.</div>
        <div className="flex gap-6">
          <a href="#" className="hover:text-white transition-colors interactable">Terms</a>
          <a href="#" className="hover:text-white transition-colors interactable">Privacy</a>
          <a href="#" className="hover:text-white transition-colors interactable">Sitemap</a>
        </div>
      </div>
    </footer>
  );
}

export default function TitanHeavyInd() {
  return (
    <DemoLayout title="Titan Heavy Industries">
      <CustomCursor />
      <div className="bg-[#050505] text-white font-sans selection:bg-[#ff4500] selection:text-white min-h-screen">
        <NavBar />
        <main>
          <HeroSection />
          <LiveTelemetry />
          <CapabilitiesSection />
          <BlueprintSection />
          <GlobalScale />
          <TestimonialSection />
        </main>
        <Footer />
      </div>
    </DemoLayout>
  );
}
