"use client"

import { useState, useEffect } from "react"
import styles from "./page.module.css"
import Navbar from "@/app/components/navbar/Navbar"
import Footer from "@/app/components/footer/Footer"
import { useRouter } from "next/navigation"
import { LucideArrowLeft, LucideSearch, LucideTrash2, LucideAlertCircle } from "lucide-react"
import Pagenation from '../components/pagenation/Pagenation'

interface Doctor {
  id: number
  name: string
  degree: string
  speciality: string
  experience: number
  img_url: string
}

function RemoveDoctor() {
  const router = useRouter()
  const [doctors, setDoctors] = useState<Doctor[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [currentPage, setCurrentPage] = useState(1);
  const[AllDocNum, setAllDocNum] = useState<string | number>('')

  useEffect(() => {
    async function fetching() {
        const fetchData= await(await fetch(`http://localhost:8080/api/doctors/top?page=${currentPage}`)).json();
        const res1 = await(await fetch('http://localhost:8080/api/doctors/getAllDoc')).json()
        console.log(fetchData.doctors)
        setDoctors(fetchData.doctors);
        setAllDocNum(res1.doctors)
      }
      fetching();
    }, [currentPage]);

    function handleSerchClick(){
      async function fetching() {
          const fetchData= await (await fetch(`http://localhost:8080/api/doctors/search?search=${searchTerm}`)).json();
          console.log(fetchData.doctors)
          setDoctors(fetchData.doctors);
      }
      fetching();     
    }
    const totalPages = Math.floor(Number(AllDocNum) / 6);
    const handleRemoveClick = (doctor: Doctor) => {
      async function fetching() {
        try {
          const response = await fetch(`http://localhost:8080/api/doctors/deleteDoc/${doctor.id}`, {
            method: "DELETE",
            credentials: "include", // ✅ Send cookies with the request
            headers: {
              "Content-Type": "application/json",
            },
          });
    
          const fetchData = await response.json();
          console.log(fetchData);
          
          if(fetchData.success){
            alert('Doctor delete successfully')
            router.push('/home')
          }

          // Update state if necessary
          // setDoctors(fetchData.doctors);
        } catch (error) {
          console.error("Error deleting doctor:", error);
        }
      }
    
      fetching();
    };
    

  const confirmRemove = () => {
    if (selectedDoctor) {
      // In a real app, you would call your API to remove the doctor
      setDoctors(doctors.filter((doc) => doc.id !== selectedDoctor.id))
      setShowConfirmation(false)
      setSelectedDoctor(null)
    }
  }

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
        setCurrentPage(page);
    }
    console.log('page' + page)
    // setDoctorsSlice(doctors.slice(page+6-2, (page+6-1)+6))
};

  return (
    <>
      <Navbar />
      <main className={styles.removeDoctorContainer}>
        <div className={styles.header}>
          <button className={styles.backButton} onClick={() => router.push("/admin")}>
            <LucideArrowLeft size={18} />
            <span>Back to Dashboard</span>
          </button>
          <h1 className={styles.heading}>Remove Doctor</h1>
        </div>

        <div className={styles.contentContainer}>
          <div className={styles.searchContainer}>
            <div className={styles.searchBar}>
              <LucideSearch size={20} className={styles.searchIcon} />
              <input
                type="text"
                placeholder="Search by name or speciality..."
                value={searchTerm}
                onChange={(e)=>setSearchTerm(e.target.value)}
              />
              <button onClick={handleSerchClick}>Search</button>
            </div>
          </div>

          <div className={styles.doctorsGrid}>
              {doctors.length > 0 ? (
                doctors.map((doctor) => (
                  <div key={doctor.id} className={styles.doctorCard}>
                    <div className={styles.doctorInfo}>
                      <img src={doctor.img_url || "/placeholder.svg"} alt={doctor.name} className={styles.doctorImage} />
                      <div className={styles.doctorDetails}>
                        <h3>{doctor.name}</h3>
                        <p>{doctor.degree}</p>
                        <p>
                          {doctor.speciality} • {doctor.experience} years exp.
                        </p>
                      </div>
                    </div>
                    <button className={styles.removeButton} onClick={() => handleRemoveClick(doctor)}>
                      <LucideTrash2 size={18} />
                      <span>Remove</span>
                    </button>
                  </div>
                ))
              ) : (
                <div className={styles.noResults}>
                  <LucideSearch size={48} />
                  <p>No doctors found matching your search criteria.</p>
                </div>
              )}
            </div>          
        </div>

        {showConfirmation && selectedDoctor && (
          <div className={styles.confirmationOverlay}>
            <div className={styles.confirmationDialog}>
              <div className={styles.confirmationHeader}>
                <LucideAlertCircle size={24} className={styles.warningIcon} />
                <h2>Confirm Removal</h2>
              </div>
              <p>
                Are you sure you want to remove <strong>{selectedDoctor.name}</strong> from the system? This action
                cannot be undone.
              </p>
              <div className={styles.confirmationActions}>
                <button className={styles.cancelButton} onClick={() => setShowConfirmation(false)}>
                  Cancel
                </button>
                <button className={styles.confirmButton} onClick={confirmRemove}>
                  Confirm Removal
                </button>
              </div>
            </div>
          </div>
        )}

        
      {doctors.length!=0 ? (<Pagenation page={currentPage} handlePageChange={handlePageChange}  totalPages={totalPages}/>) : ('')}
      </main>
      <Footer />
    </>
  )
}

export default RemoveDoctor

