import express from "express";
import { bookAppointmentController, bookedSlotController, approveSlotController, rejectSlotController, deleteSlotController } from "../controllers/appointmentController.js";

const router = express.Router();

router.put("/book", bookAppointmentController); // Book an appointment
router.get('/bookedslot', bookedSlotController)
// router.get('/isSlotAvailable', isSlotAvailableController)
router.patch('/approveSlot', approveSlotController)
router.patch('/rejectSlot', rejectSlotController)

router.delete('/deleteSlot', deleteSlotController)
export default router;
