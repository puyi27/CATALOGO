'use client'

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';

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
      xTo(e.clientX);
      yTo(e.clientY);
    };
    
    window.addEventListener('mousemove', handleMouseMove);

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
              scrub: true,
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
    }, containerRef);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      images.forEach(img => {
        img.removeEventListener('mouseenter', onImgEnter);
        img.removeEventListener('mouseleave', onImgLeave);
      });
      links.forEach(link => {
        link.removeEventListener('mouseenter', onLinkEnter);
        link.removeEventListener('mouseleave', onLinkLeave);
      });
      ctx.revert();
    };
  }, []);

  const projects = [
    { id: 1, title: 'LUMINA', category: 'FASHION E-COMMERCE', img: 'https://loremflickr.com/1200/800/fashion?lock=10' },
    { id: 2, title: 'AETHER', category: 'BRAND IDENTITY', img: 'https://loremflickr.com/1200/800/architecture?lock=20' },
    { id: 3, title: 'SYNTHESIS', category: 'WEB3 PLATFORM', img: 'https://loremflickr.com/1200/800/abstract?lock=30' },
    { id: 4, title: 'NOVA', category: 'EDITORIAL DESIGN', img: 'https://loremflickr.com/1200/800/typography?lock=40' }
  ];

  return (
    <main className="bg-[#f2f2ef] text-[#1a1a1a] min-h-screen selection:bg-black selection:text-[#f2f2ef] cursor-none overflow-x-hidden" ref={containerRef}>
      
      <div 
        ref={cursorRef} 
        className="fixed top-0 left-0 w-4 h-4 bg-white rounded-full pointer-events-none z-50 flex items-center justify-center mix-blend-difference"
      />

      <nav className="fixed top-0 w-full p-6 md:p-8 flex justify-between items-center z-40 mix-blend-difference text-white pointer-events-none">
        <div className="pointer-events-auto">
          <Link href="/" className="flex items-center gap-2 font-mono text-xs md:text-sm uppercase tracking-widest hover:opacity-70 transition-opacity">
            <ArrowLeft size={16} />
            Catálogo
          </Link>
        </div>
        <div className="font-mono text-xs md:text-sm uppercase tracking-widest pointer-events-auto">
          Agencia Studio
        </div>
      </nav>

      <section className="h-screen flex flex-col justify-center p-6 md:p-12">
        <div className="max-w-7xl mx-auto w-full mt-24">
          <p className="font-mono text-xs md:text-sm max-w-sm mb-12 uppercase tracking-widest leading-relaxed">
            We craft digital experiences that transcend the ordinary. Independent design boutique based in Nowhere.
          </p>
          <h1 className="font-serif text-[15vw] md:text-[12vw] leading-[0.85] tracking-tighter w-full uppercase">
            DIGITAL<br />
            <span className="italic font-light ml-[10vw]">ARTISANS</span>
          </h1>
        </div>
      </section>

      <section className="projects-container relative z-10 w-full">
        {projects.map((project, i) => (
          <div key={project.id} className="project-card h-screen w-full relative will-change-transform">
            <div className="project-inner w-full h-full p-4 md:p-8 bg-[#f2f2ef] flex items-center justify-center will-change-transform">
              <div className="w-full h-full relative overflow-hidden rounded-[2rem] group hover-image">
                <img 
                  src={project.img} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-[1.5s] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-black/30 flex flex-col justify-between p-8 md:p-12 text-white">
                  <div className="flex justify-between items-start">
                    <span className="font-mono text-sm md:text-base tracking-widest">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="font-mono text-sm md:text-base tracking-widest">
                      {project.category}
                    </span>
                  </div>
                  <div className="flex justify-between items-end overflow-hidden">
                    <h2 className="font-serif text-5xl md:text-[8vw] uppercase leading-none tracking-tighter translate-y-8 group-hover:translate-y-0 transition-transform duration-700 ease-out">
                      {project.title}
                    </h2>
                    <div className="bg-white text-black p-4 md:p-6 rounded-full translate-y-24 group-hover:translate-y-0 transition-transform duration-700 ease-out delay-100">
                      <ArrowUpRight size={32} className="md:w-12 md:h-12" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>

      <footer className="h-screen bg-[#111] text-[#f2f2ef] flex flex-col justify-between p-6 md:p-12 z-20 relative">
        <div className="flex flex-col md:flex-row justify-between items-start font-mono text-sm tracking-widest uppercase gap-8 pt-24">
          <div className="space-y-2">
            <p className="text-white/50">Location</p>
            <p>Based in Nowhere</p>
            <p>Available Worldwide</p>
          </div>
          <div className="space-y-2">
            <p className="text-white/50">Socials</p>
            <a href="#" className="block hover:opacity-70 transition-opacity">Instagram</a>
            <a href="#" className="block hover:opacity-70 transition-opacity">Twitter</a>
            <a href="#" className="block hover:opacity-70 transition-opacity">LinkedIn</a>
          </div>
        </div>
        
        <div className="w-full text-center py-24">
          <h1 className="font-serif text-[18vw] leading-none tracking-tighter uppercase whitespace-nowrap">
            Let's Talk
          </h1>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-end md:items-center font-mono text-xs md:text-sm tracking-widest uppercase gap-4">
          <p className="text-white/50">© {new Date().getFullYear()} Agencia</p>
          <Link href="/" className="hover:text-white/70 transition-colors underline underline-offset-4 decoration-white/30">
            Back to Catalog
          </Link>
        </div>
      </footer>
    </main>
  );
}