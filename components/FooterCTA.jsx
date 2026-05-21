"use client";
import React from 'react';
import Link from 'next/link';

export default function FooterCTA({ accentColor = "#ffffff" }) {
  return (
    <section className="py-24 border-t border-white/10 bg-[#0a0a0a] flex flex-col items-center justify-center cursor-none relative z-10">
      <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-8 text-center text-white">
        ¿PREPARADO PARA <br/> LA EXCELENCIA?
      </h3>
      <Link href="/contacto" className="group relative px-12 py-6 border border-white/20 font-mono tracking-widest uppercase overflow-hidden cursor-none">
        <span className="relative z-10 transition-colors group-hover:text-black">
          Solicitar Cotización RAG B2B vía WhatsApp
        </span>
        <div 
          className="absolute inset-0 z-0 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-in-out"
          style={{ backgroundColor: accentColor }}
        />
      </Link>
    </section>
  );
}
