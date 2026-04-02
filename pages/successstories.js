import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Star, Quote, MapPin, GraduationCap, Filter, 
  Play, ArrowRight, CheckCircle 
} from 'lucide-react';
import SectionHeading from '@/Components/common/SectionHeading';
import CTASection from '@/Components/home/CTASection';
import AnimatedCounter from '@/Components/common/AnimatedCounter';
import { Tabs, TabsList, TabsTrigger } from '@/Components/ui/tabs';

export default function SuccessStories() {
  const [filter, setFilter] = useState('all');

  const stories = [
    {
      id: 1,
      name: 'Priya Sharma',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
      exam: 'ielts',
      score: '8.5 Band',
      destination: 'Canada',
      university: 'University of Toronto',
      year: 2024,
      testimonial: 'Grey Matters completely transformed my IELTS preparation. The structured approach, mock tests, and personalized feedback helped me achieve 8.5 bands in just 6 weeks. The trainers were incredible and always available to clear my doubts.'
    },
    {
      id: 2,
      name: 'Rahul Patel',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
      exam: 'pte',
      score: '85 Score',
      destination: 'Australia',
      university: 'University of Melbourne',
      year: 2024,
      testimonial: 'The AI-powered practice tests at Grey Matters are incredible. I could track my progress daily and focus on my weak areas. The speaking module strategies were game-changers. Scored 85 on my first attempt!'
    },
    {
      id: 3,
      name: 'Anjali Reddy',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
      exam: 'ielts',
      score: '7.5 Band',
      destination: 'UK',
      university: 'London School of Economics',
      year: 2023,
      testimonial: 'The trainers at Grey Matters are simply the best. Their strategies for writing and speaking made all the difference. I\'m now pursuing my dream of studying at LSE. Forever grateful!'
    },
    {
      id: 4,
      name: 'Vikram Singh',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
      exam: 'visa',
      score: 'PR Approved',
      destination: 'Canada',
      university: 'Express Entry',
      year: 2024,
      testimonial: 'From IELTS preparation to PR visa filing, Grey Matters handled everything seamlessly. The immigration team was extremely professional and kept me updated throughout. Got my Canada PR in just 8 months!'
    },
    {
      id: 5,
      name: 'Sneha Gupta',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400',
      exam: 'pte',
      score: '90 Score',
      destination: 'Australia',
      university: 'Monash University',
      year: 2024,
      testimonial: 'I had failed PTE twice before joining Grey Matters. Their diagnostic approach identified my weaknesses, and with targeted practice, I scored 90 on my third attempt. The difference was incredible!'
    },
    {
      id: 6,
      name: 'Arjun Menon',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
      exam: 'ielts',
      score: '8.0 Band',
      destination: 'USA',
      university: 'MIT',
      year: 2023,
      testimonial: 'Grey Matters\' online classes fit perfectly with my work schedule. The quality of teaching was exceptional, and the mock tests were very close to the actual exam. Achieved my dream score!'
    },
    {
      id: 7,
      name: 'Meera Krishnan',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400',
      exam: 'visa',
      score: 'PR Approved',
      destination: 'Australia',
      university: 'Skilled Migration',
      year: 2024,
      testimonial: 'The immigration consultants at Grey Matters were so thorough. They guided me through every step of the 189 visa process. Their attention to detail is what got my visa approved without any issues.'
    },
    {
      id: 8,
      name: 'Karan Malhotra',
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400',
      exam: 'ielts',
      score: '7.0 Band',
      destination: 'Canada',
      university: 'University of British Columbia',
      year: 2023,
      testimonial: 'As a working professional, I needed flexible learning options. Grey Matters Online gave me exactly that. The recorded sessions, live doubt sessions, and personalized feedback were perfect for my schedule.'
    }
  ];

  const filteredStories = filter === 'all' 
    ? stories 
    : stories.filter(s => s.exam === filter);

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="inline-block px-4 py-1.5 bg-amber-500/20 text-amber-300 text-sm font-semibold rounded-full mb-6">
              Real Students, Real Results
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Success Stories That <span className="text-amber-400">Inspire</span>
            </h1>
            <p className="text-xl text-slate-300 leading-relaxed">
              Join 25 lakh+ students who transformed their futures with Grey Matters.
              Your success story could be next.
            </p>
          </motion.div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-4xl mx-auto">
            {[
              { value: 2500000, suffix: '+', label: 'Students Trained' },
              { value: 50000, suffix: '+', label: 'Visas Approved' },
              { value: 98, suffix: '%', label: 'Success Rate' },
              { value: 29, suffix: '+', label: 'Years of Trust' }
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + idx * 0.1 }}
                className="text-center bg-white/10 rounded-xl p-6 backdrop-blur-sm"
              >
                <div className="text-3xl md:text-4xl font-bold text-white mb-1">
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-sm text-slate-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-white border-b sticky top-20 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs value={filter} onValueChange={setFilter}>
            <TabsList className="bg-slate-100 p-1 rounded-full">
              <TabsTrigger value="all" className="rounded-full px-6">All Stories</TabsTrigger>
              <TabsTrigger value="ielts" className="rounded-full px-6">IELTS</TabsTrigger>
              <TabsTrigger value="pte" className="rounded-full px-6">PTE</TabsTrigger>
              <TabsTrigger value="visa" className="rounded-full px-6">Immigration</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </section>

      {/* Stories Grid */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredStories.map((story, index) => (
                <motion.div
                  key={story.id}
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
                        <img 
                          src={story.image} 
                          alt={story.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900">{story.name}</h3>
                        <div className="flex items-center gap-2 text-sm text-slate-500 mt-1">
                          <MapPin className="w-3 h-3" />
                          {story.destination}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-500">
                          <GraduationCap className="w-3 h-3" />
                          {story.university}
                        </div>
                      </div>
                    </div>

                    <div className="inline-block px-3 py-1 bg-gradient-to-r from-red-500 to-red-600 text-white text-sm font-bold rounded-full mb-4">
                      {story.score}
                    </div>

                    <Quote className="w-8 h-8 text-red-200 mb-2" />
                    <p className="text-slate-600 leading-relaxed text-sm">
                      "{story.testimonial}"
                    </p>

                    <div className="flex items-center gap-1 mt-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-amber-400 fill-current" />
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Score Highlights */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading 
            eyebrow="Score Highlights"
            title="Exceptional Results, Every Year"
          />

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'IELTS Achievers',
                scores: [
                  { score: '9 Band', count: '50+' },
                  { score: '8.5 Band', count: '500+' },
                  { score: '8.0 Band', count: '2000+' },
                  { score: '7.5 Band', count: '5000+' }
                ]
              },
              {
                title: 'PTE Champions',
                scores: [
                  { score: '90 Score', count: '100+' },
                  { score: '85+ Score', count: '1000+' },
                  { score: '79+ Score', count: '3000+' },
                  { score: '65+ Score', count: '8000+' }
                ]
              },
              {
                title: 'Visa Success',
                scores: [
                  { score: 'Canada PR', count: '15000+' },
                  { score: 'Australia PR', count: '12000+' },
                  { score: 'UK Visa', count: '20000+' },
                  { score: 'US Visa', count: '8000+' }
                ]
              }
            ].map((category, idx) => (
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
                  {category.scores.map((item, i) => (
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

      <CTASection />
    </div>
  );
}