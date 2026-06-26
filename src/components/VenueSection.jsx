import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaUsers, FaMicrophone, FaProjectDiagram, FaWifi, FaParking, FaConciergeBell, FaSnowflake, FaUtensils } from 'react-icons/fa';
import { MdMeetingRoom, MdEventSeat } from 'react-icons/md';

const venueFeatures = [
  { icon: <FaUsers />, name: '500–700 Guests Capacity', desc: 'Spacious hall suitable for large-scale gatherings, conferences, and celebrations.' },
  { icon: <FaMicrophone />, name: 'Professional Sound System', desc: 'High-quality audio-visual setup with wireless microphones and stage lighting.' },
  { icon: <FaProjectDiagram />, name: 'Projector & LED Screens', desc: 'Full HD projector and large LED display screens for presentations and events.' },
  { icon: <FaWifi />, name: 'High-Speed Wi-Fi', desc: 'Dedicated broadband connection for all your event connectivity needs.' },
  { icon: <FaSnowflake />, name: 'Central Air Conditioning', desc: 'Centralized AC for consistent comfortable temperature throughout the hall.' },
  { icon: <FaUtensils />, name: 'Catering Services', desc: 'In-house catering with customizable menus — veg, non-veg, and multi-cuisine options.' },
  { icon: <FaParking />, name: 'Ample Parking', desc: 'Large secure parking area to accommodate hundreds of vehicles.' },
  { icon: <FaConciergeBell />, name: 'Dedicated Event Staff', desc: 'Professional event coordinators and service staff assigned for your event.' },
];

const eventTypes = [
  { name: 'Wedding Receptions', icon: '💍' },
  { name: 'Corporate Conferences', icon: '🏢' },
  { name: 'Birthday Celebrations', icon: '🎂' },
  { name: 'Cultural Programs', icon: '🎭' },
  { name: 'Religious Functions', icon: '🙏' },
  { name: 'Political Meetings', icon: '🎤' },
];

const VenueSection = ({ hideTitle = false }) => {
  return (
    <section id="venue" className="py-24 bg-luxury-black relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-gold-400/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-gold-400/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Title */}
        {!hideTitle && (
          <div className="text-center mb-16">
            <span className="font-sans text-xs md:text-sm tracking-[0.3em] uppercase text-gold-400 font-semibold block mb-3">
              Grand Event Space
            </span>
            <h2 className="font-serif text-3xl md:text-5xl text-white font-bold tracking-wide uppercase">
              Mangalam Venue
            </h2>
            <div className="w-16 h-[1px] bg-gold-400 mx-auto mt-4" />
            <p className="font-sans text-gray-400 text-sm md:text-base font-light max-w-2xl mx-auto mt-4">
              A premium banquet and event hall at Mangalam Residency — designed to host grand celebrations and professional events for 500 to 700 guests.
            </p>
          </div>
        )}

        {/* Hero Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative h-72 md:h-96 rounded-sm overflow-hidden border border-gold-400/20 mb-16 group"
        >
          <img
            src="/images/pic8.jpg"
            alt="Mangalam Venue - Grand Event Hall"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-transparent" />

          {/* Overlay Content */}
          <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <span className="font-sans text-[10px] tracking-[0.35em] uppercase text-gold-400 font-semibold block mb-3">
                Mangalam Residency
              </span>
              <h3 className="font-serif text-2xl md:text-4xl text-white font-bold mb-4 leading-tight">
                The Grand<br />
                <span className="text-gold-300 italic">Mangalam Venue</span>
              </h3>

              {/* Capacity badges */}
              <div className="flex flex-wrap gap-3 mb-6">
                <div className="flex items-center gap-2 glass-effect px-4 py-2 rounded-sm border border-gold-400/30">
                  <MdEventSeat className="text-gold-400 text-lg" />
                  <span className="font-sans text-xs text-white font-semibold tracking-wide">500–700 Capacity</span>
                </div>
                <div className="flex items-center gap-2 glass-effect px-4 py-2 rounded-sm border border-gold-400/30">
                  <MdMeetingRoom className="text-gold-400 text-lg" />
                  <span className="font-sans text-xs text-white font-semibold tracking-wide">Multi-Purpose Hall</span>
                </div>
              </div>

              <Link
                to="/booking"
                className="inline-block px-7 py-3 bg-gold-400 hover:bg-gold-500 text-luxury-black font-semibold font-sans text-xs tracking-widest uppercase rounded-sm transition-all duration-300 shadow-lg"
              >
                Enquire for Venue
              </Link>
            </motion.div>
          </div>
        </motion.div>

        {/* Event Types */}
        <div className="mb-16">
          <h3 className="font-serif text-xl md:text-2xl text-white font-bold text-center mb-8 tracking-wide">
            Ideal For All Occasions
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {eventTypes.map((event, index) => (
              <motion.div
                key={event.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.07 }}
                className="flex flex-col items-center p-4 glass-card bg-luxury-charcoal/40 border border-gold-400/10 rounded-sm text-center hover:border-gold-400/40 transition-colors duration-300"
              >
                <span className="text-3xl mb-2">{event.icon}</span>
                <span className="font-sans text-[10px] md:text-xs tracking-wide uppercase text-gray-300 font-medium leading-tight">{event.name}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Venue Features Grid */}
        <div>
          <h3 className="font-serif text-xl md:text-2xl text-white font-bold text-center mb-8 tracking-wide">
            Venue Highlights & Amenities
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {venueFeatures.map((feature, index) => (
              <motion.div
                key={feature.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.07 }}
                className="p-6 bg-luxury-charcoal/40 border border-gold-400/10 rounded-sm hover:border-gold-400/30 transition-all duration-300"
              >
                <div className="p-3 bg-gold-400/10 text-gold-400 text-2xl rounded-sm mb-4 border border-gold-400/20 w-fit">
                  {feature.icon}
                </div>
                <h4 className="font-serif text-base text-white font-semibold mb-2">{feature.name}</h4>
                <p className="font-sans text-xs text-gray-400 font-light leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-16 p-8 md:p-12 bg-gradient-to-r from-gold-400/10 via-gold-400/5 to-gold-400/10 border border-gold-400/20 rounded-sm text-center"
        >
          <h3 className="font-serif text-2xl md:text-3xl text-white font-bold mb-3">
            Plan Your Next Grand Event
          </h3>
          <p className="font-sans text-gray-400 text-sm md:text-base font-light max-w-xl mx-auto mb-6">
            Contact our dedicated events team to discuss packages, catering, and arrangements for your event at Mangalam Venue.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/booking"
              className="px-8 py-4 bg-gold-400 hover:bg-gold-500 text-luxury-black font-semibold font-sans text-xs tracking-widest uppercase rounded-sm transition-all duration-300 shadow-lg"
            >
              Book the Venue
            </Link>
            <Link
              to="/contact"
              className="px-8 py-4 border border-gold-400 text-gold-400 hover:bg-gold-400 hover:text-luxury-black font-semibold font-sans text-xs tracking-widest uppercase rounded-sm transition-all duration-300"
            >
              Contact Us
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default VenueSection;
