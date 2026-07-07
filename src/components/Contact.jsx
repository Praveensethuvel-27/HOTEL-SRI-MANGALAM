import React from 'react';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaClock, FaWhatsapp } from 'react-icons/fa';

const contactInfo = [
  {
    id: 1,
    title: 'Hotel Address',
    icon: <FaMapMarkerAlt />,
    details: '212/18 Tuticorin - Madurai Rd,\nKariapatti, K Karisal Lulam, Tamil Nadu 626106',
    link: 'https://maps.google.com/?q=212/18+Tuticorin+-+Madurai+Rd,+Kariapatti,+K+Karisal+Lulam,+Tamil+Nadu+626106',
  },
  {
    id: 2,
    title: 'Phone Number',
    icon: <FaPhoneAlt />,
    details: '+91 99447 66622\n+91 88836 88666',
    link: 'tel:+919944766622',
  },
  {
    id: 3,
    title: 'Email Address',
    icon: <FaEnvelope />,
    details: 'mangalamresidency2023@gmail.com',
    link: 'mailto:mangalamresidency2023@gmail.com',
  },
  {
    id: 4,
    title: 'Reception Hours',
    icon: <FaClock />,
    details: 'Open 24 Hours a day\n7 Days a week',
    link: null,
  },
];

const Contact = ({ hideTitle = false }) => {
  return (
    <section id="contact" className="py-24 bg-luxury-charcoal relative overflow-hidden">
      <div className="absolute top-1/4 left-0 w-80 h-80 bg-gold-400/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Title */}
        {!hideTitle && (
          <div className="text-center mb-16">
            <span className="font-sans text-xs md:text-sm tracking-[0.3em] uppercase text-gold-400 font-semibold block mb-3">
              Get In Touch
            </span>
            <h2 className="font-serif text-3xl md:text-5xl text-white font-bold tracking-wide uppercase">
              Contact Us
            </h2>
            <div className="w-16 h-[1px] bg-gold-400 mx-auto mt-4" />
            <p className="font-sans text-gray-400 text-sm font-light max-w-lg mx-auto mt-4">
              We are located in Kariapatti, Tamil Nadu. Reach us anytime — our front desk is open 24/7.
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          {/* Info Cards */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.id}
                initial={{ opacity: 0, x: -25 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-card p-6 bg-luxury-black/40 border border-gold-400/10 rounded-sm flex items-start gap-4"
              >
                <div className="p-3.5 bg-gold-400/10 text-gold-400 text-lg md:text-xl rounded-sm border border-gold-400/20 shrink-0">
                  {info.icon}
                </div>
                <div>
                  <h3 className="font-serif text-sm font-bold tracking-wider text-white uppercase mb-1.5">
                    {info.title}
                  </h3>
                  {info.link ? (
                    <a
                      href={info.link}
                      className="font-sans text-xs md:text-sm text-gray-400 hover:text-gold-400 transition-colors leading-relaxed block whitespace-pre-line"
                      target={info.link.startsWith('http') ? '_blank' : '_self'}
                      rel="noopener noreferrer"
                     >
                      {info.details}
                    </a>
                  ) : (
                    <p className="font-sans text-xs md:text-sm text-gray-400 leading-relaxed whitespace-pre-line">
                      {info.details}
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Google Map — Kariapatti (Real Screenshot) */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7 h-96 lg:h-auto min-h-[380px] relative border border-gold-400/15 overflow-hidden shadow-2xl rounded-sm bg-luxury-gray"
          >
            <a
              href="https://maps.google.com/?q=MANGALAM+RESIDENCY,+212/18+Tuticorin+-+Madurai+Rd,+Kariapatti,+K+Karisal+Lulam,+Tamil+Nadu+626106"
              target="_blank"
              rel="noopener noreferrer"
              className="group absolute inset-0 block cursor-pointer"
            >
              {/* Real Map Screenshot */}
              <img
                src="/images/map_screenshot.png"
                alt="Mangalam Residency on Map — Kariapatti, Tamil Nadu"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 brightness-90 saturate-75"
              />

              {/* Gold tint gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent group-hover:from-black/50 transition-all duration-500" />
              <div className="absolute inset-0 bg-gold-400/5 mix-blend-overlay group-hover:bg-gold-400/12 transition-all duration-500" />

              {/* Click to View on Google Maps label top right */}
              <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-black/55 border border-gold-400/30 backdrop-blur-sm px-2.5 py-1.5 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="font-sans text-[8px] tracking-widest uppercase text-gold-400 font-semibold">Open in Google Maps ↗</span>
              </div>

              {/* Shimmer sweep */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none" />
            </a>

            {/* Address Pin Overlay */}
            <div className="absolute bottom-4 left-4 right-4 glass-effect p-3 border border-gold-400/25 rounded-sm pointer-events-none z-10">
              <p className="font-sans text-[10px] text-gold-400 tracking-wider uppercase font-semibold mb-0.5">
                📍 Mangalam Residency
              </p>
              <p className="font-sans text-[10px] text-gray-300 leading-relaxed">
                212/18 Tuticorin - Madurai Rd, Kariapatti, K Karisal Lulam, Tamil Nadu 626106
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
