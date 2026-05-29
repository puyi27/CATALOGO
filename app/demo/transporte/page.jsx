"use client"
import React, { useState, useEffect, useRef } from "react"
import { motion, useScroll, useTransform, AnimatePresence, useSpring } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { 
  ArrowLeft, Truck, Navigation, Clock, ShieldCheck, Gauge, 
  Menu, X, ChevronRight, MapPin, Zap, Activity, Battery,
  BarChart, ArrowUpRight, CheckCircle2, ChevronDown
} from "lucide-react"
import DemoLayout from "@/components/DemoLayout"

function MapBackground() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-20">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(56,189,248,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />
      <svg className="absolute w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <motion.path 
          d="M 100,800 C 200,600 300,500 500,400 S 800,300 1000,100" 
          fill="none" 
          stroke="rgba(56,189,248,0.3)" 
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 5, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
        />
        <motion.path 
          d="M 0,200 C 300,300 400,600 800,800 S 1200,900 1400,1000" 
          fill="none" 
          stroke="rgba(56,189,248,0.2)" 
          strokeWidth="1"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 7, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
        />
      </svg>
    </div>
  );
}

function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center items-center px-6 pt-24 bg-[#0A0F1E] overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image src="/images/demo/transporte/hero.jpg" alt="Fleet Hero" fill className="object-cover opacity-30 mix-blend-luminosity" priority />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0F1E]/80 via-[#0A0F1E]/60 to-[#0A0F1E]" />
        <MapBackground />
      </div>
      
      <div className="relative z-10 text-center max-w-5xl mx-auto w-full">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#38BDF8]/10 border border-[#38BDF8]/20 text-[#38BDF8] text-xs font-mono uppercase tracking-widest mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-[#38BDF8] animate-pulse" />
          Live Global Tracking Network
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 30 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-8xl lg:text-[7rem] font-black uppercase tracking-tighter leading-[0.9] text-white mb-8"
        >
          Next-Gen <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#38BDF8] to-blue-600">Fleet Control</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto tracking-wide leading-relaxed mb-12"
        >
          Real-time telemetry, AI-driven routing, and predictive maintenance for enterprise logistics operations.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row justify-center items-center gap-4"
        >
          <button className="w-full sm:w-auto px-8 py-4 bg-[#38BDF8] text-[#0A0F1E] text-sm tracking-widest uppercase font-bold hover:bg-white active:scale-95 transition-all inline-flex items-center justify-center gap-2">
            Launch Dashboard <ArrowUpRight size={16} />
          </button>
          <button className="w-full sm:w-auto px-8 py-4 bg-transparent border border-white/20 text-white text-sm tracking-widest uppercase font-bold hover:bg-white/5 active:scale-95 transition-all inline-flex items-center justify-center gap-2">
            Schedule Demo
          </button>
        </motion.div>
      </div>

      <motion.div 
        animate={{ y: [0, 10, 0] }} 
        transition={{ repeat: Infinity, duration: 2 }} 
        className="absolute bottom-8 text-[#38BDF8]/60 text-xs tracking-widest flex flex-col items-center gap-2 font-mono"
      >
        <span>SCROLL TO EXPLORE</span>
        <div className="w-px h-12 bg-gradient-to-b from-[#38BDF8]/60 to-transparent" />
      </motion.div>
    </section>
  );
}

