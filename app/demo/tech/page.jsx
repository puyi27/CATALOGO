"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useSpring } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import DemoLayout from '@/components/DemoLayout';
import { 
  ArrowRight, ArrowUpRight, Cpu, Layers, Monitor, 
  Sparkles, Code2, Database, Globe, Command, 
  Terminal, Shield, Zap
} from 'lucide-react';

function MouseTrace() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", updateMousePosition);
    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, []);

  return (
    <div 
      className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300"
      style={{
        background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.03), transparent 40%)`
      }}
    />
  );
}

function SectionHeading({ title, subtitle }) {
  return (
    <div className="mb-16 md:mb-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-white mb-4">
          {title}
        </h2>
        {subtitle && (
          <p className="text-neutral-400 text-lg max-w-2xl">
            {subtitle}
          </p>
        )}
      </motion.div>
    </div>
  );
}

function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-32 pb-20 overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-blue-500 opacity-20 blur-[100px]"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-neutral-300 text-sm mb-8 backdrop-blur-md"
        >
          <Sparkles size={14} className="text-blue-400" />
          <span>Axiom OS 2.0 is now live</span>
          <ArrowRight size={14} className="text-neutral-500" />
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40 mb-8"
        >
          We Build <br className="hidden md:block" /> AI Futures.
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-lg md:text-xl text-neutral-400 max-w-2xl mb-12"
        >
          An elite software engineering agency specializing in high-performance web applications, artificial intelligence integration, and cloud infrastructure.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 w-full justify-center"
        >
          <button className="px-8 py-4 bg-white text-black rounded-full font-medium hover:bg-neutral-200 transition-colors flex items-center justify-center gap-2">
            Start a project
          </button>
          <button className="px-8 py-4 bg-transparent border border-white/20 text-white rounded-full font-medium hover:bg-white/5 transition-colors flex items-center justify-center gap-2">
            <Command size={18} /> Documentation
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="w-full max-w-5xl mt-24 relative"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/30 to-purple-500/30 blur-2xl opacity-50 z-0"></div>
          <div className="relative rounded-2xl md:rounded-[2rem] overflow-hidden border border-white/10 bg-neutral-900/50 backdrop-blur-sm z-10 aspect-video md:aspect-[21/9]">
            <Image 
              src="/images/demo/tech/hero.jpg" 
              alt="Platform Interface" 
              fill 
              className="object-cover opacity-80" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function StackMarquee() {
  const techs = ["React", "Next.js", "TypeScript", "Node.js", "Python", "TensorFlow", "AWS", "Vercel", "Tailwind", "PostgreSQL"];
  
  return (
    <div className="py-12 border-y border-white/5 bg-black/50 overflow-hidden flex whitespace-nowrap relative">
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-10" />
      <motion.div 
        animate={{ x: [0, -1000] }}
        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
        className="flex gap-12 px-6 items-center"
      >
        {[...techs, ...techs, ...techs].map((tech, i) => (
          <div key={i} className="text-xl md:text-2xl font-semibold text-neutral-600 tracking-wider">
            {tech}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

function ServicesSection() {
  const services = [
    { title: "Web Applications", desc: "High-performance React & Next.js applications engineered for scale and speed.", icon: Monitor },
    { title: "AI Integration", desc: "Custom LLM integrations, RAG pipelines, and intelligent automation systems.", icon: Cpu },
    { title: "Cloud Infrastructure", desc: "Serverless architectures, edge computing, and reliable database solutions.", icon: Database },
    { title: "Developer Tools", desc: "CLI utilities, specialized SDKs, and internal platform engineering.", icon: Terminal },
    { title: "Cybersecurity", desc: "Comprehensive audits, penetration testing, and zero-trust architecture.", icon: Shield },
    { title: "API Development", desc: "Robust, versioned REST and GraphQL APIs with extensive documentation.", icon: Code2 }
  ];

  return (
    <section className="py-32 max-w-7xl mx-auto px-6 relative">
      <SectionHeading 
        title="Engineering Excellence" 
        subtitle="We build the foundation for your next big idea. Our cross-functional teams deliver production-ready software that scales from day one." 
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((svc, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="group p-8 rounded-3xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors"
          >
            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20 mb-6 text-blue-400 group-hover:scale-110 transition-transform">
              <svc.icon size={24} />
            </div>
            <h3 className="text-xl font-medium text-white mb-3">{svc.title}</h3>
            <p className="text-neutral-400 leading-relaxed">{svc.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function CaseStudies() {
  const projects = [
    { title: "Nexus AI Platform", cat: "AI Interface", img: "/images/demo/tech/1.jpg" },
    { title: "Quantum Fin", cat: "Fintech Dashboard", img: "/images/demo/tech/2.jpg" },
    { title: "Aero Logistics", cat: "Supply Chain", img: "/images/demo/tech/3.jpg" },
    { title: "HealthSync", cat: "Medical Data", img: "/images/demo/tech/4.jpg" }
  ];

  return (
    <section className="py-32 bg-neutral-900/30 border-y border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <SectionHeading title="Featured Work" subtitle="A selection of our recent enterprise partnerships." />
          <button className="px-6 py-3 rounded-full border border-white/20 text-white font-medium hover:bg-white/10 transition-colors mb-16 md:mb-24 flex items-center gap-2 whitespace-nowrap">
            View All Work <ArrowRight size={16} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden mb-6 border border-white/10">
                <Image src={p.img} alt={p.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-2xl font-semibold text-white mb-2">{p.title}</h3>
                  <p className="text-neutral-500 font-medium">{p.cat}</p>
                </div>
                <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-all">
                  <ArrowUpRight size={20} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProcessSection() {
  const steps = [
    { num: "01", title: "Architecture", desc: "We design robust, scalable systems tailored to your specific requirements, focusing on performance and security." },
    { num: "02", title: "Development", desc: "Our engineers build using cutting-edge stacks, ensuring clean code, automated testing, and CI/CD integration." },
    { num: "03", title: "Deployment", desc: "Seamless launch to global edge networks with comprehensive monitoring and zero-downtime rollouts." }
  ];

  return (
    <section className="py-32 max-w-7xl mx-auto px-6">
      <SectionHeading title="How we build" subtitle="A streamlined process designed for speed and reliability." />
      <div className="relative">
        <div className="absolute left-6 md:left-[50px] top-0 bottom-0 w-px bg-white/10 hidden md:block" />
        <div className="space-y-12">
          {steps.map((step, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative flex flex-col md:flex-row gap-8 md:gap-16 items-start"
            >
              <div className="w-12 h-12 shrink-0 rounded-full bg-black border-2 border-white/20 flex items-center justify-center text-white font-mono font-bold z-10 md:translate-x-[-12px]">
                {step.num}
              </div>
              <div className="flex-1 p-8 rounded-3xl bg-neutral-900/50 border border-white/10">
                <h3 className="text-2xl font-bold text-white mb-4">{step.title}</h3>
                <p className="text-neutral-400 leading-relaxed text-lg">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function StatsTestimonials() {
  return (
    <section className="py-32 border-y border-white/5 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.1),transparent_50%)]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-24">
          {[
            { v: "99.9%", l: "Uptime" },
            { v: "10x", l: "Faster Delivery" },
            { v: "50+", l: "Enterprise Clients" },
            { v: "24/7", l: "Monitoring" }
          ].map((s, i) => (
            <div key={i} className="text-center">
              <div className="text-4xl md:text-6xl font-bold text-white mb-2">{s.v}</div>
              <div className="text-neutral-500 font-medium uppercase tracking-wider text-sm">{s.l}</div>
            </div>
          ))}
        </div>

        <div className="max-w-4xl mx-auto text-center">
          <div className="text-blue-500 mb-8 flex justify-center">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/></svg>
          </div>
          <p className="text-2xl md:text-4xl font-medium text-white leading-tight mb-8">
            "Axiom didn't just build our app; they re-engineered our entire infrastructure. The performance gains were immediate and massive."
          </p>
          <div>
            <div className="text-white font-bold text-lg">Sarah Chen</div>
            <div className="text-neutral-500">CTO at GlobalTech</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-black pt-24 pb-12 px-6 border-t border-white/10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
        <div className="lg:col-span-2">
          <div className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <Cpu className="text-blue-500" /> AXIOM
          </div>
          <p className="text-neutral-500 max-w-sm mb-8">
            We are a digital product agency specializing in advanced technical solutions for modern businesses.
          </p>
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-white/10 transition-colors">X</a>
            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-white/10 transition-colors">in</a>
            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-white/10 transition-colors">Gh</a>
          </div>
        </div>
        
        <div>
          <h4 className="text-white font-semibold mb-6">Services</h4>
          <ul className="space-y-4 text-neutral-400">
            <li><a href="#" className="hover:text-blue-400 transition-colors">Web Apps</a></li>
            <li><a href="#" className="hover:text-blue-400 transition-colors">Mobile Dev</a></li>
            <li><a href="#" className="hover:text-blue-400 transition-colors">AI & ML</a></li>
            <li><a href="#" className="hover:text-blue-400 transition-colors">Cloud Setup</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-6">Company</h4>
          <ul className="space-y-4 text-neutral-400">
            <li><a href="#" className="hover:text-blue-400 transition-colors">About Us</a></li>
            <li><a href="#" className="hover:text-blue-400 transition-colors">Careers</a></li>
            <li><a href="#" className="hover:text-blue-400 transition-colors">Blog</a></li>
            <li><a href="#" className="hover:text-blue-400 transition-colors">Contact</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-6">Legal</h4>
          <ul className="space-y-4 text-neutral-400">
            <li><a href="#" className="hover:text-blue-400 transition-colors">Privacy</a></li>
            <li><a href="#" className="hover:text-blue-400 transition-colors">Terms</a></li>
            <li><a href="#" className="hover:text-blue-400 transition-colors">Security</a></li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10 text-neutral-600 text-sm">
        <div>&copy; 2026 Axiom Engineering. All rights reserved.</div>
        <div className="mt-4 md:mt-0 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
          All systems normal
        </div>
      </div>
    </footer>
  );
}

export default function TechDemo() {
  return (
    <DemoLayout title="Tech Agency">
      <MouseTrace />
      <div className="bg-[#050505] text-neutral-100 font-sans selection:bg-blue-500/30 min-h-screen">
        
        {/* Navbar */}
        <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-[#050505]/80 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
            <Link href="/" className="inline-flex items-center gap-2 text-neutral-400 hover:text-white transition-colors">
              <ArrowRight className="rotate-180" size={16} />
              <span className="font-medium text-sm">Catálogo</span>
            </Link>
            
            <div className="hidden md:flex items-center gap-8 text-sm font-medium text-neutral-400">
              <a href="#" className="hover:text-white transition-colors">Services</a>
              <a href="#" className="hover:text-white transition-colors">Work</a>
              <a href="#" className="hover:text-white transition-colors">Company</a>
            </div>

            <button className="px-5 py-2 bg-white text-black text-sm font-semibold rounded-full hover:bg-neutral-200 transition-colors">
              Contact Us
            </button>
          </div>
        </nav>

        <main>
          <HeroSection />
          <StackMarquee />
          <ServicesSection />
          <CaseStudies />
          <ProcessSection />
          <StatsTestimonials />
        </main>
        
        <Footer />
      </div>
    </DemoLayout>
  );
}
