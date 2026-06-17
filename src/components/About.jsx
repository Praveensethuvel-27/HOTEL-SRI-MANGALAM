import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiAward, FiUsers, FiClock, FiHeart } from 'react-icons/fi';

// Counter Helper Component
const Counter = ({ target, duration = 2, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const end = parseInt(target);
    if (start === end) return;

    const totalMiliseconds = duration * 1000;
    const incrementTime = Math.max(Math.floor(totalMiliseconds / end), 15);
    
    const timer = setInterval(() => {
      start += Math.ceil(end / (totalMiliseconds / incrementTime));
      if (start >= end) {
        clearInterval(timer);
        setCount(end);
      } else {
        setCount(start);
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [isInView, target, duration]);

  return (
    <span ref={ref} className="font-serif text-3xl md:text-5xl font-bold text-gold-400">
      {count.toLocaleString()}{suffix}
    </span>
  );
};

const About = ({ hideTitle = false }) => {
  return (
    <section id="about" className="py-24 bg-luxury-charcoal relative overflow-hidden">
      {/* Decorative Background Accents */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-gold-400/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-gold-400/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Title */}
        {!hideTitle && (
          <div className="text-center mb-16">
            <span className="font-sans text-xs md:text-sm tracking-[0.3em] uppercase text-gold-400 font-semibold block mb-3">
              Since 2011
            </span>
            <h2 className="font-serif text-3xl md:text-5xl text-white font-bold tracking-wide uppercase">
              About Hotel Sri Mangalam
            </h2>
            <div className="w-16 h-[1px] bg-gold-400 mx-auto mt-4" />
          </div>
        )}

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="flex flex-col gap-8"
          >
            <div>
              <h3 className="font-serif text-2xl text-gold-300 font-semibold mb-4 italic">
                A Heritage of Luxury & Refined Service
              </h3>
              <p className="font-sans text-gray-300 leading-relaxed font-light mb-4 text-sm md:text-base">
                Located in the heart of the city, Hotel Sri Mangalam has stood as a beacon of unmatched hospitality and elegant living. We provide our guests with an immersive luxury experience where traditional service meets modern convenience.
              </p>
              <p className="font-sans text-gray-300 leading-relaxed font-light text-sm md:text-base">
                From our intricately designed lobby to our bespoke premium suites, every detail has been curated to offer you a stay that feels both grand and intensely personal. We strive to create lasting memories for both corporate professionals and vacationing families.
              </p>
            </div>

            {/* Vision & Mission Tabular Block */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-5 bg-luxury-gray/40 border border-gold-400/10 rounded-sm">
                <h4 className="font-serif text-gold-400 font-bold uppercase text-xs tracking-wider mb-2">
                  Our Vision
                </h4>
                <p className="font-sans text-gray-400 text-xs md:text-sm leading-relaxed font-light">
                  To be recognized globally as the gold standard of hospitality, combining cultural elegance with modern luxury.
                </p>
              </div>
              <div className="p-5 bg-luxury-gray/40 border border-gold-400/10 rounded-sm">
                <h4 className="font-serif text-gold-400 font-bold uppercase text-xs tracking-wider mb-2">
                  Our Mission
                </h4>
                <p className="font-sans text-gray-400 text-xs md:text-sm leading-relaxed font-light">
                  To provide outstanding services, create impeccable guest environments, and cultivate true customer relationships.
                </p>
              </div>
            </div>

            {/* Why Choose Us */}
            <div>
              <h4 className="font-serif text-lg text-white font-semibold mb-3">
                Why Discerning Guests Choose Us
              </h4>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 font-sans text-xs md:text-sm text-gray-300 font-light">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-gold-400 rounded-full" />
                  Premium City Center Location
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-gold-400 rounded-full" />
                  24/7 Dedicated Concierge Care
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-gold-400 rounded-full" />
                  Multi-Cuisine Fine Dining
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-gold-400 rounded-full" />
                  Fully-Integrated Smart Rooms
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Luxury Reception Welcome Image Area */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="relative flex justify-center lg:justify-end"
          >
            {/* Background gold border frame decoration */}
            <div className="absolute -bottom-4 -left-4 w-full h-full border border-gold-400/30 -z-0 translate-x-4 translate-y-4 max-w-[480px] lg:max-w-[440px] xl:max-w-[500px]" />
            
            {/* The Image */}
            <div className="relative z-10 overflow-hidden shadow-2xl border border-luxury-gray max-w-[480px] lg:max-w-[440px] xl:max-w-[500px]">
              <img
                src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=800&auto=format&fit=crop"
                alt="Sri Mangalam Hospitality Team"
                className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>

            {/* Subtle Overlay badge */}
            <div className="absolute -top-6 -right-2 md:right-2 lg:-right-4 z-20 glass-effect p-4 shadow-xl border border-gold-400/30 max-w-[150px]">
              <p className="font-serif text-gold-400 font-bold text-center text-xs tracking-wider uppercase mb-1">
                Luxury Standard
              </p>
              <p className="font-sans text-[10px] text-gray-400 text-center uppercase tracking-widest">
                Five Star Rated
              </p>
            </div>
          </motion.div>
        </div>

        {/* Counter Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 pt-12 border-t border-luxury-light-gray">
          {/* Stat Item 1 */}
          <div className="flex flex-col items-center p-6 bg-luxury-black/40 border border-gold-400/10 rounded-sm text-center">
            <div className="text-gold-400 text-3xl mb-3">
              <FiUsers />
            </div>
            <Counter target="15000" suffix="+" />
            <span className="font-sans text-[10px] md:text-xs tracking-widest uppercase text-gray-400 mt-2 font-medium">
              Happy Guests
            </span>
          </div>

          {/* Stat Item 2 */}
          <div className="flex flex-col items-center p-6 bg-luxury-black/40 border border-gold-400/10 rounded-sm text-center">
            <div className="text-gold-400 text-3xl mb-3">
              <FiAward />
            </div>
            <Counter target="120" suffix="+" />
            <span className="font-sans text-[10px] md:text-xs tracking-widest uppercase text-gray-400 mt-2 font-medium">
              Luxury Rooms
            </span>
          </div>

          {/* Stat Item 3 */}
          <div className="flex flex-col items-center p-6 bg-luxury-black/40 border border-gold-400/10 rounded-sm text-center">
            <div className="text-gold-400 text-3xl mb-3">
              <FiClock />
            </div>
            <Counter target="15" suffix="+" />
            <span className="font-sans text-[10px] md:text-xs tracking-widest uppercase text-gray-400 mt-2 font-medium">
              Years of Service
            </span>
          </div>

          {/* Stat Item 4 */}
          <div className="flex flex-col items-center p-6 bg-luxury-black/40 border border-gold-400/10 rounded-sm text-center">
            <div className="text-gold-400 text-3xl mb-3">
              <FiHeart />
            </div>
            <Counter target="99" suffix="%" />
            <span className="font-sans text-[10px] md:text-xs tracking-widest uppercase text-gray-400 mt-2 font-medium">
              Satisfaction
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
