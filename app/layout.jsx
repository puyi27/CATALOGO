import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata = {
  title: "Catálogo — Agencia de Arquitectura Digital",
  description: "Mitad científicos, mitad artistas. Showroom de prototipos WaaS para pymes industriales y tradicionales de Alcalá de Guadaíra. Next.js, Node.js, IA.",
  keywords: ["Desarrollo Web", "Alcalá de Guadaíra", "Pymes Industriales", "Node.js", "Next.js", "WaaS"],
  authors: [{ name: "Agencia" }],
};

import SmoothScroll from "@/components/SmoothScroll";
import Preloader from "@/components/Preloader";
import CursorMagnetico from "@/components/CursorMagnetico";

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`dark ${inter.variable}`}>
      <body className="font-sans antialiased bg-black text-white min-h-screen">
        <CursorMagnetico />
        <Preloader />
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
