import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaStar, FaQuoteLeft, FaTimes } from 'react-icons/fa';
import { IoArrowBackOutline, IoArrowForwardOutline } from 'react-icons/io5';

const testimonialsData = [
  {
    id: 1,
    name: 'Rajesh Kumar',
    role: 'Managing Director, Kumar Tech',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop',
    rating: 5,
    text: 'Hotel Sri Mangalam sets a brand new standard for hospitality. The executive suites are incredibly comfortable, and the service is swift. The multi-cuisine dining options at their restaurant were the absolute highlight of my business trip.'
  },
  {
    id: 2,
    name: 'Aishwarya Sen',
    role: 'Travel Journalist & Blogger',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop',
    rating: 5,
    text: 'I was wowed by the modern aesthetics and the subtle luxury of this hotel. From checking in at the reception desk to the private spa sessions, the attention to detail is remarkable. Definitely recommending it to all luxury travelers!'
  },
  {
    id: 3,
    name: 'Vikram Malhotra',
    role: 'Family Vacationer',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop',
    rating: 5,
    text: 'Our family stay in their Family Room was absolutely perfect. The children loved the spacious arrangement, and the housekeeping team was incredibly polite and thorough. Having round-the-clock power and hot water made it stress-free.'
  },
  {
    id: 4,
    name: 'Dr. Sarah Mathews',
    role: 'Medical Professor',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=150&auto=format&fit=crop',
    rating: 4,
    text: 'Quiet, premium, and extremely secure. The seating areas in the lobby are wonderful for reading. Valet parking was incredibly fast and the reception staff went above and beyond to accommodate our early check-in request.'
  }
];

