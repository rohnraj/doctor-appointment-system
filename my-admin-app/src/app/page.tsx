'use client'

import React from 'react'
import styles from './page.module.css'
import Navbar from '@/app/components/navbar/Navbar'
import Button from '@/app/components/button/Button'
import { useRouter } from 'next/navigation'
import { toast, Bounce } from 'react-toastify';
import {IsAuthContext} from '@/app/components/useContext/UseContext'
import {API_URL} from "../const.js"


export default function page() {


    //  @ts-ignore
    let {isAuth, setIsAuth}=React.useContext(IsAuthContext)

    let [eyetoggle, seteyetoggle] = React.useState(true);
    let [passwrdType, setpasswrdType] = React.useState('password');

    let [email, setemail]= React.useState('')
    let [password, setpassword]= React.useState('')

    let router=useRouter()

    async function handleLogin(e: React.FormEvent){
            e.preventDefault();
            try{
    
                const res=await (await fetch(`${API_URL}/api/auth/login`,
                    {
                        headers: {
                            'Accept': 'application/json',
                          'Content-Type': 'application/json',
                        
                        //   'authorization':`Bearer ${localStorage.getItem('token')}` 
                        },
                        method: "POST",
                        body: JSON.stringify({email, password}),
                        credentials: "include",
                    })).json()
                console.log(res)

                if(res.success){
                    // doubt why ye chal gya with res.success not with tokenData?.Data
                    alert(`${res.message}`)

                    toast.success('🦄 logedIn Successfully!', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: false,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        transition: Bounce,
                        });
                    // localStorage.setItem('token', res.token); 
                    // localStorage.setItem('user', JSON.stringify(res.user));
                    setIsAuth(true);
                    router.push('/home')
                } 
                else{
                    alert('Failed To Resgistered') 
                    toast.warn('🦄 Check your email & password', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: false,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        transition: Bounce,
                        }); 
                    } 
                }
            catch(err){
                console.log(err);
            }

        }
    return (
        <>
        
            <Navbar/>
            <div className={styles.pageContainer}>
                <div className={styles.formContainer}>
                    <div className={styles.loginHeading}>Login</div><br/>
                    <div className={styles.para}>Are you Admin ?</div>

                    <form action="#" className={styles.form} onSubmit={handleLogin}>

                        <div className={`${styles.emailContainer} ${styles.inputContainer}`}>
                            {/* <i className="fa-solid fa-at" ></i> */}
                            <img src='/assets/AtIcon.svg' alt='eyeIcon' id={styles.iconAt}/>
                            <label htmlFor="email">Email</label>
                            <input type='text' id='email'  className={styles.emailInp} onChange={(e)=>setemail(e.target.value)}/><br/><br/>
                        </div>

                        <div className={`${styles.passwrdContainer} ${styles.inputContainer}`}>
                            {/* <i className="fa-solid fa-lock" ></i> */}
                            <img src='/assets/Lock.svg' alt='eyeIcon' id={styles.iconLock}/>
                            <span onClick={()=>{
                                seteyetoggle(!eyetoggle);
                                setpasswrdType(passwrdType==='password' ? 'text' : 'password');
                            }}>
                                {eyetoggle===true ? <i className="fa-solid fa-eye" id={styles.iconeye}></i> : <i className="fa-solid fa-eye-slash" id={styles.iconeye}></i>}
                            </span>

                            <label htmlFor="passwrd">Password</label>
                            <input type={passwrdType==='password'? 'password' : 'text'} id='passwrd' onChange={(e)=>setpassword(e.target.value)}/><br/><br/>
                        </div>

                        <div className={styles.btnContainer}>
                            <Button text={'Login'} onClick={()=>{}} type={'submit'} variant={'largeGreenBtn'}/>
                            <Button text={'Reset'} onClick={()=>{}} type={'reset'} variant={'largeBrownBtn'}/>
                        </div>

                        <div className={styles.forgotPara}><strong>Forgot Password ?</strong></div>
                    </form>
                </div>
            </div>
        </>
    )
}