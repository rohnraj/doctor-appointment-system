'use client'

import Navbar from "@/app/components/navbar/Navbar";
import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import Footer from "@/app/components/footer/Footer";
// import Star from "@/app/components/stars/Stars";
// import Button from "@/app/components/button/Button";
import Doctorcard from "@/app/components/doctorCard/Doctorcard";
import { useRouter } from "next/navigation";

interface Doctor {
    name: string;
    degree: string;
    speciality: string;
    experience: number;
    rating: number;
    img_url: string;
    id:number;
}

export default function app(){
    const [doctors, setDoctors] = useState<Doctor[]>([]);
    const [ratingDropDown, setRatingDropDown] = useState(true)
    const [expDropDown, setexpDropDown] = useState(true)
    const [genderDropDown, setGenderDropDown] = useState(true)

    useEffect(() => {
        async function fetching() {
            const fetchData: Doctor[] = await (await fetch("/data/doctors.json")).json();
            setDoctors(fetchData);
        }
        fetching();
    }, []);

    let routes=useRouter()


    return(
        <>
            <Navbar/>
            <div className={styles.section}>

                <header className={styles.headerContainer}>
                    <p className={styles.headerpara}><strong>Find a doctor at your own ease</strong></p>
                    <div className={styles.inputContainer}>
                        <i className="fa-solid fa-magnifying-glass"></i>
                        <input type="text" placeholder="Search doctors"/>
                        <button>Search</button>
                    </div>
                </header>

                <main className={styles.mainContainer}>
                    <div className={styles.mainheader}>
                        <h1>6 doctors available</h1>
                        <p>Book appointments with minimum wait-time & verified doctor details</p>
                    </div>

                    <div className={styles.container}>
                        <aside className={styles.aside}>
                            <div className={styles.asidefstDiv}>
                                <p><strong>Filter By:</strong></p>
                                <p><strong>Reset</strong></p>
                            </div>
                            <div className={styles.filterContainer}>

                                <div className={`${styles.rating}`}>
                                    <label>Rating</label>
                                    <div className={styles.filterhead}>
                                        <label>Rating</label>
                                        <span onClick={()=>setRatingDropDown(!ratingDropDown)}><i className="fa-solid fa-caret-down"></i></span>
                                    </div>
                                    <div className={`${ratingDropDown ? styles.showInp : ""} ${styles.filtermain}`}>

                                        <div className={styles.radioInp}>
                                            <input type="radio" />
                                            <label>show all</label>
                                        </div>

                                        <div className={styles.radioInp}>
                                            <input type="radio" />
                                            <label>1 star</label>
                                        </div>

                                        <div className={styles.radioInp}>
                                            <input type="radio" />
                                            <label>2 star</label>
                                        </div>

                                        <div className={styles.radioInp}>
                                            <input type="radio" />
                                            <label>3 star</label>
                                        </div>

                                        <div className={styles.radioInp}>
                                            <input type="radio" />
                                            <label>4 star</label>
                                        </div>

                                        <div className={styles.radioInp}>
                                            <input type="radio" />
                                            <label>5 star</label>
                                        </div>
                                    </div>

                                </div>
                                <div className={styles.experience}>
                                    <label>Experience</label>
                                    <div className={styles.filterhead}>
                                        <label>Experience</label>
                                        <span onClick={()=>setexpDropDown(!expDropDown)}><i className="fa-solid fa-caret-down"></i></span>
                                    </div>
                                    <div className={`${expDropDown ? styles.showInp : ""} ${styles.filtermain}`}>

                                        <div className={styles.radioInp}>
                                            <input type="radio" />
                                            <label>15+ years</label>
                                        </div>

                                        <div className={styles.radioInp}>
                                            <input type="radio" />
                                            <label>10-15 years</label>
                                        </div>

                                        <div className={styles.radioInp}>
                                            <input type="radio" />
                                            <label>5-10 years</label>
                                        </div>

                                        <div className={styles.radioInp}>
                                            <input type="radio" />
                                            <label>3-5 years</label>
                                        </div>

                                        <div className={styles.radioInp}>
                                            <input type="radio" />
                                            <label>1-3 years</label>
                                        </div>

                                        <div className={styles.radioInp}>
                                            <input type="radio" />
                                            <label>0-1 years</label>
                                        </div>
                                    </div>

                                </div>
                                <div className={styles.gender}>
                                    <label>Gender</label>
                                    <div className={styles.filterhead}>
                                        <label>Gender</label>
                                        <span onClick={()=>setGenderDropDown(!genderDropDown)}><i className="fa-solid fa-caret-down"></i></span>
                                    </div>
                                    <div className={`${genderDropDown ? styles.showInp : ""} ${styles.filtermain}`}>

                                        <div className={styles.radioInp}>
                                            <input type="radio" />
                                            <label>show all</label>
                                        </div>

                                        <div className={styles.radioInp}>
                                            <input type="radio" />
                                            <label>Male</label>
                                        </div>

                                        <div className={styles.radioInp}>
                                            <input type="radio" />
                                            <label>Female</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </aside>

                        {/* ye grid banega */}
                        <div className={styles.doctorCard}>
                            {/* <div className={`${styles.doctor} ${styles.doctor1}`}>
                                <div className="displayPhoto"></div>
                                <h3></h3>
                                <div className="specialityExp"></div>
                                <p></p>
                                <button></button>
                            </div>
                            <div className={`${styles.doctor} ${styles.doctor2}`}></div>
                            <div className={`${styles.doctor} ${styles.doctor3}`}></div>
                            <div className={`${styles.doctor} ${styles.doctor4}`}></div>
                            <div className={`${styles.doctor} ${styles.doctor5}`}></div> */}
                            {/* <div className={`${styles.doctor} ${styles.doctor6}`}></div> */}
                            {doctors.map((doctor, index) => (
                                // <div key={index} className={`${styles.doctor} ${styles[`doctor${index + 1}`]}`}>
                                //     <div className={styles.displayPhoto}>
                                //         <img src={doctor.img_url} alt={doctor.name} />
                                //     </div>
                                //     <div>
                                //         <h3 className={styles.name}>{doctor.name}, {doctor.degree}</h3>
                                //         <p>
                                //             <span>
                                //                 <img src='/assets/Stethoscope.svg'/><span>{doctor.speciality}</span>
                                //             </span>  
                                //             <span>
                                //                 <img src='/assets/Hourglass.svg'/><span>{doctor.experience} Years</span>
                                //             </span>
                                //         </p>
                                //     </div>
                                //     <p>
                                //         <span>Ratings: </span>
                                //         <span><Star rating={doctor.rating}/></span>
                                //     </p>
                                //     <Button text={'Book Appiontment'} onClick={()=>{}} type={'submit'} variant={'cardButton'}/>
                                // </div>
                                <div key={index} className={`${styles[`doctor${index + 1}`]}`}>
                                    <Doctorcard name={doctor.name} degree={doctor.degree} speciality={doctor.speciality} img_url={doctor.img_url} rating={doctor.rating} experience={doctor.experience} buttonFunctionality={function(){
                                        routes.push(`/Appointments/${doctor.id}`)
                                    }}/>
                                </div>
                            ))}
                        </div>

                    </div>

                    <div className="prevNextScroll"></div>
                </main>
            </div>

            <Footer/>
        </>
    )
}