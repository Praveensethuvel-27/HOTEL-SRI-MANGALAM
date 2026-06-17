import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Component Imports
import Loader from './components/Loader';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import WhatsAppButton from './components/WhatsAppButton';

// Page Imports
import Home from './pages/Home';
import AboutPage from './pages/AboutPage';
import RoomsPage from './pages/RoomsPage';
import GalleryPage from './pages/GalleryPage';
import FacilitiesPage from './pages/FacilitiesPage';
import BookingPage from './pages/BookingPage';
import ContactPage from './pages/ContactPage';
import AdminPage from './pages/AdminPage';

// Scroll to top on route change helper
const ScrollToTopOnNavigate = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulating luxury loading sequence
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <ScrollToTopOnNavigate />
      
      {/* Elegant Loading Screen */}
      <AnimatePresence>
        {isLoading && <Loader />}
      </AnimatePresence>

      {/* Main Content Layout */}
      {!isLoading && (
        <div className="flex flex-col min-h-screen relative select-none">
          {/* Header Sticky Navigation */}
          <Navbar />

          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/rooms" element={<RoomsPage />} />
              <Route path="/gallery" element={<GalleryPage />} />
              <Route path="/facilities" element={<FacilitiesPage />} />
              <Route path="/booking" element={<BookingPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/admin" element={<AdminPage />} />
              {/* Fallback route */}
              <Route path="*" element={<Home />} />
            </Routes>
          </main>

          {/* Footer Coordinates */}
          <Footer />

          {/* Floaters */}
          <ScrollToTop />
          <WhatsAppButton />
        </div>
      )}
    </Router>
  );
}

export default App;
