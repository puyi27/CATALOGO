"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence, useSpring, useMotionValue } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Leaf, Sun, Wind, Battery, ArrowUpRight, Globe, Users, Menu, X, Check } from "lucide-react";
import DemoLayout from "@/components/DemoLayout";

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

export default function EcoNovaDemo() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  
  // Custom Cursor
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const cursorXSpring = useSpring(cursorX, { damping: 28, stiffness: 500 });
  const cursorYSpring = useSpring(cursorY, { damping: 28, stiffness: 500 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e) => {
      cursorX.set(e.clientX - 8);
      cursorY.set(e.clientY - 8);
    };
    window.addEventListener("mousemove", updateMousePosition);
    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, [cursorX, cursorY]);

  const initiatives = [
    { title: "Solar Microgrids", desc: "Empowering rural communities with decentralized, renewable solar energy networks.", icon: Sun, img: "1.jpg" },
    { title: "Wind Farm Expansion", desc: "Scaling offshore wind capabilities to power urban centers cleanly and efficiently.", icon: Wind, img: "2.jpg" },
    { title: "Battery Innovation", desc: "Investing in next-generation solid-state batteries for grid-level energy storage.", icon: Battery, img: "3.jpg" },
    { title: "Reforestation", desc: "Rebuilding natural carbon sinks through massive community-led planting efforts.", icon: Leaf, img: "4.jpg" }
  ];

  const metrics = [
    { value: "450", unit: "MW", label: "Clean Energy Generated" },
    { value: "1.2", unit: "M", label: "Tons of CO2 Offset" },
    { value: "85", unit: "k+", label: "Homes Powered" },
    { value: "12", unit: "Yrs", label: "of Relentless Action" }
  ];

  return (
    <DemoLayout title="EcoNova NGO">
      <div className="bg-[#F4F4F4] text-[#1A1A1A] font-sans selection:bg-[#2E7D32] selection:text-white md:cursor-none min-h-screen overflow-x-hidden">
        
        {/* Custom Cursor */}
        <motion.div
          className="hidden md:flex fixed top-0 left-0 w-4 h-4 rounded-full bg-[#2E7D32] mix-blend-difference pointer-events-none z-[100] items-center justify-center transition-transform duration-100 ease-out"
          style={{ x: cursorXSpring, y: cursorYSpring }}
          animate={{
            scale: isHovering ? 2.5 : 1,
            opacity: isMenuOpen ? 0 : 1
          }}
        />

        {/* Navigation */}
        <nav className="fixed w-full z-50 px-6 py-6 md:px-12 flex justify-between items-center mix-blend-difference text-white">
          <Link href="/" className="text-xs font-bold tracking-widest uppercase flex items-center gap-2 hover:text-[#4CAF50] transition-colors">
            <ArrowRight size={16} className="rotate-180" /> <span className="hidden md:inline">Back</span>
          </Link>
          <div className="text-xl font-black tracking-tight uppercase">ECONOVA.</div>
          <button 
            onClick={() => setIsMenuOpen(true)}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            className="text-xs font-bold tracking-widest uppercase flex items-center gap-2 hover:text-[#4CAF50] transition-colors"
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
              exit={{ opacity: 0, y: "100%" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-0 z-[110] bg-[#1A1A1A] text-white flex flex-col justify-center px-12 md:px-24"
            >
              <button 
                onClick={() => setIsMenuOpen(false)}
                className="absolute top-8 right-8 md:top-12 md:right-12 text-xs font-bold tracking-widest uppercase flex items-center gap-2 hover:text-[#4CAF50] transition-colors"
              >
                Close <X size={20} />
              </button>
              <div className="flex flex-col gap-4 md:gap-8 max-w-4xl">
                {["Manifesto", "Initiatives", "Impact", "Get Involved"].map((item, i) => (
                  <motion.a
                    key={item}
                    href="#"
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="text-6xl md:text-[8rem] font-black tracking-tighter hover:text-[#4CAF50] transition-colors w-fit leading-none"
                  >
                    {item}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Hero Section */}
        <section className="relative h-screen w-full overflow-hidden flex flex-col items-start justify-end pb-12 md:pb-24 px-6 md:px-12 bg-[#1A1A1A]">
          <motion.div style={{ y: heroY }} className="absolute inset-0 z-0">
            <img src="/images/demo/sostenibilidad/hero.jpg" alt="Wind Turbines" className="w-full h-full object-cover opacity-60" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-transparent to-transparent opacity-90" />
          </motion.div>
          
          <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col gap-6 text-white">
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "100px" }}
              transition={{ duration: 1, delay: 0.2 }}
              className="h-1 bg-[#4CAF50] mb-4"
            />
            <motion.h1 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="text-6xl md:text-[10rem] leading-[0.85] font-black tracking-tighter uppercase"
            >
              Powering <br /> Tomorrow.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5, delay: 0.8 }}
              className="text-lg md:text-2xl font-light tracking-wide text-gray-300 max-w-2xl mt-4"
            >
              Accelerating the global transition to 100% clean, renewable energy. Because the future depends on action today.
            </motion.p>
          </div>
        </section>

        {/* Marquee */}
        <div className="bg-[#4CAF50] text-[#1A1A1A] py-4 border-y border-[#2E7D32] overflow-hidden flex items-center">
          <motion.div 
            animate={{ x: [0, -1000] }}
            transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
            className="flex whitespace-nowrap min-w-max"
          >
            {[...Array(6)].map((_, i) => (
              <span key={i} className="text-sm md:text-lg uppercase tracking-widest font-bold px-8">
                ACT NOW • RENEWABLE FUTURE • ZERO EMISSIONS • 
              </span>
            ))}
          </motion.div>
        </div>

        {/* The Crisis / Manifesto */}
        <section className="py-32 md:py-48 px-6 md:px-12 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24">
            <div className="md:col-span-4 flex flex-col gap-8">
              <Globe className="w-16 h-16 text-[#4CAF50]" strokeWidth={1.5} />
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none text-[#1A1A1A]">
                The Time <br /> For Talk <br /> Is Over.
              </h2>
            </div>
            <div className="md:col-span-8 flex flex-col justify-center">
              <motion.p 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1 }}
                className="text-3xl md:text-5xl font-medium tracking-tight leading-[1.1] text-[#1A1A1A] mb-8"
              >
                Climate change isn't a distant threat—it's an immediate reality. We are bridging the gap between policy and deployment.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.2 }}
                className="text-lg text-gray-600 font-normal leading-relaxed max-w-3xl"
              >
                EcoNova operates at the intersection of technology, community, and capital. By funding rapid-deployment renewable energy grids in developing nations and pushing aggressive policy changes in developed ones, we don't just advocate for change—we build it.
              </motion.p>
            </div>
          </div>
        </section>

        {/* Active Initiatives Grid */}
        <section className="py-24 md:py-32 bg-[#1A1A1A] text-white px-6 md:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
              <div>
                <span className="text-[#4CAF50] font-bold text-xs tracking-widest uppercase block mb-4">
                  Our Solutions
                </span>
                <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter">
                  Active Fronts.
                </h2>
              </div>
              <button 
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest hover:text-[#4CAF50] transition-colors"
              >
                View Full Reports <ArrowUpRight size={20} />
              </button>
            </div>

            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8"
            >
              {initiatives.map((init, i) => (
                <motion.div 
                  key={i}
                  variants={fadeUp}
                  className="group relative h-[400px] md:h-[500px] bg-zinc-800 overflow-hidden"
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                >
                  <img 
                    src={`/images/demo/sostenibilidad/${init.img}`} 
                    alt={init.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-60"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-[#1A1A1A]/40 to-transparent" />
                  
                  <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-between">
                    <div className="w-12 h-12 bg-white/10 backdrop-blur-md flex items-center justify-center rounded-full text-[#4CAF50]">
                      <init.icon size={24} />
                    </div>
                    <div>
                      <h3 className="text-3xl font-black uppercase tracking-tight mb-4 group-hover:text-[#4CAF50] transition-colors">{init.title}</h3>
                      <p className="text-gray-300 max-w-sm">
                        {init.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Impact Metrics */}
        <section className="py-32 bg-[#4CAF50] text-[#1A1A1A] px-6 md:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="mb-20 text-center">
              <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-6">
                Measurable Impact.
              </h2>
              <p className="text-xl font-medium max-w-2xl mx-auto opacity-80">
                We believe in complete transparency. Every dollar, every turbine, every tree—tracked and verified.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-8">
              {metrics.map((metric, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="flex flex-col items-center text-center"
                >
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-6xl md:text-8xl font-black tracking-tighter">{metric.value}</span>
                    <span className="text-2xl md:text-4xl font-bold">{metric.unit}</span>
                  </div>
                  <span className="text-sm md:text-base font-bold uppercase tracking-widest opacity-80">{metric.label}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Image Text Split */}
        <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-16 md:gap-24">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="w-full md:w-1/2"
            >
              <div className="aspect-[4/5] bg-zinc-200 overflow-hidden relative">
                <img src="/images/demo/sostenibilidad/5.jpg" alt="Team working" className="w-full h-full object-cover" />
                <div className="absolute bottom-6 right-6 bg-white p-6 shadow-xl">
                  <Users size={32} className="text-[#4CAF50] mb-2" />
                  <div className="text-xl font-black uppercase">2.5k Volunteers</div>
                </div>
              </div>
            </motion.div>
            
            <div className="w-full md:w-1/2 flex flex-col justify-center">
              <span className="text-[#4CAF50] font-bold text-xs tracking-widest uppercase block mb-6">
                Community First
              </span>
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-8 leading-[1]">
                Built by people, <br /> for the planet.
              </h2>
              <p className="text-lg text-gray-600 font-normal leading-relaxed mb-8">
                Technology alone won't solve the climate crisis. It requires a massive shift in human behavior and corporate accountability. Our global network of volunteers, scientists, and engineers work seamlessly to implement solutions that respect both the environment and local communities.
              </p>
              <ul className="flex flex-col gap-4 mb-10">
                {["Local training programs", "Fair wage guarantees", "Indigenous land respect"].map((item, i) => (
                  <li key={i} className="flex items-center gap-4 font-bold text-[#1A1A1A]">
                    <div className="w-6 h-6 rounded-full bg-[#4CAF50]/20 flex items-center justify-center text-[#4CAF50]">
                      <Check size={14} strokeWidth={3} />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
              <button 
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                className="w-fit px-8 py-4 bg-[#1A1A1A] text-white text-xs font-bold uppercase tracking-widest hover:bg-[#4CAF50] transition-colors"
              >
                Join the Network
              </button>
            </div>
          </div>
        </section>

        {/* Join the Movement Form */}
        <section className="py-32 md:py-48 bg-[#1A1A1A] text-white px-6 md:px-12 text-center border-t border-zinc-800">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl md:text-[7rem] font-black uppercase tracking-tighter mb-8 leading-[0.9]">
              Take Action. <br /> Right Now.
            </h2>
            <p className="text-xl text-gray-400 mb-16 max-w-2xl mx-auto">
              Whether you want to donate, volunteer your skills, or partner your organization with EcoNova, the first step is here.
            </p>
            
            <form className="space-y-8 text-left">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <input 
                  type="text" 
                  placeholder="FULL NAME"
                  className="w-full bg-zinc-900 border border-zinc-800 p-6 outline-none font-bold placeholder:text-zinc-600 focus:border-[#4CAF50] transition-colors text-sm tracking-widest uppercase"
                />
                <input 
                  type="email" 
                  placeholder="EMAIL ADDRESS"
                  className="w-full bg-zinc-900 border border-zinc-800 p-6 outline-none font-bold placeholder:text-zinc-600 focus:border-[#4CAF50] transition-colors text-sm tracking-widest uppercase"
                />
              </div>
              <select className="w-full bg-zinc-900 border border-zinc-800 p-6 outline-none font-bold text-zinc-400 focus:border-[#4CAF50] transition-colors text-sm tracking-widest uppercase appearance-none cursor-pointer">
                <option value="" disabled selected>HOW DO YOU WANT TO HELP?</option>
                <option value="volunteer">Become a Volunteer</option>
                <option value="donate">Make a Donation</option>
                <option value="partner">Corporate Partnership</option>
              </select>
              <button 
                type="button"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                className="w-full py-6 bg-[#4CAF50] text-[#1A1A1A] text-sm font-black uppercase tracking-widest hover:bg-white transition-colors"
              >
                Submit Application
              </button>
            </form>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-[#1A1A1A] pt-24 pb-12 px-6 md:px-12 border-t border-zinc-800">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12 md:gap-0">
            <div className="text-4xl font-black tracking-tight uppercase text-white">ECONOVA.</div>
            <div className="flex gap-8 md:gap-12 text-xs font-bold tracking-widest uppercase text-gray-500">
              <a href="#" className="hover:text-white transition-colors">About</a>
              <a href="#" className="hover:text-white transition-colors">Transparency</a>
              <a href="#" className="hover:text-white transition-colors">Press</a>
              <a href="#" className="hover:text-white transition-colors">Contact</a>
            </div>
          </div>
          <div className="max-w-7xl mx-auto mt-16 flex flex-col md:flex-row justify-between items-center border-t border-zinc-800 pt-8 gap-4 md:gap-0">
            <div className="text-[10px] font-bold tracking-widest uppercase text-gray-600">
              © {new Date().getFullYear()} EcoNova Organization. All rights reserved.
            </div>
            <div className="flex gap-6 text-[10px] font-bold tracking-widest uppercase text-gray-600">
              <a href="#" className="hover:text-[#4CAF50] transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-[#4CAF50] transition-colors">Terms of Service</a>
            </div>
          </div>
        </footer>

      </div>
    </DemoLayout>
  );
}