"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Menu, X, Play, MapPin, ArrowRight, Clock } from "lucide-react";
import DemoLayout from "@/components/DemoLayout";

/* -------------------------------------------------------------------------- */
/*                                CUSTOM HOOKS                                */
/* -------------------------------------------------------------------------- */

function useMousePosition() {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", updateMousePosition);
    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, []);
  return mousePosition;
}

/* -------------------------------------------------------------------------- */
/*                                 COMPONENTS                                 */
/* -------------------------------------------------------------------------- */

const Cursor = () => {
  const { x, y } = useMousePosition();
  return (
    <motion.div
      className="hidden md:block fixed top-0 left-0 w-3 h-3 bg-[#D4AF37] rounded-full pointer-events-none z-[9999] mix-blend-difference"
      animate={{ x: x - 6, y: y - 6 }}
      transition={{ type: "tween", ease: "backOut", duration: 0.15 }}
    />
  );
};

const FadeInReveal = ({ children, delay = 0, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-10%" }}
    transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1], delay }}
    className={className}
  >
    {children}
  </motion.div>
);

/* -------------------------------------------------------------------------- */
/*                                  SECTIONS                                  */
/* -------------------------------------------------------------------------- */

const Hero = () => {
  return (
    <section className="relative w-full h-[100svh] flex flex-col md:flex-row bg-[#050505] text-[#F9F6F0] overflow-hidden">
      <div className="w-full md:w-1/2 h-1/2 md:h-full relative flex flex-col justify-center px-8 md:px-16 pt-24 md:pt-0 z-10">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="font-sans text-[10px] md:text-xs uppercase tracking-[0.4em] text-[#D4AF37] mb-6"
        >
          Manufacture Genevoise Est. 1856
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="font-serif text-[12vw] md:text-[6vw] leading-[0.9] tracking-tighter mb-8"
        >
          Mastering <br /> <span className="italic font-light">Eternity.</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="font-sans text-sm md:text-base text-[#F9F6F0]/60 max-w-sm leading-relaxed"
        >
          Aurelia timepieces represent the absolute zenith of haute horlogerie, crafted by master artisans in the heart of Geneva.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.1 }}
          className="mt-12 flex items-center gap-6"
        >
          <button className="flex items-center gap-3 font-sans text-xs uppercase tracking-widest border-b border-[#D4AF37] pb-1 text-[#D4AF37] hover:text-[#F9F6F0] hover:border-[#F9F6F0] transition-colors">
            Discover Collections <ArrowRight size={14} />
          </button>
        </motion.div>
      </div>
      
      <div className="w-full md:w-1/2 h-1/2 md:h-full relative overflow-hidden">
        <motion.img
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
          src="/images/demo/premium/hero.jpg"
          alt="Aurelia Watch"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent md:bg-gradient-to-l opacity-80" />
      </div>
    </section>
  );
};

const Heritage = () => {
  const years = [
    { year: "1856", title: "The Foundation", text: "Antoine Aurelia establishes his first workshop in Geneva, dedicating his life to creating chronometers of unprecedented precision." },
    { year: "1923", title: "First Tourbillon", text: "Aurelia introduces its first pocket watch featuring a tourbillon, winning the Observatory Chronometer competition." },
    { year: "1978", title: "The Sovereign", text: "Launch of our most iconic sports-luxury collection, redefining the aesthetic of high-end steel watches." },
    { year: "2024", title: "Perpetual Future", text: "Unveiling the ultra-thin perpetual calendar, a triumph of miniaturization and mechanical genius." },
  ];

  return (
    <section className="py-24 md:py-40 px-8 md:px-16 bg-[#0F0F0F] text-[#F9F6F0]">
      <FadeInReveal>
        <h2 className="font-serif text-4xl md:text-6xl mb-16 text-center">
          Our <span className="italic text-[#D4AF37]">Heritage</span>
        </h2>
      </FadeInReveal>
      
      <div className="max-w-4xl mx-auto relative border-l border-[#D4AF37]/30 pl-8 md:pl-12 space-y-16">
        {years.map((item, i) => (
          <FadeInReveal key={i} delay={i * 0.1}>
            <div className="relative">
              <div className="absolute -left-[37px] md:-left-[53px] top-1.5 w-3 h-3 rounded-full bg-[#D4AF37] shadow-[0_0_10px_rgba(212,175,55,0.5)]" />
              <p className="font-sans text-xl md:text-2xl text-[#D4AF37] mb-2">{item.year}</p>
              <h3 className="font-serif text-2xl md:text-3xl mb-4">{item.title}</h3>
              <p className="font-sans text-sm md:text-base text-[#F9F6F0]/60 leading-relaxed">
                {item.text}
              </p>
            </div>
          </FadeInReveal>
        ))}
      </div>
    </section>
  );
};

