import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaWifi, 
  FaSnowflake, 
  FaUtensils, 
  FaConciergeBell, 
  FaParking, 
  FaVideo, 
  FaShower, 
  FaUsers, 
  FaClock, 
  FaLightbulb, 
  FaBroom, 
  FaCouch 
} from 'react-icons/fa';

const facilitiesData = [
  {
    id: 1,
    name: 'Free High-Speed Wi-Fi',
    icon: <FaWifi />,
    description: 'Uninterrupted gigabit-speed wireless internet access across all rooms and public lounges.',
  },
  {
    id: 2,
    name: 'Air Conditioning',
    icon: <FaSnowflake />,
    description: 'Individually adjustable digital climate control thermostats in every suite.',
  },
  {
    id: 3,
    name: 'Mangalam Restaurant',
    icon: <FaUtensils />,
    description: 'Indulge in authentic multi-cuisine dining options prepared by our Michelin-starred team.',
  },
  {
    id: 4,
    name: '24/7 Room Service',
    icon: <FaConciergeBell />,
    description: 'Signature in-room dining and concierge services delivered directly to your bed-side.',
  },
  {
    id: 5,
    name: 'Free Secure Valet Parking',
    icon: <FaParking />,
    description: 'Complimentary secure private parking deck monitored by professional valets.',
  },
  {
    id: 6,
    name: 'CCTV Security Monitoring',
    icon: <FaVideo />,
    description: 'Around-the-clock patrol team and advanced surveillance systems securing your peace of mind.',
  },
  {
    id: 7,
    name: 'Continuous Hot Water',
    icon: <FaShower />,
    description: 'Instant and continuous hot water pressure flowing in all designer bathrooms.',
  },
  {
    id: 8,
    name: 'Family-Friendly Rooms',
    icon: <FaUsers />,
    description: 'Interconnected rooms, child beds, and play options configured for perfect family stays.',
  },
  {
    id: 9,
    name: '24/7 Concierge Reception',
    icon: <FaClock />,
    description: 'Dedicated front office welcoming you with quick check-in and check-out at any hour.',
  },
  {
    id: 10,
    name: '100% Power Backup',
    icon: <FaLightbulb />,
    description: 'Uninterrupted power systems ensuring all hotel amenities run seamlessly.',
  },
  {
    id: 11,
    name: 'Premium Daily Housekeeping',
    icon: <FaBroom />,
    description: 'Meticulous cleaning services including fresh linens, towels, and room refresh daily.',
  },
  {
    id: 12,
    name: 'Bespoke Seating Areas',
    icon: <FaCouch />,
    description: 'Comfortably furnished public lobby areas and library corners for quiet conversation.',
  },
];

const Facilities = ({ hideTitle = false }) => {
  return (
    <section id="facilities" className="py-24 bg-luxury-black relative overflow-hidden">
      {/* Background Accent Gradients */}
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-gold-400/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-gold-400/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Title */}
        {!hideTitle && (
          <div className="text-center mb-16">
            <span className="font-sans text-xs md:text-sm tracking-[0.3em] uppercase text-gold-400 font-semibold block mb-3">
              Hotel Amenities
            </span>
            <h2 className="font-serif text-3xl md:text-5xl text-white font-bold tracking-wide uppercase">
              Facilities & Services
            </h2>
            <div className="w-16 h-[1px] bg-gold-400 mx-auto mt-4" />
            <p className="font-sans text-gray-400 text-sm md:text-base font-light max-w-xl mx-auto mt-4">
              Curated hospitality services designed with meticulous attention to detail to ensure you receive a five-star stay.
            </p>
          </div>
        )}

        {/* Facilities Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {facilitiesData.map((facility, index) => (
            <motion.div
              key={facility.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="glass-card p-6 rounded-sm bg-luxury-charcoal/40 border border-gold-400/10 flex flex-col items-start"
            >
              {/* Icon Container with gold accent */}
              <div className="p-3 bg-gold-400/10 text-gold-400 text-2xl md:text-3xl rounded-sm mb-5 border border-gold-400/20 group-hover:bg-gold-400 group-hover:text-luxury-black transition-colors duration-300">
                {facility.icon}
              </div>

              {/* Facility Name */}
              <h3 className="font-serif text-base md:text-lg text-white font-semibold mb-2 tracking-wide">
                {facility.name}
              </h3>

              {/* Description */}
              <p className="font-sans text-xs text-gray-400 font-light leading-relaxed">
                {facility.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Facilities;
