"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, Calendar, Clock, MapPin, Menu } from "lucide-react";

export default function LuminaAesthetics() {
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
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
    <div className="min-h-screen bg-[#FAFAFA] text-zinc-900 font-sans selection:bg-zinc-200 cursor-none">
      <motion.div
        className="fixed top-0 left-0 w-6 h-6 rounded-full bg-zinc-900 pointer-events-none z-50 mix-blend-difference"
        animate={{
          x: mousePosition.x - 12,
          y: mousePosition.y - 12,
          scale: isHovering ? 2.5 : 1,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.5 }}
      />

      <nav className="fixed top-0 left-0 w-full px-8 py-8 flex justify-between items-center z-40 bg-[#FAFAFA]/80 backdrop-blur-md">
        <Link
          href="/"
          className="text-sm font-medium tracking-widest uppercase flex items-center gap-2 hover:opacity-50 transition-opacity"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <ArrowLeft size={16} />
          Catálogo
        </Link>
        <div className="text-xl font-light tracking-[0.2em]">LUMINA</div>
        <button
          className="hover:opacity-50 transition-opacity"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <Menu size={20} strokeWidth={1.5} />
        </button>
      </nav>

      <section className="relative w-full h-screen flex flex-col justify-center items-center px-8 pt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-5xl h-[60vh] relative overflow-hidden rounded-sm"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <img
            src="https://loremflickr.com/1600/900/skincare,clean?random=1"
            alt="Lumina Aesthetics"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/10" />
        </motion.div>
        
        <div className="w-full max-w-5xl mt-16 flex justify-between items-end">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-6xl md:text-8xl font-light tracking-tighter"
          >
            The Science
            <br />
            of Beauty.
          </motion.h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-sm text-zinc-500 max-w-xs leading-relaxed"
          >
            Advanced aesthetic treatments tailored to your unique physiology, delivered in a sanctuary of calm.
          </motion.div>
        </div>
      </section>

      <section className="w-full py-32 px-8 flex flex-col items-center">
        <div className="w-full max-w-5xl flex justify-between items-baseline mb-20 border-b border-zinc-200 pb-8">
          <h2 className="text-3xl font-light tracking-tight">Our Services</h2>
          <span className="text-sm tracking-widest uppercase text-zinc-400">01 / Treatments</span>
        </div>
        
        <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, idx) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.1 }}
              className="group cursor-none"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <div className="w-full aspect-[3/4] mb-6 overflow-hidden bg-zinc-100 rounded-sm">
                <img
                  src={`https://loremflickr.com/600/800/skincare,clean?random=${idx + 2}`}
                  alt={service.name}
                  className="w-full h-full object-cover filter grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
                />
              </div>
              <h3 className="text-xl font-light mb-2">{service.name}</h3>
              <div className="flex justify-between text-sm text-zinc-500">
                <span>{service.duration}</span>
                <span>{service.price}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="w-full py-32 px-8 bg-white flex justify-center">
        <div className="w-full max-w-3xl">
          <div className="flex justify-between items-baseline mb-16">
            <h2 className="text-3xl font-light tracking-tight">Book a Consultation</h2>
            <span className="text-sm tracking-widest uppercase text-zinc-400">02 / Appointments</span>
          </div>

          <div className="mb-12 flex items-center justify-between relative">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-px bg-zinc-100 -z-10" />
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm transition-colors duration-500 ${
                  step >= i ? "bg-zinc-900 text-white" : "bg-white border border-zinc-200 text-zinc-400"
                }`}
              >
                {step > i ? <Check size={16} /> : i}
              </div>
            ))}
          </div>

          <div className="min-h-[400px] relative">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col gap-4"
                >
                  <h3 className="text-xl font-light mb-4">Select Treatment</h3>
                  {services.map((service) => (
                    <button
                      key={service.id}
                      onClick={() => setSelectedService(service.id)}
                      onMouseEnter={() => setIsHovering(true)}
                      onMouseLeave={() => setIsHovering(false)}
                      className={`p-6 border flex justify-between items-center transition-colors duration-300 ${
                        selectedService === service.id
                          ? "border-zinc-900 bg-zinc-50"
                          : "border-zinc-200 hover:border-zinc-400"
                      }`}
                    >
                      <div className="text-left">
                        <div className="text-lg font-light">{service.name}</div>
                        <div className="text-sm text-zinc-500 mt-1">{service.duration}</div>
                      </div>
                      <div className="text-sm">{service.price}</div>
                    </button>
                  ))}
                  <div className="mt-8 flex justify-end">
                    <button
                      onClick={nextStep}
                      disabled={!selectedService}
                      onMouseEnter={() => setIsHovering(true)}
                      onMouseLeave={() => setIsHovering(false)}
                      className="px-8 py-4 bg-zinc-900 text-white text-sm tracking-widest uppercase disabled:opacity-30 disabled:cursor-not-allowed hover:bg-zinc-800 transition-colors flex items-center gap-2"
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
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <h3 className="text-xl font-light mb-6">Select Date & Time</h3>
                  
                  <div className="mb-8">
                    <div className="text-sm text-zinc-500 mb-4 flex items-center gap-2">
                      <Calendar size={16} /> Date
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {dates.map((date) => (
                        <button
                          key={date}
                          onClick={() => setSelectedDate(date)}
                          onMouseEnter={() => setIsHovering(true)}
                          onMouseLeave={() => setIsHovering(false)}
                          className={`p-4 border text-sm transition-colors duration-300 ${
                            selectedDate === date
                              ? "border-zinc-900 bg-zinc-900 text-white"
                              : "border-zinc-200 hover:border-zinc-400"
                          }`}
                        >
                          {date}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="mb-8">
                    <div className="text-sm text-zinc-500 mb-4 flex items-center gap-2">
                      <Clock size={16} /> Time
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {times.map((time) => (
                        <button
                          key={time}
                          onClick={() => setSelectedTime(time)}
                          onMouseEnter={() => setIsHovering(true)}
                          onMouseLeave={() => setIsHovering(false)}
                          className={`p-4 border text-sm transition-colors duration-300 ${
                            selectedTime === time
                              ? "border-zinc-900 bg-zinc-900 text-white"
                              : "border-zinc-200 hover:border-zinc-400"
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
                      className="px-8 py-4 text-sm tracking-widest uppercase hover:opacity-50 transition-opacity"
                    >
                      Back
                    </button>
                    <button
                      onClick={nextStep}
                      disabled={!selectedDate || !selectedTime}
                      onMouseEnter={() => setIsHovering(true)}
                      onMouseLeave={() => setIsHovering(false)}
                      className="px-8 py-4 bg-zinc-900 text-white text-sm tracking-widest uppercase disabled:opacity-30 disabled:cursor-not-allowed hover:bg-zinc-800 transition-colors flex items-center gap-2"
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
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <h3 className="text-xl font-light mb-8">Your Details</h3>
                  
                  <div className="space-y-8">
                    <div className="relative group">
                      <input
                        type="text"
                        required
                        className="w-full bg-transparent border-b border-zinc-200 py-4 outline-none text-lg peer"
                        placeholder=" "
                      />
                      <label className="absolute left-0 top-4 text-zinc-400 transition-all duration-300 peer-focus:-top-4 peer-focus:text-xs peer-focus:text-zinc-900 peer-valid:-top-4 peer-valid:text-xs peer-valid:text-zinc-900">
                        Full Name
                      </label>
                      <div className="absolute bottom-0 left-0 w-0 h-px bg-zinc-900 transition-all duration-500 group-focus-within:w-full" />
                    </div>

                    <div className="relative group">
                      <input
                        type="email"
                        required
                        className="w-full bg-transparent border-b border-zinc-200 py-4 outline-none text-lg peer"
                        placeholder=" "
                      />
                      <label className="absolute left-0 top-4 text-zinc-400 transition-all duration-300 peer-focus:-top-4 peer-focus:text-xs peer-focus:text-zinc-900 peer-valid:-top-4 peer-valid:text-xs peer-valid:text-zinc-900">
                        Email Address
                      </label>
                      <div className="absolute bottom-0 left-0 w-0 h-px bg-zinc-900 transition-all duration-500 group-focus-within:w-full" />
                    </div>

                    <div className="relative group">
                      <input
                        type="tel"
                        required
                        className="w-full bg-transparent border-b border-zinc-200 py-4 outline-none text-lg peer"
                        placeholder=" "
                      />
                      <label className="absolute left-0 top-4 text-zinc-400 transition-all duration-300 peer-focus:-top-4 peer-focus:text-xs peer-focus:text-zinc-900 peer-valid:-top-4 peer-valid:text-xs peer-valid:text-zinc-900">
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
                      className="px-8 py-4 text-sm tracking-widest uppercase hover:opacity-50 transition-opacity"
                    >
                      Back
                    </button>
                    <button
                      onClick={nextStep}
                      onMouseEnter={() => setIsHovering(true)}
                      onMouseLeave={() => setIsHovering(false)}
                      className="px-8 py-4 bg-zinc-900 text-white text-sm tracking-widest uppercase hover:bg-zinc-800 transition-colors flex items-center gap-2"
                    >
                      Confirm Booking <Check size={16} />
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 4 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col items-center justify-center text-center py-16"
                >
                  <div className="w-20 h-20 bg-green-50 text-green-600 rounded-full flex items-center justify-center mb-8">
                    <Check size={32} />
                  </div>
                  <h3 className="text-3xl font-light mb-4">Request Received</h3>
                  <p className="text-zinc-500 max-w-md">
                    Your consultation request has been securely transmitted. A specialist will contact you shortly to confirm the appointment.
                  </p>
                  <button
                    onClick={() => setStep(1)}
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                    className="mt-12 px-8 py-4 border border-zinc-200 text-sm tracking-widest uppercase hover:border-zinc-900 transition-colors"
                  >
                    Return
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      <footer className="w-full py-16 px-8 flex flex-col md:flex-row justify-between items-center text-sm text-zinc-500 border-t border-zinc-200">
        <div>© 2026 LUMINA AESTHETICS.</div>
        <div className="flex gap-8 mt-4 md:mt-0">
          <a href="#" className="hover:text-zinc-900 transition-colors" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>Instagram</a>
          <a href="#" className="hover:text-zinc-900 transition-colors" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>Journal</a>
          <a href="#" className="hover:text-zinc-900 transition-colors" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>Privacy</a>
        </div>
      </footer>
    </div>
  );
}
