import React, { useEffect, useState, useContext } from 'react';
import AuthContext from '../../context/AuthContext';

const BookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const authContext = useContext(AuthContext);

  const fetchBookings = async () => {
    if (!authContext.token) return;

    const requestBody = {
      query: `
        query {
          bookings {
            _id
            createdAt
            event {
              _id
              title
              date
            }
          }
        }
      `
    };

    try {
      const response = await fetch('http://localhost:3000/graphql', {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + authContext.token
        }
      });

      if (!response.ok) throw new Error('Failed to fetch bookings');

      const result = await response.json();
      setBookings(result.data.bookings);
    } catch (err) {
      console.error(err);
    }
  };

  const cancelBookingHandler = async bookingId => {
    const requestBody = {
      query: `
        mutation {
          cancelBooking(bookingId: "${bookingId}") {
            _id
            title
          }
        }
      `
    };

    try {
      const response = await fetch('http://localhost:3000/graphql', {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + authContext.token
        }
      });

      if (!response.ok) throw new Error('Failed to cancel booking');

      const result = await response.json();
      alert(`Cancelled booking for event: ${result.data.cancelBooking.title}`);
      // Update UI
      setBookings(prev =>
        prev.filter(booking => booking._id !== bookingId)
      );
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div>
      <h2>Your Bookings</h2>
      <ul>
        {bookings.map(booking => (
          <li key={booking._id}>
            <strong>{booking.event.title}</strong> <br />
            <em>{new Date(booking.event.date).toLocaleString()}</em> <br />
            Booked At: {new Date(booking.createdAt).toLocaleString()} <br />
            <button onClick={() => cancelBookingHandler(booking._id)}>Cancel</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookingsPage;
