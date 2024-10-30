import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
const EventEditForm = ({token}) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState({
    title: '',
    description: '',
    date: '',
    location: '',
    latitude: '',
    longitude: '',
    organizerId: ''
  });
  useEffect(() => {
    fetch(`http://localhost:3001/api/events/${id}`)
      .then(response => response.json())
      .then(data => setEvent(data))
      .catch(error => console.error("Error fetching event details:", error));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEvent(prevEvent => ({ ...prevEvent, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:3001/api/events/${id}`, {
      method: 'PUT',
      headers: {
        accept: "application/json",
        Authorization: "Bearer "+token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(event)
    })
      .then(response => response.json())
      .then(data => {
        console.log("Event updated:", data);
        navigate(`/events/${id}`);
      })
      .catch(error => console.error("Error updating event:", error));
  };
  return (
    <div className="p-6 bg-base-200 min-h-screen">
      <form onSubmit={handleSubmit} className="card bg-gray-300 text-black w-full max-w-xl mx-auto shadow-xl p-4">
        <h2 className="card-title">Edit Event</h2>
        <div className="form-control">
          <label className="label">Title</label>
          <input className="input" name="title" value={event.title} onChange={handleChange} />
        </div>
        <div className="form-control">
          <label className="label">Description</label>
          <input className="input" name="description" value={event.description} onChange={handleChange} />
        </div>
        <div className="form-control">
          <label className="label">Date</label>
          <input className="input" name="date" type="date" 
          value={event.date ? new Date(event.date).toISOString().split('T')[0] : ''} 
          onChange={handleChange} />
        </div>
        <div className="form-control">
          <label className="label">Location</label>
          <input className="input" name="location" value={event.location} onChange={handleChange} />
        </div>
        <div className="form-control">
          <label className="label">Latitude</label>
          <input className="input" name="latitude" type="number" value={event.latitude} onChange={handleChange} />
        </div>
        <div className="form-control">
          <label className="label">Longitude</label>
          <input className="input" name="longitude" type="number" value={event.longitude} onChange={handleChange} />
        </div>
        <div className="form-control">
          <label className="label">Organizer ID</label>
          <input className="input" name="organizerId" type="number" value={event.organizerId} onChange={handleChange} />
        </div>
        <button className="btn mt-4" type="submit">Save Changes</button>
      </form>
    </div>
  );
};
export default EventEditForm;
