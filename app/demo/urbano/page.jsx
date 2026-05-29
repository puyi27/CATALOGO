"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence, useSpring } from "framer-motion";
import Link from "next/link";
import { ShoppingCart, Menu, X, ArrowRight, Instagram, Twitter, Flame, Skull } from "lucide-react";
import DemoLayout from "@/components/DemoLayout";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// Data
const products = [
  { id: "P01", name: "HELLFIRE HOODIE", price: "€120", status: "AVAILABLE", img: "/images/demo/urbano/1.jpg" },
  { id: "P02", name: "SCYTHE CARGO", price: "€150", status: "LAST UNITS", img: "/images/demo/urbano/2.jpg" },
  { id: "P03", name: "VOID TEE", price: "€60", status: "SOLD OUT", img: "/images/demo/urbano/3.jpg" },
  { id: "P04", name: "REAPER VEST", price: "€210", status: "AVAILABLE", img: "/images/demo/urbano/4.jpg" },
  { id: "P05", name: "ASHES BEANIE", price: "€45", status: "AVAILABLE", img: "/images/demo/urbano/5.jpg" },
  { id: "P06", name: "GHOST RUNNER", price: "€190", status: "SOLD OUT", img: "/images/demo/urbano/6.jpg" },
];

const lookbook = [
  { id: "L01", title: "LOOK 01", desc: "Urban decay inspired fit.", img: "/images/demo/urbano/1.jpg" },
  { id: "L02", title: "LOOK 02", desc: "Monochrome silhouette.", img: "/images/demo/urbano/2.jpg" },
  { id: "L03", title: "LOOK 03", desc: "Techwear meets street.", img: "/images/demo/urbano/3.jpg" },
  { id: "L04", title: "LOOK 04", desc: "Tactical approach.", img: "/images/demo/urbano/4.jpg" },
];

const features = [
  "NO RESTOCKS", "HEAVYWEIGHT COTTON", "WORLDWIDE SHIPPING", "HAND DISTRESSED"
];