const Testimonials = () => {
  const [activeTestimonials, setActiveTestimonials] = useState(testimonialsData);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right

  // Review modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    rating: 5,
    text: ''
  });
  const [hoverRating, setHoverRating] = useState(0);

  // Load reviews on mount
  const loadApprovedReviews = () => {
    try {
      const storedReviewsJson = localStorage.getItem('hotel_reviews');
      const storedReviews = storedReviewsJson ? JSON.parse(storedReviewsJson) : [];
      const approved = storedReviews.filter(r => r.status === 'approved');
      
      // Combine mock data with approved reviews
      setActiveTestimonials([...testimonialsData, ...approved]);
    } catch (err) {
      console.error('Failed to load reviews:', err);
    }
  };

  useEffect(() => {
    loadApprovedReviews();
    
    // Add event listener to listen to storage changes
    window.addEventListener('storage', loadApprovedReviews);
    return () => window.removeEventListener('storage', loadApprovedReviews);
  }, []);

  const handleNext = useCallback(() => {
    if (activeTestimonials.length === 0) return;
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % activeTestimonials.length);
  }, [activeTestimonials.length]);

  const handlePrev = () => {
    if (activeTestimonials.length === 0) return;
    setDirection(-1);
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? activeTestimonials.length - 1 : prevIndex - 1
    );
  };

  // Autoplay functionality
  useEffect(() => {
    if (activeTestimonials.length <= 1) return;
    const timer = setInterval(() => {
      handleNext();
    }, 6000);

    return () => clearInterval(timer);
  }, [handleNext, activeTestimonials.length]);

  // Handle Review form submission
  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.text.trim()) return;

    const newReview = {
      id: 'REV-' + Date.now() + Math.floor(Math.random() * 1000),
      name: formData.name,
      role: formData.role.trim() || 'Guest',
      rating: formData.rating,
      text: formData.text,
      image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150&auto=format&fit=crop',
      status: 'pending',
      submittedAt: new Date().toISOString()
    };

    try {
      const storedReviewsJson = localStorage.getItem('hotel_reviews');
      const storedReviews = storedReviewsJson ? JSON.parse(storedReviewsJson) : [];
      storedReviews.unshift(newReview);
      localStorage.setItem('hotel_reviews', JSON.stringify(storedReviews));
      
      // Dispatch a custom event to notify other components in the same window
      window.dispatchEvent(new Event('storage'));
    } catch (err) {
      console.error('Failed to save review:', err);
    }

    setSubmitSuccess(true);
    setFormData({ name: '', role: '', rating: 5, text: '' });
    
    setTimeout(() => {
      setIsModalOpen(false);
      setSubmitSuccess(false);
    }, 3000);
  };

  // Framer Motion Animation Variants for Slider
  const slideVariants = {
    enter: (dir) => ({
      x: dir > 0 ? 100 : -100,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: 'easeInOut' }
    },
    exit: (dir) => ({
      x: dir < 0 ? 100 : -100,
      opacity: 0,
      transition: { duration: 0.5, ease: 'easeInOut' }
    })
  };

  const currentTestimonial = activeTestimonials[currentIndex] || testimonialsData[0];

  return (
    <section id="testimonials" className="py-24 bg-luxury-black relative overflow-hidden">
      {/* Decorative BG Lights */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold-400/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6">
        {/* Section Title */}
        <div className="text-center mb-16">
          <span className="font-sans text-xs md:text-sm tracking-[0.3em] uppercase text-gold-400 font-semibold block mb-3">
            Guest Feedback
          </span>
          <h2 className="font-serif text-3xl md:text-5xl text-white font-bold tracking-wide uppercase">
            Testimonials
          </h2>
          <div className="w-16 h-[1px] bg-gold-400 mx-auto mt-4" />
        </div>

        {/* Carousel Slider */}
        <div className="relative glass-card bg-luxury-charcoal/40 p-8 md:p-12 border border-gold-400/10 min-h-[350px] md:min-h-[300px] flex flex-col justify-center rounded-sm">
          {/* Quote Icon Accent */}
          <div className="absolute top-6 left-6 text-gold-400/10 text-6xl pointer-events-none">
            <FaQuoteLeft />
          </div>

          <AnimatePresence initial={false} custom={direction} mode="wait">
            {activeTestimonials.length > 0 && (
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="flex flex-col items-center text-center"
              >
                {/* Stars Rating */}
                <div className="flex items-center gap-1.5 text-gold-400 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <FaStar 
                      key={i} 
                      className={i < currentTestimonial.rating ? "text-gold-400" : "text-gray-600"} 
                    />
                  ))}
                </div>

                {/* Review Text */}
                <p className="font-sans text-sm md:text-base text-gray-300 font-light leading-relaxed italic mb-8 max-w-2xl">
                  "{currentTestimonial.text}"
                </p>

                {/* User Avatar & Details */}
                <div className="flex items-center gap-4 text-left">
                  <img
                    src={currentTestimonial.image || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150&auto=format&fit=crop'}
                    alt={currentTestimonial.name}
                    className="w-12 h-12 rounded-full object-cover border border-gold-400/20"
                  />
                  <div>
                    <h4 className="font-serif text-sm font-bold tracking-wide text-white uppercase">
                      {currentTestimonial.name}
                    </h4>
                    <p className="font-sans text-[10px] tracking-wider text-gray-500 uppercase">
                      {currentTestimonial.role}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Slider Controls */}
          {activeTestimonials.length > 1 && (
            <div className="absolute bottom-6 md:bottom-auto md:top-1/2 md:-translate-y-1/2 left-0 right-0 px-4 md:px-8 flex justify-between pointer-events-none">
              <button
                onClick={handlePrev}
                className="p-2 md:p-3 bg-luxury-black/60 hover:bg-gold-400 hover:text-luxury-black text-gold-400 border border-gold-400/10 rounded-full cursor-pointer pointer-events-auto transition-all duration-300 shadow-md"
                aria-label="Previous testimonial"
              >
                <IoArrowBackOutline className="text-sm md:text-base" />
              </button>
              <button
                onClick={handleNext}
                className="p-2 md:p-3 bg-luxury-black/60 hover:bg-gold-400 hover:text-luxury-black text-gold-400 border border-gold-400/10 rounded-full cursor-pointer pointer-events-auto transition-all duration-300 shadow-md"
                aria-label="Next testimonial"
              >
                <IoArrowForwardOutline className="text-sm md:text-base" />
              </button>
            </div>
          )}
        </div>

        {/* Carousel Indicator Dots */}
        {activeTestimonials.length > 1 && (
          <div className="flex items-center justify-center gap-2 mt-8">
            {activeTestimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setDirection(idx > currentIndex ? 1 : -1);
                  setCurrentIndex(idx);
                }}
                className={`h-1.5 transition-all duration-350 rounded-full cursor-pointer ${
                  idx === currentIndex ? 'w-6 bg-gold-400' : 'w-1.5 bg-gray-600'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        )}

        {/* Write a Review Button */}
        <div className="flex justify-center mt-12">
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-8 py-3.5 border border-gold-400/20 hover:border-gold-400 text-gold-400 hover:text-white font-sans text-xs tracking-widest uppercase rounded-sm cursor-pointer transition-all duration-300 hover:bg-gold-400/10"
          >
            Write a Review
          </button>
        </div>
      </div>

      {/* ── WRITE A REVIEW POPUP MODAL ── */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
            
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              transition={{ type: 'spring', damping: 25, stiffness: 250 }}
              className="relative w-full max-w-md bg-luxury-charcoal border border-gold-400/30 rounded-md shadow-2xl overflow-hidden p-6 md:p-8"
            >
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gold-400 text-lg cursor-pointer focus:outline-none"
              >
                <FaTimes />
              </button>

              <h3 className="font-serif text-lg md:text-xl text-white font-bold tracking-wide uppercase mb-2">
                Share Your Experience
              </h3>
              <p className="font-sans text-xs text-gray-400 mb-6 font-light">
                Your review will be submitted to the hotel administration desk for confirmation before publishing.
              </p>

              {submitSuccess ? (
                <div className="py-8 text-center space-y-3">
                  <div className="w-12 h-12 bg-green-500/10 border border-green-500/30 text-green-400 text-xl rounded-full flex items-center justify-center mx-auto mb-4">
                    ✓
                  </div>
                  <h4 className="font-serif text-sm font-semibold text-white uppercase tracking-wider">Review Submitted!</h4>
                  <p className="font-sans text-xs text-gray-400 font-light leading-relaxed">
                    Thank you for sharing your valuable feedback. Our front office manager will review and display it shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmitReview} className="space-y-4 text-left">
                  {/* Name */}
                  <div className="flex flex-col">
                    <label className="font-sans text-[10px] uppercase tracking-wider text-gold-400 mb-1.5 font-medium">Your Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="e.g. Praveen Sethu"
                      className="bg-luxury-black/40 border border-gold-400/10 hover:border-gold-400/20 focus:border-gold-400 text-white placeholder-gray-600 px-3 py-2.5 rounded-sm font-sans text-xs focus:outline-none transition-colors"
                      required
                    />
                  </div>

                  {/* Subtitle/Role */}
                  <div className="flex flex-col">
                    <label className="font-sans text-[10px] uppercase tracking-wider text-gold-400 mb-1.5 font-medium">Guest Subtitle (Optional)</label>
                    <input
                      type="text"
                      value={formData.role}
                      onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
                      placeholder="e.g. Family Traveler, Chennai"
                      className="bg-luxury-black/40 border border-gold-400/10 hover:border-gold-400/20 focus:border-gold-400 text-white placeholder-gray-600 px-3 py-2.5 rounded-sm font-sans text-xs focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Star Rating */}
                  <div className="flex flex-col">
                    <label className="font-sans text-[10px] uppercase tracking-wider text-gold-400 mb-1.5 font-medium">Star Rating</label>
                    <div className="flex items-center gap-2 py-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, rating: star }))}
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(star)}
                          className="text-lg transition-transform hover:scale-115 cursor-pointer focus:outline-none"
                        >
                          <FaStar
                            className={
                              star <= (hoverRating || formData.rating)
                                ? "text-gold-400"
                                : "text-gray-700"
                            }
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Review Text */}
                  <div className="flex flex-col">
                    <label className="font-sans text-[10px] uppercase tracking-wider text-gold-400 mb-1.5 font-medium">Your Review</label>
                    <textarea
                      value={formData.text}
                      onChange={(e) => setFormData(prev => ({ ...prev, text: e.target.value }))}
                      placeholder="Write your stay experience..."
                      rows="4"
                      className="bg-luxury-black/40 border border-gold-400/10 hover:border-gold-400/20 focus:border-gold-400 text-white placeholder-gray-600 p-3 rounded-sm font-sans text-xs focus:outline-none transition-colors resize-none"
                      required
                    ></textarea>
                  </div>

                  {/* Buttons */}
                  <div className="flex items-center justify-end gap-3 pt-3 border-t border-gold-400/10">
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="px-4 py-2 border border-gold-400/10 hover:border-gold-400/30 text-gray-400 text-[10px] tracking-wider uppercase rounded-sm cursor-pointer transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2.5 bg-gold-400 hover:bg-gold-500 text-luxury-black font-semibold text-[10px] tracking-wider uppercase rounded-sm cursor-pointer transition-colors"
                    >
                      Submit Review
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Testimonials;
