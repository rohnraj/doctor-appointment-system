import { addReview, getReviewsByDoctor } from "../models/reviewModel.js";

//  Add a review (Only for completed appointments)
export const addReviewController = async (req, res) => {
  try {
    const { doctorId, appointmentId, rating, review } = req.body;
    const patientId = req.user.id; // Extracted from JWT token

    if (!doctorId || !appointmentId || !rating || !review) {
      return res.status(400).json({ error: "All fields are required." });
    }

    // Call model function to add review
    const newReview = await addReview(patientId, doctorId, appointmentId, rating, review);
    res.status(201).json({ message: "Review added successfully", review: newReview });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all reviews for a specific doctor
export const getReviewsByDoctorController = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const reviews = await getReviewsByDoctor(doctorId);
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
