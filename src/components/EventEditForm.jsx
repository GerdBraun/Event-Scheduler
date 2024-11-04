import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EventEditForm = ({ token }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState({
    title: "",
    image: "",
    description: "",
    date: "",
    location: "",
    latitude: "",
    longitude: "",
    organizerId: "",
  });
  useEffect(() => {
    fetch(`http://localhost:3001/api/events/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setEvent({
          title: data.title,
          image: data.image,
          description: data.description,
          date: data.date,
          location: data.location,
          latitude: data.latitude,
          longitude: data.longitude,
          organizerId: data.organizerId,
        });
      })
      .catch((error) => console.error("Error fetching event details:", error));
  }, [id]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEvent((prevEvent) => ({ ...prevEvent, [name]: value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const { title, image, description, date, location, latitude, longitude } =
      event;
    fetch(`http://localhost:3001/api/events/${id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        image,
        description,
        date,
        location,
        latitude,
        longitude,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Event updated:", data);
        navigate(`/events/${id}`);
      })
      .catch((error) => console.error("Error updating event:", error));
  };
  return (
    <div className="p-4 bg-gray-700 min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="card bg-gray-300 text-black w-full max-w-xl mx-auto shadow-xl p-4"
      >
        <h2 className="text-2xl text-center text-blue-600">Edit Event</h2>
        <div className="form-control">
          <label className="label">Title</label>
          <input
            className="input input-bordered"
            name="title"
            value={event.title}
            onChange={handleChange}
            required
          />
        </div>
        <h2 className="text-2xl text-center text-blue-600">Edit Event</h2>
        <div className="form-control">
          <label className="label">Image</label>
          <input
            className="input input-bordered"
            name="image"
            value={event.image}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-control">
          <label className="label">Description</label>
          <textarea
            className="textarea textarea-bordered"
            name="description"
            value={event.description}
            rows="4"
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-control">
          <label className="label">Date</label>
          <input
            className="input input-bordered"
            name="date"
            type="datetime-local"
            value={
              event.date ? new Date(event.date).toISOString().slice(0, 16) : ""
            }
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-control">
          <label className="label">Location</label>
          <input
            className="input input-bordered"
            name="location"
            value={event.location}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-control">
          <label className="label">Latitude</label>
          <input
            className="input input-bordered"
            name="latitude"
            type="number"
            step="any"
            value={event.latitude}
            onChange={handleChange}
          />
        </div>
        <div className="form-control">
          <label className="label">Longitude</label>
          <input
            className="input input-bordered"
            name="longitude"
            type="number"
            step="any"
            value={event.longitude}
            onChange={handleChange}
          />
        </div>
        <button className="btn btn-primary mt-4 text-xl" type="submit">
          Save Changes
        </button>
      </form>
    </div>
  );
};
export default EventEditForm;
