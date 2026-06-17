import React from 'react';
import PageHeader from '../components/PageHeader';
import About from '../components/About';

const AboutPage = () => {
  return (
    <div>
      <PageHeader
        title="About Us"
        subtitle="A heritage of luxury, exceptional hospitality and refined service since 2011"
        bgImage="https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=1920&auto=format&fit=crop"
      />
      <About hideTitle={true} />
    </div>
  );
};

export default AboutPage;
