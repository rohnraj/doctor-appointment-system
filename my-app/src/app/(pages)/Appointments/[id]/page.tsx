
'use client'

import React, { useRef, useState, useEffect } from 'react'
import styles from './page.module.css'
import Navbar from '@/app/components/navbar/Navbar'
import Button from '@/app/components/button/Button'
import Footer from '@/app/components/footer/Footer'
import { useParams } from 'next/navigation'
import Calendar from '@/app/components/calendar/Calendar'

// name, specialty, experience, degree, location, availableTimes, availableDate, photo, gender
interface Doctor {
    name: string;
    degree: string;
    specialty: string;
    experience: number;
    rating: number;
    photo: string;
    id:number;
    location:string;
    available_times:string[];
    available_dates:Date[];
    gender:string;
}


const page: React.FC<Doctor>=()=> {

    let [isOpen, setIsOpen] = useState(false)
    let [pisOpen, setpIsOpen] = useState(false)
    let [addressData, setaddressData]=useState<string | null>(null)

    let [doctorData, setdoctorData] = useState<Doctor | null>(null)
    let {id}=useParams()
    // const options = [
    //     'MedicareHeart Institute, Okhla Road',
    // ]

    const [selectedDate, setSelectedDate] = useState<string> ('')
    const [fetchDate, setfetchDate] = useState<string[]>([])

    useEffect(()=>{
        async function fetching(){
            let fetchData=await(await fetch(`http://localhost:8080/api/doctors/${id}`)).json()
            setdoctorData(fetchData.doctor)
            // console.log(fetchData)
        }
        fetching()

        const formattedDates = doctorData?.available_dates.map(date => new Date(date).toISOString().split('T')[0]);
        console.log(typeof formattedDates, formattedDates)
        // @ts-ignore
        setfetchDate(formattedDates)
    },[id])

    console.log(doctorData)

    // console.log(addressData);
    // let {address}=data
    // const [selectedOption, setSelectedOption] = useState(options[0])

    // function dateClick(){
    //     async function fetching(){
    //         const fetchData = await (await fetch(`http://localhost:8080/api/doctors/Appointments/${Number(id)}/slotAvailable`)).json()
    //         console.log(fetchData)
    //     }fetching()
    // }

    console.log(doctorData?.available_dates)

    function gettingDataFromChild(data: Date) {
        const year = data.getUTCFullYear();
        const month = String(data.getUTCMonth() + 1).padStart(2, "0"); 
        const day = String(data.getUTCDate()).padStart(2, "0");
      
        const formattedDate = `${year}-${month}-${day}`;

        setSelectedDate(formattedDate)
      }

      console.log(selectedDate)
      
      

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
                            <Button text={'Book Appointment'} onClick={()=>{}} type={'submit'} variant={'smallcardButtonGreen'}/>
                        </div>
                        <div className={styles.booking}>
                            <button>Book Video Consult</button>
                            <button>Book Hospital Visit</button>
                        </div>
                        <div className={styles.address}>
                            <div className={styles.select} onClick={()=>setIsOpen(!isOpen)}>
                                <p className={pisOpen ? styles.showpTag : styles.notshowpTag}>{doctorData?.location}</p>
                                <i className="fa-solid fa-caret-down"></i>
                                <ul className={isOpen==true ? styles.show_select_options : styles.hide_select_options} onClick={()=>setpIsOpen(true)}>
                                    {/* {options.map((option, index) => (
                                        <li key={index} onClick={() => setSelectedOption(option)}>
                                            {option}
                                        </li>
                                    ))} */}
                                    <li>{doctorData?.location}</li>
                                </ul>
                            </div>
                        </div>

                    </article>
                    <article>
                        <Calendar handleprops={gettingDataFromChild}/>
                    </article>
                    <article>
                        <div className={styles.slotOne}>
                            <div>
                                <span>
                                    <i className="fa-solid fa-cloud-sun"></i>
                                    <label>Morning</label>
                                </span>
                                <span>2 slot</span>
                            </div>
                            <div>
                                <span><Button text={'9:00 AM'} onClick={()=>{}} type={'submit'} variant={'slotGreenBtn'}  disabled={doctorData?.available_times.includes('09:00:00') && fetchDate?.includes(selectedDate) ? false : true}/></span>
                                <span><Button text={'9:30 AM'} onClick={()=>{}} type={'submit'} variant={'slotGreenBtn'} disabled={doctorData?.available_times.includes('09:30:00') && fetchDate?.includes(selectedDate) ? false : true}/></span>
                                <span><Button text={'10:00 AM'} onClick={()=>{}} type={'submit'} variant={'slotGreenBtn'} disabled={doctorData?.available_times.includes('10:00:00') && fetchDate?.includes(selectedDate) ? false : true}/></span>
                                <span><Button text={'10:30 AM'} onClick={()=>{}} type={'submit'} variant={'slotGreenBtn'} disabled={doctorData?.available_times.includes('10:30:00') && fetchDate?.includes(selectedDate) ? false : true}/></span>
                                <span><Button text={'11:00 AM'} onClick={()=>{}} type={'submit'} variant={'slotGreenBtn'} disabled={doctorData?.available_times.includes('11:00:00') && fetchDate?.includes(selectedDate) ? false : true}/></span>
                                <span><Button text={'11:30 AM'} onClick={()=>{}} type={'submit'} variant={'slotGreenBtn'} disabled={doctorData?.available_times.includes('11:30:00') && fetchDate?.includes(selectedDate) ? false : true}/></span>
                                <span><Button text={'12:00 AM'} onClick={()=>{}} type={'submit'} variant={'slotGreenBtn'} disabled={doctorData?.available_times.includes('12:00:00') && fetchDate?.includes(selectedDate) ? false : true}/></span>
                                <span><Button text={'12:30 PM'} onClick={()=>{}} type={'submit'} variant={'slotGreenBtn'} disabled={doctorData?.available_times.includes('12:30:00') && fetchDate?.includes(selectedDate) ? false : true}/></span>
                            </div>
                        </div>
                        <div className={styles.slotTwo}>
                            <div>
                                <span>
                                    <i className="fa-solid fa-cloud-moon"></i>
                                    <label>Afternoon</label>
                                </span>
                                <span>2 slot</span>
                            </div>
                            <hr/>
                            <div>
                                <span><Button text={'1:00 PM'} onClick={()=>{}} type={'submit'} variant={'slotGreenBtn'}/></span>
                                <span><Button text={'1:30 PM'} onClick={()=>{}} type={'submit'} variant={'slotGreenBtn'}/></span>
                                <span><Button text={'2:00 PM'} onClick={()=>{}} type={'submit'} variant={'slotGreenBtn'}/></span>
                                <span><Button text={'2:30 PM'} onClick={()=>{}} type={'submit'} variant={'slotGreenBtn'}/></span>
                                <span><Button text={'3:00 PM'} onClick={()=>{}} type={'submit'} variant={'slotGreenBtn'}/></span>
                                <span><Button text={'3:30 PM'} onClick={()=>{}} type={'submit'} variant={'slotGreenBtn'}/></span>
                                <span><Button text={'4:00 PM'} onClick={()=>{}} type={'submit'} variant={'slotGreenBtn'}/></span>
                                <span><Button text={'4:30 PM'} onClick={()=>{}} type={'submit'} variant={'slotGreenBtn'}/></span>
                            </div>
                        </div>
                    </article>
                    <Button text={'Next'} onClick={()=>{}} type={'submit'} variant={'largeGreenBtn'}/>
                </div>
            </div>
        </main>
        <Footer/>
    </>
  )
}

export default page