import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaCrown, 
  FaSignOutAlt, 
  FaCheck, 
  FaTimes, 
  FaTrash, 
  FaEye, 
  FaSearch, 
  FaFilter, 
  FaUser, 
  FaEnvelope, 
  FaPhone, 
  FaPrint, 
  FaCalendarAlt, 
  FaDoorOpen, 
  FaRegListAlt,
  FaCheckCircle,
  FaTimesCircle,
  FaHourglassHalf,
  FaStar
} from 'react-icons/fa';
import logo from '../assets/logo.png';
import {
  fetchBookings as apiFetchBookings,
  updateBookingStatus as apiUpdateBookingStatus,
  deleteBooking as apiDeleteBooking,
  fetchReviews as apiFetchReviews,
  updateReviewStatus as apiUpdateReviewStatus,
  deleteReview as apiDeleteReview
} from '../services/api';

const roomOptions = {
  standard: { label: 'Standard Room', price: 1800 },
  deluxe: { label: 'Deluxe Room', price: 2500 },
  suite: { label: 'Suite Room', price: 3800 },
  venue: { label: 'Mangalam Venue', price: 25000 }
};

// Initial Mock Bookings to pre-populate database if empty
const initialMockBookings = [
  {
    id: 'MR-582910',
    fullName: 'Rajesh Kumar',
    mobileNumber: '+91 98765 43210',
    emailAddress: 'rajesh.kumar@example.com',
    checkInDate: '2026-06-18',
    checkOutDate: '2026-06-21',
    guestsCount: '2',
    roomType: 'suite',
    specialRequest: 'Need airport shuttle pick up at Madurai airport.',
    status: 'pending',
    submittedAt: new Date(Date.now() - 2 * 3600000).toISOString(),
    bookingRef: 'MR-582910'
  },
  {
    id: 'MR-849201',
    fullName: 'Meenakshi Sundaram',
    mobileNumber: '+91 94432 12345',
    emailAddress: 'meena.s@example.com',
    checkInDate: '2026-06-20',
    checkOutDate: '2026-06-22',
    guestsCount: '3',
    roomType: 'deluxe',
    specialRequest: 'High floor room preferred, facing the garden view.',
    status: 'confirmed',
    submittedAt: new Date(Date.now() - 10 * 3600000).toISOString(),
    bookingRef: 'MR-849201'
  },
  {
    id: 'MR-302948',
    fullName: 'David Miller',
    mobileNumber: '+91 99944 88812',
    emailAddress: 'david.miller@gmail.com',
    checkInDate: '2026-06-16',
    checkOutDate: '2026-06-19',
    guestsCount: '1',
    roomType: 'standard',
    specialRequest: 'Strictly vegetarian breakfast options needed.',
    status: 'confirmed',
    submittedAt: new Date(Date.now() - 24 * 3600000).toISOString(),
    bookingRef: 'MR-302948'
  },
  {
    id: 'MR-749102',
    fullName: 'Priya Dharshini',
    mobileNumber: '+91 91234 56789',
    emailAddress: 'priya.dharsh@gmail.com',
    checkInDate: '2026-06-25',
    checkOutDate: '2026-06-27',
    guestsCount: '4',
    roomType: 'venue',
    specialRequest: 'Requires stage flower decoration and sound system setup.',
    status: 'cancelled',
    submittedAt: new Date(Date.now() - 48 * 3600000).toISOString(),
    bookingRef: 'MR-749102'
  }
];

const AdminPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const [bookings, setBookings] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  
  // Navigation active tab
  const [activeTab, setActiveTab] = useState('bookings'); // 'bookings' or 'reviews'
  
  // Bookings Filters state
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [roomFilter, setRoomFilter] = useState('all');

  // Reviews Filters state
  const [reviewSearchTerm, setReviewSearchTerm] = useState('');
  const [reviewStatusFilter, setReviewStatusFilter] = useState('all');

  // Load bookings and reviews from localStorage / API
  const loadData = async () => {
    try {
      const bData = await apiFetchBookings();
      setBookings(bData);
      
      const rData = await apiFetchReviews();
      setReviews(rData);
    } catch (err) {
      console.error('Failed to load data from API:', err);
    }
  };

  useEffect(() => {
    loadData();

    // Check login state
    const logged = sessionStorage.getItem('admin_logged');
    if (logged === 'true') {
      setIsLoggedIn(true);
    }

    // Listen to storage changes
    window.addEventListener('storage', loadData);
    return () => window.removeEventListener('storage', loadData);
  }, []);

  // Handle Admin Login
  const handleLogin = (e) => {
    e.preventDefault();
    if (username.trim() === 'admin' && password === 'admin123') {
      setIsLoggedIn(true);
      sessionStorage.setItem('admin_logged', 'true');
      setLoginError('');
    } else {
      setLoginError('Invalid luxury credentials. Try admin / admin123');
    }
  };

  // Handle Logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    sessionStorage.removeItem('admin_logged');
    setUsername('');
    setPassword('');
  };

  // Update Booking Status
  const updateStatus = async (id, newStatus) => {
    const success = await apiUpdateBookingStatus(id, newStatus);
    if (success) {
      const updated = bookings.map(b => b.id === id ? { ...b, status: newStatus } : b);
      setBookings(updated);
      
      // Update active modal view if open
      if (selectedBooking && selectedBooking.id === id) {
        setSelectedBooking(prev => ({ ...prev, status: newStatus }));
      }
    }
  };

  // Delete Booking
  const deleteBooking = async (id) => {
    if (window.confirm('Are you sure you want to permanently delete this enquiry?')) {
      const success = await apiDeleteBooking(id);
      if (success) {
        const filtered = bookings.filter(b => b.id !== id);
        setBookings(filtered);
        if (selectedBooking && selectedBooking.id === id) {
          setSelectedBooking(null);
        }
      }
    }
  };

  // Update Review Status (Approve / Reject)
  const updateReviewStatus = async (id, newStatus) => {
    const success = await apiUpdateReviewStatus(id, newStatus);
    if (success) {
      const updated = reviews.map(r => r.id === id ? { ...r, status: newStatus } : r);
      setReviews(updated);
    }
  };

  // Delete Review
  const deleteReview = async (id) => {
    if (window.confirm('Are you sure you want to permanently delete this review?')) {
      const success = await apiDeleteReview(id);
      if (success) {
        const filtered = reviews.filter(r => r.id !== id);
        setReviews(filtered);
      }
    }
  };

  // Calculate stats
  const totalCount = bookings.length;
  const pendingCount = bookings.filter(b => b.status === 'pending').length;
  const confirmedCount = bookings.filter(b => b.status === 'confirmed').length;
  const cancelledCount = bookings.filter(b => b.status === 'cancelled').length;

  // Calculate estimated total revenue
  const estimatedRevenue = bookings
    .filter(b => b.status === 'confirmed')
    .reduce((sum, b) => {
      const room = roomOptions[b.roomType] || { price: 0 };
      const checkIn = new Date(b.checkInDate);
      const checkOut = new Date(b.checkOutDate);
      const diffTime = Math.abs(checkOut - checkIn);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;
      return sum + (room.price * diffDays);
    }, 0);

  // Filtered Bookings list
  const filteredBookings = bookings.filter(b => {
    const matchesSearch = 
      b.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.mobileNumber.includes(searchTerm) ||
      b.bookingRef.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.emailAddress.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || b.status === statusFilter;
    const matchesRoom = roomFilter === 'all' || b.roomType === roomFilter;

    return matchesSearch && matchesStatus && matchesRoom;
  });

  // Filtered Reviews list
  const filteredReviews = reviews.filter(r => {
    const matchesSearch = 
      r.name.toLowerCase().includes(reviewSearchTerm.toLowerCase()) ||
      r.text.toLowerCase().includes(reviewSearchTerm.toLowerCase()) ||
      r.role.toLowerCase().includes(reviewSearchTerm.toLowerCase());

    const matchesStatus = reviewStatusFilter === 'all' || r.status === reviewStatusFilter;

    return matchesSearch && matchesStatus;
  });

  // Print receipt in a dedicated clean print window
  const handlePrint = (booking) => {
    if (!booking) return;
    const room = roomOptions[booking.roomType] || { label: booking.roomType, price: 0 };
    const checkIn = new Date(booking.checkInDate);
    const checkOut = new Date(booking.checkOutDate);
    const diffDays = Math.max(1, Math.ceil(Math.abs(checkOut - checkIn) / (1000 * 60 * 60 * 24)));
    const totalAmt = (room.price * diffDays).toLocaleString();
    // Construct absolute logo URL so it resolves correctly in about:blank print window
    const logoUrl = new URL(logo, window.location.origin).href;

    // Status color
    const statusColor = booking.status === 'confirmed' ? '#166534'
      : booking.status === 'cancelled' ? '#991b1b' : '#92400e';

    const printWindow = window.open('', '_blank', 'width=820,height=1000');
    if (!printWindow) return;
    printWindow.document.write(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <title>Booking Receipt — ${booking.bookingRef}</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Montserrat:wght@300;400;500;600&display=swap');
          @page { size: A4 portrait; margin: 15mm 15mm; }
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body { font-family: 'Montserrat', sans-serif; background: #fff; color: #111; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          .receipt { max-width: 680px; margin: 0 auto; padding: 10px; }
          .header { background: #faf7f2; border: 2px solid #c5a880; border-radius: 8px 8px 0 0; padding: 20px 24px; display: flex; align-items: center; justify-content: space-between; }
          .header-left { display: flex; align-items: center; gap: 14px; }
          .header-left img { width: 60px; height: 60px; object-fit: contain; }
          .hotel-name { font-family: 'Playfair Display', serif; font-size: 18px; font-weight: 700; color: #a08259; letter-spacing: 0.08em; text-transform: uppercase; }
          .hotel-addr { font-size: 9px; color: #666; text-transform: uppercase; letter-spacing: 0.07em; margin-top: 3px; }
          .badge { font-size: 8px; font-weight: 600; letter-spacing: 0.2em; text-transform: uppercase; background: rgba(197,168,128,0.15); border: 1px solid #c5a880; color: #a08259; padding: 4px 10px; border-radius: 3px; }
          .body { border: 2px solid #c5a880; border-top: none; padding: 24px; }
          .ref-status { display: flex; justify-content: space-between; align-items: center; background: #f4f1eb; border: 1px solid #e2c9a5; border-radius: 4px; padding: 12px 16px; margin-bottom: 20px; }
          .ref-label, .status-label { font-size: 8px; text-transform: uppercase; letter-spacing: 0.15em; color: #888; font-weight: 600; }
          .ref-value { font-family: 'Playfair Display', serif; font-size: 15px; font-weight: 700; color: #a08259; margin-top: 2px; }
          .status-value { font-size: 12px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: ${statusColor}; margin-top: 2px; text-align: right; }
          .section-title { font-family: 'Playfair Display', serif; font-size: 10px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: #a08259; margin-bottom: 10px; }
          .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px 24px; padding-bottom: 18px; margin-bottom: 18px; }
          .field-label { font-size: 8px; text-transform: uppercase; letter-spacing: 0.15em; color: #888; font-weight: 600; margin-bottom: 3px; }
          .field-value { font-size: 12px; color: #111; font-weight: 500; }
          .field-value.gold { color: #a08259; font-family: 'Playfair Display', serif; font-weight: 700; }
          .divider { border-top: 1px solid #e2c9a5; margin-bottom: 16px; padding-top: 16px; }
          .total-bar { background: #f4f1eb; border: 1px solid #e2c9a5; border-radius: 4px; padding: 10px 16px; display: flex; justify-content: space-between; align-items: center; margin-bottom: 18px; }
          .total-label { font-size: 9px; text-transform: uppercase; letter-spacing: 0.15em; color: #666; font-weight: 600; }
          .total-value { font-family: 'Playfair Display', serif; font-size: 16px; font-weight: 700; color: #a08259; }
          .special-box { background: #faf7f2; border: 1px solid #e2c9a5; border-radius: 4px; padding: 10px 14px; font-size: 11px; color: #333; line-height: 1.6; margin-bottom: 18px; }
          .rules-box { background: #faf7f2; border: 1px solid #e2c9a5; border-radius: 4px; padding: 14px 18px; margin-bottom: 18px; }
          .rules-box ol { padding-left: 18px; }
          .rules-box li { font-size: 9px; color: #444; line-height: 1.7; }
          .footer { border-top: 1px dashed #c5a880; padding-top: 14px; display: flex; justify-content: space-between; align-items: center; }
          .footer-text { font-size: 9px; color: #888; }
          .footer-brand { font-size: 9px; color: #a08259; font-weight: 600; letter-spacing: 0.15em; text-transform: uppercase; }
          .admin-stamp { font-size: 8px; color: #aaa; border: 1px solid #e2c9a5; padding: 3px 8px; border-radius: 3px; letter-spacing: 0.1em; text-transform: uppercase; }
          @media print { body { margin: 0; } }
        </style>
      </head>
      <body>
        <div class="receipt">
          <div class="header">
            <div class="header-left">
              <img src="${logoUrl}" alt="Mangalam Residency" />
              <div>
                <div class="hotel-name">Mangalam Residency</div>
                <div class="hotel-addr">212/18 Tuticorin - Madurai Rd, Kariapatti, K Karisal Lulam, Tamil Nadu 626106</div>
                <div class="hotel-addr" style="margin-top:2px">Ph: +91 99447 66622 &nbsp;|&nbsp; Check-in: 12:00 PM &nbsp;|&nbsp; Check-out: 11:00 AM</div>
              </div>
            </div>
            <div class="badge">Official Receipt</div>
          </div>

          <div class="body">
            <div class="ref-status">
              <div>
                <div class="ref-label">Reference ID</div>
                <div class="ref-value">${booking.bookingRef}</div>
              </div>
              <div>
                <div class="status-label">Booking Status</div>
                <div class="status-value">${booking.status.toUpperCase()}</div>
              </div>
            </div>

            <div class="section-title">Guest Information</div>
            <div class="info-grid">
              <div>
                <div class="field-label">Guest Name</div>
                <div class="field-value">${booking.fullName}</div>
              </div>
              <div>
                <div class="field-label">Mobile Number</div>
                <div class="field-value">${booking.mobileNumber}</div>
              </div>
              <div style="grid-column: span 2">
                <div class="field-label">Email Address</div>
                <div class="field-value">${booking.emailAddress}</div>
              </div>
            </div>

            <div class="divider">
              <div class="section-title">Stay Details</div>
              <div class="info-grid">
                <div>
                  <div class="field-label">Check-In Date</div>
                  <div class="field-value">${booking.checkInDate}</div>
                </div>
                <div>
                  <div class="field-label">Check-Out Date</div>
                  <div class="field-value">${booking.checkOutDate}</div>
                </div>
                <div>
                  <div class="field-label">Room / Suite</div>
                  <div class="field-value gold">${room.label}</div>
                </div>
                <div>
                  <div class="field-label">No. of Guests</div>
                  <div class="field-value">${booking.guestsCount} Guest(s)</div>
                </div>
                <div>
                  <div class="field-label">Duration</div>
                  <div class="field-value">${diffDays} Night(s)</div>
                </div>
                <div>
                  <div class="field-label">Rate per Night / Rate per Event</div>
                  <div class="field-value">₹${room.price}</div>
                </div>
              </div>
              <div class="total-bar">
                <div class="total-label">Estimated Total Amount</div>
                <div class="total-value">₹${totalAmt}</div>
              </div>
            </div>

            ${booking.specialRequest ? `
            <div class="section-title">Special Request</div>
            <div class="special-box">${booking.specialRequest}</div>` : ''}

            <div class="divider">
              <div class="section-title">Hotel Rules &amp; Regulations</div>
              <div class="rules-box">
                <ol>
                  <li>Government-issued photo ID proof (Aadhaar Card, Passport) is mandatory at check-in.</li>
                  <li>Standard Check-in time: 12:00 PM &nbsp;|&nbsp; Check-out time: 11:00 AM.</li>
                  <li>Cancellation must be processed at least 24 hours prior to the check-in date.</li>
                  <li>Smoking is strictly prohibited inside all guest rooms, corridors, and lobby areas.</li>
                  <li>The management is not responsible for any loss or damage to personal valuables.</li>
                </ol>
              </div>
            </div>

            <div class="footer">
              <div>
                <div class="footer-text">Submitted: ${new Date(booking.submittedAt).toLocaleString()}</div>
                <div class="footer-text" style="margin-top:3px">Printed: ${new Date().toLocaleString()}</div>
              </div>
              <div style="display:flex; flex-direction:column; align-items:flex-end; gap:6px">
                <div class="footer-brand">Mangalam Residency Desk</div>
                <div class="admin-stamp">Verified</div>
              </div>
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
    <div className="min-h-screen bg-luxury-black text-white pt-24 pb-16 relative">
      {/* Background ambient lighting */}
      <div className="absolute top-10 right-10 w-96 h-96 bg-gold-400/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-gold-400/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* ── UNLOGGED: LOGIN SCREEN ── */}
        <AnimatePresence mode="wait">
          {!isLoggedIn ? (
            <motion.div
              key="login-view"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              className="max-w-md mx-auto my-12"
            >
              <div className="glass-card bg-luxury-charcoal/50 border border-gold-400/15 p-8 md:p-10 rounded-sm shadow-2xl text-center">
                
                {/* Logo and Header */}
                <div className="flex flex-col items-center mb-8">
                  <img src={logo} alt="Logo" className="w-16 h-16 object-contain mb-4 drop-shadow-[0_0_15px_rgba(197,168,128,0.4)]" />
                  <span className="font-serif text-gold-400 text-lg font-bold tracking-[0.15em] uppercase">Mangalam Residency</span>
                  <span className="font-sans text-[9px] tracking-[0.25em] text-gray-500 uppercase mt-1">Management Portal</span>
                  <div className="w-12 h-[1px] bg-gold-400/30 mt-4" />
                </div>

                <form onSubmit={handleLogin} className="space-y-6 text-left">
                  {/* Username */}
                  <div className="flex flex-col">
                    <label className="font-sans text-xs uppercase tracking-widest text-gold-400 mb-2 font-medium">Username</label>
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="e.g. admin"
                      className="w-full bg-luxury-gray/40 border border-gold-400/10 hover:border-gold-400/30 focus:border-gold-400 text-white placeholder-gray-600 px-4 py-3 rounded-sm font-sans text-sm focus:outline-none transition-all duration-300"
                      required
                    />
                  </div>

                  {/* Password */}
                  <div className="flex flex-col">
                    <label className="font-sans text-xs uppercase tracking-widest text-gold-400 mb-2 font-medium">Password</label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-luxury-gray/40 border border-gold-400/10 hover:border-gold-400/30 focus:border-gold-400 text-white placeholder-gray-600 px-4 py-3 rounded-sm font-sans text-sm focus:outline-none transition-all duration-300"
                      required
                    />
                  </div>

                  {loginError && (
                    <p className="text-red-500 text-xs tracking-wide text-center bg-red-950/20 border border-red-900/30 py-2.5 rounded-sm">
                      {loginError}
                    </p>
                  )}

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-gold-400 hover:bg-gold-500 text-luxury-black font-semibold font-sans text-xs tracking-widest uppercase rounded-sm transition-all duration-300 cursor-pointer shadow-lg"
                  >
                    Authenticate
                  </button>
                </form>
              </div>
            </motion.div>
          ) : (
            
            /* ── LOGGED IN: DASHBOARD MANAGEMENT PANEL ── */
            <motion.div
              key="dashboard-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-8"
            >
              {/* Dashboard Header */}
              <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-gold-400/10 pb-6">
                <div className="flex items-center gap-3">
                  <img src={logo} alt="Logo" className="w-12 h-12 object-contain" />
                  <div>
                    <h1 className="font-serif text-2xl md:text-3xl text-white font-bold tracking-wide uppercase">
                      Admin Dashboard
                    </h1>
                    <p className="font-sans text-xs text-gold-400 tracking-widest uppercase font-medium">
                      Mangalam Residency Booking Desk
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <span className="font-sans text-[10px] tracking-widest uppercase bg-gold-400/10 border border-gold-400/25 text-gold-400 px-3 py-1.5 rounded-sm">
                    🔒 SECURE SESSION: ADMIN
                  </span>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-4 py-2 border border-red-500/30 hover:bg-red-500/10 text-red-500 font-sans text-xs tracking-widest uppercase rounded-sm transition-all duration-300 cursor-pointer"
                  >
                    <FaSignOutAlt /> Logout
                  </button>
                </div>
              </div>

              {/* KPI metrics cards */}
              <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
                
                {/* Total */}
                <div className="glass-card p-5 bg-luxury-charcoal/30 border border-gold-400/5 rounded-sm flex flex-col justify-between">
                  <span className="font-sans text-[9px] tracking-widest uppercase text-gray-500 font-semibold block mb-2">Total Enquiries</span>
                  <div className="flex items-baseline justify-between mt-1">
                    <span className="font-serif text-3xl font-bold text-white">{totalCount}</span>
                    <span className="text-gold-400/40 text-lg"><FaRegListAlt /></span>
                  </div>
                </div>

                {/* Pending */}
                <div className="glass-card p-5 bg-luxury-charcoal/30 border border-gold-400/5 rounded-sm flex flex-col justify-between">
                  <span className="font-sans text-[9px] tracking-widest uppercase text-gray-500 font-semibold block mb-2">Pending Review</span>
                  <div className="flex items-baseline justify-between mt-1">
                    <span className="font-serif text-3xl font-bold text-gold-400">{pendingCount}</span>
                    <span className="text-gold-400/40 text-lg"><FaHourglassHalf /></span>
                  </div>
                </div>

                {/* Confirmed */}
                <div className="glass-card p-5 bg-luxury-charcoal/30 border border-gold-400/5 rounded-sm flex flex-col justify-between">
                  <span className="font-sans text-[9px] tracking-widest uppercase text-gray-500 font-semibold block mb-2">Confirmed Stay</span>
                  <div className="flex items-baseline justify-between mt-1">
                    <span className="font-serif text-3xl font-bold text-green-400">{confirmedCount}</span>
                    <span className="text-green-500/40 text-lg"><FaCheckCircle /></span>
                  </div>
                </div>

                {/* Cancelled */}
                <div className="glass-card p-5 bg-luxury-charcoal/30 border border-gold-400/5 rounded-sm flex flex-col justify-between">
                  <span className="font-sans text-[9px] tracking-widest uppercase text-gray-500 font-semibold block mb-2">Cancelled</span>
                  <div className="flex items-baseline justify-between mt-1">
                    <span className="font-serif text-3xl font-bold text-red-500">{cancelledCount}</span>
                    <span className="text-red-500/40 text-lg"><FaTimesCircle /></span>
                  </div>
                </div>

                {/* Revenue */}
                <div className="glass-card p-5 bg-luxury-charcoal/30 border border-gold-400/5 rounded-sm flex flex-col justify-between col-span-2 lg:col-span-1">
                  <span className="font-sans text-[9px] tracking-widest uppercase text-gray-500 font-semibold block mb-2">Est. Confirmed Value</span>
                  <div className="flex items-baseline justify-between mt-1">
                    <span className="font-serif text-xl md:text-2xl font-bold text-gold-300">₹{estimatedRevenue.toLocaleString()}</span>
                    <span className="text-gold-400/40 text-lg"><FaCrown /></span>
                  </div>
                </div>
              </div>

              {/* ── TAB NAVIGATION ── */}
              <div className="flex items-center gap-1 bg-luxury-charcoal/40 border border-gold-400/10 p-1 rounded-sm w-fit">
                <button
                  onClick={() => setActiveTab('bookings')}
                  className={`px-5 py-2 font-sans text-[10px] tracking-widest uppercase rounded-sm transition-all duration-300 cursor-pointer ${
                    activeTab === 'bookings'
                      ? 'bg-gold-400 text-luxury-black font-semibold'
                      : 'text-gray-400 hover:text-gold-400'
                  }`}
                >
                  <FaRegListAlt className="inline mr-1.5 text-[9px]" />Bookings
                </button>
                <button
                  onClick={() => setActiveTab('reviews')}
                  className={`px-5 py-2 font-sans text-[10px] tracking-widest uppercase rounded-sm transition-all duration-300 cursor-pointer flex items-center gap-1.5 ${
                    activeTab === 'reviews'
                      ? 'bg-gold-400 text-luxury-black font-semibold'
                      : 'text-gray-400 hover:text-gold-400'
                  }`}
                >
                  <FaStar className="inline mr-1 text-[9px]" />Reviews
                  {reviews.filter(r => r.status === 'pending').length > 0 && (
                    <span className="bg-orange-500 text-white text-[8px] font-bold px-1.5 py-0.5 rounded-full leading-none">
                      {reviews.filter(r => r.status === 'pending').length}
                    </span>
                  )}
                </button>
              </div>

              {/* ── BOOKINGS TAB ── */}
              {activeTab === 'bookings' && (<>
              {/* Filtering Controls */}
              <div className="glass-card bg-luxury-charcoal/30 border border-gold-400/10 p-5 rounded-sm flex flex-col lg:flex-row items-center justify-between gap-4">
                
                {/* Search */}
                <div className="relative w-full lg:max-w-md">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search by Guest Name, Email, Mobile or Ref ID..."
                    className="w-full bg-luxury-black/40 border border-gold-400/10 hover:border-gold-400/25 focus:border-gold-400 text-white placeholder-gray-500 pl-10 pr-4 py-2.5 rounded-sm font-sans text-xs focus:outline-none transition-all duration-300"
                  />
                  <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gold-400 text-sm pointer-events-none" />
                </div>

                <div className="flex flex-wrap items-center gap-4 w-full lg:w-auto">
                  {/* Status filter */}
                  <div className="flex items-center gap-2 flex-grow sm:flex-grow-0">
                    <span className="font-sans text-[10px] tracking-widest uppercase text-gray-500 flex items-center gap-1">
                      <FaFilter /> Status
                    </span>
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="bg-luxury-black/60 border border-gold-400/10 text-white text-xs px-3 py-2.5 rounded-sm focus:outline-none cursor-pointer focus:border-gold-400 font-sans tracking-wide flex-grow sm:flex-grow-0"
                    >
                      <option value="all">All Enquiries</option>
                      <option value="pending">Pending Review</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>

                  {/* Room filter */}
                  <div className="flex items-center gap-2 flex-grow sm:flex-grow-0">
                    <span className="font-sans text-[10px] tracking-widest uppercase text-gray-500 flex items-center gap-1">
                      <FaDoorOpen /> Room
                    </span>
                    <select
                      value={roomFilter}
                      onChange={(e) => setRoomFilter(e.target.value)}
                      className="bg-luxury-black/60 border border-gold-400/10 text-white text-xs px-3 py-2.5 rounded-sm focus:outline-none cursor-pointer focus:border-gold-400 font-sans tracking-wide flex-grow sm:flex-grow-0"
                    >
                      <option value="all">All Room Types</option>
                      {Object.keys(roomOptions).map(key => (
                        <option key={key} value={key}>{roomOptions[key].label}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Bookings Table List */}
              <div className="glass-card bg-luxury-charcoal/30 border border-gold-400/10 rounded-sm overflow-hidden shadow-xl">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-luxury-black/80 border-b border-gold-400/15 text-[10px] sm:text-xs font-sans tracking-widest uppercase text-gold-400">
                        <th className="p-4 pl-6">Ref ID</th>
                        <th className="p-4">Guest Details</th>
                        <th className="p-4">Stay Dates</th>
                        <th className="p-4">Room selection</th>
                        <th className="p-4 text-center">Status</th>
                        <th className="p-4 pr-6 text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-luxury-light-gray/40 text-xs md:text-sm font-sans font-light">
                      {filteredBookings.length > 0 ? (
                        filteredBookings.map((booking) => {
                          const room = roomOptions[booking.roomType] || { label: booking.roomType };
                          const checkIn = new Date(booking.checkInDate);
                          const checkOut = new Date(booking.checkOutDate);
                          const diffTime = Math.abs(checkOut - checkIn);
                          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;
                          
                          return (
                            <tr key={booking.id} className="hover:bg-luxury-gray/10 transition-colors duration-200">
                              {/* Ref ID */}
                              <td className="p-4 pl-6 font-serif font-bold text-gold-400 tracking-wider">
                                {booking.bookingRef}
                              </td>

                              {/* Guest details */}
                              <td className="p-4">
                                <div className="font-semibold text-white">{booking.fullName}</div>
                                <div className="text-[10px] text-gray-500 mt-0.5">{booking.emailAddress}</div>
                                <div className="text-[10px] text-gray-500">{booking.mobileNumber}</div>
                              </td>

                              {/* Dates */}
                              <td className="p-4">
                                <div className="text-white flex items-center gap-1.5">
                                  <span>{booking.checkInDate}</span>
                                  <span className="text-gray-500">→</span>
                                  <span>{booking.checkOutDate}</span>
                                </div>
                                <div className="text-[10px] text-gold-400/70 mt-0.5 font-medium flex items-center gap-1">
                                  <FaCalendarAlt className="text-[9px]" /> {diffDays} Night{diffDays > 1 ? 's' : ''} • {booking.guestsCount} Guest{parseInt(booking.guestsCount) > 1 ? 's' : ''}
                                </div>
                              </td>

                              {/* Room selection */}
                              <td className="p-4">
                                <div className="text-white font-medium">{room.label}</div>
                                <div className="text-[10px] text-gray-500 mt-0.5">₹{room.price || 0}/Night</div>
                              </td>

                              {/* Status badge */}
                              <td className="p-4 text-center">
                                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-semibold tracking-wider uppercase border
                                  ${booking.status === 'confirmed' 
                                    ? 'bg-green-500/10 text-green-400 border-green-500/20' 
                                    : booking.status === 'cancelled' 
                                    ? 'bg-red-500/10 text-red-400 border-red-500/20' 
                                    : 'bg-orange-500/10 text-orange-400 border-orange-500/20'
                                  }`}
                                >
                                  <span className={`w-1.5 h-1.5 rounded-full 
                                    ${booking.status === 'confirmed' 
                                      ? 'bg-green-400 animate-pulse' 
                                      : booking.status === 'cancelled' 
                                      ? 'bg-red-500' 
                                      : 'bg-orange-400 animate-pulse'
                                    }`} 
                                  />
                                  {booking.status}
                                </span>
                              </td>

                              {/* Actions */}
                              <td className="p-4 pr-6 text-center">
                                <div className="flex items-center justify-center gap-2">
                                  {/* View */}
                                  <button
                                    onClick={() => setSelectedBooking(booking)}
                                    className="p-2 bg-luxury-gray/40 hover:bg-gold-400/20 text-gray-300 hover:text-gold-400 border border-gold-400/10 rounded-sm cursor-pointer transition-colors"
                                    title="View Detailed Ticket"
                                  >
                                    <FaEye />
                                  </button>

                                  {/* Confirm */}
                                  {booking.status === 'pending' && (
                                    <button
                                      onClick={() => updateStatus(booking.id, 'confirmed')}
                                      className="p-2 bg-green-500/10 hover:bg-green-500/35 border border-green-500/20 text-green-400 rounded-sm cursor-pointer transition-colors"
                                      title="Confirm Booking"
                                    >
                                      <FaCheck />
                                    </button>
                                  )}

                                  {/* Cancel */}
                                  {booking.status === 'pending' && (
                                    <button
                                      onClick={() => updateStatus(booking.id, 'cancelled')}
                                      className="p-2 bg-red-500/10 hover:bg-red-500/35 border border-red-500/20 text-red-400 rounded-sm cursor-pointer transition-colors"
                                      title="Cancel Booking"
                                    >
                                      <FaTimes />
                                    </button>
                                  )}

                                  {/* Re-Activate (if cancelled or confirmed, option to revert) */}
                                  {booking.status !== 'pending' && (
                                    <button
                                      onClick={() => updateStatus(booking.id, 'pending')}
                                      className="px-2 py-1 text-[9px] tracking-widest uppercase border border-gold-400/15 hover:border-gold-400 text-gold-400 rounded-sm cursor-pointer transition-colors font-sans"
                                      title="Revert to Pending"
                                    >
                                      Reset
                                    </button>
                                  )}

                                  {/* Delete */}
                                  <button
                                    onClick={() => deleteBooking(booking.id)}
                                    className="p-2 bg-red-950/20 hover:bg-red-500 hover:text-white border border-red-500/15 rounded-sm cursor-pointer transition-colors text-red-500"
                                    title="Delete Record"
                                  >
                                    <FaTrash />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })
                      ) : (
                        <tr>
                          <td colSpan="6" className="p-8 text-center text-gray-500 font-sans tracking-wide">
                            No booking enquiries match your active filter search.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
              </>)}

              {/* ── REVIEWS TAB ── */}
              {activeTab === 'reviews' && (
                <div className="space-y-4">

                  {/* Reviews Filter Bar */}
                  <div className="glass-card bg-luxury-charcoal/30 border border-gold-400/10 p-5 rounded-sm flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="relative w-full sm:max-w-md">
                      <input
                        type="text"
                        value={reviewSearchTerm}
                        onChange={(e) => setReviewSearchTerm(e.target.value)}
                        placeholder="Search by Guest Name or Review Text..."
                        className="w-full bg-luxury-black/40 border border-gold-400/10 hover:border-gold-400/25 focus:border-gold-400 text-white placeholder-gray-500 pl-10 pr-4 py-2.5 rounded-sm font-sans text-xs focus:outline-none transition-all duration-300"
                      />
                      <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gold-400 text-sm pointer-events-none" />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-sans text-[10px] tracking-widest uppercase text-gray-500 flex items-center gap-1">
                        <FaFilter /> Status
                      </span>
                      <select
                        value={reviewStatusFilter}
                        onChange={(e) => setReviewStatusFilter(e.target.value)}
                        className="bg-luxury-black/60 border border-gold-400/10 text-white text-xs px-3 py-2.5 rounded-sm focus:outline-none cursor-pointer focus:border-gold-400 font-sans tracking-wide"
                      >
                        <option value="all">All Reviews</option>
                        <option value="pending">Pending</option>
                        <option value="approved">Approved</option>
                        <option value="rejected">Rejected</option>
                      </select>
                    </div>
                  </div>

                  {/* Reviews Table */}
                  <div className="glass-card bg-luxury-charcoal/30 border border-gold-400/10 rounded-sm overflow-hidden shadow-xl">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="bg-luxury-black/80 border-b border-gold-400/15 text-[10px] sm:text-xs font-sans tracking-widest uppercase text-gold-400">
                            <th className="p-4 pl-6">Guest</th>
                            <th className="p-4">Rating</th>
                            <th className="p-4">Review</th>
                            <th className="p-4">Submitted</th>
                            <th className="p-4 text-center">Status</th>
                            <th className="p-4 pr-6 text-center">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-luxury-light-gray/40 text-xs md:text-sm font-sans font-light">
                          {filteredReviews.length > 0 ? (
                            filteredReviews.map((review) => (
                              <tr key={review.id} className="hover:bg-luxury-gray/10 transition-colors duration-200">
                                {/* Guest */}
                                <td className="p-4 pl-6">
                                  <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full border border-gold-400/25 bg-gold-400/10 flex items-center justify-center text-gold-400 text-xs font-serif font-bold uppercase shrink-0">
                                      {review.name ? review.name.charAt(0) : 'G'}
                                    </div>
                                    <div>
                                      <div className="font-semibold text-white text-xs">{review.name}</div>
                                      <div className="text-[10px] text-gray-500">{review.role}</div>
                                    </div>
                                  </div>
                                </td>

                                {/* Rating */}
                                <td className="p-4">
                                  <div className="flex items-center gap-0.5">
                                    {[...Array(5)].map((_, i) => (
                                      <FaStar key={i} className={i < review.rating ? 'text-gold-400 text-xs' : 'text-gray-700 text-xs'} />
                                    ))}
                                  </div>
                                </td>

                                {/* Review Text */}
                                <td className="p-4 max-w-xs">
                                  <p className="text-gray-300 text-[11px] leading-relaxed line-clamp-2">{review.text}</p>
                                </td>

                                {/* Submitted */}
                                <td className="p-4">
                                  <div className="text-[10px] text-gray-500">{new Date(review.submittedAt).toLocaleDateString()}</div>
                                  <div className="text-[10px] text-gray-600">{new Date(review.submittedAt).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})}</div>
                                </td>

                                {/* Status */}
                                <td className="p-4 text-center">
                                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-semibold tracking-wider uppercase border ${
                                    review.status === 'approved'
                                      ? 'bg-green-500/10 text-green-400 border-green-500/20'
                                      : review.status === 'rejected'
                                      ? 'bg-red-500/10 text-red-400 border-red-500/20'
                                      : 'bg-orange-500/10 text-orange-400 border-orange-500/20'
                                  }`}>
                                    <span className={`w-1.5 h-1.5 rounded-full ${
                                      review.status === 'approved' ? 'bg-green-400 animate-pulse'
                                      : review.status === 'rejected' ? 'bg-red-500'
                                      : 'bg-orange-400 animate-pulse'
                                    }`} />
                                    {review.status}
                                  </span>
                                </td>

                                {/* Actions */}
                                <td className="p-4 pr-6 text-center">
                                  <div className="flex items-center justify-center gap-2">
                                    {review.status === 'pending' && (
                                      <>
                                        <button
                                          onClick={() => updateReviewStatus(review.id, 'approved')}
                                          className="p-2 bg-green-500/10 hover:bg-green-500/35 border border-green-500/20 text-green-400 rounded-sm cursor-pointer transition-colors"
                                          title="Approve — Show on homepage"
                                        >
                                          <FaCheck />
                                        </button>
                                        <button
                                          onClick={() => updateReviewStatus(review.id, 'rejected')}
                                          className="p-2 bg-red-500/10 hover:bg-red-500/35 border border-red-500/20 text-red-400 rounded-sm cursor-pointer transition-colors"
                                          title="Reject Review"
                                        >
                                          <FaTimes />
                                        </button>
                                      </>
                                    )}
                                    {review.status !== 'pending' && (
                                      <button
                                        onClick={() => updateReviewStatus(review.id, 'pending')}
                                        className="px-2 py-1 text-[9px] tracking-widest uppercase border border-gold-400/15 hover:border-gold-400 text-gold-400 rounded-sm cursor-pointer transition-colors font-sans"
                                        title="Reset to Pending"
                                      >
                                        Reset
                                      </button>
                                    )}
                                    <button
                                      onClick={() => deleteReview(review.id)}
                                      className="p-2 bg-red-950/20 hover:bg-red-500 hover:text-white border border-red-500/15 rounded-sm cursor-pointer transition-colors text-red-500"
                                      title="Delete Review"
                                    >
                                      <FaTrash />
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan="6" className="p-8 text-center text-gray-500 font-sans tracking-wide">
                                No reviews match your current filter.
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── BOOKING DETAIL POPUP MODAL (TICKET UI) ── */}
      <AnimatePresence>
        {selectedBooking && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
            
            {/* Modal backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedBooking(null)}
              className="absolute inset-0 bg-black"
            />

            {/* Modal Ticket Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              transition={{ type: 'spring', damping: 25, stiffness: 250 }}
              className="relative w-full max-w-lg bg-luxury-charcoal border border-gold-400/30 rounded-md shadow-2xl overflow-y-auto max-h-[90vh] printable-ticket"
            >
              {/* Ticket Header (Branded Logo & Address) */}
              <div className="bg-gold-400/10 border-b border-gold-400/15 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <img src={logo} alt="Mangalam Residency" className="w-10 h-10 object-contain drop-shadow-[0_0_8px_rgba(197,168,128,0.3)]" />
                  <div className="flex flex-col">
                    <span className="font-serif text-sm font-bold tracking-[0.1em] uppercase text-gold-400">Mangalam Residency</span>
                    <span className="font-sans text-[7.5px] tracking-wide text-gray-500 uppercase mt-0.5 leading-tight">212/18 Tuticorin - Madurai Rd, Kariapatti, K Karisal Lulam, TN 626106</span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedBooking(null)}
                  className="text-gray-400 hover:text-gold-400 text-xl cursor-pointer focus:outline-none print-hide self-start sm:self-center"
                >
                  <FaTimes />
                </button>
              </div>

              {/* Ticket details body */}
              <div className="p-6 space-y-6">
                
                {/* Status Bar */}
                <div className="flex items-center justify-between bg-luxury-black/45 border border-gold-400/10 p-3.5 rounded-sm">
                  <div>
                    <span className="text-[9px] uppercase tracking-wider text-gray-500 font-semibold block font-sans">REFERENCE ID</span>
                    <span className="text-sm text-gold-400 font-serif font-bold block mt-0.5">{selectedBooking.bookingRef}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[9px] uppercase tracking-wider text-gray-500 font-semibold block font-sans">STATUS</span>
                    <span className={`inline-block text-[10px] font-bold tracking-widest uppercase mt-0.5
                      ${selectedBooking.status === 'confirmed' 
                        ? 'text-green-400' 
                        : selectedBooking.status === 'cancelled' 
                        ? 'text-red-400' 
                        : 'text-orange-400'
                      }`}
                    >
                      {selectedBooking.status}
                    </span>
                  </div>
                </div>

                {/* Info Blocks Grid */}
                <div className="grid grid-cols-2 gap-y-4 gap-x-6 border-b border-luxury-light-gray/30 pb-5">
                  <div>
                    <span className="text-[9px] uppercase tracking-wider text-gray-500 font-semibold block font-sans">
                      <FaUser className="inline mr-1 text-[8px] text-gold-400" /> Guest Name
                    </span>
                    <span className="text-xs text-white block font-medium mt-0.5">{selectedBooking.fullName}</span>
                  </div>
                  <div>
                    <span className="text-[9px] uppercase tracking-wider text-gray-500 font-semibold block font-sans">
                      <FaPhone className="inline mr-1 text-[8px] text-gold-400" /> Contact Phone
                    </span>
                    <a href={`tel:${selectedBooking.mobileNumber}`} className="text-xs text-white hover:text-gold-400 transition-colors block mt-0.5">
                      {selectedBooking.mobileNumber}
                    </a>
                  </div>

                  <div className="col-span-2">
                    <span className="text-[9px] uppercase tracking-wider text-gray-500 font-semibold block font-sans">
                      <FaEnvelope className="inline mr-1 text-[8px] text-gold-400" /> Email Address
                    </span>
                    <a href={`mailto:${selectedBooking.emailAddress}`} className="text-xs text-white hover:text-gold-400 transition-colors block mt-0.5">
                      {selectedBooking.emailAddress}
                    </a>
                  </div>
                </div>

                {/* Stay detail Blocks Grid */}
                <div className="grid grid-cols-2 gap-y-4 gap-x-6 border-b border-luxury-light-gray/30 pb-5">
                  <div>
                    <span className="text-[9px] uppercase tracking-wider text-gray-500 font-semibold block font-sans">CHECK-IN</span>
                    <span className="text-xs text-white block mt-0.5">{selectedBooking.checkInDate}</span>
                  </div>
                  <div>
                    <span className="text-[9px] uppercase tracking-wider text-gray-500 font-semibold block font-sans">CHECK-OUT</span>
                    <span className="text-xs text-white block mt-0.5">{selectedBooking.checkOutDate}</span>
                  </div>

                  <div>
                    <span className="text-[9px] uppercase tracking-wider text-gray-500 font-semibold block font-sans">ROOM SELECTION</span>
                    <span className="text-xs text-white block font-serif font-bold mt-0.5">
                      {roomOptions[selectedBooking.roomType]?.label || selectedBooking.roomType}
                    </span>
                  </div>
                  <div>
                    <span className="text-[9px] uppercase tracking-wider text-gray-500 font-semibold block font-sans">GUEST COUNT</span>
                    <span className="text-xs text-white block mt-0.5">{selectedBooking.guestsCount} Guest(s)</span>
                  </div>
                </div>

                {/* Special Requests */}
                <div>
                  <span className="text-[9px] uppercase tracking-wider text-gray-500 font-semibold block font-sans">SPECIAL REMARK</span>
                  <p className="text-xs text-gray-300 leading-relaxed font-light mt-1.5 p-3 bg-luxury-black/35 border border-gold-400/5 rounded-sm whitespace-pre-wrap">
                    {selectedBooking.specialRequest || 'No special requests submitted.'}
                  </p>
                </div>

                {/* Hotel Rules & Regulations */}
                <div className="p-5 border border-gold-400/15 bg-luxury-black/35 rounded-sm">
                  <span className="font-serif text-[10px] tracking-widest uppercase text-gold-400 font-bold block mb-2">Hotel Rules & Regulations</span>
                  <ul className="space-y-1.5 text-[8.5px] text-gray-400 leading-normal list-decimal list-inside font-sans font-light">
                    <li>Government ID proof (Aadhaar, Passport) is mandatory for check-in.</li>
                    <li>Standard Check-in time: 12:00 PM | Check-out time: 11:00 AM.</li>
                    <li>Cancellation must be processed 24 hours prior to check-in.</li>
                    <li>Smoking is strictly prohibited inside guest rooms and lobby.</li>
                    <li>The management is not responsible for any loss of personal valuables.</li>
                  </ul>
                </div>

                {/* Date Submitted info */}
                <div className="text-[9.5px] font-sans text-gray-600 flex items-center justify-between">
                  <span>SUBMITTED AT: {new Date(selectedBooking.submittedAt).toLocaleString()}</span>
                  <span>MANGALAM RESIDENCY DESK</span>
                </div>
              </div>

              {/* Action footer */}
              <div className="bg-luxury-black/55 border-t border-gold-400/15 p-4 flex items-center justify-between gap-2.5 print:hidden">
                <button
                  onClick={() => handlePrint(selectedBooking)}
                  className="flex items-center gap-1.5 px-4 py-2 border border-gold-400/20 hover:border-gold-400 text-gold-400 hover:bg-gold-400/10 font-sans text-[10px] tracking-widest uppercase rounded-sm cursor-pointer transition-all duration-300"
                >
                  <FaPrint /> Print Receipt
                </button>

                <div className="flex gap-2">
                  {selectedBooking.status === 'pending' ? (
                    <>
                      <button
                        onClick={() => updateStatus(selectedBooking.id, 'confirmed')}
                        className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white font-sans text-[10px] tracking-widest uppercase rounded-sm cursor-pointer transition-colors duration-300"
                      >
                        Approve Stay
                      </button>
                      <button
                        onClick={() => updateStatus(selectedBooking.id, 'cancelled')}
                        className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-sans text-[10px] tracking-widest uppercase rounded-sm cursor-pointer transition-colors duration-300"
                      >
                        Cancel Stay
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => updateStatus(selectedBooking.id, 'pending')}
                      className="px-4 py-2 border border-gold-400/30 hover:border-gold-400 text-gold-400 font-sans text-[10px] tracking-widest uppercase rounded-sm cursor-pointer transition-all duration-300"
                    >
                      Reset to Review
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminPage;
