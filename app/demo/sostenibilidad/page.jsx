"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Bus, Clock3, Users, Megaphone, MapPin, ArrowRight, MessageSquareWarning, AlertCircle } from "lucide-react";
import DemoLayout from "@/components/DemoLayout";

gsap.registerPlugin(ScrollTrigger);

function CustomCursor() {
  const cursorRef = useRef(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      const xTo = gsap.quickTo(cursorRef.current, "x", { duration: 0.15, ease: "power2.out" });
      const yTo = gsap.quickTo(cursorRef.current, "y", { duration: 0.15, ease: "power2.out" });
      
      const move = (e) => {
        xTo(e.clientX);
        yTo(e.clientY);

        const target = e.target;
        const isInteractive = target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('a') || target.closest('button') || target.closest('.interactive-row');
        
        if (isInteractive) {
          gsap.to(cursorRef.current, { scale: 4, duration: 0.3, ease: "power2.out" });
        } else {
          gsap.to(cursorRef.current, { scale: 1, duration: 0.3, ease: "power2.out" });
        }
      };
      
      window.addEventListener("mousemove", move);
      return () => window.removeEventListener("mousemove", move);
    });
    return () => ctx.revert();
  }, []);

  return (
    <div 
      ref={cursorRef} 
      className="hidden md:block pointer-events-none fixed top-0 left-0 w-3 h-3 rounded-full bg-[#117C4E]/60 z-[10000] transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-100 ease-out"
    />
  );
}

