"use client";

import React, { useState, useEffect, useRef } from 'react';
import { LazyMotion, domAnimation, m, useSpring, useMotionValue, useTransform } from 'framer-motion';
import Link from 'next/link';
import DemoLayout from '@/components/DemoLayout';
import { Zap, Cpu, Server, Users, Activity, Database, Globe, ArrowUpRight, ArrowLeft } from 'lucide-react';

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
      if (target.tagName.toLowerCase() === 'button' || target.tagName.toLowerCase() === 'a' || target.closest('.interactive-el')) {
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
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay, ease: "easeOut" }}
    className={`bg-[#0a0a0a] border border-white/5 rounded-3xl p-5 md:p-6 flex flex-col relative overflow-hidden active:scale-[0.98] transition-transform md:active:scale-100 ${className}`}
  >
    <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none" />
    <div className="relative z-10 flex flex-col h-full w-full">
      {children}
    </div>
  </m.div>
);

export default function SaasDemo() {
  const [latencyData, setLatencyData] = useState(Array.from({ length: 20 }, () => Math.floor(Math.random() * 60) + 40));
  const [activeUsers, setActiveUsers] = useState(14520);
  const [cpuUsage, setCpuUsage] = useState(42);
  const [reqs, setReqs] = useState(842);
  const [reqHistory, setReqHistory] = useState(Array.from({ length: 12 }, () => Math.floor(Math.random() * 500) + 500));
  const [nodes, setNodes] = useState([
    { name: 'eu-west-1a', ip: '10.0.1.24', status: 'ok', load: 45 },
    { name: 'eu-west-1b', ip: '10.0.1.25', status: 'ok', load: 62 },
    { name: 'us-east-1a', ip: '10.0.2.11', status: 'warn', load: 88 },
    { name: 'ap-south-1a', ip: '10.0.3.5', status: 'ok', load: 31 },
  ]);

  const carouselRef = useRef(null);

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
      clearInterval(intLatency);
      clearInterval(intUsers);
      clearInterval(intCpu);
      clearInterval(intReqs);
      clearInterval(intNodes);
    };
  }, []);

  const getLatencyCard = (idSuffix) => (
    <BentoBox className="col-span-1 md:col-span-2 lg:col-span-2 row-span-2 h-[320px] md:h-auto" delay={0.1}>
      <div className="flex justify-between items-start mb-2">
        <div>
          <h2 className="text-neutral-400 font-medium flex items-center gap-2">
            <Zap size={16} className="text-amber-500" />
            Global Latency
          </h2>
          <div className="text-[clamp(3rem,10vw,4rem)] font-bold mt-2 md:mt-4 font-mono text-white leading-none">
            {latencyData[latencyData.length - 1]}
            <span className="text-xl md:text-2xl text-neutral-500 ml-1">ms</span>
          </div>
        </div>
        <div className="px-3 py-1 bg-amber-500/10 text-amber-500 rounded-full text-xs font-medium border border-amber-500/20">
          p99
        </div>
      </div>
      <div className="flex-1 w-full relative mt-4">
        <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 500 200">
          <defs>
            <linearGradient id={`latencyGradient-${idSuffix}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgb(245, 158, 11)" stopOpacity="0.3" />
              <stop offset="100%" stopColor="rgb(245, 158, 11)" stopOpacity="0" />
            </linearGradient>
          </defs>
          <m.path
            d={generateSmoothPath(latencyData) + " L 500 200 L 0 200 Z"}
            fill={`url(#latencyGradient-${idSuffix})`}
            transition={{ type: "tween", ease: "linear", duration: 1.5 }}
          />
          <m.path
            d={generateSmoothPath(latencyData)}
            fill="none"
            stroke="rgb(245, 158, 11)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            transition={{ type: "tween", ease: "linear", duration: 1.5 }}
          />
        </svg>
        <div className="absolute inset-0 pointer-events-none border-t border-b border-white/5 flex flex-col justify-between py-2">
          <span className="text-xs md:text-sm text-neutral-600 font-mono">120ms</span>
          <span className="text-xs md:text-sm text-neutral-600 font-mono">60ms</span>
          <span className="text-xs md:text-sm text-neutral-600 font-mono">0ms</span>
        </div>
      </div>
    </BentoBox>
  );

  const cpuCard = (
    <BentoBox className="col-span-1 row-span-1 h-full w-full" delay={0.2}>
      <div className="flex justify-between items-start">
        <Cpu size={20} className="text-blue-500" />
        <span className="text-xs md:text-sm text-blue-500 bg-blue-500/10 px-2 py-1 rounded-full font-mono border border-blue-500/20">us-east-1</span>
      </div>
      <div className="mt-auto">
        <div className="text-4xl font-bold font-mono text-white">{cpuUsage}%</div>
        <div className="text-sm text-neutral-500 mt-1">CPU Utilization</div>
      </div>
      <div className="w-full bg-white/5 h-1.5 rounded-full mt-4 overflow-hidden">
        <m.div 
          className="h-full bg-blue-500"
          animate={{ width: `${cpuUsage}%` }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
        />
      </div>
    </BentoBox>
  );

  const nodesCard = (
    <BentoBox className="col-span-1 row-span-2 flex flex-col h-[320px] md:h-auto" delay={0.3}>
      <div className="flex items-center justify-between mb-4 md:mb-6">
        <div className="flex items-center gap-2">
          <Server size={20} className="text-purple-500" />
          <h2 className="text-neutral-400 font-medium">Nodes</h2>
        </div>
        <span className="flex h-2 w-2 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
        </span>
      </div>
      <div className="flex-1 flex flex-col gap-2 md:gap-3 justify-center">
        {nodes.map((node, i) => (
          <div key={i} className="flex items-center justify-between p-2 md:p-3 rounded-xl bg-white/[0.03] border border-white/5">
            <div className="flex items-center gap-3">
              <div className={`w-2 h-2 rounded-full ${node.status === 'ok' ? 'bg-emerald-500' : 'bg-rose-500'}`} />
              <div>
                <div className="text-sm font-medium text-neutral-200">{node.name}</div>
                <div className="text-xs md:text-sm text-neutral-500 font-mono">{node.ip}</div>
              </div>
            </div>
            <div className={`text-xs font-mono ${node.status === 'ok' ? 'text-emerald-500' : 'text-rose-500'}`}>
              {node.load}%
            </div>
          </div>
        ))}
      </div>
    </BentoBox>
  );

  const usersCard = (
    <BentoBox className="col-span-1 row-span-1 h-full w-full" delay={0.4}>
      <div className="flex justify-between items-start">
        <Users size={20} className="text-emerald-500" />
        <div className="flex items-center text-xs md:text-sm text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-full font-mono border border-emerald-500/20 gap-1">
          <ArrowUpRight size={12} />
          12%
        </div>
      </div>
      <div className="mt-auto">
        <m.div className="text-4xl font-bold font-mono text-white" key={activeUsers}>
          {activeUsers.toLocaleString()}
        </m.div>
        <div className="text-sm text-neutral-500 mt-1">Active Connections</div>
      </div>
    </BentoBox>
  );

  const reqsCard = (
    <BentoBox className="col-span-1 row-span-1 flex flex-col h-full w-full" delay={0.5}>
      <div className="flex justify-between items-start mb-2">
        <Activity size={20} className="text-rose-500" />
      </div>
      <div className="flex items-end gap-2 mt-auto mb-4">
        <div className="text-3xl font-bold font-mono text-white">{reqs}</div>
        <div className="text-sm text-neutral-500 mb-1">req/s</div>
      </div>
      <div className="flex items-end h-10 gap-1 w-full relative">
        {reqHistory.map((val, i) => (
          <div key={i} className="flex-1 bg-white/5 rounded-t-sm h-full relative overflow-hidden">
            <m.div 
              className="absolute bottom-0 w-full bg-rose-500 rounded-t-sm"
              animate={{ height: `${(val / 1000) * 100}%` }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            />
          </div>
        ))}
      </div>
    </BentoBox>
  );

  const dbCard = (
    <BentoBox className="col-span-1 row-span-1 flex flex-col justify-between h-full w-full" delay={0.6}>
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-2">
          <Database size={20} className="text-indigo-500" />
        </div>
        <span className="text-xs md:text-sm text-neutral-500 bg-white/5 px-2 py-1 rounded-md border border-white/5">Primary DB</span>
      </div>
      <div className="grid grid-cols-2 gap-3 mt-auto">
        <div className="bg-white/[0.03] p-3 rounded-xl border border-white/5">
          <div className="text-xs md:text-sm text-neutral-500 mb-1">Reads/s</div>
          <m.div 
            className="text-lg font-bold font-mono text-indigo-400"
            key={reqs}
            initial={{ opacity: 0.5 }}
            animate={{ opacity: 1 }}
          >
            {(Math.floor(reqs * 4.2)).toLocaleString()}
          </m.div>
        </div>
        <div className="bg-white/[0.03] p-3 rounded-xl border border-white/5">
          <div className="text-xs md:text-sm text-neutral-500 mb-1">Writes/s</div>
          <m.div 
            className="text-lg font-bold font-mono text-indigo-400"
            key={activeUsers}
            initial={{ opacity: 0.5 }}
            animate={{ opacity: 1 }}
          >
            {(Math.floor(reqs * 0.8)).toLocaleString()}
          </m.div>
        </div>
      </div>
    </BentoBox>
  );

  const edgeCard = (
    <BentoBox className="col-span-1 md:col-span-2 lg:col-span-2 row-span-1 flex flex-col justify-center h-[180px] md:h-auto" delay={0.7}>
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-3 md:gap-5">
          <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20 relative shrink-0">
            <m.div 
              className="absolute inset-0 border-2 border-cyan-500/30 rounded-full"
              animate={{ scale: [1, 1.5], opacity: [1, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
            <Globe size={24} className="text-cyan-500 relative z-10 md:w-7 md:h-7" />
          </div>
          <div>
            <h3 className="text-base md:text-lg font-medium text-white">Edge Network</h3>
            <div className="text-xs md:text-sm text-neutral-500 mt-1">Global routing active</div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl md:text-3xl font-bold font-mono text-cyan-400">
            12.4
            <span className="text-xs md:text-sm text-cyan-500/50 ml-1">TB/s</span>
          </div>
          <div className="text-xs md:text-sm text-neutral-500 mt-1 md:mt-2">Total Bandwidth</div>
        </div>
      </div>
    </BentoBox>
  );

  return (
    <DemoLayout title="SaaS Telemetry">
    <LazyMotion features={domAnimation}>
      <style dangerouslySetInnerHTML={{__html: `@media (pointer: fine) { body { cursor: none !important; } }`}} />
      <div className="text-neutral-100 font-sans selection:bg-amber-500/30 overflow-x-hidden">
        
        <CustomCursor />

        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-purple-900/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[100px] pointer-events-none mix-blend-screen -translate-x-1/3 translate-y-1/3" />
        <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

        <nav className="mb-8 md:mb-12 flex items-center justify-between max-w-7xl mx-auto relative z-10">
          <Link href="/" className="inline-flex items-center gap-2 text-neutral-400 active:scale-95 transition-all interactive-el md:hover:text-white">
            <ArrowLeft size={16} />
            <span>Catálogo</span>
          </Link>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
            <span className="text-xs text-emerald-500 font-mono font-medium">System Operational</span>
          </div>
        </nav>

        <main className="max-w-7xl mx-auto relative z-10">
          <header className="mb-8 mt-2 md:mt-0">
            <h1 className="text-[clamp(2.5rem,8vw,5rem)] leading-none font-bold tracking-tight mb-3 text-white">Telemetry</h1>
            <p className="text-neutral-500 text-sm md:text-base max-w-[85vw]">Real-time infrastructure monitoring and global edge performance.</p>
          </header>

          <div className="hidden md:grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[180px]">
            {getLatencyCard('desk')}
            {cpuCard}
            {nodesCard}
            {usersCard}
            {reqsCard}
            {dbCard}
            {edgeCard}
          </div>

          <div className="flex md:hidden flex-col gap-4">
            {getLatencyCard('mob')}
            <div ref={carouselRef} className="overflow-hidden w-[100vw] -ml-4 px-4 py-2">
              <m.div
                drag="x"
                dragConstraints={carouselRef}
                dragElastic={0.2}
                className="flex gap-4 w-max cursor-grab active:cursor-grabbing pr-8"
              >
                <div className="w-[75vw] max-w-[300px] shrink-0 h-[180px]">{cpuCard}</div>
                <div className="w-[75vw] max-w-[300px] shrink-0 h-[180px]">{usersCard}</div>
                <div className="w-[75vw] max-w-[300px] shrink-0 h-[180px]">{reqsCard}</div>
                <div className="w-[75vw] max-w-[300px] shrink-0 h-[180px]">{dbCard}</div>
              </m.div>
            </div>
            {nodesCard}
            {edgeCard}
          </div>
        </main>
      </div>
    </LazyMotion>
    </DemoLayout>
  );
}
