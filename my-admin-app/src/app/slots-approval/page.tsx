
"use client"

import { useState, useEffect } from "react"
import styles from "./page.module.css"
// import Navbar from "@/app/components/navbar/Navbar"
// import Footer from "@/app/components/footer/Footer"
import { useRouter } from "next/navigation"
// import { LucideArrowLeft, LucideCalendar, LucideCheck, LucideX, LucideFilter } from "lucide-react"

interface SlotRequest {
  id: number
  doctorId: number
  doctorName: string
  speciality: string
  date: string
  timeSlots: string[]
  status: "pending" | "approved" | "denied"
}

function SlotsApproval() {
  const router = useRouter()
  const [slotRequests, setSlotRequests] = useState<SlotRequest[]>([])
  const [filter, setFilter] = useState<"all" | "pending" | "approved" | "denied">("all")

  // Mock data - in a real app, you would fetch this from your API
  useEffect(() => {
    // Simulating API fetch
    const mockSlotRequests: SlotRequest[] = [
      {
        id: 1,
        doctorId: 1,
        doctorName: "Dr. Sarah Johnson",
        speciality: "Cardiology",
        date: "2025-03-25",
        timeSlots: ["9:00 AM - 10:00 AM", "10:00 AM - 11:00 AM", "11:00 AM - 12:00 PM"],
        status: "pending",
      },
      {
        id: 2,
        doctorId: 2,
        doctorName: "Dr. Michael Chen",
        speciality: "Orthopedics",
        date: "2025-03-26",
        timeSlots: ["2:00 PM - 3:00 PM", "3:00 PM - 4:00 PM", "4:00 PM - 5:00 PM"],
        status: "pending",
      },
      {
        id: 3,
        doctorId: 3,
        doctorName: "Dr. Emily Rodriguez",
        speciality: "Pediatrics",
        date: "2025-03-24",
        timeSlots: ["9:00 AM - 10:00 AM", "10:00 AM - 11:00 AM"],
        status: "approved",
      },
      {
        id: 4,
        doctorId: 4,
        doctorName: "Dr. James Wilson",
        speciality: "Neurology",
        date: "2025-03-27",
        timeSlots: ["1:00 PM - 2:00 PM", "2:00 PM - 3:00 PM"],
        status: "denied",
      },
    ]
    setSlotRequests(mockSlotRequests)
  }, [])

  const filteredRequests = filter === "all" ? slotRequests : slotRequests.filter((request) => request.status === filter)

  const handleApprove = (id: number) => {
    setSlotRequests(slotRequests.map((request) => (request.id === id ? { ...request, status: "approved" } : request)))
  }

  const handleDeny = (id: number) => {
    setSlotRequests(slotRequests.map((request) => (request.id === id ? { ...request, status: "denied" } : request)))
  }

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }
    return new Date(dateString).toLocaleDateString("en-US", options)
  }

  return (
    <>
      {/* <Navbar /> */}
      <main className={styles.slotsApprovalContainer}>
        <div className={styles.header}>
          <button className={styles.backButton} onClick={() => router.push("/admin")}>
            {/* <LucideArrowLeft size={18} /> */}
            <span>Back to Dashboard</span>
          </button>
          <h1 className={styles.heading}>Slots Approval</h1>
        </div>

        <div className={styles.contentContainer}>
          <div className={styles.filterContainer}>
            <div className={styles.filterWrapper}>
              {/* <LucideFilter size={18} /> */}
              <select value={filter} onChange={(e) => setFilter(e.target.value as any)} className={styles.filterSelect}>
                <option value="all">All Requests</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="denied">Denied</option>
              </select>
            </div>
          </div>

          <div className={styles.requestsContainer}>
            {filteredRequests.length > 0 ? (
              filteredRequests.map((request) => (
                <div key={request.id} className={`${styles.requestCard} ${styles[request.status]}`}>
                  <div className={styles.requestHeader}>
                    <div className={styles.doctorInfo}>
                      <h3>{request.doctorName}</h3>
                      <p>{request.speciality}</p>
                    </div>
                    <div className={styles.statusBadge}>
                      {request.status === "pending" && "Pending Review"}
                      {request.status === "approved" && "Approved"}
                      {request.status === "denied" && "Denied"}
                    </div>
                  </div>

                  <div className={styles.dateInfo}>
                    {/* <LucideCalendar size={18} /> */}
                    <span>{formatDate(request.date)}</span>
                  </div>

                  <div className={styles.timeSlots}>
                    <h4>Requested Time Slots:</h4>
                    <div className={styles.slotsList}>
                      {request.timeSlots.map((slot, index) => (
                        <div key={index} className={styles.slotItem}>
                          {slot}
                        </div>
                      ))}
                    </div>
                  </div>

                  {request.status === "pending" && (
                    <div className={styles.actionButtons}>
                      <button className={styles.approveButton} onClick={() => handleApprove(request.id)}>
                        {/* <LucideCheck size={18} /> */}
                        <span>Approve</span>
                      </button>
                      <button className={styles.denyButton} onClick={() => handleDeny(request.id)}>
                        {/* <LucideX size={18} /> */}
                        <span>Deny</span>
                      </button>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className={styles.noResults}>
                {/* <LucideCalendar size={48} /> */}
                <p>No slot requests found matching your filter.</p>
              </div>
            )}
          </div>
        </div>
      </main>
      {/* <Footer /> */}
    </>
  )
}

export default SlotsApproval

