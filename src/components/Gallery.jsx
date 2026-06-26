import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoCloseOutline, IoArrowBackOutline, IoArrowForwardOutline } from 'react-icons/io5';
import { FiZoomIn } from 'react-icons/fi';

const galleryCategories = ['All', 'Exterior', 'Lobby', 'Rooms', 'Venue'];

const galleryImages = [
  {
    id: 1,
    category: 'Exterior',
    title: 'Mangalam Residency',
    url: '/images/pic1.jpg',
    description: 'The welcoming entrance of Mangalam Residency, Kariapatti.'
  },
  {
    id: 2,
    category: 'Rooms',
    title: 'Standard Room',
    url: '/images/pic2.jpg',
    description: 'Clean and comfortable Standard Room with twin beds and premium linens.'
  },
  {
    id: 3,
    category: 'Rooms',
    title: 'Standard Room View',
    url: '/images/pic3.jpg',
    description: 'Standard room with cozy double bed and elegant furnishings.'
  },
  {
    id: 4,
    category: 'Rooms',
    title: 'Deluxe Room',
    url: '/images/pic4.jpg',
    description: 'Spacious Deluxe Room with king-size bed and premium amenities.'
  },
  {
    id: 5,
    category: 'Rooms',
    title: 'Deluxe Room Interior',
    url: '/images/pic5.jpg',
    description: 'Elegant Deluxe Room with premium decor and comfortable furnishings.'
  },
  {
    id: 6,
    category: 'Rooms',
    title: 'Standard Twin Beds',
    url: '/images/pic6.jpg',
    description: 'Standard Room featuring twin beds with teal accent wall and wardrobe.'
  },
  {
    id: 7,
    category: 'Rooms',
    title: 'Deluxe King Bed',
    url: '/images/pic7.jpg',
    description: 'Deluxe Room with king bed, AC, and full-length mirror.'
  },
  {
    id: 8,
    category: 'Rooms',
    title: 'Room Interior',
    url: '/images/pic8.jpg',
    description: 'Premium room interior with quality furnishings.'
  },
  {
    id: 9,
    category: 'Rooms',
    title: 'Room Decor',
    url: '/images/pic9.jpg',
    description: 'Well-designed room with artisan decor and premium bedding.'
  },
  {
    id: 10,
    category: 'Rooms',
    title: 'Cozy Room',
    url: '/images/pic10.jpg',
    description: 'Comfortable room with all modern amenities.'
  },
  {
    id: 11,
    category: 'Rooms',
    title: 'Standard Room AC',
    url: '/images/pic11.jpg',
    description: 'Air-conditioned Standard Room with quality beds.'
  },
  {
    id: 12,
    category: 'Rooms',
    title: 'Deluxe with Smart TV',
    url: '/images/pic12.jpg',
    description: 'Deluxe Room featuring Smart TV, king-size bed, and premium amenities.'
  },
  {
    id: 13,
    category: 'Rooms',
    title: 'Standard Room',
    url: '/images/pic13.jpg',
    description: 'Neat Standard Room with checked bed linen and teak furniture.'
  },
  {
    id: 14,
    category: 'Rooms',
    title: 'Suite Room',
    url: '/images/pic14.jpg',
    description: 'Luxurious Suite Room with floral decoration — perfect for honeymooners.'
  },
  {
    id: 15,
    category: 'Lobby',
    title: 'Hotel Corridor',
    url: '/images/pic15.jpg',
    description: 'Elegantly designed corridor with teak wood paneling and warm lighting.'
  },
];

const Gallery = ({ hideTitle = false }) => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const filteredImages = galleryImages.filter(img => 
    activeFilter === 'All' ? true : img.category === activeFilter
  );

  const openLightbox = (imageIndex) => {
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
