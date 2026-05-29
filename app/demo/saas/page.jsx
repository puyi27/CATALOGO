"use client";

import React, { useState, useEffect, useRef } from 'react';
import { LazyMotion, domAnimation, m, useSpring, useMotionValue, useTransform, useScroll, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import DemoLayout from '@/components/DemoLayout';
import { Zap, Cpu, Server, Users, Activity, Database, Globe, ArrowUpRight, ArrowLeft, ArrowRight, CheckCircle2, ChevronDown, MonitorPlay, ShieldCheck, Code2, BarChart3, CloudLightning } from 'lucide-react';

// --- CUSTOM CURSOR ---
function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const scale = useMotionValue(1);
  const isHovering = useMotionValue(0);

  const springConfig = { damping: 30, stiffness: 400, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);
  const scaleSpring = useSpring(scale, springConfig);
  const hoverSpring = useSpring(isHovering, springConfig);

  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX - 6);
      cursorY.set(e.clientY - 6);
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      if (target.tagName?.toLowerCase() === 'button' || target.tagName?.toLowerCase() === 'a' || target.closest('.interactive-el')) {
        scale.set(3);
        isHovering.set(1);
      } else {
        scale.set(1);
        isHovering.set(0);
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY, scale, isHovering]);

  return (
    <m.div
      className="fixed top-0 left-0 w-3 h-3 rounded-full border border-purple-500 pointer-events-none z-[9999] mix-blend-screen hidden md:block"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
        scale: scaleSpring,
        backgroundColor: useTransform(hoverSpring, [0, 1], ['rgba(168, 85, 247, 0)', 'rgba(168, 85, 247, 0.5)'])
      }}
    />
  );
}

// --- TELEMETRY UTILS ---
const generateSmoothPath = (data, width = 500, height = 200) => {
  if (data.length === 0) return "";
  const max = 120;
  const min = 0;
  const range = max - min || 1;
  const stepX = width / (data.length - 1);
  const points = data.map((val, i) => {
    const x = i * stepX;
    const y = height - ((val - min) / range) * height * 0.8 - height * 0.1;
    return { x, y };
  });
  return points.reduce((acc, point, i, a) => {
    if (i === 0) return `M ${point.x} ${point.y}`;
    const prev = a[i - 1];
    const cp1x = prev.x + (point.x - prev.x) / 3;
    const cp1y = prev.y;
    const cp2x = point.x - (point.x - prev.x) / 3;
    const cp2y = point.y;
    return `${acc} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${point.x} ${point.y}`;
  }, "");
};

const BentoBox = ({ children, className, delay = 0 }) => (
  <m.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.5, delay, ease: "easeOut" }}
    className={`bg-neutral-900/50 backdrop-blur-md border border-white/10 rounded-3xl p-6 flex flex-col relative overflow-hidden hover:border-purple-500/30 transition-colors ${className}`}
  >
    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent pointer-events-none" />
    <div className="relative z-10 flex flex-col h-full w-full">
      {children}
    </div>
  </m.div>
);

