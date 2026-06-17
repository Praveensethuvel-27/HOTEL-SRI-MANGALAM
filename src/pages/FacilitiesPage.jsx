import React from 'react';
import PageHeader from '../components/PageHeader';
import Facilities from '../components/Facilities';

const FacilitiesPage = () => {
  return (
    <div>
      <PageHeader
        title="Facilities & Services"
        subtitle="Curated hospitality services designed with meticulous attention to detail to ensure you receive a five-star stay"
        bgImage="https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=1920&auto=format&fit=crop"
      />
      <Facilities hideTitle={true} />
    </div>
  );
};

export default FacilitiesPage;
