import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaWifi, FaTv, FaSnowflake, FaBed, FaCoffee, FaBath, FaUsers } from 'react-icons/fa';
import { BiExpand } from 'react-icons/bi';

const roomsData = [
  {
    id: 'standard',
    name: 'Standard Room',
    image: '/images/pic6.jpg',
    description: 'A comfortable and well-furnished room ideal for solo travelers and couples, featuring twin beds, modern décor, and all essential amenities for a refreshing stay.',
    size: '24 m²',
    bed: 'Twin Beds',
    price: 1800,
    amenities: [
      { icon: <FaWifi />, name: 'Free Wi-Fi' },
      { icon: <FaSnowflake />, name: 'Air Conditioning' },
      { icon: <FaTv />, name: 'Smart TV' },
      { icon: <FaBed />, name: 'Twin Beds' },
    ],
  },
  {
    id: 'deluxe',
    name: 'Deluxe Room',
    image: '/images/pic7.jpg',
    description: 'An elevated experience with a spacious king-size bed, premium furnishings, and stylish interiors — perfect for business travelers or couples seeking extra comfort.',
    size: '32 m²',
    bed: 'King Bed',
    price: 2500,
    amenities: [
      { icon: <FaWifi />, name: 'Free Wi-Fi' },
      { icon: <FaSnowflake />, name: 'Air Conditioning' },
      { icon: <FaTv />, name: 'Smart TV' },
      { icon: <FaCoffee />, name: 'Coffee Maker' },
    ],
  },
  {
    id: 'suite',
    name: 'Suite Room',
    image: '/images/pic14.jpg',
    description: 'Our crown jewel — indulge in a luxuriously decorated suite with floral bedding arrangements, premium king-size bed, and a warm ambiance crafted for honeymooners and VIP guests.',
    size: '50 m²',
    bed: 'King Bed (Premium)',
    price: 3800,
    amenities: [
      { icon: <FaWifi />, name: 'High-speed Wi-Fi' },
      { icon: <FaSnowflake />, name: 'Climate Control' },
      { icon: <FaTv />, name: 'LED TV' },
      { icon: <FaBath />, name: 'Premium Bath' },
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
              Three distinct accommodation categories designed to offer comfort, style, and memorable stays at Mangalam Residency.
            </p>
          </div>
        )}

        {/* Rooms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
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
                  <span className="font-serif text-2xl font-bold text-gold-400">₹{room.price.toLocaleString()}</span>
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
                    Room Amenities
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
