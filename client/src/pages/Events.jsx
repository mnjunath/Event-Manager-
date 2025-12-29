import { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate, useLocation } from "react-router-dom";
import EventMenu from "../components/EventMenu";
import "./Events.css";

function Events() {
  const [events, setEvents] = useState([]);
  const [myRsvpEventIds, setMyRsvpEventIds] = useState(new Set());

  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("token");

  const fetchEvents = async () => {
    try {
      const res = await api.get("/api/events");
      setEvents(res.data);
    } catch {
      alert("Failed to load events");
    }
  };

  const fetchMyRsvps = async () => {
    if (!token) return;
    try {
      const res = await api.get("/api/rsvp/my");
      const ids = new Set(res.data.map((rsvp) => rsvp.eventId._id));
      setMyRsvpEventIds(ids);
    } catch (err) {
      console.error("Failed to load user RSVPs", err);
    }
  };

  useEffect(() => {
    fetchEvents();
    fetchMyRsvps();
  }, [location.state]);

  const rsvp = async (eventId) => {
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      await api.post(`/api/rsvp/${eventId}`);
      fetchEvents();
      fetchMyRsvps();
    } catch (err) {
      alert(err.response?.data?.message || "RSVP failed");
    }
  };

  const removeRsvp = async (eventId) => {
    try {
      await api.delete(`/api/rsvp/${eventId}`);
      fetchEvents();
      fetchMyRsvps();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to remove RSVP");
    }
  };

  const deleteEvent = async (eventId) => {
    try {
      await api.delete(`/api/events/${eventId}`);
      fetchEvents();
    } catch (err) {
      alert(err.response?.data?.message || "Delete failed");
    }
  };

  const editEvent = (event) => {
    navigate(`/create-event?edit=true&id=${event._id}`, {
      state: event,
    });
  };

  return (
    <div className="events-page">
      <h2>All Events</h2>

      {events.length === 0 && <p>No events available</p>}

      <div className="events-grid">
        {events.map((event) => {
          const hasRsvped = myRsvpEventIds.has(event._id);

          return (
            <div key={event._id} className="event-card">
              <div className="event-menu-wrapper">
                <EventMenu
                  onEdit={() => editEvent(event)}
                  onDelete={() => deleteEvent(event._id)}
                  onRemoveRsvp={
                    hasRsvped ? () => removeRsvp(event._id) : null
                  }
                  showEditDelete={true}
                />
              </div>

              <h3>{event.title}</h3>
              <p className="event-desc">{event.description}</p>

              <p className="event-meta">📍 {event.location}</p>
              <p className="event-meta">
                🕒 {new Date(event.dateTime).toLocaleString()}
              </p>

              <p className="event-slots">
                Available Slots: {event.availableSlots}
              </p>

              {!hasRsvped && (
                <button
                  className="rsvp-btn"
                  onClick={() => rsvp(event._id)}
                  disabled={event.availableSlots === 0}
                >
                  {event.availableSlots === 0 ? "Event Full" : "RSVP"}
                </button>
              )}

              {hasRsvped && (
                <p className="rsvp-success">✅ You have RSVP’d</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Events;
