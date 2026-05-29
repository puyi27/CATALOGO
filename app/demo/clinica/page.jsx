"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Plus, Minus, ArrowLeft, Star, MapPin, Phone, Mail, ChevronRight, Menu, X } from "lucide-react";
import DemoLayout from "@/components/DemoLayout";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

export default function ClinicaDemo() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const [activeFaq, setActiveFaq] = useState(null);

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

  const faqs = [
    { q: "What should I expect during my first consultation?", a: "Your first visit involves a comprehensive assessment of your facial anatomy and a discussion of your aesthetic goals. We'll create a customized treatment plan tailored specifically to you." },
    { q: "Are the treatments painful?", a: "Most of our non-invasive procedures involve minimal discomfort. We use advanced numbing techniques and state-of-the-art technology to ensure your experience is as comfortable as possible." },
    { q: "How long is the recovery period?", a: "Recovery times vary depending on the procedure. Many treatments require zero downtime, allowing you to return to your daily activities immediately." },
    { q: "Do you offer financing options?", a: "Yes, we partner with specialized healthcare financing providers to offer flexible payment plans that suit your budget." }
  ];

  const services = [
    { title: "Dermal Fillers", desc: "Restore volume and smooth lines with premium hyaluronic acid formulations.", img: "1.jpg" },
    { title: "Laser Resurfacing", desc: "Improve skin texture, tone, and clarity with advanced fractional laser technology.", img: "2.jpg" },
    { title: "Microneedling", desc: "Stimulate collagen production for a naturally youthful and radiant complexion.", img: "3.jpg" },
    { title: "Neuromodulators", desc: "Soften expression lines and prevent the formation of deep wrinkles.", img: "4.jpg" }
  ];

  return (
    <DemoLayout title="Lumina Clinic">
      <div className="bg-zinc-50 text-zinc-900 font-sans selection:bg-zinc-900 selection:text-white md:cursor-none min-h-screen overflow-x-hidden">
        
        {/* Custom Cursor */}
        <motion.div
          className="hidden md:flex fixed top-0 left-0 w-4 h-4 rounded-full bg-zinc-900 mix-blend-difference pointer-events-none z-[100] items-center justify-center"
          animate={{
            x: mousePosition.x - 8,
            y: mousePosition.y - 8,
            scale: isHovering ? 2.5 : 1,
            opacity: isMenuOpen ? 0 : 1
          }}
          transition={{ type: "spring", stiffness: 400, damping: 28, mass: 0.5 }}
        />

        {/* Navigation */}
        <nav className="fixed w-full z-50 px-6 py-6 md:px-12 flex justify-between items-center mix-blend-difference text-white">
          <Link href="/" className="text-sm tracking-widest uppercase font-medium flex items-center gap-2">
            <ArrowLeft size={16} /> <span className="hidden md:inline">Back to Catalog</span>
          </Link>
          <div className="text-xl font-light tracking-[0.2em] uppercase">Lumina</div>
          <button 
            onClick={() => setIsMenuOpen(true)}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            className="text-sm tracking-widest uppercase flex items-center gap-2"
          >
            Menu <Menu size={16} />
          </button>
        </nav>

        {/* Fullscreen Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" }}
              animate={{ opacity: 1, clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
              exit={{ opacity: 0, clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-0 z-[110] bg-zinc-900 text-white flex flex-col justify-center px-12 md:px-24"
            >
              <button 
                onClick={() => setIsMenuOpen(false)}
                className="absolute top-8 right-8 md:top-12 md:right-12 text-sm tracking-widest uppercase flex items-center gap-2 hover:opacity-70 transition-opacity"
              >
                Close <X size={20} />
              </button>
              <div className="flex flex-col gap-6 md:gap-8">
                {["Treatments", "Philosophy", "Our Team", "Contact"].map((item, i) => (
                  <motion.a
                    key={item}
                    href="#"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="text-5xl md:text-8xl font-light tracking-tighter hover:text-zinc-400 transition-colors w-fit"
                  >
                    {item}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Hero Section */}
        <section className="relative h-screen w-full overflow-hidden flex items-end pb-24 md:pb-32 px-6 md:px-12">
          <motion.div style={{ y: heroY }} className="absolute inset-0 z-0">
            <img src="/images/demo/clinica/hero.jpg" alt="Clinic Interior" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/20" />
          </motion.div>
          <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-8 text-white">
            <motion.h1 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-6xl md:text-[8rem] leading-[0.9] font-light tracking-tighter"
            >
              The Art of <br />Refinement.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="max-w-sm text-sm md:text-base font-light opacity-90"
            >
              Advanced aesthetic medicine delivered in a sanctuary of minimal design. We enhance your natural architecture.
            </motion.p>
          </div>
        </section>

        {/* Philosophy Section */}
        <section className="py-32 md:py-48 px-6 md:px-12 max-w-7xl mx-auto">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32 items-center"
          >
            <div>
              <motion.span variants={fadeUp} className="text-xs tracking-widest uppercase text-zinc-500 block mb-8">
                01 — Our Philosophy
              </motion.span>
              <motion.h2 variants={fadeUp} className="text-4xl md:text-6xl font-light tracking-tighter mb-8 leading-tight">
                Beauty is not transformed, it is revealed.
              </motion.h2>
              <motion.p variants={fadeUp} className="text-zinc-600 font-light leading-relaxed mb-8">
                At Lumina, we believe in subtle enhancements that respect your unique facial geometry. Our approach combines medical precision with an artist's eye, utilizing the latest in non-invasive technology to achieve results that are imperceptible yet profoundly impactful.
              </motion.p>
              <motion.button 
                variants={fadeUp}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                className="flex items-center gap-4 text-sm uppercase tracking-widest border-b border-zinc-300 pb-2 hover:border-zinc-900 transition-colors"
              >
                Discover Our Approach <ArrowRight size={16} />
              </motion.button>
            </div>
            <motion.div variants={fadeUp} className="aspect-[3/4] md:aspect-square overflow-hidden bg-zinc-200">
              <img src="/images/demo/clinica/1.jpg" alt="Treatment" className="w-full h-full object-cover" />
            </motion.div>
          </motion.div>
        </section>

        {/* Services Bento Grid */}
        <section className="py-24 md:py-32 px-6 md:px-12 bg-white">
          <div className="max-w-7xl mx-auto">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="mb-16 md:mb-24 flex flex-col md:flex-row justify-between items-start md:items-end gap-8"
            >
              <div>
                <motion.span variants={fadeUp} className="text-xs tracking-widest uppercase text-zinc-500 block mb-4">
                  02 — Treatments
                </motion.span>
                <motion.h2 variants={fadeUp} className="text-4xl md:text-6xl font-light tracking-tighter">
                  Curated Services
                </motion.h2>
              </div>
              <motion.button variants={fadeUp} className="px-8 py-4 bg-zinc-900 text-white text-xs uppercase tracking-widest hover:bg-zinc-800 transition-colors rounded-none">
                View All Treatments
              </motion.button>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {services.map((service, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: i * 0.1 }}
                  className="group relative aspect-[4/3] md:aspect-[16/9] overflow-hidden bg-zinc-100 flex flex-col justify-end p-8 md:p-12 cursor-pointer"
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                >
                  <img 
                    src={`/images/demo/clinica/${service.img}`} 
                    alt={service.title} 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                  <div className="relative z-10 text-white translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <h3 className="text-2xl md:text-3xl font-light mb-2">{service.title}</h3>
                    <p className="text-sm font-light opacity-0 group-hover:opacity-100 transition-opacity duration-500 max-w-sm">
                      {service.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Features / Statistics */}
        <section className="py-32 md:py-40 bg-zinc-900 text-white px-6 md:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-8 divide-y md:divide-y-0 md:divide-x divide-zinc-800">
              {[
                { num: "15+", label: "Years Experience" },
                { num: "10k", label: "Happy Patients" },
                { num: "04", label: "Medical Experts" },
                { num: "12", label: "Awards Won" }
              ].map((stat, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="flex flex-col items-center text-center pt-8 md:pt-0"
                >
                  <div className="text-5xl md:text-7xl font-light tracking-tighter mb-4">{stat.num}</div>
                  <div className="text-xs uppercase tracking-widest text-zinc-400">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Facilities / Gallery Horizontal Scroll feel */}
        <section className="py-32 md:py-48 overflow-hidden">
          <div className="px-6 md:px-12 mb-16 max-w-7xl mx-auto">
            <span className="text-xs tracking-widest uppercase text-zinc-500 block mb-4">
              03 — The Space
            </span>
            <h2 className="text-4xl md:text-6xl font-light tracking-tighter">
              Sanctuary of Calm
            </h2>
          </div>
          <div className="flex gap-6 md:gap-8 px-6 md:px-12 overflow-x-auto pb-12 snap-x snap-mandatory no-scrollbar" style={{ scrollbarWidth: 'none' }}>
            {[5, 6, 2, 3].map((img, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                className="min-w-[85vw] md:min-w-[40vw] aspect-[4/5] md:aspect-video snap-center shrink-0 bg-zinc-200 overflow-hidden"
              >
                <img src={`/images/demo/clinica/${img}.jpg`} alt="Facility" className="w-full h-full object-cover" />
              </motion.div>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-32 md:py-40 bg-white px-6 md:px-12">
          <div className="max-w-4xl mx-auto text-center">
             <Star className="w-8 h-8 mx-auto mb-12 text-zinc-300" strokeWidth={1} />
             <motion.div
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 1 }}
             >
               <p className="text-2xl md:text-4xl font-light leading-relaxed tracking-tight mb-12">
                 "The level of care and precision at Lumina is unmatched. They didn't just change my appearance, they restored my confidence with subtle, natural results that everyone notices but no one can pinpoint."
               </p>
               <div className="text-sm uppercase tracking-widest font-medium">Elena R.</div>
               <div className="text-xs text-zinc-400 mt-2">Patient since 2024</div>
             </motion.div>
          </div>
        </section>

        {/* FAQ Accordion */}
        <section className="py-24 md:py-32 px-6 md:px-12 max-w-4xl mx-auto">
          <span className="text-xs tracking-widest uppercase text-zinc-500 block mb-4 text-center">
            04 — Intelligence
          </span>
          <h2 className="text-3xl md:text-5xl font-light tracking-tighter mb-16 text-center">
            Common Inquiries
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="border-b border-zinc-200 pb-4">
                <button 
                  onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                  className="w-full flex justify-between items-center py-4 text-left md:text-lg font-light hover:text-zinc-500 transition-colors"
                >
                  {faq.q}
                  {activeFaq === i ? <Minus size={20} className="text-zinc-400" /> : <Plus size={20} className="text-zinc-400" />}
                </button>
                <AnimatePresence>
                  {activeFaq === i && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <p className="pb-6 text-zinc-500 font-light leading-relaxed text-sm md:text-base pr-8">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </section>

        {/* Footer / Contact */}
        <footer className="bg-zinc-900 text-white pt-32 pb-12 px-6 md:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32 mb-32">
              <div>
                <h2 className="text-5xl md:text-7xl font-light tracking-tighter mb-8">
                  Ready to<br />begin?
                </h2>
                <button 
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                  className="px-8 py-4 bg-white text-zinc-900 text-xs uppercase tracking-widest hover:bg-zinc-200 transition-colors rounded-none"
                >
                  Book Consultation
                </button>
              </div>
              <div className="flex flex-col gap-8 font-light text-zinc-400">
                <div className="flex items-start gap-4">
                  <MapPin size={24} className="shrink-0 text-white" strokeWidth={1} />
                  <div>
                    <div className="text-white mb-2">Location</div>
                    124 Aesthetics Blvd.<br />Design District, NY 10012
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Phone size={24} className="shrink-0 text-white" strokeWidth={1} />
                  <div>
                    <div className="text-white mb-2">Contact</div>
                    +1 (555) 123-4567<br />hello@luminaclinic.com
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-zinc-800 text-xs text-zinc-500 tracking-widest uppercase gap-4 md:gap-0">
              <div>© 2026 Lumina Clinic</div>
              <div className="flex gap-8">
                <a href="#" className="hover:text-white transition-colors">Instagram</a>
                <a href="#" className="hover:text-white transition-colors">Twitter</a>
                <a href="#" className="hover:text-white transition-colors">Privacy</a>
              </div>
            </div>
          </div>
        </footer>

      </div>
    </DemoLayout>
  );
}
