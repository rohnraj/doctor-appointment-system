
'use client'

import React from 'react'
import styles from './page.module.css'
import Navbar from '@/app/components/navbar/Navbar'
import Button from '@/app/components/button/Button'
import Footer from '@/app/components/footer/Footer'

function page() {
  return (  
    <>

        <Navbar/>
        <main className={styles.hero}>
            <div className={styles.fstcontainer}>
                <div className={styles.containt}>

                    <div><span className={styles.heading}>Book Your Next<br/>Doctor Visit in<br/>Seconds.</span></div>
                    <div className={styles.para}>
                       <div>CareMate helps you find the best healthcare provider by specialty, location, and more, ensuring you get the care you need.</div> 
                    </div>
                </div>
            </div>


            <div className={styles.scdcontainer}>
                <img className={styles.heroImg} src='/assets/heroImgSlotPage.svg' alt='heroimg'/>
            </div>
        </main>
        <Footer/>
    </>
  )
}

export default page