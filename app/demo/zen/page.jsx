"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Wind, Sun, Leaf, Droplets, MapPin, Calendar, Check, Menu, X } from "lucide-react";
import DemoLayout from "@/components/DemoLayout";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

export default function ZenRetreatDemo() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  
  // Custom Cursor
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", updateMousePosition);
    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, []);

  const itinerary = [
    { time: "06:30 AM", title: "Sunrise Meditation", desc: "Awaken with the sun in our open-air pavilion. Guided Vipassana practice to ground your day." },
    { time: "08:00 AM", title: "Vinyasa Flow", desc: "A dynamic yoga session to build heat and synchronize breath with mindful movement." },
    { time: "10:30 AM", title: "Nourishment", desc: "Plant-based, locally sourced brunch curated by our holistic chef." },
    { time: "02:00 PM", title: "Nature Immersion", desc: "Silent walking meditation through the surrounding ancient forest trails." },
    { time: "05:00 PM", title: "Yin & Sound Healing", desc: "Deep restorative poses accompanied by Tibetan singing bowls." }
  ];

  const spaces = [
    { title: "The Shala", img: "1.jpg" },
    { title: "Water Garden", img: "2.jpg" },
    { title: "Sanctuary Rooms", img: "3.jpg" },
    { title: "Tea Pavilion", img: "4.jpg" }
  ];

  return (
    <DemoLayout title="Satori Retreat">
      <div className="bg-[#EBE9E4] text-[#2C302E] font-serif selection:bg-[#4A5D4E] selection:text-white md:cursor-none min-h-screen overflow-x-hidden">
        
        {/* Custom Cursor */}
        <motion.div
          className="hidden md:flex fixed top-0 left-0 w-3 h-3 rounded-full bg-[#4A5D4E] mix-blend-multiply pointer-events-none z-[100] items-center justify-center transition-transform duration-100 ease-out"
          animate={{
            x: mousePosition.x - 6,
            y: mousePosition.y - 6,
            scale: isHovering ? 3 : 1,
            opacity: isMenuOpen ? 0 : 1
          }}
        />

        {/* Navigation */}
        <nav className="fixed w-full z-50 px-6 py-6 md:px-12 flex justify-between items-center text-white mix-blend-difference">
          <Link href="/" className="font-sans text-xs tracking-[0.2em] uppercase flex items-center gap-2 hover:opacity-70 transition-opacity">
            <ArrowLeft size={16} /> <span className="hidden md:inline">Catalog</span>
          </Link>
          <div className="text-2xl font-light tracking-[0.3em] uppercase">Satori</div>
          <button 
            onClick={() => setIsMenuOpen(true)}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            className="font-sans text-xs tracking-[0.2em] uppercase flex items-center gap-2 hover:opacity-70 transition-opacity"
          >
            Menu <Menu size={16} />
          </button>
        </nav>

        {/* Fullscreen Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: "-100%" }}
              animate={{ opacity: 1, y: "0%" }}
              exit={{ opacity: 0, y: "-100%" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-0 z-[110] bg-[#2C302E] text-[#EBE9E4] flex flex-col justify-center px-12 md:px-24"
            >
              <button 
                onClick={() => setIsMenuOpen(false)}
                className="absolute top-8 right-8 md:top-12 md:right-12 font-sans text-xs tracking-[0.2em] uppercase flex items-center gap-2 hover:opacity-70 transition-opacity"
              >
                Close <X size={20} />
              </button>
              <div className="flex flex-col gap-6 md:gap-10">
                {["The Retreat", "Philosophy", "Spaces", "Booking"].map((item, i) => (
                  <motion.a
                    key={item}
                    href="#"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="text-5xl md:text-8xl font-light tracking-tighter hover:text-[#8C9A8E] transition-colors w-fit"
                  >
                    {item}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Hero Section */}
        <section className="relative h-screen w-full overflow-hidden flex flex-col items-center justify-center pt-20">
          <motion.div style={{ y: heroY }} className="absolute inset-0 z-0">
            <img src="/images/demo/zen/hero.jpg" alt="Nature Retreat" className="w-full h-full object-cover opacity-80" />
            <div className="absolute inset-0 bg-[#4A5D4E]/20 mix-blend-multiply" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#EBE9E4] opacity-90" />
          </motion.div>
          
          <div className="relative z-10 text-center px-6 mt-32 md:mt-48">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="w-px h-24 bg-[#2C302E]/30 mx-auto mb-8"
            />
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="text-6xl md:text-[9rem] leading-[0.85] font-light tracking-tighter text-[#2C302E] mb-8"
            >
              Return to <br className="hidden md:block"/> Stillness.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5, delay: 0.8 }}
              className="font-sans text-sm md:text-base font-light tracking-wide uppercase text-[#2C302E]/60 max-w-md mx-auto"
            >
              A Sanctuary for the Wandering Mind
            </motion.p>
          </div>
        </section>

        {/* Introduction */}
        <section className="py-32 md:py-48 px-6 md:px-12 max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2 }}
          >
            <Leaf className="w-8 h-8 mx-auto mb-12 text-[#8C9A8E]" strokeWidth={1} />
            <h2 className="text-3xl md:text-5xl font-light leading-snug tracking-tight text-[#2C302E] mb-12">
              We provide the space. <br className="hidden md:block" />
              You bring the presence.
            </h2>
            <p className="font-sans text-[#2C302E]/70 font-light leading-relaxed max-w-2xl mx-auto text-lg">
              Satori is not a destination, but a state of being. Nestled deep within ancient woodlands, our retreat offers a radical departure from the noise of modern life. Here, luxury is defined by silence, connection, and the luxury of time.
            </p>
          </motion.div>
        </section>

        {/* Philosophy Grid */}
        <section className="py-24 bg-[#2C302E] text-[#EBE9E4] px-6 md:px-12">
          <div className="max-w-7xl mx-auto">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-24"
            >
              {[
                { icon: Wind, title: "Breath", text: "The anchor to the present moment. We teach ancient Pranayama techniques to regulate the nervous system." },
                { icon: Droplets, title: "Flow", text: "Moving meditation. Our Vinyasa sequences are designed to release physical blockages and invite energetic balance." },
                { icon: Sun, title: "Awareness", text: "Cultivating the witness consciousness through guided Vipassana and extended periods of noble silence." }
              ].map((item, i) => (
                <motion.div key={i} variants={fadeUp} className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full border border-[#EBE9E4]/20 flex items-center justify-center mb-8">
                    <item.icon size={24} strokeWidth={1} className="text-[#8C9A8E]" />
                  </div>
                  <h3 className="text-3xl font-light mb-4">{item.title}</h3>
                  <p className="font-sans text-sm leading-relaxed text-[#EBE9E4]/60 font-light">
                    {item.text}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* The Spaces (Gallery) */}
        <section className="py-32 md:py-48 px-6 md:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="mb-20">
              <span className="font-sans text-xs tracking-[0.2em] uppercase text-[#8C9A8E] block mb-4">
                The Environment
              </span>
              <h2 className="text-5xl md:text-7xl font-light tracking-tighter">
                Sacred Architecture.
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              {spaces.map((space, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: i * 0.1 }}
                  className={`group relative overflow-hidden ${i % 2 !== 0 ? 'md:mt-24' : ''}`}
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                >
                  <div className="aspect-[4/5] overflow-hidden bg-[#D1CECA]">
                    <img 
                      src={`/images/demo/zen/${space.img}`} 
                      alt={space.title} 
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    />
                  </div>
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500" />
                  <div className="absolute bottom-8 left-8 text-white">
                    <h3 className="text-3xl font-light">{space.title}</h3>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Daily Rhythm (Accordion / List) */}
        <section className="py-32 bg-[#D1CECA] px-6 md:px-12">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-24">
              <span className="font-sans text-xs tracking-[0.2em] uppercase text-[#2C302E]/50 block mb-4">
                The Schedule
              </span>
              <h2 className="text-5xl md:text-7xl font-light tracking-tighter">
                Daily Rhythm.
              </h2>
            </div>

            <div className="flex flex-col">
              {itinerary.map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: i * 0.1 }}
                  className="flex flex-col md:flex-row md:items-start gap-4 md:gap-12 py-8 border-t border-[#2C302E]/10"
                >
                  <div className="font-sans text-sm font-medium tracking-[0.1em] text-[#8C9A8E] md:w-32 shrink-0 pt-1">
                    {item.time}
                  </div>
                  <div>
                    <h3 className="text-2xl md:text-3xl font-light mb-2">{item.title}</h3>
                    <p className="font-sans text-[#2C302E]/60 font-light max-w-xl leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
              <div className="border-t border-[#2C302E]/10" />
            </div>
          </div>
        </section>

        {/* Testimonial Quote */}
        <section className="py-32 md:py-48 px-6 md:px-12 text-center max-w-4xl mx-auto">
           <motion.div
             initial={{ opacity: 0, scale: 0.9 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             transition={{ duration: 1.2 }}
           >
             <div className="text-6xl text-[#8C9A8E] mb-8 font-serif">"</div>
             <p className="text-3xl md:text-5xl font-light leading-snug tracking-tight mb-12">
               Three days of silence gave me more clarity than three years of searching. A profound return to center.
             </p>
             <div className="font-sans text-xs tracking-[0.2em] uppercase text-[#2C302E]/50">
               — M. Lawson, 2025
             </div>
           </motion.div>
        </section>

        {/* Reservation Simple Form */}
        <section className="py-32 md:py-48 bg-[#2C302E] text-[#EBE9E4] px-6 md:px-12">
          <div className="max-w-4xl mx-auto">
            <div className="mb-16 md:mb-24">
              <h2 className="text-5xl md:text-7xl font-light tracking-tighter mb-6">
                Reserve your space.
              </h2>
              <p className="font-sans text-[#EBE9E4]/60 font-light max-w-lg leading-relaxed">
                Our retreats are limited to 12 participants to ensure an intimate and deeply supportive environment. Apply below to join our next gathering.
              </p>
            </div>

            <form className="font-sans space-y-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="relative group">
                  <input 
                    type="text" 
                    placeholder="Full Name"
                    className="w-full bg-transparent border-b border-[#EBE9E4]/20 py-4 outline-none font-light placeholder:text-[#EBE9E4]/30 focus:border-[#EBE9E4] transition-colors rounded-none text-lg"
                  />
                </div>
                <div className="relative group">
                  <input 
                    type="email" 
                    placeholder="Email Address"
                    className="w-full bg-transparent border-b border-[#EBE9E4]/20 py-4 outline-none font-light placeholder:text-[#EBE9E4]/30 focus:border-[#EBE9E4] transition-colors rounded-none text-lg"
                  />
                </div>
              </div>
              <div className="relative group">
                  <select className="w-full bg-transparent border-b border-[#EBE9E4]/20 py-4 outline-none font-light text-[#EBE9E4]/70 focus:border-[#EBE9E4] transition-colors rounded-none text-lg appearance-none cursor-pointer">
                    <option value="" disabled selected className="bg-[#2C302E]">Select Retreat Date</option>
                    <option value="oct" className="bg-[#2C302E]">Oct 12 - Oct 15: Silent Awakening</option>
                    <option value="nov" className="bg-[#2C302E]">Nov 02 - Nov 05: Nature Immersion</option>
                    <option value="dec" className="bg-[#2C302E]">Dec 10 - Dec 13: Movement & Breath</option>
                  </select>
              </div>
              <button 
                type="button"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                className="mt-8 flex items-center gap-4 text-sm tracking-[0.2em] uppercase border-b border-[#8C9A8E] pb-2 hover:border-[#EBE9E4] transition-colors text-[#8C9A8E] hover:text-[#EBE9E4]"
              >
                Submit Application <ArrowRight size={16} />
              </button>
            </form>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-[#EBE9E4] pt-24 pb-12 px-6 md:px-12 border-t border-[#2C302E]/10">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12 md:gap-0">
            <div className="text-4xl font-light tracking-[0.2em] uppercase text-[#2C302E]">Satori</div>
            <div className="flex gap-12 font-sans text-xs tracking-[0.2em] uppercase text-[#2C302E]/60">
              <a href="#" className="hover:text-[#2C302E] transition-colors">Journal</a>
              <a href="#" className="hover:text-[#2C302E] transition-colors">Instagram</a>
              <a href="#" className="hover:text-[#2C302E] transition-colors">Contact</a>
            </div>
          </div>
          <div className="max-w-7xl mx-auto mt-16 text-center font-sans text-[10px] tracking-[0.2em] uppercase text-[#2C302E]/40">
            © {new Date().getFullYear()} Satori Retreat. All rights reserved.
          </div>
        </footer>

      </div>
    </DemoLayout>
  );
}
