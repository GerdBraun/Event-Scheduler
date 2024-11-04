import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EventSingle = ({ token }) => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [organizer, setOrganizer] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:3001/api/events/${id}`)
      .then((response) => response.json())
      .then((data) => setEvent(data))
      .catch((error) => console.error("Error fetching event details:", error));
  }, [id]);

  useEffect(() => {
    if (!event) return;
    fetch(`http://localhost:3001/api/users/${event.organizerId}`)
      .then((response) => response.json())
      .then((data) => setOrganizer(data))
      .catch((error) =>
        console.error("Error fetching organizer details:", error)
      );
  }, [event]);

  const handleDelete = () => {
    if (!token) {
      console.error("No token available for delete request");
      return;
    }
    if (window.confirm("Are you sure you want to delete this event?")) {
      fetch(`http://localhost:3001/api/events/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      })
        .then((response) => {
          if (!response.ok) {
            return response.json().then((errorData) => {
              throw new Error(errorData.message || "Failed to delete event");
            });
          }
          console.log("Event deleted successfully");
          navigate("/events"); // Redirect to event list after deletion
        })
        .catch((error) =>
          console.error("Error deleting event:", error.message)
        );
    }
  };

  if (!event) return <p>Loading...</p>;

  return (
    <div className="p-4 bg-gray-700 min-h-screen bg-cover" style={{backgroundImage:`url(${event.image || 'https://i.postimg.cc/y86GJN9F/schedule.png'})`}}>
      <div className="card bg-gray-300 text-black w-full max-w-xl mx-auto shadow-xl">
        <div className="card-body">
          <h2 className="text-2xl text-center text-blue-500">{event.title}</h2>
          <p>image: {event.image}</p>
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
            See it on Google Maps
          </a>
          <p className="text-sm">
            Organizer ID: {event.organizerId}
          </p>
          {organizer && (
            <p className="text-sm">
              Organizer: <br/>{organizer.name}<br/><a className="hover:text-blue-500" href={`mailto:${organizer.email}`}>{organizer.email}</a>
            </p>
          )}
          <p className="text-sm">
            Created At: {new Date(event.createdAt).toLocaleDateString()}
          </p>
          <p className="text-sm">
            Updated At: {new Date(event.updatedAt).toLocaleDateString()}
          </p>
          {token && (
            <div className="flex gap-4 mt-4 justify-center">
              <button
                className="btn btn-primary px-14 text-xl"
                onClick={() => navigate(`/events`)}
              >
                back
              </button>
              <button
                className="btn btn-primary px-14 text-xl"
                onClick={() => navigate(`/events/edit/${id}`)}
              >
                Edit
              </button>
              <button
                className="btn btn-primary px-12 text-xl"
                onClick={handleDelete}
                aria-label="Delete event"
              >
                {" "}
                Delete
                {/*<i className="fa-solid fa-trash text-xl"></i>*/}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventSingle;
