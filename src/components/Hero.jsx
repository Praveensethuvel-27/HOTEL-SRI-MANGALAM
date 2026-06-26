import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

const Hero = () => {
  return (
    <section
      id="home"
      className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-luxury-black"
    >
      {/* BG Image with Ken Burns zoom */}
      <div className="absolute inset-0 z-0">
        <motion.img
          initial={{ scale: 1.18 }}
          animate={{ scale: 1.0 }}
          transition={{ duration: 12, ease: 'easeOut' }}
          src="/images/pic1.jpg"
          alt="Mangalam Residency Exterior"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/88 via-black/60 to-black/30" />
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-luxury-black to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 text-center flex flex-col items-center">

        {/* Logo pulse on hero */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          className="mb-6"
        >
          <motion.img
            src={logo}
            alt="Mangalam Residency"
            animate={{ scale: [1, 1.06, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="w-20 h-20 md:w-24 md:h-24 object-contain drop-shadow-[0_0_20px_rgba(197,168,128,0.6)] mx-auto"
          />
        </motion.div>

        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: '80px', opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="h-[1px] bg-gold-400 mb-5"
        />

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 0.9 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-sans text-[11px] md:text-sm tracking-[0.4em] uppercase text-gold-400 font-semibold mb-4"
        >
          Welcome to Mangalam Residency
        </motion.p>

        <motion.h1
          initial={{ y: 35, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.55 }}
          className="font-serif text-3xl sm:text-4xl md:text-6xl text-white font-bold leading-tight tracking-wide mb-6 max-w-4xl"
        >
          Experience Comfort, Luxury &{' '}
          <span className="font-serif italic text-gold-300">Exceptional</span>{' '}
          Hospitality
        </motion.h1>

        <motion.p
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 0.8 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="font-sans text-sm sm:text-base md:text-lg text-gray-300 font-light max-w-2xl leading-relaxed mb-10 tracking-wide"
        >
          Located in Kariapatti, Tamil Nadu — a tranquil escape offering premium suites,
          grand event venue, and bespoke concierge services tailored to perfection.
        </motion.p>

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.85 }}
          className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full sm:w-auto"
        >
          <Link
            to="/booking"
            className="px-8 py-4 bg-gold-400 hover:bg-gold-500 text-luxury-black font-semibold font-sans text-xs tracking-widest uppercase rounded-sm transition-all duration-300 shadow-lg hover:shadow-[0_0_20px_rgba(197,168,128,0.5)] transform hover:-translate-y-0.5"
          >
            Book Your Stay
          </Link>
          <Link
            to="/about"
            className="px-8 py-4 border border-white/40 hover:border-gold-400 text-white hover:text-gold-400 font-semibold font-sans text-xs tracking-widest uppercase rounded-sm transition-all duration-300 backdrop-blur-sm bg-white/5 transform hover:-translate-y-0.5"
          >
            Explore Hotel
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <span className="font-sans text-[9px] tracking-[0.25em] uppercase text-gray-500">Scroll</span>
        <div className="w-[18px] h-[30px] border border-gray-600 rounded-full flex justify-center p-[4px]">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="w-[4px] h-[6px] bg-gold-400 rounded-full"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
