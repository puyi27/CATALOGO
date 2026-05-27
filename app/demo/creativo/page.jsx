"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowLeft, ArrowUpRight, Eye, Menu, X, Award, Layers, Sparkles, Paintbrush, Camera, PenTool } from "lucide-react";
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
            { scale: 0.9, opacity: 0.3, y: -50, ease: "none" },
            index
          ).to(
            card,
            { y: 0, scale: 1, opacity: 1, ease: "none" },
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
    { id: 1, title: "LUMINA", category: "ART DIRECTION", year: "2024", gradient: "from-violet-900 via-fuchsia-900 to-black" },
    { id: 2, title: "AETHER", category: "BRAND IDENTITY", year: "2025", gradient: "from-cyan-900 via-blue-900 to-black" },
    { id: 3, title: "OBLIVION", category: "DIGITAL EXPERIENCE", year: "2025", gradient: "from-amber-900 via-orange-900 to-black" },
    { id: 4, title: "CHROMA", category: "SPATIAL DESIGN", year: "2026", gradient: "from-emerald-900 via-teal-900 to-black" },
  ];

  const capabilities = [
    { icon: Paintbrush, title: "Art Direction", desc: "Conceptualización visual para marcas que buscan un lenguaje propio y reconocible." },
    { icon: Layers, title: "Brand Identity", desc: "Sistemas de identidad completos: logotipos, tipografía, paleta cromática, guidelines." },
    { icon: Camera, title: "Photography", desc: "Dirección fotográfica para campañas, editorial y producto. Analógico y digital." },
    { icon: PenTool, title: "Motion Design", desc: "Animación 2D/3D, motion graphics, intros, transitions. After Effects, Cinema 4D." },
    { icon: Sparkles, title: "Digital Experience", desc: "Webs inmersivas, instalaciones interactivas, experiencias WebGL y Three.js." },
    { icon: Eye, title: "Creative Consulting", desc: "Estrategia creativa, workshops, dirección de proyectos complejos multidisciplinares." },
  ];

  const awards = [
    { title: "Awwwards SOTD", project: "Lumina", year: "2024" },
    { title: "CSS Design Awards", project: "Aether", year: "2025" },
    { title: "FWA of the Day", project: "Oblivion", year: "2025" },
    { title: "European Design Awards", project: "Chroma", year: "2026" },
    { title: "Laus Bronze", project: "Identity System", year: "2024" },
    { title: "ADC Young Guns", project: "—", year: "2023" },
  ];

  const team = [
    { name: "Noé Itsuki", role: "Founder & Creative Director", initials: "NI", loc: "Madrid" },
    { name: "Saki Moriyama", role: "Art Director", initials: "SM", loc: "Tokyo" },
    { name: "Leo Duval", role: "Motion Lead", initials: "LD", loc: "Paris" },
    { name: "Ada Chen", role: "Developer", initials: "AC", loc: "Berlin" },
  ];

  return (
    <DemoLayout title="Studio Creativo">
      <div className="text-[#f4f4f0] selection:bg-white selection:text-black font-sans md:cursor-none overflow-x-hidden bg-[#0f0f0f]">
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
            <motion.div initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0 }}>
              <Eye className="w-4 h-4 text-white mix-blend-difference" strokeWidth={1} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ═══ MOBILE MENU ═══ */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: "0%" }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[90] bg-[#0f0f0f] flex flex-col justify-center items-center md:hidden"
          >
            <button onClick={() => setMenuOpen(false)} className="absolute top-6 right-6"><X className="w-6 h-6" /></button>
            <nav className="flex flex-col gap-8 text-center">
              {["Work", "Capabilities", "Awards", "Studio", "Contact"].map((item, i) => (
                <motion.a key={item} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: i * 0.08 }}
                  href={`#${item.toLowerCase()}`} className="text-4xl font-serif uppercase tracking-tighter active:scale-95 transition-transform"
                  onClick={() => setMenuOpen(false)}>{item}</motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══ NAV ═══ */}
      <nav className="fixed top-0 left-0 w-full p-4 md:p-10 flex justify-between items-center md:items-start z-[100] pointer-events-none mix-blend-difference">
        <div className="pointer-events-auto opacity-0">
          <Link href="/" className="group flex items-center gap-2 md:gap-3 text-[10px] md:text-sm font-mono uppercase tracking-widest"
            onMouseEnter={() => setHoverState(true)} onMouseLeave={() => setHoverState(false)}>
            <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center"><ArrowLeft className="w-4 h-4" /></div>
            <span className="hidden md:inline">Catálogo</span>
          </Link>
        </div>
        
        <div className="md:hidden pointer-events-auto">
          <button onClick={() => setMenuOpen(!menuOpen)} className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center active:scale-90 transition-transform">
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        <div className="hidden md:block text-right pointer-events-auto font-mono text-[10px] md:text-xs uppercase tracking-[0.2em] leading-relaxed text-white/50">
          <p>EST. 2026</p>
          <p>MADRID — TOKYO</p>
        </div>
      </nav>

      {/* ═══ HERO ═══ */}
      <section className="min-h-[80vh] md:h-screen w-full flex flex-col justify-center px-4 md:px-20 pt-32 md:pt-20">
        <h1 className="font-serif text-[clamp(3rem,18vw,12rem)] leading-[0.85] tracking-tighter uppercase break-words">
          Studio <br /> <span className="italic pl-4 md:pl-[10vw] text-white/80">Creativo</span>
        </h1>
        <div className="mt-12 flex flex-col md:flex-row justify-between items-start md:items-end border-t border-white/20 pt-6 gap-6 md:gap-0">
          <p className="font-mono text-[10px] md:text-sm uppercase tracking-widest max-w-sm text-white/60">
            Pushing boundaries of digital experiences. Art direction, motion, identity, code.
          </p>
          <ArrowUpRight className="w-6 h-6 md:w-8 md:h-8 text-white/40 animate-pulse" />
        </div>
      </section>

      {/* ═══ CAPABILITIES ═══ */}
      <section id="capabilities" className="py-24 md:py-40 px-4 md:px-20 bg-[#0a0a0a]">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-4">
            <h2 className="font-serif text-5xl md:text-7xl tracking-tighter uppercase leading-[0.9]">
              Capabi<span className="italic text-white/50">lities</span>
            </h2>
            <p className="font-mono text-[10px] tracking-widest uppercase text-white/30">What we do</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[1px] bg-white/5">
            {capabilities.map((c, i) => (
              <div key={i} className="bg-[#0a0a0a] p-8 md:p-10 group hover:bg-[#111] transition-colors">
                <c.icon className="w-5 h-5 text-white/10 group-hover:text-white/40 transition-colors mb-6" strokeWidth={1.5} />
                <h3 className="font-mono text-xs tracking-widest uppercase mb-3">{c.title}</h3>
                <p className="text-sm text-white/30 leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PROJECTS — STACKING CARDS ═══ */}
      <section id="work" className="bg-[#0f0f0f]">
        <div className="px-4 md:px-20 pt-24 md:pt-40 pb-12">
          <h2 className="font-serif text-5xl md:text-7xl tracking-tighter uppercase leading-[0.9]">
            Selected <span className="italic text-white/50">Work</span>
          </h2>
        </div>

        <div ref={containerRef} className="h-screen w-full relative overflow-hidden">
          {projects.map((project, index) => (
            <div key={project.id}
              ref={(el) => { if (el) cardsRef.current[index] = el; }}
              className="absolute top-0 left-0 w-full h-full flex items-center justify-center p-4 sm:p-6 md:p-12 will-change-transform">
              <div className="relative w-full h-full max-w-[1400px] max-h-[800px] rounded-[2rem] md:rounded-[3rem] overflow-hidden group"
                onMouseEnter={() => setHoverState(true)} onMouseLeave={() => setHoverState(false)}>
                <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient}`} />
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
        </div>
      </section>

      {/* ═══ AWARDS ═══ */}
      <section id="awards" className="py-24 md:py-40 px-4 md:px-20 bg-[#0a0a0a]">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-4">
            <h2 className="font-serif text-5xl md:text-7xl tracking-tighter uppercase leading-[0.9]">
              Reco<span className="italic text-white/50">gnition</span>
            </h2>
            <Award className="w-6 h-6 text-white/10" />
          </div>

          <div className="space-y-0">
            {awards.map((a, i) => (
              <motion.div key={i} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                className="flex flex-col md:flex-row md:items-center justify-between py-5 border-b border-white/5 group hover:border-white/15 transition-colors">
                <div className="flex items-center gap-4">
                  <span className="font-mono text-xs text-white/15 w-10">{a.year}</span>
                  <h3 className="font-mono text-sm tracking-widest uppercase group-hover:text-white transition-colors">{a.title}</h3>
                </div>
                <span className="font-mono text-xs text-white/20 mt-1 md:mt-0 ml-14 md:ml-0">{a.project}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ TEAM ═══ */}
      <section id="studio" className="py-24 md:py-40 px-4 md:px-20 bg-[#0f0f0f]">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-serif text-5xl md:text-7xl tracking-tighter uppercase leading-[0.9] mb-16">
            The <span className="italic text-white/50">Studio</span>
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {team.map((m, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }} viewport={{ once: true }}>
                <div className="aspect-[3/4] bg-gradient-to-br from-[#1a1a1a] to-[#111] rounded-2xl mb-4 relative overflow-hidden flex items-center justify-center group">
                  <span className="text-5xl font-serif italic text-white/[0.03] group-hover:text-white/[0.06] transition-colors select-none">{m.initials}</span>
                </div>
                <h3 className="font-mono text-xs tracking-widest uppercase">{m.name}</h3>
                <p className="font-mono text-[10px] tracking-widest uppercase text-white/30 mt-1">{m.role}</p>
                <p className="font-mono text-[10px] tracking-widest uppercase text-white/15 mt-0.5">{m.loc}</p>
              </motion.div>
            ))}
          </div>

          {/* Philosophy */}
          <div className="mt-24 md:mt-32 max-w-3xl">
            <p className="text-2xl md:text-3xl font-serif italic leading-[1.6] text-white/40">
              "We don't make things pretty. We make things that move people. Every project is a conversation between form, function, and feeling."
            </p>
            <p className="font-mono text-xs tracking-widest uppercase text-white/15 mt-6">— Noé Itsuki, Founder</p>
          </div>
        </div>
      </section>

      {/* ═══ CONTACT ═══ */}
      <footer id="contact" className="min-h-screen flex flex-col items-center justify-center bg-[#050505] relative z-10 text-center px-4">
        <p className="font-mono text-[10px] md:text-xs tracking-widest uppercase text-white/30 mb-8">New project? Collaboration?</p>
        <h3 className="font-serif text-[clamp(2.5rem,8vw,6rem)] leading-none tracking-tight mb-10">
          Ready to create <br className="md:hidden" /><span className="italic text-white/60">magic?</span>
        </h3>
        <a href="mailto:hello@studioecreativo.com"
          className="font-mono text-[10px] md:text-xs uppercase tracking-[0.2em] px-8 py-4 border border-white/20 rounded-full active:scale-95 md:hover:bg-white md:hover:text-black transition-all duration-300"
          onMouseEnter={() => setHoverState(true)} onMouseLeave={() => setHoverState(false)}>
          hello@studioecreativo.com
        </a>

        <div className="absolute bottom-8 left-4 right-4 md:left-20 md:right-20 flex flex-col md:flex-row justify-between items-center gap-4 font-mono text-[10px] tracking-widest uppercase text-white/15">
          <p>© {new Date().getFullYear()} Studio Creativo</p>
          <div className="flex gap-6">
            <span>Instagram</span><span>Twitter</span><span>Behance</span>
          </div>
          <p>Madrid — Tokyo</p>
        </div>
      </footer>
      </div>
    </DemoLayout>
  );
}
