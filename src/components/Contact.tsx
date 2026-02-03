'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';

export default function Contact() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    destination: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
  };

  return (
    <section
      id="contact"
      ref={containerRef}
      className="py-24 md:py-40 bg-warm-white relative overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2940&auto=format&fit=crop')`,
          }}
        />
      </div>

      <div className="max-w-[1800px] mx-auto px-6 md:px-12 lg:px-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left Side - Content */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-gold text-sm tracking-[0.3em] uppercase mb-4"
            >
              Start Your Journey
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-[family-name:var(--font-display)] text-4xl md:text-5xl lg:text-6xl font-light text-charcoal mb-8 leading-tight"
            >
              Ready to <span className="italic">Explore</span>?
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-slate font-light text-lg leading-relaxed mb-12 max-w-lg"
            >
              Let us help you plan your next adventure. Our travel experts are
              ready to craft a bespoke journey tailored to your dreams.
            </motion.p>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="space-y-6"
            >
              <div className="flex items-start gap-4">
                <div className="text-gold mt-1">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <div className="text-charcoal font-medium mb-1">Visit Us</div>
                  <div className="text-slate/70 font-light text-sm">
                    123 Explorer's Lane, Suite 400
                    <br />
                    New York, NY 10001
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="text-gold mt-1">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <div className="text-charcoal font-medium mb-1">Email Us</div>
                  <div className="text-slate/70 font-light text-sm">
                    hello@wanderlustandco.com
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="text-gold mt-1">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <div className="text-charcoal font-medium mb-1">Call Us</div>
                  <div className="text-slate/70 font-light text-sm">
                    +1 (555) 123-4567
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Side - Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <form onSubmit={handleSubmit} className="bg-sand-50 p-8 md:p-12">
              <div className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm tracking-wide text-charcoal mb-2"
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-warm-white border border-sand-200 text-charcoal font-light focus:outline-none focus:border-gold transition-colors"
                    placeholder="John Smith"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm tracking-wide text-charcoal mb-2"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-warm-white border border-sand-200 text-charcoal font-light focus:outline-none focus:border-gold transition-colors"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label
                    htmlFor="destination"
                    className="block text-sm tracking-wide text-charcoal mb-2"
                  >
                    Dream Destination
                  </label>
                  <select
                    id="destination"
                    value={formData.destination}
                    onChange={(e) =>
                      setFormData({ ...formData, destination: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-warm-white border border-sand-200 text-charcoal font-light focus:outline-none focus:border-gold transition-colors"
                  >
                    <option value="">Select a region</option>
                    <option value="europe">Europe</option>
                    <option value="asia">Asia</option>
                    <option value="africa">Africa</option>
                    <option value="americas">The Americas</option>
                    <option value="oceania">Oceania</option>
                    <option value="undecided">Surprise Me</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm tracking-wide text-charcoal mb-2"
                  >
                    Tell Us About Your Dream Trip
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-warm-white border border-sand-200 text-charcoal font-light focus:outline-none focus:border-gold transition-colors resize-none"
                    placeholder="What does your perfect journey look like?"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full px-8 py-4 bg-charcoal text-warm-white text-sm tracking-widest uppercase hover:bg-gold hover:text-charcoal transition-all duration-500"
                >
                  Begin Your Adventure
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
