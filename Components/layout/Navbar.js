import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { createPageUrl } from '@/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown } from 'lucide-react';
import StudentLoginTransition from '@/Components/common/StudentLoginTransition';

const DEFAULT_NAV_LINKS = [
  { label: 'Home', href: 'Home' },
  {
    label: 'Courses',
    href: 'Courses',
    dropdown: [
      { label: 'IELTS Online', href: 'Courses?category=ielts' },
      { label: 'PTE Academic', href: 'Courses?category=pte' },
      { label: 'Spoken English', href: 'Courses?category=spoken_english' },
    ],
  },
  { label: 'Immigration', href: 'Immigration' },
  { label: 'Results', href: 'SuccessStories' },
  { label: 'About', href: 'About' },
  { label: 'Blog', href: 'Blog' },
  { label: 'Contact', href: 'Contact' },
];

export default function Navbar({ globalContent }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [showTransition, setShowTransition] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  const handleStudentLogin = (e) => {
    e.preventDefault();
    setShowTransition(true);
    
    // Navigate during the curtain opening animation
    setTimeout(() => {
      router.push(createPageUrl('StudentPortal') || '/');
    }, 2200);
    
    // Reset transition state after complete exit animation
    setTimeout(() => {
      setShowTransition(false);
    }, 3800);
  };

  const navLinks = globalContent?.navLinks ?? DEFAULT_NAV_LINKS;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-white/80 backdrop-blur-2xl shadow-lg border-b border-slate-900/5'
            : 'bg-white/50 backdrop-blur-md'
        }`}
      >
        <nav className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* LOGO */}
            <Link
              href={createPageUrl('Home') || '/'}
              className="flex items-center gap-3"
            >
              <img
                src="/logo.png"
                alt="Grey Matters Logo"
                className="h-18 w-auto object-contain"
              />
              <div className="flex flex-col justify-center">
                <span className="font-bold text-lg text-slate-900 leading-tight">
                  Grey Matters
                </span>
                <span className="text-xs font-semibold text-red-600 -mt-0.5">
                  Education
                </span>
              </div>
            </Link>

            {/* DESKTOP NAV */}
            <div className="hidden lg:flex flex-1 justify-center items-center gap-1">
              {navLinks.map((link) => {
                const isActive = pathname?.includes(
                  link.href.split('?')[0].toLowerCase()
                );

                return (
                  <div
                    key={link.href}
                    className="relative"
                    onMouseEnter={() =>
                      link.dropdown?.length && setActiveDropdown(link.label)
                    }
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <Link
                      href={
                        (createPageUrl(link.href.split('?')[0]) || '/') +
                        (link.href.includes('?')
                          ? '?' + link.href.split('?')[1]
                          : '')
                      }
                      className={`relative px-4 py-2.5 text-sm font-medium flex items-center gap-1 rounded-lg transition-all ${
                        isActive
                          ? 'text-slate-900'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                      }`}
                    >
                      {link.label}
                      {link.dropdown?.length > 0 && (
                        <ChevronDown className="w-3.5 h-3.5 mt-0.5" />
                      )}
                      {isActive && (
                        <motion.span
                          layoutId="navbar-indicator"
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-600 rounded-full"
                        />
                      )}
                    </Link>

                    {/* DROPDOWN */}
                    <AnimatePresence>
                      {link.dropdown?.length && activeDropdown === link.label && (
                        <motion.div
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 6 }}
                          transition={{ duration: 0.15 }}
                          className="absolute left-0 top-[calc(100%+6px)] w-56 bg-white rounded-xl shadow-xl border border-slate-100"
                        >
                          {/* Hover buffer */}
                          <div className="absolute -top-2 left-0 right-0 h-2" />

                          <div className="py-2">
                            {link.dropdown.map((item) => (
                              <Link
                                key={item.href}
                                href={
                                  (createPageUrl(item.href.split('?')[0]) || '/') +
                                  (item.href.includes('?')
                                    ? '?' + item.href.split('?')[1]
                                    : '')
                                }
                                className="block px-4 py-2.5 text-sm text-slate-700 hover:bg-red-50 hover:text-red-600 transition-colors"
                              >
                                {item.label}
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

            {/* CTA */}
            <div className="hidden lg:flex items-center gap-3">
              <button
                onClick={handleStudentLogin}
                className="px-5 py-2.5 text-sm text-slate-700 font-semibold border-2 border-slate-900 rounded-full hover:bg-slate-900 hover:text-white transition"
              >
                Student Login
              </button>
              <Link
                href={createPageUrl('BookConsultation') || '/'}
                className="px-6 py-2.5 bg-red-600 text-white text-sm font-bold rounded-full hover:bg-red-700 shadow-lg shadow-red-600/30 transition"
              >
                Book Free Consultation
              </Link>
            </div>

            {/* MOBILE TOGGLE */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-slate-100 ml-auto"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* MOBILE MENU */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="lg:hidden bg-white border-t rounded-b-2xl shadow-lg overflow-hidden"
              >
                <div className="py-4 space-y-1">
                  {navLinks.map((link) => {
                    const isActive = pathname?.includes(
                      link.href.split('?')[0].toLowerCase()
                    );
                    return (
                      <Link
                        key={link.href}
                        href={createPageUrl(link.href) || '/'}
                        className={`block px-6 py-3 text-base font-medium relative ${
                          isActive
                            ? 'text-red-600 bg-red-50'
                            : 'text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        {link.label}
                        {isActive && (
                          <span className="absolute left-0 top-0 bottom-0 w-1 bg-red-600 rounded-r-full" />
                        )}
                      </Link>
                    );
                  })}

                  <div className="px-6 pt-4 pb-2 space-y-3 border-t mt-4">
                    <button
                      onClick={handleStudentLogin}
                      className="block w-full px-5 py-3 text-center text-sm font-semibold border-2 border-slate-900 rounded-full hover:bg-slate-900 hover:text-white transition"
                    >
                      Student Login
                    </button>
                    <Link
                      href={createPageUrl('BookConsultation') || '/'}
                      className="block w-full px-6 py-3 bg-red-600 text-white text-center text-sm font-bold rounded-full hover:bg-red-700 shadow-lg shadow-red-600/30 transition"
                    >
                      Book Free Consultation
                    </Link>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </header>

      {/* Student Login Transition */}
      <StudentLoginTransition visible={showTransition} />
    </>
  );
}