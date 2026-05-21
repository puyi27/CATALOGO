"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, Leaf, Wind, Sun } from "lucide-react";

export default function SatoriRetreat() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ type: "", dates: "", name: "", email: "" });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handlePrev = () => {
    if (step > 1) setStep(step - 1);
  };

  const retreatTypes = [
    { id: "silent", title: "Silent Awakening", desc: "Three days of profound silence." },
    { id: "nature", title: "Nature Immersion", desc: "Guided forest bathing and foraging." },
    { id: "yoga", title: "Movement & Breath", desc: "Vinyasa and Pranayama focus." }
  ];

  const dateOptions = [
    "Oct 12 - Oct 15",
    "Nov 02 - Nov 05",
    "Dec 10 - Dec 13"
  ];

  return (
    <div className="min-h-screen bg-[#F5EFEB] text-[#2C302E] font-sans selection:bg-[#E3E8E3] selection:text-[#2C302E] overflow-hidden">
      <motion.div
        className="fixed top-0 left-0 w-6 h-6 rounded-full bg-[#E3E8E3] mix-blend-difference pointer-events-none z-50 flex items-center justify-center"
        animate={{
          x: mousePosition.x - 12,
          y: mousePosition.y - 12,
          scale: isHovering ? 2.5 : 1,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25, mass: 0.5 }}
      />

      <nav className="fixed top-0 w-full z-40 px-6 py-6 flex justify-between items-center mix-blend-difference text-[#F5EFEB]">
        <Link 
          href="/" 
          className="text-sm tracking-widest uppercase flex items-center gap-2 hover:opacity-70 transition-opacity"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <ArrowLeft size={16} />
          Catálogo
        </Link>
        <div className="text-xl tracking-[0.2em] font-light">SATORI</div>
        <div className="text-sm tracking-widest uppercase">Book</div>
      </nav>

      <section className="relative h-screen flex flex-col justify-center items-center px-6">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://loremflickr.com/1920/1080/zen,garden,meditation/all" 
            alt="Zen Garden" 
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-[#F5EFEB]/30" />
        </div>
        
        <div className="z-10 text-center flex flex-col items-center">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-6xl md:text-8xl lg:text-9xl font-extralight tracking-tighter text-[#2C302E] mb-6"
          >
            Find Your<br />Center
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.5 }}
            className="text-lg md:text-xl font-light tracking-wide max-w-md"
          >
            A sanctuary for the wandering mind. Reconnect with silence.
          </motion.p>
        </div>
      </section>

      <section className="py-32 px-6 md:px-20 bg-[#E3E8E3]">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="max-w-6xl mx-auto"
        >
          <div className="mb-20 text-center">
            <h2 className="text-3xl md:text-5xl font-light tracking-tight mb-4">The Experience</h2>
            <p className="text-sm tracking-widest uppercase opacity-60">Curated for stillness</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { icon: Leaf, title: "Meditation", text: "Guided sessions designed to anchor your awareness in the present moment." },
              { icon: Wind, title: "Yoga", text: "Gentle flows to release physical tension and invite energetic balance." },
              { icon: Sun, title: "Silence", text: "Dedicated periods of noble silence to foster deep internal listening." }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.2 }}
                className="flex flex-col items-center text-center p-8 bg-[#F5EFEB] rounded-3xl"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                <div className="w-16 h-16 rounded-full bg-[#E3E8E3] flex items-center justify-center mb-6">
                  <item.icon size={24} strokeWidth={1} />
                </div>
                <h3 className="text-xl font-light tracking-wide mb-4">{item.title}</h3>
                <p className="font-light opacity-70 leading-relaxed">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <section className="py-32 px-6 md:px-20 bg-[#F5EFEB] min-h-screen flex items-center">
        <div className="max-w-4xl mx-auto w-full">
          <div className="mb-16 text-center">
            <h2 className="text-3xl md:text-5xl font-light tracking-tight mb-4">Reserve Your Journey</h2>
            <div className="flex justify-center items-center gap-4 mt-8">
              {[1, 2, 3].map((num) => (
                <div key={num} className="flex items-center gap-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm transition-colors duration-500 ${step >= num ? 'bg-[#2C302E] text-[#F5EFEB]' : 'border border-[#2C302E]/20 text-[#2C302E]/40'}`}>
                    {step > num ? <Check size={14} /> : num}
                  </div>
                  {num < 3 && <div className={`w-12 h-[1px] transition-colors duration-500 ${step > num ? 'bg-[#2C302E]' : 'bg-[#2C302E]/20'}`} />}
                </div>
              ))}
            </div>
          </div>

          <div className="relative min-h-[400px] bg-white p-8 md:p-16 rounded-3xl shadow-sm">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="flex flex-col h-full"
                >
                  <h3 className="text-2xl font-light mb-8 text-center">Choose Retreat Type</h3>
                  <div className="space-y-4 flex-grow">
                    {retreatTypes.map((type) => (
                      <div 
                        key={type.id}
                        onClick={() => setFormData({ ...formData, type: type.id })}
                        onMouseEnter={() => setIsHovering(true)}
                        onMouseLeave={() => setIsHovering(false)}
                        className={`p-6 border rounded-2xl cursor-pointer transition-all duration-300 ${formData.type === type.id ? 'border-[#2C302E] bg-[#F5EFEB]' : 'border-transparent bg-gray-50 hover:bg-[#E3E8E3]/30'}`}
                      >
                        <div className="text-lg tracking-wide mb-2">{type.title}</div>
                        <div className="text-sm font-light opacity-60">{type.desc}</div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="flex flex-col h-full"
                >
                  <h3 className="text-2xl font-light mb-8 text-center">Select Dates</h3>
                  <div className="space-y-4 flex-grow">
                    {dateOptions.map((date) => (
                      <div 
                        key={date}
                        onClick={() => setFormData({ ...formData, dates: date })}
                        onMouseEnter={() => setIsHovering(true)}
                        onMouseLeave={() => setIsHovering(false)}
                        className={`p-6 border rounded-2xl cursor-pointer transition-all duration-300 ${formData.dates === date ? 'border-[#2C302E] bg-[#F5EFEB]' : 'border-transparent bg-gray-50 hover:bg-[#E3E8E3]/30'}`}
                      >
                        <div className="text-lg tracking-wide">{date}</div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="flex flex-col h-full"
                >
                  <h3 className="text-2xl font-light mb-8 text-center">Guest Details</h3>
                  <div className="space-y-12 flex-grow mt-8">
                    <div className="relative group">
                      <input 
                        type="text" 
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Full Name"
                        className="w-full bg-transparent border-b border-[#2C302E]/20 py-4 outline-none font-light placeholder:text-[#2C302E]/40 focus:border-transparent transition-colors peer"
                      />
                      <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#2C302E] transition-all duration-500 ease-out peer-focus:w-full" />
                    </div>
                    <div className="relative group">
                      <input 
                        type="email" 
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="Email Address"
                        className="w-full bg-transparent border-b border-[#2C302E]/20 py-4 outline-none font-light placeholder:text-[#2C302E]/40 focus:border-transparent transition-colors peer"
                      />
                      <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#2C302E] transition-all duration-500 ease-out peer-focus:w-full" />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="mt-12 flex justify-between items-center border-t border-[#2C302E]/10 pt-8">
              <button 
                onClick={handlePrev}
                disabled={step === 1}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                className={`uppercase tracking-widest text-sm flex items-center gap-2 transition-opacity ${step === 1 ? 'opacity-0 pointer-events-none' : 'opacity-60 hover:opacity-100'}`}
              >
                <ArrowLeft size={16} /> Back
              </button>
              
              {step < 3 ? (
                <button 
                  onClick={handleNext}
                  disabled={(step === 1 && !formData.type) || (step === 2 && !formData.dates)}
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                  className={`uppercase tracking-widest text-sm flex items-center gap-2 transition-all ${((step === 1 && !formData.type) || (step === 2 && !formData.dates)) ? 'opacity-30 pointer-events-none' : 'opacity-100 hover:gap-4'}`}
                >
                  Continue <ArrowRight size={16} />
                </button>
              ) : (
                <button 
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                  className="uppercase tracking-widest text-sm bg-[#2C302E] text-[#F5EFEB] px-8 py-3 rounded-full hover:bg-black transition-colors"
                >
                  Confirm
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      <footer className="py-12 px-6 md:px-20 border-t border-[#2C302E]/10 text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-2xl font-light tracking-[0.2em]">SATORI</div>
        <div className="text-sm font-light opacity-60">© {new Date().getFullYear()} Satori Retreat. All rights reserved.</div>
        <div className="flex gap-6 text-sm tracking-widest uppercase opacity-80">
          <Link href="#" className="hover:opacity-100 transition-opacity">Instagram</Link>
          <Link href="#" className="hover:opacity-100 transition-opacity">Contact</Link>
        </div>
      </footer>
    </div>
  );
}
