import React from 'react';
import { useLocation } from 'react-router-dom';
import { FaWhatsapp } from 'react-icons/fa';

const WhatsAppButton = () => {
  const location = useLocation();

  // Hide WhatsApp floating button on Admin Panel pages
  if (location.pathname === '/admin') {
    return null;
  }

  return (
    <a
      href="https://wa.me/919876543210?text=Hi!%20I%20would%20like%20to%20enquire%20about%20booking%20a%20room%20at%20Hotel%20Sri%20Mangalam%2C%20Kariapatti."
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 p-4 bg-[#25D366] text-white rounded-full shadow-2xl hover:bg-[#128C7E] transition-all duration-300 hover:scale-110 flex items-center justify-center group cursor-pointer"
      style={{ animation: 'pulse 2s infinite' }}
      aria-label="Chat on WhatsApp"
    >
      <FaWhatsapp className="text-2xl md:text-3xl" />
      <span className="absolute right-16 bg-luxury-gray text-white text-[10px] tracking-wider uppercase font-sans py-1.5 px-3 rounded-sm border border-gold-400/20 shadow-xl opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 pointer-events-none whitespace-nowrap font-medium">
        Chat With Us 24/7
      </span>
    </a>
  );
};

export default WhatsAppButton;
