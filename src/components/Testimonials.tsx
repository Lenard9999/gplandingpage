'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';

const testimonials = [
  {
    id: 1,
    quote:
      "Go Pacific Travel transformed our honeymoon into the most magical experience of our lives. Every detail was perfect, from the private villa in Bali to the surprise sunset dinner on the beach.",
    author: 'Sarah & Michael Thompson',
    location: 'Bali, Indonesia',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=2788&auto=format&fit=crop',
  },
  {
    id: 2,
    quote:
      "As a solo traveler, I was nervous about my first big trip. The team made me feel safe and supported throughout my journey across Japan. I came back a changed person.",
    author: 'Emma Rodriguez',
    location: 'Tokyo to Kyoto, Japan',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2940&auto=format&fit=crop',
  },
  {
    id: 3,
    quote:
      "For our 25th anniversary, we wanted something special. What we got was extraordinary—a private guided tour through the Italian countryside that exceeded all our dreams.",
    author: 'Robert & Linda Chen',
    location: 'Tuscany, Italy',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2787&auto=format&fit=crop',
  },
];

export default function Testimonials() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section
      ref={containerRef}
      className="py-24 md:py-40 bg-charcoal text-warm-white relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="max-w-[1800px] mx-auto px-6 md:px-12 lg:px-20 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-24">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-gold text-sm tracking-[0.3em] uppercase mb-4"
          >
            Testimonials
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-[family-name:var(--font-display)] text-4xl md:text-6xl lg:text-7xl font-light"
          >
            Stories from Our <span className="italic text-gold">Travelers</span>
          </motion.h2>
        </div>

        {/* Testimonial Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          {/* Quote Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            {/* Large Quote Mark */}
            <div className="absolute -top-8 -left-4 text-gold/20 font-[family-name:var(--font-display)] text-[120px] md:text-[180px] leading-none">
              &ldquo;
            </div>

            <div className="relative z-10 pt-12 md:pt-16">
              <motion.blockquote
                key={testimonials[activeIndex].id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="font-[family-name:var(--font-display)] text-2xl md:text-3xl lg:text-4xl font-light leading-relaxed mb-8"
              >
                {testimonials[activeIndex].quote}
              </motion.blockquote>

              <motion.div
                key={`author-${testimonials[activeIndex].id}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="text-lg font-light mb-1">
                  {testimonials[activeIndex].author}
                </div>
                <div className="text-warm-white/50 text-sm tracking-wide">
                  {testimonials[activeIndex].location}
                </div>
              </motion.div>
            </div>

            {/* Navigation */}
            <div className="flex items-center gap-4 mt-12">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-12 h-[2px] transition-all duration-500 ${
                    index === activeIndex ? 'bg-gold' : 'bg-warm-white/30'
                  }`}
                />
              ))}
            </div>
          </motion.div>

          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="aspect-[4/5] overflow-hidden">
              <motion.div
                key={`image-${testimonials[activeIndex].id}`}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="w-full h-full bg-cover bg-center"
                style={{
                  backgroundImage: `url('${testimonials[activeIndex].image}')`,
                }}
              />
            </div>

            {/* Frame Decoration */}
            <div className="absolute -top-4 -left-4 w-24 h-24 border-t border-l border-gold/50" />
            <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b border-r border-gold/50" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
