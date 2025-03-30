import { getTopDoctors, searchDoctors, getDoctorById, createDoctor, getAllDoctorsModel, deleteDoctorById, availableSlotModel, updateDoctorslot } from "../models/doctorModel.js";
// import * as res from 'express/lib/response';

// Only Admins Can Create Doctors
export const createDoctorController = async (req, res) => {
  try {
    console.log('create controller running');
    const { name, specialty, experience, degree, location, availableTimes, availableDate, photo, gender } = req.body;
    console.log(req.body);

    // Check for required fields
    if (!name || !photo || !specialty || !experience || !degree || !location || !availableTimes || !availableDate || !gender) {
      return res.status(400).json({ error: "All fields are required." });
    }

    // Create doctor
    const newDoctor = await createDoctor(null, name, photo, specialty, experience, degree, location, availableTimes, availableDate, gender);

    res.status(201).json({ message: "Doctor created successfully", doctor: newDoctor });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



// Get Top 6 Doctors
export const getTopDoctorsController = async (req, res) => {
  try {
    const {page, rating, experience, gender} = req.query

    console.log(page, rating, experience, gender)

    const doctors = await getTopDoctors(page, rating, experience, gender);
    res.status(200).json({ success: true, doctors });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" , err:error.message});
  }
};

// Search Doctors with Filters & Pagination
export const searchDoctorsController = async (req, res) => {
  try {
    const { search , experience, rating, page, limit } = req.query;
    console.log( search, experience, rating, page, limit )

    const doctors = await searchDoctors({ search, page, limit });
    console.log('doctors data '+doctors)
    res.status(200).json({ success: true, doctors });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Get Doctor by ID
export const getDoctorProfileController = async (req, res) => {
  try {
    const { id } = req.params;
    console.log('doctor id '+id)
    const doctor = await getDoctorById(id);
    if (!doctor) return res.status(404).json({ success: false, message: "Doctor not found" });

    res.status(200).json({ success: true, doctor });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};


//getALLDoc
export const getAllDoctorsController = async(req, res) =>{
  try {
    const doctors = await getAllDoctorsModel();
    res.status(200).json({ success: true, doctors });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
}

//delete doc
export const deleteDoctorController = async(req, res) =>{
  try {
    const { id } = req.params;
    if (!id) return res.status(404).json({ success: false, message: "ID not found" });

    const doctor = await deleteDoctorById(id);

    res.status(200).json({ success: true, doctor });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
}

//getting avaliable slot
export const getAvailableSlotController = async(req, res) =>{
  try {
    const { id } = req.params;
    if (!id) return res.status(404).json({ success: false, message: "ID not found" });

    try{

      const availableSlots = await availableSlotModel(id);
      res.status(200).json({ success: true, availableSlots });
    }
    catch(err){
      res.status(500).json({ success: false, message: "error while collecting available slot from DB" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
}

export const updateDoctorController = async (req, res) => {
  const { id } = req.params;
  const {available_times} = req.body;
  console.log('available time array')
  console.log(available_times)
  console.log(typeof available_times[0])

  try {

    // Check for required fields
    if (!available_times) {
      return res.status(400).json({ error: "fields are required." });
    }

    // Update doctor
    try{
      const updatedDoctor = await updateDoctorslot(id,available_times);
      res.status(200).json({success: true, message: 'slots updated successfully'})
    }
    catch(err){
      console.log('err query to update doctor slots '+err)
      res.status(500).json({success: false, message: 'error while updating slots'})
    }
  }
  catch (error) {
    res.status(500).json({ error: error.message });
  }
};