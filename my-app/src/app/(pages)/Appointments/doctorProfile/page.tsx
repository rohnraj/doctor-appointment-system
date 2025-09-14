'use client'

import React, { useEffect, useState } from 'react'
import Navbar from '@/app/components/navbar/Navbar'
import Footer from '@/app/components/footer/Footer'
import styles from './page.module.css'
import {API_URL} from "../../../../const.js"

interface Doctor {
    name: string,
    photo: string,
    specialty: string,
    location: string,
    experience: string,
    rating: number,
    degree: string,
    gender: string,
    available_dates: string[],
    available_times: string[][],
}

export default function page() {
    const [doctor, setdoctor] = useState<Doctor | null>(null)
    useEffect(() => {
        (async function () {
            const doctorData = await (await fetch(`${API_URL}/api/doctors/70af0cd9-dfb6-4276-b227-3b58861a6a71`)).json()
            setdoctor(doctorData.doctor)
        })();
    }, []);

    return (
        <>
            <Navbar />
            <div className={styles.profileContainer}>
                {doctor ? (
                    <div className={styles.profileCard}>
                        <div className={styles.header}>
                            <img src={doctor.photo} alt={doctor.name} className={styles.profilePhoto} />
                            <div className={styles.headerInfo}>
                                <h1 className={styles.profileName}>{doctor.name}</h1>
                                <p className={styles.profileSpecialty}>{doctor.specialty}</p>
                                <p className={styles.profileLocation}>{doctor.location}</p>
                            </div>
                        </div>
                        <div className={styles.details}>
                            <p><strong>Experience:</strong> {doctor.experience}</p>
                            <p><strong>Rating:</strong> {doctor.rating}</p>
                            <p><strong>Degree:</strong> {doctor.degree}</p>
                            <p><strong>Gender:</strong> {doctor.gender}</p>
                        </div>
                        <div className={styles.availability}>
                            <h3>Available Dates:</h3>
                            <ul>
                                {doctor.available_dates.map((date, index) => (
                                    <li key={index}>{date}</li>
                                ))}
                            </ul>
                            <h3>Available Times:</h3>
                            <ul>
                                {doctor.available_times.map((times, index) => (
                                    <li key={index}>{times.join(', ')}</li>
                                ))}
                            </ul>
                        </div>
                        <div className={styles.actions}>
                            <button className={styles.editButton}>Edit Profile</button>
                            <button className={styles.settingsButton}>Settings</button>
                        </div>
                    </div>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
            <Footer />
        </>
    )
}