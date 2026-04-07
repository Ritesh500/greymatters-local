import React from 'react';
import Link from 'next/link';
import { createPageUrl } from '@/utils';
import { Mail, Phone, MapPin, ArrowRight, Facebook, Twitter, Instagram, Linkedin, Youtube } from 'lucide-react';

const SOCIAL_ICON_MAP = { Facebook, Instagram, YouTube: Youtube, Twitter, LinkedIn: Linkedin };

const DEFAULT_FOOTER = {
  description: "India's #1 IELTS, PTE & Immigration brand since 1997. Building global futures through expert-led education and trusted guidance.",
  address: 'S.C.O. 63–64, Sector 17, Chandigarh – 160017, India',
  phone: '+91 99888 92587',
  email: 'info@greymattersgroup.org',
  destinations: ['Canada', 'Australia', 'UK', 'USA', 'New Zealand', 'Germany'],
  socialLinks: [
    { platform: 'Facebook', href: 'https://www.facebook.com/greymatterschandigarh', active: true },
    { platform: 'Instagram', href: 'https://www.instagram.com/greymattersindia/', active: true },
    { platform: 'YouTube', href: 'https://www.youtube.com/@GREYMATTERSCHANDIGARH', active: true },
    { platform: 'Twitter', href: '#', active: false },
    { platform: 'LinkedIn', href: '#', active: false },
  ],
};

const quickLinks = [
  { label: 'About Us', href: 'About' },
  { label: 'IELTS Online', href: 'Courses?category=ielts' },
  { label: 'PTE Academic', href: 'Courses?category=pte' },
  { label: 'Immigration', href: 'Immigration' },
  { label: 'Success Stories', href: 'SuccessStories' },
  { label: 'Blog', href: 'Blog' },
];

export default function Footer({ globalContent }) {
  const footer = globalContent?.footer || DEFAULT_FOOTER;
  const description = footer.description ?? DEFAULT_FOOTER.description;
  const address = footer.address ?? DEFAULT_FOOTER.address;
  const phone = footer.phone ?? DEFAULT_FOOTER.phone;
  const email = footer.email ?? DEFAULT_FOOTER.email;
  const destinations = footer.destinations ?? DEFAULT_FOOTER.destinations;
  const socialLinks = footer.socialLinks ?? DEFAULT_FOOTER.socialLinks;

  const handleComingSoon = (e, platform) => {
    e.preventDefault();
    alert(`${platform} is coming soon. Stay tuned!`);
  };

  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* BRAND */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <img src="/logo.png" alt="Grey Matters Logo" className="h-12 w-auto object-contain" />
              <div className="flex flex-col">
                <span className="font-bold text-lg text-white leading-tight">Grey Matters</span>
                <span className="text-xs font-semibold text-red-400 -mt-0.5">Education</span>
              </div>
            </div>
            <p className="text-slate-400 leading-relaxed">{description}</p>

            <div className="flex gap-3">
              {socialLinks.map((social) => {
                const Icon = SOCIAL_ICON_MAP[social.platform] || Facebook;
                if (!social.active) {
                  return (
                    <a
                      key={social.platform}
                      href="#"
                      onClick={(e) => handleComingSoon(e, social.platform)}
                      title="Coming soon"
                      className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center text-slate-500 cursor-not-allowed hover:bg-slate-700 transition"
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  );
                }
                return (
                  <a
                    key={social.platform}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.platform}
                    className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center text-slate-400 hover:bg-red-600 hover:text-white transition-all duration-300"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h4 className="font-semibold text-lg mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={(createPageUrl(link.href.split('?')[0]) || '/') + (link.href.includes('?') ? '?' + link.href.split('?')[1] : '')}
                    className="text-slate-400 hover:text-white transition-colors flex items-center gap-2 group"
                  >
                    <ArrowRight className="w-4 h-4 opacity-0 -ml-6 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* STUDY DESTINATIONS */}
          <div>
            <h4 className="font-semibold text-lg mb-6">Study Destinations</h4>
            <ul className="space-y-3">
              {destinations.map((country) => (
                <li key={country}>
                  <Link
                    href={createPageUrl('Immigration') || '/'}
                    className="text-slate-400 hover:text-white transition-colors flex items-center gap-2 group"
                  >
                    <ArrowRight className="w-4 h-4 opacity-0 -ml-6 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    Study in {country}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h4 className="font-semibold text-lg mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                <span className="text-slate-400" style={{ whiteSpace: 'pre-line' }}>{address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-red-500" />
                <a href={`tel:${phone.replace(/\s/g, '')}`} className="text-slate-400 hover:text-white transition-colors">
                  {phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-red-500" />
                <a href={`mailto:${email}`} className="text-slate-400 hover:text-white transition-colors">
                  {email}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
              <p className="text-slate-500 text-sm">
                © {new Date().getFullYear()} Grey Matters Online. All rights reserved.
              </p>
              <span className="hidden md:inline text-slate-700">•</span>
              <p className="text-slate-600 text-sm flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                Trusted since 1997
              </p>
            </div>
            <div className="flex items-center gap-6 text-sm">
              <a href="#" className="text-slate-500 hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="text-slate-500 hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="text-slate-500 hover:text-white transition-colors">Refund Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
