"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowLeft, ArrowUpRight, Eye, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import DemoLayout from "@/components/DemoLayout";

export default function CreativoDemo() {
  const cursorRef = useRef(null);
  const containerRef = useRef(null);
  const cardsRef = useRef([]);
  const [hoverState, setHoverState] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const onMouseMove = (e) => {
      gsap.to(cursorRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.15,
        ease: "power2.out",
      });
    };

    window.addEventListener("mousemove", onMouseMove);

    const mm = gsap.matchMedia();

    mm.add("all", () => {
      const cards = cardsRef.current;
      if (cards.length > 1) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: `+=${cards.length * 100}vh`,
            scrub: 1.5,
            pin: true,
          },
        });

        cards.forEach((card, index) => {
          if (index === 0) return;
          gsap.set(card, { y: window.innerHeight, scale: 0.85, opacity: 0 });
          tl.to(
            cards[index - 1],
            {
              scale: 0.9,
              opacity: 0.3,
              y: -50,
              ease: "none",
            },
            index
          ).to(
            card,
            {
              y: 0,
              scale: 1,
              opacity: 1,
              ease: "none",
            },
            index
          );
        });
      }
    });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      mm.revert();
    };
  }, []);

  const projects = [
    {
      id: 1,
      title: "LUMINA",
      category: "ART DIRECTION",
      year: "2024",
      image: "https://loremflickr.com/1920/1080/abstract?lock=10",
    },
    {
      id: 2,
      title: "AETHER",
      category: "BRAND IDENTITY",
      year: "2025",
      image: "https://loremflickr.com/1920/1080/architecture?lock=21",
    },
    {
      id: 3,
      title: "OBLIVION",
      category: "DIGITAL EXPERIENCE",
      year: "2025",
      image: "https://loremflickr.com/1920/1080/design?lock=35",
    },
    {
      id: 4,
      title: "CHROMA",
      category: "SPATIAL DESIGN",
      year: "2026",
      image: "https://loremflickr.com/1920/1080/minimal?lock=48",
    },
  ];

  return (
    <DemoLayout title="Studio Creativo">
      <div className="text-[#f4f4f0] selection:bg-white selection:text-black font-sans md:cursor-none overflow-x-hidden">
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-8 h-8 -ml-4 -mt-4 rounded-full pointer-events-none z-[9999] mix-blend-difference hidden md:flex items-center justify-center transition-all duration-300"
        style={{
          backgroundColor: hoverState ? "transparent" : "#fff",
          border: hoverState ? "1px solid #fff" : "none",
          transform: hoverState ? "scale(2.5)" : "scale(1)",
        }}
      >
        <AnimatePresence>
          {hoverState && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
            >
              <Eye className="w-4 h-4 text-white mix-blend-difference" strokeWidth={1} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: "0%" }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[90] bg-[#0f0f0f] flex flex-col justify-center items-center md:hidden"
          >
            <nav className="flex flex-col gap-8 text-center">
              <Link href="/" className="text-4xl font-serif uppercase tracking-tighter active:scale-95 transition-transform" onClick={() => setMenuOpen(false)}>Home</Link>
              <Link href="#" className="text-4xl font-serif uppercase tracking-tighter active:scale-95 transition-transform" onClick={() => setMenuOpen(false)}>Work</Link>
              <Link href="#" className="text-4xl font-serif uppercase tracking-tighter active:scale-95 transition-transform" onClick={() => setMenuOpen(false)}>Studio</Link>
              <Link href="#" className="text-4xl font-serif uppercase tracking-tighter active:scale-95 transition-transform" onClick={() => setMenuOpen(false)}>Contact</Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <nav className="fixed top-0 left-0 w-full p-4 md:p-10 flex justify-between items-center md:items-start z-[100] pointer-events-none mix-blend-difference">
        <div className="pointer-events-auto opacity-0">
          <Link
            href="/"
            className="group flex items-center gap-2 md:gap-3 text-[10px] md:text-sm font-mono uppercase tracking-widest active:scale-95 md:active:scale-100 transition-transform md:hover:opacity-70"
            onMouseEnter={() => setHoverState(true)}
            onMouseLeave={() => setHoverState(false)}
          >
            <div className="w-8 h-8 md:w-8 md:h-8 rounded-full border border-white/20 flex items-center justify-center md:group-hover:bg-white md:group-hover:text-black transition-colors">
              <ArrowLeft className="w-4 h-4 md:w-4 md:h-4" />
            </div>
            <span className="hidden md:inline">Catálogo</span>
          </Link>
        </div>
        
        <div className="md:hidden pointer-events-auto">
          <button 
            onClick={() => setMenuOpen(!menuOpen)}
            className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center active:scale-90 transition-transform"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        <div className="hidden md:block text-right pointer-events-auto font-mono text-[10px] md:text-xs uppercase tracking-[0.2em] leading-relaxed text-white/50">
          <p>EST. 2026</p>
          <p>MADRID — TOKYO</p>
        </div>
      </nav>

      <section className="min-h-[80vh] md:h-screen w-full flex flex-col justify-center px-4 md:px-20 pt-32 md:pt-20">
        <h1 className="font-serif text-[clamp(3rem,18vw,12rem)] leading-[0.85] tracking-tighter uppercase break-words">
          Studio <br /> <span className="italic pl-4 md:pl-[10vw] text-white/80">Creativo</span>
        </h1>
        <div className="mt-12 md:mt-12 flex flex-col md:flex-row justify-between items-start md:items-end border-t border-white/20 pt-6 gap-6 md:gap-0">
          <p className="font-mono text-[10px] md:text-sm uppercase tracking-widest max-w-sm text-white/60">
            Pushing boundaries of digital experiences. Scroll to explore the archive.
          </p>
          <ArrowUpRight className="w-6 h-6 md:w-8 md:h-8 text-white/40 animate-pulse" />
        </div>
      </section>

      <section ref={containerRef} className="h-screen w-full relative overflow-hidden bg-[#0f0f0f]">
        {projects.map((project, index) => (
          <div
            key={project.id}
            ref={(el) => { if (el) cardsRef.current[index] = el; }}
            className="absolute top-0 left-0 w-full h-full flex items-center justify-center p-4 sm:p-6 md:p-12 will-change-transform"
          >
            <div
              className="relative w-full h-full max-w-[1400px] max-h-[800px] rounded-[2rem] md:rounded-[3rem] overflow-hidden group bg-black"
              onMouseEnter={() => setHoverState(true)}
              onMouseLeave={() => setHoverState(false)}
            >
              <img
                src={project.image}
                alt={project.title}
                className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/80" />
              
              <div className="absolute bottom-0 left-0 w-full p-6 sm:p-8 md:p-16 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 pointer-events-none">
                <div>
                  <div className="flex items-center gap-3 md:gap-4 mb-4">
                    <span className="font-mono text-[9px] md:text-xs uppercase tracking-widest px-3 py-1 border border-white/30 rounded-full backdrop-blur-md bg-black/20">
                      {project.year}
                    </span>
                    <span className="font-mono text-[9px] md:text-xs uppercase tracking-widest text-white/80">
                      {project.category}
                    </span>
                  </div>
                  <h2 className="font-serif text-[clamp(2.5rem,8vw,6rem)] tracking-tighter text-white uppercase leading-none">
                    {project.title}
                  </h2>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>

      <footer className="h-[60vh] md:h-screen flex flex-col items-center justify-center bg-[#050505] relative z-10 text-center px-4">
        <h3 className="font-serif text-[clamp(2.5rem,8vw,6rem)] leading-none tracking-tight mb-10">
          Ready to create <br className="md:hidden" /><span className="italic text-white/60">magic?</span>
        </h3>
        <button
          className="font-mono text-[10px] md:text-xs uppercase tracking-[0.2em] px-8 md:px-8 py-4 border border-white/20 rounded-full active:scale-95 md:hover:bg-white md:hover:text-black transition-all duration-300"
          onMouseEnter={() => setHoverState(true)}
          onMouseLeave={() => setHoverState(false)}
        >
          Initiate Sequence
        </button>
      </footer>
      </div>
    </DemoLayout>
  );
}
