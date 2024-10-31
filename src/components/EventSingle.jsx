import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EventSingle = ({ token }) => {
  console.log(token);
  
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    fetch(`http://localhost:3001/api/events/${id}`)
      .then((response) => response.json())
      .then((data) => setEvent(data))
      .catch((error) => console.error("Error fetching event details:", error));
  }, [id]);

  if (!event) return <p>Loading...</p>;

  return (
    <div className="p-6 bg-base-200 min-h-screen">
      <div className="card bg-gray-300 text-black w-full max-w-xl mx-auto shadow-xl">
        <div className="card-body">
          <h2 className="card-title">{event.title}</h2>
          <p>{event.description}</p>
          <p className="text-sm">
            Date: {new Date(event.date).toLocaleDateString()}
          </p>
          <p className="text-sm">Location: {event.location}</p>
          <p className="text-sm">
            Latitude / Longitude: {event.latitude} / {event.longitude}
          </p>
          <a
            className="btn"
            target="_blank"
            href={`http://maps.google.com/maps?z=12&t=k&q=loc:${event.longitude}+${event.latitude}`}
          >
            see it on google maps
          </a>
          <p className="text-sm">Organizer ID: {event.organizerId}</p>
          <p className="text-sm">
            Created At: {new Date(event.createdAt).toLocaleDateString()}
          </p>
          <p className="text-sm">
            Updated At: {new Date(event.updatedAt).toLocaleDateString()}
          </p>
          {token && (
            <button
              className="btn btn-primary mt-4"
              onClick={() => navigate(`/events/edit/${id}`)}
            >
              Edit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
export default EventSingle;