// --- SECTIONS ---
function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-12 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(120,50,255,0.15),transparent_50%)]" />
      </div>
      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full grid lg:grid-cols-2 gap-12 items-center">
        <m.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 mb-6 text-purple-400 text-sm font-medium">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
            </span>
            Vercel-like performance, infinite scale
          </div>
          <h1 className="text-5xl lg:text-7xl font-bold tracking-tighter text-white mb-6 leading-[1.1]">
            The unified platform for <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">modern data</span>
          </h1>
          <p className="text-lg text-neutral-400 mb-8 max-w-xl leading-relaxed">
            Unleash the power of real-time analytics with a serverless architecture designed for global scale. Stop worrying about infrastructure and start shipping features.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <button className="interactive-el px-6 py-3 bg-white text-black rounded-full font-medium hover:bg-neutral-200 transition-colors flex items-center gap-2">
              Start Building <ArrowRight size={18} />
            </button>
            <button className="interactive-el px-6 py-3 bg-neutral-900 border border-white/10 text-white rounded-full font-medium hover:bg-neutral-800 transition-colors flex items-center gap-2">
              <MonitorPlay size={18} /> View Demo
            </button>
          </div>
        </m.div>
        
        <m.div 
          initial={{ opacity: 0, scale: 0.9, rotateY: 15 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative perspective-1000"
        >
          <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-purple-900/20 aspect-video md:aspect-square lg:aspect-[4/3] group">
            <Image 
              src="/images/demo/saas/hero.jpg" 
              alt="SaaS Dashboard Interface" 
              fill 
              className="object-cover group-hover:scale-105 transition-transform duration-700" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 backdrop-blur-md bg-black/40 border border-white/10 rounded-xl p-4 flex items-center justify-between">
              <div>
                <div className="text-sm text-neutral-400">Total Queries (24h)</div>
                <div className="text-2xl font-mono font-bold text-white">1.24B</div>
              </div>
              <Activity className="text-purple-400" size={32} />
            </div>
          </div>
        </m.div>
      </div>
    </section>
  );
}

function MarqueeSection() {
  const logos = ["Acme Corp", "GlobalTech", "Nexus", "Quantum", "Starlight", "Horizon", "Acme Corp", "GlobalTech", "Nexus", "Quantum", "Starlight", "Horizon"];
  return (
    <section className="py-12 border-y border-white/5 bg-black overflow-hidden relative">
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-10" />
      <div className="flex w-max animate-marquee">
        {logos.map((logo, i) => (
          <div key={i} className="px-12 text-2xl font-bold text-neutral-800 tracking-wider uppercase flex-shrink-0">
            {logo}
          </div>
        ))}
      </div>
    </section>
  );
}

function FeaturesBento() {
  return (
    <section className="py-24 max-w-7xl mx-auto px-6">
      <div className="mb-16 text-center max-w-3xl mx-auto">
        <h2 className="text-4xl font-bold tracking-tight mb-4 text-white">Everything you need to scale</h2>
        <p className="text-neutral-400 text-lg">Our comprehensive suite of tools replaces your fragmented tech stack with one cohesive, blazing-fast platform.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[250px]">
        <BentoBox className="md:col-span-2 row-span-2 group">
          <div className="flex justify-between items-start mb-6">
            <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center border border-blue-500/20">
              <CloudLightning className="text-blue-400" size={24} />
            </div>
          </div>
          <h3 className="text-2xl font-semibold mb-2 text-white">Edge Caching Network</h3>
          <p className="text-neutral-400 mb-6">Deliver content to your users in milliseconds with our globally distributed edge network covering 250+ cities worldwide.</p>
          <div className="flex-1 relative rounded-xl overflow-hidden mt-auto border border-white/10">
            <Image src="/images/demo/saas/1.jpg" alt="Edge Network Map" fill className="object-cover group-hover:scale-105 transition-duration-500" />
          </div>
        </BentoBox>

        <BentoBox className="md:col-span-1 row-span-1 group">
          <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center border border-emerald-500/20 mb-4">
            <ShieldCheck className="text-emerald-400" size={20} />
          </div>
          <h3 className="text-xl font-semibold mb-2 text-white">Enterprise Security</h3>
          <p className="text-sm text-neutral-400">SOC2 Type II, HIPAA compliant, and end-to-end encryption out of the box.</p>
        </BentoBox>

        <BentoBox className="md:col-span-1 row-span-1 group">
          <div className="w-10 h-10 bg-purple-500/10 rounded-xl flex items-center justify-center border border-purple-500/20 mb-4">
            <Code2 className="text-purple-400" size={20} />
          </div>
          <h3 className="text-xl font-semibold mb-2 text-white">API-First Design</h3>
          <p className="text-sm text-neutral-400">Integrate effortlessly with our robust GraphQL and REST APIs with full TS support.</p>
        </BentoBox>

        <BentoBox className="md:col-span-3 row-span-1 flex-row items-center gap-8 group">
          <div className="flex-1">
            <h3 className="text-2xl font-semibold mb-2 text-white">Automated Scaling</h3>
            <p className="text-neutral-400">Go from 0 to 1M requests per second without changing a single line of code. We handle the infrastructure routing and load balancing automatically.</p>
          </div>
          <div className="hidden md:flex flex-1 relative h-full min-h-[150px] rounded-xl overflow-hidden border border-white/10">
             <Image src="/images/demo/saas/2.jpg" alt="Scaling Graphic" fill className="object-cover" />
          </div>
        </BentoBox>
      </div>
    </section>
  );
}

