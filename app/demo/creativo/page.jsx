"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, ArrowRight, Play, Eye, Maximize2, MoveRight, Instagram, Twitter, Linkedin, Dribbble, Download } from "lucide-react";
import DemoLayout from "@/components/DemoLayout";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// Dummy Data
const works = [
  { id: "01", title: "Neon Genesis", category: "Art Direction", year: "2026", img: "/images/demo/creativo/1.jpg", desc: "A surreal exploration of futuristic landscapes and neon-lit dystopian aesthetics." },
  { id: "02", title: "Echoes", category: "Digital Art", year: "2025", img: "/images/demo/creativo/2.jpg", desc: "Interactive WebGL experience focusing on audio-reactive visual generators." },
  { id: "03", title: "Void Space", category: "3D Motion", year: "2025", img: "/images/demo/creativo/3.jpg", desc: "Cinema4D and Octane renders exploring minimal spaces and brutalist architecture." },
  { id: "04", title: "Metamorphosis", category: "Brand Identity", year: "2024", img: "/images/demo/creativo/4.jpg", desc: "Complete visual rebrand for a modern contemporary art museum in Berlin." },
  { id: "05", title: "Chroma", category: "Typography", year: "2024", img: "/images/demo/creativo/5.jpg", desc: "Custom variable font design tailored for high-impact editorial layouts." },
  { id: "06", title: "Flux", category: "Web Design", year: "2023", img: "/images/demo/creativo/6.jpg", desc: "Awwwards SOTD winning portfolio for an independent fashion label." },
];

const expertise = [
  "Art Direction", "Creative Coding", "3D Animation", "UI/UX Design", "Typography", "Motion Graphics", "WebXR"
];

const experience = [
  { role: "Senior Designer", company: "Studio Nul", time: "2023 - Present" },
  { role: "Art Director", company: "Freelance", time: "2021 - 2023" },
  { role: "Digital Designer", company: "Wedge", time: "2019 - 2021" },
  { role: "Junior UI", company: "Pentagram", time: "2018 - 2019" },
];

