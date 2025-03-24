"use client"

import type React from "react"
import { useState } from "react"
import styles from "./page.module.css"
import Navbar from "@/app/components/navbar/Navbar"
import Button from "@/app/components/button/Button"
import Footer from "@/app/components/footer/Footer"
import { useRouter } from "next/navigation"
import { LucideArrowLeft, LucideUpload } from "lucide-react"


function AddDoctor() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    degree: "",
    speciality: "",
    experience: "",
    address: "",
    avaliableTimes: "",
    gender: ""
  })
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    console.log(e.target.value)
    setFormData((prev) => ({ ...prev, [name]: name === "avaliableTimes" ? value.split(",").map(time => time.trim()) : value }))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
      // console.log(file)
      // console.log('---------------')
    }
  }
  // console.log(imagePreview)
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the data to your API
    console.log("Form submitted:", formData)
    alert("Doctor added successfully!")
    // router.push("/admin")
  }

  // async function handleAddDoc (){
  //     const data = await (await fetch('http://localhost:8080/api/doctors/create', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json'
  //       },
  //       credentials: "include",

  //       //{ name, specialty, experience, degree, location, availableTimes }
  //       //@ts-ignore
  //       body: JSON.stringify({name, speciality, experience, degree, location:address, avaliableTimes, photo:imagePreview})
  //     })).json()

  //     console.log(data)
  // }
  async function handleAddDoc() {
    console.log("🚀 Sending API Request...");
  
    try {
      const response = await fetch("http://localhost:8080/api/doctors/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", 
  
        body: JSON.stringify({
          name: formData.name,
          specialty: formData.speciality,
          experience: formData.experience,
          degree: formData.degree,
          location: formData.address, 
          availableTimes: formData.avaliableTimes, 
          photo: imagePreview,
          gender: formData.gender
        }),
      });
  
      const data = await response.json();
      console.log("🟢 API Response:", data);
    } catch (error) {
      console.error("❌ Fetch Error:", error);
    }
  }
  
  return (
    <>
      <Navbar />
      <main className={styles.addDoctorContainer}>
        <div className={styles.header}>
          <button className={styles.backButton} onClick={() => router.push("/admin")}>
            <LucideArrowLeft size={18} />
            <span>Back to Dashboard</span>
          </button>
          <h1 className={styles.heading}>Add New Doctor</h1>
        </div>

        <form className={styles.doctorForm} onSubmit={handleSubmit}>
          <div className={styles.formGrid}>
            <div className={styles.formColumn}>
              <div className={styles.formGroup}>
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Dr. John Doe"
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="degree">Degree</label>
                <input
                  type="text"
                  id="degree"
                  name="degree"
                  value={formData.degree}
                  onChange={handleChange}
                  placeholder="MBBS, MD"
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="degree">gender</label>
                <input
                  type="text"
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  placeholder="Enter gender"
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="speciality">Speciality</label>
                <select id="speciality" name="speciality" value={formData.speciality} onChange={handleChange} required>
                  <option value="">Select Speciality</option>
                  <option value="Cardiology">Cardiology</option>
                  <option value="Dermatology">Dermatology</option>
                  <option value="Neurology">Neurology</option>
                  <option value="Orthopedics">Orthopedics</option>
                  <option value="Pediatrics">Pediatrics</option>
                  <option value="Psychiatry">Psychiatry</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="experience">Experience (years)</label>
                <input
                  type="number"
                  id="experience"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  placeholder="10"
                  min="0"
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="address">Hospital/Clinic Address</label>
                <textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="123 Medical Center, City"
                  required
                />
              </div>
            </div>

            <div className={styles.formColumn}>
              <div className={styles.imageUploadSection}>
                <div className={styles.imagePreview}>
                  {imagePreview ? (
                    <img src={imagePreview || "/placeholder.svg"} alt="Doctor preview" />
                  ) : (
                    <div className={styles.uploadPlaceholder}>
                      <LucideUpload size={32} />
                      <p>Upload Photo</p>
                    </div>
                  )}
                </div>
                <input
                  type="file"
                  id="doctorImage"
                  accept="image/*"
                  onChange={handleImageChange}
                  className={styles.fileInput}
                />
                <label htmlFor="doctorImage" className={styles.uploadButton}>
                  Choose Image
                </label>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="Time">Avaliable Time</label>
                <input
                  type="text"
                  id="avaliableTimes"
                  name="avaliableTimes"  
                  value={formData.avaliableTimes}
                  onChange={handleChange}
                  placeholder="Doctor's available time slots (comma-separated)"
                  required
                />
              </div>

            </div>
          </div>

          <div className={styles.formActions}>
            <Button text="Cancel" type="reset" variant="smallcardButtonGreen" /> 
            <Button text="Add Doctor" onClick={() => {handleAddDoc()}} type="submit" variant="largeGreenBtn" />
          </div>
        </form>
      </main>
      <Footer />
    </>
  )
}

export default AddDoctor

