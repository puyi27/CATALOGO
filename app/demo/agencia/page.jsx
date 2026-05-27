'use client'

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight, Code, Palette, Zap, BarChart3, Users, Mail, Phone, MapPin } from 'lucide-react';
import DemoLayout from '@/components/DemoLayout';

export default function AgenciaDemo() {
  const containerRef = useRef(null);
  const cursorRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const cursor = cursorRef.current;
    
    gsap.set(cursor, { xPercent: -50, yPercent: -50 });
    
    const xTo = gsap.quickTo(cursor, "x", {duration: 0.3, ease: "power3"});
    const yTo = gsap.quickTo(cursor, "y", {duration: 0.3, ease: "power3"});

    const handleMouseMove = (e) => {
      if (window.innerWidth >= 768) {
        xTo(e.clientX);
        yTo(e.clientY);
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);

    const ctx = gsap.context(() => {
      const projectsArray = gsap.utils.toArray('.project-card');
      
      projectsArray.forEach((project, i) => {
        if (i !== projectsArray.length - 1) {
          const nextProject = projectsArray[i + 1];
          gsap.to(project.querySelector('.project-inner'), {
            scale: 0.95,
            opacity: 0.5,
            scrollTrigger: {
              trigger: nextProject,
              start: "top bottom",
              end: "top top",
              scrub: 1.5,
            }
          });

          ScrollTrigger.create({
            trigger: project,
            start: "top top",
            pin: true,
            pinSpacing: false,
            endTrigger: '.projects-container',
            end: "bottom bottom",
          });
        }
      });

      let mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        const images = document.querySelectorAll('.hover-image');
        const onImgEnter = () => gsap.to(cursor, { scale: 5, duration: 0.4, ease: 'power2.out' });
        const onImgLeave = () => gsap.to(cursor, { scale: 1, duration: 0.4, ease: 'power2.out' });
        
        images.forEach(img => {
          img.addEventListener('mouseenter', onImgEnter);
          img.addEventListener('mouseleave', onImgLeave);
        });

        const links = document.querySelectorAll('a, button');
        const onLinkEnter = () => gsap.to(cursor, { scale: 2, duration: 0.3, ease: 'power2.out' });
        const onLinkLeave = () => gsap.to(cursor, { scale: 1, duration: 0.3, ease: 'power2.out' });

        links.forEach(link => {
          link.addEventListener('mouseenter', onLinkEnter);
          link.addEventListener('mouseleave', onLinkLeave);
        });

        return () => {
          images.forEach(img => {
            img.removeEventListener('mouseenter', onImgEnter);
            img.removeEventListener('mouseleave', onImgLeave);
          });
          links.forEach(link => {
            link.removeEventListener('mouseenter', onLinkEnter);
            link.removeEventListener('mouseleave', onLinkLeave);
          });
        };
      });
    }, containerRef);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      ctx.revert();
    };
  }, []);

  const projects = [
    { id: 1, title: 'LUMINA', category: 'FASHION E-COMMERCE', gradient: 'from-indigo-900 via-purple-900 to-black' },
    { id: 2, title: 'AETHER', category: 'BRAND IDENTITY', gradient: 'from-emerald-900 via-teal-900 to-black' },
    { id: 3, title: 'SYNTHESIS', category: 'WEB3 PLATFORM', gradient: 'from-orange-900 via-red-900 to-black' },
    { id: 4, title: 'NOVA', category: 'EDITORIAL DESIGN', gradient: 'from-sky-900 via-blue-900 to-black' }
  ];

  const services = [
    { icon: Code, title: 'DESARROLLO WEB', desc: 'Next.js, React, Node.js. Webs ultrarrápidas con SSR, ISR y edge computing. Jamstack y headless CMS.', metric: '< 1s' },
    { icon: Palette, title: 'DISEÑO UI/UX', desc: 'Interfaces que cuentan historias. Design systems, prototipos Figma, tests de usabilidad.', metric: '98%' },
    { icon: Zap, title: 'BRANDING DIGITAL', desc: 'Identidad visual que trasciende. Logos, tipografía, paletas cromáticas, guidelines completos.', metric: '120+' },
    { icon: BarChart3, title: 'ESTRATEGIA DIGITAL', desc: 'SEO técnico, CRO, analítica avanzada. Convertimos datos en decisiones de negocio.', metric: '3.2x' },
  ];

  const team = [
    { name: 'Marta Vega', role: 'Creative Director', initials: 'MV' },
    { name: 'Pablo Ruiz', role: 'Lead Developer', initials: 'PR' },
    { name: 'Ana Chen', role: 'UX Researcher', initials: 'AC' },
    { name: 'Leo Dubois', role: 'Motion Designer', initials: 'LD' },
  ];

  const process = [
    { num: '01', title: 'DISCOVER', desc: 'Investigamos tu sector, competencia y audiencia. Workshops estratégicos para alinear visión y objetivos.' },
    { num: '02', title: 'DESIGN', desc: 'Wireframes, moodboards, prototipos interactivos. Iteramos contigo hasta que cada píxel sea perfecto.' },
    { num: '03', title: 'DEVELOP', desc: 'Código limpio, performante y accesible. Arquitectura escalable con CI/CD y testing automatizado.' },
    { num: '04', title: 'DELIVER', desc: 'Deploy, monitoring, analytics. Te acompañamos post-lanzamiento con soporte y optimización continua.' },
  ];

  const clients = ['Spotify', 'Figma', 'Stripe', 'Notion', 'Linear', 'Vercel', 'Supabase', 'Framer'];

  return (
    <DemoLayout title="Agencia Creativa">
      <div className="text-[#1a1a1a] md:cursor-none w-full bg-[#f2f2ef]" ref={containerRef}>
        
        <div 
          ref={cursorRef} 
          className="hidden md:flex fixed top-0 left-0 w-4 h-4 bg-white rounded-full pointer-events-none z-50 items-center justify-center mix-blend-difference"
        />

        {/* ═══ HERO ═══ */}
        <section className="min-h-screen flex flex-col justify-center px-6 md:px-16 pt-20">
          <div className="max-w-7xl mx-auto w-full">
            <p className="font-mono text-xs md:text-sm max-w-md mb-8 md:mb-12 uppercase tracking-widest leading-relaxed text-[#1a1a1a]/50">
              We craft digital experiences that transcend the ordinary. Independent design boutique est. 2019.
            </p>
            <h1 className="text-[clamp(3rem,12vw,10rem)] font-serif uppercase leading-[0.85] tracking-tighter">
              We make<br/>brands<br/><span className="italic text-[#1a1a1a]/30">matter.</span>
            </h1>
            <div className="flex items-center gap-6 mt-12">
              <a href="#projects" className="font-mono text-xs tracking-widest uppercase border-b border-[#1a1a1a] pb-1 hover:opacity-50 transition-opacity">View Work</a>
              <a href="#contact" className="font-mono text-xs tracking-widest uppercase text-[#1a1a1a]/40 hover:text-[#1a1a1a] transition-colors">Get in Touch</a>
            </div>
          </div>
        </section>

        {/* ═══ SERVICES ═══ */}
        <section className="py-24 md:py-40 px-6 md:px-16 bg-[#111] text-[#f2f2ef]">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-4">
              <h2 className="text-5xl md:text-7xl font-serif uppercase tracking-tighter leading-[0.9]">What<br/>we do</h2>
              <p className="font-mono text-xs tracking-widest uppercase text-white/30">4 Core Services</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-[1px] bg-white/10">
              {services.map((s, i) => (
                <div key={i} className="bg-[#111] p-8 md:p-12 group hover:bg-[#1a1a1a] transition-colors">
                  <div className="flex items-start justify-between mb-8">
                    <s.icon className="w-6 h-6 text-white/20 group-hover:text-white/60 transition-colors" strokeWidth={1.5} />
                    <span className="font-mono text-3xl md:text-4xl font-bold text-white/5 group-hover:text-white/10 transition-colors">{s.metric}</span>
                  </div>
                  <h3 className="font-mono text-sm tracking-widest uppercase mb-4">{s.title}</h3>
                  <p className="text-sm text-white/40 leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ PROJECTS — STACKING CARDS ═══ */}
        <section id="projects" className="bg-[#f2f2ef]">
          <div className="px-6 md:px-16 pt-24 md:pt-40 pb-12 max-w-7xl mx-auto">
            <h2 className="text-5xl md:text-7xl font-serif uppercase tracking-tighter leading-[0.9] mb-4">Selected<br/>work</h2>
            <p className="font-mono text-xs tracking-widest uppercase text-[#1a1a1a]/30">2023 — 2026</p>
          </div>

          <div className="projects-container relative z-10 w-full">
            {projects.map((project, i) => (
              <div key={project.id} className="project-card h-screen w-full relative will-change-transform">
                <div className="project-inner w-full h-full p-2 md:p-4 flex items-center justify-center will-change-transform">
                <div className="w-full h-full relative overflow-hidden rounded-[2rem] group hover-image">
                  <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient}`} />
                  <div className="absolute inset-0 bg-black/40 md:bg-black/30 flex flex-col justify-between p-6 md:p-12 text-white">
                    <div className="flex justify-between items-start">
                      <span className="font-mono text-xs md:text-base tracking-widest bg-black/20 md:bg-transparent px-3 py-1 md:p-0 rounded-full md:rounded-none backdrop-blur-sm md:backdrop-blur-none">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="font-mono text-xs md:text-base tracking-widest bg-black/20 md:bg-transparent px-3 py-1 md:p-0 rounded-full md:rounded-none backdrop-blur-sm md:backdrop-blur-none">
                        {project.category}
                      </span>
                    </div>
                    <div className="flex justify-between items-end overflow-hidden">
                      <h2 className="font-serif text-6xl md:text-9xl uppercase leading-none tracking-tighter md:translate-y-8 md:group-hover:translate-y-0 transition-transform duration-700 ease-out max-w-[70%] md:max-w-none">
                        {project.title}
                      </h2>
                      <div className="bg-white text-black p-4 md:p-6 rounded-full md:translate-y-24 md:group-hover:translate-y-0 transition-transform duration-700 ease-out md:delay-100 active:scale-90 shadow-none border border-stone-200">
                        <ArrowUpRight className="w-6 h-6 md:w-12 md:h-12" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          </div>
        </section>

        {/* ═══ PROCESS ═══ */}
        <section className="py-24 md:py-40 px-6 md:px-16 bg-[#f2f2ef]">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-5xl md:text-7xl font-serif uppercase tracking-tighter leading-[0.9] mb-16">How we<br/>work</h2>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
              {process.map((p, i) => (
                <div key={i} className="group">
                  <span className="font-mono text-5xl font-bold text-[#1a1a1a]/5 group-hover:text-[#1a1a1a]/10 transition-colors block mb-6">{p.num}</span>
                  <h3 className="font-mono text-sm tracking-widest uppercase mb-4">{p.title}</h3>
                  <p className="text-sm text-[#1a1a1a]/40 leading-relaxed">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ CLIENTS ═══ */}
        <section className="py-16 md:py-24 px-6 md:px-16 border-y border-[#1a1a1a]/10 bg-[#f2f2ef]">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
            <span className="font-mono text-xs tracking-widest uppercase text-[#1a1a1a]/30">Trusted by</span>
            <div className="flex flex-wrap justify-center gap-8 md:gap-12">
              {clients.map((name, i) => (
                <span key={i} className="font-serif text-xl md:text-2xl italic text-[#1a1a1a]/10 hover:text-[#1a1a1a]/30 transition-colors cursor-default">{name}</span>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ TEAM ═══ */}
        <section className="py-24 md:py-40 px-6 md:px-16 bg-[#f2f2ef]">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-4">
              <h2 className="text-5xl md:text-7xl font-serif uppercase tracking-tighter leading-[0.9]">The<br/>team</h2>
              <p className="font-mono text-xs tracking-widest uppercase text-[#1a1a1a]/30">4 Humans, 0 AIs</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
              {team.map((m, i) => (
                <div key={i} className="group">
                  <div className="aspect-[3/4] bg-[#111] rounded-2xl mb-4 relative overflow-hidden flex items-center justify-center">
                    <span className="text-5xl font-serif italic text-white/[0.04] select-none group-hover:text-white/[0.08] transition-colors">{m.initials}</span>
                  </div>
                  <h3 className="font-mono text-xs tracking-widest uppercase">{m.name}</h3>
                  <p className="font-mono text-xs tracking-widest uppercase text-[#1a1a1a]/30 mt-1">{m.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ ABOUT ═══ */}
        <section className="py-24 md:py-40 px-6 md:px-16 bg-[#111] text-[#f2f2ef]">
          <div className="max-w-4xl mx-auto">
            <p className="font-mono text-xs tracking-widest uppercase text-white/30 mb-8">About</p>
            <p className="text-2xl md:text-4xl font-serif italic leading-[1.5] text-white/60 mb-12">
              "We believe design is not decoration. It's a strategic tool that transforms businesses, shapes perception, and drives growth."
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { v: '120+', l: 'Projects delivered' },
                { v: '28', l: 'Countries reached' },
                { v: '7', l: 'Years in business' },
                { v: '98%', l: 'Client retention' },
              ].map((s, i) => (
                <div key={i}>
                  <span className="text-3xl md:text-4xl font-serif">{s.v}</span>
                  <p className="font-mono text-xs tracking-widest uppercase text-white/20 mt-2">{s.l}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ CONTACT + FOOTER ═══ */}
        <footer id="contact" className="bg-[#111] text-[#f2f2ef] flex flex-col justify-between p-6 md:p-12 z-20 relative rounded-t-[2rem]">
          <div className="w-full text-center py-24 md:py-32">
            <p className="font-mono text-xs tracking-widest uppercase text-white/30 mb-8">Got a project?</p>
            <h1 className="font-serif text-6xl md:text-9xl leading-none tracking-tighter uppercase whitespace-nowrap active:scale-[0.98] transition-transform">
              Let's Talk
            </h1>
            <a href="mailto:hello@agencia.studio" className="inline-block font-mono text-sm tracking-widest uppercase text-white/40 hover:text-white transition-colors mt-8 border-b border-white/20 pb-1">
              hello@agencia.studio
            </a>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-start font-mono text-sm tracking-widest uppercase gap-12 pt-12 md:pt-16 border-t border-white/10">
            <div className="space-y-4">
              <p className="text-white/50">Location</p>
              <p>Based in Seville, Spain</p>
              <p>Available Worldwide</p>
            </div>
            <div className="space-y-4">
              <p className="text-white/50">Socials</p>
              <a href="#" className="block active:scale-95 md:hover:opacity-70 transition-all origin-left">Instagram</a>
              <a href="#" className="block active:scale-95 md:hover:opacity-70 transition-all origin-left">Twitter</a>
              <a href="#" className="block active:scale-95 md:hover:opacity-70 transition-all origin-left">LinkedIn</a>
            </div>
            <div className="space-y-4">
              <p className="text-white/50">Contact</p>
              <p>+34 955 123 456</p>
              <p>hello@agencia.studio</p>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center font-mono text-xs md:text-sm tracking-widest uppercase gap-8 mt-12 pt-8 border-t border-white/5">
            <p className="text-white/20">© {new Date().getFullYear()} Agencia</p>
            <p className="text-white/20">Design + Development Studio</p>
          </div>
        </footer>
      </div>
    </DemoLayout>
  );
}