"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Leaf, Wind, Droplets, Sun, MapPin, ArrowRight, Menu, X } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const fadeUpVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    }
  }
};

function CustomCursor() {
  const cursorRef = useRef(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      const xTo = gsap.quickTo(cursorRef.current, "x", { duration: 0.15, ease: "power3" });
      const yTo = gsap.quickTo(cursorRef.current, "y", { duration: 0.15, ease: "power3" });
      
      const move = (e) => {
        xTo(e.clientX);
        yTo(e.clientY);
      };
      
      window.addEventListener("mousemove", move);
      return () => window.removeEventListener("mousemove", move);
    });
    return () => ctx.revert();
  }, []);

  return (
    <div 
      ref={cursorRef} 
      className="hidden md:flex pointer-events-none fixed top-0 left-0 w-10 h-10 rounded-full border border-[#F5F0E8] mix-blend-difference z-[10000] transform -translate-x-1/2 -translate-y-1/2 items-center justify-center"
    >
      <div className="w-1.5 h-1.5 bg-[#F5F0E8] rounded-full" />
    </div>
  );
}

export default function SostenibilidadDemo() {
  const heroRef = useRef(null);
  const textSectionRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(".parallax-bg", {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      const revealElements = gsap.utils.toArray(".reveal-text");
      revealElements.forEach((el) => {
        gsap.fromTo(el, 
          { y: 100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
            ease: "power4.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              end: "bottom 80%",
              toggleActions: "play none none reverse",
            }
          }
        );
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-[#F5F0E8] text-[#3E3A32] font-sans selection:bg-[#4A5D23] selection:text-[#F5F0E8] overflow-hidden md:cursor-none">
      <CustomCursor />

      <nav className="fixed top-0 left-0 w-full p-6 md:p-10 z-50 mix-blend-difference text-[#F5F0E8] flex justify-between items-center">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-sm uppercase tracking-widest font-semibold active:scale-95 md:hover:opacity-70 transition-all"
        >
          ← Catálogo
        </Link>

        <button 
          onClick={() => setIsMenuOpen(true)}
          className="md:hidden flex items-center justify-center w-10 h-10 rounded-full bg-[#F5F0E8] text-[#3E3A32] active:scale-90 transition-transform"
        >
          <Menu size={20} />
        </button>
      </nav>

      <motion.div 
        initial={{ y: "-100%" }}
        animate={{ y: isMenuOpen ? "0%" : "-100%" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-0 z-[100] bg-[#4A5D23] text-[#F5F0E8] flex flex-col justify-center items-center md:hidden"
      >
        <button 
          onClick={() => setIsMenuOpen(false)}
          className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full bg-[#F5F0E8] text-[#4A5D23] active:scale-90 transition-transform"
        >
          <X size={20} />
        </button>
        <div className="flex flex-col gap-8 text-center text-3xl font-serif">
          <Link href="/" onClick={() => setIsMenuOpen(false)} className="active:scale-95 transition-transform">Home</Link>
          <span onClick={() => setIsMenuOpen(false)} className="active:scale-95 transition-transform">Manifesto</span>
          <span onClick={() => setIsMenuOpen(false)} className="active:scale-95 transition-transform">Impact</span>
          <span onClick={() => setIsMenuOpen(false)} className="active:scale-95 transition-transform">Contact</span>
        </div>
      </motion.div>

      <section ref={heroRef} className="relative w-full h-[100svh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div 
            className="parallax-bg w-full h-[120%] bg-cover bg-center"
            style={{ backgroundImage: "url('https://loremflickr.com/1920/1080/nature,mist/all')" }}
          />
          <div className="absolute inset-0 bg-[#3E3A32]/40 md:bg-[#3E3A32]/30" />
        </div>
        
        <div className="relative z-10 text-center px-4 mt-20 md:mt-0 w-full max-w-[100vw]">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="flex flex-col items-center"
          >
            <motion.h1 
              variants={fadeUpVariant}
              className="text-[clamp(4rem,15vw,10rem)] font-serif text-[#F5F0E8] tracking-tighter leading-[0.85] w-full break-words"
            >
              Slow Travel
            </motion.h1>
            <motion.p 
              variants={fadeUpVariant}
              className="mt-6 md:mt-8 text-base md:text-xl text-[#F5F0E8]/90 font-light max-w-xl mx-auto tracking-wide px-4"
            >
              Rediscover the world at a pace that honors the earth and enriches the soul.
            </motion.p>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 text-[#F5F0E8] flex flex-col items-center gap-3"
        >
          <span className="text-[10px] md:text-xs uppercase tracking-widest font-medium">Scroll</span>
          <div className="w-[1px] h-10 md:h-12 bg-[#F5F0E8]/30 relative overflow-hidden">
            <motion.div 
              className="absolute top-0 left-0 w-full h-1/2 bg-[#F5F0E8]"
              animate={{ y: [0, 50, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      </section>

      <section ref={textSectionRef} className="py-24 md:py-48 px-6 md:px-20 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-20">
          <div className="md:col-span-4 flex flex-col gap-6 md:gap-8 justify-start pt-2 md:pt-4">
            <Leaf strokeWidth={1} className="w-10 h-10 md:w-12 md:h-12 text-[#4A5D23]" />
            <h2 className="text-4xl md:text-5xl font-serif text-[#4A5D23] leading-none">
              Mindful<br className="hidden md:block"/> Journeys
            </h2>
          </div>
          <div className="md:col-span-8 flex flex-col gap-8 md:gap-10">
            <div className="overflow-hidden">
              <p className="reveal-text text-[clamp(1.5rem,5vw,3rem)] leading-[1.2] md:leading-[1.15] font-serif text-[#2C2923]">
                We believe travel should not be a race, but a meaningful dialogue with the places we visit. By slowing down, we reduce our footprint and deepen our connection to local cultures and ecosystems.
              </p>
            </div>
            <div className="overflow-hidden">
              <p className="reveal-text text-base md:text-xl text-[#5A554A] font-light max-w-2xl leading-relaxed">
                Our approach to exploration prioritizes train journeys over flights, local homestays over massive resorts, and seasonal, plant-based gastronomy that supports regional farmers. Every choice is made with the intention to preserve the beauty of our planet for future generations.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20 w-full">
        <div className="flex flex-col md:flex-row w-full h-auto md:h-[80vh]">
          <div className="w-full md:w-1/2 h-[50vh] md:h-full p-4 md:p-10">
            <div className="w-full h-full relative rounded-2xl md:rounded-3xl overflow-hidden group">
              <img 
                src="https://loremflickr.com/800/1000/forest,path/all" 
                alt="Forest path" 
                className="w-full h-full object-cover transition-transform duration-1000 md:group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-[#4A5D23]/20" />
            </div>
          </div>
          <div className="w-full md:w-1/2 h-auto md:h-full flex flex-col justify-center px-6 py-12 md:py-0 md:px-20 bg-[#E8E2D5] rounded-3xl md:rounded-none mx-2 md:mx-0 -mt-6 md:mt-0 relative z-10">
             <div className="overflow-hidden mb-4 md:mb-6">
                <span className="reveal-text block text-xs md:text-sm uppercase tracking-[0.2em] font-semibold text-[#8B7355]">
                  Our Philosophy
                </span>
             </div>
             <div className="overflow-hidden">
                <h3 className="reveal-text text-[clamp(2.5rem,6vw,4rem)] font-serif text-[#3E3A32] mb-6 md:mb-8 leading-tight">
                  Leaving nothing <br /> but footprints.
                </h3>
             </div>
             <div className="overflow-hidden">
                <p className="reveal-text text-[#5A554A] text-base md:text-lg font-light max-w-md">
                  We curate experiences that actively regenerate the environments we touch. From supporting indigenous conservation projects to funding renewable energy initiatives in remote communities.
                </p>
             </div>
          </div>
        </div>
      </section>

      <ImpactSection />

      <section className="py-24 md:py-32 px-6 bg-[#3E3A32] text-[#F5F0E8] flex flex-col items-center justify-center">
        <div className="max-w-5xl mx-auto text-center flex flex-col items-center w-full">
          <h2 className="text-[clamp(2.5rem,8vw,5rem)] font-serif mb-10 md:mb-12 leading-[1.1]">
            Ready to change <br/> the way you travel?
          </h2>
          <button className="group relative flex items-center justify-center gap-4 px-8 py-4 bg-[#F5F0E8] text-[#3E3A32] rounded-full overflow-hidden transition-transform active:scale-95 duration-300 w-full md:w-auto">
            <span className="relative z-10 text-xs md:text-sm uppercase tracking-widest font-semibold">
              Explore Destinations
            </span>
            <ArrowRight className="relative z-10 w-4 h-4 transition-transform md:group-hover:translate-x-2" />
            <div className="absolute inset-0 bg-[#E8E2D5] transform scale-x-0 origin-left transition-transform duration-500 md:group-hover:scale-x-100 hidden md:block" />
          </button>
        </div>
      </section>

      <footer className="py-12 md:py-10 px-6 border-t border-[#3E3A32]/10 flex flex-col md:flex-row justify-between items-center text-sm font-light text-[#5A554A] gap-8 md:gap-0">
        <div className="flex gap-6 md:hidden">
          <span className="active:scale-95 transition-transform font-medium">Manifesto</span>
          <span className="active:scale-95 transition-transform font-medium">Impact</span>
          <span className="active:scale-95 transition-transform font-medium">Contact</span>
        </div>
        <p className="text-center md:text-left opacity-60 md:opacity-100">© 2024 Slow Travel. All rights reserved.</p>
        <div className="hidden md:flex gap-8">
          <span className="hover:text-[#4A5D23] cursor-pointer transition-colors">Manifesto</span>
          <span className="hover:text-[#4A5D23] cursor-pointer transition-colors">Impact Report</span>
          <span className="hover:text-[#4A5D23] cursor-pointer transition-colors">Contact</span>
        </div>
      </footer>
    </div>
  );
}

function ImpactSection() {
  const sectionRef = useRef(null);
  const carouselRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const metrics = [
    { label: "Carbon Emissions Reduced", value: 85, icon: <Wind size={24} /> },
    { label: "Local Communities Supported", value: 92, icon: <MapPin size={24} /> },
    { label: "Water Conservation Rate", value: 78, icon: <Droplets size={24} /> },
    { label: "Renewable Energy Usage", value: 100, icon: <Sun size={24} /> },
  ];

  return (
    <section ref={sectionRef} className="py-24 md:py-32 overflow-hidden md:overflow-visible">
      <div className="px-6 md:px-20 max-w-7xl mx-auto mb-12 md:mb-20 text-left">
        <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-serif text-[#2C2923] mb-4 md:mb-6 leading-tight">
          Our Environmental Impact
        </h2>
        <p className="text-base md:text-lg text-[#5A554A] font-light max-w-2xl">
          Transparency is key to accountability. Here is how our slow travel initiatives have positively affected the destinations we operate in over the past year.
        </p>
      </div>

      <div className="hidden md:grid grid-cols-2 gap-x-20 gap-y-16 px-20 max-w-7xl mx-auto">
        {metrics.map((metric, index) => (
          <div key={index} className="flex flex-col gap-5">
            <div className="flex justify-between items-end">
              <div className="flex items-center gap-4 text-[#4A5D23]">
                <div className="p-3 bg-[#E8E2D5] rounded-full">
                  {metric.icon}
                </div>
                <span className="text-xl font-medium tracking-wide text-[#3E3A32]">
                  {metric.label}
                </span>
              </div>
              <span className="text-4xl font-serif text-[#8B7355]">
                {isInView ? (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                  >
                    {metric.value}%
                  </motion.span>
                ) : "0%"}
              </span>
            </div>
            <div className="w-full h-1.5 bg-[#E8E2D5] rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-[#4A5D23]"
                initial={{ width: 0 }}
                animate={isInView ? { width: `${metric.value}%` } : { width: 0 }}
                transition={{ duration: 1.5, delay: 0.2 + index * 0.2, ease: "easeOut" }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="md:hidden w-full overflow-hidden" ref={carouselRef}>
        <motion.div 
          drag="x"
          dragConstraints={carouselRef}
          dragElastic={0.2}
          className="flex gap-4 px-6 w-max cursor-grab active:cursor-grabbing pb-8"
        >
          {metrics.map((metric, index) => (
            <div key={index} className="flex flex-col gap-6 bg-[#E8E2D5]/40 border border-[#E8E2D5] p-6 rounded-3xl w-[75vw] shrink-0">
              <div className="flex flex-col gap-4">
                <div className="w-12 h-12 bg-[#F5F0E8] rounded-full flex items-center justify-center text-[#4A5D23] shadow-sm">
                  {metric.icon}
                </div>
                <span className="text-lg font-medium leading-tight tracking-wide text-[#3E3A32]">
                  {metric.label}
                </span>
              </div>
              <div className="mt-auto flex flex-col gap-4 pt-4">
                <span className="text-5xl font-serif text-[#8B7355]">
                  {isInView ? (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 1, delay: 0.2 + index * 0.1 }}
                    >
                      {metric.value}%
                    </motion.span>
                  ) : "0%"}
                </span>
                <div className="w-full h-1.5 bg-[#D8D2C5] rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-[#4A5D23]"
                    initial={{ width: 0 }}
                    animate={isInView ? { width: `${metric.value}%` } : { width: 0 }}
                    transition={{ duration: 1.5, delay: 0.2 + index * 0.2, ease: "easeOut" }}
                  />
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
