import React from 'react';
import { motion } from 'framer-motion';

export default function SectionHeading({ 
  eyebrow, 
  title, 
  description, 
  align = 'center',
  light = false 
}) {
  const alignClasses = {
    center: 'text-center mx-auto',
    left: 'text-left',
    right: 'text-right ml-auto'
  };

  return (
    <motion.div 
      className={`max-w-3xl ${alignClasses[align]} mb-16`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      {eyebrow && (
        <motion.span 
          className={`inline-block text-sm font-bold tracking-wider uppercase mb-4 ${
            light ? 'text-red-300' : 'text-red-600'
          }`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          {eyebrow}
        </motion.span>
      )}
      <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6 ${
        light ? 'text-white' : 'text-slate-900'
      }`}>
        {title}
      </h2>
      {description && (
        <p className={`text-lg md:text-xl leading-relaxed ${
          light ? 'text-slate-300' : 'text-slate-600'
        }`}>
          {description}
        </p>
      )}
    </motion.div>
  );
}