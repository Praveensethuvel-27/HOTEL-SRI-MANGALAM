import React from 'react';
import { motion } from 'framer-motion';
import { FaCrown } from 'react-icons/fa';
import logo from '../assets/logo.png';
import lobbyBg from '../assets/lobby_bg.jpg';

const Loader = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.9, ease: 'easeInOut' } }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-luxury-black overflow-hidden"
    >
      {/* ── ACTUAL LOBBY WALL BACKGROUND TEXTURE ── */}
      <div className="absolute inset-0 z-0">
        <img
          src={lobbyBg}
          alt="Hotel Sri Mangalam Lobby Wall"
          className="w-full h-full object-cover opacity-25 filter blur-[2px] scale-105"
        />
        {/* Dark luxury vignette overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/85 to-luxury-black" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent to-black/90" />
      </div>

      {/* ── LUXURY MOVING BACKGROUND AURA ── */}
      <motion.div
        animate={{
          scale: [1, 1.25, 0.9, 1.15, 1],
          x: [-20, 30, -40, 20, -20],
          y: [-30, 20, 50, -40, -30],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute w-[450px] h-[450px] rounded-full bg-gold-400/10 blur-[120px] pointer-events-none z-1"
      />

      <div className="flex flex-col items-center max-w-md px-4 text-center relative z-10">
        
        {/* ── LOGO WITH OPTION 1: CINEMATIC BLUR-TO-FOCUS & GOLD SHIMMER ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, filter: 'blur(15px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{
            duration: 1.8,
            ease: 'easeOut',
          }}
          className="mb-6 relative overflow-hidden rounded-full p-2"
        >
          {/* Circular Gold Outline with slow rotation */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0 rounded-full border border-dashed border-gold-400/20"
          />

          {/* Golden Shimmer Sweep Line */}
          <motion.div
            animate={{ x: ['-120%', '220%'] }}
            transition={{
              duration: 2.2,
              repeat: Infinity,
              repeatDelay: 1.0,
              ease: 'easeInOut',
            }}
            className="absolute top-0 bottom-0 w-1/3 bg-gradient-to-r from-transparent via-gold-300/35 to-transparent -skew-x-20 pointer-events-none z-20"
          />

          {/* The logo image itself */}
          <img
            src={logo}
            alt="Hotel Sri Mangalam Logo"
            className="w-36 h-36 md:w-44 md:h-44 object-contain drop-shadow-[0_0_30px_rgba(197,168,128,0.4)] relative z-10"
          />
        </motion.div>

        {/* ── ESTD TAG & DIVIDER ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="flex items-center gap-2 mb-2"
        >
          <div className="w-6 h-[1px] bg-gold-400/50" />
          <span className="font-sans text-[8px] tracking-[0.3em] uppercase text-gold-300">ESTD 2011</span>
          <div className="w-6 h-[1px] bg-gold-400/50" />
        </motion.div>

        {/* Hotel Name */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8, ease: 'easeOut' }}
          className="font-serif text-2xl md:text-3xl tracking-[0.2em] uppercase text-gold-400 font-bold mb-1"
        >
          Hotel Sri Mangalam
        </motion.h1>

        {/* Location Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="font-sans text-[10px] md:text-xs tracking-[0.35em] uppercase text-gray-400 mb-4"
        >
          Kariapatti · Tamil Nadu
        </motion.p>

        {/* Secondary Welcome Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 0.45 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="font-sans text-[8px] md:text-[9px] tracking-[0.4em] uppercase text-gold-300 mb-8 italic"
        >
          Experience Exceptional Hospitality
        </motion.p>

        {/* Shimmer Loading Bar */}
        <div className="w-52 h-[2px] bg-luxury-gray rounded-full overflow-hidden relative">
          <motion.div
            animate={{ left: ['-60%', '110%'] }}
            transition={{ repeat: Infinity, duration: 1.4, ease: 'easeInOut' }}
            className="absolute top-0 bottom-0 w-1/2 bg-gradient-to-r from-transparent via-gold-400 to-transparent"
            style={{ left: '-60%' }}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default Loader;
