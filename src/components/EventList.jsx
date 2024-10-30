import { useEffect, useState } from 'react';
import Card from './Card';
import { useNavigate } from 'react-router-dom';

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  
  // Retrieve token from localStorage
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      setError("No authorization token available");
      return;
    }
    fetch('http://localhost:3001/api/events?page=1&limit=10', {
      headers: {
        'accept': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(data => {
        if (data.results && Array.isArray(data.results)) {
          setEvents(data.results);
        } else {
          console.error("Unexpected data format:", data);
          setError("Unexpected data format");
        }
      })
      .catch(error => {
        console.error("Error fetching data:", error);
        setError("Failed to fetch data");
      });
  }, [token]);
  const handleDelete = (eventId) => {
    if (!token) {
      console.error("No token available for delete request");
      return;
    }
    if (window.confirm("Are you sure you want to delete this event?")) {
      fetch(`http://localhost:3001/api/events/${eventId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      })
        .then(response => {
          if (!response.ok) {
            return response.json().then(errorData => {
              throw new Error(errorData.message || 'Failed to delete event');
            });
          }
          setEvents(events.filter(event => event.id !== eventId));
          console.log("Event deleted successfully");
        })
        .catch(error => console.error("Error deleting event:", error.message));
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mx-4">
      {events.map(event => (
        <div key={event.id} className="relative">
          <Card
            title={event.title}
            description={event.description}
            date={event.date}
            location={event.location}
            onClick={() => navigate(`/events/${event.id}`)}
          />
          <button
            className="absolute top-2 right-2 text-red-500"
            onClick={() => handleDelete(event.id)}
            aria-label="Delete event"
          >
            <i className="fa-solid fa-trash text-2xl"></i>
          </button>
        </div>
      ))}
    </div>
  );
};
export default EventList;
