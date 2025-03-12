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
                    <img src={img_url} alt={name} />
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