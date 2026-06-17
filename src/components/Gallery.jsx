import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoCloseOutline, IoArrowBackOutline, IoArrowForwardOutline } from 'react-icons/io5';
import { FiZoomIn } from 'react-icons/fi';

const galleryCategories = ['All', 'Exterior', 'Lobby', 'Rooms', 'Dining', 'Facilities'];

const galleryImages = [
  {
    id: 1,
    category: 'Exterior',
    title: 'Grand Hotel Exterior',
    url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800&auto=format&fit=crop',
    description: 'Our beautifully lit grand estate exterior reflecting architectural brilliance.'
  },
  {
    id: 2,
    category: 'Lobby',
    title: 'Luxury Hotel Lobby',
    url: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=800&auto=format&fit=crop',
    description: 'Double-height grand entrance lobby accented with warm chandeliers.'
  },
  {
    id: 3,
    category: 'Lobby',
    title: 'Reception Area',
    url: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=800&auto=format&fit=crop',
    description: 'Our bespoke reception counter staffed with dedicated concierges.'
  },
  {
    id: 4,
    category: 'Rooms',
    title: 'Deluxe Bedroom Suite',
    url: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=800&auto=format&fit=crop',
    description: 'Spacious bedding arrangements lined with pure premium silk linens.'
  },
  {
    id: 5,
    category: 'Dining',
    title: 'Mangalam Restaurant',
    url: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=800&auto=format&fit=crop',
    description: 'Fine dining room serving multi-cuisine specialties curated by Michelin chefs.'
  },
  {
    id: 6,
    category: 'Facilities',
    title: 'Infinity Sky Pool',
    url: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=800&auto=format&fit=crop',
    description: 'Panoramic outdoor swimming pool looking over the city skyline.'
  },
  {
    id: 7,
    category: 'Facilities',
    title: 'Premium Wellness Spa',
    url: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=800&auto=format&fit=crop',
    description: 'Calm relaxation rooms providing bespoke body treatments and massages.'
  },
  {
    id: 8,
    category: 'Rooms',
    title: 'Premium Suite Lounge',
    url: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=800&auto=format&fit=crop',
    description: 'Private penthouse seating area configured with state of the art sound bars.'
  }
];

const Gallery = ({ hideTitle = false }) => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const filteredImages = galleryImages.filter(img => 
    activeFilter === 'All' ? true : img.category === activeFilter
  );

  const openLightbox = (imageIndex) => {
    // Find index in filteredImages array to prevent navigating outside the current filter
    setLightboxIndex(imageIndex);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const navigateLightbox = (direction, e) => {
    e.stopPropagation();
    if (lightboxIndex === null) return;
    
    let nextIndex = lightboxIndex + direction;
    if (nextIndex < 0) {
      nextIndex = filteredImages.length - 1;
    } else if (nextIndex >= filteredImages.length) {
      nextIndex = 0;
    }
    setLightboxIndex(nextIndex);
  };

  return (
    <section id="gallery" className="py-24 bg-luxury-charcoal relative overflow-hidden">
      {/* Decorative BG Accents */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-gold-400/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Title */}
        {!hideTitle && (
          <div className="text-center mb-12">
            <span className="font-sans text-xs md:text-sm tracking-[0.3em] uppercase text-gold-400 font-semibold block mb-3">
              Visual Tour
            </span>
            <h2 className="font-serif text-3xl md:text-5xl text-white font-bold tracking-wide uppercase">
              Our Gallery
            </h2>
            <div className="w-16 h-[1px] bg-gold-400 mx-auto mt-4" />
          </div>
        )}

        {/* Filter Controls */}
        <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4 mb-12">
          {galleryCategories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`px-5 py-2 font-sans text-xs tracking-widest uppercase transition-all duration-300 rounded-sm cursor-pointer ${
                activeFilter === category
                  ? 'bg-gold-400 text-luxury-black font-semibold shadow-md'
                  : 'bg-luxury-black/40 text-gray-400 hover:text-white border border-gold-400/10'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Image Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredImages.map((img, index) => (
              <motion.div
                key={img.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                onClick={() => openLightbox(index)}
                className="group relative h-64 overflow-hidden rounded-sm border border-gold-400/10 shadow-lg cursor-pointer bg-luxury-gray"
              >
                {/* Image */}
                <img
                  src={img.url}
                  alt={img.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />

                {/* Dark Hover Overlay */}
                <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 border-b border-r border-gold-400/0 group-hover:border-gold-400/30" />

                {/* Hover Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0 z-10 pointer-events-none">
                  <span className="font-sans text-[10px] tracking-widest text-gold-400 uppercase font-semibold mb-1">
                    {img.category}
                  </span>
                  <h3 className="font-serif text-lg text-white font-bold leading-tight mb-2">
                    {img.title}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-gray-300">
                    <FiZoomIn className="text-gold-400 text-sm" />
                    <span className="font-sans tracking-wide">View Fullscreen</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
            className="fixed inset-0 z-999 flex flex-col items-center justify-center bg-black/95 px-4"
          >
            {/* Top Bar (Close and index details) */}
            <div className="absolute top-6 left-0 right-0 px-6 md:px-12 flex items-center justify-between text-white z-1010">
              <span className="font-sans text-xs tracking-widest uppercase text-gray-400">
                {filteredImages[lightboxIndex].category} • {lightboxIndex + 1} of {filteredImages.length}
              </span>
              <button
                onClick={closeLightbox}
                className="text-white hover:text-gold-400 text-3xl focus:outline-none cursor-pointer"
                aria-label="Close Lightbox"
              >
                <IoCloseOutline />
              </button>
            </div>

            {/* Main Lightbox Body (Image & Controls) */}
            <div className="relative w-full max-w-5xl max-h-[75vh] flex items-center justify-center">
              {/* Back Nav Arrow */}
              <button
                onClick={(e) => navigateLightbox(-1, e)}
                className="absolute left-2 md:-left-12 p-3 bg-white/5 hover:bg-gold-400/20 border border-white/10 hover:border-gold-400 text-white hover:text-gold-400 rounded-full cursor-pointer z-1010 transition-all duration-300"
                aria-label="Previous image"
              >
                <IoArrowBackOutline className="text-xl md:text-2xl" />
              </button>

              {/* Lightbox Image */}
              <motion.img
                key={filteredImages[lightboxIndex].id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                src={filteredImages[lightboxIndex].url}
                alt={filteredImages[lightboxIndex].title}
                className="max-w-full max-h-[75vh] object-contain shadow-2xl border border-gold-400/10"
                onClick={(e) => e.stopPropagation()}
              />

              {/* Next Nav Arrow */}
              <button
                onClick={(e) => navigateLightbox(1, e)}
                className="absolute right-2 md:-right-12 p-3 bg-white/5 hover:bg-gold-400/20 border border-white/10 hover:border-gold-400 text-white hover:text-gold-400 rounded-full cursor-pointer z-1010 transition-all duration-300"
                aria-label="Next image"
              >
                <IoArrowForwardOutline className="text-xl md:text-2xl" />
              </button>
            </div>

            {/* Bottom Caption */}
            <div className="mt-8 text-center max-w-xl text-white">
              <h3 className="font-serif text-xl md:text-2xl font-bold text-gold-400 mb-2">
                {filteredImages[lightboxIndex].title}
              </h3>
              <p className="font-sans text-xs md:text-sm text-gray-400 font-light leading-relaxed">
                {filteredImages[lightboxIndex].description}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Gallery;