function LiveDashboard() {
  const [latencyData, setLatencyData] = useState(Array.from({ length: 20 }, () => Math.floor(Math.random() * 60) + 40));
  const [activeUsers, setActiveUsers] = useState(14520);
  const [cpuUsage, setCpuUsage] = useState(42);
  const [reqs, setReqs] = useState(842);
  const [reqHistory, setReqHistory] = useState(Array.from({ length: 12 }, () => Math.floor(Math.random() * 500) + 500));
  const [nodes, setNodes] = useState([
    { name: 'eu-west-1a', ip: '10.0.1.24', status: 'ok', load: 45 },
    { name: 'us-east-1a', ip: '10.0.2.11', status: 'warn', load: 88 },
  ]);

  useEffect(() => {
    const intLatency = setInterval(() => {
      setLatencyData(p => [...p.slice(1), Math.floor(Math.random() * 60) + 40]);
    }, 1500);
    const intUsers = setInterval(() => {
      setActiveUsers(p => p + Math.floor(Math.random() * 100) - 40);
    }, 2000);
    const intCpu = setInterval(() => {
      setCpuUsage(Math.floor(Math.random() * 30) + 40);
    }, 3000);
    const intReqs = setInterval(() => {
      const n = Math.floor(Math.random() * 500) + 500;
      setReqs(n);
      setReqHistory(p => [...p.slice(1), n]);
    }, 1000);
    const intNodes = setInterval(() => {
      setNodes(p => p.map(n => {
        const load = Math.max(10, Math.min(99, n.load + Math.floor(Math.random() * 15) - 7));
        return { ...n, load, status: load > 85 ? 'warn' : 'ok' };
      }));
    }, 2500);

    return () => {
      clearInterval(intLatency); clearInterval(intUsers);
      clearInterval(intCpu); clearInterval(intReqs); clearInterval(intNodes);
    };
  }, []);

  return (
    <section className="py-24 bg-neutral-900/30 border-y border-white/5 relative">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">Live System Telemetry</h2>
            <p className="text-neutral-400">Real-time infrastructure monitoring of our global edge network.</p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-black border border-white/10 rounded-full">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-mono text-neutral-300">All systems nominal</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <BentoBox className="md:col-span-2 row-span-2">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-neutral-400 font-medium flex items-center gap-2"><Zap size={16} className="text-amber-500" /> Global Latency</h3>
              <div className="px-2 py-1 bg-amber-500/10 text-amber-500 rounded text-xs font-mono">p99</div>
            </div>
            <div className="text-5xl font-bold mt-2 font-mono text-white">{latencyData[latencyData.length - 1]}<span className="text-2xl text-neutral-500 ml-1">ms</span></div>
            <div className="flex-1 w-full relative mt-8 h-32">
              <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 500 200">
                <defs>
                  <linearGradient id="latencyGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="rgb(245, 158, 11)" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="rgb(245, 158, 11)" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <m.path d={generateSmoothPath(latencyData) + " L 500 200 L 0 200 Z"} fill="url(#latencyGrad)" transition={{ duration: 1.5 }} />
                <m.path d={generateSmoothPath(latencyData)} fill="none" stroke="rgb(245, 158, 11)" strokeWidth="3" />
              </svg>
            </div>
          </BentoBox>

          <BentoBox className="col-span-1">
            <div className="flex justify-between mb-4"><Cpu className="text-blue-500" size={20} /><span className="text-xs font-mono text-blue-400">CPU</span></div>
            <div className="text-4xl font-mono text-white font-bold">{cpuUsage}%</div>
            <div className="w-full bg-white/5 h-1.5 rounded-full mt-auto">
              <m.div className="h-full bg-blue-500 rounded-full" animate={{ width: `${cpuUsage}%` }} />
            </div>
          </BentoBox>

          <BentoBox className="col-span-1">
            <div className="flex justify-between mb-4"><Users className="text-emerald-500" size={20} /></div>
            <m.div className="text-3xl font-mono text-white font-bold" key={activeUsers}>{activeUsers.toLocaleString()}</m.div>
            <div className="text-sm text-neutral-500 mt-1">Active Users</div>
          </BentoBox>

          <BentoBox className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4"><Server className="text-purple-500" size={20} /><span className="text-neutral-400 font-medium">Nodes</span></div>
            <div className="space-y-3">
              {nodes.map((n, i) => (
                <div key={i} className="flex justify-between items-center bg-black/50 p-2 rounded-lg border border-white/5">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${n.status==='ok'?'bg-emerald-500':'bg-rose-500'}`} />
                    <span className="text-sm text-neutral-300">{n.name}</span>
                  </div>
                  <span className="text-xs font-mono text-neutral-500">{n.load}%</span>
                </div>
              ))}
            </div>
          </BentoBox>
        </div>
      </div>
    </section>
  );
}

function PricingSection() {
  const plans = [
    { name: "Starter", price: "$49", features: ["Up to 10k MAU", "Standard Analytics", "Community Support", "1 Project"] },
    { name: "Pro", price: "$199", popular: true, features: ["Up to 100k MAU", "Advanced Analytics", "Priority Support", "Unlimited Projects", "Custom Domains"] },
    { name: "Enterprise", price: "Custom", features: ["Unlimited MAU", "Custom SLA", "Dedicated Success Manager", "SSO & Advanced Security", "On-premise option"] },
  ];

  return (
    <section className="py-24 max-w-7xl mx-auto px-6">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Pricing that scales with you</h2>
        <p className="text-neutral-400">Start for free, upgrade when you need more power.</p>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        {plans.map((plan, idx) => (
          <m.div 
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className={`relative p-8 rounded-3xl border ${plan.popular ? 'bg-purple-900/10 border-purple-500/50' : 'bg-neutral-900/30 border-white/10'} flex flex-col`}
          >
            {plan.popular && (
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-purple-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                MOST POPULAR
              </div>
            )}
            <h3 className="text-xl font-medium text-white mb-2">{plan.name}</h3>
            <div className="mb-6 flex items-baseline gap-1">
              <span className="text-4xl font-bold text-white">{plan.price}</span>
              {plan.price !== "Custom" && <span className="text-neutral-500">/mo</span>}
            </div>
            <ul className="space-y-4 mb-8 flex-1">
              {plan.features.map((feat, i) => (
                <li key={i} className="flex items-start gap-3 text-neutral-300 text-sm">
                  <CheckCircle2 className="text-purple-400 shrink-0" size={18} />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
            <button className={`w-full py-3 rounded-xl font-medium transition-colors ${plan.popular ? 'bg-purple-600 hover:bg-purple-700 text-white' : 'bg-white/10 hover:bg-white/20 text-white'}`}>
              {plan.price === "Custom" ? "Contact Sales" : "Get Started"}
            </button>
          </m.div>
        ))}
      </div>
    </section>
  );
}

function FAQSection() {
  const faqs = [
    { q: "How fast is the setup process?", a: "You can be up and running in less than 5 minutes. Our SDKs are designed to be plug-and-play." },
    { q: "Do you offer a free tier?", a: "Yes, our Developer plan is completely free and includes enough resources to build and launch your MVP." },
    { q: "What happens if I exceed my plan limits?", a: "We never hard-cap your usage. We will notify you and you will be billed for overages at a standard rate until you choose to upgrade." },
  ];

  return (
    <section className="py-24 max-w-3xl mx-auto px-6">
      <h2 className="text-3xl font-bold text-center text-white mb-12">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {faqs.map((faq, idx) => {
          const [isOpen, setIsOpen] = useState(false);
          return (
            <div key={idx} className="border border-white/10 bg-neutral-900/30 rounded-2xl overflow-hidden">
              <button 
                onClick={() => setIsOpen(!isOpen)}
                className="w-full p-6 text-left flex justify-between items-center focus:outline-none"
              >
                <span className="font-medium text-white">{faq.q}</span>
                <ChevronDown className={`text-neutral-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} size={20} />
              </button>
              <AnimatePresence>
                {isOpen && (
                  <m.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="px-6 pb-6 text-neutral-400"
                  >
                    {faq.a}
                  </m.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black pt-16 pb-8 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
        <div>
          <div className="text-xl font-bold text-white mb-6">SaasCore</div>
          <p className="text-sm text-neutral-500">Building the future of infrastructure, one request at a time.</p>
        </div>
        <div>
          <h4 className="text-white font-medium mb-4">Product</h4>
          <ul className="space-y-2 text-sm text-neutral-400">
            <li><a href="#" className="hover:text-purple-400">Features</a></li>
            <li><a href="#" className="hover:text-purple-400">Integrations</a></li>
            <li><a href="#" className="hover:text-purple-400">Pricing</a></li>
            <li><a href="#" className="hover:text-purple-400">Changelog</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-medium mb-4">Resources</h4>
          <ul className="space-y-2 text-sm text-neutral-400">
            <li><a href="#" className="hover:text-purple-400">Documentation</a></li>
            <li><a href="#" className="hover:text-purple-400">API Reference</a></li>
            <li><a href="#" className="hover:text-purple-400">Community</a></li>
            <li><a href="#" className="hover:text-purple-400">Blog</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-medium mb-4">Legal</h4>
          <ul className="space-y-2 text-sm text-neutral-400">
            <li><a href="#" className="hover:text-purple-400">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-purple-400">Terms of Service</a></li>
            <li><a href="#" className="hover:text-purple-400">Cookie Policy</a></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/10 text-sm text-neutral-600">
        <p>&copy; 2026 SaasCore Inc. All rights reserved.</p>
        <div className="flex gap-4 mt-4 md:mt-0">
          <a href="#" className="hover:text-white transition-colors">Twitter</a>
          <a href="#" className="hover:text-white transition-colors">GitHub</a>
          <a href="#" className="hover:text-white transition-colors">Discord</a>
        </div>
      </div>
    </footer>
  );
}

export default function SaasDemo() {
  return (
    <DemoLayout title="SaaS Core Platform">
      <LazyMotion features={domAnimation}>
        <style dangerouslySetInnerHTML={{__html: `@media (pointer: fine) { body { cursor: none !important; } }`}} />
        <div className="bg-black text-neutral-100 font-sans selection:bg-purple-500/30 min-h-screen">
          <CustomCursor />
          
          <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-black/50 backdrop-blur-md">
            <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
              <Link href="/" className="inline-flex items-center gap-2 text-neutral-400 hover:text-white transition-colors">
                <ArrowLeft size={16} />
                <span className="font-medium">Catálogo</span>
              </Link>
              <div className="hidden md:flex items-center gap-6 text-sm font-medium text-neutral-400">
                <a href="#" className="hover:text-white transition-colors">Product</a>
                <a href="#" className="hover:text-white transition-colors">Docs</a>
                <a href="#" className="hover:text-white transition-colors">Pricing</a>
              </div>
              <button className="px-4 py-2 bg-white text-black text-sm font-medium rounded-full hover:bg-neutral-200 transition-colors">
                Log In
              </button>
            </div>
          </nav>

          <main>
            <HeroSection />
            <MarqueeSection />
            <FeaturesBento />
            <LiveDashboard />
            <PricingSection />
            <FAQSection />
          </main>
          
          <Footer />
        </div>
      </LazyMotion>
    </DemoLayout>
  );
}
