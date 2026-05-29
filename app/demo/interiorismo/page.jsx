"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence, useSpring } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Menu, X, ArrowUpRight, Plus, Minus } from "lucide-react";
import DemoLayout from "@/components/DemoLayout";

/* -------------------------------------------------------------------------- */
/*                                CUSTOM HOOKS                                */
/* -------------------------------------------------------------------------- */

function useMousePosition() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", updateMousePosition);
    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, []);
  return mousePosition;
}

function useWindowSize() {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  useEffect(() => {
    function handleResize() {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return windowSize;
}

/* -------------------------------------------------------------------------- */
/*                                 COMPONENTS                                 */
/* -------------------------------------------------------------------------- */

const Cursor = () => {
  const { x, y } = useMousePosition();
  const cursorX = useSpring(x, { stiffness: 1000, damping: 50, mass: 0.1 });
  const cursorY = useSpring(y, { stiffness: 1000, damping: 50, mass: 0.1 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseOver = (e) => {
      if (e.target.tagName.toLowerCase() === 'a' || e.target.tagName.toLowerCase() === 'button' || e.target.closest('a') || e.target.closest('button')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };
    window.addEventListener('mouseover', handleMouseOver);
    return () => window.removeEventListener('mouseover', handleMouseOver);
  }, []);

  return (
    <motion.div
      className="hidden md:flex fixed top-0 left-0 rounded-full pointer-events-none z-[9999] mix-blend-difference items-center justify-center bg-white"
      style={{ x: cursorX, y: cursorY }}
      animate={{
        width: isHovering ? 64 : 16,
        height: isHovering ? 64 : 16,
        x: x - (isHovering ? 32 : 8),
        y: y - (isHovering ? 32 : 8),
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {isHovering && <span className="text-black font-sans text-[10px] uppercase tracking-widest absolute">View</span>}
    </motion.div>
  );
};

const FadeInWord = ({ text, delay = 0 }) => {
  const words = text.split(" ");
  return (
    <span className="inline-block">
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.6, delay: delay + i * 0.05 }}
          className="inline-block mr-2 md:mr-3"
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
};

/* -------------------------------------------------------------------------- */
/*                                  SECTIONS                                  */
/* -------------------------------------------------------------------------- */

const Hero = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 400]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <section className="relative w-full h-screen bg-[#EBE9E4] overflow-hidden flex items-center justify-center">
      <motion.div style={{ y, opacity }} className="absolute inset-0 z-0">
        <img src="/images/demo/interiorismo/hero.jpg" alt="Oblique Architecture" className="w-full h-full object-cover filter contrast-125 saturate-50" />
      </motion.div>
      <div className="absolute inset-0 bg-[#EBE9E4]/30 mix-blend-multiply z-10" />
      
      <div className="relative z-20 flex flex-col items-center text-center px-6 mix-blend-difference text-[#EBE9E4]">
        <motion.h1 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1] }}
          className="font-serif text-[18vw] leading-[0.8] tracking-tighter"
        >
          OBLIQUE
        </motion.h1>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="font-sans text-xs md:text-sm uppercase tracking-[0.4em] mt-8 max-w-md"
        >
          Shaping the poetry of empty space.
        </motion.p>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-4 mix-blend-difference text-[#EBE9E4]"
      >
        <span className="font-sans text-[10px] uppercase tracking-widest rotate-90 origin-left translate-x-2">Scroll</span>
        <div className="w-[1px] h-16 bg-[#EBE9E4]/50 overflow-hidden">
          <motion.div
            animate={{ y: ["-100%", "100%"] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
            className="w-full h-full bg-[#EBE9E4]"
          />
        </div>
      </motion.div>
    </section>
  );
};

const Manifesto = () => {
  return (
    <section className="py-32 md:py-48 px-6 md:px-12 bg-[#EBE9E4] text-[#1A1A1A]">
      <div className="max-w-5xl mx-auto">
        <h2 className="font-serif text-3xl md:text-5xl lg:text-7xl leading-[1.1] font-normal tracking-tight">
          <FadeInWord text="Architecture is not just about building walls. It is about capturing light, defining the void, and creating sanctuaries where human emotion can resonate in pure silence." />
        </h2>
        <div className="mt-20 md:mt-32 grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-[#1A1A1A]/20 pt-16">
          {[
            { title: "Substance", text: "We prioritize raw, authentic materials—stone, timber, raw concrete—that age gracefully and tell a story of permanence." },
            { title: "Luminance", text: "Light is our primary medium. We sculpt spaces around the sun's trajectory to create ethereal, ever-changing atmospheres." },
            { title: "Proportion", text: "Mathematical harmony governs our spatial layouts. Every dimension is carefully calculated to invoke an intuitive sense of peace." }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.15 }}
            >
              <h3 className="font-sans text-xs uppercase tracking-widest font-bold mb-6 flex items-center gap-2">
                <span className="text-[#1A1A1A]/40">0{i+1}</span> {item.title}
              </h3>
              <p className="font-serif text-lg leading-relaxed text-[#1A1A1A]/80">
                {item.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const SelectedWorks = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-66.66%"]);

  const projects = [
    { id: 1, title: "The Monolith", category: "Residential", year: "2024", img: "/images/demo/interiorismo/1.jpg" },
    { id: 2, title: "Gallery House", category: "Cultural", year: "2023", img: "/images/demo/interiorismo/2.jpg" },
    { id: 3, title: "Silent Pavilion", category: "Exhibition", year: "2025", img: "/images/demo/interiorismo/3.jpg" },
    { id: 4, title: "Atrium Villa", category: "Residential", year: "2023", img: "/images/demo/interiorismo/4.jpg" },
    { id: 5, title: "Brutalist Spa", category: "Wellness", year: "2026", img: "/images/demo/interiorismo/hero.jpg" },
  ];

  return (
    <section ref={containerRef} className="h-[300vh] bg-[#1A1A1A] relative text-[#EBE9E4]">
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center pt-24">
        <div className="absolute top-12 left-6 md:left-12 flex justify-between items-end w-[calc(100%-3rem)] md:w-[calc(100%-6rem)]">
          <h2 className="font-serif text-5xl md:text-7xl font-light">Selected Works</h2>
          <span className="font-sans text-xs uppercase tracking-widest text-[#EBE9E4]/50 hidden md:block">Scroll to explore (5 Projects)</span>
        </div>
        
        <motion.div style={{ x }} className="flex gap-8 md:gap-16 px-6 md:px-12 w-[300vw]">
          {projects.map((p, i) => (
            <div key={p.id} className="w-[85vw] md:w-[60vw] flex-shrink-0 group relative cursor-pointer">
              <div className="relative overflow-hidden aspect-[16/10]">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
                <motion.img 
                  src={p.img} 
                  alt={p.title} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
                />
              </div>
              <div className="mt-6 flex justify-between items-start border-t border-[#EBE9E4]/20 pt-6">
                <div>
                  <h3 className="font-serif text-3xl md:text-4xl mb-2 group-hover:italic transition-all">{p.title}</h3>
                  <p className="font-sans text-xs uppercase tracking-widest text-[#EBE9E4]/50">{p.category} &mdash; {p.year}</p>
                </div>
                <div className="w-12 h-12 rounded-full border border-[#EBE9E4]/30 flex items-center justify-center group-hover:bg-[#EBE9E4] group-hover:text-[#1A1A1A] transition-colors duration-500">
                  <ArrowUpRight size={20} />
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const Expertise = () => {
  const [activeIdx, setActiveIdx] = useState(0);

  const services = [
    { title: "Architecture", desc: "From conceptual massing to structural realization, we design buildings that stand as silent witnesses to their environment.", img: "/images/demo/interiorismo/1.jpg" },
    { title: "Interior Architecture", desc: "We sculpt the void within. Refining volumes, optimizing flow, and orchestrating the delicate interplay of light and shadow.", img: "/images/demo/interiorismo/2.jpg" },
    { title: "Custom Furnishing", desc: "Bespoke pieces designed specifically for the spatial context they inhabit, utilizing raw, elemental materials.", img: "/images/demo/interiorismo/3.jpg" },
    { title: "Landscape Integration", desc: "Dissolving the boundary between interior and exterior. We design landscapes that extend the architectural narrative.", img: "/images/demo/interiorismo/4.jpg" }
  ];

  return (
    <section className="py-32 md:py-48 px-6 md:px-12 bg-[#EBE9E4] text-[#1A1A1A]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16 md:gap-24">
        <div className="md:w-1/2">
          <h2 className="font-sans text-xs uppercase tracking-widest font-bold text-[#1A1A1A]/50 mb-12">Core Disciplines</h2>
          <div className="flex flex-col border-t border-[#1A1A1A]/20">
            {services.map((svc, i) => (
              <div 
                key={i} 
                className="py-8 md:py-12 border-b border-[#1A1A1A]/20 cursor-pointer group"
                onMouseEnter={() => setActiveIdx(i)}
              >
                <div className="flex justify-between items-center">
                  <h3 className={`font-serif text-4xl md:text-5xl transition-colors duration-500 ${activeIdx === i ? "text-[#1A1A1A]" : "text-[#1A1A1A]/40"}`}>
                    {svc.title}
                  </h3>
                  <ArrowUpRight size={24} className={`transition-all duration-500 ${activeIdx === i ? "opacity-100 rotate-0" : "opacity-0 -rotate-45"}`} />
                </div>
                <AnimatePresence>
                  {activeIdx === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <p className="mt-6 font-sans text-sm md:text-base leading-relaxed text-[#1A1A1A]/70 max-w-md">
                        {svc.desc}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
        <div className="md:w-1/2 hidden md:block">
          <div className="sticky top-32 w-full aspect-[3/4] overflow-hidden bg-[#1A1A1A]">
            <AnimatePresence mode="wait">
              <motion.img
                key={activeIdx}
                src={services[activeIdx].img}
                alt={services[activeIdx].title}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                className="w-full h-full object-cover filter contrast-125 saturate-50"
              />
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

const Journal = () => {
  const articles = [
    { title: "The Psychology of Empty Space", date: "Oct 12, 2025" },
    { title: "Raw Concrete: A Love Letter", date: "Sep 04, 2025" },
    { title: "Designing for Silence in Noisy Cities", date: "Aug 22, 2025" }
  ];

  return (
    <section className="py-24 md:py-32 px-6 md:px-12 bg-[#1A1A1A] text-[#EBE9E4]">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-16 border-b border-[#EBE9E4]/20 pb-8">
          <h2 className="font-serif text-5xl md:text-6xl font-light">Insights</h2>
          <button className="font-sans text-xs uppercase tracking-widest hover:opacity-50 transition-opacity">Read Journal</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {articles.map((art, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="w-full h-px bg-[#EBE9E4] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 mb-6" />
              <p className="font-sans text-[10px] uppercase tracking-widest text-[#EBE9E4]/50 mb-4">{art.date}</p>
              <h3 className="font-serif text-2xl md:text-3xl leading-snug group-hover:italic transition-all duration-300">
                {art.title}
              </h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section className="py-32 md:py-48 px-6 md:px-12 bg-[#EBE9E4] text-[#1A1A1A] flex flex-col items-center justify-center text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="max-w-4xl"
      >
        <p className="font-sans text-xs uppercase tracking-[0.3em] font-bold text-[#1A1A1A]/50 mb-8">Start a Dialogue</p>
        <h2 className="font-serif text-[10vw] md:text-[8vw] leading-none tracking-tighter mb-16 hover:italic cursor-pointer transition-all duration-500">
          hello@oblique.studio
        </h2>
        <div className="flex flex-col md:flex-row justify-center gap-12 md:gap-24 font-sans text-xs uppercase tracking-widest text-[#1A1A1A]/70">
          <div>
            <p className="font-bold text-[#1A1A1A] mb-2">Madrid</p>
            <p>Paseo de la Castellana 45</p>
            <p>28046, Spain</p>
          </div>
          <div>
            <p className="font-bold text-[#1A1A1A] mb-2">Tokyo</p>
            <p>Minami-Aoyama 5-Chome</p>
            <p>Minato City, 107-0062</p>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-[#1A1A1A] text-[#EBE9E4] px-6 md:px-12 py-8 flex flex-col md:flex-row justify-between items-center gap-6">
      <div className="font-serif tracking-widest uppercase">Oblique Architecture &copy; {new Date().getFullYear()}</div>
      <div className="flex gap-8 font-sans text-[10px] uppercase tracking-widest text-[#EBE9E4]/50">
        <a href="#" className="hover:text-[#EBE9E4] transition-colors">Instagram</a>
        <a href="#" className="hover:text-[#EBE9E4] transition-colors">Pinterest</a>
        <a href="#" className="hover:text-[#EBE9E4] transition-colors">LinkedIn</a>
      </div>
      <div className="font-sans text-[10px] uppercase tracking-widest text-[#EBE9E4]/30">All Rights Reserved</div>
    </footer>
  );
};

/* -------------------------------------------------------------------------- */
/*                                 MAIN PAGE                                  */
/* -------------------------------------------------------------------------- */

export default function InteriorismoPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <DemoLayout title="OBLIQUE | Architecture & Spatial Design">
      <style>{`
        body { background-color: #EBE9E4; color: #1A1A1A; cursor: none; }
        ::selection { background: #1A1A1A; color: #EBE9E4; }
        ::-webkit-scrollbar { width: 0px; }
      `}</style>
      <Cursor />
      
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full z-50 px-6 py-8 md:px-12 flex justify-between items-center mix-blend-difference text-[#EBE9E4] pointer-events-none">
        <div className="pointer-events-auto">
          <Link href="/" className="flex items-center gap-2 hover:opacity-50 transition-opacity">
            <ArrowLeft size={16} />
            <span className="font-sans text-xs uppercase tracking-[0.2em] hidden md:block">Catálogo</span>
          </Link>
        </div>
        <div className="pointer-events-auto font-serif text-2xl tracking-widest uppercase absolute left-1/2 -translate-x-1/2">
          OBLIQUE
        </div>
        <div className="pointer-events-auto">
          <button onClick={() => setMenuOpen(!menuOpen)} className="flex items-center gap-2 hover:opacity-50 transition-opacity">
            <span className="font-sans text-xs uppercase tracking-[0.2em] hidden md:block">Menu</span>
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Fullscreen Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" }}
            animate={{ opacity: 1, clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
            exit={{ opacity: 0, clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-40 bg-[#1A1A1A] text-[#EBE9E4] flex flex-col justify-center items-center"
          >
            <div className="flex flex-col gap-6 text-center font-serif text-[8vw] md:text-[5vw] leading-none font-light">
              {["Studio", "Selected Works", "Philosophy", "Journal", "Contact"].map((item, i) => (
                <motion.a
                  key={i}
                  href="#"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.6 }}
                  className="hover:italic hover:text-[#EBE9E4]/50 transition-all uppercase tracking-tighter"
                  onClick={() => setMenuOpen(false)}
                >
                  {item}
                </motion.a>
              ))}
            </div>
            <div className="absolute bottom-12 flex gap-12 font-sans text-[10px] uppercase tracking-[0.3em] text-[#EBE9E4]/40">
              <span>Madrid</span>
              <span>Tokyo</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        <Hero />
        <Manifesto />
        <SelectedWorks />
        <Expertise />
        <Journal />
        <Contact />
      </main>
      <Footer />
    </DemoLayout>
  );
}
