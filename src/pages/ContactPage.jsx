import React from 'react';
import PageHeader from '../components/PageHeader';
import Contact from '../components/Contact';

const ContactPage = () => {
  return (
    <div>
      <PageHeader
        title="Contact Us"
        subtitle="Located in Kariapatti, Tamil Nadu. Reach us anytime — our front desk is open 24/7"
        bgImage="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=1920&auto=format&fit=crop"
      />
      <Contact hideTitle={true} />
    </div>
  );
};

export default ContactPage;
