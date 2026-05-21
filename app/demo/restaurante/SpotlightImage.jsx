"use client";

import React, { useEffect } from 'react';
import { LazyMotion, domAnimation, m, useMotionValue, useMotionTemplate } from 'framer-motion';

export default function SpotlightImage({ src }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const maskImage = useMotionTemplate`radial-gradient(circle 350px at ${mouseX}px ${mouseY}px, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)`;

  return (
    <LazyMotion features={domAnimation}>
      <div className="fixed inset-0 pointer-events-none z-0 bg-[#050505]">
        <m.div
          className="absolute inset-0 bg-cover bg-center grayscale opacity-70"
          style={{
            backgroundImage: `url('${src}')`,
            WebkitMaskImage: maskImage,
            maskImage: maskImage,
          }}
        />
        <div 
          className="absolute inset-0 opacity-[0.03] mix-blend-screen pointer-events-none" 
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
        />
      </div>
    </LazyMotion>
  );
}