import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
const EventSingle = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3001/api/events/${id}`)
      .then(response => response.json())
      .then(data => setEvent(data))
      .catch(error => console.error("Error fetching event details:", error));
  }, [id]);

  if (!event) return <p>Loading...</p>;

  return (
    <div className="p-6 bg-base-200 min-h-screen">
    <div className="card bg-primary text-primary-content w-full max-w-xl mx-auto shadow-xl">
      <div className="card-body">
        <h2 className="card-title">{event.title}</h2>
        <p>{event.description}</p>
        <p className="text-sm">Date: {new Date(event.date).toLocaleDateString()}</p>
        <p className="text-sm">Location: {event.location}</p>
      </div>
    </div>
  </div>
);
};
export default EventSingle