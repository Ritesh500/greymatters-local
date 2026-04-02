import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { createPageUrl } from '@/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, X } from 'lucide-react';

export default function MobileCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling 200px
      if (window.scrollY > 200 && !isDismissed) {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isDismissed]);

  const handleDismiss = () => {
    setIsDismissed(true);
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="lg:hidden fixed bottom-0 left-0 right-0 z-50 p-4 bg-gradient-to-r from-red-600 to-red-700 shadow-2xl"
        >
          <div className="flex items-center gap-3">
            <Link
              href={createPageUrl('BookConsultation') || '/'}
              className="flex-1 inline-flex items-center justify-center gap-2 py-3.5 bg-white text-red-600 font-bold rounded-xl shadow-lg hover:scale-105 transition-transform duration-300 active:scale-95"
            >
              <Calendar className="w-5 h-5" />
              Book Free Consultation
            </Link>

            <button
              onClick={handleDismiss}
              className="p-2 bg-white/20 rounded-lg text-white hover:bg-white/30 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <p className="text-center text-xs text-white/90 mt-2">
            Trusted since 1997 • 50,000+ success stories
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
