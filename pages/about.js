import React from 'react';
import { motion } from 'framer-motion';
import { Award, Users, Globe, Target, CheckCircle, Star, Building, Shield } from 'lucide-react';
import SectionHeading from '@/Components/common/SectionHeading';
import AnimatedCounter from '@/Components/common/AnimatedCounter';
import CTASection from '@/Components/home/CTASection';

export default function About() {
  const leadership = [
    {
      name: 'Dr. Rajesh Sharma',
      role: 'Founder & Chairman',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400',
      bio: '30+ years in education, British Council certified'
    },
    {
      name: 'Priya Menon',
      role: 'Chief Academic Officer',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400',
      bio: 'Former IELTS examiner, Cambridge certified'
    },
    {
      name: 'Vikram Singh',
      role: 'Head of Immigration',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
      bio: 'MOIA certified, 15+ years experience'
    }
  ];

  const values = [
    { icon: Target, title: 'Excellence', desc: 'Committed to the highest standards in education' },
    { icon: Users, title: 'Student-First', desc: 'Every decision driven by student success' },
    { icon: Shield, title: 'Integrity', desc: 'Transparent, honest guidance always' },
    { icon: Globe, title: 'Global Vision', desc: 'Preparing students for worldwide opportunities' }
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-red-100 rounded-full blur-3xl opacity-40" />
          <div className="absolute bottom-0 -left-40 w-80 h-80 bg-blue-100 rounded-full blur-3xl opacity-30" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <span className="inline-block px-4 py-1.5 bg-red-100 text-red-700 text-sm font-semibold rounded-full mb-6">
              Since 1997
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight">
              Building Global Futures <span className="text-red-600">Since 1997</span>
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed">
              Grey Matters has been India's most trusted name in IELTS, PTE, and immigration 
              for over 27 years. What started as a single center in Delhi has grown into 
              a nationwide network, now reaching students globally through Grey Matters Online.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: 27, suffix: '+', label: 'Years of Excellence' },
              { value: 500000, suffix: '+', label: 'Students Trained' },
              { value: 50, suffix: '+', label: 'Centers Nationwide' },
              { value: 500, suffix: '+', label: 'Expert Trainers' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold text-slate-900 mb-2">
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-slate-600">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <SectionHeading 
                eyebrow="Our Story"
                title="From a Single Classroom to India's #1 Brand"
                align="left"
              />
              <div className="space-y-6 text-slate-600 leading-relaxed">
                <p>
                  In 1997, when IELTS was still a new concept in India, Grey Matters was founded 
                  with a simple mission: to help Indian students achieve their dreams of studying 
                  and working abroad.
                </p>
                <p>
                  What began as a small coaching center in Delhi has transformed into India's largest 
                  and most trusted network for test preparation and immigration services. Our journey 
                  is marked by countless success stories—students who scored their dream bands, 
                  families who got their visas, and individuals who transformed their careers.
                </p>
                <p>
                  In 2020, we launched Grey Matters Online to bring our expert-led training to 
                  students everywhere. Today, we're proud to be the first choice for over 5 lakh 
                  students across India and beyond.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
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
          <SectionHeading 
            eyebrow="Our Values"
            title="What Drives Us Every Day"
            description="These core principles have guided Grey Matters for over two decades."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center group"
              >
                <div className="w-20 h-20 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <value.icon className="w-10 h-10 text-red-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{value.title}</h3>
                <p className="text-slate-600">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading 
            eyebrow="Leadership"
            title="Meet Our Expert Team"
            description="Decades of combined experience in education and immigration."
          />

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
                  <img 
                    src={leader.image} 
                    alt={leader.name}
                    className="w-full h-full object-cover"
                  />
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

      {/* Accreditations */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Accreditations & Partnerships</h3>
            <p className="text-slate-600">Trusted by leading global education bodies</p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-12 opacity-70">
            {['British Council', 'IDP Education', 'Pearson', 'Cambridge', 'MOIA'].map((partner) => (
              <div key={partner} className="text-xl font-bold text-slate-400">
                {partner}
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
}