export default function AlcalaSemeueveDemo() {
  const containerRef = useRef(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero Parallax
      gsap.to(".parallax-bg", {
        yPercent: 25,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero-section",
          start: "top top",
          end: "bottom top",
          scrub: 1.2,
        },
      });

      // Text Reveal Editorial
      const revealWrappers = gsap.utils.toArray(".reveal-wrapper");
      revealWrappers.forEach((wrapper) => {
        const text = wrapper.querySelector(".reveal-text");
        gsap.fromTo(text, 
          { y: "110%", rotation: 2 },
          {
            y: "0%",
            rotation: 0,
            ease: "expo.out",
            duration: 1.8,
            scrollTrigger: {
              trigger: wrapper,
              start: "top 90%",
              toggleActions: "play none none reverse",
            }
          }
        );
      });

      // Líneas de impacto
      const lines = gsap.utils.toArray(".impact-line");
      lines.forEach((line) => {
        gsap.fromTo(line,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: "power4.out",
            duration: 2,
            transformOrigin: "left center",
            scrollTrigger: {
              trigger: line,
              start: "top 85%",
            }
          }
        );
      });
      
      // Animación de tarjetas de reportes
      gsap.from(".report-card", {
        y: 50,
        opacity: 0,
        stagger: 0.2,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".reports-section",
          start: "top 80%",
        }
      });

      // Marquee infinito (Texto en movimiento)
      gsap.to(".marquee-inner", {
        xPercent: -50,
        ease: "none",
        duration: 15,
        repeat: -1,
      });

      // Animación de las filas de estado
      gsap.from(".status-row", {
        opacity: 0,
        x: -20,
        stagger: 0.15,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".status-section",
          start: "top 85%",
        }
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <DemoLayout title="" year="Alcalá se Mueve">
      <div ref={containerRef} className="bg-[#011B11] text-[#FBF5E9] font-sans selection:bg-[#117C4E] selection:text-white md:cursor-none overflow-x-hidden">
        <CustomCursor />

        {/* HERO SECTION */}
        <section className="hero-section relative w-full h-[100svh] flex flex-col items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0 overflow-hidden">
            <div 
              className="parallax-bg w-full h-[125%] bg-cover bg-center"
              style={{ backgroundImage: "url('/protesta/hero-autobus.jpg')" }}
            />
            <div className="absolute inset-0 bg-[#011B11]/70 mix-blend-multiply" />
          </div>
          
          <div className="relative z-10 text-center px-4 w-full max-w-7xl flex flex-col items-center">
            <div className="overflow-hidden mb-6">
              <span className="block text-[#117C4E] text-xs md:text-sm uppercase tracking-[0.4em] font-light">
                Plataforma Ciudadana
              </span>
            </div>
            
            <h1 className="text-7xl md:text-[10rem] font-serif text-[#FBF5E9] tracking-tighter leading-[0.85] w-full mix-blend-overlay">
              Dignidad en<br />el Transporte
            </h1>
          </div>

          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-[#FBF5E9]/70 flex flex-col items-center gap-4 z-10 opacity-70">
            <span className="text-[10px] uppercase tracking-[0.3em]">Nuestra Protesta</span>
            <div className="w-[1px] h-16 bg-[#FBF5E9]/10 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1/2 bg-[#117C4E] animate-bounce-slow" />
            </div>
          </div>
        </section>

        {/* MARQUEE SECTION (Nuevo) */}
        <div className="w-full bg-[#117C4E] text-[#011B11] py-4 border-y border-[#117C4E] overflow-hidden flex items-center">
          <div className="marquee-inner flex whitespace-nowrap min-w-[200%]">
            <span className="text-sm md:text-lg uppercase tracking-[0.3em] font-medium px-8">TRANSPORTE DIGNO YA • NO MÁS ESPERAS • ALCALÁ SE MUEVE •</span>
            <span className="text-sm md:text-lg uppercase tracking-[0.3em] font-medium px-8">TRANSPORTE DIGNO YA • NO MÁS ESPERAS • ALCALÁ SE MUEVE •</span>
            <span className="text-sm md:text-lg uppercase tracking-[0.3em] font-medium px-8">TRANSPORTE DIGNO YA • NO MÁS ESPERAS • ALCALÁ SE MUEVE •</span>
            <span className="text-sm md:text-lg uppercase tracking-[0.3em] font-medium px-8">TRANSPORTE DIGNO YA • NO MÁS ESPERAS • ALCALÁ SE MUEVE •</span>
          </div>
        </div>

        {/* MANIFESTO SECTION */}
        <section className="py-32 md:py-48 px-8 md:px-24 max-w-[100rem] mx-auto bg-[#FBF5E9] text-[#011B11]">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-24">
            <div className="md:col-span-4 flex flex-col gap-8 justify-start">
              <Megaphone strokeWidth={0.5} className="w-16 h-16 text-[#117C4E]" />
              <h2 className="text-4xl md:text-6xl font-serif leading-none tracking-tighter text-[#011B11]">
                Alcalá<br />se planta.
              </h2>
            </div>
            <div className="md:col-span-8 flex flex-col gap-12 md:gap-16 pt-4">
              <div className="reveal-wrapper overflow-hidden">
                <p className="reveal-text text-3xl md:text-5xl tracking-tighter leading-[1.2] font-serif text-[#011B11]">
                  Moverse por Alcalá no debería ser un privilegio, es un derecho. Exigimos un servicio de autobuses eficiente, puntual y digno para todos.
                </p>
              </div>
              <div className="reveal-wrapper overflow-hidden">
                <p className="reveal-text text-lg md:text-xl text-[#011B11]/70 font-light max-w-2xl leading-relaxed">
                  No somos solo cifras en una parada. Somos trabajadores, estudiantes y familias que pierden horas de vida esperando un transporte que no llega, llega saturado o simplemente nos ignora. Nuestra protesta exige frecuencias reales, cumplimiento de horarios y un servicio nocturno digno.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* LINE STATUS SECTION (Nueva) */}
        <section className="status-section py-20 px-8 md:px-24 w-full bg-[#011B11] text-[#FBF5E9] border-y border-[#117C4E]/20">
          <div className="max-w-[100rem] mx-auto flex flex-col md:flex-row gap-16">
            <div className="w-full md:w-1/3 flex flex-col justify-center">
               <div className="reveal-wrapper overflow-hidden mb-6">
                  <span className="reveal-text block text-xs uppercase tracking-[0.3em] font-medium text-[#117C4E]">
                    Reporte en Tiempo Real
                  </span>
               </div>
               <div className="reveal-wrapper overflow-hidden mb-8">
                  <h3 className="reveal-text text-4xl md:text-6xl tracking-tighter font-serif text-[#FBF5E9] leading-[1]">
                    Estado<br/>de la Red.
                  </h3>
               </div>
               <p className="text-[#FBF5E9]/60 font-light max-w-sm leading-relaxed mb-8">
                 Basado en los reportes de los usuarios en la última hora. Ayúdanos a mantener este panel actualizado.
               </p>
            </div>
            
            <div className="w-full md:w-2/3 flex flex-col">
              {/* Filas de estado de líneas */}
              {[
                { name: "M-121", route: "Alcalá - Sevilla (Centro)", status: "Colapsada", color: "bg-red-500", textAlert: "text-red-400" },
                { name: "M-122", route: "Alcalá - Sevilla (Directo)", status: "Retrasos (+25m)", color: "bg-orange-500", textAlert: "text-orange-400" },
                { name: "M-104", route: "Alcalá - Dos Hermanas", status: "Frecuencia Baja", color: "bg-orange-500", textAlert: "text-orange-400" },
                { name: "Urbanos", route: "Líneas A, B, C, D", status: "Fluido", color: "bg-[#117C4E]", textAlert: "text-[#117C4E]" },
              ].map((line, idx) => (
                <div key={idx} className="status-row interactive-row group flex items-center justify-between py-6 border-b border-[#FBF5E9]/10 hover:border-[#117C4E] transition-colors cursor-pointer">
                  <div className="flex items-center gap-6 md:gap-12 w-2/3">
                    <span className="text-2xl md:text-4xl font-serif text-[#FBF5E9] group-hover:text-[#117C4E] transition-colors min-w-[80px]">
                      {line.name}
                    </span>
                    <span className="text-sm md:text-base font-light text-[#FBF5E9]/60 truncate">
                      {line.route}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 justify-end w-1/3">
                    <span className={`text-xs md:text-sm uppercase tracking-[0.1em] ${line.textAlert} font-medium text-right hidden md:block`}>
                      {line.status}
                    </span>
                    <div className="relative flex h-3 w-3">
                      {line.status !== "Fluido" && (
                         <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${line.color} opacity-75`}></span>
                      )}
                      <span className={`relative inline-flex rounded-full h-3 w-3 ${line.color}`}></span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* IMAGE / PHILOSOPHY SPLIT */}
        <section className="py-32 md:py-48 w-full bg-[#FBF5E9]">
          <div className="flex flex-col md:flex-row w-full min-h-[80vh] px-8 md:px-0">
            <div className="w-full md:w-1/2 md:p-12 h-[60vh] md:h-auto mb-12 md:mb-0">
              <div className="w-full h-full relative overflow-hidden group rounded-2xl md:rounded-r-2xl md:rounded-l-none">
                <img 
                  src="/protesta/espera-parada.jpg" 
                  alt="Urbano Alcalá conceptual" 
                  className="w-full h-full object-cover grayscale transition-all duration-1000 ease-out md:group-hover:scale-105 md:group-hover:grayscale-0"
                />
              </div>
            </div>
            
            <div className="w-full md:w-1/2 flex flex-col justify-center py-10 md:py-0 md:px-24 relative z-10 text-[#011B11]">
               <div className="reveal-wrapper overflow-hidden mb-8">
                  <span className="reveal-text block text-xs uppercase tracking-[0.3em] font-medium text-[#117C4E]">
                    La Filosofía
                  </span>
               </div>
               <div className="reveal-wrapper overflow-hidden">
                  <h3 className="reveal-text text-5xl md:text-8xl tracking-tighter font-serif text-[#011B11] mb-10 leading-[0.9]">
                    Datos contra<br />el ruido.
                  </h3>
               </div>
               <div className="reveal-wrapper overflow-hidden">
                  <p className="reveal-text text-[#011B11]/70 text-lg font-light max-w-md leading-relaxed">
                    Las quejas individuales se pierden. Los datos agrupados generan cambios. Centralizamos la frustración diaria en un dashboard público imposible de ignorar por las administraciones.
                  </p>
               </div>
            </div>
          </div>
        </section>

        <ProtestMetricsSection />

        {/* LATEST REPORTS */}
        <section className="reports-section py-32 md:py-40 px-8 md:px-24 max-w-[100rem] mx-auto bg-[#FBF5E9] text-[#011B11]">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-24 md:mb-32">
            <div className="md:col-span-8">
              <div className="reveal-wrapper overflow-hidden mb-8">
                <span className="reveal-text block text-xs uppercase tracking-[0.3em] font-medium text-[#117C4E]">
                  Voces de la Parada
                </span>
              </div>
              <div className="reveal-wrapper overflow-hidden">
                <h2 className="reveal-text text-4xl md:text-7xl tracking-tighter font-serif text-[#011B11] leading-[0.9]">
                  Últimos Reportes<br />Ciudadanos.
                </h2>
              </div>
            </div>
            <div className="md:col-span-4 flex items-end justify-start md:justify-end">
              <button className="group flex items-center gap-4 text-[#117C4E] pb-2 border-b border-[#117C4E]/20 hover:border-[#117C4E] transition-colors">
                <span className="text-sm uppercase tracking-[0.2em]">Ver todos</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { line: "M-121", route: "Alcalá - Sevilla (Por P. Tecnológico)", grievance: "Retraso de 35 min. Bus lleno, gente de pie desde la primera parada. Nadie avisa.", time: "Hace 14 min." },
              { line: "Urbanos", route: "Circular Urbana (H. San Agustín)", grievance: "Frecuencia fantasma. Espera de 1h en parada. El panel electrónico sigue apagado.", time: "Hace 22 min." },
              { line: "M-120", route: "Alcalá - Dos Hermanas (Directo)", grievance: "Aire acondicionado averiado en hora punta. Calor insoportable y hacinamiento.", time: "Hace 1 hora." },
            ].map((report, index) => (
              <div key={index} className="report-card group bg-[#011B11] p-8 rounded-2xl flex flex-col gap-6 text-[#FBF5E9] border border-[#117C4E]/10 hover:border-[#117C4E]/40 transition-colors">
                <div className="flex justify-between items-start gap-4">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-[#117C4E]/20 rounded-full text-[#117C4E]">
                      <AlertCircle size={20} strokeWidth={1.5} />
                    </div>
                    <div>
                      <span className="block text-2xl font-serif tracking-tight">{report.line}</span>
                      <span className="block text-[10px] md:text-xs uppercase tracking-[0.1em] text-[#117C4E]">{report.route}</span>
                    </div>
                  </div>
                </div>
                <p className="text-base text-[#FBF5E9]/80 font-light flex-grow leading-relaxed">
                  "{report.grievance}"
                </p>
                <div className="flex justify-between items-end w-full">
                   <span className="text-xs uppercase tracking-[0.1em] text-[#FBF5E9]/40">{report.time}</span>
                   <span className="text-[10px] uppercase tracking-[0.3em] text-[#117C4E] font-medium opacity-0 group-hover:opacity-100 transition-opacity">Ver más</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* MASSIVE CTA */}
        <section className="relative py-40 md:py-64 px-8 text-[#FBF5E9] flex flex-col items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div 
              className="w-full h-full bg-cover bg-center"
              style={{ backgroundImage: "url('/protesta/protesta-dignidad.jpg')" }}
            />
            <div className="absolute inset-0 bg-[#011B11]/90 mix-blend-multiply" />
          </div>
          <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center w-full">
            <h2 className="text-5xl md:text-[8rem] tracking-tighter font-serif mb-16 leading-[0.9] text-[#FBF5E9]">
              Dales visibilidad.<br/>Únete a la queja.
            </h2>
            <button className="group relative flex items-center justify-center gap-6 pb-4 border-b border-[#117C4E]/30 hover:border-[#117C4E] transition-colors duration-500 w-fit">
              <span className="text-sm md:text-base uppercase tracking-[0.3em] font-light text-[#117C4E]">
                Reportar una incidencia
              </span>
              <ArrowRight className="w-5 h-5 text-[#117C4E] transition-transform duration-500 md:group-hover:translate-x-4" strokeWidth={1} />
            </button>
          </div>
        </section>
      </div>
    </DemoLayout>
  );
}

function ProtestMetricsSection() {
  const metrics = [
    { label: "Líneas con Frecuencia Insuficiente", value: "78%", icon: <Bus strokeWidth={1} size={28} /> },
    { label: "Quejas por Impuntualidad", value: "91%", icon: <Clock3 strokeWidth={1} size={28} /> },
    { label: "Reportes de Hacinamiento en Hora Punta", value: "88%", icon: <Users strokeWidth={1} size={28} /> },
    { label: "Barrios con Cobertura Deficiente", value: "65%", icon: <MapPin strokeWidth={1} size={28} /> },
  ];

  return (
    <section className="py-32 md:py-40 px-8 md:px-24 max-w-[100rem] mx-auto bg-[#FBF5E9] text-[#011B11] border-t border-[#011B11]/10">
      <div className="mb-24 md:mb-32">
        <h2 className="text-4xl md:text-7xl tracking-tighter font-serif text-[#011B11] mb-8 leading-[0.9]">
          La Ciudad en Datos.
        </h2>
        <p className="text-lg md:text-xl text-[#011B11]/70 font-light max-w-2xl leading-relaxed">
          Estas no son cifras oficiales; son la realidad reportada por los usuarios de Alcalá se Mueve en el último mes. La transparencia comienza aquí.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-24 gap-y-20">
        {metrics.map((metric, index) => (
          <div key={index} className="flex flex-col gap-6">
            <div className="flex justify-between items-end">
              <div className="flex items-center gap-6 text-[#117C4E]">
                {metric.icon}
                <span className="text-sm md:text-base uppercase tracking-[0.2em] font-light text-[#011B11]">
                  {metric.label}
                </span>
              </div>
              <span className="text-4xl md:text-5xl font-serif tracking-tighter text-[#011B11]">
                {metric.value}
              </span>
            </div>
            <div className="w-full h-[1px] bg-[#011B11]/10">
              <div 
                className="impact-line h-full bg-[#117C4E]"
                style={{ width: metric.value }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}