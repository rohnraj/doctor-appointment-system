"use client"
import React , {useEffect, useState, useContext} from "react"
import styles from "./page.module.css"
import Navbar from "@/app/components/navbar/Navbar"
import Button from "@/app/components/button/Button"
import Footer from "@/app/components/footer/Footer"
import { useRouter } from "next/navigation"
import { LucideUsers, LucideUserMinus, LucideCalendarCheck, LucideShield } from "lucide-react"
import {IsAuthContext} from '@/app/components/useContext/UseContext'

function AdminDashboard() {
  const router = useRouter()

  const [allUsersNum, setAllUserNum] = useState<number | string>('-')
  const [allDocNum, setAllDocNum] = useState<number | string>('-')

  // @ts-ignore
  const {isAuth} = useContext(IsAuthContext)
    const handleNavigation = (path: string) => {
      router.push(`/${path}`)
    }

  useEffect(()=>{
    async function fetching(){
      const res = await(await fetch('http://localhost:8080/api/auth/getAllUser')).json()
      const res1 = await(await fetch('http://localhost:8080/api/doctors/getAllDoc')).json()

      setAllDocNum(res1.doctors)
      setAllUserNum(res.data)
    }fetching()
  }, [])

   
  return (
    <>
      <Navbar />

      {isAuth ? (

        <main className={styles.adminContainer}>
          <div className={styles.headerSection}>
            <div className={styles.headerContent}>
              <h1 className={styles.heading}>Admin Dashboard</h1>
              <p className={styles.subheading}>
                Manage doctors, appointments, and system settings from one central location.
              </p>
            </div>
          </div>

          <div className={styles.featuresSection}>
            <div className={styles.featuresGrid}>
              <div className={styles.featureCard} onClick={() => handleNavigation("add-doctor")}>
                <div className={styles.iconWrapper}>
                  <LucideUsers className={styles.featureIcon} />
                </div>
                <h2 className={styles.featureTitle}>Add Doctor</h2>
                <p className={styles.featureDescription}>
                  Add new healthcare providers to the system with their specialties and availability.
                </p>
                
              </div>

              <div className={styles.featureCard} onClick={() => handleNavigation("remove-doctor")}>
                <div className={styles.iconWrapper}>
                  <LucideUserMinus className={styles.featureIcon} />
                </div>
                <h2 className={styles.featureTitle}>Remove Doctor</h2>
                <p className={styles.featureDescription}>
                  Remove healthcare providers who are no longer associated with the platform.
                </p>
                
              </div>

              <div className={styles.featureCard} onClick={() => handleNavigation("slots-approval")}>
                <div className={styles.iconWrapper}>
                  <LucideCalendarCheck className={styles.featureIcon} />
                </div>
                <h2 className={styles.featureTitle}>Slots Approval</h2>
                <p className={styles.featureDescription}>
                  Review and approve or deny appointment slots requested by healthcare providers.
                </p>
                
              </div>
            </div>
          </div>

          <div className={styles.statsSection}>
            <div className={styles.statCard}>
              <h3>Total Doctors</h3>
              <p className={styles.statNumber}>{allDocNum}</p>
            </div>
            <div className={styles.statCard}>
              <h3>Active Users</h3>
              <p className={styles.statNumber}>{allUsersNum}</p>
            </div>
          </div>
        </main>
      ) : (<div>loading...</div>) }
      <Footer />
    </>
  )
}

export default AdminDashboard

