
'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
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
    // id:number;
    location:string;
    available_times:string[][];
    available_dates:string[];
    gender:string;
}


const page =()=> {
    

    let {id}=useParams<{ id: string }>()

    const router=useRouter()

    let [isOpen, setIsOpen] = useState(false)
    let [pisOpen, setpIsOpen] = useState(false)
    // let [addressData, setaddressData]=useState<string | null>(null)

    let [doctorData, setdoctorData] = useState<Doctor | null>(null)

    const [selectedDate, setSelectedDate] = useState<string> ('')
    const [fetchDate, setfetchDate] = useState<string[]>([])
    const [typeofConsult, settypeofConsult] = useState('online')
    const [selectedTImeSlot, setselectedTImeSlot]=useState('')
    const [indexOfDate, setindexOfDate]=useState<number>(0)
    

    
    useEffect(()=>{ 
        async function fetching(){
            let fetchData=await(await fetch(`http://localhost:8080/api/doctors/${id}`)).json()
            setdoctorData(fetchData.doctor)
        }
        fetching()
    },[id])

    console.log(doctorData?.available_times)

    useEffect(()=>{
        if (!doctorData?.available_dates) return; 
        const formattedDates = doctorData?.available_dates.map(date => new Date(date).toISOString().split('T')[0]);
        console.log('formatted dates ',typeof formattedDates, formattedDates)
        // @ts-ignore
        setfetchDate(formattedDates)
    },[doctorData])

    console.log(fetchDate)

    function gettingDataFromChild(data: Date) {
        const year = data.getUTCFullYear();
        const month = String(data.getUTCMonth() + 1).padStart(2, "0"); 
        const day = String(data.getUTCDate()).padStart(2, "0");
      
        const formattedDate = `${year}-${month}-${day}`;

        setSelectedDate(formattedDate)

        if (doctorData?.available_dates) {
            const formattedAvailableDates = doctorData.available_dates.map(date =>
                new Date(date).toISOString().split('T')[0] // Convert to YYYY-MM-DD
            );
        
            setindexOfDate(formattedAvailableDates.indexOf(formattedDate));
        }
        
      }

    console.log('seleceted date: '+selectedDate ,'typof: '+typeof selectedDate, 'index of: '+indexOfDate)
      
    function bookSlot(time: string){
        console.log('Time slot'+time)
        setselectedTImeSlot(time)
    }


    const AllSlotData=new URLSearchParams({
        date:selectedDate,
        time:selectedTImeSlot,
        typeofConsult:typeofConsult,
        doctorId:id,
        name:doctorData?.name || '',
        specialty:doctorData?.specialty || '',
        location:doctorData?.location || '',
    }).toString()

    function handleNext(){
        const encodedURL = `/bookingConfirmatinon?${AllSlotData}`;
        // create folder in appoitments for this
        console.log(encodedURL);

        router.push(`/Appointments/${encodedURL}`)        
    }
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


            <div className={`${styles.scdcontainer} ${typeofConsult === 'online' ? styles.online : ''}`}>
                <div className={styles.slotContainer}>
                    <article>
                        <div className={styles.heading_and_button}>
                            <p>Schedule Appointment</p>
                            <Button text={'Book Appointment'} onClick={()=>{}} type={'submit'} variant={'smallcardButtonGreen'}/>
                        </div>
                        <div className={styles.booking}>
                            <button 
                                className={typeofConsult === 'online' ? styles.active : ''}
                                onClick={() => settypeofConsult('online')}
                            >
                                Book Video Consult
                            </button>
                            <button 
                                className={typeofConsult === 'offline' ? styles.active : ''}
                                onClick={() => settypeofConsult('offline')}
                            >
                                Book Hospital Visit
                            </button>
                        </div>

                        <div className={styles.address}>
                            <div className={styles.select} onClick={() => setIsOpen(!isOpen)}>
                                <p className={pisOpen ? styles.showpTag : styles.notshowpTag}>
                                    {doctorData?.location}
                                </p>
                                <i className="fa-solid fa-caret-down"></i>
                                <ul 
                                    className={isOpen ? styles.show_select_options : styles.hide_select_options} 
                                    onClick={() => setpIsOpen(true)}
                                >
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
                                <span>Slots</span>
                            </div>
                            <hr/>
                            <div>
                            {/* && fetchDate?.includes(selectedDate) */}
                                <span><Button text={'9:00 AM'} onClick={()=>bookSlot('9:00 AM')} type={'submit'} variant={'slotGreenBtn'}  disabled={doctorData?.available_times?.[indexOfDate]?.includes('09:00:00') && fetchDate?.includes(selectedDate) ? false : true}/></span>
                                <span><Button text={'9:30 AM'} onClick={()=>bookSlot('9:30 AM')}  type={'submit'} variant={'slotGreenBtn'} disabled={doctorData?.available_times?.[indexOfDate]?.includes('09:30:00') && fetchDate?.includes(selectedDate) ? false : true}/></span>
                                <span><Button text={'10:00 AM'} onClick={()=>bookSlot('10:00 AM')} type={'submit'} variant={'slotGreenBtn'} disabled={doctorData?.available_times?.[indexOfDate]?.includes('10:00:00') && fetchDate?.includes(selectedDate) ? false : true}/></span>
                                <span><Button text={'10:30 AM'} onClick={()=>bookSlot('10:30 AM')} type={'submit'} variant={'slotGreenBtn'} disabled={doctorData?.available_times?.[indexOfDate]?.includes('10:30:00') && fetchDate?.includes(selectedDate) ? false : true}/></span>
                                <span><Button text={'11:00 AM'} onClick={()=>bookSlot('11:00 AM')} type={'submit'} variant={'slotGreenBtn'} disabled={doctorData?.available_times?.[indexOfDate]?.includes('11:00:00') && fetchDate?.includes(selectedDate) ? false : true}/></span>
                                <span><Button text={'11:30 AM'} onClick={()=>bookSlot('11:30 AM')} type={'submit'} variant={'slotGreenBtn'} disabled={doctorData?.available_times?.[indexOfDate]?.includes('11:30:00') && fetchDate?.includes(selectedDate) ? false : true}/></span>
                                <span><Button text={'12:00 AM'} onClick={()=>bookSlot('12:00 AM')} type={'submit'} variant={'slotGreenBtn'} disabled={doctorData?.available_times?.[indexOfDate]?.includes('12:00:00') && fetchDate?.includes(selectedDate) ? false : true}/></span>
                                <span><Button text={'12:30 PM'} onClick={()=>bookSlot('12:30 PM')} type={'submit'} variant={'slotGreenBtn'} disabled={doctorData?.available_times?.[indexOfDate]?.includes('12:30:00') && fetchDate?.includes(selectedDate) ? false : true}/></span>
                            </div>
                        </div>
                        <div className={styles.slotTwo}>
                            <div>
                                <span>
                                    <i className="fa-solid fa-cloud-moon"></i>
                                    <label>Afternoon</label>
                                </span>
                                <span>Slots</span>
                            </div>
                            <hr/>
                            <div>
                                <span><Button text={'1:00 PM'} onClick={()=>bookSlot('1:00 PM')} type={'submit'} variant={'slotGreenBtn'} disabled={doctorData?.available_times?.[indexOfDate]?.includes('13:00:00') && fetchDate?.includes(selectedDate) ? false : true}/></span>
                                <span><Button text={'1:30 PM'} onClick={()=>bookSlot('1:30 PM')} type={'submit'} variant={'slotGreenBtn'} disabled={doctorData?.available_times?.[indexOfDate]?.includes('13:30:00') && fetchDate?.includes(selectedDate) ? false : true}/></span>
                                <span><Button text={'2:00 PM'} onClick={()=>bookSlot('2:00 PM')} type={'submit'} variant={'slotGreenBtn'} disabled={doctorData?.available_times?.[indexOfDate]?.includes('14:00:00') && fetchDate?.includes(selectedDate) ? false : true}/></span>
                                <span><Button text={'2:30 PM'} onClick={()=>bookSlot('2:30 PM')} type={'submit'} variant={'slotGreenBtn'} disabled={doctorData?.available_times?.[indexOfDate]?.includes('14:30:00') && fetchDate?.includes(selectedDate) ? false : true}/></span>
                                <span><Button text={'3:00 PM'} onClick={()=>bookSlot('3:00 PM')} type={'submit'} variant={'slotGreenBtn'} disabled={doctorData?.available_times?.[indexOfDate]?.includes('15:00:00') && fetchDate?.includes(selectedDate) ? false : true}/></span>
                                <span><Button text={'3:30 PM'} onClick={()=>bookSlot('3:30 PM')} type={'submit'} variant={'slotGreenBtn'} disabled={doctorData?.available_times?.[indexOfDate]?.includes('15:30:00') && fetchDate?.includes(selectedDate) ? false : true}/></span>
                                <span><Button text={'4:00 PM'} onClick={()=>bookSlot('4:00 PM')} type={'submit'} variant={'slotGreenBtn'} disabled={doctorData?.available_times?.[indexOfDate]?.includes('16:00:00') && fetchDate?.includes(selectedDate) ? false : true}/></span>
                                <span><Button text={'4:30 PM'} onClick={()=>bookSlot('4:30 PM')} type={'submit'} variant={'slotGreenBtn'} disabled={doctorData?.available_times?.[indexOfDate]?.includes('16:30:00') && fetchDate?.includes(selectedDate) ? false : true}/></span>
                            </div>
                        </div>
                    </article>
                    
                    <Button text={'Next'} onClick={()=>{
                        handleNext()
                    }} type={'submit'} variant={'largeGreenBtn'}/>
                </div>
            </div>
        </main>
        <Footer/>
    </>
  )
}

export default page