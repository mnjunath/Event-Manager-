import {
  createEventService,
  getAllEventsService,
  updateEventService,
  deleteEventService,
  getUserCreatedEventsService,
} from "../services/event.service.js";

export const createEvent = async (req, res) => {
  try {
    const event = await createEventService(req.body, req.user.id);
    res.status(201).json(event);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getEvents = async (req, res) => {
  try {
    const events = await getAllEventsService();
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch events" });
  }
};

export const updateEvent = async (req, res) => {
  try {
    const updatedEvent = await updateEventService(
      req.params.id,
      req.user.id,
      req.body
    );
    res.status(200).json(updatedEvent);
  } catch (error) {
    res.status(403).json({ message: error.message });
  }
};

export const deleteEvent = async (req, res) => {
  try {
    await deleteEventService(req.params.id, req.user.id);
    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(403).json({ message: error.message });
  }
};

export const getMyEvents = async (req, res) => {
  try {
    const events = await getUserCreatedEventsService(req.user.id);
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch user events" });
  }
};
