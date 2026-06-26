import React from 'react';
import PageHeader from '../components/PageHeader';
import VenueSection from '../components/VenueSection';

const VenuePage = () => {
  return (
    <div>
      <PageHeader
        title="Mangalam Venue"
        subtitle="A grand multi-purpose event space catering to weddings, conferences, and special functions for 500 to 700 guests."
        bgImage="/images/pic8.jpg"
      />
      <VenueSection hideTitle={true} />
    </div>
  );
};

export default VenuePage;
