import Navbar from "@/app/components/navbar/Navbar";
import React from "react";
import styles from "./page.module.css";
import Footer from "@/app/components/footer/Footer";

export default function app(){
    return(
        <>
            <Navbar/>
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
                        <div><p id={styles.p1}><strong>Filter By:</strong></p><p id={styles.p2}><strong>Reset</strong></p></div>
                        <div className={styles.filterContainer}>

                            <div className={styles.rating}>
                                <label>Rating</label>
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
                            <div className={styles.experience}>
                                <label>Experience</label>
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
                            <div className={styles.gender}>
                                <label>Gender</label>
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
                    </aside>

                    {/* ye grid banega */}
                    <div className={styles.doctorCard}>
                        <div className={`${styles.doctor} ${styles.doctor1}`}>
                            <div className="displayPhoto"></div>
                            <h3></h3>
                            <div className="specialityExp"></div>
                            <p></p>
                            <button></button>
                        </div>
                        <div className={`${styles.doctor} ${styles.doctor2}`}></div>
                        <div className={`${styles.doctor} ${styles.doctor3}`}></div>
                        <div className={`${styles.doctor} ${styles.doctor4}`}></div>
                        <div className={`${styles.doctor} ${styles.doctor5}`}></div>
                        <div className={`${styles.doctor} ${styles.doctor6}`}></div>
                    </div>
                </div>

                <div className="prevNextScroll"></div>
            </main>

            <Footer/>
        </>
    )
}