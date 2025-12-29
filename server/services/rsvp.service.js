import mongoose from "mongoose";
import Event from "../models/Event.model.js";
import RSVP from "../models/RSVP.model.js";

export const rsvpToEventService = async (eventId, userId) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // 1️⃣ Atomically reduce available slots
    const event = await Event.findOneAndUpdate(
      { _id: eventId, availableSlots: { $gt: 0 } },
      { $inc: { availableSlots: -1 } },
      { new: true, session }
    );

    if (!event) {
      throw new Error("Event is full or does not exist");
    }

    // 2️⃣ Create RSVP (unique index prevents duplicates)
    await RSVP.create([{ eventId, userId }], { session });

    await session.commitTransaction();
    session.endSession();

    return { message: "RSVP successful" };
  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    // Handle duplicate RSVP error
    if (error.code === 11000) {
      throw new Error("You have already RSVP’d to this event");
    }

    throw error;
  }
};

export const cancelRsvpService = async (eventId, userId) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const rsvp = await RSVP.findOneAndDelete(
      { eventId, userId },
      { session }
    );

    if (!rsvp) {
      throw new Error("You have not RSVP’d to this event");
    }

    await Event.findByIdAndUpdate(
      eventId,
      { $inc: { availableSlots: 1 } },
      { session }
    );

    await session.commitTransaction();
    session.endSession();

    return { message: "RSVP cancelled successfully" };
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

export const getUserRsvpsService = async (userId) => {
  return RSVP.find({ userId }).populate("eventId");
};
