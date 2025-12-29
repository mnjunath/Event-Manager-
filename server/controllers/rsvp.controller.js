import { rsvpToEventService, cancelRsvpService, getUserRsvpsService } from "../services/rsvp.service.js";

export const rsvpToEvent = async (req, res) => {
  try {
    const result = await rsvpToEventService(
      req.params.eventId,
      req.user.id
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const cancelRsvp = async (req, res) => {
  try {
    const result = await cancelRsvpService(
      req.params.eventId,
      req.user.id
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getMyRsvps = async (req, res) => {
  try {
    const rsvps = await getUserRsvpsService(req.user.id);
    res.status(200).json(rsvps);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch RSVPs" });
  }
};
