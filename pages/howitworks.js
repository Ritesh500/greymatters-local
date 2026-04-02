import React from 'react';
import { motion } from 'framer-motion';
import { createPageUrl } from '@/utils';
import { 
  UserPlus, BookOpen, Target, Trophy, ArrowRight,
  Play, CheckCircle, MessageCircle, Clock, Laptop,
  FileText, Award, Users, Star
} from 'lucide-react';
import SectionHeading from '@/Components/common/SectionHeading';
import CTASection from '@/Components/home/CTASection';

export default function HowItWorks() {
  const mainSteps = [
    {
      step: '01',
      icon: UserPlus,
      title: 'Book a Free Consultation',
      description: 'Schedule a one-on-one session with our expert counselors. We\'ll understand your goals, assess your current level, and recommend the perfect program for you.',
      details: [
        'Free 30-minute session',
        'Skill assessment test',
        'Personalized study plan',
        'Course recommendations'
      ]
    },
    {
      step: '02',
      icon: BookOpen,
      title: 'Enroll & Get Started',
      description: 'Choose your preferred batch timing and enroll in the program. Get instant access to our learning portal with all study materials.',
      details: [
        'Multiple batch timings',
        'Instant portal access',
        'Complete study materials',
        'Mobile app access'
      ]
    },
    {
      step: '03',
      icon: Laptop,
      title: 'Learn with Experts',
      description: 'Attend live interactive classes with certified trainers. Practice with unlimited mock tests and get personalized feedback on every assignment.',
      details: [
        'Live interactive classes',
        'Unlimited mock tests',
        'Writing evaluations',
        'Speaking practice'
      ]
    },
    {
      step: '04',
      icon: Target,
      title: 'Track Your Progress',
      description: 'Monitor your improvement with detailed analytics. Get AI-powered insights and recommendations to focus on weak areas.',
      details: [
        'Real-time analytics',
        'Performance reports',
        'AI recommendations',
        'Doubt resolution'
      ]
    },
    {
      step: '05',
      icon: Trophy,
      title: 'Achieve Your Score',
      description: 'Take the exam with confidence and achieve your target score. Our students consistently outperform with an average improvement of 2+ bands.',
      details: [
        'Target score guarantee',
        'Free retake option',
        'Visa assistance',
        'Career guidance'
      ]
    }
  ];

  const features = [
    {
      icon: Play,
      title: 'Live Interactive Classes',
      description: 'Not pre-recorded videos. Real-time interaction with expert trainers.'
    },
    {
      icon: MessageCircle,
      title: 'Doubt Resolution',
      description: '24/7 support via chat, email, and scheduled doubt-clearing sessions.'
    },
    {
      icon: FileText,
      title: 'Comprehensive Materials',
      description: 'Curated study materials, practice questions, and exam strategies.'
    },
    {
      icon: Award,
      title: 'Certified Trainers',
      description: 'British Council and Pearson certified trainers with 10+ years experience.'
    },
    {
      icon: Clock,
      title: 'Flexible Scheduling',
      description: 'Morning, evening, and weekend batches to suit your schedule.'
    },
    {
      icon: Users,
      title: 'Small Batch Size',
      description: 'Maximum 15 students per batch for personalized attention.'
    }
  ];

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-red-100 rounded-full blur-3xl opacity-40" />
          <div className="absolute bottom-0 -left-40 w-80 h-80 bg-blue-100 rounded-full blur-3xl opacity-30" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="inline-block px-4 py-1.5 bg-red-100 text-red-700 text-sm font-semibold rounded-full mb-6">
              Simple & Proven Process
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight">
              How Grey Matters <span className="text-red-600">Works</span>
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed">
              A simple, proven 5-step journey that has helped over 5 lakh students 
              achieve their dreams. From consultation to celebration—we're with you every step.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Steps */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-0">
            {mainSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                {/* Connector Line */}
                {index < mainSteps.length - 1 && (
                  <div className="absolute left-10 top-24 w-0.5 h-full bg-gradient-to-b from-red-500 to-red-200 hidden md:block" />
                )}
                
                <div className="flex gap-8 pb-16">
                  {/* Step Number */}
                  <div className="hidden md:flex flex-col items-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-red-500/30">
                      {step.step}
                    </div>
                  </div>

                  {/* Content */}
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

                    <div className="grid sm:grid-cols-2 gap-3 mt-6">
                      {step.details.map((detail, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-slate-700">
                          <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                          <span>{detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading 
            eyebrow="What You Get"
            title="Everything You Need to Succeed"
            description="Our comprehensive learning ecosystem is designed to maximize your potential."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow"
              >
                <div className="w-14 h-14 bg-red-100 rounded-xl flex items-center justify-center mb-6">
                  <feature.icon className="w-7 h-7 text-red-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-slate-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Score Guarantee */}
      <section className="py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-block px-4 py-1.5 bg-amber-500/20 text-amber-300 text-sm font-semibold rounded-full mb-6">
                Our Promise
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Score Guarantee Program
              </h2>
              <p className="text-lg text-slate-300 mb-8 leading-relaxed">
                We're so confident in our training methodology that we offer a score guarantee. 
                If you don't achieve your target score, you can retake the course absolutely free.
              </p>

              <div className="space-y-4">
                {[
                  'Attend 90% of classes',
                  'Complete all assignments',
                  'Take all mock tests',
                  'Follow study plan'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span className="text-slate-300">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              {[
                { value: '7+', label: 'IELTS Band Guarantee' },
                { value: '79+', label: 'PTE Score Guarantee' },
                { value: '100%', label: 'Refund if Conditions Met' },
                { value: '98%', label: 'Students Achieve Target' }
              ].map((stat, idx) => (
                <div 
                  key={idx}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/10"
                >
                  <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                  <div className="text-sm text-slate-400">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Preview */}
      <section className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading 
            eyebrow="FAQs"
            title="Common Questions"
          />

          <div className="space-y-4">
            {[
              {
                q: 'How long does it take to complete the course?',
                a: 'Our IELTS course is 6-8 weeks, PTE is 4-6 weeks, and Spoken English is 8-12 weeks. However, you can extend access if needed.'
              },
              {
                q: 'Are the classes live or recorded?',
                a: 'All our classes are 100% live and interactive. However, recordings are made available for revision purposes.'
              },
              {
                q: 'What if I miss a class?',
                a: 'You can access the recording of missed classes. We also offer make-up classes for important sessions.'
              },
              {
                q: 'Do you provide study materials?',
                a: 'Yes, comprehensive study materials, practice tests, and resources are included in all our courses at no extra cost.'
              }
            ].map((faq, idx) => (
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

      <CTASection />
    </div>
  );
}