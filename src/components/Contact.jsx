import React from 'react';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaClock, FaWhatsapp } from 'react-icons/fa';

const contactInfo = [
  {
    id: 1,
    title: 'Hotel Address',
    icon: <FaMapMarkerAlt />,
    details: 'M3GQ+PF5, Tuticorin - Madurai Rd,\nKariapatti, Tamil Nadu 626106',
    link: 'https://maps.google.com/?q=M3GQ%2BPF5+Kariapatti+Tamil+Nadu',
  },
  {
    id: 2,
    title: 'Phone Number',
    icon: <FaPhoneAlt />,
    details: '+91 422 234 5678\n+91 98765 43210',
    link: 'tel:+919876543210',
  },
  {
    id: 3,
    title: 'Email Address',
    icon: <FaEnvelope />,
    details: 'reservations@hotelsrimangalam.com\ninfo@hotelsrimangalam.com',
    link: 'mailto:reservations@hotelsrimangalam.com',
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

          {/* Google Map — Kariapatti */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7 h-96 lg:h-auto min-h-[380px] relative border border-gold-400/15 overflow-hidden shadow-2xl rounded-sm bg-luxury-gray"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3938.02!2d77.793!3d9.456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zOcKwMjcnMjMuNiJOIDc3wrA0Nyc0Ny4yIkU!5e0!3m2!1sen!2sin!4v1703212456789!5m2!1sen!2sin&q=Kariapatti,Tamil+Nadu+626106"
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'invert(88%) hue-rotate(180deg) grayscale(25%)' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Hotel Sri Mangalam — Kariapatti, Tamil Nadu"
            />

            {/* Address Pin Overlay */}
            <div className="absolute bottom-4 left-4 right-4 glass-effect p-3 border border-gold-400/25 rounded-sm">
              <p className="font-sans text-[10px] text-gold-400 tracking-wider uppercase font-semibold mb-0.5">
                📍 Hotel Sri Mangalam
              </p>
              <p className="font-sans text-[10px] text-gray-300 leading-relaxed">
                M3GQ+PF5, Tuticorin - Madurai Rd, Kariapatti, Tamil Nadu 626106
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
