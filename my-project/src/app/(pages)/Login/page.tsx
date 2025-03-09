'use client'

import React from 'react'
import styles from './page.module.css'
import Navbar from '@/app/components/navbar/Navbar'
import Button from '@/app/components/button/Button'

export default function page() {

    let [eyetoggle, seteyetoggle] = React.useState(true);
    let [passwrdTyep, setpasswrdType] = React.useState('password');
    return (
        <>
        
            <Navbar/>
            <div className={styles.pageContainer}>
                <div className={styles.formContainer}>
                    <div className={styles.loginHeading}>Login</div><br/>
                    <div className={styles.para}>Are you a new member? <strong>Sign up here.</strong></div>

                    <form action="#" className={styles.form}>

                        <div className={`${styles.emailContainer} ${styles.inputContainer}`}>
                            <i className="fa-solid fa-at" id={styles.iconAt}></i>
                            <label htmlFor="email">Email</label>
                            <input type='text' id='email'  className={styles.emailInp}/><br/><br/>
                        </div>

                        <div className={`${styles.passwrdContainer} ${styles.inputContainer}`}>
                            <i className="fa-solid fa-lock" id={styles.iconLock}></i>
                            <span onClick={()=>{
                                seteyetoggle(!eyetoggle);
                                setpasswrdType(passwrdTyep==='password' ? 'text' : 'password');
                            }}>{eyetoggle===true ? <i className="fa-solid fa-eye" id={styles.iconeye}></i> : <i className="fa-solid fa-eye-slash" id={styles.iconeye}></i>}</span>
                            <label htmlFor="passwrd">Password</label>
                            <input type={passwrdTyep==='password'? 'password' : 'text'} id='passwrd' /><br/><br/>
                        </div>

                        <div className={styles.btnContainer}>
                            <Button text={'Login'} onClick={()=>{}} type={'submit'} variant={'largeGreenBtn'}/>
                            <Button text={'Reset'} onClick={()=>{}} type={'submit'} variant={'largeBrownBtn'}/>
                        </div>

                        <div className={styles.forgotPara}><strong>Forgot Password ?</strong></div>
                    </form>
                </div>
            </div>
        </>
    )
}