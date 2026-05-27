"use client";

import React, { useEffect, useState } from 'react';
import { LazyMotion, domAnimation, m } from 'framer-motion';

export default function CursorMagnetico() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true);

  useEffect(() => {
    const checkTouch = window.matchMedia('(pointer: coarse)').matches;
    setIsTouchDevice(checkTouch);
    if (checkTouch) return;

    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    const handleMouseOver = (e) => {
      const target = e.target;
      const isInteractive = target.tagName.toLowerCase() === 'button' || 
                           target.tagName.toLowerCase() === 'a' || 
                           target.closest('button') || 
                           target.closest('a');
      setIsHovering(isInteractive);
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  if (isTouchDevice) return null;

  return (
    <LazyMotion features={domAnimation}>
      <m.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[9999] mix-blend-difference bg-white shadow-[0_0_15px_rgba(255,255,255,0.5)]"
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
          scale: isHovering ? 2.5 : 1,
        }}
        transition={{
          x: { type: "spring", stiffness: 800, damping: 40, mass: 0.5 },
          y: { type: "spring", stiffness: 800, damping: 40, mass: 0.5 },
          scale: { type: "spring", stiffness: 400, damping: 25, mass: 0.1 }
        }}
      />
    </LazyMotion>
  );
}