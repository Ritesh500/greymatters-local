import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Target, Award, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { createPageUrl } from '@/utils';

export default function CourseRecommendation({ courses }) {
  const [userGoal, setUserGoal] = useState('');
  const [recommendation, setRecommendation] = useState(null);

  const goals = [
    { id: 'study_abroad', label: 'Study Abroad', icon: Award, course: 'ielts' },
    { id: 'australia_pr', label: 'Australia PR', icon: Target, course: 'pte' },
    { id: 'career_growth', label: 'Career Growth', icon: TrendingUp, course: 'spoken_english' },
  ];

  const handleGoalSelect = (goalId) => {
    setUserGoal(goalId);
    const selectedGoal = goals.find((g) => g.id === goalId);
    const recommendedCourse = courses.find(
      (c) => c.category === selectedGoal.course
    );
    setRecommendation(recommendedCourse);
  };

  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-8 md:p-12 text-white">
      <h3 className="text-2xl md:text-3xl font-bold mb-3">
        Not sure which course to choose?
      </h3>
      <p className="text-slate-300 mb-8 text-lg">
        Tell us your goal, we'll recommend the perfect course for you.
      </p>

      <div className="grid md:grid-cols-3 gap-4 mb-8">
        {goals.map((goal) => (
          <motion.button
            key={goal.id}
            onClick={() => handleGoalSelect(goal.id)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`p-6 rounded-2xl border-2 transition-all duration-300 text-left ${
              userGoal === goal.id
                ? 'border-red-500 bg-red-500/20 shadow-xl shadow-red-500/20'
                : 'border-white/20 bg-white/5 hover:border-white/40'
            }`}
          >
            <goal.icon className="w-8 h-8 mb-3 text-red-400" />
            <h4 className="font-bold text-lg">{goal.label}</h4>
          </motion.button>
        ))}
      </div>

      {recommendation && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
        >
          <p className="text-sm text-slate-300 mb-2">Recommended for you:</p>
          <h4 className="text-2xl font-bold mb-3">
            {recommendation.title}
          </h4>
          <p className="text-slate-300 mb-6">
            {recommendation.description}
          </p>

          <Link
            href={
              (createPageUrl('BookConsultation') || '/') +
              `?course=${recommendation.category}`
            }
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold rounded-full hover:from-red-700 hover:to-red-800 transition-all duration-300 shadow-xl shadow-red-500/30 hover:shadow-2xl hover:shadow-red-500/40"
          >
            Get Started
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      )}
    </div>
  );
}
