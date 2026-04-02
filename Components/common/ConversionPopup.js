import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, CheckCircle, Shield } from 'lucide-react';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import { Button } from '@/Components/ui/button';
import { toast } from 'sonner';

export default function ConversionPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    interest: ''
  });

  useEffect(() => {
    console.log('🚀 ConversionPopup mounted');
    
    // Check if popup should be shown
    const popupDismissed = localStorage.getItem('gm_popup_dismissed');
    const popupSubmitted = localStorage.getItem('gm_popup_submitted');
    
    if (popupSubmitted || popupDismissed) {
      const dismissedDate = new Date(popupDismissed || popupSubmitted);
      const daysSince = (Date.now() - dismissedDate.getTime()) / (1000 * 60 * 60 * 24);
      if (daysSince < 7) {
        console.log('⏭️ Popup skipped - shown recently');
        return;
      }
    }

    // Don't show if already shown this session
    if (sessionStorage.getItem('gm_popup_shown')) {
      console.log('⏭️ Popup skipped - already shown this session');
      return;
    }

    // Show after 3 seconds (change to 25000 for production)
    const timer = setTimeout(() => {
      console.log('🎉 Showing popup NOW!');
      setIsVisible(true);
      sessionStorage.setItem('gm_popup_shown', 'true');
    }, 3000); // 3 seconds for testing

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    console.log('❌ Popup closed');
    setIsVisible(false);
    localStorage.setItem('gm_popup_dismissed', new Date().toISOString());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    console.log('📤 Submitting popup form:', formData);

    try {
      const response = await fetch('/api/popup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      console.log('📥 Response status:', response.status);

      if (response.ok) {
        localStorage.setItem('gm_popup_submitted', new Date().toISOString());
        setIsVisible(false);
        toast.success('Thank you! Our counselor will contact you within 24 hours.');
        console.log('✅ Popup submission successful');
        
        // Reset form
        setFormData({
          full_name: '',
          email: '',
          phone: '',
          interest: ''
        });
      } else {
        const errorData = await response.json();
        console.error('❌ Popup submission failed:', errorData);
        throw new Error(errorData.message || 'Submission failed');
      }
    } catch (error) {
      console.error('❌ Popup error:', error);
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

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[99998]"
            onClick={handleClose}
            style={{ position: 'fixed' }}
          />

          {/* Popup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-lg z-[99999]"
            style={{ position: 'fixed' }}
          >
            <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
              {/* Subtle texture overlay */}
              <div className="absolute inset-0 opacity-5 pointer-events-none">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:24px_24px]" />
              </div>

              {/* Close button */}
              <button
                onClick={handleClose}
                type="button"
                className="absolute top-4 right-4 z-10 p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-white/70 hover:text-white" />
              </button>

              {/* Content */}
              <div className="relative p-8 md:p-10">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-white/90 text-xs font-semibold mb-6 border border-white/20">
                  <span>🎓</span>
                  <span>Trusted Since 1997 • 2,500,000+ Students</span>
                </div>

                {/* Headline */}
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-3 leading-tight">
                  Plan Your IELTS, PTE or Immigration Success — Free
                </h2>
                <p className="text-slate-300 text-lg mb-8 leading-relaxed">
                  Get personalized guidance from senior Grey Matters counselors.<br />
                  <span className="text-slate-400">No obligation. Just clear next steps.</span>
                </p>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5 mb-6">
                  <div className="space-y-2">
                    <Label htmlFor="popup_name" className="text-white/90 font-semibold">Full Name *</Label>
                    <Input
                      id="popup_name"
                      required
                      placeholder="Enter your name"
                      value={formData.full_name}
                      onChange={(e) => setFormData({...formData, full_name: e.target.value})}
                      className="h-12 bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:bg-white/15 focus:border-white/40 rounded-xl"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="popup_email" className="text-white/90 font-semibold">Email *</Label>
                    <Input
                      id="popup_email"
                      type="email"
                      required
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="h-12 bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:bg-white/15 focus:border-white/40 rounded-xl"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="popup_phone" className="text-white/90 font-semibold">Phone Number *</Label>
                    <Input
                      id="popup_phone"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="h-12 bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:bg-white/15 focus:border-white/40 rounded-xl"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="popup_interest" className="text-white/90 font-semibold">Area of Interest *</Label>
                    <Select 
                      value={formData.interest} 
                      onValueChange={(value) => setFormData({...formData, interest: value})}
                      required
                    >
                      <SelectTrigger className="h-12 bg-white/10 border-white/20 text-white rounded-xl">
                        <SelectValue placeholder="Select your interest" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-700">
                        {interests.map(item => (
                          <SelectItem 
                            key={item.value} 
                            value={item.value}
                            className="text-white hover:bg-slate-700 focus:bg-slate-700 cursor-pointer"
                          >
                            {item.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {(formData.interest === 'ielts' || formData.interest === 'pte') && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-sm text-green-400 flex items-center gap-2"
                    >
                      <CheckCircle className="w-4 h-4" />
                      Free level assessment included
                    </motion.p>
                  )}

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-14 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white text-lg font-bold rounded-xl shadow-xl shadow-red-500/30 hover:shadow-2xl hover:shadow-red-500/40 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Submitting...
                      </span>
                    ) : (
                      'Get My Free Consultation'
                    )}
                  </Button>

                  <p className="text-center text-sm text-white/60 font-medium">
                    100% Free • No Obligation • Secure
                  </p>
                </form>

                {/* Trust signals */}
                <div className="flex flex-wrap items-center justify-center gap-6 pt-6 border-t border-white/10">
                  <div className="flex items-center gap-2 text-white/80 text-sm">
                    <Star className="w-4 h-4 text-amber-400 fill-current" />
                    <span className="font-medium">4.9/5 Rating</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/80 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="font-medium">98% Success</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/80 text-sm">
                    <Shield className="w-4 h-4 text-blue-400" />
                    <span className="font-medium">MOIA Authorized</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}