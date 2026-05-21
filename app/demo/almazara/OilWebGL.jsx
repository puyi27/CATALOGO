"use client";
import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Sphere, Float, Environment } from '@react-three/drei';

function OilDrop({ position, scale, distort, speed }) {
  const meshRef = useRef();
  const scrollVelocity = useRef(0);
  const lastScroll = useRef(0);

  useEffect(() => {
    lastScroll.current = window.scrollY;
    const onScroll = () => {
      const current = window.scrollY;
      const vel = current - lastScroll.current;
      scrollVelocity.current = vel;
      lastScroll.current = current;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    
    // Lerp velocity down to 0 for smooth decay
    scrollVelocity.current += (0 - scrollVelocity.current) * 0.05;
    
    // Base rotation + scroll influence
    meshRef.current.rotation.x += delta * speed * 0.5 + (scrollVelocity.current * 0.001);
    meshRef.current.rotation.y += delta * speed * 0.3 + (scrollVelocity.current * 0.0005);
    
    // Distort material position based on scroll inertia
    const targetY = position[1] - (scrollVelocity.current * 0.015);
    meshRef.current.position.y += (targetY - meshRef.current.position.y) * 0.1;
    
    // Return gently to original Y
    meshRef.current.position.y += (position[1] - meshRef.current.position.y) * 0.05;
  });

  return (
    <Float speed={speed} rotationIntensity={1} floatIntensity={2}>
      <Sphere ref={meshRef} args={[1, 64, 64]} position={position} scale={scale}>
        <MeshDistortMaterial
          color="#d4af37" // Golden oil
          envMapIntensity={1}
          clearcoat={1}
          clearcoatRoughness={0.1}
          metalness={0.4}
          roughness={0.1}
          distort={distort}
          speed={speed * 2}
          transparent
          opacity={0.9}
        />
      </Sphere>
    </Float>
  );
}

export default function OilWebGL() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none opacity-50 mix-blend-screen">
      <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} color="#fffbee" />
        <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#4E6840" />
        
        <OilDrop position={[-4, 2, 0]} scale={1.5} distort={0.4} speed={2} />
        <OilDrop position={[3, -2, -2]} scale={2} distort={0.5} speed={1.5} />
        <OilDrop position={[0, -5, -4]} scale={3} distort={0.3} speed={1} />
        <OilDrop position={[-5, -4, -6]} scale={2.5} distort={0.6} speed={2.5} />
        <OilDrop position={[5, 4, -3]} scale={1.8} distort={0.4} speed={1.8} />
        
        <Environment preset="sunset" />
      </Canvas>
    </div>
  );
}
