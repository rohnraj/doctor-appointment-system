import { bookAppointment, isTimeSlotAvailable , getBookedSlots , approveSlot, rejectSlot, deleteSlot} from "../models/appointmentModel.js";
import { sendAppointmentEmail } from "../utils/emailService.js"; 
import { getDoctorById } from '../models/doctorModel.js';

// export const isSlotAvailableController = async (req, res) =>{
//   try{
//     const {appointment_dates, appointment_time} = req.query
//     const isAvailable = await isTimeSlotAvailable(appointment_dates, appointment_time);
//     if (!isAvailable) return res.status(400).json({ success: false, message: "Time slot is already booked" });
//     res.status(200).json({success: true, message: 'No booking on this slot'})
//   }
//   catch(err){
//     console.log('some issue in isAvailable controller '+ err)
//   }
// }

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

export const approveSlotController = async(req, res) =>{
  try{

    const {id} = req.query;
    console.log('slot id: '+id)
    const response = await approveSlot(id);
    // console.log(response)

    const doctor = await getDoctorById(response[0].doctor_id);
    // console.log(doctor)

    console.log(response[0].id ,response[0].user_id, doctor.name, response[0].appointments_dates, response[0].appointments_time, doctor.location)

    await sendAppointmentEmail( response[0].consult_type ,response[0].user_id, doctor.name, response[0].appointments_dates, response[0].appointments_time, doctor.location, response[0].status)

    res.status(200).json({success: true , message: response})
    // await sendAppointmentEmail(response.user_id, response.doctor_id, response);

  }
  catch(err){
    console.log("Error approving slot:", err);
    return res.status(500).json({ success: false, message: "error while approving slot" });
  }
}

export const rejectSlotController = async (req, res) => {
  try{

    const {id} = req.query;
    const response = await rejectSlot(id);

    const doctor = await getDoctorById(response[0].doctor_id);

    console.log(response[0].id ,response[0].user_id, doctor.name, response[0].appointments_dates, response[0].appointments_time, doctor.location)

    await sendAppointmentEmail( response[0].consult_type ,response[0].user_id, doctor.name, response[0].appointment_dates, response[0].appointment_time, doctor.location, response[0].status)

    res.status(200).json({success: true , message: response})
  }
  catch(err){
    console.log("Error reject slot:", err);
    res.status(500).json({ success: false, message: "error while reject slot" });
  }
}

export const deleteSlotController = async(req, res) =>{
  const {id} = req.query;
  console.log('slot id: '+id) 
  try{
    const response = await deleteSlot(id);
    res.status(200).json({success: true, message: 'slot delete successfully'})
  }
  catch(err){
    console.log("Error deleting slot:", err);
    res.status(500).json({ success: false, message: "error while deleting slot" });
  }
}