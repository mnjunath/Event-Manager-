import express from "express";
import { createEvent, getEvents, updateEvent, deleteEvent, getMyEvents} from "../controllers/event.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", getEvents);                  // Public
router.post("/", protect, createEvent);      // Protected
router.put("/:id", protect, updateEvent);    // 🔒 Owner only
router.delete("/:id", protect, deleteEvent); // 🔒 Owner only
router.get("/my-events", protect, getMyEvents);


export default router;
