import React from 'react';
import { motion } from 'framer-motion';
import { Award, Globe, Target, Users, Shield, Star } from 'lucide-react';
import SectionHeading from '@/Components/common/SectionHeading';
import AnimatedCounter from '@/Components/common/AnimatedCounter';
import CTASection from '@/Components/home/CTASection';
import { getContent } from '@/lib/content';

const VALUE_ICONS = [Target, Users, Shield, Globe];

export async function getServerSideProps() {
  const content = getContent('about');
  return { props: { content } };
}

export default function About({ content }) {
  const c = content || {};
  const hero = c.hero || {};
  const stats = c.stats || [
    { value: 27, suffix: '+', label: 'Years of Excellence' },
    { value: 500000, suffix: '+', label: 'Students Trained' },
    { value: 50, suffix: '+', label: 'Centers Nationwide' },
    { value: 500, suffix: '+', label: 'Expert Trainers' },
  ];
  const story = c.story || {};
  const values = c.values || [
    { title: 'Excellence', desc: 'Committed to the highest standards in education' },
    { title: 'Student-First', desc: 'Every decision driven by student success' },
    { title: 'Integrity', desc: 'Transparent, honest guidance always' },
    { title: 'Global Vision', desc: 'Preparing students for worldwide opportunities' },
  ];
  const leadership = c.leadership || [];
  const partners = c.partners || ['British Council', 'IDP Education', 'Pearson', 'Cambridge', 'MOIA'];
  const paragraphs = story.paragraphs || [
    'In 1997, when IELTS was still a new concept in India, Grey Matters was founded with a simple mission: to help Indian students achieve their dreams of studying and working abroad.',
    "What began as a small coaching center in Delhi has transformed into India's largest and most trusted network for test preparation and immigration services.",
    "In 2020, we launched Grey Matters Online to bring our expert-led training to students everywhere. Today, we're proud to be the first choice for over 5 lakh students across India and beyond.",
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
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
            <span className="inline-block px-4 py-1.5 bg-red-100 text-red-700 text-sm font-semibold rounded-full mb-6">
              {hero.badge ?? 'Since 1997'}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight">
              {hero.heading ?? 'Building Global Futures'}{' '}
              <span className="text-red-600">{hero.headingHighlight ?? 'Since 1997'}</span>
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed">{hero.description}</p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold text-slate-900 mb-2">
                  <AnimatedCounter end={Number(stat.value)} suffix={stat.suffix} />
                </div>
                <p className="text-slate-600">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-24 bg-slate-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <SectionHeading
                eyebrow={story.eyebrow ?? 'Our Story'}
                title={story.title ?? "From a Single Classroom to India's #1 Brand"}
                align="left"
              />
              <div className="space-y-6 text-slate-600 leading-relaxed">
                {paragraphs.map((p, i) => <p key={i}>{p}</p>)}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="bg-white rounded-2xl p-6 shadow-lg">
                    <Award className="w-10 h-10 text-red-600 mb-3" />
                    <h4 className="font-bold text-slate-900 mb-2">British Council Partner</h4>
                    <p className="text-sm text-slate-600">Official IELTS test center</p>
                  </div>
                  <div className="bg-gradient-to-br from-red-600 to-red-700 rounded-2xl p-6 text-white">
                    <div className="text-4xl font-bold mb-2">98%</div>
                    <p className="text-red-100">Success Rate</p>
                  </div>
                </div>
                <div className="space-y-4 mt-8">
                  <div className="bg-slate-900 rounded-2xl p-6 text-white">
                    <Globe className="w-10 h-10 text-red-400 mb-3" />
                    <h4 className="font-bold mb-2">Global Reach</h4>
                    <p className="text-sm text-slate-400">Students in 50+ countries</p>
                  </div>
                  <div className="bg-white rounded-2xl p-6 shadow-lg">
                    <Star className="w-10 h-10 text-amber-500 mb-3" />
                    <h4 className="font-bold text-slate-900 mb-2">4.9/5 Rating</h4>
                    <p className="text-sm text-slate-600">From 50,000+ reviews</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Our Values" title="What Drives Us Every Day" description="These core principles have guided Grey Matters for over two decades." />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = VALUE_ICONS[index % VALUE_ICONS.length];
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center group"
                >
                  <div className="w-20 h-20 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-10 h-10 text-red-600" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{value.title}</h3>
                  <p className="text-slate-600">{value.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Leadership */}
      {leadership.length > 0 && (
        <section className="py-24 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading eyebrow="Leadership" title="Meet Our Expert Team" description="Decades of combined experience in education and immigration." />
            <div className="grid md:grid-cols-3 gap-8">
              {leadership.map((leader, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img src={leader.image} alt={leader.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-slate-900">{leader.name}</h3>
                    <p className="text-red-600 font-medium mb-2">{leader.role}</p>
                    <p className="text-slate-600 text-sm">{leader.bio}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Partners */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Accreditations & Partnerships</h3>
            <p className="text-slate-600">Trusted by leading global education bodies</p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-12 opacity-70">
            {partners.map((partner) => (
              <div key={partner} className="text-xl font-bold text-slate-400">{partner}</div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
}
