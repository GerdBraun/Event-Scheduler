import { useEffect, useState } from 'react';
import Card from './card';
import { useNavigate } from 'react-router-dom';

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:3001/api/events?page=1&limit=10', {
      headers: {
        'accept': 'application/json'
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
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mx-4">
      {events.map(event => (
        <Card
          key={event.id}
          title={event.title}
          description={event.description}
          date={event.date}
          location={event.location}
          onClick={() => navigate(`/events/${event.id}`)}
        />
      ))}
    </div>
  );
};

export default EventList;
