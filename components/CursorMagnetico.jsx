"use client";

import React, { useEffect, useRef } from 'react';

export default function CursorMagnetico() {
  const cursorRef = useRef(null);
  const cursorDotRef = useRef(null);

  useEffect(() => {
    let mouseX = -100, mouseY = -100;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${mouseX - 16}px, ${mouseY - 16}px, 0)`;
      }
      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate3d(${mouseX - 3}px, ${mouseY - 3}px, 0)`;
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

  return (
    <>
      {/* Cursor ring - grande */}
      <div
        ref={cursorRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          border: '1.5px solid rgba(255,255,255,0.6)',
          pointerEvents: 'none',
          zIndex: 2147483647,
          transform: 'translate3d(-100px, -100px, 0)',
          transition: 'transform 0.12s ease-out',
          willChange: 'transform',
          mixBlendMode: 'difference',
        }}
      />
      {/* Cursor dot - pequeño */}
      <div
        ref={cursorDotRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '6px',
          height: '6px',
          borderRadius: '50%',
          backgroundColor: 'white',
          pointerEvents: 'none',
          zIndex: 2147483647,
          transform: 'translate3d(-100px, -100px, 0)',
          transition: 'transform 0.04s linear',
          willChange: 'transform',
        }}
      />
    </>
  );
}