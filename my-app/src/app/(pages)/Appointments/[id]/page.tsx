
'use client'

import React, { useRef, useState, useEffect } from 'react'
import styles from './page.module.css'
import Navbar from '@/app/components/navbar/Navbar'
import Button from '@/app/components/button/Button'
import Footer from '@/app/components/footer/Footer'
import { useParams } from 'next/navigation'
import Calendar from '@/app/components/calendar/Calendar'

interface Doctor {
    name: string;
    degree: string;
    speciality: string;
    experience: number;
    rating: number;
    img_url: string;
    id:number;
    address:string;
}

const page: React.FC<Doctor>=({address})=> {

    let [isOpen, setIsOpen] = useState(false)
    let [pisOpen, setpIsOpen] = useState(false)
    let [addressData, setaddressData]=useState<string | null>(null)
    let {id}=useParams()
    // const options = [
    //     'MedicareHeart Institute, Okhla Road',
    // ]

    useEffect(()=>{
        async function fetching(){
            let fetchData: Doctor[]=await(await fetch("/data/doctors.json")).json()
            console.log(fetchData)
            fetchData.find((item)=>{
                if(item.id===Number(id)){
                    // console.log(item.address)
                    setaddressData(item.address)
                }
            })
        }
        fetching()
    },[id])

    // console.log(addressData);
    // let {address}=data
    // const [selectedOption, setSelectedOption] = useState(options[0])
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
                <div className={styles.slotContainer}>
                    <article>
                        <div className={styles.heading_and_button}>
                            <p>Schedule Appointment</p>
                            <Button text={'Book Appointment'} onClick={()=>{}} type={'submit'} variant={'cardButtonGreen'}/>
                        </div>
                        <div className={styles.booking}>
                            <button className="btn active">Book Video Consult</button>
                            <button className="btn">Book Hospital Visit</button>
                        </div>
                        <div className={styles.address}>
                            <div className={styles.select} onClick={()=>setIsOpen(!isOpen)}>
                                <p className={pisOpen ? styles.showpTag : styles.notshowpTag}>{addressData}</p>
                                <i className="fa-solid fa-caret-down"></i>
                                <ul className={isOpen==true ? styles.show_select_options : styles.hide_select_options} onClick={()=>setpIsOpen(true)}>
                                    {/* {options.map((option, index) => (
                                        <li key={index} onClick={() => setSelectedOption(option)}>
                                            {option}
                                        </li>
                                    ))} */}
                                    <li>{addressData}</li>
                                </ul>
                            </div>
                        </div>

                    </article>
                    <article>
                        <Calendar/>
                    </article>
                    <article>
                        <div className={styles.slotOne}>
                            <div>
                                <span>Morning</span>
                                <span>2 slot</span>
                            </div>
                            <hr/>
                            <div></div>
                        </div>
                        <div className={styles.slotTwo}>

                        </div>
                    </article>
                </div>
            </div>
        </main>
        <Footer/>
    </>
  )
}

export default page