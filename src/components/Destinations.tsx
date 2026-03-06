'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';

const destinations = [
  {
    id: 1,
    name: 'Santorini',
    country: 'Greece',
    image: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?q=80&w=2835&auto=format&fit=crop',
    description: 'Whitewashed villages perched above crystal-clear waters',
    price: 'From $3,500',
  },
  {
    id: 2,
    name: 'Kyoto',
    country: 'Japan',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=2940&auto=format&fit=crop',
    description: 'Ancient temples and timeless traditions',
    price: 'From $4,200',
  },
  {
    id: 3,
    name: 'Banff',
    country: 'Canada',
    image: 'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?q=80&w=2940&auto=format&fit=crop',
    description: 'Emerald lakes and towering peaks in the Canadian Rockies',
    price: 'From $2,800',
  },
  {
    id: 4,
    name: 'Iceland',
    country: 'Iceland',
    image: 'https://images.unsplash.com/photo-1529963183134-61a90db47eaf?q=80&w=2940&auto=format&fit=crop',
    description: 'Land of fire, ice, and dancing northern lights',
    price: 'From $5,500',
  },
];

export default function Destinations() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <section
      id="destinations"
      ref={containerRef}
      className="py-24 md:py-40 bg-warm-white"
    >
      <div className="max-w-[1800px] mx-auto px-6 md:px-12 lg:px-20">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16 md:mb-24">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-gold text-sm tracking-[0.3em] uppercase mb-4"
            >
              Featured Destinations
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-[family-name:var(--font-display)] text-4xl md:text-6xl lg:text-7xl font-light text-charcoal"
            >
              Where Will Your
              <br />
              <span className="italic">Journey</span> Take You?
            </motion.h2>
          </div>
          <motion.a
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            href="#all-destinations"
            className="text-sm tracking-widest uppercase text-charcoal hover:text-gold transition-colors line-decoration self-start md:self-auto"
          >
            View All Destinations
          </motion.a>
        </div>

        {/* Destinations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {destinations.map((destination, index) => (
            <motion.div
              key={destination.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 * index }}
              onMouseEnter={() => setHoveredId(destination.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="group relative aspect-[4/3] md:aspect-[16/10] overflow-hidden cursor-pointer"
            >
              {/* Image */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-110"
                style={{ backgroundImage: `url('${destination.image}')` }}
              />

              {/* Overlay */}
              <div
                className={`absolute inset-0 transition-all duration-500 ${
                  hoveredId === destination.id
                    ? 'bg-charcoal/50'
                    : 'bg-gradient-to-t from-charcoal/70 via-charcoal/20 to-transparent'
                }`}
              />

              {/* Content */}
              <div className="absolute inset-0 p-6 md:p-10 flex flex-col justify-end">
                <div className="overflow-hidden">
                  <motion.span
                    className="block text-gold/80 text-sm tracking-[0.2em] uppercase mb-2"
                    animate={{ y: hoveredId === destination.id ? 0 : 0 }}
                  >
                    {destination.country}
                  </motion.span>
                </div>
                <div className="overflow-hidden">
                  <motion.h3
                    className="font-[family-name:var(--font-display)] text-3xl md:text-4xl lg:text-5xl font-light text-warm-white mb-3"
                    animate={{ y: hoveredId === destination.id ? 0 : 0 }}
                  >
                    {destination.name}
                  </motion.h3>
                </div>
                <motion.p
                  className="text-warm-white/70 font-light mb-4 max-w-md"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{
                    opacity: hoveredId === destination.id ? 1 : 0,
                    y: hoveredId === destination.id ? 0 : 20,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {destination.description}
                </motion.p>
                <div className="flex items-center justify-between">
                  {/* <span className="text-warm-white/60 text-sm font-light">
                    {destination.price}
                  </span> */}
                  <motion.div
                    className="flex items-center gap-2 text-gold text-sm tracking-widest uppercase"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{
                      opacity: hoveredId === destination.id ? 1 : 0,
                      x: hoveredId === destination.id ? 0 : -20,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    Explore
                    <svg
                      className="w-4 h-4"
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
                  </motion.div>
                </div>
              </div>

              {/* Corner Accent */}
              <div className="absolute top-0 right-0 w-20 h-20">
                <div
                  className={`absolute top-4 right-4 w-3 h-3 border-t border-r transition-all duration-500 ${
                    hoveredId === destination.id
                      ? 'border-gold w-10 h-10'
                      : 'border-warm-white/30'
                  }`}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