const Collections = () => {
  const collections = [
    { name: "Sovereign", desc: "The ultimate sports luxury", price: "From $24,500", img: "/images/demo/premium/1.jpg" },
    { name: "Éternité", desc: "Classic dress chronometers", price: "From $18,000", img: "/images/demo/premium/2.jpg" },
    { name: "Celestia", desc: "Astronomical complications", price: "From $85,000", img: "/images/demo/premium/3.jpg" },
    { name: "Odyssey", desc: "Deep sea exploration", price: "From $14,200", img: "/images/demo/premium/4.jpg" },
  ];

  return (
    <section className="py-24 md:py-40 px-8 md:px-16 bg-[#F9F6F0] text-[#050505]">
      <div className="flex justify-between items-end mb-16 border-b border-[#050505]/10 pb-8">
        <div>
          <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-[#D4AF37] mb-4">Manufacture 2024</p>
          <h2 className="font-serif text-4xl md:text-6xl">Collections</h2>
        </div>
        <button className="hidden md:flex font-sans text-xs uppercase tracking-widest items-center gap-2 hover:opacity-50 transition-opacity">
          View All <ArrowRight size={14} />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        {collections.map((col, i) => (
          <FadeInReveal key={i} delay={i * 0.1}>
            <div className="group cursor-pointer">
              <div className="relative aspect-square md:aspect-[4/3] overflow-hidden bg-[#E8E5DF] mb-6">
                <img 
                  src={col.img} 
                  alt={col.name} 
                  className="w-full h-full object-cover mix-blend-multiply group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-serif text-2xl md:text-3xl mb-2">{col.name}</h3>
                  <p className="font-sans text-xs text-[#050505]/50 uppercase tracking-widest">{col.desc}</p>
                </div>
                <p className="font-sans text-sm font-medium">{col.price}</p>
              </div>
            </div>
          </FadeInReveal>
        ))}
      </div>
    </section>
  );
};

const Craftsmanship = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

  return (
    <section ref={containerRef} className="relative h-screen bg-[#050505] overflow-hidden flex items-center justify-center">
      <motion.img 
        style={{ y }}
        src="/images/demo/premium/5.jpg" 
        alt="Craftsmanship" 
        className="absolute inset-0 w-full h-[140%] object-cover opacity-40"
      />
      <div className="relative z-10 text-center text-[#F9F6F0] max-w-3xl px-8">
        <p className="font-sans text-[10px] uppercase tracking-[0.4em] text-[#D4AF37] mb-8">Haute Horlogerie</p>
        <h2 className="font-serif text-4xl md:text-6xl leading-tight font-light mb-8">
          It takes 400 hours to assemble a single Aurelia tourbillon.
        </h2>
        <p className="font-sans text-sm md:text-base text-[#F9F6F0]/70 leading-relaxed mb-12">
          Every component, even those hidden from view, is meticulously hand-finished with anglage, perlage, and côtes de Genève. We do not compromise on perfection.
        </p>
        <button className="w-16 h-16 rounded-full border border-[#D4AF37] text-[#D4AF37] flex items-center justify-center mx-auto hover:bg-[#D4AF37] hover:text-[#050505] transition-all duration-300">
          <Play size={20} className="ml-1" />
        </button>
      </div>
    </section>
  );
};

