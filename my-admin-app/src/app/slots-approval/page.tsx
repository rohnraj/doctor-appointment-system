"use client";

import { useState, useEffect, useContext } from "react";
import styles from "./page.module.css";
import Navbar from "@/app/components/navbar/Navbar";
import Footer from "@/app/components/footer/Footer";
import { useRouter } from "next/navigation";
import { ToastContainer, toast, Bounce } from 'react-toastify';
import {IsAuthContext} from '@/app/components/useContext/UseContext'

interface UserInfo {
  fullName: string;
  age: string;
  gender: string;
  phoneNumber: string;
  email: string;
  healthProblem: string;
}


interface SlotRequest {
  id: string;
  doctor_id: string;
  doctor_name: string;
  doctor_specialty: string;
  appointments_dates: string;
  appointments_time: string;
  status: string
  user_info: UserInfo;
  location: string;
  consult_type: string;
}

// interface Doctor {
//   available_times: string[];
//   available_dates: string[];
// }

function SlotsApproval() {
  const router = useRouter();
  const [slotRequests, setSlotRequests] = useState<SlotRequest[]>([]);
  // const [doctorDetails, setDoctorDetails] = useState<Doctor[] >([])
  const [filter, setFilter] = useState<"all" | "Pending" | "Approved" | "Denied">("all");

  const authContext = useContext(IsAuthContext)
  useEffect(() => {
    if (authContext && !authContext.isAuth) {
        router.push("/"); // Redirect if not authenticated
    }
    }, [authContext?.isAuth, router]);

  if (!authContext?.isAuth) {
    return <p>Loading...</p>; // Show a loading message while checking auth
  }

  useEffect(() => {
    async function fetchAppointments() {
      try {
        const response = await fetch("http://localhost:8080/api/appointments/bookedslot", {
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        data.bookedSlots = data.bookedSlots.map((slot: any) => ({
          ...slot,
          appointments_dates: slot.appointments_dates.split("T")[0],
          user_info: typeof slot.user_info === "string" ? JSON.parse(slot.user_info) : slot.user_info
        }));
      
        setSlotRequests(data.bookedSlots);
      } catch (error) {
        console.error("Error fetching slot requests:", error);
      }

    }
    
    
    fetchAppointments();
  }, []);
  
  console.log(slotRequests)
  
  
  const handleApprove = (id: string, doctor_id : string, date : string , time : string) => {
    // setSlotRequests(slotRequests.map((request) => (request.id === id ? { ...request, status: "approved" } : request)));
    async function fetching(){
      const response = await (await fetch(`http://localhost:8080/api/appointments/approveSlot?id=${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      })).json()
      console.log(response)
      
      const dateArr = await (await fetch(`http://localhost:8080/api/doctors/${doctor_id}`, {
        method: 'GET',
      })).json()
      console.log('datesArr" '+ dateArr)
      const {available_times} = dateArr.doctor

      //@ts-ignore
      const newAvailableTimes = available_times.filter(item  => item !== time);


      // to edit doctos table date or time 
      const response1 = await (await fetch(`http://localhost:8080/api/doctors/${doctor_id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({newAvailableTimes}),
        credentials: "include",
      })).json()
        console.log(response1)
    }fetching()

    toast.success('🦄 Slot Approved Successfully!', {
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
  };

  const handleDeny = (id: string) => {
    // setSlotRequests(slotRequests.map((request) => (request.id === id ? { ...request, status: "denied" } : request)));
    async function fetching(){
      const response = await (await fetch(`http://localhost:8080/api/appointments/rejectSlot?id=${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      })).json()
      console.log(response)
    }fetching()

    toast.warn('🦄 Slot Denied Successfully!', {
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
  };

  const filteredRequests = filter === "all" ? slotRequests : slotRequests.filter((request) => request.status === filter);




  

  return (
    <>
      <Navbar />
      <main className={styles.slotsApprovalContainer}>
        <div className={styles.header}>
          <button className={styles.backButton} onClick={() => router.push("/home")}>
            <span>Back to Dashboard</span>
          </button>
          <h1 className={styles.heading}>Slots Approval</h1>
        </div>

        <div className={styles.contentContainer}>
          <div className={styles.filterContainer}>
            <select value={filter} onChange={(e) => setFilter(e.target.value as any)} className={styles.filterSelect}>
              <option value="all">All Requests</option>
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Denied">Denied</option>
            </select>
          </div>

          <div className={styles.requestsContainer}>
            {filteredRequests.length > 0 ? (
              filteredRequests.map((request) => (
                <div key={request.id} className={`${styles.requestCard} ${styles[request.status]}`}>
                  <div className={styles.requestHeader}>
                    <div className={styles.doctorInfo}>
                      <h3>{request.doctor_name}</h3>
                      <p>{request.doctor_specialty}</p>
                    </div>
                    <div className={styles.statusBadge}>{request.status === 'Pending' ? "Pending Review" : request.status}</div>
                  </div>

                  <div className={styles.dateInfo}>
                    <span>{request.appointments_dates}</span>
                  </div>

                  <div className={styles.timeSlots}>
                    <h4>Requested Time Slots:</h4>
                    <div className={styles.slotsList}>{request.appointments_time}</div>
                  </div>

                  <div className={styles.patientInfo}>
                    <h4>Patient Details:</h4>
                    <p><strong>Name:</strong> {request.user_info.fullName}</p>
                    <p><strong>Age:</strong> {request.user_info.age}</p>
                    <p><strong>Gender:</strong> {request.user_info.gender}</p>
                    <p><strong>Phone:</strong> {request.user_info.phoneNumber}</p>
                    <p><strong>Email:</strong> {request.user_info.email}</p>
                    <p><strong>Health Issue:</strong> {request.user_info.healthProblem}</p>
                  </div>

                  {request.status === "Pending" && (
                    <div className={styles.actionButtons}>
                      <button className={styles.approveButton} onClick={() => handleApprove(request.id, request.doctor_id, request.appointments_dates, request.appointments_time)}>
                        <span>Approve</span>
                      </button>
                      <button className={styles.denyButton} onClick={() => handleDeny(request.id)}>
                        <span>Deny</span>
                      </button>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className={styles.noResults}>
                <p>No slot requests found matching your filter.</p>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default SlotsApproval;
