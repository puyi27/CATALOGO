"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Leaf, Wind, Droplets, Sun, MapPin, ArrowRight } from "lucide-react";

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

export default function SostenibilidadDemo() {
  const heroRef = useRef(null);
  const textSectionRef = useRef(null);
  
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
    <div className="min-h-screen bg-[#F5F0E8] text-[#3E3A32] font-sans selection:bg-[#4A5D23] selection:text-[#F5F0E8] overflow-hidden">
      <nav className="fixed top-0 left-0 w-full p-6 md:p-10 z-50 mix-blend-difference text-[#F5F0E8]">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-sm uppercase tracking-widest font-semibold hover:opacity-70 transition-opacity"
        >
          ← Catálogo
        </Link>
      </nav>

      <section ref={heroRef} className="relative w-full h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div 
            className="parallax-bg w-full h-[120%] bg-cover bg-center"
            style={{ backgroundImage: "url('https://loremflickr.com/1920/1080/nature,mist/all')" }}
          />
          <div className="absolute inset-0 bg-[#3E3A32]/30" />
        </div>
        
        <div className="relative z-10 text-center px-4 mt-20">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.h1 
              variants={fadeUpVariant}
              className="text-5xl md:text-8xl lg:text-9xl font-serif text-[#F5F0E8] tracking-tighter leading-[0.85]"
            >
              Slow Travel
            </motion.h1>
            <motion.p 
              variants={fadeUpVariant}
              className="mt-8 text-lg md:text-xl text-[#F5F0E8]/90 font-light max-w-xl mx-auto tracking-wide"
            >
              Rediscover the world at a pace that honors the earth and enriches the soul.
            </motion.p>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-[#F5F0E8] flex flex-col items-center gap-2"
        >
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <div className="w-[1px] h-12 bg-[#F5F0E8]/30 relative overflow-hidden">
            <motion.div 
              className="absolute top-0 left-0 w-full h-1/2 bg-[#F5F0E8]"
              animate={{ y: [0, 50, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      </section>

      <section ref={textSectionRef} className="py-32 md:py-48 px-6 md:px-20 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-20">
          <div className="md:col-span-4 flex flex-col gap-8 justify-start pt-4">
            <Leaf strokeWidth={1} className="w-12 h-12 text-[#4A5D23]" />
            <h2 className="text-3xl md:text-4xl font-serif text-[#4A5D23]">
              Mindful Journeys
            </h2>
          </div>
          <div className="md:col-span-8">
            <div className="overflow-hidden">
              <p className="reveal-text text-2xl md:text-4xl lg:text-5xl leading-tight md:leading-[1.15] font-serif text-[#2C2923]">
                We believe travel should not be a race, but a meaningful dialogue with the places we visit. By slowing down, we reduce our footprint and deepen our connection to local cultures and ecosystems.
              </p>
            </div>
            <div className="overflow-hidden mt-10">
              <p className="reveal-text text-lg md:text-xl text-[#5A554A] font-light max-w-2xl leading-relaxed">
                Our approach to exploration prioritizes train journeys over flights, local homestays over massive resorts, and seasonal, plant-based gastronomy that supports regional farmers. Every choice is made with the intention to preserve the beauty of our planet for future generations.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 w-full">
        <div className="flex flex-col md:flex-row w-full h-[60vh] md:h-[80vh]">
          <div className="w-full md:w-1/2 h-full p-4 md:p-10">
            <div className="w-full h-full relative rounded-2xl overflow-hidden group">
              <img 
                src="https://loremflickr.com/800/1000/forest,path/all" 
                alt="Forest path" 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-[#4A5D23]/20" />
            </div>
          </div>
          <div className="w-full md:w-1/2 h-full flex flex-col justify-center px-8 md:px-20 bg-[#E8E2D5]">
             <div className="overflow-hidden mb-6">
                <span className="reveal-text block text-sm uppercase tracking-[0.2em] font-semibold text-[#8B7355]">
                  Our Philosophy
                </span>
             </div>
             <div className="overflow-hidden">
                <h3 className="reveal-text text-4xl md:text-5xl font-serif text-[#3E3A32] mb-8 leading-tight">
                  Leaving nothing <br className="hidden md:block" /> but footprints.
                </h3>
             </div>
             <div className="overflow-hidden">
                <p className="reveal-text text-[#5A554A] text-lg font-light max-w-md">
                  We curate experiences that actively regenerate the environments we touch. From supporting indigenous conservation projects to funding renewable energy initiatives in remote communities.
                </p>
             </div>
          </div>
        </div>
      </section>

      <ImpactSection />

      <section className="py-32 px-6 bg-[#3E3A32] text-[#F5F0E8]">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl md:text-7xl font-serif mb-12">
            Ready to change <br/> the way you travel?
          </h2>
          <button className="group relative inline-flex items-center justify-center gap-4 px-8 py-4 bg-[#F5F0E8] text-[#3E3A32] rounded-full overflow-hidden transition-transform hover:scale-105 duration-300">
            <span className="relative z-10 text-sm uppercase tracking-widest font-semibold">
              Explore Destinations
            </span>
            <ArrowRight className="relative z-10 w-4 h-4 transition-transform group-hover:translate-x-2" />
            <div className="absolute inset-0 bg-[#E8E2D5] transform scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100" />
          </button>
        </div>
      </section>

      <footer className="py-10 px-6 border-t border-[#3E3A32]/10 flex flex-col md:flex-row justify-between items-center text-sm font-light text-[#5A554A]">
        <p>© 2024 Slow Travel. All rights reserved.</p>
        <div className="flex gap-6 mt-4 md:mt-0">
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
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const metrics = [
    { label: "Carbon Emissions Reduced", value: 85, icon: <Wind size={20} /> },
    { label: "Local Communities Supported", value: 92, icon: <MapPin size={20} /> },
    { label: "Water Conservation Rate", value: 78, icon: <Droplets size={20} /> },
    { label: "Renewable Energy Usage", value: 100, icon: <Sun size={20} /> },
  ];

  return (
    <section ref={sectionRef} className="py-32 px-6 md:px-20 max-w-6xl mx-auto">
      <div className="mb-20 text-center md:text-left">
        <h2 className="text-3xl md:text-5xl font-serif text-[#2C2923] mb-6">
          Our Environmental Impact
        </h2>
        <p className="text-lg text-[#5A554A] font-light max-w-2xl">
          Transparency is key to accountability. Here is how our slow travel initiatives have positively affected the destinations we operate in over the past year.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-12">
        {metrics.map((metric, index) => (
          <div key={index} className="flex flex-col gap-4">
            <div className="flex justify-between items-end">
              <div className="flex items-center gap-3 text-[#4A5D23]">
                {metric.icon}
                <span className="text-lg font-medium tracking-wide text-[#3E3A32]">
                  {metric.label}
                </span>
              </div>
              <span className="text-2xl font-serif text-[#8B7355]">
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
            <div className="w-full h-1 bg-[#E8E2D5] rounded-full overflow-hidden">
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
    </section>
  );
}
