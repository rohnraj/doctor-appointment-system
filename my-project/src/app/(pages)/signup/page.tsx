
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
                    <div className={styles.loginHeading}>Sign Up</div><br/>
                    <div className={styles.para}>Already a member? <strong>Login.</strong></div>

                    <form action="#" className={styles.form}>

                        <div className={`${styles.RoleContainer} ${styles.inputContainer}`}>
                            <i className="fa-solid fa-user"></i>
                            <label htmlFor="Role">Role</label>
                            <input type="text" id='Role'  className={styles.RoleInp}/><br/><br/>
                        </div>

                        <div className={`${styles.NameContainer}  ${styles.inputContainer}`}>
                            <i className="fa-solid fa-id-card"></i>
                            <label htmlFor="Name">Name</label>
                            <input type="text" id='Name' /><br/><br/>
                        </div>

                        <div className={`${styles.phoneContainer}  ${styles.inputContainer}`}>
                            <i className="fa-solid fa-phone"></i>
                            <label htmlFor="phone">phone</label>
                            <input type="text" id='phone' /><br/><br/>
                        </div>

                        <div className={`${styles.emailContainer} ${styles.inputContainer}`}>
                            <i className="fa-solid fa-at" id={styles.iconAt}></i>
                            <label htmlFor="email">Email</label>
                            <input type='text' id='email'  className={styles.emailInp}/><br/><br/>
                        </div>

                        <div className={`${styles.passwrdContainer} ${styles.inputContainer}`}>
                            <i className="fa-solid fa-lock"></i>
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

                    </form>
                </div>
            </div>
        </>
    )
}