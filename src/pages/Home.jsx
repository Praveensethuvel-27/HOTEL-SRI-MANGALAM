import React from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import Rooms from '../components/Rooms';
import VenueSection from '../components/VenueSection';
import Facilities from '../components/Facilities';
import Testimonials from '../components/Testimonials';

const Home = () => {
  return (
    <>
      <Hero />
      <About />
      <Rooms />
      <VenueSection />
      <Facilities />
      <Testimonials />
    </>
  );
};

export default Home;
