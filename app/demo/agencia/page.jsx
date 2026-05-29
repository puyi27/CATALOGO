"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowDownRight, ArrowRight, X, Menu, Globe, Star, Zap } from "lucide-react";
import DemoLayout from "@/components/DemoLayout";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const projects = [
  { id: 1, client: "ZENITH", type: "Rebrand", year: "2026", img: "/images/demo/agencia/1.jpg" },
  { id: 2, client: "AURA", type: "E-Commerce", year: "2025", img: "/images/demo/agencia/2.jpg" },
  { id: 3, client: "NEXUS", type: "Platform", year: "2025", img: "/images/demo/agencia/3.jpg" },
  { id: 4, client: "VERTEX", type: "Campaign", year: "2024", img: "/images/demo/agencia/4.jpg" },
  { id: 5, client: "CHROMA", type: "Identity", year: "2024", img: "/images/demo/agencia/5.jpg" },
];

const services = [
  { num: "01", title: "STRATEGY", desc: "Brand positioning, user research, and comprehensive digital roadmaps to ensure long-term market dominance." },
  { num: "02", title: "IDENTITY", desc: "Crafting memorable visual systems, typography, and brand guidelines that resonate with your core audience." },
  { num: "03", title: "DIGITAL", desc: "High-performance web applications, immersive 3D experiences, and e-commerce platforms built for scale." },
  { num: "04", title: "CONTENT", desc: "Art direction, 3D motion design, and copywriting that tells a cohesive story across all touchpoints." },
];

