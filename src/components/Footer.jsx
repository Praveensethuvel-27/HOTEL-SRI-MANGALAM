import React from 'react';
import { Link } from 'react-router-dom';
import { FaCrown, FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn, FaYoutube } from 'react-icons/fa';
import logo from '../assets/logo.png';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-luxury-black border-t border-gold-400/25 text-gray-400 font-sans text-xs md:text-sm">
      {/* Top Footer */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

        {/* Brand Column */}
        <div className="flex flex-col gap-5">
          <Link to="/" className="flex items-center gap-3 group self-start">
            <img
              src={logo}
              alt="Mangalam Residency"
              className="w-10 h-10 object-contain drop-shadow-[0_0_8px_rgba(197,168,128,0.4)] group-hover:scale-110 transition-transform duration-300"
            />
            <div className="flex flex-col leading-tight">
              <span className="font-serif text-base font-bold tracking-[0.1em] uppercase text-gold-400">
                Mangalam Residency
              </span>
              <span className="font-sans text-[9px] tracking-[0.2em] uppercase text-gray-500">
                Kariapatti · Tamil Nadu
              </span>
            </div>
          </Link>
          <p className="text-gray-500 font-light leading-relaxed text-xs">
            Indulge in a world of refined elegance. Mangalam Residency offers comfortable rooms,
            a grand event venue, and warm hospitality on the Tuticorin–Madurai Road, Kariapatti.
          </p>
          {/* Social Icons */}
          <div className="flex items-center gap-3 mt-1">
            {[
              { href: 'https://facebook.com', Icon: FaFacebookF, label: 'Facebook' },
              { href: 'https://instagram.com', Icon: FaInstagram, label: 'Instagram' },
              { href: 'https://twitter.com',   Icon: FaTwitter,   label: 'Twitter' },
              { href: 'https://linkedin.com',  Icon: FaLinkedinIn,label: 'LinkedIn' },
              { href: 'https://youtube.com',   Icon: FaYoutube,   label: 'YouTube' },
            ].map(({ href, Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-8 h-8 rounded-full border border-gray-800 hover:border-gold-400 text-gray-500 hover:text-gold-400 flex items-center justify-center transition-colors duration-300"
              >
                <Icon className="text-xs" />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col gap-5">
          <h3 className="font-serif text-sm font-bold tracking-widest text-white uppercase border-b border-gold-400/20 pb-2">
            Quick Links
          </h3>
          <ul className="flex flex-col gap-3 font-light text-xs">
            {[
              { label: 'Home Page',              to: '/' },
              { label: 'About Us',               to: '/about' },
              { label: 'Rooms & Suites',         to: '/rooms' },
              { label: 'Photo Gallery',          to: '/gallery' },
              { label: 'Facilities & Amenities', to: '/facilities' },
              { label: 'Mangalam Venue',         to: '/venue' },
              { label: 'Reservation Request',    to: '/booking' },
              { label: 'Contact Us',             to: '/contact' },
            ].map(({ label, to }) => (
              <li key={to}>
                <Link to={to} className="hover:text-gold-400 transition-colors">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col gap-5">
          <h3 className="font-serif text-sm font-bold tracking-widest text-white uppercase border-b border-gold-400/20 pb-2">
            Contact Info
          </h3>
          <ul className="flex flex-col gap-4 font-light text-xs leading-relaxed">
            <li className="flex flex-col">
              <span className="text-[10px] tracking-wider text-gold-400 font-semibold uppercase mb-1">ADDRESS</span>
              <span>M3GQ+PF5, Tuticorin - Madurai Rd,<br />Kariapatti, Tamil Nadu 626106</span>
            </li>
            <li className="flex flex-col">
              <span className="text-[10px] tracking-wider text-gold-400 font-semibold uppercase mb-1">PHONE</span>
              <span>+91 9944766622 / +91  8883688666</span>
            </li>
            <li className="flex flex-col">
              <span className="text-[10px] tracking-wider text-gold-400 font-semibold uppercase mb-1">EMAIL</span>
              <span>residency738@gmail.com</span>
            </li>
          </ul>
        </div>

        {/* Guest Services */}
        <div className="flex flex-col gap-5">
          <h3 className="font-serif text-sm font-bold tracking-widest text-white uppercase border-b border-gold-400/20 pb-2">
            Guest Services
          </h3>
          <ul className="flex flex-col gap-3 font-light text-xs">
            {[
              'Airport Shuttle Request',
              'Guided City Tours',
              'Private Dining Booking',
              'Mangalam Venue Booking',
              'Luggage Storage',
              'Event Catering',
            ].map((service) => (
              <li key={service} className="hover:text-gold-400 transition-colors cursor-pointer">
                {service}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="border-t border-gray-900 bg-[#070708] py-7">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left text-gray-600 text-[11px]">
          <p>
            © {currentYear} Mangalam Residency, Kariapatti. All Rights Reserved.
          </p>
          <div className="flex items-center gap-5">
            <a href="#" className="hover:text-gold-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gold-400 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-gold-400 transition-colors">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
