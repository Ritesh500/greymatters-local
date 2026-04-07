import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { createPageUrl } from '@/utils';
import { Phone, Mail, MapPin, Clock, MessageCircle, ArrowRight, Send, Globe, CheckCircle } from 'lucide-react';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Textarea } from '@/Components/ui/textarea';
import SectionHeading from '@/Components/common/SectionHeading';
import { toast } from 'sonner';
import { getContent } from '@/lib/content';

const CONTACT_ICONS = [Phone, Mail, MessageCircle, MapPin];

export async function getServerSideProps() {
  const content = getContent('contact');
  return { props: { content } };
}

export default function Contact({ content }) {
  const c = content || {};
  const hero = c.hero || {};
  const contactMethods = c.contactMethods || [
    { title: 'Call Us', details: ['+91 99888 92587', '+91 99888 92510'], actionText: 'Call Now', actionHref: 'tel:+919988892587' },
    { title: 'Email Us', details: ['info@greymattersgroup.org', 'support@greymattersgroup.org'], actionText: 'Send Email', actionHref: 'mailto:info@greymattersgroup.org' },
    { title: 'WhatsApp', details: ['+91 99888 92510', 'Quick responses guaranteed'], actionText: 'Chat Now', actionHref: 'https://wa.me/919988892510' },
    { title: 'Visit Us', details: ['S.C.O. 63-64, Sector 17C', 'Chandigarh - 160017'], actionText: 'Get Directions', actionHref: 'https://maps.app.goo.gl/3D1Z9GArs92jZ2NR6' },
  ];
  const offices = c.offices || [];
  const wh = c.workingHours || { weekdays: 'Monday - Saturday', weekdaysTime: '9:00 AM - 6:00 PM', online: 'Online Support', onlineTime: '24/7 Available' };

  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setIsSubmitted(true);
        toast.success("Message sent successfully! We'll get back to you soon.");
        setTimeout(() => {
          setIsSubmitted(false);
          setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
        }, 3000);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Submission failed');
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again or call us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-3xl mx-auto">
            <span className="inline-block px-4 py-1.5 bg-red-500/20 text-red-300 text-sm font-semibold rounded-full mb-6">
              {hero.badge ?? "We're Here to Help"}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              {hero.heading ?? 'Get in'} <span className="text-red-400">{hero.headingHighlight ?? 'Touch'}</span>
            </h1>
            <p className="text-xl text-slate-300 leading-relaxed">{hero.description}</p>
          </motion.div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactMethods.map((method, index) => {
              const Icon = CONTACT_ICONS[index % CONTACT_ICONS.length];
              const details = Array.isArray(method.details) ? method.details : [];
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-slate-50 rounded-2xl p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="w-14 h-14 bg-red-100 rounded-xl flex items-center justify-center mb-4">
                    <Icon className="w-7 h-7 text-red-600" />
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2">{method.title}</h3>
                  {details.map((detail, idx) => <p key={idx} className="text-slate-600 text-sm">{detail}</p>)}
                  <a
                    href={method.actionHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-red-600 font-medium text-sm mt-4 hover:gap-2 transition-all"
                  >
                    {method.actionText}
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Form and Map */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="bg-white rounded-3xl p-10 shadow-xl border border-slate-200/50">
                <h2 className="text-3xl font-bold text-slate-900 mb-2">Send Us a Message</h2>
                <p className="text-slate-600 mb-8">We&apos;ll get back to you within 24 hours</p>
                {isSubmitted ? (
                  <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">Message Sent!</h3>
                    <p className="text-slate-600">We&apos;ll get back to you within 24 hours.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-sm font-semibold text-slate-700">Full Name *</Label>
                        <Input id="name" required placeholder="Your name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="h-12 text-base rounded-xl border-slate-300 focus:border-red-500 focus:ring-red-500" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm font-semibold text-slate-700">Email *</Label>
                        <Input id="email" type="email" required placeholder="your@email.com" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="h-12 text-base rounded-xl border-slate-300 focus:border-red-500 focus:ring-red-500" />
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-sm font-semibold text-slate-700">Phone</Label>
                        <Input id="phone" placeholder="+91 98765 43210" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="h-12 text-base rounded-xl border-slate-300 focus:border-red-500 focus:ring-red-500" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="subject" className="text-sm font-semibold text-slate-700">Subject *</Label>
                        <Input id="subject" required placeholder="How can we help?" value={formData.subject} onChange={(e) => setFormData({ ...formData, subject: e.target.value })} className="h-12 text-base rounded-xl border-slate-300 focus:border-red-500 focus:ring-red-500" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-sm font-semibold text-slate-700">Message *</Label>
                      <Textarea id="message" required placeholder="Tell us more about your query..." rows={5} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className="text-base rounded-xl border-slate-300 focus:border-red-500 focus:ring-red-500 resize-none" />
                    </div>
                    <Button type="submit" disabled={isSubmitting} className="w-full h-14 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white text-lg font-semibold rounded-xl shadow-lg shadow-red-500/30 hover:shadow-xl hover:shadow-red-500/40 transition-all duration-300">
                      {isSubmitting ? (
                        <span className="flex items-center justify-center gap-2">
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Sending...
                        </span>
                      ) : (<>Send Message <Send className="w-5 h-5 ml-2" /></>)}
                    </Button>
                  </form>
                )}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} id="map">
              <div className="bg-white rounded-3xl overflow-hidden shadow-xl border border-slate-200/50 h-full min-h-[600px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15377.989042362035!2d76.7720592254432!3d30.73981625128189!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390feda6178c691f%3A0xb0ca4769b7172c64!2sGrey%20Matters!5e1!3m2!1sen!2sin!4v1769575551574!5m2!1sen!2sin"
                  width="100%" height="100%"
                  style={{ border: 0, minHeight: '600px' }}
                  allowFullScreen="" loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-3xl"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Offices */}
      {offices.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading eyebrow="Our Locations" title="Visit Our Offices" description="We have offices across India to serve you better" />
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {offices.map((office, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-slate-50 rounded-2xl p-6 hover:shadow-lg transition-shadow"
                >
                  <h3 className="font-bold text-slate-900 mb-2">{office.city}</h3>
                  <p className="text-slate-600 text-sm mb-2">{office.address}</p>
                  <a href={`tel:${office.phone}`} className="text-red-600 text-sm font-medium hover:text-red-700">{office.phone}</a>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Working Hours */}
      <section className="py-16 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-2">Working Hours</h3>
              <p className="text-slate-400">We&apos;re available to assist you</p>
            </div>
            <div className="flex flex-wrap gap-8">
              <div className="flex items-center gap-3">
                <Clock className="w-6 h-6 text-red-400" />
                <div>
                  <p className="font-semibold">{wh.weekdays}</p>
                  <p className="text-slate-400 text-sm">{wh.weekdaysTime}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Globe className="w-6 h-6 text-red-400" />
                <div>
                  <p className="font-semibold">{wh.online}</p>
                  <p className="text-slate-400 text-sm">{wh.onlineTime}</p>
                </div>
              </div>
            </div>
            <Link
              href={createPageUrl('BookConsultation') || '/'}
              className="inline-flex items-center gap-2 px-8 py-4 bg-red-600 text-white font-semibold rounded-full hover:bg-red-700 transition-colors shadow-lg hover:shadow-xl"
            >
              Book Consultation <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
