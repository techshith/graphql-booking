import React, { useEffect, useState } from 'react';

const EventsPage = () => {
  const [events, setEvents] = useState([]);

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

  return (
    <div>
      <h2>All Events</h2>
      <ul>
        {events.map(event => (
          <li key={event._id}>
            <strong>{event.title}</strong> - ${event.price}  
            <br />
            <em>{new Date(event.date).toLocaleString()}</em>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventsPage;
