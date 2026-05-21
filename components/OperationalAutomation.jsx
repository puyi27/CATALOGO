"use client";

import React, { useState, useRef, useEffect } from 'react';
import { LazyMotion, domAnimation, m } from 'framer-motion';

export default function OperationalAutomation() {
  const [clickCount, setClickCount] = useState(0);
  const [showCanvas, setShowCanvas] = useState(false);
  const canvasRef = useRef(null);

  const handleClick = () => {
    setClickCount(prev => {
      const newCount = prev + 1;
      if (newCount === 5) {
        setShowCanvas(true);
      }
      return newCount;
    });
  };

  useEffect(() => {
    if (showCanvas) {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      let particles = [];
      for(let i=0; i<150; i++){
        particles.push({
          x: canvas.width / 2,
          y: canvas.height / 2,
          vx: (Math.random() - 0.5) * 25,
          vy: (Math.random() - 0.5) * 25,
          life: 1,
          color: `hsl(${Math.random() * 360}, 100%, 60%)`
        });
      }

      let animationFrameId;

      const animate = () => {
        ctx.fillStyle = 'rgba(9, 9, 11, 0.2)';
        ctx.fillRect(0,0,canvas.width,canvas.height);
        
        particles.forEach((p, index) => {
          p.x += p.vx;
          p.y += p.vy;
          p.life -= 0.015;
          
          ctx.fillStyle = p.color;
          ctx.globalAlpha = Math.max(p.life, 0);
          ctx.beginPath();
          ctx.arc(p.x, p.y, Math.random() * 4 + 2, 0, Math.PI*2);
          ctx.fill();
          
          if (p.life <= 0) particles.splice(index, 1);
        });

        if(particles.length > 0) {
          animationFrameId = requestAnimationFrame(animate);
        } else {
          setShowCanvas(false);
          setClickCount(0);
        }
      }
      animate();

      return () => {
        if(animationFrameId) cancelAnimationFrame(animationFrameId);
      };
    }
  }, [showCanvas]);

  return (
    <LazyMotion features={domAnimation}>
      <section className="py-32 bg-zinc-950 text-white relative flex flex-col items-center justify-center overflow-hidden border-t border-zinc-900">
        {showCanvas && (
          <canvas ref={canvasRef} className="absolute inset-0 z-50 pointer-events-none mix-blend-screen" />
        )}
        
        <div className="text-center max-w-3xl z-10 relative">
          <h2 className="text-5xl md:text-6xl font-black mb-6 tracking-tighter">Automatización Operacional</h2>
          <p className="text-xl text-zinc-400 mb-16 font-light">
            Nuestra arquitectura Node.js procesa datos más rápido de lo que puedes reaccionar. 
            Haz click repetidamente en el núcleo de procesamiento para inyectar sobrecarga térmica (Easter Egg).
          </p>
          
          <div className="flex justify-center">
            <m.button 
              onClick={handleClick}
              whileTap={{ scale: 0.85 }}
              className="w-48 h-48 bg-zinc-900 border-2 border-zinc-700 rounded-full flex items-center justify-center text-zinc-500 shadow-[0_0_50px_rgba(255,255,255,0.02)] hover:border-white hover:text-white hover:shadow-[0_0_80px_rgba(255,255,255,0.1)] transition-all duration-300 relative group cursor-crosshair"
            >
              <div className={`absolute inset-2 border-t-2 border-b-2 border-zinc-800 rounded-full transition-transform duration-1000 ${clickCount > 0 ? 'animate-spin' : ''}`} style={{ animationDuration: `${Math.max(0.2, 2 - clickCount * 0.4)}s`}}></div>
              <div className={`absolute inset-6 border-l-2 border-r-2 border-zinc-700 rounded-full transition-transform duration-1000 ${clickCount > 0 ? 'animate-[spin_reverse_linear_infinite]' : ''}`} style={{ animationDuration: `${Math.max(0.3, 2.5 - clickCount * 0.5)}s`}}></div>
              
              <span className="font-mono text-lg font-bold z-10">
                {clickCount < 5 ? (clickCount === 0 ? "NÚCLEO" : `SOBRECARGA ${clickCount}`) : "EXPLOSIÓN"}
              </span>
            </m.button>
          </div>

          <div className="mt-12 h-8">
            {clickCount > 0 && clickCount < 5 && (
              <p className="text-sm font-mono text-red-500 animate-pulse">
                PELIGRO: TEMPERATURA AL {(clickCount/5)*100}%
              </p>
            )}
          </div>
        </div>
      </section>
    </LazyMotion>
  );
}