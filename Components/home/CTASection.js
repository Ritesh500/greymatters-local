import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { createPageUrl } from '@/utils';
import { ArrowRight, Phone, MessageCircle, Calendar } from 'lucide-react';

export default function CTASection() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-100 rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-100 rounded-full blur-3xl opacity-50" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-8 md:p-16 overflow-hidden relative">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_45%,rgba(255,255,255,0.1)_45%,rgba(255,255,255,0.1)_55%,transparent_55%)] bg-[size:20px_20px]" />
          </div>

          <div className="relative grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="inline-block px-4 py-1.5 bg-red-500/20 text-red-300 text-sm font-medium rounded-full mb-6">
                Start Your Journey
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                Ready to Achieve Your <span className="text-red-400">Dream Score?</span>
              </h2>
              <p className="text-lg text-slate-300 leading-relaxed mb-8">
                Join 25 lakh+ students who have transformed their futures with Grey Matters. 
                Book your free consultation today and take the first step towards your global career.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <Link 
                  href={createPageUrl('BookConsultation') || '/'}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded-full hover:from-red-600 hover:to-red-700 transition-all duration-500 group shadow-2xl shadow-red-500/40 hover:shadow-red-500/60 transform hover:scale-105"
                >
                  <Calendar className="w-5 h-5" />
                  Book Free Consultation
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>

                <a 
                  href="tel:+919988892587"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 text-white font-semibold rounded-full border-2 border-white/30 hover:bg-white/20 hover:border-white/50 transition-all duration-500 backdrop-blur-sm transform hover:scale-105"
                >
                  <Phone className="w-5 h-5" />
                  Call Now
                </a>
              </div>
              
              {/* Trust Signal - ADDED MORE SPACING */}
              <p className="text-sm text-slate-300 flex items-center gap-2">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                Join 25 lakh+ students • Expert trainers • Real results
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className="grid grid-cols-2 gap-4"
            >
              {[
                { icon: '🎓', title: 'Free Demo Class', desc: 'Experience our teaching' },
                { icon: '📊', title: 'Free Assessment', desc: 'Know your current level' },
                { icon: '📋', title: 'Study Plan', desc: 'Personalized roadmap' },
                { icon: '💬', title: 'Expert Guidance', desc: 'Immigration counseling' }
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + idx * 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/15 hover:border-white/20 transition-all duration-500 cursor-pointer group transform hover:-translate-y-1"
                >
                  <span className="text-3xl mb-3 block group-hover:scale-110 transition-transform duration-300">
                    {item.icon}
                  </span>
                  <h4 className="font-semibold text-white mb-1">{item.title}</h4>
                  <p className="text-sm text-slate-400">{item.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}