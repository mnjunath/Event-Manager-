import express from "express";
import { createEvent, getEvents, updateEvent, deleteEvent, getMyEvents} from "../controllers/event.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", getEvents);                  
router.post("/", protect, createEvent);      
router.put("/:id", protect, updateEvent);    
router.delete("/:id", protect, deleteEvent); 
router.get("/my-events", protect, getMyEvents);


export default router;
