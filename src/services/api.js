import { GOOGLE_SCRIPT_API_URL, ENABLE_LOCAL_FALLBACK } from '../config/dbConfig';

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

// Initial Mock Reviews
const initialMockReviews = [
  {
    id: 'REV-demo1',
    name: 'Praveen Sethu Vel K',
    role: 'Corporate Guest',
    rating: 5,
    text: 'Superb service and absolute premium quality rooms. Will visit again!',
    image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150&auto=format&fit=crop',
    status: 'approved',
    submittedAt: new Date(Date.now() - 3600000).toISOString()
  }
];

// Helper to make Google Web App requests safely
async function callGoogleApi(method, payload = null, queryParams = '') {
  if (!GOOGLE_SCRIPT_API_URL) {
    throw new Error('Google Script URL is not configured.');
  }

  const url = GOOGLE_SCRIPT_API_URL + (queryParams ? `?${queryParams}` : '');
  const options = {
    method: method,
    headers: {}
  };

  if (payload) {
    // Using text/plain to avoid preflight CORS OPTIONS requests which fail on Apps Script
    options.headers['Content-Type'] = 'text/plain';
    options.body = JSON.stringify(payload);
  }

  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`API error: ${response.statusText}`);
  }
  return await response.json();
}

/* ============================================================
   BOOKINGS API ENDPOINTS
   ============================================================ */

export async function fetchBookings() {
  try {
    if (GOOGLE_SCRIPT_API_URL) {
      const data = await callGoogleApi('GET', null, 'type=bookings');
      if (Array.isArray(data)) {
        // Cache to local storage as fallback and update
        localStorage.setItem('hotel_bookings', JSON.stringify(data));
        return data;
      }
    }
  } catch (error) {
    console.warn('Failed to fetch bookings from Google Sheet. Using local cache:', error);
  }

  if (ENABLE_LOCAL_FALLBACK) {
    const existing = localStorage.getItem('hotel_bookings');
    if (existing) {
      return JSON.parse(existing);
    } else {
      localStorage.setItem('hotel_bookings', JSON.stringify(initialMockBookings));
      return initialMockBookings;
    }
  }
  return [];
}

export async function addBooking(bookingData) {
  const newRef = 'MR-' + Math.floor(100000 + Math.random() * 900000);
  const formattedBooking = {
    ...bookingData,
    id: bookingData.id || newRef,
    bookingRef: bookingData.bookingRef || newRef,
    status: bookingData.status || 'pending',
    submittedAt: bookingData.submittedAt || new Date().toISOString()
  };

  try {
    if (GOOGLE_SCRIPT_API_URL) {
      const response = await callGoogleApi('POST', {
        action: 'add',
        type: 'bookings',
        data: formattedBooking
      });
      if (response && response.success) {
        // Successfully added to sheet, update local cache
        const local = await fetchBookings();
        local.unshift(response.data || formattedBooking);
        localStorage.setItem('hotel_bookings', JSON.stringify(local));
        window.dispatchEvent(new Event('storage'));
        return response.data || formattedBooking;
      }
    }
  } catch (error) {
    console.error('Failed to submit booking to Google Sheets. Using local fallback:', error);
  }

  if (ENABLE_LOCAL_FALLBACK) {
    const local = await fetchBookings();
    local.unshift(formattedBooking);
    localStorage.setItem('hotel_bookings', JSON.stringify(local));
    window.dispatchEvent(new Event('storage'));
    return formattedBooking;
  }
  throw new Error('Failed to submit booking.');
}

export async function updateBookingStatus(id, newStatus) {
  try {
    if (GOOGLE_SCRIPT_API_URL) {
      const response = await callGoogleApi('POST', {
        action: 'update',
        type: 'bookings',
        id: id,
        status: newStatus
      });
      if (response && response.success) {
        // Sync local cache
        const local = await fetchBookings();
        const updated = local.map(b => b.id === id ? { ...b, status: newStatus } : b);
        localStorage.setItem('hotel_bookings', JSON.stringify(updated));
        window.dispatchEvent(new Event('storage'));
        return true;
      }
    }
  } catch (error) {
    console.error('Failed to update booking status in Google Sheets. Using local cache:', error);
  }

  if (ENABLE_LOCAL_FALLBACK) {
    const local = await fetchBookings();
    const updated = local.map(b => b.id === id ? { ...b, status: newStatus } : b);
    localStorage.setItem('hotel_bookings', JSON.stringify(updated));
    window.dispatchEvent(new Event('storage'));
    return true;
  }
  return false;
}

