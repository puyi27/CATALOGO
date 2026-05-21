import "./globals.css";
// 1. Importamos la fuente optimizada de Next.js
import { Inter } from "next/font/google";

// 2. Configuramos la fuente
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata = {
  title: "Elite Showroom - Creative Architecture",
  description: "Un showroom inmersivo creado con React, Next.js, GSAP y R3F.",
  keywords: ["Desarrollo Web", "Showroom", "Experiencias Inmersivas", "Next.js 14"],
  authors: [{ name: "Tu Agencia" }],
};

import SmoothScroll from "@/components/SmoothScroll";
import Preloader from "@/components/Preloader";

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`dark ${inter.variable}`}>
      <body className="font-sans antialiased bg-black text-white min-h-screen">
        <Preloader />
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}