function Countdown() {
  const [time, setTime] = useState({ h: 24, m: 0, s: 0 });
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(prev => {
        let { h, m, s } = prev;
        if (s > 0) s--;
        else if (m > 0) { m--; s = 59; }
        else if (h > 0) { h--; m = 59; s = 59; }
        return { h, m, s };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);
  
  return (
    <div className="flex gap-4 font-mono text-3xl md:text-5xl font-black">
      <div className="flex flex-col items-center">
        <span>{String(time.h).padStart(2, "0")}</span>
        <span className="text-[10px] uppercase text-red-500 tracking-widest mt-1">HRS</span>
      </div>
      <span className="text-red-500">:</span>
      <div className="flex flex-col items-center">
        <span>{String(time.m).padStart(2, "0")}</span>
        <span className="text-[10px] uppercase text-red-500 tracking-widest mt-1">MIN</span>
      </div>
      <span className="text-red-500">:</span>
      <div className="flex flex-col items-center">
        <span>{String(time.s).padStart(2, "0")}</span>
        <span className="text-[10px] uppercase text-red-500 tracking-widest mt-1">SEC</span>
      </div>
    </div>
  );
}

export default function UrbanoDemo() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  const heroImageRef = useRef(null);
  const { scrollYProgress: heroProgress } = useScroll({ target: heroImageRef, offset: ["start start", "end start"] });
  const heroScale = useTransform(heroProgress, [0, 1], [1, 1.2]);
  const heroOpacity = useTransform(heroProgress, [0, 1], [1, 0.5]);

  const lookbookRef = useRef(null);
  const { scrollYProgress: lookbookProgress } = useScroll({ target: lookbookRef });
  const lookbookX = useTransform(lookbookProgress, [0, 1], ["0%", "-75%"]);

  return (
    <DemoLayout title="URBANO — Streetwear">
      <div className="bg-[#050505] text-[#f4f4f4] font-sans selection:bg-red-600 selection:text-white cursor-none overflow-x-hidden">
        
        {/* Scroll Progress */}
        <motion.div className="fixed top-0 left-0 right-0 h-1.5 bg-red-600 origin-left z-[100]" style={{ scaleX }} />

        {/* Custom Cursor */}
        <motion.div 
          className="fixed top-0 left-0 w-8 h-8 border-2 border-red-600 rounded-full pointer-events-none z-[9999] flex items-center justify-center mix-blend-difference"
          animate={{
            x: mousePosition.x - 16,
            y: mousePosition.y - 16,
            scale: isHovering ? 2 : 1,
            backgroundColor: isHovering ? "rgba(220, 38, 38, 0.2)" : "transparent"
          }}
          transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.5 }}
        >
          {isHovering && <div className="w-1 h-1 bg-red-600 rounded-full" />}
        </motion.div>

        {/* Navigation */}
        <nav className="fixed top-0 w-full p-6 md:p-10 flex justify-between items-center z-50 mix-blend-difference">
          <Link href="/" className="font-black text-2xl md:text-3xl tracking-tighter uppercase text-white hover:text-red-600 transition-colors"
            onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
            URBANO™
          </Link>
          <div className="flex items-center gap-8">
            <button className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-white hover:text-red-600 transition-colors"
              onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
              Cart [0]
            </button>
            <button onClick={() => setMenuOpen(!menuOpen)} className="text-white hover:text-red-600 transition-colors"
              onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
              {menuOpen ? <X size={32} /> : <Menu size={32} />}
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
              transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
              className="fixed inset-0 bg-[#050505] z-40 flex flex-col justify-center items-center px-6"
            >
              <div className="absolute top-10 left-10 text-red-600 font-mono text-xs uppercase tracking-widest font-bold">MENU</div>
              <div className="flex flex-col gap-8 text-center w-full max-w-3xl">
                {["Shop All", "Lookbook", "Archive", "About"].map((item, i) => (
                  <motion.a 
                    key={item} href={`#${item.toLowerCase().replace(' ', '-')}`}
                    initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 + i * 0.1 }}
                    onClick={() => setMenuOpen(false)}
                    className="text-6xl md:text-8xl font-black uppercase tracking-tighter hover:text-red-600 hover:italic transition-all border-b border-white/10 pb-4"
                    onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}
                  >
                    {item}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 1. HERO SECTION */}
        <section ref={heroImageRef} className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden">
          <motion.div style={{ scale: heroScale, opacity: heroOpacity }} className="absolute inset-0 z-0">
             <img src="/images/demo/urbano/hero.jpg" alt="Hero" className="w-full h-full object-cover filter grayscale contrast-125 brightness-75" />
             <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#050505]" />
          </motion.div>
          <div className="relative z-10 w-full flex flex-col items-center text-center mt-20">
            <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1, ease: "easeOut" }} className="flex items-center gap-4 mb-6">
              <Flame className="text-red-600 animate-pulse" size={32} />
              <span className="font-mono text-xs md:text-sm font-bold uppercase tracking-widest text-red-600 border border-red-600 px-4 py-2 bg-black/50 backdrop-blur-sm">Season 04 Drop</span>
            </motion.div>
            <motion.h1 
              initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
              className="text-[clamp(4rem,18vw,15rem)] font-black uppercase leading-[0.8] tracking-tighter mix-blend-overlay text-white"
            >
              DEAD<br/>STOCK
            </motion.h1>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.6 }} className="mt-12">
              <p className="font-mono text-xs uppercase tracking-widest text-white/50 mb-4">Ends In</p>
              <Countdown />
            </motion.div>
          </div>
        </section>

        {/* 2. INFINITE MARQUEE */}
        <div className="py-8 bg-red-600 text-black overflow-hidden flex whitespace-nowrap border-y-4 border-black">
          <motion.div 
            animate={{ x: [0, -1000] }} 
            transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
            className="flex text-4xl md:text-6xl font-black uppercase tracking-tighter"
          >
            <span className="mx-8">NO RESTOCKS</span><span className="mx-8">✦</span>
            <span className="mx-8">FINAL SALE</span><span className="mx-8">✦</span>
            <span className="mx-8">WORLDWIDE SHIPPING</span><span className="mx-8">✦</span>
            <span className="mx-8">NO RESTOCKS</span><span className="mx-8">✦</span>
            <span className="mx-8">FINAL SALE</span><span className="mx-8">✦</span>
            <span className="mx-8">WORLDWIDE SHIPPING</span><span className="mx-8">✦</span>
          </motion.div>
        </div>

        {/* 3. LATEST DROP (GRID) */}
        <section id="shop-all" className="py-32 px-6 md:px-10">
          <div className="max-w-[1600px] mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-6">
              <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none">
                LATEST <br/><span className="text-red-600">DROP</span>
              </h2>
              <p className="font-mono text-xs uppercase tracking-widest max-w-xs text-white/50 text-right">
                Engineered for the streets. Heavyweight fabrics, custom washes, limited quantities.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
              {products.map((product, i) => (
                <div key={product.id} className="group flex flex-col">
                  <div 
                    className="relative aspect-[3/4] bg-[#111] overflow-hidden rounded-xl border-2 border-transparent group-hover:border-red-600 transition-colors duration-500"
                    onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}
                  >
                    <img src={product.img} alt={product.name} className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" />
                    
                    {/* Overlay Status */}
                    <div className="absolute top-4 left-4">
                      <span className={cn(
                        "font-mono text-[10px] font-black uppercase tracking-widest px-3 py-1",
                        product.status === "SOLD OUT" ? "bg-red-600 text-black" : "bg-black text-white border border-white/20"
                      )}>
                        {product.status}
                      </span>
                    </div>

                    {/* Quick Add Button */}
                    <div className="absolute bottom-4 left-4 right-4 translate-y-20 group-hover:translate-y-0 transition-transform duration-500">
                      <button className="w-full bg-red-600 text-black font-black uppercase tracking-widest py-4 flex items-center justify-center gap-2 hover:bg-white transition-colors"
                        disabled={product.status === "SOLD OUT"}>
                        <ShoppingCart size={18} />
                        {product.status === "SOLD OUT" ? "UNAVAILABLE" : "ADD TO CART"}
                      </button>
                    </div>
                  </div>
                  
                  <div className="mt-6 flex justify-between items-start">
                    <div>
                      <h3 className="text-2xl font-black uppercase tracking-tighter">{product.name}</h3>
                      <p className="font-mono text-[10px] uppercase tracking-widest text-white/40 mt-1">{product.id}</p>
                    </div>
                    <span className="text-xl font-bold font-mono text-red-600">{product.price}</span>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-20 flex justify-center">
              <button className="font-black text-2xl uppercase tracking-tighter border-b-4 border-red-600 pb-2 hover:text-red-600 transition-colors"
                onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
                VIEW ARCHIVE
              </button>
            </div>
          </div>
        </section>

        {/* 4. ABOUT / TEXT BLOCK */}
        <section className="py-32 bg-red-600 text-black px-6 md:px-10 flex items-center justify-center text-center">
          <div className="max-w-4xl">
            <Skull size={48} className="mx-auto mb-10" />
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter leading-[1.1] mb-10">
              We reject the fast fashion cycle. Every garment is constructed with purpose, designed to age, and built to survive.
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              {features.map((f, i) => (
                <span key={i} className="border-2 border-black px-4 py-2 font-mono text-xs font-bold uppercase tracking-widest">
                  {f}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* 5. HORIZONTAL SCROLL LOOKBOOK */}
        <section id="lookbook" ref={lookbookRef} className="h-[300vh] relative bg-[#050505]">
          <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden py-20">
            <div className="absolute top-10 left-6 md:left-10 z-10 mix-blend-difference">
              <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter text-white">LOOK<br/><span className="text-red-600">BOOK</span></h2>
              <p className="font-mono text-xs uppercase tracking-widest text-white/50 mt-4">VOL. 04 — TOKYO</p>
            </div>
            
            <motion.div style={{ x: lookbookX }} className="flex gap-10 md:gap-20 px-6 md:px-[30vw] items-center mt-20">
              {lookbook.map((look, i) => (
                <div key={look.id} className="w-[85vw] md:w-[45vw] flex-shrink-0 relative group">
                  <div className="aspect-[4/5] overflow-hidden border border-white/10 relative"
                    onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
                    <img src={look.img} alt={look.title} className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700" />
                    <div className="absolute inset-0 border-4 border-transparent group-hover:border-red-600 transition-colors duration-500 pointer-events-none" />
                  </div>
                  <div className="mt-6 flex justify-between items-center">
                    <h3 className="text-4xl font-black uppercase tracking-tighter">{look.title}</h3>
                    <p className="font-mono text-xs uppercase tracking-widest text-white/50 max-w-[150px] text-right">{look.desc}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* 6. NEWSLETTER */}
        <section className="py-32 px-6 md:px-10 border-y border-white/10 bg-[#0a0a0a]">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-6">JOIN THE <span className="text-red-600">CULT</span></h2>
            <p className="font-mono text-xs uppercase tracking-widest text-white/50 mb-12">Sign up for early access to drops and exclusive discounts. No spam, just heat.</p>
            <form className="flex flex-col md:flex-row w-full max-w-2xl mx-auto border-2 border-white/20 focus-within:border-red-600 transition-colors">
              <input 
                type="email" 
                placeholder="ENTER YOUR EMAIL" 
                className="flex-1 bg-transparent p-6 font-mono text-sm tracking-widest text-white outline-none placeholder:text-white/30 uppercase"
                onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}
              />
              <button 
                type="button"
                className="bg-red-600 text-black font-black uppercase tracking-widest px-10 py-6 hover:bg-white transition-colors flex items-center justify-center gap-2"
                onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}
              >
                SUBSCRIBE <ArrowRight size={20} />
              </button>
            </form>
          </div>
        </section>

        {/* 7. FOOTER */}
        <footer className="pt-32 pb-10 px-6 md:px-10 bg-[#050505]">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-white/10 pb-20">
            <div className="col-span-1 md:col-span-2">
              <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-6">URBANO™</h2>
              <p className="font-mono text-xs uppercase tracking-widest text-white/40 max-w-sm leading-relaxed">
                Independent streetwear label defined by brutalist aesthetics and uncompromising quality. Born in 2026.
              </p>
            </div>
            <div>
              <h4 className="font-mono text-xs font-bold uppercase tracking-widest text-red-600 mb-6">Links</h4>
              <ul className="space-y-4 font-black uppercase tracking-widest text-lg">
                <li><a href="#" className="hover:text-red-600 transition-colors">Shop</a></li>
                <li><a href="#" className="hover:text-red-600 transition-colors">Archive</a></li>
                <li><a href="#" className="hover:text-red-600 transition-colors">Stockists</a></li>
                <li><a href="#" className="hover:text-red-600 transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-mono text-xs font-bold uppercase tracking-widest text-red-600 mb-6">Social</h4>
              <div className="flex gap-4">
                <a href="#" className="w-12 h-12 border-2 border-white/20 flex items-center justify-center hover:bg-red-600 hover:border-red-600 transition-all rounded-full">
                  <Instagram size={20} />
                </a>
                <a href="#" className="w-12 h-12 border-2 border-white/20 flex items-center justify-center hover:bg-red-600 hover:border-red-600 transition-all rounded-full">
                  <Twitter size={20} />
                </a>
              </div>
            </div>
          </div>
          <div className="max-w-7xl mx-auto mt-10 flex flex-col md:flex-row justify-between items-center font-mono text-[10px] uppercase tracking-widest text-white/30 gap-4">
            <p>© {new Date().getFullYear()} URBANO STUDIOS. ALL RIGHTS RESERVED.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </footer>

      </div>
    </DemoLayout>
  );
}