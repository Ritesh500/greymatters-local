import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { createPageUrl } from '@/utils';
import { ArrowRight, Clock, Users, Star, BookOpen, Mic, Plane } from 'lucide-react';
import SectionHeading from '../common/SectionHeading';

export default function CoursesPreview() {
  const courses = [
    {
      id: 'ielts',
      title: 'IELTS Online',
      description:
        'Comprehensive preparation for Academic & General Training with expert instructors',
      icon: BookOpen,
      color: 'from-red-500 to-red-600',
      bgColor: 'bg-red-50',
      features: ['Live Classes', 'Mock Tests', 'Band 7+ Guarantee'],
      students: '2L+',
      rating: 4.9,
      duration: '6-8 Weeks',
    },
    {
      id: 'pte',
      title: 'PTE Academic',
      description:
        'AI-driven coaching for PTE with unlimited practice tests and instant scoring',
      icon: Mic,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      features: ['AI Practice', 'Score Analytics', '79+ Target'],
      students: '80K+',
      rating: 4.8,
      duration: '4-6 Weeks',
    },
    {
      id: 'spoken_english',
      title: 'Spoken English',
      description:
        'Fluency-focused program to build confidence for global communication',
      icon: Mic,
      color: 'from-emerald-500 to-emerald-600',
      bgColor: 'bg-emerald-50',
      features: ['1-on-1 Sessions', 'Native Speakers', 'Certification'],
      students: '50K+',
      rating: 4.9,
      duration: '8-12 Weeks',
    },
    {
      id: 'immigration',
      title: 'Immigration Services',
      description:
        'End-to-end visa guidance for Canada, Australia, UK, New Zealand & more',
      icon: Plane,
      color: 'from-violet-500 to-violet-600',
      bgColor: 'bg-violet-50',
      features: ['PR Pathways', 'Document Support', 'Interview Prep'],
      students: '50K+',
      rating: 4.9,
      duration: 'Ongoing',
    },
  ];

  return (
    <section className="py-24 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Our Programs"
          title="Choose Your Path to Success"
          description="Whether it's test preparation or immigration, our expert-led programs are designed to maximize your potential."
        />

        <div className="grid md:grid-cols-2 gap-8">
          {courses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                href={
                  (createPageUrl('Courses') || '/') +
                  `?category=${course.id}`
                }
              >
                <div className="group bg-white rounded-3xl p-8 h-full border border-slate-100 hover:border-slate-200 hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-500">
                  <div className="flex items-start justify-between mb-6">
                    <div
                      className={`w-16 h-16 ${course.bgColor} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                    >
                      <course.icon
                        className={`w-8 h-8 bg-gradient-to-r ${course.color} bg-clip-text text-transparent`}
                      />
                    </div>
                    <div className="flex items-center gap-1 text-amber-500">
                      <Star className="w-5 h-5 fill-current" />
                      <span className="font-bold text-slate-900">
                        {course.rating}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-red-600 transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-slate-600 mb-6 leading-relaxed">
                    {course.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {course.features.map((feature, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-slate-100 text-slate-700 text-sm font-medium rounded-full"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                    <div className="flex items-center gap-6">
                      <div className="flex items-center gap-2 text-slate-500">
                        <Users className="w-4 h-4" />
                        <span className="text-sm font-medium">
                          {course.students} Students
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-500">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm font-medium">
                          {course.duration}
                        </span>
                      </div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-red-600 group-hover:translate-x-2 transition-all duration-300" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            href={createPageUrl('Courses') || '/'}
            className="inline-flex items-center gap-2 text-red-600 font-semibold hover:gap-4 transition-all"
          >
            View All Courses
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