export default function CreativoDemo() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState("default");
  
  useEffect(() => {
    const mouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", mouseMove);
    return () => window.removeEventListener("mousemove", mouseMove);
  }, []);

  const variants = {
    default: { x: mousePosition.x - 10, y: mousePosition.y - 10, height: 20, width: 20, backgroundColor: "#ccff00", mixBlendMode: "difference" },
    project: { x: mousePosition.x - 40, y: mousePosition.y - 40, height: 80, width: 80, backgroundColor: "#fff", mixBlendMode: "normal" },
    text: { x: mousePosition.x - 10, y: mousePosition.y - 10, height: 20, width: 20, backgroundColor: "#fff", mixBlendMode: "difference", scale: 2 }
  };

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  const textScrollRef = useRef(null);
  const { scrollYProgress: textProgress } = useScroll({ target: textScrollRef, offset: ["start end", "end start"] });
  const textX = useTransform(textProgress, [0, 1], ["0%", "-50%"]);
  const textX2 = useTransform(textProgress, [0, 1], ["-50%", "0%"]);

  const galleryRef = useRef(null);
  const { scrollYProgress: galleryProgress } = useScroll({ target: galleryRef });
  const galleryX = useTransform(galleryProgress, [0, 1], ["0%", "-60%"]);

  return (
    <DemoLayout title="Creativo — Artist Portfolio">
      <div className="bg-[#0f0f0f] text-[#f4f4f0] font-sans overflow-x-hidden md:cursor-none selection:bg-[#ccff00] selection:text-black">
        
        {/* Progress Bar */}
        <motion.div className="fixed top-0 left-0 right-0 h-1 bg-[#ccff00] origin-left z-[100]" style={{ scaleX }} />

        {/* Custom Cursor */}
        <motion.div
          className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] flex items-center justify-center text-black font-bold text-xs uppercase tracking-widest"
          variants={variants}
          animate={cursorVariant}
          transition={{ type: "tween", ease: "backOut", duration: 0.1 }}
        >
          {cursorVariant === "project" && "VIEW"}
        </motion.div>

        {/* Navigation */}
        <nav className="fixed top-0 w-full p-6 md:p-10 flex justify-between items-center z-50 mix-blend-difference">
          <Link href="/" className="font-mono text-sm uppercase tracking-widest font-bold hover:text-[#ccff00] transition-colors"
            onMouseEnter={() => setCursorVariant("text")} onMouseLeave={() => setCursorVariant("default")}>
            K. Nakamura
          </Link>
          <div className="flex gap-6 font-mono text-xs uppercase tracking-widest font-bold hidden md:flex">
            {["Work", "About", "Contact"].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-[#ccff00] transition-colors"
                onMouseEnter={() => setCursorVariant("text")} onMouseLeave={() => setCursorVariant("default")}>
                {item}
              </a>
            ))}
          </div>
        </nav>

        {/* 1. HERO SECTION */}
        <section className="min-h-screen relative pt-32 px-6 md:px-10 flex flex-col justify-center pb-20">
          <div className="max-w-[90vw]">
            <motion.h1 
              className="text-[clamp(4rem,15vw,14rem)] font-black uppercase leading-[0.8] tracking-tighter"
              initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1, ease: "easeOut" }}
            >
              Creative
            </motion.h1>
            <motion.h1 
              className="text-[clamp(4rem,15vw,14rem)] font-black uppercase leading-[0.8] tracking-tighter text-transparent stroke-text"
              style={{ WebkitTextStroke: "2px #f4f4f0" }}
              initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            >
              Developer
            </motion.h1>
            <motion.h1 
              className="text-[clamp(4rem,15vw,14rem)] font-black uppercase leading-[0.8] tracking-tighter text-[#ccff00] md:ml-[10vw]"
              initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
            >
              & Artist.
            </motion.h1>
          </div>

          <div className="absolute bottom-10 left-6 right-6 md:left-10 md:right-10 flex flex-col md:flex-row justify-between items-start md:items-end font-mono text-xs md:text-sm uppercase tracking-widest gap-6 border-t border-white/20 pt-6">
            <p className="max-w-md text-white/50 leading-relaxed">
              Based in Tokyo, specializing in immersive digital experiences, 3D motion, and unconventional web design.
            </p>
            <div className="flex gap-4 items-center">
              <span className="w-2 h-2 rounded-full bg-[#ccff00] animate-pulse" />
              <span>Available for freelance</span>
            </div>
            <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="hidden md:block">
              <ArrowUpRight className="w-8 h-8 text-[#ccff00] rotate-45" />
            </motion.div>
          </div>
        </section>

        {/* 2. INFINITE SCROLLING TEXT */}
        <section ref={textScrollRef} className="py-20 md:py-32 overflow-hidden bg-[#ccff00] text-black">
          <motion.div style={{ x: textX }} className="whitespace-nowrap flex text-7xl md:text-9xl font-black uppercase tracking-tighter mb-4">
            <span className="mx-8">Digital Art</span><span className="mx-8">✸</span>
            <span className="mx-8">Creative Coding</span><span className="mx-8">✸</span>
            <span className="mx-8">WebXR</span><span className="mx-8">✸</span>
            <span className="mx-8">Digital Art</span><span className="mx-8">✸</span>
          </motion.div>
          <motion.div style={{ x: textX2 }} className="whitespace-nowrap flex text-7xl md:text-9xl font-black uppercase tracking-tighter text-transparent" style={{ WebkitTextStroke: "2px #000" }}>
            <span className="mx-8">Typography</span><span className="mx-8">✸</span>
            <span className="mx-8">3D Motion</span><span className="mx-8">✸</span>
            <span className="mx-8">Brutalism</span><span className="mx-8">✸</span>
            <span className="mx-8">Typography</span><span className="mx-8">✸</span>
          </motion.div>
        </section>

        {/* 3. HORIZONTAL GALLERY */}
        <section id="work" ref={galleryRef} className="h-[400vh] relative">
          <div className="sticky top-0 h-screen flex items-center overflow-hidden py-20 bg-[#0f0f0f]">
            <div className="absolute top-10 left-6 md:left-10 z-10">
              <h2 className="font-mono text-sm uppercase tracking-widest text-[#ccff00]">Selected Works (23-26)</h2>
            </div>
            <motion.div style={{ x: galleryX }} className="flex gap-10 md:gap-20 px-6 md:px-32">
              {works.map((work, i) => (
                <div key={work.id} className="w-[80vw] md:w-[45vw] flex-shrink-0 relative group">
                  <motion.div 
                    className="relative aspect-[4/3] overflow-hidden rounded-sm"
                    onMouseEnter={() => setCursorVariant("project")} 
                    onMouseLeave={() => setCursorVariant("default")}
                  >
                    <img src={work.img} alt={work.title} className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700" />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                  </motion.div>
                  <div className="mt-8 grid grid-cols-2 gap-4 border-t border-white/20 pt-4">
                    <div>
                      <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tighter">{work.title}</h3>
                      <p className="font-mono text-xs uppercase tracking-widest text-white/50 mt-2">{work.category}</p>
                    </div>
                    <div className="text-right">
                      <span className="font-mono text-sm">{work.id} / {work.year}</span>
                      <p className="font-mono text-[10px] uppercase tracking-widest text-white/40 mt-2 text-right">{work.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* 4. ABOUT / BENTO GRID */}
        <section id="about" className="py-32 px-6 md:px-10 bg-[#151515]">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter mb-16 text-center">About the <span className="text-[#ccff00]">Artist</span></h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 bg-[#0a0a0a] p-10 rounded-3xl flex flex-col justify-center border border-white/5">
                <p className="text-2xl md:text-4xl font-serif italic text-white/80 leading-snug">
                  "I blur the lines between design and engineering, creating experiences that feel less like websites and more like interactive art pieces."
                </p>
                <div className="mt-12 flex items-center gap-4">
                  <img src="/images/demo/creativo/hero.jpg" alt="Profile" className="w-16 h-16 rounded-full object-cover grayscale" />
                  <div>
                    <h4 className="font-mono text-sm font-bold uppercase tracking-widest text-[#ccff00]">K. Nakamura</h4>
                    <p className="font-mono text-xs text-white/40">Founder & Independent Dev</p>
                  </div>
                </div>
              </div>

              <div className="bg-[#ccff00] text-black p-10 rounded-3xl flex flex-col justify-between">
                <h3 className="font-black uppercase tracking-tighter text-4xl mb-6">Expertise</h3>
                <div className="flex flex-wrap gap-2">
                  {expertise.map((skill, i) => (
                    <span key={i} className="border border-black px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-[#0a0a0a] p-10 rounded-3xl border border-white/5">
                <h3 className="font-black uppercase tracking-tighter text-3xl mb-8 text-[#ccff00]">Experience</h3>
                <div className="space-y-6">
                  {experience.map((exp, i) => (
                    <div key={i} className="flex justify-between items-start border-b border-white/10 pb-4">
                      <div>
                        <h4 className="font-bold text-sm uppercase">{exp.role}</h4>
                        <p className="font-mono text-xs text-white/50">{exp.company}</p>
                      </div>
                      <span className="font-mono text-xs text-white/30">{exp.time}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="md:col-span-2 bg-[url('/images/demo/creativo/1.jpg')] bg-cover bg-center rounded-3xl relative overflow-hidden group">
                <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-colors duration-500" />
                <div className="relative p-10 h-full flex flex-col justify-end">
                  <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">Download <br/> Resume</h3>
                  <button className="mt-6 w-12 h-12 rounded-full bg-[#ccff00] text-black flex items-center justify-center hover:scale-110 transition-transform">
                    <Download size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. AWARDS & RECOGNITION */}
        <section className="py-32 px-6 md:px-10 border-y border-white/10">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-20">
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter md:w-1/3">Awards & <br/><span className="text-[#ccff00]">Press</span></h2>
            <div className="md:w-2/3 flex flex-col w-full">
              {[
                { y: "2026", t: "Site of the Month", o: "Awwwards" },
                { y: "2025", t: "Developer Award", o: "Awwwards" },
                { y: "2025", t: "FWA of the Day", o: "FWA" },
                { y: "2024", t: "Best Visual Design", o: "Webby Awards" },
                { y: "2024", t: "Site of the Day", o: "CSS Design Awards" },
              ].map((a, i) => (
                <div key={i} className="flex justify-between items-center py-6 border-b border-white/10 group hover:border-[#ccff00] transition-colors"
                  onMouseEnter={() => setCursorVariant("text")} onMouseLeave={() => setCursorVariant("default")}>
                  <div className="flex items-center gap-8">
                    <span className="font-mono text-xs text-white/40">{a.y}</span>
                    <h4 className="text-xl md:text-2xl font-bold uppercase tracking-tight group-hover:text-[#ccff00] transition-colors">{a.t}</h4>
                  </div>
                  <span className="font-mono text-xs uppercase tracking-widest text-white/60">{a.o}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. MANIFESTO VIDEO / IMAGE BANNER */}
        <section className="h-[60vh] w-full relative overflow-hidden group">
          <img src="/images/demo/creativo/5.jpg" alt="Manifesto" className="w-full h-full object-cover filter grayscale group-hover:scale-105 transition-transform duration-[2s]" />
          <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center p-6">
             <h2 className="text-[clamp(2rem,6vw,5rem)] font-black uppercase tracking-tighter max-w-4xl leading-tight">
               "Design is not just what it looks like and feels like. <br/> Design is how it <span className="text-[#ccff00]">works</span>."
             </h2>
             <p className="font-mono text-xs uppercase tracking-widest text-white/50 mt-8">— Steve Jobs</p>
          </div>
        </section>

        {/* 7. CONTACT / FOOTER */}
        <footer id="contact" className="pt-32 pb-10 px-6 md:px-10 bg-[#0f0f0f]">
          <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
            <motion.h2 
              className="text-[clamp(3rem,10vw,10rem)] font-black uppercase tracking-tighter leading-none hover:text-[#ccff00] transition-colors duration-500"
              onMouseEnter={() => setCursorVariant("text")} onMouseLeave={() => setCursorVariant("default")}
            >
              Let's Talk
            </motion.h2>
            <a href="mailto:hello@creativo.studio" className="mt-10 border border-white/20 rounded-full px-10 py-5 font-mono text-sm uppercase tracking-widest font-bold hover:bg-[#ccff00] hover:text-black hover:border-transparent transition-all duration-300"
              onMouseEnter={() => setCursorVariant("text")} onMouseLeave={() => setCursorVariant("default")}>
              hello@creativo.studio
            </a>
          </div>

          <div className="max-w-7xl mx-auto mt-40 grid grid-cols-1 md:grid-cols-2 gap-10 border-t border-white/10 pt-10">
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-white/40 mb-4">Location</p>
              <p className="font-bold text-lg uppercase">Tokyo, Japan</p>
              <p className="text-sm text-white/60">Available for remote work worldwide.</p>
            </div>
            <div className="flex justify-start md:justify-end gap-6">
              {[Instagram, Twitter, Linkedin, Dribbble].map((Icon, i) => (
                <a key={i} href="#" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-colors"
                  onMouseEnter={() => setCursorVariant("text")} onMouseLeave={() => setCursorVariant("default")}>
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          <div className="max-w-7xl mx-auto mt-20 flex justify-between items-center font-mono text-[10px] uppercase tracking-widest text-white/30 border-t border-white/5 pt-6">
            <p>© {new Date().getFullYear()} K. Nakamura</p>
            <p>Built with Next.js & Framer Motion</p>
          </div>
        </footer>
      </div>
    </DemoLayout>
  );
}
