import React from 'react';
import Link from 'next/link';
import { createPageUrl } from '@/utils';
import {
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube
} from 'lucide-react';

export default function Footer() {
  const quickLinks = [
    { label: 'About Us', href: 'About' },
    { label: 'IELTS Online', href: 'Courses?category=ielts' },
    { label: 'PTE Academic', href: 'Courses?category=pte' },
    { label: 'Immigration', href: 'Immigration' },
    { label: 'Success Stories', href: 'SuccessStories' },
    { label: 'Blog', href: 'Blog' }
  ];

  const destinations = [
    'Canada',
    'Australia',
    'UK',
    'USA',
    'New Zealand',
    'Germany'
  ];

  const handleComingSoon = (e, platform) => {
    e.preventDefault();
    alert(`${platform} is coming soon. Stay tuned!`);
  };

  const socialLinks = [
    {
      icon: Facebook,
      href: 'https://www.facebook.com/greymatterschandigarh',
      label: 'Facebook',
      external: true
    },
    {
      icon: Instagram,
      href: 'https://www.instagram.com/greymattersindia/',
      label: 'Instagram',
      external: true
    },
    {
      icon: Youtube,
      href: 'https://www.youtube.com/@GREYMATTERSCHANDIGARH',
      label: 'YouTube',
      external: true
    },
    {
      icon: Twitter,
      href: '#',
      label: 'Twitter',
      comingSoon: true
    },
    {
      icon: Linkedin,
      href: '#',
      label: 'LinkedIn',
      comingSoon: true
    }
  ];

  return (
    <footer className="bg-slate-900 text-white">
      {/* MAIN FOOTER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* BRAND */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <img
                src="/logo.png"
                alt="Grey Matters Logo"
                className="h-12 w-auto object-contain"
              />
              <div className="flex flex-col">
                <span className="font-bold text-lg text-white leading-tight">
                  Grey Matters
                </span>
                <span className="text-xs font-semibold text-red-400 -mt-0.5">
                  Education
                </span>
              </div>
            </div>

            <p className="text-slate-400 leading-relaxed">
              India&apos;s #1 IELTS, PTE & Immigration brand since 1997.
              Building global futures through expert-led education and trusted
              guidance.
            </p>

            {/* SOCIAL LINKS */}
            <div className="flex gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;

                if (social.comingSoon) {
                  return (
                    <a
                      key={social.label}
                      href="#"
                      onClick={(e) => handleComingSoon(e, social.label)}
                      title="Coming soon"
                      className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center text-slate-500 cursor-not-allowed hover:bg-slate-700 transition"
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  );
                }

                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
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
                    href={
                      (createPageUrl(link.href.split('?')[0]) || '/') +
                      (link.href.includes('?')
                        ? '?' + link.href.split('?')[1]
                        : '')
                    }
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
                <span className="text-slate-400">
                  S.C.O. 63–64, Sector 17,
                  <br />
                  Chandigarh – 160017, India
                </span>
              </li>

              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-red-500" />
                <a
                  href="tel:+919988892587"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  +91 99888 92587
                </a>
              </li>

              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-red-500" />
                <a
                  href="mailto:info@greymattersgroup.org"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  info@greymattersgroup.org
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
                © {new Date().getFullYear()} Grey Matters Online. All rights
                reserved.
              </p>
              <span className="hidden md:inline text-slate-700">•</span>
              <p className="text-slate-600 text-sm flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                Trusted since 1997
              </p>
            </div>

            <div className="flex items-center gap-6 text-sm">
              <a
                href="#"
                className="text-slate-500 hover:text-white transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-slate-500 hover:text-white transition-colors"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-slate-500 hover:text-white transition-colors"
              >
                Refund Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
