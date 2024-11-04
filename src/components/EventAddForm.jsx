import { useState } from "react";
import { useNavigate } from "react-router-dom";

const EventAddForm = ({ token }) => {
  const navigate = useNavigate();
  const [event, setEvent] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    latitude: "",
    longitude: "",
    organizerId: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEvent((prevEvent) => ({ ...prevEvent, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" })); // Clear error on change
  };

  const validateForm = () => {
    const newErrors = {};
    if (!event.title) newErrors.title = "Title is required";
    if (!event.description) newErrors.description = "Description is required";
    if (!event.date) newErrors.date = "Date is required";
    if (!event.location) newErrors.location = "Location is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const { title, description, date, location, latitude, longitude } = event;

    fetch("http://localhost:3001/api/events", {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        description,
        date,
        location,
        latitude,
        longitude,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Event created:", data);
        navigate("/");
      })
      .catch((error) => console.error("Error creating event:", error));
  };

  return (
    <div className="p-4 bg-gray-700 min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="card bg-gray-300 text-black w-full max-w-xl mx-auto shadow-xl p-4"
      >
        <h2 className="text-2xl text-center text-blue-600">Add New Event</h2>

        <div className="form-control">
          <label className="label">Title</label>
          <input
            className="input input-bordered"
            name="title"
            value={event.title}
            onChange={handleChange}
          />
          {errors.title && <p className="text-red-500">{errors.title}</p>}
        </div>

        <div className="form-control">
          <label className="label">Description</label>
          <textarea
            className="textarea textarea-bordered"
            name="description"
            value={event.description}
            rows= "4"
            onChange={handleChange}
          />
          {errors.description && (
            <p className="text-red-500">{errors.description}</p>
          )}
        </div>

        <div className="form-control">
          <label className="label">Date</label>
          <input
            className="input input-bordered"
            name="date"
            type="datetime-local"
            value={event.date}
            onChange={handleChange}
          />
          {errors.date && <p className="text-red-500">{errors.date}</p>}
        </div>

        <div className="form-control">
          <label className="label">Location</label>
          <input
            className="input input-bordered"
            name="location"
            value={event.location}
            onChange={handleChange}
          />
          {errors.location && <p className="text-red-500">{errors.location}</p>}
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
        <button className="btn btn-primary mt-4" type="submit">
          Add Event
        </button>
      </form>
    </div>
  );
};

export default EventAddForm;
