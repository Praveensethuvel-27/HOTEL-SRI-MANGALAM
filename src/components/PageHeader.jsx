import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const PageHeader = ({ title, subtitle, bgImage }) => {
  return (
    <div className="relative h-[45vh] min-h-[350px] w-full flex items-center justify-center overflow-hidden bg-luxury-black pt-16">
      {/* Background Image with slight Ken Burns effect */}
      <div className="absolute inset-0 z-0">
        <motion.img
          initial={{ scale: 1.15 }}
          animate={{ scale: 1 }}
          transition={{ duration: 8, ease: 'easeOut' }}
          src={bgImage}
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/65 to-luxury-black" />
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-luxury-black to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center flex flex-col items-center mt-8">
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: '60px', opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="h-[1px] bg-gold-400 mb-4"
        />

        <motion.h1
          initial={{ y: 25, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="font-serif text-3xl sm:text-4xl md:text-5xl text-white font-bold tracking-wide mb-3 uppercase"
        >
          {title}
        </motion.h1>

        {subtitle && (
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 0.75 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="font-sans text-xs sm:text-sm text-gray-300 font-light max-w-xl mb-6 tracking-wider italic"
          >
            {subtitle}
          </motion.p>
        )}

        {/* Breadcrumbs */}
        <motion.nav
          initial={{ y: 15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex items-center gap-2 font-sans text-[10px] sm:text-xs tracking-widest uppercase text-gray-400"
        >
          <Link to="/" className="hover:text-gold-400 transition-colors duration-300">
            Home
          </Link>
          <span>/</span>
          <span className="text-gold-400 font-medium">{title}</span>
        </motion.nav>
      </div>
    </div>
  );
};

export default PageHeader;
