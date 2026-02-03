'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const articles = [
  {
    id: 1,
    title: 'The Art of Slow Travel: Why Taking Your Time is the Ultimate Luxury',
    category: 'Travel Philosophy',
    date: 'January 15, 2026',
    image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=2940&auto=format&fit=crop',
    excerpt:
      'In a world obsessed with checking off bucket lists, discover why slowing down can lead to the most profound travel experiences.',
  },
  {
    id: 2,
    title: 'Hidden Gems of Portugal: Beyond Lisbon and Porto',
    category: 'Destination Guide',
    date: 'January 8, 2026',
    image: 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?q=80&w=2940&auto=format&fit=crop',
    excerpt:
      'Explore the charming villages, pristine beaches, and vineyard-covered hills that most travelers never see.',
  },
  {
    id: 3,
    title: '2026 Travel Trends: Sustainable Luxury Takes Center Stage',
    category: 'Industry Insights',
    date: 'December 28, 2025',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2940&auto=format&fit=crop',
    excerpt:
      'How eco-conscious luxury properties are redefining what it means to travel responsibly without sacrificing comfort.',
  },
];

export default function Journal() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  return (
    <section id="journal" ref={containerRef} className="py-24 md:py-40 bg-sand-50">
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
              Travel Journal
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-[family-name:var(--font-display)] text-4xl md:text-6xl lg:text-7xl font-light text-charcoal"
            >
              Stories & <span className="italic">Inspiration</span>
            </motion.h2>
          </div>
          <motion.a
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            href="#all-articles"
            className="text-sm tracking-widest uppercase text-charcoal hover:text-gold transition-colors line-decoration self-start md:self-auto"
          >
            View All Articles
          </motion.a>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <motion.article
              key={article.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 * index }}
              className="group cursor-pointer"
            >
              {/* Image */}
              <div className="aspect-[4/3] overflow-hidden mb-6">
                <div
                  className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url('${article.image}')` }}
                />
              </div>

              {/* Meta */}
              <div className="flex items-center gap-4 mb-4">
                <span className="text-gold text-xs tracking-[0.2em] uppercase">
                  {article.category}
                </span>
                <span className="w-8 h-[1px] bg-sand-300" />
                <span className="text-slate/50 text-xs">{article.date}</span>
              </div>

              {/* Title */}
              <h3 className="font-[family-name:var(--font-display)] text-xl md:text-2xl font-light text-charcoal mb-4 group-hover:text-gold transition-colors duration-300 leading-snug">
                {article.title}
              </h3>

              {/* Excerpt */}
              <p className="text-slate/70 font-light text-sm leading-relaxed mb-6">
                {article.excerpt}
              </p>

              {/* Read More */}
              <a
                href="#"
                className="inline-flex items-center gap-2 text-sm tracking-widest uppercase text-charcoal hover:text-gold transition-colors group/link"
              >
                Read More
                <svg
                  className="w-4 h-4 transform transition-transform group-hover/link:translate-x-2"
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
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
