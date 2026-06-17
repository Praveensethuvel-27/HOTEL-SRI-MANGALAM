import React from 'react';
import PageHeader from '../components/PageHeader';
import Booking from '../components/Booking';

const BookingPage = () => {
  return (
    <div>
      <PageHeader
        title="Reservations"
        subtitle="Book your premium stay with us and let our reservation desk curate your ideal hospitality experience"
        bgImage="https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1920&auto=format&fit=crop"
      />
      <Booking hideTitle={true} />
    </div>
  );
};

export default BookingPage;
