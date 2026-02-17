'use client';

import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const stats = [
  { value: '10+', label: 'Years of Excellence' },
  { value: '50+', label: 'Countries Explored' },
  { value: '2,500+', label: 'Happy Travelers' },
  { value: '98%', label: 'Satisfaction Rate' },
];

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ['start end', 'end start'],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ['10%', '-10%']);

  return (
    <section id="about" ref={containerRef} className="py-24 md:py-40 bg-warm-white overflow-hidden">
      <div className="max-w-[1800px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          {/* Image Side */}
          <motion.div
            ref={imageRef}
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative"
          >
            {/* Main Image */}
            <div className="relative aspect-[4/5] overflow-hidden">
              <motion.div
                style={{ 
                  y: imageY,
                  backgroundImage: `url('https://images.unsplash.com/photo-1488085061387-422e29b40080?q=80&w=2831&auto=format&fit=crop')`,
                }}
                className="absolute inset-0 bg-cover bg-center scale-110"
              />
            </div>

            {/* Decorative Frame */}
            <div className="absolute -bottom-6 -right-6 w-full h-full border border-gold/30 -z-10" />

            {/* Floating Accent Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="absolute -bottom-12 -left-8 md:-left-16 w-40 md:w-56 aspect-square overflow-hidden shadow-2xl"
            >
              <div
                className="w-full h-full bg-cover bg-center"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2874&auto=format&fit=crop')`,
                }}
              />
            </motion.div>
          </motion.div>

          {/* Content Side */}
          <div className="lg:pl-12">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-gold text-sm tracking-[0.3em] uppercase mb-4"
            >
              Our Story
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-[family-name:var(--font-display)] text-4xl md:text-5xl lg:text-6xl font-light text-charcoal mb-8 leading-tight"
            >
              Crafting <span className="italic">Unforgettable</span>
              <br />
              Moments Since 1998
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6 mb-12"
            >
              <p className="text-slate font-light text-lg leading-relaxed">
                At Go Pacific Travel, we believe travel is more than just visiting
                places—it&apos;s about creating connections, discovering new perspectives,
                and collecting moments that last a lifetime.
              </p>
              <p className="text-slate/70 font-light leading-relaxed">
                Our team of passionate travel experts combines decades of experience
                with an unwavering commitment to excellence. We handpick every hotel,
                curate each experience, and ensure every detail of your journey is
                flawlessly executed.
              </p>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-8 border-t border-sand-200"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  className="text-center md:text-left"
                >
                  <div className="font-[family-name:var(--font-display)] text-3xl md:text-4xl text-charcoal mb-1">
                    {stat.value}
                  </div>
                  <div className="text-slate/60 text-sm font-light">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-12"
            >
              <a
                href="#contact"
                className="inline-flex items-center gap-3 px-8 py-4 bg-charcoal text-warm-white text-sm tracking-widest uppercase hover:bg-gold hover:text-charcoal transition-all duration-500 group"
              >
                Start Your Journey
                <svg
                  className="w-4 h-4 transform group-hover:translate-x-2 transition-transform"
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
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
