import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, CheckCircle, PlayCircle } from 'lucide-react';

export default function CourseCurriculum({ modules }) {
  const [expandedModule, setExpandedModule] = useState(null);

  return (
    <div className="space-y-3">
      {modules.map((module, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.1 }}
          className="border border-slate-200 rounded-xl overflow-hidden bg-white hover:border-slate-300 transition-colors"
        >
          <button
            onClick={() => setExpandedModule(expandedModule === idx ? null : idx)}
            className="w-full px-6 py-4 flex items-center justify-between text-left group"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center text-white font-bold shadow-md">
                {idx + 1}
              </div>
              <div>
                <h4 className="font-bold text-slate-900 mb-0.5">{module.title}</h4>
                <p className="text-sm text-slate-500">{module.lessons} lessons • {module.duration}</p>
              </div>
            </div>
            <ChevronDown 
              className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${
                expandedModule === idx ? 'rotate-180' : ''
              }`}
            />
          </button>

          <AnimatePresence>
            {expandedModule === idx && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="border-t border-slate-100 bg-slate-50/50"
              >
                <div className="px-6 py-4 space-y-3">
                  {module.topics.map((topic, topicIdx) => (
                    <div 
                      key={topicIdx}
                      className="flex items-start gap-3 text-sm text-slate-700 group hover:text-slate-900 transition-colors"
                    >
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>{topic}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
}