export async function deleteBooking(id) {
  try {
    if (GOOGLE_SCRIPT_API_URL) {
      const response = await callGoogleApi('POST', {
        action: 'delete',
        type: 'bookings',
        id: id
      });
      if (response && response.success) {
        const local = await fetchBookings();
        const filtered = local.filter(b => b.id !== id);
        localStorage.setItem('hotel_bookings', JSON.stringify(filtered));
        window.dispatchEvent(new Event('storage'));
        return true;
      }
    }
  } catch (error) {
    console.error('Failed to delete booking in Google Sheets. Using local cache:', error);
  }

  if (ENABLE_LOCAL_FALLBACK) {
    const local = await fetchBookings();
    const filtered = local.filter(b => b.id !== id);
    localStorage.setItem('hotel_bookings', JSON.stringify(filtered));
    window.dispatchEvent(new Event('storage'));
    return true;
  }
  return false;
}

/* ============================================================
   REVIEWS API ENDPOINTS
   ============================================================ */

export async function fetchReviews() {
  try {
    if (GOOGLE_SCRIPT_API_URL) {
      const data = await callGoogleApi('GET', null, 'type=reviews');
      if (Array.isArray(data)) {
        localStorage.setItem('hotel_reviews', JSON.stringify(data));
        return data;
      }
    }
  } catch (error) {
    console.warn('Failed to fetch reviews from Google Sheet. Using local cache:', error);
  }

  if (ENABLE_LOCAL_FALLBACK) {
    const existing = localStorage.getItem('hotel_reviews');
    if (existing) {
      return JSON.parse(existing);
    } else {
      localStorage.setItem('hotel_reviews', JSON.stringify(initialMockReviews));
      return initialMockReviews;
    }
  }
  return [];
}

export async function addReview(reviewData) {
  const newId = 'REV-' + Date.now() + Math.floor(Math.random() * 1000);
  const formattedReview = {
    ...reviewData,
    id: reviewData.id || newId,
    status: reviewData.status || 'pending',
    submittedAt: reviewData.submittedAt || new Date().toISOString()
  };

  try {
    if (GOOGLE_SCRIPT_API_URL) {
      const response = await callGoogleApi('POST', {
        action: 'add',
        type: 'reviews',
        data: formattedReview
      });
      if (response && response.success) {
        const local = await fetchReviews();
        local.unshift(response.data || formattedReview);
        localStorage.setItem('hotel_reviews', JSON.stringify(local));
        window.dispatchEvent(new Event('storage'));
        return response.data || formattedReview;
      }
    }
  } catch (error) {
    console.error('Failed to submit review to Google Sheets. Using local fallback:', error);
  }

  if (ENABLE_LOCAL_FALLBACK) {
    const local = await fetchReviews();
    local.unshift(formattedReview);
    localStorage.setItem('hotel_reviews', JSON.stringify(local));
    window.dispatchEvent(new Event('storage'));
    return formattedReview;
  }
  throw new Error('Failed to submit review.');
}

export async function updateReviewStatus(id, newStatus) {
  try {
    if (GOOGLE_SCRIPT_API_URL) {
      const response = await callGoogleApi('POST', {
        action: 'update',
        type: 'reviews',
        id: id,
        status: newStatus
      });
      if (response && response.success) {
        const local = await fetchReviews();
        const updated = local.map(r => r.id === id ? { ...r, status: newStatus } : r);
        localStorage.setItem('hotel_reviews', JSON.stringify(updated));
        window.dispatchEvent(new Event('storage'));
        return true;
      }
    }
  } catch (error) {
    console.error('Failed to update review status in Google Sheets. Using local cache:', error);
  }

  if (ENABLE_LOCAL_FALLBACK) {
    const local = await fetchReviews();
    const updated = local.map(r => r.id === id ? { ...r, status: newStatus } : r);
    localStorage.setItem('hotel_reviews', JSON.stringify(updated));
    window.dispatchEvent(new Event('storage'));
    return true;
  }
  return false;
}

export async function deleteReview(id) {
  try {
    if (GOOGLE_SCRIPT_API_URL) {
      const response = await callGoogleApi('POST', {
        action: 'delete',
        type: 'reviews',
        id: id
      });
      if (response && response.success) {
        const local = await fetchReviews();
        const filtered = local.filter(r => r.id !== id);
        localStorage.setItem('hotel_reviews', JSON.stringify(filtered));
        window.dispatchEvent(new Event('storage'));
        return true;
      }
    }
  } catch (error) {
    console.error('Failed to delete review in Google Sheets. Using local cache:', error);
  }

  if (ENABLE_LOCAL_FALLBACK) {
    const local = await fetchReviews();
    const filtered = local.filter(r => r.id !== id);
    localStorage.setItem('hotel_reviews', JSON.stringify(filtered));
    window.dispatchEvent(new Event('storage'));
    return true;
  }
  return false;
}
