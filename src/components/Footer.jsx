import React from 'react';
import { Link } from 'react-router-dom';
import { FaCrown, FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn, FaYoutube } from 'react-icons/fa';
import logo from '../assets/logo.png';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-luxury-black border-t border-gold-400/25 text-gray-400 font-sans text-xs md:text-sm">
      {/* Top Footer */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">

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
              <span>212/18 Tuticorin - Madurai Rd,<br />Kariapatti, K Karisal Lulam, Tamil Nadu 626106</span>
            </li>
            <li className="flex flex-col">
              <span className="text-[10px] tracking-wider text-gold-400 font-semibold uppercase mb-1">PHONE</span>
              <span>+91 9944766622 / +91  8883688666</span>
            </li>
            <li className="flex flex-col">
              <span className="text-[10px] tracking-wider text-gold-400 font-semibold uppercase mb-1">EMAIL</span>
              <span>mangalamresidency2023@gmail.com</span>
            </li>
          </ul>
        </div>

      </div>

      {/* Full-Width Location Map Row */}
      <div className="border-t border-gold-400/10">
        <div className="max-w-7xl mx-auto px-6 md:px-12 pb-10">
          <div className="flex items-center gap-3 mb-4 pt-8">
            <h3 className="font-serif text-sm font-bold tracking-widest text-white uppercase">📍 Our Location</h3>
            <div className="flex-1 h-[1px] bg-gold-400/15" />
            <a
              href="https://maps.google.com/?q=MANGALAM+RESIDENCY,+212/18+Tuticorin+-+Madurai+Rd,+Kariapatti,+K+Karisal+Lulam,+Tamil+Nadu+626106"
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans text-[9px] tracking-widest uppercase text-gold-400 hover:text-gold-200 transition-colors font-semibold"
            >
              Open in Maps ↗
            </a>
          </div>

          {/* Big Clickable Map */}
          <a
            href="https://maps.google.com/?q=MANGALAM+RESIDENCY,+212/18+Tuticorin+-+Madurai+Rd,+Kariapatti,+K+Karisal+Lulam,+Tamil+Nadu+626106"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative block w-full h-56 md:h-72 rounded-sm border border-gold-400/30 overflow-hidden shadow-2xl hover:border-gold-400 transition-all duration-500 cursor-pointer"
          >
            {/* Real Map Screenshot — full size */}
            <img
              src="/images/map_screenshot.png"
              alt="Mangalam Residency Location Map"
              className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
            />

            {/* Light dark vignette so pin badge is readable */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent group-hover:from-black/40 transition-all duration-500" />

            {/* Hover label top right */}
            <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="font-sans text-[8px] tracking-widest uppercase text-gold-400 font-bold bg-black/60 border border-gold-400/30 backdrop-blur-sm px-2.5 py-1.5 rounded-sm">View on Google Maps ↗</span>
            </div>

            {/* Pin badge bottom */}
            <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-black/65 border border-gold-400/35 backdrop-blur-sm px-3 py-2 rounded-sm z-10">
              <span className="text-base leading-none">📍</span>
              <div className="flex flex-col">
                <span className="font-sans text-[10px] tracking-widest uppercase text-gold-400 font-bold leading-tight">Mangalam Residency</span>
                <span className="font-sans text-[8px] text-gray-400 tracking-wide leading-tight mt-0.5">212/18 Tuticorin - Madurai Rd, Kariapatti, Tamil Nadu 626106</span>
              </div>
            </div>

            {/* Gold shimmer sweep */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none" />
          </a>
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
