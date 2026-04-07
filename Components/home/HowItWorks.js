import React from 'react';
import { motion } from 'framer-motion';
import { UserPlus, BookOpen, Target, Trophy, ArrowRight } from 'lucide-react';
import SectionHeading from '../common/SectionHeading';
import Link from 'next/link';
import { createPageUrl } from '@/utils';

const STEP_ICONS = [UserPlus, BookOpen, Target, Trophy];

const DEFAULT_STEPS = [
  { step: '01', title: 'Book a Free Consultation', description: 'Speak with our expert counselors to understand your goals and get a personalized study plan.' },
  { step: '02', title: 'Enroll in Your Course', description: 'Choose from IELTS, PTE, or Spoken English programs with flexible batch timings.' },
  { step: '03', title: 'Learn & Practice', description: 'Attend live classes, access practice materials, take mock tests, and track your progress.' },
  { step: '04', title: 'Achieve Your Score', description: 'Get your target score with our proven methodology and expert guidance.' },
];

export default function HowItWorks({ content }) {
  const c = content || {};
  const eyebrow = c.eyebrow ?? 'How It Works';
  const title = c.title ?? 'Your Journey to Success';
  const description = c.description ?? 'A simple, proven 4-step process that has helped over 5 lakh students achieve their dreams.';
  const steps = c.steps ?? DEFAULT_STEPS;

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(220,38,38,0.03),transparent_50%)]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <SectionHeading eyebrow={eyebrow} title={title} description={description} />

        <div className="relative">
          <div className="absolute top-10 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-red-200 to-transparent hidden lg:block" />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => {
              const Icon = STEP_ICONS[index % STEP_ICONS.length];
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 }}
                  className="relative"
                >
                  <div className="text-center group">
                    <div className="relative inline-flex items-center justify-center mb-8">
                      <div className="w-20 h-20 bg-gradient-to-br from-red-50 to-red-100 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-red-100">
                        <Icon className="w-9 h-9 text-red-600" />
                      </div>
                      <span className="absolute -top-3 -right-3 w-8 h-8 bg-gradient-to-br from-red-600 to-red-700 text-white text-sm font-bold rounded-lg flex items-center justify-center shadow-lg">
                        {step.step}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">{step.title}</h3>
                    <p className="text-slate-600 leading-relaxed">{step.description}</p>
                  </div>

                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-10 -right-4 transform -translate-y-1/2">
                      <ArrowRight className="w-6 h-6 text-red-300" />
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <Link
            href={createPageUrl('BookConsultation') || '/'}
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold rounded-full shadow-lg shadow-red-500/25 hover:shadow-red-500/40 hover:from-red-700 hover:to-red-800 transition-all duration-300 group"
          >
            Start Your Journey Today
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
