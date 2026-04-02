import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
// REMOVED: base44 import
import {
  CheckCircle, Phone, Mail, MapPin, Clock,
  ArrowRight, Calendar, Users, Star, Shield, Award
} from 'lucide-react';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Textarea } from '@/Components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import { toast } from 'sonner';

export default function BookConsultation() {
  const [courseParam, setCourseParam] = useState(null);
  const [countryParam, setCountryParam] = useState(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    setCourseParam(urlParams.get('course'));
    setCountryParam(urlParams.get('country'));
  }, []);

  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    interest: courseParam || countryParam || ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // UPDATED: Replaced base44 with custom API fetch
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/consultation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsSubmitted(true);
        toast.success('Consultation request submitted successfully!');
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Submission failed');
      }
    } catch (error) {
      console.error("API Error:", error);
      toast.error('Something went wrong. Please try again or call us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const interests = [
    { value: 'ielts', label: 'IELTS Preparation' },
    { value: 'pte', label: 'PTE Preparation' },
    { value: 'spoken_english', label: 'Spoken English' },
    { value: 'study_abroad', label: 'Study Abroad' },
    { value: 'immigration', label: 'Immigration Services' },
    { value: 'other', label: 'Other' }
  ];

  const countries = [
    'Canada', 'Australia', 'UK', 'USA', 'New Zealand', 'Germany', 'Other'
  ];

  const timeSlots = [
    '9:00 AM - 10:00 AM',
    '10:00 AM - 11:00 AM',
    '11:00 AM - 12:00 PM',
    '2:00 PM - 3:00 PM',
    '3:00 PM - 4:00 PM',
    '4:00 PM - 5:00 PM',
    '5:00 PM - 6:00 PM'
  ];

  if (isSubmitted) {
    return (
      <div className="pt-20 min-h-screen bg-gradient-to-br from-slate-50 to-white flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl text-center max-w-lg w-full"
        >
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle className="w-10 h-10 text-green-600" />
          </motion.div>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Request Submitted!</h2>
          <p className="text-slate-600 mb-2">
            Our expert counselor will contact you within <span className="font-bold text-slate-900">24 hours</span>.
          </p>
          <p className="text-sm text-slate-500 mb-8">
            Check your email for confirmation and next steps.
          </p>
          
          <div className="space-y-3">
            <a
              href="tel:+919988892587"
              className="inline-flex items-center justify-center gap-2 w-full px-6 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold rounded-xl hover:from-red-700 hover:to-red-800 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 duration-300"
            >
              <Phone className="w-5 h-5" />
              Call Now for Instant Response
            </a>
            <p className="text-xs text-slate-500">
              Available Mon-Sat, 9 AM - 6 PM
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-100">
            <p className="text-sm text-slate-600 mb-4">What happens next?</p>
            <div className="space-y-2 text-left">
              <div className="flex items-start gap-2 text-sm text-slate-600">
                <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                <span>Free skill assessment test</span>
              </div>
              <div className="flex items-start gap-2 text-sm text-slate-600">
                <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                <span>Personalized study plan</span>
              </div>
              <div className="flex items-start gap-2 text-sm text-slate-600">
                <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                <span>Course recommendations</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-red-600 via-red-700 to-red-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[linear-gradient(135deg,transparent_45%,rgba(255,255,255,0.1)_45%,rgba(255,255,255,0.1)_55%,transparent_55%)] bg-[size:40px_40px]" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-red-700/30 to-red-900/50" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-center max-w-3xl mx-auto"
          >
            <motion.span 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-5 py-2 bg-white/20 backdrop-blur-sm text-white text-sm font-semibold rounded-full mb-8 border border-white/30"
            >
              <CheckCircle className="w-4 h-4" />
              100% Free • No Obligation • Secure
            </motion.span>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-[1.1] tracking-tight">
              Book Your Free Expert Consultation
            </h1>
            <p className="text-xl md:text-2xl text-red-50 leading-relaxed">
              Speak with senior counselors trusted by <span className="font-semibold text-white">25,00,000+ students worldwide</span> for IELTS, PTE & immigration success.
            </p>

            {/* Trust Metrics */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap justify-center gap-8 mt-10"
            >
              {[
                { label: '29+ Years of Trust', icon: Award },
                { label: '98% Success Rate', icon: Star },
                { label: 'MOIA Authorized', icon: Shield },
                { label: '4.9/5 Student Rating', icon: Star }
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 text-white/90">
                  <item.icon className="w-5 h-5" />
                  <span className="text-sm font-semibold">{item.label}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-24 bg-gradient-to-b from-slate-50 to-white relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 to-white" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-3"
            >
              <div className="bg-white rounded-[2rem] p-10 md:p-12 shadow-2xl shadow-slate-900/10 border border-slate-200/50 relative overflow-hidden">
                {/* Subtle glow effect */}
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-red-500/10 rounded-full blur-3xl" />
                <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl" />

                <div className="relative">
                  <h2 className="text-2xl font-bold text-slate-900 mb-2">Your Information</h2>
                  <p className="text-slate-600 mb-8">Takes less than 60 seconds</p>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="full_name" className="text-sm font-semibold text-slate-700">Full Name *</Label>
                    <Input
                      id="full_name"
                      required
                      placeholder="Enter your full name"
                      value={formData.full_name}
                      onChange={(e) => setFormData({...formData, full_name: e.target.value})}
                      className="h-14 text-base rounded-xl border-slate-300 focus:border-red-500 focus:ring-red-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-semibold text-slate-700">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="h-14 text-base rounded-xl border-slate-300 focus:border-red-500 focus:ring-red-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-sm font-semibold text-slate-700">Phone Number *</Label>
                    <Input
                      id="phone"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="h-14 text-base rounded-xl border-slate-300 focus:border-red-500 focus:ring-red-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="interest" className="text-sm font-semibold text-slate-700">Area of Interest *</Label>
                    <Select 
                      value={formData.interest}
                      onValueChange={(value) => setFormData({...formData, interest: value})}
                    >
                      <SelectTrigger className="h-14 text-base rounded-xl border-slate-300">
                        <SelectValue placeholder="Select your primary interest" />
                      </SelectTrigger>
                      <SelectContent className="z-50 bg-white border border-slate-200 shadow-2xl rounded-xl">
                        {interests.map(item => (
                          <SelectItem 
                            key={item.value} 
                            value={item.value}
                            className="cursor-pointer focus:bg-red-50 focus:text-red-600"
                          >
                            {item.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-16 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white text-lg font-bold rounded-xl shadow-xl shadow-red-500/30 hover:shadow-2xl hover:shadow-red-500/40 transition-all duration-300 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Submitting...
                      </span>
                    ) : (
                      'Book Free Consultation'
                    )}
                  </Button>

                  <p className="text-center text-sm text-slate-600 pt-2">
                    <span className="font-semibold">100% Free • No Obligation • Secure</span>
                  </p>
                  </form>
                  </div>
              </div>
            </motion.div>

            {/* Sidebar */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className="lg:col-span-2 space-y-6"
            >
              {/* Trust Signals */}
              <div className="bg-gradient-to-br from-white to-slate-50 rounded-2xl p-8 shadow-xl border border-slate-200/50">
                <h3 className="font-bold text-slate-900 text-xl mb-6">Why Choose Us?</h3>
                <div className="space-y-5">
                  {[
                    { icon: Shield, text: '29+ Years of Trust', color: 'from-red-500 to-red-600' },
                    { icon: Users, text: '25,00,000+ Students Trained', color: 'from-blue-500 to-blue-600' },
                    { icon: Star, text: '98% Success Rate', color: 'from-amber-500 to-amber-600' },
                    { icon: CheckCircle, text: 'MOIA Authorized', color: 'from-green-500 to-green-600' }
                  ].map((item, idx) => (
                    <motion.div 
                      key={idx}
                      className="flex items-center gap-4 group cursor-default"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + idx * 0.1 }}
                    >
                      <div className={`w-12 h-12 bg-gradient-to-br ${item.color} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <item.icon className="w-6 h-6 text-white" />
                      </div>
                      <span className="text-slate-700 font-semibold">{item.text}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Contact Info */}
              <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl p-8 text-white shadow-2xl border border-slate-700/50 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-full blur-3xl" />
                <h3 className="font-bold text-xl mb-6 relative">Need Immediate Help?</h3>
                <div className="space-y-5 relative">
                  <a href="tel:+919876543210" className="flex items-center gap-4 hover:text-red-300 transition-all duration-300 group">
                    <div className="w-11 h-11 bg-red-500/20 rounded-xl flex items-center justify-center group-hover:bg-red-500/30 transition-all">
                      <Phone className="w-5 h-5 text-red-400" />
                    </div>
                    <span className="font-medium">+91 99888 92510</span>
                  </a>
                  <a href="mailto:info@greymattersgroup.org" className="flex items-center gap-4 hover:text-red-300 transition-all duration-300 group">
                    <div className="w-11 h-11 bg-red-500/20 rounded-xl flex items-center justify-center group-hover:bg-red-500/30 transition-all">
                      <Mail className="w-5 h-5 text-red-400" />
                    </div>
                    <span className="font-medium text-sm">info@greymattersgroup.org</span>
                  </a>
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 bg-red-500/20 rounded-xl flex items-center justify-center">
                      <Clock className="w-5 h-5 text-red-400" />
                    </div>
                    <span className="font-medium">Mon-Sat: 9 AM - 6 PM</span>
                  </div>
                </div>
              </div>

              {/* What Happens Next */}
              <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 shadow-xl text-white">
                <h3 className="font-bold text-xl mb-6">What Happens Next</h3>
                <div className="space-y-4">
                  {[
                    'Free skill assessment test',
                    'Personalized study plan',
                    'Course & visa guidance',
                    'Clear next steps'
                  ].map((item, idx) => (
                    <motion.div 
                      key={idx}
                      className="flex items-start gap-3"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + idx * 0.1 }}
                    >
                      <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                      <span className="font-medium">{item}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}