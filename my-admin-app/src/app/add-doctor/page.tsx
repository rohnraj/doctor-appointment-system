"use client"

import type React from "react"
import { useState } from "react"
import styles from "./page.module.css"
import Navbar from "@/app/components/navbar/Navbar"
import Button from "@/app/components/button/Button"
import Footer from "@/app/components/footer/Footer"
import { useRouter } from "next/navigation"
import Calendar from "@/app/components/calendar/Calendar"
import { LucideArrowLeft, LucideUpload } from "lucide-react"
import { toast , Bounce} from "react-toastify"


function AddDoctor() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    degree: "",
    speciality: "",
    experience: "",
    address: "",
    availableTimes: "",
    availableDate: "",
    gender: "",
  })
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [selectedDatesArr, setSelectedDatesArr] = useState<string[]> ([])
  const [isEditingDates, setIsEditingDates] = useState(false);

  // @ts-ignore
  // const handleChange = (e) => {
  //   const { name, value } = e.target
  //   console.log(e.target.value)
  //     // @ts-ignore
  //   setFormData((prev) => ({ ...prev, [name]: name === "availableTimes" || name === "availableDate" ? value.split(",").map(time => time.trim()) : value }))
  // }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
  
    setFormData((prev) => ({
      ...prev,
      [name]: name === "availableTimes" || name === "availableDate" ? value.split(",").map(time => time.trim()) : value
    }));


    if (name === "availableDate") {
      const dates=e.target.value
      setSelectedDatesArr(dates.split(", ").map(date => date.trim()));
    }
  };
  
  console.log(formData)

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
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the data to your API
    // console.log("Form submitted:", formData)

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
          availableTimes: formData.availableTimes, 
          photo: imagePreview,
          gender: formData.gender,
          availableDate: formData.availableDate,
        }),
      });
  
      const data = await response.json();
      console.log("🟢 API Response:", data);

    } catch (error) {
      console.error("❌ Fetch Error:", error);
    }

    toast.success('🦄 Doctor Successfully!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
      });
      
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
  // async function handleAddDoc() {
  //   console.log("🚀 Sending API Request...");
  
    
  // }

  // function gettingDataFromChild(data: Date){
  //   // const formattedDate = data.toISOString().split("T")[0];
  //   // setSelectedDatesArr([...selectedDatesArr, formattedDate])
  //   // console.log('selected Dates '+selectedDatesArr)
  //   // console.log('typeof'+ typeof selectedDatesArr[0])

  //   const year = data.getUTCFullYear();
  //   const month = String(data.getUTCMonth() + 1).padStart(2, "0"); 
  //   const day = String(data.getUTCDate()).padStart(2, "0");
    
  //   const formattedDate = `${year}-${month}-${day}`;
  //   setSelectedDatesArr([...selectedDatesArr, formattedDate]);
  //   // console.log("selected Dates " + selectedDatesArr);
    
    
  // }

  function gettingDataFromChild(data: Date) {
    const year = data.getUTCFullYear();
    const month = String(data.getUTCMonth() + 1).padStart(2, "0"); 
    const day = String(data.getUTCDate()).padStart(2, "0");
  
    const formattedDate = `${year}-${month}-${day}`;
  
    setSelectedDatesArr((prevDates) => {
      const newDates = [...prevDates, formattedDate]; 
      setFormData((prev) => ({ ...prev, availableDate: newDates.join(", ") }));
      return newDates;
    });
  }
  
  //@ts-ignore
  function handleReset(e){

      e.preventDefault(); // Prevents default form reset (optional)
      setFormData({
        name: "",
        degree: "",
        speciality: "",
        experience: "",
        address: "",
        availableTimes: "",
        availableDate: "",
        gender: "",
      });
  }

  return (
    <>
      <Navbar />
      <main className={styles.addDoctorContainer}>
        <div className={styles.header}>
          <button className={styles.backButton} onClick={() => router.push("/home")}>
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
                
                <div className={styles.parentCalendar}>

                {/* <div className={styles.calendar}>
                  <div><Calendar handleDatesArr={gettingDataFromChild}/></div>
                  <div className={`${styles.formGroup} ${styles.inpCalender}`}>
                    
                    <input
                      type="text"
                      id="availableDate"
                      name="availableDate"  
                      value={formData.availableDate}
                      onChange={handleChange}
                      placeholder={selectedDatesArr.join(", ")}
                      required
                    />
                    <button className={styles.AddButton} onClick={(e)=>{
                      selectedDatesArr
                    }}>Add Dates</button>
                  </div>
                </div>
                </div> */}

                <div className={styles.calendar}>
                  <div><Calendar handleDatesArr={gettingDataFromChild}/></div>
                  <div className={`${styles.formGroup} ${styles.inpCalender}`}>
                    <input
                      type="text"
                      id="availableDate"
                      name="availableDate"
                      value={formData.availableDate}
                      onChange={handleChange}
                      readOnly={!isEditingDates} 
                      placeholder="Select dates using calendar"
                    />
                    {isEditingDates ? (
                      <button 
                        className={styles.SaveButton} 
                        type="button" 
                        onClick={() => {
                          setIsEditingDates(false);
                        }}
                      >
                        Save
                      </button>
                    ) : (
                      <button 
                        className={styles.EditButton} 
                        type="button" 
                        onClick={() => setIsEditingDates(true)}
                      >
                        Edit Dates
                      </button>
                    )}
                  </div>
                </div>


              </div>
              <div className={styles.formGroup}>
                <label htmlFor="Time">Avaliable Time</label>
                <input
                  type="text"
                  id="availableTimes"
                  name="availableTimes"  
                  value={formData.availableTimes}
                  onChange={handleChange}
                  placeholder="Doctor's available time slots (comma-separated)"
                  required
                />
              </div>

            </div>
          </div>

          <div className={styles.formActions}>
            <Button text="Reset" onClick={(e) => handleReset(e)} type="reset" variant="smallcardButtonGreen" /> 
            <Button text="Add Doctor" onClick={() => {}} type="submit" variant="largeGreenBtn" />
          </div>
        </form>
      </main>
      <Footer />
    </>
  )
}

export default AddDoctor

