'use client'

import React from 'react'
import styles from './page.module.css'
import Navbar from '@/app/components/navbar/Navbar'
import Button from '@/app/components/button/Button'

function page() {
  return (  
    <>

        <Navbar/>
        <main className={styles.hero}>
            <div className={styles.fstcontainer}>
                <div className={styles.containt}>

                    <div><span className={styles.heading}>Health in Your<br/>Hands.</span></div>
                    <div className={styles.para}>
                       <div>Take control of your healthcare with CareMate. Book appointments with ease, explore health blogs, and stay on top of your well-being, all in one place.</div> 
                    </div>

                    <div className={styles.btndiv}>
                        <Button text={'Get Started'} onClick={()=>{}} type={'submit'} variant={'mainPageButton'}/>
                    </div>
                </div>
            </div>


            <div className={styles.scdcontainer}>
                <img className={styles.heroImg} src='/assets/heropageImg.svg' alt='heroimg'/>
            </div>
        </main>
    </>
  )
}

export default page