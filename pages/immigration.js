import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { createPageUrl } from '@/utils';
import { FileText, GraduationCap, Briefcase, Home, CheckCircle, ArrowRight } from 'lucide-react';
import SectionHeading from '@/Components/common/SectionHeading';
import CTASection from '@/Components/home/CTASection';
import { Tabs, TabsList, TabsTrigger } from '@/Components/ui/tabs';
import { getContent } from '@/lib/content';

const SERVICE_ICONS = [FileText, GraduationCap, Briefcase, Home];

export async function getServerSideProps() {
  const content = getContent('immigration');
  return { props: { content } };
}

export default function Immigration({ content }) {
  const c = content || {};
  const hero = c.hero || {};
  const countries = c.countries || [];
  const services = c.services || [];
  const process = c.process || [];

  const [activeCountry, setActiveCountry] = useState(countries[0]?.id || 'canada');
  const activeCountryData = countries.find(co => co.id === activeCountry) || countries[0];

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-blue-900 via-slate-800 to-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1600" alt="Travel" className="w-full h-full object-cover opacity-20" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-3xl mx-auto">
            <span className="inline-block px-4 py-1.5 bg-blue-500/20 text-blue-300 text-sm font-semibold rounded-full mb-6">
              {hero.badge ?? 'MOIA Authorized'}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              {hero.heading ?? 'Your Gateway to a'} <span className="text-blue-400">{hero.headingHighlight ?? 'Global Future'}</span>
            </h1>
            <p className="text-xl text-slate-300 leading-relaxed">{hero.description}</p>
          </motion.div>
        </div>
      </section>

      {/* Country Selector */}
      {countries.length > 0 && (
        <section className="py-8 bg-white border-b sticky top-20 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Tabs value={activeCountry} onValueChange={setActiveCountry}>
              <TabsList className="bg-slate-100 p-1 rounded-full flex-wrap">
                {countries.map(country => (
                  <TabsTrigger key={country.id} value={country.id} className="rounded-full px-6 gap-2">
                    <span>{country.flag}</span>{country.name}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
        </section>
      )}

      {/* Country Details */}
      {activeCountryData && (
        <section className="py-20 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
              <motion.div key={activeCountry} initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-5xl">{activeCountryData.flag}</span>
                  <h2 className="text-3xl font-bold text-slate-900">Study & Settle in {activeCountryData.name}</h2>
                </div>
                <p className="text-lg text-slate-600 mb-8 leading-relaxed">{activeCountryData.description}</p>

                {Array.isArray(activeCountryData.stats) && (
                  <div className="grid grid-cols-3 gap-4 mb-8">
                    {activeCountryData.stats.map((stat, idx) => (
                      <div key={idx} className="bg-white rounded-xl p-4 text-center shadow-sm">
                        <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
                        <div className="text-xs text-slate-500">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                )}

                <Link
                  href={createPageUrl('BookConsultation') + `?country=${activeCountry}` || '/'}
                  className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-full hover:from-blue-700 hover:to-blue-800 transition-all duration-500 shadow-xl group transform hover:scale-105"
                >
                  Get Free Assessment
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
                <p className="text-sm text-slate-500 flex items-center gap-2 mt-4">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  MOIA authorized • 50,000+ successful visas
                </p>
              </motion.div>

              <motion.div key={activeCountry + '-image'} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} className="relative">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                  <img src={activeCountryData.image} alt={activeCountryData.name} className="w-full h-full object-cover" />
                </div>
              </motion.div>
            </div>

            {Array.isArray(activeCountryData.pathways) && activeCountryData.pathways.length > 0 && (
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
                        <span className="text-sm text-blue-600 font-medium bg-blue-50 px-3 py-1 rounded-full">{pathway.duration}</span>
                      </div>
                      <p className="text-slate-600">{pathway.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Services */}
      {services.length > 0 && (
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading eyebrow="Our Services" title="Comprehensive Immigration Support" description="From initial consultation to landing in your dream country, we're with you every step." />
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {services.map((service, idx) => {
                const Icon = SERVICE_ICONS[idx % SERVICE_ICONS.length];
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="bg-slate-50 rounded-2xl p-8 text-center hover:shadow-lg transition-shadow"
                  >
                    <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-6">
                      <Icon className="w-8 h-8 text-blue-600" />
                    </div>
                    <h4 className="text-lg font-bold text-slate-900 mb-3">{service.title}</h4>
                    <p className="text-slate-600 text-sm">{service.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Process */}
      {process.length > 0 && (
        <section className="py-24 bg-slate-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading eyebrow="Our Process" title="Simple, Transparent, Effective" light />
            <div className="grid md:grid-cols-5 gap-8">
              {process.map((item, idx) => (
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
                  {idx < process.length - 1 && (
                    <div className="hidden md:block absolute top-8 left-full w-full h-px bg-gradient-to-r from-blue-500/50 to-transparent -translate-x-8" />
                  )}
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
