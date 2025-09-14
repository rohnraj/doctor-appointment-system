'use client'

import React , {useState, useEffect} from "react";
import styles from "./Navbar.module.css";
import Button from "@/app/components/button/Button";
import Link from "next/link";
import { link } from "fs";
import { useRouter } from "next/navigation";
import {API_URL} from "../../../const.js"

// interface User {
//     email: string;
//     google_id: string | null;
//     id: string;
//     name: string;
//     password: string;
//     phone: string;
//     role: string;
//   }
  
//   interface SignupResponse {
//     message: string;
//     success: boolean;
//     token: string;
//     user: User;
//   }

// interface NavbarProps {
//     tokenObj?: SignupResponse | null;
// }

export default function Navbar() {

    const [menuOpen, setMenuOpen] = useState(false);
    const [isAuth, setUserAuth] = useState(false);
    const router = useRouter();

    useEffect(()=>{
        async function fetching(){
            const res = await (await fetch(`${API_URL}/api/auth/isAuth`, {
                method: "POST",
                credentials: "include",
            })).json()
            console.log(res);
            if(res.success){
                setUserAuth(true);
            }
        }fetching()
    },[])

    function handleRoute(route:string){
        if(isAuth){
            router.push(route);
        }else{
            router.push("/");
        }
    }

    const handleLogout = async() => {
        
        const res = await (await fetch(`${API_URL}/api/auth/logout`, {
            method: "POST",
            credentials: "include",
        })).json();

        if(res.success) router.push("/"); 
    };

  return (
    <>
    <nav className={styles.navbar}>
        <ul className={styles.ultag}>
            <li className={styles.logo} onClick={()=>router.push('/home')}>
                <div className={styles.logofst}><img src='/assets/Trust.png' alt='logo here' className={styles.logoImg} /></div>
                <div className={styles.logoscd}>MedCare</div>
            </li>
            <li className={styles.navLinkContainer}>
                <i className="fa-solid fa-bars" id={styles.bars} onClick={()=>{
                    setMenuOpen(!menuOpen);
                }}></i>
                <ul className={`${styles.navLinks} ${styles.sidebarMenu} ${menuOpen ? styles.showMenu : ""}`}>
                    <li id={styles.cros} onClick={()=>{
                        setMenuOpen(!menuOpen);
                    }}><i className="fa-solid fa-xmark"></i></li>
                    <li onClick={()=>handleRoute('/home')}>Home</li>
                    {/* <li onClick={()=>handleRoute('/healthblog')}>Health Blog</li>  --do this when Health blog page is ready, same for Reviews*/}
                    <li onClick={()=>handleRoute('/add-doctor')}>Add Doctor</li>
                    <li onClick={()=>handleRoute('/remove-doctor')}>Remove Doctor</li>
                    <li className={styles.libtn}>
                    {isAuth ? (
                        <span>
                            <Button text={"Logout"} onClick={handleLogout} type={"submit"} variant={"smallGreenBtn"} />
                        </span>
                    ) : (
                        <>
                            <span>
                                <Button text={"Login"} onClick={() => router.push("/")} type={"submit"} variant={"tinyWhiteBtn"} />
                            </span>
                        </>
                    )}
                </li>
                </ul>
            </li>
        </ul>
        <ul className={styles.authButtons}>
                {isAuth ? ( 
                    <li>
                        <Button text={"Logout"} onClick={handleLogout} type={"submit"} variant={"smallGreenBtn"} />
                    </li>
                ) : (
                    <>
                        <li>
                            <Button text={"Login"} onClick={() => router.push("/")} type={"submit"} variant={"smallWhiteBtn"} />
                        </li>
                    </>
                )}
            </ul>

    </nav>
    </>
  );
}


