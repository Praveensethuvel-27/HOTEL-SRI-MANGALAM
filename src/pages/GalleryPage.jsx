import React from 'react';
import PageHeader from '../components/PageHeader';
import Gallery from '../components/Gallery';

const GalleryPage = () => {
  return (
    <div>
      <PageHeader
        title="Our Gallery"
        subtitle="A visual journey into our grand estate, elegant rooms, dining halls and modern facilities"
        bgImage="https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1920&auto=format&fit=crop"
      />
      <Gallery hideTitle={true} />
    </div>
  );
};

export default GalleryPage;
