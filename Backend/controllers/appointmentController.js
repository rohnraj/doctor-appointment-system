import { bookAppointment, isTimeSlotAvailable } from "../models/appointmentModel.js";
import { getDoctorById } from "../models/doctorModel.js";
import { sendAppointmentEmail } from "../utils/emailService.js"; // Import email service

export const bookAppointmentController = async (req, res) => {
  try {
    const { doctorId, userId, timeSlot, details, consultType, patientInfo } = req.body;

    if (!doctorId || !userId || !timeSlot || !consultType) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    // Check if doctor exists
    const doctor = await getDoctorById(doctorId);
    if (!doctor) return res.status(404).json({ success: false, message: "Doctor not found" });

    // Ensure the appointment time slot is available
    const isAvailable = await isTimeSlotAvailable(doctorId, timeSlot);
    if (!isAvailable) return res.status(400).json({ success: false, message: "Time slot is already booked" });

    // Book the appointment
    const appointment = await bookAppointment(
      doctorId,
      userId,
      timeSlot,
      details,
      consultType,
      patientInfo,
      doctor.location // Fetch doctor’s location from DB
    );

    // Send email confirmation to the patient
    await sendAppointmentEmail(userId, doctor, appointment);

    res.status(201).json({ success: true, message: "Appointment booked successfully", appointment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