const Complications = () => {
  const features = [
    { title: "Tourbillon Volant", desc: "Defying gravity with a rotating cage suspended from a single bridge." },
    { title: "Quantième Perpétuel", desc: "A mechanical brain that correctly calculates leap years until 2100." },
    { title: "Répétition Minutes", desc: "Chiming the exact time on demand with crystal clear acoustics." },
    { title: "Chronographe à Rattrapante", desc: "Measuring split times with absolute precision via a dual-hand mechanism." }
  ];

  return (
    <section className="py-24 md:py-40 px-8 md:px-16 bg-[#0F0F0F] text-[#F9F6F0]">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-16">
        <div className="md:w-1/3">
          <FadeInReveal>
            <h2 className="font-serif text-4xl md:text-5xl mb-6">The Art of <br/> <span className="italic text-[#D4AF37]">Complications</span></h2>
            <p className="font-sans text-sm text-[#F9F6F0]/50 leading-relaxed">
              Pushing the boundaries of mechanical engineering to create micro-mechanical wonders that measure more than just hours and minutes.
            </p>
          </FadeInReveal>
        </div>
        <div className="md:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
          {features.map((feat, i) => (
            <FadeInReveal key={i} delay={i * 0.1}>
              <div className="border-t border-[#D4AF37]/30 pt-6">
                <Clock className="text-[#D4AF37] mb-4" size={24} />
                <h3 className="font-serif text-2xl mb-3">{feat.title}</h3>
                <p className="font-sans text-sm text-[#F9F6F0]/60 leading-relaxed">{feat.desc}</p>
              </div>
            </FadeInReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

const PrivateBoutique = () => {
  return (
    <section className="py-24 md:py-32 px-8 md:px-16 bg-[#F9F6F0] text-[#050505]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row rounded-sm overflow-hidden bg-[#E8E5DF]">
        <div className="md:w-1/2 p-12 md:p-20 flex flex-col justify-center">
          <p className="font-sans text-[10px] uppercase tracking-[0.4em] text-[#D4AF37] mb-6">Private Service</p>
          <h2 className="font-serif text-4xl md:text-5xl mb-6">Book an Appointment</h2>
          <p className="font-sans text-sm text-[#050505]/60 mb-12 max-w-sm">
            Experience our collections in person. Our ambassadors await you in our private salons for a personalized presentation.
          </p>
          <form className="flex flex-col gap-6">
            <input type="text" placeholder="Full Name" className="bg-transparent border-b border-[#050505]/20 pb-3 font-sans text-sm outline-none focus:border-[#D4AF37] transition-colors" />
            <input type="email" placeholder="Email Address" className="bg-transparent border-b border-[#050505]/20 pb-3 font-sans text-sm outline-none focus:border-[#D4AF37] transition-colors" />
            <select className="bg-transparent border-b border-[#050505]/20 pb-3 font-sans text-sm outline-none focus:border-[#D4AF37] transition-colors appearance-none cursor-pointer">
              <option value="" disabled selected>Select Boutique</option>
              <option value="geneva">Geneva Flagship</option>
              <option value="paris">Paris Place Vendôme</option>
              <option value="london">London Bond Street</option>
              <option value="dubai">Dubai Mall</option>
            </select>
            <button type="button" className="mt-8 bg-[#050505] text-[#F9F6F0] font-sans text-xs uppercase tracking-widest py-4 hover:bg-[#D4AF37] transition-colors">
              Request Appointment
            </button>
          </form>
        </div>
        <div className="md:w-1/2 min-h-[400px]">
          <img src="/images/demo/premium/6.jpg" alt="Boutique" className="w-full h-full object-cover" />
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-[#050505] text-[#F9F6F0] pt-24 pb-12 px-8 md:px-16 border-t border-white/5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-16 mb-24">
        <div className="max-w-xs">
          <h2 className="font-serif text-3xl tracking-widest uppercase mb-6">AURELIA</h2>
          <p className="font-sans text-xs text-[#F9F6F0]/40 leading-relaxed mb-6">
            Haute Horlogerie Genevoise since 1856. Crafting the measurement of time into an art form.
          </p>
          <div className="flex gap-4">
            {["Instagram", "WeChat", "LinkedIn"].map((social) => (
              <a key={social} href="#" className="font-sans text-[10px] uppercase tracking-widest text-[#D4AF37] hover:text-[#F9F6F0] transition-colors">
                {social}
              </a>
            ))}
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-12 md:gap-24 font-sans text-xs">
          <div className="flex flex-col gap-4">
            <h4 className="uppercase tracking-[0.2em] text-[#F9F6F0]/30 mb-2">Collections</h4>
            <a href="#" className="hover:text-[#D4AF37] transition-colors">Sovereign</a>
            <a href="#" className="hover:text-[#D4AF37] transition-colors">Éternité</a>
            <a href="#" className="hover:text-[#D4AF37] transition-colors">Celestia</a>
            <a href="#" className="hover:text-[#D4AF37] transition-colors">Odyssey</a>
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="uppercase tracking-[0.2em] text-[#F9F6F0]/30 mb-2">Maison</h4>
            <a href="#" className="hover:text-[#D4AF37] transition-colors">History</a>
            <a href="#" className="hover:text-[#D4AF37] transition-colors">Savoir-Faire</a>
            <a href="#" className="hover:text-[#D4AF37] transition-colors">Boutiques</a>
            <a href="#" className="hover:text-[#D4AF37] transition-colors">Careers</a>
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="uppercase tracking-[0.2em] text-[#F9F6F0]/30 mb-2">Legal</h4>
            <a href="#" className="hover:text-[#D4AF37] transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-[#D4AF37] transition-colors">Terms of Use</a>
            <a href="#" className="hover:text-[#D4AF37] transition-colors">Cookies</a>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center font-sans text-[10px] uppercase tracking-widest text-[#F9F6F0]/30 gap-4">
        <p>&copy; {new Date().getFullYear()} Aurelia Watches. All rights reserved.</p>
        <p>Swiss Made</p>
      </div>
    </footer>
  );
};

/* -------------------------------------------------------------------------- */
/*                                 MAIN PAGE                                  */
/* -------------------------------------------------------------------------- */

export default function PremiumPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <DemoLayout title="AURELIA | Luxury Swiss Watches">
      <style>{`
        body { background-color: #050505; color: #F9F6F0; cursor: none; }
        ::selection { background: #D4AF37; color: #050505; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #050505; }
        ::-webkit-scrollbar-thumb { background: #D4AF37; }
      `}</style>
      <Cursor />
      
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full z-50 px-8 py-8 flex justify-between items-center mix-blend-difference text-[#F9F6F0] pointer-events-none">
        <div className="pointer-events-auto">
          <Link href="/" className="flex items-center gap-2 hover:text-[#D4AF37] transition-colors">
            <ArrowLeft size={16} />
            <span className="font-sans text-[10px] md:text-xs uppercase tracking-[0.2em] hidden md:block">Catálogo</span>
          </Link>
        </div>
        <div className="pointer-events-auto font-serif text-2xl tracking-[0.4em] uppercase absolute left-1/2 -translate-x-1/2">
          AURELIA
        </div>
        <div className="pointer-events-auto flex items-center gap-6">
          <button className="hidden md:block font-sans text-[10px] uppercase tracking-[0.2em] hover:text-[#D4AF37] transition-colors border border-[#F9F6F0]/20 px-4 py-2 rounded-sm">
            Boutiques
          </button>
          <button onClick={() => setMenuOpen(!menuOpen)} className="hover:text-[#D4AF37] transition-colors">
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Fullscreen Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-40 bg-[#050505] text-[#F9F6F0] flex flex-col justify-center items-center"
          >
            <div className="absolute inset-0 opacity-10 pointer-events-none flex items-center justify-center">
              <span className="font-serif text-[40vw] text-[#D4AF37] whitespace-nowrap">AURELIA</span>
            </div>
            <div className="flex flex-col gap-8 text-center font-serif text-4xl md:text-6xl z-10">
              {["Collections", "High Horology", "Heritage", "Savoir-Faire", "Boutiques"].map((item, i) => (
                <motion.a
                  key={i}
                  href="#"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                  className="hover:italic hover:text-[#D4AF37] transition-all"
                  onClick={() => setMenuOpen(false)}
                >
                  {item}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        <Hero />
        <Heritage />
        <Collections />
        <Craftsmanship />
        <Complications />
        <PrivateBoutique />
      </main>
      <Footer />
    </DemoLayout>
  );
}
