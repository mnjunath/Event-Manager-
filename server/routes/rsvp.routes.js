import express from "express";
import { rsvpToEvent } from "../controllers/rsvp.controller.js";
import { cancelRsvp, getMyRsvps } from "../controllers/rsvp.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/:eventId", protect, rsvpToEvent);
router.delete("/:eventId", protect, cancelRsvp);
router.get("/my", protect, getMyRsvps);


export default router;
