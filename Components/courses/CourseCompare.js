import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, CheckCircle, XCircle } from 'lucide-react';
import { Button } from '@/Components/ui/button';

export default function CourseCompare({ courses, onClose }) {
  const [selectedCourses, setSelectedCourses] = useState([]);

  const toggleCourse = (courseId) => {
    if (selectedCourses.includes(courseId)) {
      setSelectedCourses(selectedCourses.filter(id => id !== courseId));
    } else if (selectedCourses.length < 3) {
      setSelectedCourses([...selectedCourses, courseId]);
    }
  };

  const comparisonCourses = courses.filter(c => selectedCourses.includes(c.id));

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-3xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden"
      >
        <div className="p-6 border-b border-slate-200 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-900">Compare Courses</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-100px)]">
          {selectedCourses.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-slate-600 mb-6">Select courses to compare (up to 3)</p>
              <div className="grid md:grid-cols-3 gap-4">
                {courses.map(course => (
                  <button
                    key={course.id}
                    onClick={() => toggleCourse(course.id)}
                    className="p-6 border-2 border-slate-200 rounded-2xl hover:border-red-500 hover:bg-red-50/50 transition-all text-left"
                  >
                    <h3 className="font-bold text-slate-900 mb-2">{course.title}</h3>
                    <p className="text-sm text-slate-600">{course.subtitle}</p>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left p-4 font-bold text-slate-900">Feature</th>
                    {comparisonCourses.map(course => (
                      <th key={course.id} className="p-4">
                        <div className="text-center">
                          <h3 className="font-bold text-slate-900 mb-1">{course.title}</h3>
                          <p className="text-sm text-slate-600">{course.subtitle}</p>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-slate-100">
                    <td className="p-4 font-semibold text-slate-700">Price</td>
                    {comparisonCourses.map(course => (
                      <td key={course.id} className="p-4 text-center">
                        <div className="font-bold text-slate-900">₹{course.price.toLocaleString()}</div>
                        <div className="text-sm text-slate-500 line-through">₹{course.originalPrice.toLocaleString()}</div>
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="p-4 font-semibold text-slate-700">Duration</td>
                    {comparisonCourses.map(course => (
                      <td key={course.id} className="p-4 text-center text-slate-600">{course.duration}</td>
                    ))}
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="p-4 font-semibold text-slate-700">Rating</td>
                    {comparisonCourses.map(course => (
                      <td key={course.id} className="p-4 text-center">
                        <div className="font-bold text-slate-900">{course.rating}/5</div>
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="p-4 font-semibold text-slate-700">Students Enrolled</td>
                    {comparisonCourses.map(course => (
                      <td key={course.id} className="p-4 text-center text-slate-600">{course.students}</td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}