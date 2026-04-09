import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote, MapPin, GraduationCap } from 'lucide-react';
import SectionHeading from '@/Components/common/SectionHeading';
import CTASection from '@/Components/home/CTASection';
import AnimatedCounter from '@/Components/common/AnimatedCounter';
import { getContent } from '@/lib/content';

export async function getServerSideProps() {
  const content = getContent('successstories');
  return { props: { content } };
}

export default function SuccessStories({ content }) {
  const c = content || {};
  const hero = c.hero || {};
  const stats = c.stats || [];
  const stories = c.stories || [];
  const scoreHighlights = c.scoreHighlights || [];

  const [filter, setFilter] = useState('all');
  const filteredStories = filter === 'all' ? stories : stories.filter(s => s.exam === filter);

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-3xl mx-auto">
            <span className="inline-block px-4 py-1.5 bg-amber-500/20 text-amber-300 text-sm font-semibold rounded-full mb-6">
              {hero.badge ?? 'Real Students, Real Results'}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              {hero.heading ?? 'Success Stories That'} <span className="text-amber-400">{hero.headingHighlight ?? 'Inspire'}</span>
            </h1>
            <p className="text-xl text-slate-300 leading-relaxed">{hero.description}</p>
          </motion.div>

          {stats.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-4xl mx-auto">
              {stats.map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + idx * 0.1 }}
                  className="text-center bg-white/10 rounded-xl p-6 backdrop-blur-sm"
                >
                  <div className="text-3xl md:text-4xl font-bold text-white mb-1">
                    <AnimatedCounter end={Number(stat.value)} suffix={stat.suffix} />
                  </div>
                  <div className="text-sm text-slate-400">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Filters */}
      <section className="py-5 bg-white border-b sticky top-20 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2">
            {[
              { value: 'all', label: 'All Stories' },
              { value: 'ielts', label: 'IELTS' },
              { value: 'pte', label: 'PTE' },
              { value: 'visa', label: 'Immigration' },
            ].map(tab => (
              <button
                key={tab.value}
                onClick={() => setFilter(tab.value)}
                className={`px-5 py-1.5 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
                  filter === tab.value
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Stories Grid */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredStories.map((story, index) => (
                <motion.div
                  key={story.id || index}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className="p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                        <img src={story.image} alt={story.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900">{story.name}</h3>
                        <div className="flex items-center gap-2 text-sm text-slate-500 mt-1">
                          <MapPin className="w-3 h-3" />{story.destination}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-500">
                          <GraduationCap className="w-3 h-3" />{story.university}
                        </div>
                      </div>
                    </div>
                    <div className="inline-block px-3 py-1 bg-gradient-to-r from-red-500 to-red-600 text-white text-sm font-bold rounded-full mb-4">
                      {story.score}
                    </div>
                    <Quote className="w-8 h-8 text-red-200 mb-2" />
                    <p className="text-slate-600 leading-relaxed text-sm">&ldquo;{story.testimonial}&rdquo;</p>
                    <div className="flex items-center gap-1 mt-4">
                      {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 text-amber-400 fill-current" />)}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Score Highlights */}
      {scoreHighlights.length > 0 && (
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading eyebrow="Score Highlights" title="Exceptional Results, Every Year" />
            <div className="grid md:grid-cols-3 gap-8">
              {scoreHighlights.map((category, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-slate-50 rounded-2xl p-8"
                >
                  <h3 className="text-xl font-bold text-slate-900 mb-6">{category.title}</h3>
                  <div className="space-y-4">
                    {(category.scores || []).map((item, i) => (
                      <div key={i} className="flex items-center justify-between">
                        <span className="text-slate-600">{item.score}</span>
                        <span className="font-bold text-red-600">{item.count}</span>
                      </div>
                    ))}
                  </div>
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
