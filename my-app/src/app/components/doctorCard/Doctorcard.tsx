import React from 'react'
import styles from './Doctorcard.module.css'
import Button from '../button/Button'
import Star from '../stars/Stars'

interface DoctorcardProps{
    name: string,
    degree: string,
    speciality: string,
    img_url: string,
    rating: number,
    experience: number,
    buttonFunctionality?:()=>void
}
const Doctorcard : React.FC<DoctorcardProps> =({
    name,
    degree,
    speciality,
    img_url,
    rating,
    experience,
    buttonFunctionality
})=>{

    return(
        <>
            <div className={styles.doctor}>
                <div className={styles.displayPhoto}>
                    <img src={'https://plus.unsplash.com/premium_photo-1661578535048-7a30e3a71d25?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'} alt={name} />
                </div>
                <div>
                    <h3 className={styles.name}>{name}, {degree}</h3>
                    <p>
                        <span>
                            <img src='/assets/Stethoscope.svg'/><span>{speciality}</span>
                        </span>  
                        <span>
                            <img src='/assets/Hourglass.svg'/><span>{experience} Years</span>
                        </span>
                    </p>
                </div>
                <p>
                    <span>Ratings: </span>
                        <span><Star rating={rating}/></span>
                </p>
                <Button text={'Book Appiontment'} onClick={buttonFunctionality} type={'submit'} variant={'cardButton'}/>
            </div>
        </>
    )
}

export default Doctorcard;