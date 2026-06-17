import React from 'react';
import PageHeader from '../components/PageHeader';
import Rooms from '../components/Rooms';

const RoomsPage = () => {
  return (
    <div>
      <PageHeader
        title="Rooms & Suites"
        subtitle="Immerse yourself in world-class architecture and details designed specifically to provide comfort and luxury"
        bgImage="https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=1920&auto=format&fit=crop"
      />
      <Rooms hideTitle={true} />
    </div>
  );
};

export default RoomsPage;
