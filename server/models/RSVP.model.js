import mongoose from "mongoose";

const rsvpSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },
  },
  { timestamps: true }
);

/**
 * 🔒 Prevent duplicate RSVP:
 * One user can RSVP only once per event
 */
rsvpSchema.index({ userId: 1, eventId: 1 }, { unique: true });

const RSVP = mongoose.model("RSVP", rsvpSchema);
export default RSVP;
