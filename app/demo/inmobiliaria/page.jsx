"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence, useSpring } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, MapPin, Menu, X, ChevronRight, Bed, Bath, Square, Compass, Play, ArrowLeft } from "lucide-react";
import DemoLayout from '@/components/DemoLayout';

/* --- CUSTOM HOOKS --- */
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

/* --- COMPONENTS --- */
const Cursor = () => {
  const { x, y } = useMousePosition();
  return (
    <motion.div
      className="hidden md:flex fixed top-0 left-0 w-8 h-8 rounded-full border border-white pointer-events-none z-[100] mix-blend-difference items-center justify-center"
      animate={{ x: x - 16, y: y - 16 }}
      transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.5 }}
    >
      <div className="w-1 h-1 bg-white rounded-full" />
    </motion.div>
  );
};

const MagneticButton = ({ children, className, onClick }) => {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  const { x, y } = position;
  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x, y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={className}
      onClick={onClick}
    >
      {children}
    </motion.button>
  );
};

const RevealText = ({ text, className, delay = 0 }) => {
  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ y: "100%" }}
        whileInView={{ y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 1, ease: [0.76, 0, 0.24, 1], delay }}
      >
        {text}
      </motion.div>
    </div>
  );
};

const ParallaxImage = ({ src, alt, className }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.img
        style={{ y }}
        src={src}
        alt={alt}
        className="absolute inset-0 w-full h-[130%] object-cover"
      />
    </div>
  );
};

/* --- SECTIONS --- */
const Hero = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 300]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <section className="relative w-full h-[100svh] overflow-hidden bg-[#0a0a0a]">
      <motion.div style={{ y, opacity }} className="absolute inset-0 w-full h-full">
        <img src="/images/demo/inmobiliaria/hero.jpg" alt="AETHER Hero" className="w-full h-full object-cover opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-[#0a0a0a]" />
      </motion.div>
      
      <div className="absolute inset-0 flex flex-col justify-end px-6 md:px-12 pb-24 md:pb-32 z-10">
        <RevealText text="AETHER" className="font-serif text-[15vw] leading-[0.8] text-white tracking-tighter mix-blend-overlay opacity-80" />
        <div className="flex flex-col md:flex-row justify-between md:items-end mt-8 gap-8">
          <div className="max-w-md">
            <RevealText text="Elevating the standard of global luxury real estate. Discover properties that redefine architectural brilliance and exclusive living." className="font-sans text-sm md:text-base text-white/70 font-light leading-relaxed" delay={0.2} />
          </div>
          <MagneticButton className="w-32 h-32 md:w-40 md:h-40 rounded-full border border-white/20 flex items-center justify-center group hover:bg-white transition-colors duration-500">
            <span className="font-sans text-xs uppercase tracking-widest text-white group-hover:text-black transition-colors duration-500">Explore</span>
          </MagneticButton>
        </div>
      </div>
    </section>
  );
};

