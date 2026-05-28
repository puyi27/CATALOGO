"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, Calendar, Clock, MapPin, Menu } from "lucide-react";
import DemoLayout from "@/components/DemoLayout";

export default function LuminaAesthetics() {
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [carouselWidth, setCarouselWidth] = useState(0);
  const carouselRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    import("animejs").then((module) => {
      const anime = module.default;
      anime({
        targets: '.anime-stagger-item',
        translateY: [40, 0],
        opacity: [0, 1],
        delay: anime.stagger(150, { start: 600 }),
        easing: 'easeOutExpo',
        duration: 1200
      });
    });
  }, []);

  useEffect(() => {
    if (carouselRef.current) {
      const updateWidth = () => {
        setCarouselWidth(Math.max(0, carouselRef.current.scrollWidth - carouselRef.current.offsetWidth));
      };
      updateWidth();
      window.addEventListener("resize", updateWidth);
      const timeoutId = setTimeout(updateWidth, 100);
      return () => {
        window.removeEventListener("resize", updateWidth);
        clearTimeout(timeoutId);
      };
    }
  }, []);

  const services = [
    { id: "s1", name: "Dermal Fillers", duration: "45 Min", price: "From $450" },
    { id: "s2", name: "Laser Resurfacing", duration: "60 Min", price: "From $300" },
    { id: "s3", name: "Microneedling", duration: "90 Min", price: "From $250" },
  ];

  const dates = ["Today", "Tomorrow", "Wed, 24th", "Thu, 25th"];
  const times = ["09:00", "11:30", "14:00", "16:30"];

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 4));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  return (
    <DemoLayout title="Lumina Aesthetics">
      <div className="text-zinc-900 font-sans selection:bg-zinc-200 md:cursor-none overflow-x-hidden">
      <motion.div
        className="hidden md:flex fixed top-0 left-0 w-6 h-6 rounded-full bg-zinc-900 pointer-events-none z-50 mix-blend-difference"
        animate={{
          x: mousePosition.x - 12,
          y: mousePosition.y - 12,
          scale: isHovering ? 2.5 : 1,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.5 }}
      />

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-50 bg-[#FAFAFA] flex flex-col justify-center items-center px-8"
          >
            <button
              onClick={() => setIsMenuOpen(false)}
              className="absolute top-8 right-8 p-4 active:scale-90 transition-transform"
            >
              <div className="text-sm font-medium tracking-widest uppercase">Close</div>
            </button>
            <div className="flex flex-col gap-8 text-center">
              {["Treatments", "Philosophy", "About", "Contact"].map((item, i) => (
                <motion.a
                  key={item}
                  href="#"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="text-6xl md:text-8xl font-light tracking-tighter active:scale-95 transition-transform"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

        <button
          className="fixed top-8 right-8 z-40 bg-zinc-900 text-white rounded-full p-3 hover:opacity-80 transition-opacity"
          onClick={() => setIsMenuOpen(true)}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <Menu size={20} strokeWidth={1.5} />
        </button>

      <section className="relative w-full min-h-[90vh] md:h-screen flex flex-col justify-center items-center px-6 md:px-8 pt-32 md:pt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-5xl h-[50vh] md:h-[60vh] relative overflow-hidden rounded-sm"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <div className="w-full h-full bg-gradient-to-br from-stone-200 via-neutral-100 to-stone-300" />
          <div className="absolute inset-0 bg-black/10" />
        </motion.div>
        
        <div className="w-full max-w-5xl mt-12 md:mt-16 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 md:gap-0">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-7xl md:text-9xl leading-[0.9] md:leading-none font-light tracking-tighter"
          >
            The Science
            <br />
            of Beauty.
          </motion.h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-sm md:text-base text-zinc-500 max-w-xs leading-relaxed"
          >
            Advanced aesthetic treatments tailored to your unique physiology, delivered in a sanctuary of calm.
          </motion.div>
        </div>
      </section>

      <section className="w-full py-24 md:py-32 overflow-hidden flex flex-col items-center">
        <div className="w-full max-w-5xl px-6 md:px-8 flex justify-between items-baseline mb-12 md:mb-20 border-b border-zinc-200 pb-8">
          <h2 className="text-2xl md:text-3xl font-light tracking-tight">Our Services</h2>
          <span className="text-xs md:text-sm tracking-widest uppercase text-zinc-400">01 / Treatments</span>
        </div>
        
        <div className="w-full max-w-5xl md:px-8" ref={carouselRef}>
          <motion.div
            drag="x"
            dragConstraints={{ right: 0, left: -carouselWidth }}
            dragElastic={0.1}
            className="flex md:grid md:grid-cols-3 gap-6 md:gap-8 px-6 md:px-0 w-max md:w-full cursor-grab active:cursor-grabbing"
          >
            {services.map((service, idx) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: idx * 0.1 }}
                className="group md:cursor-none w-[75vw] sm:w-[50vw] md:w-auto flex-shrink-0"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                <div className="w-full aspect-[3/4] mb-6 overflow-hidden bg-zinc-100 rounded-sm">
                  <div
                    className="w-full h-full filter md:grayscale transition-all duration-700 md:group-hover:grayscale-0 md:group-hover:scale-105"
                    style={{
                      background: `linear-gradient(135deg, hsl(${30 + idx * 45}, 20%, 90%), hsl(${50 + idx * 45}, 30%, 85%))`
                    }}
                  />
                </div>
                <h3 className="text-lg md:text-xl font-light mb-2">{service.name}</h3>
                <div className="flex justify-between text-xs md:text-sm text-zinc-500">
                  <span>{service.duration}</span>
                  <span>{service.price}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="w-full py-24 md:py-32 bg-zinc-50 overflow-hidden flex flex-col items-center">
        <div className="w-full max-w-5xl px-6 md:px-8">
          <div className="mb-16 flex flex-col items-center">
            <h2 className="text-2xl md:text-3xl font-light tracking-tight mb-4">The Experience</h2>
            <div className="w-12 h-px bg-zinc-300" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {["Precision", "Elegance", "Science", "Harmony"].map((word, i) => (
              <div key={i} className="anime-stagger-item opacity-0 p-8 border border-zinc-100 bg-white shadow-sm flex flex-col items-center justify-center gap-6 hover:shadow-lg transition-all duration-500 rounded-sm hover:-translate-y-1">
                <div 
                  className="w-16 h-16 rounded-full"
                  style={{
                    background: `linear-gradient(135deg, hsl(${40 + i * 40}, 20%, 90%), hsl(${60 + i * 40}, 30%, 85%))`
                  }}
                />
                <span className="text-sm tracking-widest uppercase text-zinc-500">{word}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full py-24 md:py-32 px-6 md:px-8 bg-white flex justify-center">
        <div className="w-full max-w-3xl">
          <div className="flex justify-between items-baseline mb-12 md:mb-16">
            <h2 className="text-2xl md:text-3xl font-light tracking-tight">Consultation</h2>
            <span className="text-xs md:text-sm tracking-widest uppercase text-zinc-400">02 / Appointments</span>
          </div>

          <div className="mb-12 flex items-center justify-between relative px-2">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-px bg-zinc-100 -z-10" />
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-xs md:text-sm transition-colors duration-500 ${
                  step >= i ? "bg-zinc-900 text-white" : "bg-white border border-zinc-200 text-zinc-400"
                }`}
              >
                {step > i ? <Check size={14} /> : i}
              </div>
            ))}
          </div>

          <div className="min-h-[450px] relative">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="flex flex-col gap-4"
                >
                  <h3 className="text-lg md:text-xl font-light mb-4">Select Treatment</h3>
                  {services.map((service) => (
                    <button
                      key={service.id}
                      onClick={() => setSelectedService(service.id)}
                      onMouseEnter={() => setIsHovering(true)}
                      onMouseLeave={() => setIsHovering(false)}
                      className={`p-5 md:p-6 border flex justify-between items-center transition-all duration-300 active:scale-[0.98] ${
                        selectedService === service.id
                          ? "border-zinc-900 bg-zinc-50"
                          : "border-zinc-200 md:hover:border-zinc-400"
                      }`}
                    >
                      <div className="text-left">
                        <div className="text-base md:text-lg font-light">{service.name}</div>
                        <div className="text-xs md:text-sm text-zinc-500 mt-1">{service.duration}</div>
                      </div>
                      <div className="text-xs md:text-sm">{service.price}</div>
                    </button>
                  ))}
                  <div className="mt-8 flex justify-end">
                    <button
                      onClick={nextStep}
                      disabled={!selectedService}
                      onMouseEnter={() => setIsHovering(true)}
                      onMouseLeave={() => setIsHovering(false)}
                      className="px-6 md:px-8 py-4 bg-zinc-900 text-white text-xs md:text-sm tracking-widest uppercase disabled:opacity-30 disabled:cursor-not-allowed md:hover:bg-zinc-800 active:scale-95 transition-all flex items-center gap-2"
                    >
                      Continue <ArrowRight size={16} />
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  <h3 className="text-lg md:text-xl font-light mb-6">Select Date & Time</h3>
                  
                  <div className="mb-8">
                    <div className="text-xs md:text-sm text-zinc-500 mb-4 flex items-center gap-2">
                      <Calendar size={14} /> Date
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                      {dates.map((date) => (
                        <button
                          key={date}
                          onClick={() => setSelectedDate(date)}
                          onMouseEnter={() => setIsHovering(true)}
                          onMouseLeave={() => setIsHovering(false)}
                          className={`p-3 md:p-4 border text-xs md:text-sm transition-all duration-300 active:scale-95 ${
                            selectedDate === date
                              ? "border-zinc-900 bg-zinc-900 text-white"
                              : "border-zinc-200 md:hover:border-zinc-400"
                          }`}
                        >
                          {date}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="mb-8">
                    <div className="text-xs md:text-sm text-zinc-500 mb-4 flex items-center gap-2">
                      <Clock size={14} /> Time
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                      {times.map((time) => (
                        <button
                          key={time}
                          onClick={() => setSelectedTime(time)}
                          onMouseEnter={() => setIsHovering(true)}
                          onMouseLeave={() => setIsHovering(false)}
                          className={`p-3 md:p-4 border text-xs md:text-sm transition-all duration-300 active:scale-95 ${
                            selectedTime === time
                              ? "border-zinc-900 bg-zinc-900 text-white"
                              : "border-zinc-200 md:hover:border-zinc-400"
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8 flex justify-between">
                    <button
                      onClick={prevStep}
                      onMouseEnter={() => setIsHovering(true)}
                      onMouseLeave={() => setIsHovering(false)}
                      className="px-4 md:px-8 py-4 text-xs md:text-sm tracking-widest uppercase md:hover:opacity-50 active:scale-95 transition-all"
                    >
                      Back
                    </button>
                    <button
                      onClick={nextStep}
                      disabled={!selectedDate || !selectedTime}
                      onMouseEnter={() => setIsHovering(true)}
                      onMouseLeave={() => setIsHovering(false)}
                      className="px-6 md:px-8 py-4 bg-zinc-900 text-white text-xs md:text-sm tracking-widest uppercase disabled:opacity-30 disabled:cursor-not-allowed md:hover:bg-zinc-800 active:scale-95 transition-all flex items-center gap-2"
                    >
                      Continue <ArrowRight size={16} />
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  <h3 className="text-lg md:text-xl font-light mb-8">Your Details</h3>
                  
                  <div className="space-y-8">
                    <div className="relative group">
                      <input
                        type="text"
                        required
                        className="w-full bg-transparent border-b border-zinc-200 py-3 md:py-4 outline-none text-[16px] md:text-lg peer rounded-none"
                        placeholder=" "
                      />
                      <label className="absolute left-0 top-3 md:top-4 text-zinc-400 transition-all duration-300 peer-focus:-top-4 peer-focus:text-xs peer-focus:text-zinc-900 peer-valid:-top-4 peer-valid:text-xs peer-valid:text-zinc-900">
                        Full Name
                      </label>
                      <div className="absolute bottom-0 left-0 w-0 h-px bg-zinc-900 transition-all duration-500 group-focus-within:w-full" />
                    </div>

                    <div className="relative group">
                      <input
                        type="email"
                        required
                        className="w-full bg-transparent border-b border-zinc-200 py-3 md:py-4 outline-none text-[16px] md:text-lg peer rounded-none"
                        placeholder=" "
                      />
                      <label className="absolute left-0 top-3 md:top-4 text-zinc-400 transition-all duration-300 peer-focus:-top-4 peer-focus:text-xs peer-focus:text-zinc-900 peer-valid:-top-4 peer-valid:text-xs peer-valid:text-zinc-900">
                        Email Address
                      </label>
                      <div className="absolute bottom-0 left-0 w-0 h-px bg-zinc-900 transition-all duration-500 group-focus-within:w-full" />
                    </div>

                    <div className="relative group">
                      <input
                        type="tel"
                        required
                        className="w-full bg-transparent border-b border-zinc-200 py-3 md:py-4 outline-none text-[16px] md:text-lg peer rounded-none"
                        placeholder=" "
                      />
                      <label className="absolute left-0 top-3 md:top-4 text-zinc-400 transition-all duration-300 peer-focus:-top-4 peer-focus:text-xs peer-focus:text-zinc-900 peer-valid:-top-4 peer-valid:text-xs peer-valid:text-zinc-900">
                        Phone Number
                      </label>
                      <div className="absolute bottom-0 left-0 w-0 h-px bg-zinc-900 transition-all duration-500 group-focus-within:w-full" />
                    </div>
                  </div>

                  <div className="mt-12 flex justify-between">
                    <button
                      onClick={prevStep}
                      onMouseEnter={() => setIsHovering(true)}
                      onMouseLeave={() => setIsHovering(false)}
                      className="px-4 md:px-8 py-4 text-xs md:text-sm tracking-widest uppercase md:hover:opacity-50 active:scale-95 transition-all"
                    >
                      Back
                    </button>
                    <button
                      onClick={nextStep}
                      onMouseEnter={() => setIsHovering(true)}
                      onMouseLeave={() => setIsHovering(false)}
                      className="px-6 md:px-8 py-4 bg-zinc-900 text-white text-xs md:text-sm tracking-widest uppercase md:hover:bg-zinc-800 active:scale-95 transition-all flex items-center gap-2"
                    >
                      <span className="hidden md:inline">Confirm Booking</span>
                      <span className="md:hidden">Confirm</span>
                      <Check size={16} />
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 4 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="flex flex-col items-center justify-center text-center py-12 md:py-16"
                >
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-green-50 text-green-600 rounded-full flex items-center justify-center mb-6 md:mb-8">
                    <Check size={28} />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-light mb-4">Request Received</h3>
                  <p className="text-sm md:text-base text-zinc-500 max-w-md">
                    Your consultation request has been securely transmitted. A specialist will contact you shortly to confirm the appointment.
                  </p>
                  <button
                    onClick={() => setStep(1)}
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                    className="mt-10 md:mt-12 px-8 py-4 border border-zinc-200 text-xs md:text-sm tracking-widest uppercase md:hover:border-zinc-900 active:scale-95 transition-all"
                  >
                    Return
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      <footer className="w-full py-12 md:py-16 px-6 md:px-8 flex flex-col md:flex-row justify-between items-center text-xs md:text-sm text-zinc-500 border-t border-zinc-200 gap-6 md:gap-0">
        <div>© 2026 LUMINA AESTHETICS.</div>
        <div className="flex gap-6 md:gap-8">
          <a href="#" className="md:hover:text-zinc-900 active:scale-95 transition-all" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>Instagram</a>
          <a href="#" className="md:hover:text-zinc-900 active:scale-95 transition-all" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>Journal</a>
          <a href="#" className="md:hover:text-zinc-900 active:scale-95 transition-all" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>Privacy</a>
        </div>
      </footer>
      </div>
    </DemoLayout>
  );
}
