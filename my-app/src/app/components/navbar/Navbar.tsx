'use client'

import React , {useState, useEffect} from "react";
import styles from "./Navbar.module.css";
import Button from "../button/Button";
import Link from "next/link";
import { link } from "fs";
import { useRouter } from "next/navigation";

export default function Navbar() {

    const [menuOpen, setMenuOpen] = useState(false);
    const [isAuth, setUserAuth] = useState(false);
    const router = useRouter();

    useEffect(()=>{
        async function fetching(){
            const res = await (await fetch('http://localhost:8080/api/auth/isAuth', {
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
            router.push("/login");
        }
    }

    const handleLogout = async() => {
        
        const res = await (await fetch('http://localhost:8080/api/auth/logout', {
            method: "POST",
            credentials: "include",
        })).json();

        if(res.success) router.push("/login"); 
    };

  return (
    <>
    <nav className={styles.navbar}>
        <ul className={styles.ultag}>
            <li className={styles.logo} onClick={()=>router.push('/')}>
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
                    <li onClick={()=>router.push('/')}>Home</li>
                    <li onClick={()=>handleRoute('/Appointments')}>Appointments</li>
                    <li>Health Blog</li>
                    <li>Reviews</li>
                    <li className={styles.libtn}>
                    {isAuth ? (
                        <span>
                            <Button text={"Logout"} onClick={handleLogout} type={"submit"} variant={"smallGreenBtn"} />
                        </span>
                    ) : (
                        <>
                            <span>
                                <Button text={"Login"} onClick={() => router.push("/login")} type={"submit"} variant={"tinyWhiteBtn"} />
                            </span>
                            <span>
                                <Button text={"Register"} onClick={() => router.push("/signup")} type={"submit"} variant={"tinyGreenBtn"} />
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
                            <Button text={"Login"} onClick={() => router.push("/login")} type={"submit"} variant={"smallWhiteBtn"} />
                        </li>
                        <li>
                            <Button text={"Register"} onClick={() => router.push("/signup")} type={"submit"} variant={"smallGreenBtn"} />
                        </li>
                    </>
                )}
            </ul>

    </nav>
    </>
  );
}


