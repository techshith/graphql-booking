import React, { useEffect, useState, useContext } from 'react';
import AuthContext from '../../context/AuthContext';

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const authContext = useContext(AuthContext);

  useEffect(() => {
    const fetchEvents = async () => {
      const requestBody = {
        query: `
          query {
            events {
              _id
              title
              description
              price
              date
            }
          }
        `
      };

      try {
        const response = await fetch('http://localhost:3000/graphql', {
          method: 'POST',
          body: JSON.stringify(requestBody),
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) throw new Error('Failed to fetch events');

        const result = await response.json();
        setEvents(result.data.events);
      } catch (err) {
        console.error(err);
      }
    };

    fetchEvents();
  }, []);

  const bookEventHandler = async eventId => {
    if (!authContext.token) {
      alert('You must be logged in to book an event.');
      return;
    }

    const requestBody = {
      query: `
        mutation {
          bookEvent(eventId: "${eventId}") {
            _id
            createdAt
            updatedAt
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

      if (!response.ok) throw new Error('Booking failed');

      const result = await response.json();
      alert('Event booked successfully!');
    } catch (err) {
      console.error(err);
      alert('Something went wrong.');
    }
  };

  return (
    <div>
      <h2>All Events</h2>
      <ul>
        {events.map(event => (
          <li key={event._id}>
            <strong>{event.title}</strong> - ${event.price}<br />
            <em>{new Date(event.date).toLocaleString()}</em><br />
            {authContext.token && (
              <button onClick={() => bookEventHandler(event._id)}>Book</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventsPage;
