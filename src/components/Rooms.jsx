import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaWifi, FaTv, FaSnowflake, FaBed, FaCoffee, FaBath } from 'react-icons/fa';
import { BiExpand } from 'react-icons/bi';

const roomsData = [
  {
    id: 'deluxe',
    name: 'Deluxe Room',
    image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=800&auto=format&fit=crop',
    description: 'A cozy blend of modern style and supreme comfort, perfect for business travelers or short weekend getaways.',
    size: '32 m²',
    bed: 'King Bed',
    price: 120,
    amenities: [
      { icon: <FaWifi />, name: 'Free Wi-Fi' },
      { icon: <FaSnowflake />, name: 'Air Conditioning' },
      { icon: <FaTv />, name: 'Smart TV' },
      { icon: <FaBed />, name: 'King Bed' },
    ],
  },
  {
    id: 'executive',
    name: 'Executive Room',
    image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=800&auto=format&fit=crop',
    description: 'Elevated luxury with separate working desks, luxury bedding, and beautiful views of the pool deck area.',
    size: '45 m²',
    bed: 'King Bed & Sofa',
    price: 180,
    amenities: [
      { icon: <FaWifi />, name: 'Free Wi-Fi' },
      { icon: <FaSnowflake />, name: 'Air Conditioning' },
      { icon: <FaTv />, name: 'Smart TV' },
      { icon: <FaCoffee />, name: 'Coffee Maker' },
    ],
  },
  {
    id: 'family',
    name: 'Family Room',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=800&auto=format&fit=crop',
    description: 'Spacious accommodations designed with comfort in mind for the whole family, featuring multiple double beds and lounge seating.',
    size: '60 m²',
    bed: '2 Queen Beds',
    price: 240,
    amenities: [
      { icon: <FaWifi />, name: 'Free Wi-Fi' },
      { icon: <FaSnowflake />, name: 'Air Conditioning' },
      { icon: <FaTv />, name: 'Smart TV' },
      { icon: <FaBed />, name: 'Double Beds' },
    ],
  },
  {
    id: 'premium-suite',
    name: 'Premium Suite',
    image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=800&auto=format&fit=crop',
    description: 'Our crown jewel. Indulge in expansive penthouse layouts, a separate dining salon, private bar, and master bath Jacuzzi.',
    size: '85 m²',
    bed: 'Presidential King',
    price: 350,
    amenities: [
      { icon: <FaWifi />, name: 'High-speed Wi-Fi' },
      { icon: <FaSnowflake />, name: 'Climate Control' },
      { icon: <FaTv />, name: '65" OLED TV' },
      { icon: <FaBath />, name: 'Private Jacuzzi' },
    ],
  },
];

const Rooms = ({ hideTitle = false }) => {
  return (
    <section id="rooms" className="py-24 bg-luxury-black relative overflow-hidden">
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-1/3 right-0 w-80 h-80 bg-gold-400/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/3 left-0 w-80 h-80 bg-gold-400/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Title */}
        {!hideTitle && (
          <div className="text-center mb-16">
            <span className="font-sans text-xs md:text-sm tracking-[0.3em] uppercase text-gold-400 font-semibold block mb-3">
              Our Accommodations
            </span>
            <h2 className="font-serif text-3xl md:text-5xl text-white font-bold tracking-wide uppercase">
              Rooms & Suites
            </h2>
            <div className="w-16 h-[1px] bg-gold-400 mx-auto mt-4" />
            <p className="font-sans text-gray-400 text-sm md:text-base font-light max-w-xl mx-auto mt-4">
              Immerse yourself in world-class architecture and details designed specifically to provide comfort and luxury.
            </p>
          </div>
        )}

        {/* Rooms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {roomsData.map((room, index) => (
            <motion.div
              key={room.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="glass-card flex flex-col h-full rounded-sm overflow-hidden border border-gold-400/10 group bg-luxury-charcoal/40"
            >
              {/* Image Container with Zoom */}
              <div className="relative h-64 md:h-72 w-full overflow-hidden">
                <img
                  src={room.image}
                  alt={room.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                {/* Light Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                {/* Size Badge */}
                <div className="absolute top-4 left-4 flex items-center gap-1.5 glass-effect py-1 px-3 text-white text-xs font-semibold rounded-sm">
                  <BiExpand className="text-gold-400" />
                  <span>{room.size}</span>
                </div>

                {/* Price Tag Overlay */}
                <div className="absolute bottom-4 right-4 text-right">
                  <span className="font-sans text-[10px] tracking-widest uppercase text-gray-300 block mb-1">From</span>
                  <span className="font-serif text-2xl font-bold text-gold-400">${room.price}</span>
                  <span className="font-sans text-[10px] text-gray-400">/Night</span>
                </div>
              </div>

              {/* Room Content */}
              <div className="p-6 md:p-8 flex flex-col flex-grow">
                <h3 className="font-serif text-xl md:text-2xl text-white font-bold mb-3 tracking-wide group-hover:text-gold-300 transition-colors">
                  {room.name}
                </h3>
                
                <p className="font-sans text-xs md:text-sm text-gray-400 font-light leading-relaxed mb-6 flex-grow">
                  {room.description}
                </p>

                {/* Amenities Block */}
                <div className="border-t border-luxury-light-gray pt-5 mb-6">
                  <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-gold-400 font-semibold block mb-3">
                    Premium Amenities
                  </span>
                  <div className="grid grid-cols-2 gap-3">
                    {room.amenities.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2.5 text-gray-300 font-sans text-xs font-light">
                        <span className="text-gold-400 text-xs">{item.icon}</span>
                        <span>{item.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA Button */}
                <Link
                  to="/booking"
                  className="block text-center w-full py-3 border border-gold-400 text-gold-400 hover:bg-gold-400 hover:text-luxury-black font-semibold font-sans text-xs tracking-widest uppercase rounded-sm transition-all duration-300 hover:shadow-[0_0_12px_rgba(197,168,128,0.3)] cursor-pointer"
                >
                  Book Room
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Rooms;
