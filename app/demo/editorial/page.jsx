"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Play, Search, Plus } from "lucide-react";
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
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseOver = (e) => {
      const target = e.target;
      if (
        target.tagName.toLowerCase() === 'a' || 
        target.tagName.toLowerCase() === 'button' || 
        target.closest('a') || 
        target.closest('button') ||
        target.closest('.interactive')
      ) {
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
      animate={{
        width: isHovering ? 60 : 12,
        height: isHovering ? 60 : 12,
        x: x - (isHovering ? 30 : 6),
        y: y - (isHovering ? 30 : 6),
      }}
      transition={{ type: "tween", ease: "backOut", duration: 0.15 }}
    >
      <AnimatePresence>
        {isHovering && (
          <motion.span 
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            className="text-black font-sans text-[8px] uppercase tracking-widest absolute text-center leading-none"
          >
            Explore
          </motion.span>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const MagneticElement = ({ children, className }) => {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.1, y: middleY * 0.1 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  const { x, y } = position;
  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x, y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/* -------------------------------------------------------------------------- */
/*                                  SECTIONS                                  */
/* -------------------------------------------------------------------------- */

const Hero = () => {
  return (
    <section className="relative w-full h-[100svh] flex items-center justify-center bg-[#E4E4E4] overflow-hidden pt-20 md:pt-0">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] md:w-[60%] h-[70%] z-10 overflow-hidden">
        <motion.img 
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1] }}
          src="/images/demo/editorial/hero.jpg" 
          alt="MUSE Magazine" 
          className="w-full h-full object-cover grayscale mix-blend-multiply" 
        />
      </div>

      <div className="relative z-20 w-full px-6 md:px-12 flex flex-col justify-between h-[80%] md:h-[70%] pointer-events-none">
        <div className="flex justify-between w-full">
          <motion.h1 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="font-serif text-[15vw] md:text-[12vw] leading-none tracking-tighter mix-blend-difference text-white"
          >
            MU
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="font-sans text-[10px] md:text-xs uppercase tracking-widest text-black/50 self-start mt-4 max-w-[120px] text-right"
          >
            The Art of Style & Culture
          </motion.p>
        </div>
        <div className="flex justify-between items-end w-full">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="font-sans text-[10px] md:text-xs uppercase tracking-[0.2em] text-black/70 pointer-events-auto"
          >
            <p>Issue N° 45</p>
            <p>Spring 2026</p>
          </motion.div>
          <motion.h1 
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="font-serif text-[15vw] md:text-[12vw] leading-none tracking-tighter mix-blend-difference text-white"
          >
            SE.
          </motion.h1>
        </div>
      </div>
      
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-px h-12 bg-black"
        />
      </div>
    </section>
  );
};

const FeaturedStory = () => {
  return (
    <section className="py-24 md:py-40 px-6 md:px-12 bg-[#F2F2F2] text-black">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16 md:gap-24 items-center">
        <div className="md:w-1/2 relative group interactive">
          <div className="aspect-[3/4] overflow-hidden w-full relative">
            <motion.img 
              initial={{ scale: 1.1 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              src="/images/demo/editorial/1.jpg" 
              alt="Cover Story" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
            />
          </div>
          <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-[#D3CDC2] rounded-full flex items-center justify-center p-8 text-center mix-blend-multiply md:group-hover:scale-110 transition-transform duration-500 hidden md:flex">
            <span className="font-serif italic text-2xl">The<br/>Avant-Garde</span>
          </div>
        </div>
        
        <div className="md:w-1/2 flex flex-col justify-center">
          <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-black/50 mb-6">Cover Story</p>
          <h2 className="font-serif text-5xl md:text-7xl leading-[1.1] mb-8 tracking-tighter">
            Silhouettes of <br /> Tomorrow.
          </h2>
          <p className="font-sans text-sm leading-relaxed text-black/70 mb-12 max-w-md">
            In an era defined by rapid technological advancement, fashion turns inward. The new minimalism embraces architectural structure, shedding excess to reveal the pure geometry of the human form.
          </p>
          <blockquote className="border-l border-black pl-6 my-8">
            <p className="font-serif text-2xl md:text-3xl italic text-black/80 leading-snug">
              "We are no longer dressing for the gaze of others, but for the architecture of our own minds."
            </p>
            <footer className="font-sans text-[10px] uppercase tracking-widest text-black/50 mt-4">— Elena Rostova</footer>
          </blockquote>
          <button className="interactive self-start mt-8 flex items-center gap-3 font-sans text-xs uppercase tracking-[0.2em] border-b border-black pb-1 hover:text-black/50 transition-colors">
            Read Full Editorial <ArrowUpRight size={14} />
          </button>
        </div>
      </div>
    </section>
  );
};

const ArchiveHorizontal = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);

  const issues = [
    { num: "45", title: "The Structure", img: "/images/demo/editorial/2.jpg" },
    { num: "44", title: "Midnight Sun", img: "/images/demo/editorial/3.jpg" },
    { num: "43", title: "Velvet Underground", img: "/images/demo/editorial/4.jpg" },
    { num: "42", title: "Ethereal Form", img: "/images/demo/editorial/5.jpg" },
  ];

  return (
    <section ref={containerRef} className="h-[250vh] bg-[#111] relative text-white">
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center">
        <div className="absolute top-16 left-6 md:left-12 flex justify-between w-[calc(100%-3rem)] md:w-[calc(100%-6rem)]">
          <h2 className="font-serif text-4xl md:text-5xl">The Archive</h2>
          <button className="interactive font-sans text-[10px] uppercase tracking-[0.2em] text-white/50 hover:text-white transition-colors">
            View All Issues
          </button>
        </div>

        <motion.div style={{ x }} className="flex gap-12 md:gap-24 px-6 md:px-32 w-[200vw] items-center h-full">
          {issues.map((issue, i) => (
            <div key={i} className="w-[75vw] md:w-[35vw] flex-shrink-0 group interactive">
              <div className="relative aspect-[3/4] overflow-hidden mb-8">
                <img src={issue.img} alt={issue.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-500" />
                <div className="absolute top-4 left-4 bg-white text-black font-sans text-[10px] font-bold px-2 py-1">
                  N° {issue.num}
                </div>
              </div>
              <h3 className="font-serif text-4xl md:text-6xl text-white group-hover:italic transition-all duration-300">
                {issue.title}
              </h3>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const LatestArticles = () => {
  const articles = [
    { category: "Fashion", title: "The Return of the Power Suit", date: "April 2026", img: "/images/demo/editorial/6.jpg" },
    { category: "Culture", title: "Abstract Expressionism in Modern Cinema", date: "April 2026", img: "/images/demo/editorial/7.jpg" },
    { category: "Beauty", title: "Bare Canvas: The No-Makeup Movement", date: "March 2026", img: "/images/demo/editorial/8.jpg" },
    { category: "Design", title: "Wabi-Sabi in Contemporary Ceramics", date: "March 2026", img: "/images/demo/editorial/1.jpg" },
  ];

  return (
    <section className="py-24 md:py-40 px-6 md:px-12 bg-white text-black">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-serif text-5xl md:text-7xl leading-none tracking-tighter mb-16 border-b border-black/10 pb-8">
          Read.
        </h2>
        
        <div className="flex flex-col border-t border-black/10">
          {articles.map((art, i) => (
            <div key={i} className="group interactive border-b border-black/10 py-8 md:py-12 flex flex-col md:flex-row justify-between items-start md:items-center relative cursor-pointer">
              
              {/* Hover Image Reveal */}
              <div className="absolute right-1/4 top-1/2 -translate-y-1/2 w-48 aspect-[3/4] overflow-hidden opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-500 z-10 hidden md:block scale-90 group-hover:scale-100 rotate-6 group-hover:rotate-0">
                <img src={art.img} alt={art.title} className="w-full h-full object-cover" />
              </div>

              <div className="flex flex-col md:w-2/3">
                <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-black/50 mb-4">{art.category} &mdash; {art.date}</p>
                <h3 className="font-serif text-3xl md:text-5xl group-hover:italic group-hover:translate-x-4 transition-all duration-500">
                  {art.title}
                </h3>
              </div>
              
              <div className="mt-6 md:mt-0 md:w-1/3 flex justify-end">
                <div className="w-12 h-12 rounded-full border border-black flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors duration-300">
                  <ArrowUpRight size={20} />
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <button className="interactive font-sans text-[10px] uppercase tracking-[0.2em] border-b border-black pb-1 hover:opacity-50 transition-opacity">
            Load More Articles
          </button>
        </div>
      </div>
    </section>
  );
};

const VideoEditorial = () => {
  return (
    <section className="relative h-screen w-full flex items-center justify-center bg-[#111] overflow-hidden text-white interactive">
      <motion.img 
        initial={{ scale: 1.1 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 2, ease: "easeOut" }}
        src="/images/demo/editorial/3.jpg" 
        alt="Video Editorial" 
        className="absolute inset-0 w-full h-full object-cover opacity-60"
      />
      <div className="relative z-10 flex flex-col items-center">
        <MagneticElement className="w-24 h-24 md:w-32 md:h-32 rounded-full border border-white/30 flex items-center justify-center backdrop-blur-sm cursor-pointer hover:bg-white hover:text-black transition-colors duration-500 group">
          <Play size={32} className="ml-2 group-hover:scale-110 transition-transform" />
        </MagneticElement>
        <p className="font-sans text-xs uppercase tracking-[0.3em] mt-8 text-white/70">Watch Editorial</p>
        <h2 className="font-serif text-4xl md:text-6xl mt-4">Midnight Sun</h2>
      </div>
    </section>
  );
};

const Newsletter = () => {
  return (
    <section className="py-32 md:py-48 px-6 md:px-12 bg-[#D3CDC2] text-black text-center">
      <div className="max-w-4xl mx-auto">
        <p className="font-sans text-[10px] uppercase tracking-[0.4em] text-black/50 mb-8">Newsletter</p>
        <h2 className="font-serif text-4xl md:text-7xl leading-tight mb-16 tracking-tighter">
          Join the Muse <br/> Collective.
        </h2>
        <form className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto">
          <input 
            type="email" 
            placeholder="Enter your email address" 
            className="flex-1 bg-transparent border-b border-black py-4 font-sans text-sm md:text-base outline-none focus:border-black/50 transition-colors placeholder:text-black/30 text-center md:text-left"
            required
          />
          <button type="submit" className="interactive bg-black text-white font-sans text-[10px] uppercase tracking-[0.2em] px-10 py-4 hover:bg-black/80 transition-colors mt-4 md:mt-0">
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-white text-black py-16 px-6 md:px-12 border-t border-black/10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <div className="md:col-span-2">
          <h2 className="font-serif text-4xl md:text-6xl mb-6 tracking-tighter">MUSE.</h2>
          <p className="font-sans text-xs text-black/50 max-w-xs leading-relaxed">
            An independent publication dedicated to the intersection of fashion, art, and contemporary culture. Published quarterly.
          </p>
        </div>
        <div>
          <h4 className="font-sans text-[10px] uppercase tracking-[0.2em] text-black/40 mb-6">Explore</h4>
          <ul className="flex flex-col gap-4 font-sans text-sm">
            <li><a href="#" className="interactive hover:opacity-50 transition-opacity">Fashion</a></li>
            <li><a href="#" className="interactive hover:opacity-50 transition-opacity">Culture</a></li>
            <li><a href="#" className="interactive hover:opacity-50 transition-opacity">Design</a></li>
            <li><a href="#" className="interactive hover:opacity-50 transition-opacity">Archive</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-sans text-[10px] uppercase tracking-[0.2em] text-black/40 mb-6">Social</h4>
          <ul className="flex flex-col gap-4 font-sans text-sm">
            <li><a href="#" className="interactive hover:opacity-50 transition-opacity">Instagram</a></li>
            <li><a href="#" className="interactive hover:opacity-50 transition-opacity">Twitter</a></li>
            <li><a href="#" className="interactive hover:opacity-50 transition-opacity">Pinterest</a></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center pt-8 border-t border-black/10 font-sans text-[10px] uppercase tracking-[0.2em] text-black/40 gap-4">
        <p>&copy; {new Date().getFullYear()} MUSE Magazine. All rights reserved.</p>
        <div className="flex gap-6">
          <a href="#" className="interactive hover:text-black transition-colors">Privacy</a>
          <a href="#" className="interactive hover:text-black transition-colors">Terms</a>
        </div>
      </div>
    </footer>
  );
};

/* -------------------------------------------------------------------------- */
/*                                 MAIN PAGE                                  */
/* -------------------------------------------------------------------------- */

export default function EditorialPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <DemoLayout title="MUSE | Fashion Editorial Magazine">
      <style>{`
        body { background-color: #E4E4E4; color: #111; cursor: none; }
        ::selection { background: #111; color: #E4E4E4; }
        ::-webkit-scrollbar { width: 0px; }
      `}</style>
      <Cursor />
      
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full z-50 px-6 md:px-12 py-8 flex justify-between items-center mix-blend-difference text-white pointer-events-none">
        <div className="pointer-events-auto flex items-center gap-6">
          <Link href="/" className="interactive flex items-center gap-2 hover:opacity-50 transition-opacity">
            <ArrowLeft size={16} />
            <span className="font-sans text-[10px] uppercase tracking-[0.2em] hidden md:block">Catálogo</span>
          </Link>
          <button className="interactive hidden md:block hover:opacity-50 transition-opacity">
            <Search size={16} />
          </button>
        </div>
        
        <div className="pointer-events-auto font-serif text-3xl font-bold tracking-tighter absolute left-1/2 -translate-x-1/2">
          MUSE
        </div>
        
        <div className="pointer-events-auto flex items-center gap-6">
          <button className="interactive hidden md:block font-sans text-[10px] uppercase tracking-[0.2em] border border-white/30 px-4 py-2 hover:bg-white hover:text-black transition-colors">
            Subscribe
          </button>
          <button onClick={() => setMenuOpen(!menuOpen)} className="interactive flex items-center gap-2 hover:opacity-50 transition-opacity">
            <span className="font-sans text-[10px] uppercase tracking-[0.2em] hidden md:block">Menu</span>
            <Plus size={20} className={`${menuOpen ? 'rotate-45' : ''} transition-transform duration-300`} />
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
            className="fixed inset-0 z-40 bg-[#111] text-white flex flex-col justify-center px-12"
          >
            <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-24">
              <div className="flex flex-col gap-6 font-serif text-[10vw] md:text-[6vw] leading-none tracking-tighter">
                {["Fashion", "Culture", "Design", "Archive"].map((item, i) => (
                  <motion.a
                    key={i}
                    href="#"
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.1, duration: 0.6 }}
                    className="interactive hover:italic hover:text-white/50 transition-all origin-left w-fit"
                    onClick={() => setMenuOpen(false)}
                  >
                    {item}
                  </motion.a>
                ))}
              </div>
              <div className="hidden md:flex flex-col justify-end">
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="bg-[#222] p-8"
                >
                  <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-white/50 mb-4">Latest Issue</p>
                  <div className="aspect-[3/4] w-48 overflow-hidden mb-6">
                    <img src="/images/demo/editorial/hero.jpg" alt="Latest Issue" className="w-full h-full object-cover grayscale" />
                  </div>
                  <h3 className="font-serif text-2xl mb-4">The Art of Style</h3>
                  <button className="interactive font-sans text-[10px] uppercase tracking-[0.2em] border-b border-white pb-1">Purchase Copy</button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        <Hero />
        <FeaturedStory />
        <ArchiveHorizontal />
        <LatestArticles />
        <VideoEditorial />
        <Newsletter />
      </main>
      <Footer />
    </DemoLayout>
  );
}
