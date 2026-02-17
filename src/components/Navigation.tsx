'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Destinations', href: '#destinations' },
    { name: 'About', href: '#about' },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.77, 0, 0.175, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-slate-900/90 backdrop-blur-md shadow-sm'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-[1800px] mx-auto px-6 md:px-12 lg:px-20">
          <div className="flex items-center justify-between h-20 md:h-24">
            {/* Logo - Made bolder */}
            <a
              href="#"
              style={{ fontFamily: "'Bauhaus 93', 'Bauhaus', sans-serif" }}
              className={`text-2xl md:text-3xl tracking-wide transition-colors duration-300 ${
                isScrolled ? 'text-white' : 'text-white'
              }`}
            >
              Go Pacific Travel
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-12">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index + 0.3, duration: 0.5 }}
                  className={`text-sm font-light tracking-widest uppercase transition-colors duration-300 line-decoration ${
                    isScrolled
                      ? 'text-slate-200 hover:text-emerald-400'
                      : 'text-white hover:text-emerald-300'
                  }`}
                >
                  {link.name}
                </motion.a>
              ))}
            </div>

            {/* CTA Button */}
            <motion.a
              href="#contact"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className={`hidden md:block px-6 py-3 text-sm font-light tracking-widest uppercase transition-all duration-500 ${
                isScrolled
                  ? 'bg-emerald-400 text-slate-900 hover:bg-emerald-300'
                  : 'bg-emerald-400 text-slate-900 hover:bg-emerald-300'
              }`}
            >
              Plan Your Journey
            </motion.a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden w-10 h-10 flex flex-col justify-center items-center gap-1.5"
            >
              <span
                className={`w-6 h-[1px] transition-all duration-300 ${
                  isMobileMenuOpen ? 'rotate-45 translate-y-1 bg-slate-900' : isScrolled ? 'bg-white' : 'bg-white'
                }`}
              />
              <span
                className={`w-6 h-[1px] transition-all duration-300 ${
                  isMobileMenuOpen ? 'opacity-0 bg-slate-900' : isScrolled ? 'bg-white' : 'bg-white'
                }`}
              />
              <span
                className={`w-6 h-[1px] transition-all duration-300 ${
                  isMobileMenuOpen ? '-rotate-45 -translate-y-1.5 bg-slate-900' : isScrolled ? 'bg-white' : 'bg-white'
                }`}
              />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-slate-950 pt-24"
          >
            <div className="flex flex-col items-center justify-center h-full gap-8">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 30 }}
                  transition={{ delay: 0.1 * index }}
                  className="font-[family-name:var(--font-display)] text-4xl font-light text-white hover:text-emerald-400 transition-colors"
                >
                  {link.name}
                </motion.a>
              ))}
              <motion.a
                href="#contact"
                onClick={() => setIsMobileMenuOpen(false)}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 30 }}
                transition={{ delay: 0.5 }}
                className="mt-8 px-8 py-4 bg-emerald-400 text-slate-900 text-sm tracking-widest uppercase hover:bg-emerald-300 transition-colors"
              >
                Plan Your Journey
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}