export default function AgenciaDemo() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const { scrollYProgress } = useScroll();
  const yHero = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  
  // Horizontal scroll
  const targetRef = useRef(null);
  const { scrollYProgress: scrollHorizontal } = useScroll({
    target: targetRef,
  });
  const xProjects = useTransform(scrollHorizontal, [0, 1], ["0%", "-80%"]);

  return (
    <DemoLayout title="Agencia — Creative & Bold">
      <div className="bg-[#e3e3e3] text-[#111] font-sans selection:bg-[#111] selection:text-[#e3e3e3] overflow-hidden cursor-none">
        
        {/* Custom Cursor */}
        <motion.div 
          className="fixed top-0 left-0 w-6 h-6 bg-[#111] rounded-full pointer-events-none z-[100] mix-blend-difference flex items-center justify-center"
          animate={{
            x: mousePosition.x - 12,
            y: mousePosition.y - 12,
            scale: isHovered ? 3 : 1,
          }}
          transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.5 }}
        >
          {isHovered && <span className="text-[4px] text-[#e3e3e3] uppercase font-bold tracking-widest">View</span>}
        </motion.div>

        {/* Header */}
        <header className="fixed top-0 w-full p-6 md:p-10 flex justify-between items-center z-50 mix-blend-difference text-[#e3e3e3]">
          <Link href="/" className="font-bold text-xl uppercase tracking-tighter"
            onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
            AGENCIA©
          </Link>
          <button 
            onClick={() => setMenuOpen(!menuOpen)}
            className="w-12 h-12 flex items-center justify-center rounded-full border border-[#e3e3e3]/30 hover:bg-[#e3e3e3] hover:text-[#111] transition-colors"
            onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </header>

        {/* Menu Overlay */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div 
              initial={{ clipPath: "circle(0% at 100% 0)" }}
              animate={{ clipPath: "circle(150% at 100% 0)" }}
              exit={{ clipPath: "circle(0% at 100% 0)" }}
              transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
              className="fixed inset-0 bg-[#111] text-[#e3e3e3] z-40 flex flex-col justify-center items-center"
            >
              <nav className="flex flex-col gap-6 text-center">
                {["Work", "Studio", "Services", "Contact"].map((item, i) => (
                  <motion.a 
                    key={item} href={`#${item.toLowerCase()}`}
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 + i * 0.1 }}
                    onClick={() => setMenuOpen(false)}
                    className="text-6xl md:text-8xl font-black uppercase tracking-tighter hover:italic hover:text-red-500 transition-all"
                    onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}
                  >
                    {item}
                  </motion.a>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>

        {/* HERO SECTION */}
        <section className="relative h-screen w-full flex items-end p-6 md:p-10 pb-20 overflow-hidden">
          <motion.div style={{ y: yHero }} className="absolute inset-0 z-0">
             <img src="/images/demo/agencia/hero.jpg" alt="Hero" className="w-full h-full object-cover filter grayscale opacity-20" />
          </motion.div>
          <div className="relative z-10 w-full flex flex-col justify-end h-full">
            <h1 className="text-[12vw] leading-[0.8] font-black uppercase tracking-tighter flex flex-col">
              <span className="block overflow-hidden"><motion.span initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ duration: 0.8, ease: "circOut" }} className="block">Digital</motion.span></span>
              <span className="block overflow-hidden"><motion.span initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ duration: 0.8, ease: "circOut", delay: 0.1 }} className="block pl-[10vw]">Brutalism</motion.span></span>
              <span className="block overflow-hidden text-red-500"><motion.span initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ duration: 0.8, ease: "circOut", delay: 0.2 }} className="block">Agency</motion.span></span>
            </h1>
            <div className="mt-12 flex flex-col md:flex-row justify-between items-start md:items-end w-full border-t border-[#111]/20 pt-6">
              <p className="max-w-md font-bold text-sm uppercase tracking-widest leading-relaxed">
                We craft brutal, unapologetic digital experiences that break the mold and leave a lasting impact.
              </p>
              <div className="flex gap-4 mt-6 md:mt-0">
                <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest bg-[#111] text-[#e3e3e3] px-4 py-2 rounded-full"><Globe size={14}/> Worldwide</span>
                <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest border border-[#111] px-4 py-2 rounded-full"><Star size={14}/> Awwwards</span>
              </div>
            </div>
          </div>
        </section>

        {/* MARQUEE */}
        <div className="py-6 bg-[#111] text-[#e3e3e3] overflow-hidden flex whitespace-nowrap">
          <motion.div 
            animate={{ x: [0, -1035] }} 
            transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
            className="flex text-4xl md:text-6xl font-black uppercase tracking-tighter"
          >
            <span className="mx-8">Breaking the rules</span><span className="mx-8 text-red-500">✦</span>
            <span className="mx-8">Digital Brutalism</span><span className="mx-8 text-red-500">✦</span>
            <span className="mx-8">Unapologetic Design</span><span className="mx-8 text-red-500">✦</span>
            <span className="mx-8">Breaking the rules</span><span className="mx-8 text-red-500">✦</span>
            <span className="mx-8">Digital Brutalism</span><span className="mx-8 text-red-500">✦</span>
            <span className="mx-8">Unapologetic Design</span><span className="mx-8 text-red-500">✦</span>
          </motion.div>
        </div>

        {/* ABOUT / MANIFESTO */}
        <section id="studio" className="py-32 px-6 md:px-10">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20">
            <div>
              <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-10">
                The <br/> Manifesto
              </h2>
              <div className="space-y-6 text-xl md:text-2xl font-medium leading-tight">
                <p>We don't do pretty. We don't do safe. We build digital products that demand attention.</p>
                <p>Our approach is rooted in structural honesty, raw typography, and high-performance engineering.</p>
                <motion.div 
                  className="w-32 h-32 bg-red-500 rounded-full flex items-center justify-center mt-12 cursor-none"
                  whileHover={{ scale: 1.1, rotate: 15 }}
                  onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}
                >
                  <span className="text-white font-bold uppercase tracking-widest text-xs">Read More</span>
                </motion.div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="aspect-[3/4] bg-gray-300 rounded-2xl overflow-hidden">
                  <img src="/images/demo/agencia/1.jpg" alt="Office" className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-700" />
                </div>
                <div className="aspect-square bg-[#111] text-[#e3e3e3] p-6 rounded-2xl flex flex-col justify-between">
                  <Zap size={32} className="text-red-500" />
                  <span className="text-4xl font-black uppercase">40+</span>
                  <span className="text-xs uppercase tracking-widest font-bold">Awards</span>
                </div>
              </div>
              <div className="space-y-4 pt-12">
                <div className="aspect-square bg-red-500 text-[#111] p-6 rounded-2xl flex flex-col justify-between">
                  <Star size={32} />
                  <span className="text-4xl font-black uppercase">12</span>
                  <span className="text-xs uppercase tracking-widest font-bold">Years</span>
                </div>
                <div className="aspect-[3/4] bg-gray-300 rounded-2xl overflow-hidden">
                  <img src="/images/demo/agencia/2.jpg" alt="Culture" className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-700" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* HORIZONTAL SCROLL PROJECTS */}
        <section id="work" ref={targetRef} className="h-[300vh] relative bg-[#111] text-[#e3e3e3]">
          <div className="sticky top-0 h-screen flex items-center overflow-hidden">
            <div className="absolute top-10 left-10 z-10 mix-blend-difference">
              <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter">Selected<br/>Works</h2>
            </div>
            <motion.div style={{ x: xProjects }} className="flex gap-10 px-10 md:px-[30vw]">
              {projects.map((project, i) => (
                <div key={project.id} className="w-[85vw] md:w-[40vw] flex-shrink-0 relative group">
                  <div 
                    className="aspect-[4/5] overflow-hidden rounded-2xl"
                    onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}
                  >
                    <motion.img 
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.5 }}
                      src={project.img} 
                      alt={project.client} 
                      className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700" 
                    />
                  </div>
                  <div className="mt-6 flex justify-between items-start">
                    <div>
                      <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">{project.client}</h3>
                      <p className="text-sm font-bold uppercase tracking-widest text-red-500 mt-2">{project.type}</p>
                    </div>
                    <span className="text-xl font-bold font-mono">{project.year}</span>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* SERVICES ACCORDION */}
        <section id="services" className="py-32 px-6 md:px-10 bg-[#e3e3e3]">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter mb-20 border-b border-[#111] pb-10">
              Expertise
            </h2>
            <div className="flex flex-col w-full">
              {services.map((s, i) => (
                <div key={i} className="group border-b border-[#111] py-10 hover:bg-[#111] hover:text-[#e3e3e3] transition-colors duration-500 px-6 cursor-none"
                  onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex items-center gap-10">
                      <span className="text-2xl font-mono font-bold text-red-500">{s.num}</span>
                      <h3 className="text-5xl md:text-7xl font-black uppercase tracking-tighter">{s.title}</h3>
                    </div>
                    <p className="max-w-sm text-sm md:text-base font-bold uppercase tracking-widest leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      {s.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* BIG TYPOGRAPHY SEPARATOR */}
        <section className="py-20 md:py-40 bg-red-500 text-[#111] overflow-hidden flex justify-center items-center">
          <h2 className="text-[15vw] font-black uppercase tracking-tighter leading-none hover:scale-105 transition-transform duration-700 text-center">
            NO <br/> EXCUSES
          </h2>
        </section>

        {/* TEAM GRID */}
        <section className="py-32 px-6 md:px-10 bg-[#e3e3e3]">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-end mb-20">
              <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter">The<br/>Cult</h2>
              <p className="text-sm font-bold uppercase tracking-widest max-w-xs text-right">A collective of misfits, artists, and engineers.</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { n: "ALEX", r: "DIRECTOR", img: "/images/demo/agencia/3.jpg" },
                { n: "SAM", r: "DEV", img: "/images/demo/agencia/4.jpg" },
                { n: "JORDAN", r: "DESIGN", img: "/images/demo/agencia/5.jpg" },
                { n: "TAYLOR", r: "MOTION", img: "/images/demo/agencia/6.jpg" }
              ].map((m, i) => (
                <div key={i} className="group relative overflow-hidden rounded-2xl aspect-[3/4]">
                  <img src={m.img} alt={m.n} className="w-full h-full object-cover filter grayscale group-hover:scale-110 group-hover:grayscale-0 transition-all duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-transparent to-transparent opacity-80" />
                  <div className="absolute bottom-6 left-6 text-[#e3e3e3]">
                    <h3 className="text-3xl font-black uppercase tracking-tighter">{m.n}</h3>
                    <p className="text-xs font-bold uppercase tracking-widest text-red-500">{m.r}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer id="contact" className="bg-[#111] text-[#e3e3e3] pt-32 pb-10 px-6 md:px-10">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col items-center text-center mb-32">
              <p className="text-sm font-bold uppercase tracking-widest text-red-500 mb-8">Start a Project</p>
              <h2 className="text-[12vw] font-black uppercase tracking-tighter leading-none hover:italic transition-all duration-300">
                HELLO@<br/>AGENCIA
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-10 border-t border-[#e3e3e3]/20 pt-10">
              <div className="col-span-1 md:col-span-2">
                <p className="text-3xl font-black uppercase tracking-tighter mb-4">AGENCIA©</p>
                <p className="text-sm font-bold uppercase tracking-widest opacity-50 max-w-sm">
                  We are a brutalist design and development studio operating globally from nowhere.
                </p>
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-widest text-red-500 mb-6">Social</h4>
                <ul className="space-y-2 text-sm font-bold uppercase tracking-widest">
                  <li><a href="#" className="hover:text-red-500 transition-colors">Instagram</a></li>
                  <li><a href="#" className="hover:text-red-500 transition-colors">Twitter (X)</a></li>
                  <li><a href="#" className="hover:text-red-500 transition-colors">Awwwards</a></li>
                  <li><a href="#" className="hover:text-red-500 transition-colors">LinkedIn</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-widest text-red-500 mb-6">Offices</h4>
                <ul className="space-y-2 text-sm font-bold uppercase tracking-widest">
                  <li>Tokyo, JP</li>
                  <li>Berlin, DE</li>
                  <li>New York, US</li>
                </ul>
              </div>
            </div>
            <div className="mt-20 flex flex-col md:flex-row justify-between items-center text-xs font-bold uppercase tracking-widest opacity-50">
              <p>© {new Date().getFullYear()} Agencia. All rights reserved.</p>
              <p>Designed with violence.</p>
            </div>
          </div>
        </footer>

      </div>
    </DemoLayout>
  );
}