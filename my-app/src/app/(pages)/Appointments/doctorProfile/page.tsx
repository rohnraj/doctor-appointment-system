'use client'

import React, { useEffect, useState } from 'react'
import Navbar from '@/app/components/navbar/Navbar'
import Footer from '@/app/components/footer/Footer'
import styles from './page.module.css'
import { FaStar, FaStarHalf, FaUserMd, FaCalendarAlt, FaClock } from 'react-icons/fa';
import { MdSchool } from 'react-icons/md';
import { BsGenderAmbiguous } from 'react-icons/bs';

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

const RatingStars = ({ rating }: { rating: number }) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    return (
        <div className={styles.rating}>
            {[...Array(fullStars)].map((_, i) => (
                <FaStar key={i} />
            ))}
            {hasHalfStar && <FaStarHalf />}
            <span>({rating})</span>
        </div>
    );
};

export default function page() {
    const [doctor, setdoctor] = useState<Doctor | null>(null)
    useEffect(() => {
        (async function () {
            const doctorData = await (await fetch('http://localhost:8080/api/doctors/70af0cd9-dfb6-4276-b227-3b58861a6a71')).json()
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
                                {/* <RatingStars rating={doctor.rating} /> */}
                            </div>
                        </div>
                        <div className={styles.details}>
                            <p>
                                <FaUserMd />
                                <strong>Experience:</strong>
                                <span>{doctor.experience}</span>
                            </p>
                            <p>
                                <MdSchool />
                                <strong>Degree:</strong>
                                <span>{doctor.degree}</span>
                            </p>
                            <p>
                                <BsGenderAmbiguous />
                                <strong>Gender:</strong>
                                <span>{doctor.gender}</span>
                            </p>
                        </div>
                        <div className={styles.availability}>
                            <div>
                                <h3><FaCalendarAlt /> Available Dates</h3>
                                <ul>
                                    {doctor.available_dates.map((date, index) => (
                                        <li key={index}>{date.split('T')[0]}</li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <h3><FaClock /> Available Times</h3>
                                <ul>
                                    {doctor.available_times.map((times, index) => (
                                        <li key={index}>{`${times[index].split(':')[0]}: ${times[index].split(':')[1]}`}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className={styles.actions}>
                            <button className={styles.editButton}>Book Appointment</button>
                        </div>
                    </div>
                ) : (
                    <div className={styles.loading}>
                        {/* <div className={styles.spinner}></div> */}
                        {/* <p>Loading doctor's profile...</p> */}
                    </div>
                )}
            </div>
            <Footer />
        </>
    )
}