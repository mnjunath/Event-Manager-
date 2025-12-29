import Event from "../models/Event.model.js";

export const createEventService = async (data, userId) => {
  const {
    title,
    description,
    dateTime,
    location,
    capacity,
    imageUrl,
  } = data;

  if (!title || !description || !dateTime || !location || !capacity) {
    throw new Error("All fields are required");
  }

  const event = await Event.create({
    title,
    description,
    dateTime,
    location,
    capacity,
    availableSlots: capacity,
    imageUrl,
    createdBy: userId,
  });

  return event;
};

export const getAllEventsService = async () => {
  return Event.find()
    .populate("createdBy", "name email")
    .sort({ dateTime: 1 });
};

export const updateEventService = async (eventId, userId, updateData) => {
  const event = await Event.findById(eventId);

  if (!event) {
    throw new Error("Event not found");
  }

  // 🔒 Ownership check
  if (event.createdBy.toString() !== userId) {
    throw new Error("Not authorized to update this event");
  }

  Object.assign(event, updateData);

  await event.save();
  return event;
};

export const deleteEventService = async (eventId, userId) => {
  const event = await Event.findById(eventId);

  if (!event) {
    throw new Error("Event not found");
  }

  // 🔒 Ownership check
  if (event.createdBy.toString() !== userId) {
    throw new Error("Not authorized to delete this event");
  }

  await event.deleteOne();
  return true;
};

export const getUserCreatedEventsService = async (userId) => {
  return Event.find({ createdBy: userId }).sort({ createdAt: -1 });
};
