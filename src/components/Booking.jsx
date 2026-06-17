import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaCrown } from 'react-icons/fa';
import logo from '../assets/logo.png';
import { FiCheckCircle, FiCalendar, FiUser, FiMail, FiPhone, FiChevronDown, FiMessageSquare } from 'react-icons/fi';

const roomOptions = [
  { value: 'deluxe', label: 'Deluxe Room' },
  { value: 'executive', label: 'Executive Room' },
  { value: 'family', label: 'Family Room' },
  { value: 'premium-suite', label: 'Premium Suite' }
];

const Booking = ({ hideTitle = false }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    mobileNumber: '',
    emailAddress: '',
    checkInDate: '',
    checkOutDate: '',
    guestsCount: '1',
    roomType: 'deluxe',
    specialRequest: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [bookingRef, setBookingRef] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear field error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const tempErrors = {};
    const today = new Date().toISOString().split('T')[0];

    if (!formData.fullName.trim()) tempErrors.fullName = 'Full name is required';
    
    if (!formData.mobileNumber.trim()) {
      tempErrors.mobileNumber = 'Mobile number is required';
    } else if (!/^\+?[0-9\s-]{10,14}$/.test(formData.mobileNumber)) {
      tempErrors.mobileNumber = 'Please enter a valid mobile number';
    }

    if (!formData.emailAddress.trim()) {
      tempErrors.emailAddress = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.emailAddress)) {
      tempErrors.emailAddress = 'Please enter a valid email address';
    }

    if (!formData.checkInDate) {
      tempErrors.checkInDate = 'Check-in date is required';
    } else if (formData.checkInDate < today) {
      tempErrors.checkInDate = 'Check-in cannot be in the past';
    }

    if (!formData.checkOutDate) {
      tempErrors.checkOutDate = 'Check-out date is required';
    } else if (formData.checkOutDate <= formData.checkInDate) {
      tempErrors.checkOutDate = 'Check-out must be after check-in';
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Generate unique booking reference number
      const randomRef = 'SRI-' + Math.floor(100000 + Math.random() * 900000);
      setBookingRef(randomRef);

      const newBooking = {
        id: randomRef,
        fullName: formData.fullName,
        mobileNumber: formData.mobileNumber,
        emailAddress: formData.emailAddress,
        checkInDate: formData.checkInDate,
        checkOutDate: formData.checkOutDate,
        guestsCount: formData.guestsCount,
        roomType: formData.roomType,
        specialRequest: formData.specialRequest,
        status: 'pending',
        submittedAt: new Date().toISOString(),
        bookingRef: randomRef
      };

      // Save to localStorage
      try {
        const existingBookingsJson = localStorage.getItem('hotel_bookings');
        const existingBookings = existingBookingsJson ? JSON.parse(existingBookingsJson) : [];
        existingBookings.unshift(newBooking); // add new booking to top of list
        localStorage.setItem('hotel_bookings', JSON.stringify(existingBookings));
      } catch (err) {
        console.error('Failed to save booking to localStorage:', err);
      }

      console.log('Booking Enquiry Saved to LocalStorage:', newBooking);
      setIsSubmitted(true);
    }
  };

  const resetForm = () => {
    setFormData({
      fullName: '',
      mobileNumber: '',
      emailAddress: '',
      checkInDate: '',
      checkOutDate: '',
      guestsCount: '1',
      roomType: 'deluxe',
      specialRequest: ''
    });
    setErrors({});
    setIsSubmitted(false);
  };

  // Get tomorrow's date string for input restrictions
  const getTomorrow = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  // Print receipt in a dedicated clean print window
  const handlePrint = () => {
    const roomLabel = roomOptions.find(o => o.value === formData.roomType)?.label || formData.roomType;
    // Construct absolute logo URL so it resolves correctly in about:blank print window
    const logoUrl = new URL(logo, window.location.origin).href;
    const printWindow = window.open('', '_blank', 'width=800,height=900');
    if (!printWindow) return;
    printWindow.document.write(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Booking Receipt — Hotel Sri Mangalam</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Montserrat:wght@300;400;500;600&display=swap');
          @page { size: A4 portrait; margin: 15mm 15mm; }
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body { font-family: 'Montserrat', sans-serif; background: #fff; color: #111; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          .receipt { max-width: 680px; margin: 0 auto; padding: 10px; }
          /* Header */
          .header { background: #faf7f2; border: 2px solid #c5a880; border-radius: 8px 8px 0 0; padding: 20px 24px; display: flex; align-items: center; justify-content: space-between; }
          .header-left { display: flex; align-items: center; gap: 14px; }
          .header-left img { width: 60px; height: 60px; object-fit: contain; }
          .hotel-name { font-family: 'Playfair Display', serif; font-size: 18px; font-weight: 700; color: #a08259; letter-spacing: 0.08em; text-transform: uppercase; }
          .hotel-addr { font-size: 9px; color: #777; text-transform: uppercase; letter-spacing: 0.08em; margin-top: 3px; }
          .badge { font-size: 8px; font-weight: 600; letter-spacing: 0.2em; text-transform: uppercase; background: rgba(197,168,128,0.15); border: 1px solid #c5a880; color: #a08259; padding: 4px 10px; border-radius: 3px; }
          /* Body */
          .body { border: 2px solid #c5a880; border-top: none; padding: 24px; }
          /* Ref + Status row */
          .ref-status { display: flex; justify-content: space-between; align-items: center; background: #f4f1eb; border: 1px solid #e2c9a5; border-radius: 4px; padding: 12px 16px; margin-bottom: 20px; }
          .ref-label, .status-label { font-size: 8px; text-transform: uppercase; letter-spacing: 0.15em; color: #888; font-weight: 600; }
          .ref-value { font-family: 'Playfair Display', serif; font-size: 15px; font-weight: 700; color: #a08259; margin-top: 2px; }
          .status-value { font-size: 11px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: #c08000; margin-top: 2px; text-align: right; }
          /* Info grid */
          .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px 24px; border-bottom: 1px solid #e2c9a5; padding-bottom: 18px; margin-bottom: 18px; }
          .info-grid.full { grid-template-columns: 1fr; }
          .field-label { font-size: 8px; text-transform: uppercase; letter-spacing: 0.15em; color: #888; font-weight: 600; margin-bottom: 3px; }
          .field-value { font-size: 12px; color: #111; font-weight: 500; }
          .field-value.gold { color: #a08259; font-family: 'Playfair Display', serif; font-weight: 700; }
          /* Divider title */
          .section-title { font-family: 'Playfair Display', serif; font-size: 10px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: #a08259; margin-bottom: 10px; }
          /* Special request box */
          .special-box { background: #faf7f2; border: 1px solid #e2c9a5; border-radius: 4px; padding: 10px 14px; font-size: 11px; color: #333; line-height: 1.6; margin-bottom: 18px; }
          /* Rules section */
          .rules-box { background: #faf7f2; border: 1px solid #e2c9a5; border-radius: 4px; padding: 14px 18px; margin-bottom: 18px; }
          .rules-box ol { padding-left: 18px; }
          .rules-box li { font-size: 9px; color: #444; line-height: 1.7; }
          /* Footer */
          .footer { border-top: 1px dashed #c5a880; padding-top: 14px; display: flex; justify-content: space-between; align-items: center; }
          .footer-text { font-size: 9px; color: #888; letter-spacing: 0.08em; }
          .footer-brand { font-size: 9px; color: #a08259; font-weight: 600; letter-spacing: 0.15em; text-transform: uppercase; }
          @media print { body { margin: 0; } button { display: none !important; } }
        </style>
      </head>
      <body>
        <div class="receipt">
          <!-- Header -->
          <div class="header">
            <div class="header-left">
              <img src="${logoUrl}" alt="Hotel Sri Mangalam Logo" />
              <div>
                <div class="hotel-name">Hotel Sri Mangalam</div>
                <div class="hotel-addr">M3GQ+PF5, Tuticorin - Madurai Rd, Kariapatti, Tamil Nadu 626106</div>
                <div class="hotel-addr" style="margin-top:2px">Ph: +91 98765 43210 &nbsp;|&nbsp; check-in: 12:00 PM &nbsp;|&nbsp; Check-out: 11:00 AM</div>
              </div>
            </div>
            <div class="badge">Reservation Receipt</div>
          </div>

          <!-- Body -->
          <div class="body">
            <!-- Ref + Status -->
            <div class="ref-status">
              <div>
                <div class="ref-label">Reference ID</div>
                <div class="ref-value">${bookingRef}</div>
              </div>
              <div>
                <div class="status-label">Status</div>
                <div class="status-value">PENDING CONFIRMATION</div>
              </div>
            </div>

            <!-- Guest Details -->
            <div class="section-title">Guest Information</div>
            <div class="info-grid" style="margin-bottom:18px">
              <div>
                <div class="field-label">Guest Name</div>
                <div class="field-value">${formData.fullName}</div>
              </div>
              <div>
                <div class="field-label">Mobile Number</div>
                <div class="field-value">${formData.mobileNumber}</div>
              </div>
              <div style="grid-column: span 2">
                <div class="field-label">Email Address</div>
                <div class="field-value">${formData.emailAddress}</div>
              </div>
            </div>

            <!-- Stay Details -->
            <div class="section-title" style="border-top: 1px solid #e2c9a5; padding-top: 16px;">Stay Details</div>
            <div class="info-grid" style="margin-bottom:18px">
              <div>
                <div class="field-label">Check-In Date</div>
                <div class="field-value">${formData.checkInDate}</div>
              </div>
              <div>
                <div class="field-label">Check-Out Date</div>
                <div class="field-value">${formData.checkOutDate}</div>
              </div>
              <div>
                <div class="field-label">Room / Suite</div>
                <div class="field-value gold">${roomLabel}</div>
              </div>
              <div>
                <div class="field-label">No. of Guests</div>
                <div class="field-value">${formData.guestsCount} Guest(s)</div>
              </div>
            </div>

            <!-- Special Request -->
            ${formData.specialRequest ? `
            <div class="section-title" style="border-top: 1px solid #e2c9a5; padding-top: 16px;">Special Request</div>
            <div class="special-box">${formData.specialRequest}</div>` : ''}

            <!-- Rules & Regulations -->
            <div class="section-title" style="border-top: 1px solid #e2c9a5; padding-top: 16px;">Hotel Rules &amp; Regulations</div>
            <div class="rules-box">
              <ol>
                <li>Government-issued photo ID proof (Aadhaar Card, Passport) is mandatory at check-in.</li>
                <li>Standard Check-in time: 12:00 PM &nbsp;|&nbsp; Check-out time: 11:00 AM.</li>
                <li>Cancellation must be processed at least 24 hours prior to the check-in date.</li>
                <li>Smoking is strictly prohibited inside all guest rooms, corridors, and lobby areas.</li>
                <li>The management is not responsible for any loss or damage to personal valuables.</li>
              </ol>
            </div>

            <!-- Footer -->
            <div class="footer">
              <div class="footer-text">Submitted: ${new Date().toLocaleString()} &nbsp;|&nbsp; Booking is subject to availability confirmation.</div>
              <div class="footer-brand">Sri Mangalam Desk</div>
            </div>
          </div>
        </div>
        <script>
          function startPrint() {
            setTimeout(function() {
              window.print();
            }, 500);
          }
          if (document.readyState === 'complete' || document.readyState === 'interactive') {
            startPrint();
          } else {
            window.addEventListener('DOMContentLoaded', startPrint);
          }
        </script>
      </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
  };

  return (
    <section id="booking" className="py-24 bg-luxury-charcoal relative overflow-hidden">
      {/* Decorative blurred rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gold-400/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6">
        {/* Section Header */}
        {!hideTitle && (
          <div className="text-center mb-16">
            <span className="font-sans text-xs md:text-sm tracking-[0.3em] uppercase text-gold-400 font-semibold block mb-3">
              Reservations
            </span>
            <h2 className="font-serif text-3xl md:text-5xl text-white font-bold tracking-wide uppercase">
              Booking Enquiry
            </h2>
            <div className="w-16 h-[1px] bg-gold-400 mx-auto mt-4" />
            <p className="font-sans text-gray-400 text-sm md:text-base font-light mt-4">
              Send us your preference details and our reservation manager will reach out within 2 hours to confirm your booking.
            </p>
          </div>
        )}

        {/* Form Container */}
        <div className="glass-card bg-luxury-black/50 p-8 md:p-12 border border-gold-400/15 relative rounded-sm shadow-2xl">
          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.form
                key="booking-form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="space-y-6"
                noValidate
              >
                {/* Full Name & Email Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Full Name */}
                  <div className="flex flex-col">
                    <label className="font-sans text-xs uppercase tracking-widest text-gold-400 mb-2 font-medium flex items-center gap-1.5">
                      <FiUser /> Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="e.g. John Doe"
                      className={`w-full bg-luxury-gray/40 border ${errors.fullName ? 'border-red-500' : 'border-gold-400/10'} hover:border-gold-400/35 focus:border-gold-400 text-white placeholder-gray-600 px-4 py-3 rounded-sm font-sans text-sm focus:outline-none transition-all duration-300`}
                    />
                    {errors.fullName && <span className="text-red-500 text-[10px] mt-1 tracking-wider">{errors.fullName}</span>}
                  </div>

                  {/* Email Address */}
                  <div className="flex flex-col">
                    <label className="font-sans text-xs uppercase tracking-widest text-gold-400 mb-2 font-medium flex items-center gap-1.5">
                      <FiMail /> Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="emailAddress"
                      value={formData.emailAddress}
                      onChange={handleChange}
                      placeholder="e.g. john@example.com"
                      className={`w-full bg-luxury-gray/40 border ${errors.emailAddress ? 'border-red-500' : 'border-gold-400/10'} hover:border-gold-400/35 focus:border-gold-400 text-white placeholder-gray-600 px-4 py-3 rounded-sm font-sans text-sm focus:outline-none transition-all duration-300`}
                    />
                    {errors.emailAddress && <span className="text-red-500 text-[10px] mt-1 tracking-wider">{errors.emailAddress}</span>}
                  </div>
                </div>

                {/* Mobile Number & Guests Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Mobile Number */}
                  <div className="flex flex-col">
                    <label className="font-sans text-xs uppercase tracking-widest text-gold-400 mb-2 font-medium flex items-center gap-1.5">
                      <FiPhone /> Mobile Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="mobileNumber"
                      value={formData.mobileNumber}
                      onChange={handleChange}
                      placeholder="e.g. +91 9876543210"
                      className={`w-full bg-luxury-gray/40 border ${errors.mobileNumber ? 'border-red-500' : 'border-gold-400/10'} hover:border-gold-400/35 focus:border-gold-400 text-white placeholder-gray-600 px-4 py-3 rounded-sm font-sans text-sm focus:outline-none transition-all duration-300`}
                    />
                    {errors.mobileNumber && <span className="text-red-500 text-[10px] mt-1 tracking-wider">{errors.mobileNumber}</span>}
                  </div>

                  {/* Number Of Guests */}
                  <div className="flex flex-col">
                    <label className="font-sans text-xs uppercase tracking-widest text-gold-400 mb-2 font-medium">
                      Number of Guests
                    </label>
                    <div className="relative">
                      <select
                        name="guestsCount"
                        value={formData.guestsCount}
                        onChange={handleChange}
                        className="w-full bg-luxury-gray/40 border border-gold-400/10 hover:border-gold-400/35 focus:border-gold-400 text-white px-4 py-3 rounded-sm font-sans text-sm focus:outline-none appearance-none transition-all duration-300 cursor-pointer"
                      >
                        <option value="1" className="bg-luxury-charcoal text-white">1 Guest</option>
                        <option value="2" className="bg-luxury-charcoal text-white">2 Guests</option>
                        <option value="3" className="bg-luxury-charcoal text-white">3 Guests</option>
                        <option value="4" className="bg-luxury-charcoal text-white">4 Guests</option>
                        <option value="5+" className="bg-luxury-charcoal text-white">5+ Guests</option>
                      </select>
                      <FiChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gold-400 pointer-events-none" />
                    </div>
                  </div>
                </div>

                {/* Check-In & Check-Out Date Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Check-In Date */}
                  <div className="flex flex-col">
                    <label className="font-sans text-xs uppercase tracking-widest text-gold-400 mb-2 font-medium flex items-center gap-1.5">
                      <FiCalendar /> Check-In Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      name="checkInDate"
                      value={formData.checkInDate}
                      onChange={handleChange}
                      min={new Date().toISOString().split('T')[0]}
                      className={`w-full bg-luxury-gray/40 border ${errors.checkInDate ? 'border-red-500' : 'border-gold-400/10'} focus:border-gold-400 text-white px-4 py-3 rounded-sm font-sans text-sm focus:outline-none transition-all duration-300 cursor-pointer [color-scheme:dark]`}
                    />
                    {errors.checkInDate && <span className="text-red-500 text-[10px] mt-1 tracking-wider">{errors.checkInDate}</span>}
                  </div>

                  {/* Check-Out Date */}
                  <div className="flex flex-col">
                    <label className="font-sans text-xs uppercase tracking-widest text-gold-400 mb-2 font-medium flex items-center gap-1.5">
                      <FiCalendar /> Check-Out Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      name="checkOutDate"
                      value={formData.checkOutDate}
                      onChange={handleChange}
                      min={formData.checkInDate || getTomorrow()}
                      className={`w-full bg-luxury-gray/40 border ${errors.checkOutDate ? 'border-red-500' : 'border-gold-400/10'} focus:border-gold-400 text-white px-4 py-3 rounded-sm font-sans text-sm focus:outline-none transition-all duration-300 cursor-pointer [color-scheme:dark]`}
                    />
                    {errors.checkOutDate && <span className="text-red-500 text-[10px] mt-1 tracking-wider">{errors.checkOutDate}</span>}
                  </div>
                </div>

                {/* Room Type Select */}
                <div className="flex flex-col">
                  <label className="font-sans text-xs uppercase tracking-widest text-gold-400 mb-2 font-medium">
                    Room or Suite Type
                  </label>
                  <div className="relative">
                    <select
                      name="roomType"
                      value={formData.roomType}
                      onChange={handleChange}
                      className="w-full bg-luxury-gray/40 border border-gold-400/10 hover:border-gold-400/35 focus:border-gold-400 text-white px-4 py-3 rounded-sm font-sans text-sm focus:outline-none appearance-none transition-all duration-300 cursor-pointer"
                    >
                      {roomOptions.map(option => (
                        <option key={option.value} value={option.value} className="bg-luxury-charcoal text-white">
                          {option.label}
                        </option>
                      ))}
                    </select>
                    <FiChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gold-400 pointer-events-none" />
                  </div>
                </div>

                {/* Special Requests */}
                <div className="flex flex-col">
                  <label className="font-sans text-xs uppercase tracking-widest text-gold-400 mb-2 font-medium flex items-center gap-1.5">
                    <FiMessageSquare /> Special Request (Optional)
                  </label>
                  <textarea
                    name="specialRequest"
                    value={formData.specialRequest}
                    onChange={handleChange}
                    rows="3"
                    placeholder="e.g. Airport shuttle request, high floor, early check-in, extra towels..."
                    className="w-full bg-luxury-gray/40 border border-gold-400/10 hover:border-gold-400/35 focus:border-gold-400 text-white placeholder-gray-600 px-4 py-3 rounded-sm font-sans text-sm focus:outline-none resize-none transition-all duration-300"
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full py-4 bg-gold-400 hover:bg-gold-500 text-luxury-black font-semibold font-sans text-xs tracking-widest uppercase rounded-sm transition-all duration-300 shadow-lg hover:shadow-[0_0_15px_rgba(197,168,128,0.4)] cursor-pointer"
                  >
                    Submit Booking Request
                  </button>
                </div>
              </motion.form>
            ) : (
              /* Success Confirmation Ticket UI */
              <motion.div
                key="booking-success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center py-6 flex flex-col items-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
                  className="text-gold-400 text-6xl mb-6"
                >
                  <FiCheckCircle />
                </motion.div>

                <h3 className="font-serif text-2xl md:text-3xl text-white font-bold mb-2 tracking-wide uppercase">
                  Reservation Enquiry Sent
                </h3>
                <p className="font-sans text-gray-400 text-sm font-light max-w-md mb-8 leading-relaxed">
                  Thank you, <span className="font-medium text-white">{formData.fullName}</span>. Your reservation request has been processed successfully.
                </p>

                 {/* Luxury Boarding Pass Ticket */}
                <div className="w-full max-w-md bg-luxury-charcoal/80 border border-gold-400/25 rounded-md overflow-hidden shadow-2xl relative text-left printable-ticket">
                  {/* Decorative Ticket Punch Holes */}
                  <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-luxury-black border-r border-gold-400/25 z-10 print-hide" />
                  <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-luxury-black border-l border-gold-400/25 z-10 print-hide" />

                  {/* Ticket Header (Branded Logo & Address) */}
                  <div className="bg-gold-400/10 border-b border-gold-400/15 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <img src={logo} alt="Hotel Sri Mangalam" className="w-10 h-10 object-contain drop-shadow-[0_0_8px_rgba(197,168,128,0.3)]" />
                      <div className="flex flex-col">
                        <span className="font-serif text-sm font-bold tracking-[0.1em] uppercase text-gold-400">Hotel Sri Mangalam</span>
                        <span className="font-sans text-[7.5px] tracking-wide text-gray-500 uppercase mt-0.5 leading-tight">M3GQ+PF5, Tuticorin - Madurai Rd, Kariapatti, TN 626106</span>
                      </div>
                    </div>
                    <span className="font-sans text-[8px] tracking-widest text-gold-300 font-semibold px-2 py-0.5 bg-gold-400/20 border border-gold-400/30 rounded-sm self-start sm:self-center">
                      RESERVATION
                    </span>
                  </div>

                  {/* Ticket Details */}
                  <div className="p-5 grid grid-cols-2 gap-y-4 gap-x-6">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-gray-500 font-medium font-sans">GUEST NAME</span>
                      <span className="text-xs text-white block truncate font-sans font-medium mt-0.5">{formData.fullName}</span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-gray-500 font-medium font-sans">REFERENCE ID</span>
                      <span className="text-xs text-gold-400 block font-serif font-bold mt-0.5">{bookingRef}</span>
                    </div>

                    <div className="border-t border-luxury-light-gray/50 pt-3">
                      <span className="text-[10px] uppercase tracking-wider text-gray-500 font-medium font-sans">CHECK-IN</span>
                      <span className="text-xs text-white block font-sans mt-0.5">{formData.checkInDate}</span>
                    </div>
                    <div className="border-t border-luxury-light-gray/50 pt-3">
                      <span className="text-[10px] uppercase tracking-wider text-gray-500 font-medium font-sans">CHECK-OUT</span>
                      <span className="text-xs text-white block font-sans mt-0.5">{formData.checkOutDate}</span>
                    </div>

                    <div className="border-t border-luxury-light-gray/50 pt-3">
                      <span className="text-[10px] uppercase tracking-wider text-gray-500 font-medium font-sans">ROOM SELECTION</span>
                      <span className="text-xs text-white block font-sans capitalize mt-0.5">
                        {roomOptions.find(o => o.value === formData.roomType)?.label || formData.roomType}
                      </span>
                    </div>
                    <div className="border-t border-luxury-light-gray/50 pt-3">
                      <span className="text-[10px] uppercase tracking-wider text-gray-500 font-medium font-sans">GUEST COUNT</span>
                      <span className="text-xs text-white block font-sans mt-0.5">{formData.guestsCount} Guest(s)</span>
                    </div>
                  </div>

                  {/* Hotel Rules & Regulations */}
                  <div className="p-5 border-t border-luxury-light-gray/50 bg-luxury-black/10">
                    <span className="font-serif text-[10px] tracking-widest uppercase text-gold-400 font-bold block mb-2">Hotel Rules & Regulations</span>
                    <ul className="space-y-1.5 text-[8.5px] text-gray-400 leading-normal list-decimal list-inside font-sans font-light">
                      <li>Government ID proof (Aadhaar, Passport) is mandatory for check-in.</li>
                      <li>Standard Check-in time: 12:00 PM | Check-out time: 11:00 AM.</li>
                      <li>Cancellation must be processed 24 hours prior to check-in.</li>
                      <li>Smoking is strictly prohibited inside guest rooms and lobby.</li>
                      <li>The management is not responsible for any loss of personal valuables.</li>
                    </ul>
                  </div>

                  {/* Ticket Footer */}
                  <div className="border-t border-dashed border-gold-400/20 p-5 bg-gold-400/[0.02] flex items-center justify-between text-[10px] font-sans text-gray-500 tracking-wider">
                    <span>* Reservation manager contact: +91 98765 43210</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-8 flex flex-wrap gap-4 justify-center print-hide">
                  <button
                    onClick={handlePrint}
                    className="px-6 py-2.5 bg-gold-400 hover:bg-gold-500 text-luxury-black font-semibold font-sans text-xs tracking-widest uppercase rounded-sm transition-all duration-300 cursor-pointer shadow-md"
                  >
                    Print Receipt
                  </button>
                  <button
                    onClick={resetForm}
                    className="px-6 py-2.5 border border-white/20 hover:border-gold-400 text-white hover:text-gold-400 font-sans text-xs tracking-widest uppercase rounded-sm transition-all duration-300 cursor-pointer"
                  >
                    New Reservation
                  </button>
                  <Link
                    to="/"
                    className="px-6 py-2.5 border border-white/20 hover:border-gold-400 text-white hover:text-gold-400 font-sans text-xs tracking-widest uppercase rounded-sm transition-all duration-300"
                  >
                    Return Home
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Booking;
