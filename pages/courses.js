import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { createPageUrl } from '@/utils';
import {
  BookOpen, Mic, Plane, Clock, Users, Star,
  CheckCircle, ArrowRight, Play, Award, Zap, ChevronDown, GitCompare
} from 'lucide-react';
import SectionHeading from '@/Components/common/SectionHeading';
import CTASection from '@/Components/home/CTASection';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/Components/ui/tabs';
import CourseCurriculum from '@/Components/courses/CourseCurriculum';
import CourseCompare from '@/Components/courses/CourseCompare';
import VideoPreview from '@/Components/courses/VideoPreview';
import CourseRecommendation from '@/Components/courses/CourseRecommendation';
import { Button } from '@/Components/ui/button';
import { getContent } from '@/lib/content';

const ICON_MAP = { ielts: BookOpen, pte: Mic, spoken_english: Mic, immigration: Plane };

export async function getServerSideProps() {
  const content = getContent('courses');
  return { props: { content } };
}

export default function Courses({ content }) {
  const c = content || {};
  const hero = c.hero || {};
  const whyUs = c.whyUs || {};
  const courses = c.courses || [];

  const [activeTab, setActiveTab] = useState('all');
  const [showCompare, setShowCompare] = useState(false);
  const [expandedCourse, setExpandedCourse] = useState(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const categoryParam = urlParams.get('category');
    if (categoryParam) setActiveTab(categoryParam);
  }, []);

  const filteredCourses = activeTab === 'all' ? courses : courses.filter(c => c.category === activeTab);

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-3xl mx-auto">
            <span className="inline-block px-4 py-1.5 bg-red-500/20 text-red-300 text-sm font-semibold rounded-full mb-6">
              {hero.badge ?? 'Expert-Led Programs'}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              {hero.heading ?? 'Online Courses Designed for'} <span className="text-red-400">{hero.headingHighlight ?? 'Success'}</span>
            </h1>
            <p className="text-xl text-slate-300 leading-relaxed">
              {hero.description ?? 'Join 5 lakh+ students who achieved their dream scores with our proven methodology and expert trainers.'}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-white/80 backdrop-blur-xl border-b border-slate-200/50 sticky top-20 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="bg-slate-100 p-1 rounded-full">
                <TabsTrigger value="all" className="rounded-full px-6">All Courses</TabsTrigger>
                <TabsTrigger value="ielts" className="rounded-full px-6">IELTS</TabsTrigger>
                <TabsTrigger value="pte" className="rounded-full px-6">PTE</TabsTrigger>
                <TabsTrigger value="spoken_english" className="rounded-full px-6">Spoken English</TabsTrigger>
              </TabsList>
            </Tabs>
            <Button onClick={() => setShowCompare(true)} variant="outline" className="hidden md:flex items-center gap-2 rounded-full border-2 hover:border-slate-900">
              <GitCompare className="w-4 h-4" />
              Compare Courses
            </Button>
          </div>
        </div>
      </section>

      {/* Courses */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {filteredCourses.map((course, index) => {
              const Icon = ICON_MAP[course.category] || BookOpen;
              const features = Array.isArray(course.features) ? course.features : [];
              return (
                <motion.div
                  key={course.id || index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-3xl overflow-hidden shadow-xl"
                >
                  <div className="grid lg:grid-cols-5 gap-0">
                    <div className="lg:col-span-2 relative">
                      <VideoPreview videoUrl={course.videoUrl} thumbnail={course.image} title={course.title} />
                      <div className="absolute bottom-6 left-6 right-6 pointer-events-none">
                        <div className="flex items-center gap-2 text-white/90 text-sm mb-2 bg-black/40 backdrop-blur-sm rounded-full px-4 py-2 w-fit">
                          <Star className="w-4 h-4 text-amber-400 fill-current" />
                          <span className="font-semibold">{course.rating}</span>
                          <span>•</span>
                          <Users className="w-4 h-4" />
                          <span>{course.students} Students</span>
                        </div>
                      </div>
                    </div>

                    <div className="lg:col-span-3 p-8 lg:p-10">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <span className={`inline-block px-3 py-1 bg-${course.color || 'red'}-100 text-${course.color || 'red'}-700 text-sm font-medium rounded-full mb-3`}>
                            {course.subtitle}
                          </span>
                          <h2 className="text-2xl lg:text-3xl font-bold text-slate-900">{course.title}</h2>
                        </div>
                        <div className="text-right">
                          <div className="text-3xl font-bold text-slate-900">₹{Number(course.price || 0).toLocaleString()}</div>
                          <div className="text-sm text-slate-500 line-through">₹{Number(course.originalPrice || 0).toLocaleString()}</div>
                        </div>
                      </div>

                      <p className="text-slate-600 mb-6 leading-relaxed">{course.description}</p>

                      <div className="flex flex-wrap items-center gap-4 mb-6">
                        <div className="flex items-center gap-2 text-slate-600"><Clock className="w-5 h-5 text-red-500" /><span>{course.duration}</span></div>
                        <div className="flex items-center gap-2 text-slate-600"><Award className="w-5 h-5 text-red-500" /><span>Certificate Included</span></div>
                        <div className="flex items-center gap-2 text-slate-600"><Zap className="w-5 h-5 text-red-500" /><span>Score Guarantee</span></div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-3 mb-8">
                        {features.slice(0, 6).map((feature, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-sm text-slate-700">
                            <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                            {feature}
                          </div>
                        ))}
                      </div>

                      <div className="flex flex-col sm:flex-row gap-4">
                        <Link
                          href={createPageUrl('BookConsultation') + `?course=${course.category}` || '/'}
                          className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold rounded-full hover:from-red-700 hover:to-red-800 transition-all duration-500 shadow-xl shadow-red-500/30 group transform hover:scale-105"
                        >
                          Enroll Now
                          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                        </Link>
                        <Link
                          href={createPageUrl('BookConsultation') || '/'}
                          className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-slate-200 text-slate-700 font-semibold rounded-full hover:border-slate-900 hover:bg-slate-900 hover:text-white transition-all duration-500 shadow-lg group transform hover:scale-105"
                        >
                          <Play className="w-5 h-5" />
                          Free Demo Class
                        </Link>
                      </div>

                      <p className="text-sm text-slate-500 flex items-center gap-2 pt-3">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        Score guarantee • Free retake if you don&apos;t achieve target
                      </p>

                      <button
                        onClick={() => setExpandedCourse(expandedCourse === course.id ? null : course.id)}
                        className="flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-slate-900 mt-6 group"
                      >
                        <span>View Complete Curriculum</span>
                        <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${expandedCourse === course.id ? 'rotate-180' : ''}`} />
                      </button>

                      <AnimatePresence>
                        {expandedCourse === course.id && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                            className="overflow-hidden mt-6"
                          >
                            <CourseCurriculum modules={course.curriculum || []} />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="mt-16">
            <CourseRecommendation courses={courses} />
          </div>
        </div>
      </section>

      <AnimatePresence>
        {showCompare && <CourseCompare courses={courses} onClose={() => setShowCompare(false)} />}
      </AnimatePresence>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow={whyUs.eyebrow ?? 'Why Grey Matters Online'}
            title={whyUs.title ?? 'The Gold Standard in Test Preparation'}
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {(whyUs.items || [
              { icon: '🎓', title: 'Expert Trainers', desc: 'British Council & Pearson certified' },
              { icon: '📊', title: 'Proven Results', desc: '98% students achieve target score' },
              { icon: '🎯', title: 'Score Guarantee', desc: "Free retake if you don't score" },
              { icon: '💬', title: 'Live Classes', desc: 'Interactive sessions, not recordings' },
            ]).map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="text-center p-6 bg-slate-50 rounded-2xl"
              >
                <span className="text-4xl mb-4 block">{item.icon}</span>
                <h4 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h4>
                <p className="text-slate-600 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
}
