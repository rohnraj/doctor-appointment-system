import React from 'react'
import styles from './Stars.module.css'

interface Rating{
    rating:number
}
const Stars: React.FC<Rating>=({rating})=>{

    let starsArray=Array.from({length:5},(val, ind)=>{
        let num=ind+0.5
        return(
            <span key={ind} className='star'>
                {rating>=ind+1 ? <img src='/assets/fullStar.svg'/> : <img src='/assets/emptyStar.svg'/>}
            </span>
        )
    })
    return(
        <>
            {starsArray}
        </>
    )
}

export default Stars