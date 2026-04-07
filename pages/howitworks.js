import React from 'react';
import { motion } from 'framer-motion';
import { createPageUrl } from '@/utils';
import {
  UserPlus, BookOpen, Target, Trophy, ArrowRight,
  Play, CheckCircle, MessageCircle, Clock, Laptop,
  FileText, Award, Users
} from 'lucide-react';
import SectionHeading from '@/Components/common/SectionHeading';
import CTASection from '@/Components/home/CTASection';
import { getContent } from '@/lib/content';

const STEP_ICONS = [UserPlus, BookOpen, Laptop, Target, Trophy];
const FEATURE_ICONS = [Play, MessageCircle, FileText, Award, Clock, Users];

export async function getServerSideProps() {
  const content = getContent('howitworks');
  return { props: { content } };
}

export default function HowItWorks({ content }) {
  const c = content || {};
  const hero = c.hero || {};
  const steps = c.steps || [];
  const features = c.features || [];
  const guarantee = c.guarantee || {};
  const faqs = c.faqs || [];

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-red-100 rounded-full blur-3xl opacity-40" />
          <div className="absolute bottom-0 -left-40 w-80 h-80 bg-blue-100 rounded-full blur-3xl opacity-30" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-3xl mx-auto">
            <span className="inline-block px-4 py-1.5 bg-red-100 text-red-700 text-sm font-semibold rounded-full mb-6">
              {hero.badge ?? 'Simple & Proven Process'}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight">
              {hero.heading ?? 'How Grey Matters'} <span className="text-red-600">{hero.headingHighlight ?? 'Works'}</span>
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed">{hero.description}</p>
          </motion.div>
        </div>
      </section>

      {/* Main Steps */}
      {steps.length > 0 && (
        <section className="py-24 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-0">
              {steps.map((step, index) => {
                const Icon = STEP_ICONS[index % STEP_ICONS.length];
                const details = Array.isArray(step.details) ? step.details : [];
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="relative"
                  >
                    {index < steps.length - 1 && (
                      <div className="absolute left-10 top-24 w-0.5 h-full bg-gradient-to-b from-red-500 to-red-200 hidden md:block" />
                    )}
                    <div className="flex gap-8 pb-16">
                      <div className="hidden md:flex flex-col items-center">
                        <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-red-500/30">
                          {step.step}
                        </div>
                      </div>
                      <div className="flex-1 bg-slate-50 rounded-2xl p-8 hover:shadow-lg transition-shadow">
                        <div className="flex items-start gap-4 mb-4">
                          <div className="md:hidden w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center text-white font-bold">
                            {step.step}
                          </div>
                          <div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-2">{step.title}</h3>
                            <p className="text-slate-600 leading-relaxed">{step.description}</p>
                          </div>
                        </div>
                        {details.length > 0 && (
                          <div className="grid sm:grid-cols-2 gap-3 mt-6">
                            {details.map((detail, idx) => (
                              <div key={idx} className="flex items-center gap-2 text-slate-700">
                                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                                <span>{detail}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Features Grid */}
      {features.length > 0 && (
        <section className="py-24 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading eyebrow="What You Get" title="Everything You Need to Succeed" description="Our comprehensive learning ecosystem is designed to maximize your potential." />
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => {
                const Icon = FEATURE_ICONS[index % FEATURE_ICONS.length];
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow"
                  >
                    <div className="w-14 h-14 bg-red-100 rounded-xl flex items-center justify-center mb-6">
                      <Icon className="w-7 h-7 text-red-600" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                    <p className="text-slate-600">{feature.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Guarantee */}
      {guarantee.title && (
        <section className="py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                <span className="inline-block px-4 py-1.5 bg-amber-500/20 text-amber-300 text-sm font-semibold rounded-full mb-6">
                  {guarantee.badge ?? 'Our Promise'}
                </span>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">{guarantee.title}</h2>
                <p className="text-lg text-slate-300 mb-8 leading-relaxed">{guarantee.description}</p>
                <div className="space-y-4">
                  {(guarantee.conditions || []).map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <span className="text-slate-300">{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="grid grid-cols-2 gap-4">
                {(guarantee.stats || []).map((stat, idx) => (
                  <div key={idx} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/10">
                    <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                    <div className="text-sm text-slate-400">{stat.label}</div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* FAQs */}
      {faqs.length > 0 && (
        <section className="py-24 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading eyebrow="FAQs" title="Common Questions" />
            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-slate-50 rounded-xl p-6"
                >
                  <h4 className="font-bold text-slate-900 mb-2">{faq.q}</h4>
                  <p className="text-slate-600">{faq.a}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTASection />
    </div>
  );
}
