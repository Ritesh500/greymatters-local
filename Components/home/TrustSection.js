import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Award, Globe, Landmark } from 'lucide-react';
import SectionHeading from '../common/SectionHeading';

const ICONS = [Shield, Award, Globe, Landmark];

const DEFAULT_POINTS = [
  { title: '29+ Years of Trust', description: "India's most trusted IELTS & PTE brand since 1997, with a legacy of excellence." },
  { title: 'IDP Partner', description: 'Official IELTS test center and IDP recognized training institution.' },
  { title: 'Global Network', description: 'Partnerships with 500+ universities and immigration authorities worldwide.' },
  { title: 'Government Recognized', description: 'MOIA authorized and ISO certified immigration consultancy services.' },
];

const DEFAULT_MILESTONES = [
  { year: '1997', event: 'Founded in India as IELTS training pioneer' },
  { year: '2005', event: 'Expanded to immigration consultancy services' },
  { year: '2012', event: 'Launched PTE preparation programs' },
  { year: '2018', event: 'Digital transformation begins' },
  { year: '2020', event: 'Grey Matters Online launched' },
  { year: '2024', event: "India's #1 Online Test Prep Platform" },
];

export default function TrustSection({ content }) {
  const c = content || {};
  const eyebrow = c.eyebrow ?? 'Why Grey Matters';
  const title = c.title ?? 'Trusted by 25 Lakh+ Students';
  const description = c.description ?? 'When your future is at stake, trust the brand that has been building global careers for over two decades.';
  const points = c.points ?? DEFAULT_POINTS;
  const milestones = c.milestones ?? DEFAULT_MILESTONES;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } }
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow={eyebrow} title={title} description={description} />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20"
        >
          {points.map((point, index) => {
            const Icon = ICONS[index % ICONS.length];
            return (
              <motion.div key={index} variants={itemVariants} className="group cursor-pointer">
                <div className="bg-slate-50 rounded-2xl p-8 h-full hover:bg-gradient-to-br hover:from-red-50 hover:to-white transition-all duration-700 border border-slate-100 hover:border-red-100 hover:shadow-2xl hover:shadow-red-100/30 transform hover:-translate-y-1">
                  <div className="w-14 h-14 bg-white rounded-xl shadow-sm flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                    <Icon className="w-7 h-7 text-red-600" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{point.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{point.description}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Our Journey</h3>
            <p className="text-slate-600">Building futures since 1997</p>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-gradient-to-b from-red-600 via-red-400 to-red-200 hidden md:block" />
            <div className="space-y-8 md:space-y-0 md:grid md:grid-cols-6 gap-4">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative text-center"
                >
                  <div className="bg-white border-2 border-red-100 rounded-xl p-4 hover:border-red-300 transition-colors">
                    <div className="text-2xl font-bold text-red-600 mb-2">{milestone.year}</div>
                    <p className="text-sm text-slate-600 leading-snug">{milestone.event}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