function LiveTrackingDemo() {
  const [activeVehicles, setActiveVehicles] = useState(142);
  const [avgSpeed, setAvgSpeed] = useState(68);
  const [efficiency, setEfficiency] = useState(94.2);

  useEffect(() => {
    const int = setInterval(() => {
      setActiveVehicles(p => p + (Math.random() > 0.5 ? 1 : -1));
      setAvgSpeed(p => p + (Math.random() > 0.5 ? 1 : -1));
      setEfficiency(p => Number((p + (Math.random() > 0.5 ? 0.1 : -0.1)).toFixed(1)));
    }, 2000);
    return () => clearInterval(int);
  }, []);

  return (
    <section className="py-24 bg-[#0A0F1E] border-y border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white mb-2">Global Network Status</h2>
            <p className="text-slate-400 font-mono text-sm uppercase tracking-widest">Real-time telemetry feeds</p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> All Systems Nominal
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#0F172A] p-8 border border-white/5 rounded-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity"><Truck size={64} /></div>
            <div className="text-slate-500 font-mono text-xs uppercase tracking-widest mb-4 flex items-center gap-2"><Navigation size={14}/> Active Units</div>
            <div className="text-5xl font-black text-white">{activeVehicles}</div>
            <div className="mt-4 text-xs font-mono text-[#38BDF8] flex items-center gap-1"><ArrowUpRight size={12}/> +12% from yesterday</div>
          </div>
          <div className="bg-[#0F172A] p-8 border border-white/5 rounded-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity"><Gauge size={64} /></div>
            <div className="text-slate-500 font-mono text-xs uppercase tracking-widest mb-4 flex items-center gap-2"><Gauge size={14}/> Network Avg Speed</div>
            <div className="text-5xl font-black text-white">{avgSpeed} <span className="text-xl text-slate-500">km/h</span></div>
            <div className="mt-4 h-1 w-full bg-slate-800 rounded-full overflow-hidden">
              <motion.div className="h-full bg-[#38BDF8]" animate={{ width: `${(avgSpeed/120)*100}%` }} transition={{ type:"spring" }} />
            </div>
          </div>
          <div className="bg-[#0F172A] p-8 border border-white/5 rounded-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity"><Activity size={64} /></div>
            <div className="text-slate-500 font-mono text-xs uppercase tracking-widest mb-4 flex items-center gap-2"><Activity size={14}/> Route Efficiency</div>
            <div className="text-5xl font-black text-white">{efficiency}%</div>
            <div className="mt-4 text-xs font-mono text-emerald-400 flex items-center gap-1">Optimal routing engaged</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FleetCapabilities() {
  const features = [
    { title: "Predictive Maintenance", desc: "AI algorithms detect potential mechanical failures before they happen using IoT sensor data.", img: "/images/demo/transporte/1.jpg" },
    { title: "Dynamic Routing", desc: "Traffic, weather, and delivery windows are analyzed in real-time to adjust routes on the fly.", img: "/images/demo/transporte/2.jpg" },
    { title: "Cold Chain Monitoring", desc: "Continuous temperature logging ensuring pharmaceutical and food cargo integrity.", img: "/images/demo/transporte/3.jpg" },
    { title: "Driver Performance", desc: "Advanced dashcams and telemetry score driving habits to improve safety and fuel efficiency.", img: "/images/demo/transporte/4.jpg" }
  ];

  return (
    <section className="py-32 bg-[#050B14] relative">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white mb-16 text-center">Logistics Operating System</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((f, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group rounded-3xl overflow-hidden bg-[#0F172A] border border-white/10 hover:border-[#38BDF8]/50 transition-colors"
            >
              <div className="aspect-video relative overflow-hidden">
                <Image src={f.img} alt={f.title} fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 opacity-70 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] to-transparent" />
              </div>
              <div className="p-8">
                <div className="flex items-center gap-3 text-[#38BDF8] font-mono text-xs uppercase tracking-widest mb-3">
                  <Zap size={14} /> Module 0{i+1}
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{f.title}</h3>
                <p className="text-slate-400 leading-relaxed">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function StatMarquee() {
  const items = [
    "2.4M MILES TRACKED", "14% FUEL SAVED", "0.02% INCIDENT RATE", "99.9% UPTIME",
    "2.4M MILES TRACKED", "14% FUEL SAVED", "0.02% INCIDENT RATE", "99.9% UPTIME"
  ];
  return (
    <div className="py-12 bg-[#38BDF8] overflow-hidden flex whitespace-nowrap relative transform -rotate-1 scale-105">
      <motion.div 
        animate={{ x: [0, -1000] }}
        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
        className="flex gap-16 items-center px-8"
      >
        {items.map((item, i) => (
          <div key={i} className="text-2xl md:text-4xl font-black text-[#0A0F1E] uppercase tracking-tighter">
            {item}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

function TestimonialSection() {
  return (
    <section className="py-32 bg-[#0A0F1E] border-t border-white/5">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <ShieldCheck size={48} className="text-[#38BDF8] mx-auto mb-8" />
        <p className="text-3xl md:text-5xl font-medium text-white leading-tight mb-12">
          "Implementing this platform reduced our dispatch times by 40% and completely eliminated cold-chain compliance failures. It's the nervous system of our entire fleet."
        </p>
        <div>
          <div className="w-16 h-16 rounded-full overflow-hidden mx-auto mb-4 relative border-2 border-[#38BDF8]">
            <Image src="/images/demo/transporte/5.jpg" alt="CEO" fill className="object-cover" />
          </div>
          <div className="text-white font-bold uppercase tracking-widest text-lg">Marcus Vance</div>
          <div className="text-slate-500 font-mono text-sm mt-1">VP Operations, Global Logistics Inc.</div>
        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  const faqs = [
    { q: "How easy is it to install the IoT hardware?", a: "Our OBD2 trackers plug directly into standard vehicle ports, taking less than 5 minutes per vehicle. No hardwiring required for standard metrics." },
    { q: "Can it integrate with our existing ERP?", a: "Yes, we provide robust REST and GraphQL APIs that seamlessly connect with SAP, Oracle, and custom internal systems." },
    { q: "Is the tracking real-time globally?", a: "We utilize multi-network cellular data combined with satellite fallbacks to ensure sub-second latency tracking across 180+ countries." }
  ];

  return (
    <section className="py-32 bg-[#050B14] border-t border-white/5">
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white mb-12 text-center">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const [isOpen, setIsOpen] = useState(false);
            return (
              <div key={idx} className="border border-white/10 bg-[#0A0F1E] rounded-2xl overflow-hidden">
                <button 
                  onClick={() => setIsOpen(!isOpen)}
                  className="w-full p-6 text-left flex justify-between items-center focus:outline-none"
                >
                  <span className="font-bold text-white text-lg">{faq.q}</span>
                  <ChevronDown className={`text-[#38BDF8] transition-transform ${isOpen ? 'rotate-180' : ''}`} size={24} />
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="px-6 pb-6 text-slate-400"
                    >
                      {faq.a}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-[#0A0F1E] pt-24 pb-12 px-6 border-t border-[#38BDF8]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-2 mb-6">
            <Truck size={24} className="text-[#38BDF8]" />
            <span className="text-2xl font-black uppercase tracking-widest text-white">LOGISUR</span>
          </div>
          <p className="text-slate-400 font-mono text-sm leading-relaxed max-w-sm">
            Empowering modern supply chains with advanced telematics, AI routing, and absolute operational visibility.
          </p>
        </div>
        
        <div>
          <h4 className="text-white font-bold uppercase tracking-widest mb-6">Platform</h4>
          <ul className="space-y-4 text-slate-400 font-mono text-sm">
            <li><a href="#" className="hover:text-[#38BDF8] transition-colors">Fleet Tracking</a></li>
            <li><a href="#" className="hover:text-[#38BDF8] transition-colors">Route Optimization</a></li>
            <li><a href="#" className="hover:text-[#38BDF8] transition-colors">Maintenance</a></li>
            <li><a href="#" className="hover:text-[#38BDF8] transition-colors">Analytics</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold uppercase tracking-widest mb-6">Company</h4>
          <ul className="space-y-4 text-slate-400 font-mono text-sm">
            <li><a href="#" className="hover:text-[#38BDF8] transition-colors">About Us</a></li>
            <li><a href="#" className="hover:text-[#38BDF8] transition-colors">Careers</a></li>
            <li><a href="#" className="hover:text-[#38BDF8] transition-colors">Contact</a></li>
            <li><a href="#" className="hover:text-[#38BDF8] transition-colors">System Status</a></li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10 font-mono text-xs uppercase text-slate-500 gap-4">
        <div>© 2026 LOGISUR TECHNOLOGIES INC.</div>
        <div className="flex gap-6">
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
        </div>
      </div>
    </footer>
  );
}

export default function TransporteDemo() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <DemoLayout title="Fleet Management Platform">
      <div className="bg-[#0A0F1E] text-white font-sans selection:bg-[#38BDF8]/30 min-h-screen">
        
        <nav className="fixed top-0 left-0 w-full p-4 md:px-8 md:py-6 flex justify-between items-center z-50 bg-[#0A0F1E]/80 backdrop-blur-xl border-b border-white/5">
          <Link href="/" className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-slate-400 hover:text-[#38BDF8] transition-all">
            <ArrowLeft size={14} />
            <span className="hidden md:inline">Back to Catalog</span>
          </Link>
          <div className="flex items-center gap-2">
            <Truck size={20} className="text-[#38BDF8]" />
            <span className="text-xl font-black tracking-widest uppercase">LOGISUR</span>
          </div>
          <div className="hidden md:flex gap-8 font-mono text-xs tracking-widest uppercase">
            <a href="#" className="text-slate-300 hover:text-[#38BDF8] transition-colors">Product</a>
            <a href="#" className="text-slate-300 hover:text-[#38BDF8] transition-colors">Solutions</a>
            <a href="#" className="text-slate-300 hover:text-[#38BDF8] transition-colors">Pricing</a>
          </div>
          <button className="md:hidden text-white" onClick={() => setIsMenuOpen(true)}>
            <Menu size={24} />
          </button>
        </nav>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-[#0A0F1E] z-50 flex flex-col items-center justify-center"
            >
              <button onClick={() => setIsMenuOpen(false)} className="absolute top-6 right-6 text-white hover:text-[#38BDF8]">
                <X size={32} />
              </button>
              <div className="flex flex-col gap-8 text-center font-black text-4xl uppercase tracking-tighter">
                <a href="#" onClick={() => setIsMenuOpen(false)} className="hover:text-[#38BDF8]">Product</a>
                <a href="#" onClick={() => setIsMenuOpen(false)} className="hover:text-[#38BDF8]">Solutions</a>
                <a href="#" onClick={() => setIsMenuOpen(false)} className="hover:text-[#38BDF8]">Pricing</a>
                <a href="#" onClick={() => setIsMenuOpen(false)} className="text-[#38BDF8]">Log In</a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <main>
          <HeroSection />
          <LiveTrackingDemo />
          <FleetCapabilities />
          <StatMarquee />
          <TestimonialSection />
          <FAQSection />
        </main>

        <Footer />
      </div>
    </DemoLayout>
  )
}
