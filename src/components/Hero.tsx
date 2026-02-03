'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image with Parallax */}
      <motion.div
        style={{ y, scale }}
        className="absolute inset-0 z-0"
      >
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2821&auto=format&fit=crop')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/40 via-charcoal/20 to-warm-white" />
      </motion.div>

      {/* Floating Elements */}
      <div className="absolute top-1/4 left-10 md:left-20 float" style={{ animationDelay: '0s' }}>
        <div className="w-20 h-20 md:w-32 md:h-32 border border-gold/30 rounded-full" />
      </div>
      <div className="absolute bottom-1/4 right-10 md:right-32 float" style={{ animationDelay: '2s' }}>
        <div className="w-16 h-16 md:w-24 md:h-24 bg-gold/10 rounded-full backdrop-blur-sm" />
      </div>

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 text-center px-6 max-w-6xl mx-auto"
      >
        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-gold text-sm md:text-base tracking-[0.3em] uppercase mb-6 font-light"
        >
          Curated Travel Experiences Since 2015
        </motion.p>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="font-[family-name:var(--font-display)] text-5xl md:text-7xl lg:text-9xl font-light text-warm-white mb-8 leading-[0.9]"
        >
          Discover the
          <br />
          <span className="italic">Extraordinary</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-warm-white/80 text-lg md:text-xl font-light max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          We craft bespoke journeys to the world&apos;s most remarkable destinations,
          tailored to your dreams and desires.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="#destinations"
            className="group px-8 py-4 bg-warm-white text-charcoal text-sm tracking-widest uppercase font-medium hover:bg-gold transition-all duration-500 flex items-center justify-center gap-3"
          >
            Explore Destinations
            <svg
              className="w-4 h-4 transform group-hover:translate-x-2 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
          <a
            href="#experiences"
            className="px-8 py-4 border border-warm-white/50 text-warm-white text-sm tracking-widest uppercase font-light hover:bg-warm-white/10 transition-all duration-500"
          >
            View Experiences
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <div className="flex flex-col items-center gap-3">
          <span className="text-warm-white/60 text-xs tracking-[0.2em] uppercase">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-[1px] h-12 bg-gradient-to-b from-warm-white/60 to-transparent"
          />
        </div>
      </motion.div>
    </section>
  );
}
