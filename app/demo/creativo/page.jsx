"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowLeft, ArrowUpRight, Eye } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function CreativoDemo() {
  const cursorRef = useRef(null);
  const containerRef = useRef(null);
  const cardsRef = useRef([]);
  const [hoverState, setHoverState] = useState(false);

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

    const ctx = gsap.context(() => {
      const cards = cardsRef.current;
      if (cards.length > 1) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: `+=${cards.length * 100}vh`,
            scrub: true,
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
              duration: 1,
              ease: "none",
            },
            index
          ).to(
            card,
            {
              y: 0,
              scale: 1,
              opacity: 1,
              duration: 1,
              ease: "none",
            },
            index
          );
        });
      }
    }, containerRef);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      ctx.revert();
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
    <div className="bg-[#0f0f0f] text-[#f4f4f0] min-h-screen selection:bg-white selection:text-black font-sans cursor-none overflow-x-hidden">
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-8 h-8 -ml-4 -mt-4 rounded-full pointer-events-none z-[9999] mix-blend-difference flex items-center justify-center transition-all duration-300"
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

      <nav className="fixed top-0 left-0 w-full p-6 md:p-10 flex justify-between items-start z-50 pointer-events-none">
        <div className="pointer-events-auto">
          <Link
            href="/"
            className="group flex items-center gap-3 text-xs md:text-sm font-mono uppercase tracking-widest hover:opacity-70 transition-opacity"
            onMouseEnter={() => setHoverState(true)}
            onMouseLeave={() => setHoverState(false)}
          >
            <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-colors">
              <ArrowLeft className="w-4 h-4" />
            </div>
            <span>Catálogo</span>
          </Link>
        </div>
        <div className="text-right pointer-events-auto font-mono text-[10px] md:text-xs uppercase tracking-[0.2em] leading-relaxed text-white/50">
          <p>EST. 2026</p>
          <p>MADRID — TOKYO</p>
        </div>
      </nav>

      <section className="h-screen w-full flex flex-col justify-center px-6 md:px-20 pt-20">
        <h1 className="font-serif text-[12vw] leading-[0.8] tracking-tighter uppercase">
          Studio <br /> <span className="italic pl-[10vw] text-white/80">Creativo</span>
        </h1>
        <div className="mt-12 flex justify-between items-end border-t border-white/20 pt-6">
          <p className="font-mono text-xs md:text-sm uppercase tracking-widest max-w-sm text-white/60">
            Pushing boundaries of digital experiences. Scroll to explore the archive.
          </p>
          <ArrowUpRight className="w-8 h-8 text-white/40 animate-pulse" />
        </div>
      </section>

      <section ref={containerRef} className="h-screen w-full relative overflow-hidden bg-[#0f0f0f]">
        {projects.map((project, index) => (
          <div
            key={project.id}
            ref={(el) => { if (el) cardsRef.current[index] = el; }}
            className="absolute top-0 left-0 w-full h-full flex items-center justify-center p-6 md:p-12 will-change-transform"
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
              
              <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 flex flex-col md:flex-row justify-between items-end md:items-end gap-6 pointer-events-none">
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <span className="font-mono text-[10px] md:text-xs uppercase tracking-widest px-3 py-1 border border-white/30 rounded-full backdrop-blur-md bg-black/20">
                      {project.year}
                    </span>
                    <span className="font-mono text-[10px] md:text-xs uppercase tracking-widest text-white/80">
                      {project.category}
                    </span>
                  </div>
                  <h2 className="font-serif text-5xl md:text-8xl tracking-tighter text-white uppercase leading-none">
                    {project.title}
                  </h2>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>

      <footer className="h-[50vh] flex flex-col items-center justify-center bg-[#050505] relative z-10 text-center px-6">
        <h3 className="font-serif text-4xl md:text-6xl tracking-tight mb-8">
          Ready to create <span className="italic text-white/60">magic?</span>
        </h3>
        <button
          className="font-mono text-xs uppercase tracking-[0.2em] px-8 py-4 border border-white/20 rounded-full hover:bg-white hover:text-black transition-colors duration-300"
          onMouseEnter={() => setHoverState(true)}
          onMouseLeave={() => setHoverState(false)}
        >
          Initiate Sequence
        </button>
      </footer>
    </div>
  );
}
