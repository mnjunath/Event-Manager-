import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../api/axios";
import "./CreateEvent.css";

function CreateEvent() {
  const location = useLocation();
  const navigate = useNavigate();

  const isEdit = location.search.includes("edit=true");
  const existingEvent = location.state;

  const [form, setForm] = useState({
    title: existingEvent?.title || "",
    description: existingEvent?.description || "",
    dateTime: existingEvent?.dateTime
      ? existingEvent.dateTime.slice(0, 16)
      : "",
    location: existingEvent?.location || "",
    capacity: existingEvent?.capacity || "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();

    try {
      if (isEdit) {
        await api.put(`/api/events/${existingEvent._id}`, form);
      } else {
        await api.post("/api/events", form);
      }

      navigate("/", { state: { refresh: true } });
    } catch (err) {
      alert(err.response?.data?.message || "Operation failed");
    }
  };

  return (
    <div className="create-event-page">
      <h2>{isEdit ? "Update Event" : "Create Event"}</h2>

      <form className="event-form" onSubmit={submit}>
        <div className="form-group">
          <label>Event Title</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <input
            type="text"
            name="description"
            value={form.description}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Date & Time</label>
          <input
            type="datetime-local"
            name="dateTime"
            value={form.dateTime}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Location</label>
          <input
            type="text"
            name="location"
            value={form.location}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Capacity</label>
          <input
            type="number"
            name="capacity"
            value={form.capacity}
            onChange={handleChange}
            required
          />
        </div>

        <button className="submit-btn" type="submit">
          {isEdit ? "Update Event" : "Create Event"}
        </button>
      </form>
    </div>
  );
}

export default CreateEvent;
