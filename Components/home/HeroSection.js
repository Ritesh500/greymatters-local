import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Globe, Award } from 'lucide-react';
import Link from 'next/link';
import { createPageUrl } from '@/utils';
import AnimatedCounter from '../common/AnimatedCounter';

export default function HeroSection() {
  const stats = [
    { value: 29, suffix: '+', label: 'Years of Excellence' },
    { value: 2500000, suffix: '+', label: 'Students Trained' },
    { value: 50000, suffix: '+', label: 'Successful Visas' },
    { value: 98, suffix: '%', label: 'Success Rate' }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } }
  };

  return (
    <section className="relative overflow-x-hidden bg-gradient-to-br from-white via-slate-50 to-white">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-red-100 rounded-full blur-3xl opacity-30" />
        <div className="absolute top-1/2 -left-40 w-[400px] h-[400px] bg-blue-50 rounded-full blur-3xl opacity-20" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:64px_64px] opacity-40" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid lg:grid-cols-2 gap-12 items-center"
        >
          {/* LEFT */}
          <div className="space-y-8">
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-3 px-5 py-2 bg-white rounded-full shadow border"
            >
              <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm font-semibold text-slate-700">
                Trusted Since 1997 • 2.5 Lakh+ Success Stories
              </span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-slate-900 leading-tight"
            >
              Your Global Future,
              <span className="block text-red-600">Proven Worldwide</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-lg sm:text-xl text-slate-600 max-w-xl"
            >
              Master IELTS, PTE & Immigration with expert guidance.
              <span className="font-medium text-slate-700">
                {' '}Live online classes, proven results,
              </span>{' '}
              and complete visa support trusted by millions worldwide.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
              <Link
                href={createPageUrl('Courses') || '/'}
                className="px-8 py-4 bg-red-600 text-white font-bold rounded-full hover:bg-red-700 transition shadow-lg shadow-red-200"
              >
                Start Online Prep
              </Link>
              <Link
                href={createPageUrl('BookConsultation') || '/'}
                className="px-8 py-4 border-2 border-slate-900 font-bold rounded-full hover:bg-slate-900 hover:text-white transition"
              >
                Book Free Consultation
              </Link>
            </motion.div>

            {/* ✅ FIXED FEATURES — SINGLE LINE */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center gap-x-8 gap-y-4 pt-4"
            >
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span>Live Online Classes</span>
              </div>

              <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                <Globe className="w-5 h-5 text-blue-600" />
                <span>Global Recognition</span>
              </div>

              <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                <Award className="w-5 h-5 text-amber-600" />
                <span>Authorized Education & Immigration Institution</span>
              </div>
            </motion.div>
          </div>

          {/* RIGHT – STATS */}
          <motion.div variants={itemVariants}>
            <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 p-8 sm:p-12 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-full -mr-16 -mt-16" />

              <div className="grid grid-cols-2 gap-x-4 gap-y-12 relative z-10">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900">
                      <AnimatedCounter
                        end={stat.value}
                        suffix={stat.suffix}
                        duration={2}
                      />
                    </div>
                    <p className="mt-2 text-xs sm:text-sm font-bold text-slate-500 uppercase tracking-wider">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
