import { useEffect, useState } from "react";
import api from "../api/axios";
import "./MyRsvps.css";

function MyRsvps() {
  const [rsvps, setRsvps] = useState([]);

  useEffect(() => {
    api
      .get("/api/rsvp/my")
      .then((res) => setRsvps(res.data))
      .catch(() => alert("Failed to load RSVPs"));
  }, []);

  return (
    <div className="myrsvps-page">
      <h2>My RSVPs</h2>

      {rsvps.length === 0 && (
        <p className="empty-text">
          You have not RSVP’d to any events.
        </p>
      )}

      <div className="myrsvps-grid">
        {rsvps.map((rsvp) => (
          <div key={rsvp._id} className="myrsvp-card">
            <h3>{rsvp.eventId.title}</h3>

            <p className="rsvp-meta">
              📍 {rsvp.eventId.location}
            </p>

            <p className="rsvp-meta">
              🕒 {new Date(rsvp.eventId.dateTime).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyRsvps;
