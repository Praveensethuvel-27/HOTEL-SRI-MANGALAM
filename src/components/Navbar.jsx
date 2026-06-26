import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { HiMenuAlt3 } from 'react-icons/hi';
import { IoCloseOutline } from 'react-icons/io5';
import logo from '../assets/logo.png';

const navLinks = [
  { name: 'Home',       href: '/' },
  { name: 'About',      href: '/about' },
  { name: 'Rooms',      href: '/rooms' },
  { name: 'Venue',      href: '/venue' },
  { name: 'Gallery',    href: '/gallery' },
  { name: 'Facilities', href: '/facilities' },
  { name: 'Booking',    href: '/booking' },
  { name: 'Contact',    href: '/contact' },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled]       = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close sidebar on route change
  useEffect(() => { setIsMobileMenuOpen(false); }, [location.pathname]);

  const isActive = (href) => location.pathname === href;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[45] transition-all duration-500 ${
          isScrolled
            ? 'bg-luxury-black/92 backdrop-blur-md border-b border-gold-400/20 py-3 shadow-xl'
            : 'bg-gradient-to-b from-black/75 via-black/35 to-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">

          {/* ── LOGO ── */}
          <Link to="/" className="flex items-center gap-3 group">
            <motion.img
              src={logo}
              alt="Mangalam Residency"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="w-10 h-10 md:w-12 md:h-12 object-contain drop-shadow-[0_0_8px_rgba(197,168,128,0.5)]"
            />
            <div className="flex flex-col leading-tight">
              <span className="font-serif text-base md:text-lg font-bold tracking-[0.12em] uppercase text-gold-400">
                Mangalam Residency
              </span>
              <span className="font-sans text-[9px] tracking-[0.25em] uppercase text-gray-400">
                Kariapatti · Tamil Nadu
              </span>
            </div>
          </Link>

          {/* ── Desktop Nav Links ── */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={`font-sans text-[11px] md:text-xs tracking-widest uppercase transition-colors duration-300 relative py-1
                  after:absolute after:-bottom-1 after:left-0 after:h-[1px] after:bg-gold-400 after:transition-all after:duration-300
                  ${isActive(link.href)
                    ? 'text-gold-400 after:w-full'
                    : 'text-gray-300 hover:text-gold-400 after:w-0 hover:after:w-full'
                  }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* ── Book CTA ── */}
          <div className="hidden lg:block">
            <Link
              to="/booking"
              className="px-5 py-2.5 border border-gold-400 text-gold-400 hover:text-luxury-black hover:bg-gold-400 font-sans text-[10px] tracking-widest uppercase rounded-sm transition-all duration-300 hover:shadow-[0_0_15px_rgba(197,168,128,0.3)]"
            >
              Book Stay
            </Link>
          </div>

          {/* ── Hamburger ── */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="lg:hidden text-gold-400 hover:text-gold-500 text-3xl focus:outline-none cursor-pointer"
            aria-label="Open menu"
          >
            <HiMenuAlt3 />
          </button>
        </div>
      </header>

      {/* ── Mobile Sidebar ── */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 0.65 }} exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 z-[48] bg-black"
            />

            <motion.div
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.4, ease: 'easeOut' }}
              className="fixed top-0 bottom-0 right-0 z-[49] w-80 max-w-[85vw] bg-luxury-charcoal border-l border-gold-400/20 p-8 flex flex-col shadow-2xl"
            >
              {/* Sidebar Header */}
              <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-2">
                  <img src={logo} alt="Logo" className="w-10 h-10 object-contain" />
                  <span className="font-serif text-sm font-bold tracking-widest uppercase text-gold-400">
                    Mangalam Residency
                  </span>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-gold-400 hover:text-gold-500 text-3xl focus:outline-none cursor-pointer"
                  aria-label="Close menu"
                >
                  <IoCloseOutline />
                </button>
              </div>

              {/* Sidebar Links */}
              <nav className="flex flex-col gap-5 mb-10">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.href}
                    className={`font-sans text-sm tracking-widest uppercase py-2 border-b transition-colors duration-300
                      ${isActive(link.href)
                        ? 'text-gold-400 border-gold-400/30'
                        : 'text-gray-300 hover:text-gold-400 border-gray-800'
                      }`}
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>

              <div className="mt-auto">
                <Link
                  to="/booking"
                  className="block text-center w-full py-3.5 bg-gold-400 hover:bg-gold-500 text-luxury-black font-sans text-xs tracking-widest uppercase rounded-sm font-semibold transition-all duration-300"
                >
                  Book A Room Now
                </Link>
                <p className="text-center font-sans text-[10px] text-gray-500 mt-3 tracking-wider">
                  24/7 Premium Booking Desk
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
