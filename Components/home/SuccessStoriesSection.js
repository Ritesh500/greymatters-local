import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote, ChevronLeft, ChevronRight, MapPin, GraduationCap } from 'lucide-react';
import SectionHeading from '../common/SectionHeading.js';

const DEFAULT_STORIES = [
  { name: 'Priya Sharma', score: '8.5 Band', exam: 'IELTS Academic', destination: 'Canada', university: 'University of Toronto', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400', testimonial: 'Grey Matters transformed my IELTS preparation. The live classes, mock tests, and personalized feedback helped me achieve 8.5 bands in just 6 weeks. Now studying at UofT!' },
  { name: 'Rahul Patel', score: '85 Score', exam: 'PTE Academic', destination: 'Australia', university: 'University of Melbourne', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400', testimonial: 'The AI-powered practice tests at Grey Matters are incredible. I could track my progress daily and focus on my weak areas. Scored 85 on my first attempt!' },
  { name: 'Anjali Reddy', score: '7.5 Band', exam: 'IELTS General', destination: 'UK', university: 'London School of Economics', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400', testimonial: 'The trainers at Grey Matters are simply the best. Their strategies for writing and speaking made all the difference. Forever grateful!' },
  { name: 'Vikram Singh', score: 'PR Visa', exam: 'Express Entry', destination: 'Canada', university: 'Immigration', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400', testimonial: 'From IELTS preparation to PR visa filing, Grey Matters handled everything seamlessly. Got my Canada PR in just 8 months!' },
];

const DEFAULT_STATS = [
  { value: '7.0+', label: 'Avg IELTS Score' },
  { value: '75+', label: 'Avg PTE Score' },
  { value: '98%', label: 'Success Rate' },
  { value: '50K+', label: 'Visas Approved' },
];

export default function SuccessStoriesSection({ content }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const c = content || {};

  const eyebrow = c.eyebrow ?? 'Success Stories';
  const title = c.title ?? 'Real Students, Real Results';
  const description = c.description ?? 'Join the league of successful students who achieved their dreams with Grey Matters.';
  const stories = c.stories ?? DEFAULT_STORIES;
  const stats = c.stats ?? DEFAULT_STATS;

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % stories.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + stories.length) % stories.length);

  const current = stories[currentIndex] || stories[0];

  return (
    <section className="py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <SectionHeading eyebrow={eyebrow} title={title} description={description} light />

        <div className="relative">
          <div className="max-w-4xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-white/20"
              >
                <div className="grid md:grid-cols-3 gap-8 items-center">
                  <div className="md:col-span-1">
                    <div className="relative">
                      <div className="w-32 h-32 md:w-40 md:h-40 mx-auto rounded-2xl overflow-hidden border-4 border-white/20">
                        <img src={current.image} alt={current.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-1.5 rounded-full text-sm font-bold shadow-lg">
                        {current.score}
                      </div>
                    </div>
                  </div>

                  <div className="md:col-span-2 text-center md:text-left">
                    <Quote className="w-10 h-10 text-red-400 mb-4 mx-auto md:mx-0" />
                    <p className="text-lg md:text-xl text-white/90 leading-relaxed mb-6">
                      &ldquo;{current.testimonial}&rdquo;
                    </p>
                    <div className="space-y-2">
                      <h4 className="text-xl font-bold text-white">{current.name}</h4>
                      <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-white/70 text-sm">
                        <span className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-amber-400 fill-current" />
                          {current.exam}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {current.destination}
                        </span>
                        <span className="flex items-center gap-1">
                          <GraduationCap className="w-4 h-4" />
                          {current.university}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex items-center justify-center gap-4 mt-8">
              <button onClick={prevSlide} className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div className="flex gap-2">
                {stories.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${idx === currentIndex ? 'bg-red-500 w-8' : 'bg-white/30 hover:bg-white/50'}`}
                  />
                ))}
              </div>
              <button onClick={nextSlide} className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-3xl mx-auto">
            {stats.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-white/60">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
