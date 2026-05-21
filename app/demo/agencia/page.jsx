'use client'

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AgenciaDemo() {
  const containerRef = useRef(null);
  const cursorRef = useRef(null);
  const carouselRef = useRef(null);

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
    { id: 1, title: 'LUMINA', category: 'FASHION E-COMMERCE', img: 'https://loremflickr.com/1200/800/fashion?lock=10' },
    { id: 2, title: 'AETHER', category: 'BRAND IDENTITY', img: 'https://loremflickr.com/1200/800/architecture?lock=20' },
    { id: 3, title: 'SYNTHESIS', category: 'WEB3 PLATFORM', img: 'https://loremflickr.com/1200/800/abstract?lock=30' },
    { id: 4, title: 'NOVA', category: 'EDITORIAL DESIGN', img: 'https://loremflickr.com/1200/800/typography?lock=40' }
  ];

  return (
    <main className="bg-[#f2f2ef] text-[#1a1a1a] min-h-screen selection:bg-black selection:text-[#f2f2ef] md:cursor-none overflow-x-hidden" ref={containerRef}>
      
      <div 
        ref={cursorRef} 
        className="hidden md:flex fixed top-0 left-0 w-4 h-4 bg-white rounded-full pointer-events-none z-50 items-center justify-center mix-blend-difference"
      />

      <nav className="fixed top-0 w-full p-6 md:p-8 flex justify-between items-center z-40 mix-blend-difference text-white pointer-events-none">
        <div className="pointer-events-auto">
          <Link href="/" className="flex items-center gap-2 font-mono text-xs md:text-sm uppercase tracking-widest active:scale-95 md:hover:opacity-70 transition-all origin-left">
            <ArrowLeft size={16} />
            Catálogo
          </Link>
        </div>
        <div className="font-mono text-xs md:text-sm uppercase tracking-widest pointer-events-auto">
          Agencia Studio
        </div>
      </nav>

      <section className="min-h-screen flex flex-col justify-center p-6 md:p-12 pt-32">
        <div className="max-w-7xl mx-auto w-full">
          <p className="font-mono text-xs md:text-sm max-w-sm mb-8 md:mb-12 uppercase tracking-widest leading-relaxed">
            We craft digital experiences that transcend the ordinary. Independent design boutique based in Nowhere.
          </p>
          <h1 className="font-serif text-[clamp(4rem,15vw,12rem)] leading-[0.85] tracking-tighter w-full uppercase">
            DIGITAL<br />
            <span className="italic font-light ml-[10vw]">ARTISANS</span>
          </h1>
        </div>
      </section>

      <div className="hidden md:block projects-container relative z-10 w-full">
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
                    <h2 className="font-serif text-[8vw] uppercase leading-none tracking-tighter translate-y-8 group-hover:translate-y-0 transition-transform duration-700 ease-out">
                      {project.title}
                    </h2>
                    <div className="bg-white text-black p-6 rounded-full translate-y-24 group-hover:translate-y-0 transition-transform duration-700 ease-out delay-100">
                      <ArrowUpRight className="w-12 h-12" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="block md:hidden overflow-hidden relative z-10 w-full pb-24" ref={carouselRef}>
        <motion.div 
          drag="x" 
          dragConstraints={carouselRef}
          className="flex gap-4 px-6 cursor-grab active:cursor-grabbing w-max"
        >
          {projects.map((project, i) => (
            <motion.div 
              key={project.id} 
              className="w-[85vw] h-[65vh] relative rounded-[2rem] overflow-hidden bg-black flex-shrink-0"
              whileTap={{ scale: 0.98 }}
            >
              <img 
                src={project.img} 
                alt={project.title} 
                className="absolute inset-0 w-full h-full object-cover opacity-80 pointer-events-none" 
              />
              <div className="absolute inset-0 flex flex-col justify-between p-6 text-white pointer-events-none">
                <div className="flex justify-between items-start">
                  <span className="font-mono text-sm tracking-widest bg-black/20 px-3 py-1 rounded-full backdrop-blur-sm">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="font-mono text-xs tracking-widest text-right bg-black/20 px-3 py-1 rounded-full backdrop-blur-sm">
                    {project.category}
                  </span>
                </div>
                <div className="flex justify-between items-end">
                  <h2 className="font-serif text-5xl uppercase leading-[0.9] tracking-tighter max-w-[70%]">
                    {project.title}
                  </h2>
                  <div className="bg-white text-black p-4 rounded-full pointer-events-auto active:scale-90 transition-transform shadow-lg">
                    <ArrowUpRight size={24} />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <footer className="min-h-screen bg-[#111] text-[#f2f2ef] flex flex-col justify-between p-6 md:p-12 z-20 relative rounded-t-[2rem] md:rounded-none mt-[-2rem] md:mt-0">
        <div className="flex flex-col md:flex-row justify-between items-start font-mono text-sm tracking-widest uppercase gap-12 pt-16 md:pt-24">
          <div className="space-y-4">
            <p className="text-white/50">Location</p>
            <p>Based in Nowhere</p>
            <p>Available Worldwide</p>
          </div>
          <div className="space-y-4">
            <p className="text-white/50">Socials</p>
            <a href="#" className="block active:scale-95 md:hover:opacity-70 transition-all origin-left">Instagram</a>
            <a href="#" className="block active:scale-95 md:hover:opacity-70 transition-all origin-left">Twitter</a>
            <a href="#" className="block active:scale-95 md:hover:opacity-70 transition-all origin-left">LinkedIn</a>
          </div>
        </div>
        
        <div className="w-full text-center py-24 md:py-32">
          <h1 className="font-serif text-[clamp(4rem,18vw,20rem)] leading-none tracking-tighter uppercase whitespace-nowrap active:scale-[0.98] transition-transform">
            Let's Talk
          </h1>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center font-mono text-xs md:text-sm tracking-widest uppercase gap-8">
          <p className="text-white/50">© {new Date().getFullYear()} Agencia</p>
          <Link href="/" className="active:scale-95 md:hover:text-white/70 transition-all underline underline-offset-4 decoration-white/30">
            Back to Catalog
          </Link>
        </div>
      </footer>
    </main>
  );
}