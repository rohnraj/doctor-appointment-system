'use client'

import React , {useContext} from 'react'
import styles from './page.module.css'
import Navbar from '@/app/components/navbar/Navbar'
import Button from '@/app/components/button/Button'
import { useRouter } from 'next/navigation'
import { ToastContainer, toast, Bounce } from 'react-toastify';
import {IsAuthContext} from '@/app/components/useContext/ContextProvider'

export default function page() {

    //@ts-ignore
    const { isAuth, setIsAuth} = useContext(IsAuthContext);
    let [eyetoggle, seteyetoggle] = React.useState(true);
    let [passwrdType, setpasswrdType] = React.useState('password');

    let [email, setemail]= React.useState('')
    let [password, setpassword]= React.useState('')

    let router=useRouter()

    async function handleLogin(e: React.FormEvent){
            e.preventDefault();
            try{
    
                const res=await (await fetch('http://localhost:8080/api/auth/login',
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
                    router.push('/Appointments')
                } 
                else {

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

        async function handleGoogleLogIn(){
            try{
                //fetch will not work bcz route redirect to 3rd party webpage
                // const res=await (await fetch('http://localhost:8080/api/auth/google', {
                //     headers: {
                //         'Accept': 'application/json',
                //       'Content-Type': 'application/json',
                    
                //     //   'authorization':`Bearer ${localStorage.getItem('token')}` 
                //     },
                //     method: "GET",
                //     credentials: "include",
                // })).json()

                window.location.href='http://localhost:8080/api/auth/google';
            }catch(err){
                console.log(`Error in hittion route google: ${err}`)
            }
        }
    return (
        <>
        
            <Navbar/>
            <div className={styles.pageContainer}>
                <div className={styles.formContainer}>
                    <div className={styles.loginHeading}>Login</div><br/>
                    <div className={styles.para}>Are you a new member? <strong id={styles.strongSignUp} onClick={()=>router.push('/signup')}>Sign up here.</strong></div>

                    <form action="#" className={styles.form} onSubmit={handleLogin}>

                        <div className={`${styles.emailContainer} ${styles.inputContainer}`}>
                            {/* <i className="fa-solid fa-at" ></i> */}
                            <img src='/assets/AtIcon.svg' alt='eyeIcon' id={styles.iconAt}/>
                            <label htmlFor="email">Email</label>
                            <input type='text' id='email'  className={styles.emailInp} onChange={(e)=>setemail(e.target.value)}/><br/><br/>
                        </div>

                        <div className={`${styles.passwrdContainer} ${styles.inputContainer}`}>
                            <img src='/assets/Lock.svg' alt='lock icon' className={styles.iconLock}/>
                            <label htmlFor="passwrd">Password</label>
                            <input 
                                type={passwrdType} 
                                id='passwrd' 
                                onChange={(e)=>setpassword(e.target.value)}
                                className={styles.passwordInput}
                            />
                            <div 
                                className={styles.eye} 
                                onClick={() => {
                                    seteyetoggle(!eyetoggle);
                                    setpasswrdType(eyetoggle ? 'text' : 'password');
                                }}
                            >
                                {eyetoggle ? 
                                    <i className="fa-solid fa-eye" id={styles.iconeye}></i> : 
                                    <i className="fa-solid fa-eye-slash" id={styles.iconeye}></i>
                                }
                            </div>
                        </div>

                        <div className={styles.btnContainer}>
                            <Button text={'Login'} type={'submit'} variant={'largeGreenBtn'}/>
                            <Button text={'Reset'} type={'reset'} variant={'largeBrownBtn'}/>
                            <Button text={'Sign in with Google'} onClick={()=>{handleGoogleLogIn()}}  type={'button'} variant={'googleBtn'} icon={'/assets/google.svg'}/>
                                {/* <i className="fa-brands fa-google"></i> */}
                        </div>

                        <p className={styles.forgotPara} onClick={() => router.push('/forgot-password')}>
                            Forgot Password?
                        </p>
                    </form>
                </div>
            </div>
        </>
    )
}