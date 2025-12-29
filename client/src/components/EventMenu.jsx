import { useState } from "react";
import "./EventMenu.css";

function EventMenu({ onEdit, onDelete, onRemoveRsvp, showEditDelete }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="event-menu">
      <button
        className="menu-trigger"
        onClick={() => setOpen(!open)}
        aria-label="Event options"
      >
        ⋮
      </button>

      {open && (
        <div className="menu-dropdown">
          {showEditDelete && (
            <>
              <div className="menu-item" onClick={onEdit}>
                ✏️ Edit
              </div>
              <div className="menu-item danger" onClick={onDelete}>
                🗑 Delete
              </div>
            </>
          )}

          {onRemoveRsvp && (
            <div className="menu-item danger" onClick={onRemoveRsvp}>
              ❌ Remove RSVP
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default EventMenu;
