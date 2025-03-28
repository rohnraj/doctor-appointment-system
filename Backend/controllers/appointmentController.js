import { bookAppointment, isTimeSlotAvailable , getBookedSlots} from "../models/appointmentModel.js";
import { sendAppointmentEmail } from "../utils/emailService.js"; // Import email service
import { getDoctorById } from '../models/doctorModel.js';

export const bookAppointmentController = async (req, res) => {
  try {
    // {doctor_id:doctorId,  user_id: userInfo?.userid,  consult_type: typeofConsult,  appointment_dates:date, appointment_time:time, user_info: JSON.stringify(patientInfo)}
    const { doctor_id, user_id, consult_type,  location, appointment_dates, appointment_time, user_info} = req.body;

    if (!doctor_id || !user_id || !consult_type || !appointment_dates || !appointment_time || !user_info) {
      console.log("Missing required fields:", doctor_id, user_id, consult_type, appointment_dates, appointment_time, user_info);
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    // Ensure the appointment time slot is available
    const isAvailable = await isTimeSlotAvailable(appointment_dates, appointment_time);
    if (!isAvailable) return res.status(400).json({ success: false, message: "Time slot is already booked" });

    // Book the appointment
    try{

      const appointment = await bookAppointment(
        doctor_id,
        user_id,
        consult_type,
        location,
        appointment_dates,
        appointment_time,
        user_info // Fetch doctor’s location from DB
      );
      res.status(201).json({ success: true, message: "Appointment booked successfully", appointment });
    }
    catch(error){
      console.log("Error booking appointment:", error);
      return res.status(500).json({ success: false, message: "Error booking appointment"});
    }

    // Send email confirmation to the patient
    // await sendAppointmentEmail(userId, doctor, appointment);

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


export const bookedSlotController = async (req, res) =>{
  try{

    let bookedSlots = await getBookedSlots();
    const doctorDetails = await Promise.all(
      bookedSlots.map(async (slot) => {
        return await getDoctorById(slot.doctor_id);
      })
    );
    console.log(doctorDetails)

    console.log(bookedSlots)

    const updatedBookedSlots = bookedSlots.map((slot, index) => ({
      ...slot,
      doctor_name: doctorDetails[index]?.name || "Unknown",
      doctor_specialty: doctorDetails[index]?.specialty || "Unknown",
    }));

    console.log(updatedBookedSlots)
    bookedSlots=updatedBookedSlots

    return res.status(200).json({ success: true, message: "All slots fetched successfully", bookedSlots });
  }
  catch(err){
    console.log("Error getting all slots:", err);
    return res.status(500).json({ success: false, message: "error while getting all slots" });
  }
}