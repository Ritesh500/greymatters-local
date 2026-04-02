import React from 'react';
import Navbar from '@/Components/layout/Navbar';
import Footer from '@/Components/layout/Footer';
import MobileCTA from '@/Components/common/MobileCTA';
import ConversionPopup from '@/Components/common/ConversionPopup';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <style>{`
        :root {
          --color-primary: #dc2626;
          --color-primary-dark: #b91c1c;
        }
        
        html {
          scroll-behavior: smooth;
        }
        
        body {
          font-family: 'Inter', system-ui, -apple-system, sans-serif;
          -webkit-font-smoothing: antialiased;
          -webkit-tap-highlight-color: transparent;
          background: linear-gradient(to bottom, #fafafa 0%, #ffffff 40%, #fafafa 100%);
          min-height: 100vh;
        }
        
        /* Subtle noise texture for premium feel */
        body::before {
          content: '';
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          opacity: 0.03;
          z-index: -1;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
          pointer-events: none;
        }
        
        /* Subtle grid pattern */
        body::after {
          content: '';
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          opacity: 0.4;
          z-index: -1;
          background-image: linear-gradient(to right, #e5e7eb 1px, transparent 1px),
                            linear-gradient(to bottom, #e5e7eb 1px, transparent 1px);
          background-size: 64px 64px;
          mask-image: radial-gradient(ellipse 80% 60% at 50% 0%, #000 40%, transparent 100%);
          pointer-events: none;
        }
        
        ::selection {
          background-color: rgba(220, 38, 38, 0.2);
          color: #1e293b;
        }
        
        /* Smooth scroll animations */
        * {
          scroll-behavior: smooth;
        }
        
        /* Enhanced focus states for accessibility */
        *:focus-visible {
          outline: 2px solid #dc2626;
          outline-offset: 2px;
        }
        
        /* Premium button animations */
        @keyframes buttonGlow {
          0%, 100% { box-shadow: 0 10px 40px -15px rgba(220, 38, 38, 0.4); }
          50% { box-shadow: 0 10px 50px -10px rgba(220, 38, 38, 0.6); }
        }
      `}</style>
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
      <MobileCTA />
      <ConversionPopup />
    </div>
  );
}