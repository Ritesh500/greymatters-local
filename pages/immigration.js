import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { createPageUrl } from '@/utils';
import { 
  Globe, MapPin, FileText, Users, CheckCircle, ArrowRight,
  Briefcase, GraduationCap, Home, Star, Shield, Clock
} from 'lucide-react';
import SectionHeading from '@/Components/common/SectionHeading';
import CTASection from '@/Components/home/CTASection';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/Components/ui/tabs';

export default function Immigration() {
  const [activeCountry, setActiveCountry] = useState('canada');

  const countries = [
    {
      id: 'canada',
      name: 'Canada',
      flag: '🇨🇦',
      image: 'https://images.unsplash.com/photo-1517935706615-2717063c2225?w=800',
      description: 'World\'s most immigrant-friendly nation with excellent healthcare, education, and quality of life.',
      pathways: [
        { name: 'Express Entry', desc: 'Fastest PR pathway for skilled workers', duration: '6-12 months' },
        { name: 'PNP Programs', desc: 'Provincial nomination for specific skills', duration: '12-18 months' },
        { name: 'Study Permit', desc: 'Study and work in Canada', duration: '2-4 months' },
        { name: 'Family Sponsorship', desc: 'Reunite with family in Canada', duration: '12-24 months' }
      ],
      stats: [
        { value: '450K+', label: 'Immigration Target 2024' },
        { value: '98%', label: 'Our Success Rate' },
        { value: '15K+', label: 'Students Sent' }
      ]
    },
    {
      id: 'australia',
      name: 'Australia',
      flag: '🇦🇺',
      image: 'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?w=800',
      description: 'High quality of life, excellent education system, and strong job market for skilled professionals.',
      pathways: [
        { name: 'Skilled Independent', desc: 'Points-based PR visa (subclass 189)', duration: '6-12 months' },
        { name: 'Skilled Nominated', desc: 'State-sponsored PR (subclass 190)', duration: '8-14 months' },
        { name: 'Student Visa', desc: 'Study at top Australian universities', duration: '1-2 months' },
        { name: 'Employer Sponsored', desc: 'Work visa with employer support', duration: '4-8 months' }
      ],
      stats: [
        { value: '195K+', label: 'Skilled Visas/Year' },
        { value: '97%', label: 'Our Success Rate' },
        { value: '12K+', label: 'Students Sent' }
      ]
    },
    {
      id: 'uk',
      name: 'United Kingdom',
      flag: '🇬🇧',
      image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800',
      description: 'World-class education, rich culture, and post-study work opportunities for international students.',
      pathways: [
        { name: 'Skilled Worker Visa', desc: 'Work for UK employers', duration: '3-8 weeks' },
        { name: 'Student Visa', desc: 'Study at UK universities', duration: '3-4 weeks' },
        { name: 'Graduate Route', desc: '2-year post-study work visa', duration: '8 weeks' },
        { name: 'Global Talent', desc: 'For exceptional talent', duration: '5-8 weeks' }
      ],
      stats: [
        { value: '500K+', label: 'Student Visas/Year' },
        { value: '96%', label: 'Our Success Rate' },
        { value: '20K+', label: 'Students Sent' }
      ]
    },
    {
      id: 'usa',
      name: 'United States',
      flag: '🇺🇸',
      image: 'https://images.unsplash.com/photo-1485738422979-f5c462d49f74?w=800',
      description: 'Home to world\'s top universities and leading technology companies with diverse opportunities.',
      pathways: [
        { name: 'F-1 Student Visa', desc: 'Study at US universities', duration: '2-4 months' },
        { name: 'H-1B Work Visa', desc: 'Work for US employers', duration: '4-8 months' },
        { name: 'OPT/CPT', desc: 'Practical training for students', duration: '3-4 months' },
        { name: 'B-1/B-2 Visitor', desc: 'Business or tourism visa', duration: '2-4 weeks' }
      ],
      stats: [
        { value: '1M+', label: 'International Students' },
        { value: '94%', label: 'Our Success Rate' },
        { value: '8K+', label: 'Students Sent' }
      ]
    }
  ];

  const activeCountryData = countries.find(c => c.id === activeCountry);

  const services = [
    {
      icon: FileText,
      title: 'Documentation',
      description: 'Complete assistance with all paperwork, SOPs, and application forms'
    },
    {
      icon: GraduationCap,
      title: 'University Selection',
      description: 'Expert guidance to choose the right program and institution'
    },
    {
      icon: Briefcase,
      title: 'Visa Processing',
      description: 'End-to-end visa application support with high success rate'
    },
    {
      icon: Home,
      title: 'Pre-Departure',
      description: 'Accommodation, travel, and settlement assistance'
    }
  ];

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-blue-900 via-slate-800 to-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1600" 
            alt="Travel"
            className="w-full h-full object-cover opacity-20"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="inline-block px-4 py-1.5 bg-blue-500/20 text-blue-300 text-sm font-semibold rounded-full mb-6">
              MOIA Authorized
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Your Gateway to a <span className="text-blue-400">Global Future</span>
            </h1>
            <p className="text-xl text-slate-300 leading-relaxed">
              Expert immigration guidance for Canada, Australia, UK, USA, and more.
              50,000+ successful visas and counting.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Country Selector */}
      <section className="py-8 bg-white border-b sticky top-20 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs value={activeCountry} onValueChange={setActiveCountry}>
            <TabsList className="bg-slate-100 p-1 rounded-full flex-wrap">
              {countries.map(country => (
                <TabsTrigger 
                  key={country.id} 
                  value={country.id}
                  className="rounded-full px-6 gap-2"
                >
                  <span>{country.flag}</span>
                  {country.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
      </section>

      {/* Country Details */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <motion.div
              key={activeCountry}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="flex items-center gap-4 mb-6">
                <span className="text-5xl">{activeCountryData.flag}</span>
                <div>
                  <h2 className="text-3xl font-bold text-slate-900">
                    Study & Settle in {activeCountryData.name}
                  </h2>
                </div>
              </div>

              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                {activeCountryData.description}
              </p>

              <div className="grid grid-cols-3 gap-4 mb-8">
                {activeCountryData.stats.map((stat, idx) => (
                  <div key={idx} className="bg-white rounded-xl p-4 text-center shadow-sm">
                    <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
                    <div className="text-xs text-slate-500">{stat.label}</div>
                  </div>
                ))}
              </div>

              <Link
                href={createPageUrl('BookConsultation') + `?country=${activeCountry}` || '/'}
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-full hover:from-blue-700 hover:to-blue-800 transition-all duration-500 shadow-xl shadow-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/40 group transform hover:scale-105"
              >
                Get Free Assessment
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>

              <p className="text-sm text-slate-500 flex items-center gap-2 mt-4">
                <CheckCircle className="w-4 h-4 text-green-500" />
                MOIA authorized • 50,000+ successful visas
              </p>
            </motion.div>

            <motion.div
              key={activeCountry + '-image'}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative"
            >
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src={activeCountryData.image} 
                  alt={activeCountryData.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>

          <div className="mb-16">
            <h3 className="text-2xl font-bold text-slate-900 mb-8">Immigration Pathways</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {activeCountryData.pathways.map((pathway, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start justify-between mb-4">
                    <h4 className="text-lg font-bold text-slate-900">{pathway.name}</h4>
                    <span className="text-sm text-blue-600 font-medium bg-blue-50 px-3 py-1 rounded-full">
                      {pathway.duration}
                    </span>
                  </div>
                  <p className="text-slate-600">{pathway.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Our Services */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Our Services"
            title="Comprehensive Immigration Support"
            description="From initial consultation to landing in your dream country, we're with you every step."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-slate-50 rounded-2xl p-8 text-center hover:shadow-lg transition-shadow"
              >
                <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-6">
                  <service.icon className="w-8 h-8 text-blue-600" />
                </div>
                <h4 className="text-lg font-bold text-slate-900 mb-3">{service.title}</h4>
                <p className="text-slate-600 text-sm">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-24 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Our Process"
            title="Simple, Transparent, Effective"
            light
          />

          <div className="grid md:grid-cols-5 gap-8">
            {[
              { step: '01', title: 'Free Consultation', desc: 'Understand your goals' },
              { step: '02', title: 'Assessment', desc: 'Evaluate eligibility' },
              { step: '03', title: 'Documentation', desc: 'Prepare all papers' },
              { step: '04', title: 'Application', desc: 'Submit & track' },
              { step: '05', title: 'Visa Success', desc: 'Celebrate together' }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="text-center relative"
              >
                <div className="w-16 h-16 bg-blue-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-blue-400">{item.step}</span>
                </div>
                <h4 className="font-bold mb-2">{item.title}</h4>
                <p className="text-sm text-slate-400">{item.desc}</p>
                {idx < 4 && (
                  <div className="hidden md:block absolute top-8 left-full w-full h-px bg-gradient-to-r from-blue-500/50 to-transparent -translate-x-8" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
}