const Introduction = () => {
  return (
    <section className="py-32 md:py-48 px-6 md:px-12 bg-[#0a0a0a] text-white">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-16 md:gap-24">
        <div className="md:w-1/3">
          <RevealText text="THE MANIFESTO" className="font-sans text-xs tracking-[0.3em] uppercase text-white/50 mb-6" />
        </div>
        <div className="md:w-2/3">
          <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl leading-[1.2] font-light">
            We don't just sell properties; we curate <span className="italic text-white/60">legacies</span>. Our portfolio represents the pinnacle of human habitation, where design meets nature in perfect harmony.
          </h2>
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-white/10 pt-16">
            {[
              { value: "$2.4B", label: "Sales Volume" },
              { value: "14", label: "Global Offices" },
              { value: "420+", label: "Estates Sold" },
              { value: "100%", label: "Discretion" }
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
              >
                <div className="font-serif text-3xl md:text-4xl mb-2">{stat.value}</div>
                <div className="font-sans text-xs tracking-widest uppercase text-white/40">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const FeaturedEstates = () => {
  const properties = [
    { id: 1, title: "The Glass Pavilion", location: "Beverly Hills, CA", price: "$42,000,000", img: "/images/demo/inmobiliaria/1.jpg", span: "col-span-1 md:col-span-2 row-span-2" },
    { id: 2, title: "Villa Azure", location: "Côte d'Azur, FR", price: "€28,500,000", img: "/images/demo/inmobiliaria/2.jpg", span: "col-span-1 row-span-1" },
    { id: 3, title: "Alpine Estate", location: "St. Moritz, CH", price: "CHF 35,000,000", img: "/images/demo/inmobiliaria/3.jpg", span: "col-span-1 row-span-1" },
    { id: 4, title: "Desert Mirage", location: "Dubai, UAE", price: "$18,900,000", img: "/images/demo/inmobiliaria/4.jpg", span: "col-span-1 md:col-span-2 row-span-1" },
  ];

  return (
    <section className="py-24 px-6 md:px-12 bg-white text-black">
      <div className="flex justify-between items-end mb-16">
        <RevealText text="EXCLUSIVE LISTINGS" className="font-sans text-xs tracking-[0.3em] uppercase text-black/50" />
        <Link href="#" className="flex items-center gap-2 font-sans text-xs uppercase tracking-widest hover:opacity-50 transition-opacity">
          View All <ArrowUpRight size={14} />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 auto-rows-[400px]">
        {properties.map((prop, i) => (
          <motion.div
            key={prop.id}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: i * 0.1 }}
            className={`relative group cursor-pointer overflow-hidden ${prop.span}`}
          >
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500 z-10" />
            <img src={prop.img} alt={prop.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 p-8 flex flex-col justify-between z-20">
              <div className="self-end bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full font-sans text-xs font-medium tracking-wider">
                {prop.price}
              </div>
              <div>
                <p className="flex items-center gap-2 text-white/80 font-sans text-xs uppercase tracking-widest mb-2">
                  <MapPin size={12} /> {prop.location}
                </p>
                <h3 className="font-serif text-3xl text-white group-hover:translate-x-2 transition-transform duration-500">
                  {prop.title}
                </h3>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const LifestyleScroll = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);

  return (
    <section ref={containerRef} className="h-[300vh] bg-[#0a0a0a] relative">
      <div className="sticky top-0 h-screen overflow-hidden flex items-center">
        <div className="absolute top-12 left-6 md:left-12 z-20">
          <RevealText text="THE AETHER LIFESTYLE" className="font-sans text-xs tracking-[0.3em] uppercase text-white/50" />
        </div>
        <motion.div style={{ x }} className="flex gap-12 px-6 md:px-12 w-[200vw]">
          {[
            { img: "/images/demo/inmobiliaria/5.jpg", title: "Private Aviation", desc: "Seamless global connectivity from your doorstep." },
            { img: "/images/demo/inmobiliaria/6.jpg", title: "Wellness Sanctuaries", desc: "In-house spas rivaling the world's best resorts." },
            { img: "/images/demo/inmobiliaria/1.jpg", title: "Automotive Galleries", desc: "Climate-controlled exhibition spaces for your collection." },
            { img: "/images/demo/inmobiliaria/2.jpg", title: "Culinary Excellence", desc: "Commercial-grade kitchens for private chefs." },
          ].map((item, i) => (
            <div key={i} className="w-[85vw] md:w-[45vw] flex-shrink-0 relative group">
              <div className="aspect-[4/3] overflow-hidden">
                <img src={item.img} alt={item.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
              </div>
              <div className="mt-8 border-t border-white/20 pt-6">
                <h3 className="font-serif text-2xl md:text-3xl text-white mb-2">{item.title}</h3>
                <p className="font-sans text-sm text-white/50">{item.desc}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  return (
    <section className="py-32 px-6 md:px-12 bg-white text-black border-b border-black/10">
      <div className="max-w-4xl mx-auto text-center">
        <Compass size={40} className="mx-auto mb-12 opacity-20" />
        <h2 className="font-serif text-3xl md:text-5xl leading-tight font-light mb-12">
          "AETHER didn't just find me a house; they discovered a sanctuary that perfectly mirrored my aspirations. Their understanding of architectural nuance is unparalleled."
        </h2>
        <p className="font-sans text-xs uppercase tracking-widest font-medium">Jonathan R.</p>
        <p className="font-sans text-xs uppercase tracking-widest text-black/50 mt-1">Tech Entrepreneur & Collector</p>
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section className="py-32 px-6 md:px-12 bg-white text-black">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-16 md:gap-24">
        <div className="md:w-1/2">
          <h2 className="font-serif text-5xl md:text-7xl font-light mb-6">Begin the<br/><span className="italic text-black/40">Journey</span>.</h2>
          <p className="font-sans text-sm text-black/60 leading-relaxed mb-12 max-w-sm">
            Contact our private advisory team to discuss your real estate portfolio, request an appraisal, or explore off-market opportunities.
          </p>
          <div className="flex flex-col gap-6 font-sans text-sm">
            <div className="border-b border-black/10 pb-4">
              <p className="text-black/40 text-xs uppercase tracking-widest mb-1">Email</p>
              <a href="#" className="hover:opacity-50 transition-opacity">advisory@aether-estates.com</a>
            </div>
            <div className="border-b border-black/10 pb-4">
              <p className="text-black/40 text-xs uppercase tracking-widest mb-1">Phone</p>
              <a href="#" className="hover:opacity-50 transition-opacity">+1 (800) 123 4567</a>
            </div>
            <div className="border-b border-black/10 pb-4">
              <p className="text-black/40 text-xs uppercase tracking-widest mb-1">Headquarters</p>
              <p>432 Park Avenue, New York, NY</p>
            </div>
          </div>
        </div>
        <div className="md:w-1/2">
          <form className="flex flex-col gap-8">
            <div className="relative">
              <input type="text" id="name" className="w-full border-b border-black/20 py-4 bg-transparent focus:outline-none focus:border-black transition-colors peer placeholder-transparent" placeholder="Name" />
              <label htmlFor="name" className="absolute left-0 top-4 text-black/40 font-sans text-xs uppercase tracking-widest transition-all peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-black peer-valid:-top-4 peer-valid:text-[10px]">Full Name</label>
            </div>
            <div className="relative">
              <input type="email" id="email" className="w-full border-b border-black/20 py-4 bg-transparent focus:outline-none focus:border-black transition-colors peer placeholder-transparent" placeholder="Email" />
              <label htmlFor="email" className="absolute left-0 top-4 text-black/40 font-sans text-xs uppercase tracking-widest transition-all peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-black peer-valid:-top-4 peer-valid:text-[10px]">Email Address</label>
            </div>
            <div className="relative">
              <textarea id="message" rows={4} className="w-full border-b border-black/20 py-4 bg-transparent focus:outline-none focus:border-black transition-colors peer placeholder-transparent resize-none" placeholder="Message"></textarea>
              <label htmlFor="message" className="absolute left-0 top-4 text-black/40 font-sans text-xs uppercase tracking-widest transition-all peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-black peer-valid:-top-4 peer-valid:text-[10px]">Inquiry Details</label>
            </div>
            <MagneticButton className="self-start mt-4 bg-black text-white px-10 py-4 rounded-full font-sans text-xs uppercase tracking-widest hover:bg-black/80 transition-colors">
              Submit Inquiry
            </MagneticButton>
          </form>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-[#0a0a0a] text-white py-12 px-6 md:px-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="font-serif text-2xl tracking-widest">AETHER</div>
        <div className="flex gap-8 font-sans text-[10px] uppercase tracking-widest text-white/50">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-white transition-colors">Instagram</a>
          <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
        </div>
        <div className="font-sans text-[10px] uppercase tracking-widest text-white/30">
          © {new Date().getFullYear()} Aether Estates. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

/* --- MAIN PAGE --- */
export default function InmobiliariaPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <DemoLayout title="AETHER | Luxury Real Estate">
      <style>{`
        body { background-color: #0a0a0a; color: #fff; cursor: none; }
        ::-webkit-scrollbar { width: 0px; }
      `}</style>
      <Cursor />
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 px-6 py-6 md:px-12 flex justify-between items-center mix-blend-difference text-white pointer-events-none">
        <div className="pointer-events-auto flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2 hover:opacity-50 transition-opacity">
            <ArrowLeft size={16} />
            <span className="font-sans text-xs uppercase tracking-widest hidden md:block">Catálogo</span>
          </Link>
        </div>
        <div className="pointer-events-auto font-serif text-xl tracking-[0.3em] uppercase absolute left-1/2 -translate-x-1/2">
          AETHER
        </div>
        <div className="pointer-events-auto">
          <button onClick={() => setMenuOpen(!menuOpen)} className="hover:opacity-50 transition-opacity">
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-40 bg-[#0a0a0a] text-white flex flex-col justify-center items-center"
          >
            <div className="flex flex-col gap-8 text-center font-serif text-4xl md:text-6xl font-light">
              {["Properties", "Manifesto", "Lifestyle", "Advisory"].map((item, i) => (
                <motion.a
                  key={i}
                  href="#"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="hover:italic hover:text-white/50 transition-all"
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
        <Introduction />
        <FeaturedEstates />
        <LifestyleScroll />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </DemoLayout>
  );
}
