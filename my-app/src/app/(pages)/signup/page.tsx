
'use client'

import React from 'react'
import styles from './page.module.css'
import Navbar from '@/app/components/navbar/Navbar'
import Button from '@/app/components/button/Button'
import { useRouter } from 'next/navigation'
import { ToastContainer, toast, Bounce } from 'react-toastify';

interface User {
    email: string;
    google_id: string | null;
    id: string;
    name: string;
    password: string;
    phone: string;
    role: string;
  }
  
  interface SignupResponse {
    message: string;
    success: boolean;
    token: string;
    user: User;
  }



export default function page() {

    let [eyetoggle, seteyetoggle] = React.useState(true);
    let [passwrdType, setpasswrdType] = React.useState('password');

    let [role, setrole]= React.useState('')
    let [name, setname]= React.useState('')
    let [email, setemail]= React.useState('')
    let [phone, setphone]= React.useState<number | null>(null)
    let [password, setpassword]= React.useState('')

    async function handleSingup(e: React.FormEvent){
        e.preventDefault();
        try{

            const res:SignupResponse=await (await fetch('http://localhost:8080/api/auth/signup',
                {
                    headers: {
                        'Accept': 'application/json',
                      'Content-Type': 'application/json',
                    //   'authorization':`Bearer ${localStorage.getItem('token')}` 
                    },
                    method: "POST",
                    body: JSON.stringify({role, name, email, password, phone})
                })).json()
            console.log(res)
            // setTokenData(res);
            
            if(res.success){
                // doubt why ye chal gya with res.success not with tokenData?.Data
                alert('user Resgistered')

                toast.success('🦄 User Resgistered Successfully!', {
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
                router.push('/login')
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


    let router=useRouter()


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
                    <div className={styles.loginHeading}>Sign Up</div><br/>
                    <div className={styles.para}>Already a member? <strong onClick={()=> router.push('/login')}>Login.</strong></div>

                    <form action="#" className={styles.form} onSubmit={handleSingup}>

                        <div className={`${styles.RoleContainer} ${styles.inputContainer}`}>
                            <i className="fa-solid fa-user"></i>
                            <label htmlFor="Role">Role</label>
                            <input type="text" id='Role'  className={styles.RoleInp} placeholder='Select Role' onChange={(e:any)=>setrole(e.target.value)}/><br/><br/>
                        </div>

                        <div className={`${styles.NameContainer}  ${styles.inputContainer}`}>
                            <i className="fa-solid fa-id-card"></i>
                            <label htmlFor="Name">Name</label>
                            <input type="text" id='Name' placeholder='Enter your name' onChange={(e)=>setname(e.target.value)}/><br/><br/>
                        </div>

                        <div className={`${styles.phoneContainer}  ${styles.inputContainer}`}>
                            <i className="fa-solid fa-phone"></i>
                            <label htmlFor="phone">phone</label>
                            <input type="text" id='phone' placeholder='Enter your number' onChange={(e)=>setphone(Number(e.target.value))}/><br/><br/>
                        </div>

                        <div className={`${styles.emailContainer} ${styles.inputContainer}`}>
                            <i className="fa-solid fa-at" id={styles.iconAt}></i>
                            <label htmlFor="email">Email</label>
                            <input type='text' id='email'  className={styles.emailInp} placeholder='Enter your email address' onChange={(e)=>setemail(e.target.value)}/><br/><br/>
                        </div>

                        <div className={`${styles.passwrdContainer} ${styles.inputContainer}`}>
                            <i className="fa-solid fa-lock"></i>
                            <span onClick={()=>{
                                seteyetoggle(!eyetoggle);
                                setpasswrdType(passwrdType==='password' ? 'text' : 'password');
                            }}>{eyetoggle===true ? <i className="fa-solid fa-eye" id={styles.iconeye}></i> : <i className="fa-solid fa-eye-slash" id={styles.iconeye}></i>}</span>
                            <label htmlFor="passwrd">Password</label>
                            <input type={passwrdType==='password'? 'password' : 'text'} id='passwrd' onChange={(e)=>setpassword(e.target.value)}/><br/><br/>
                        </div>

                        <div className={styles.btnContainer}>
                            <Button text={'Sign Up'} type={'submit'} variant={'largeGreenBtn'}/>
                            <Button text={'Reset'} onClick={()=>{}} type={'submit'} variant={'largeBrownBtn'}/>
                            <Button text={'Sign in with Google'} onClick={()=>{handleGoogleLogIn()}}  type={'button'} variant={'googleBtn'} icon={'/assets/google.svg'}/>
                        </div>

                    </form>
                </div>
            </div>
        </>
    )
}