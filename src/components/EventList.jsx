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
    // if (!token) {
    //   setError("No authorization token available");
    //   return;
    // }
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
          console.log(events)
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

  // if (error) {
  //   return <div>{error}</div>;
  // }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mx-4 my-4">
      {events.map(event => (
        <div key={event.id} className="relative">
          <Card
            title={event.title}
            //description={event.description}
            date={event.date}
            location={event.location}
            image={event.image || 'https://i.postimg.cc/y86GJN9F/schedule.png'} 
            onClick={() => navigate(`/events/${event.id}`)}
          />
        </div>
      ))}
    </div>
  );
};

export default EventList;
