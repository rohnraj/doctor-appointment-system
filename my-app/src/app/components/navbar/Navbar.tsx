'use client'

import React , {useState} from "react";
import styles from "./Navbar.module.css";
import Button from "../button/Button";
import Link from "next/link";
import { link } from "fs";
import { useRouter } from "next/navigation";

export default function Navbar() {

    const [menuOpen, setMenuOpen] = useState(false);
    const router = useRouter();
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
                    <li onClick={()=>router.push('/Appointments')}>Appointments</li>
                    <li>Health Blog</li>
                    <li>Reviews</li>
                    <li className={styles.libtn}>
                        <span><Button text={'Login'} onClick={()=>router.push('/login')} type={'submit'} variant={'tinyWhiteBtn'}/></span>
                        <span><Button text={'Register'} onClick={()=>router.push('/signup')} type={'submit'} variant={'tinyGreenBtn'}/></span>
                    </li>
                </ul>
            </li>
        </ul>
        <ul className={styles.authButtons}>
            <li><Button text={'Login'} onClick={()=>router.push('/login')} type={'submit'} variant={'smallWhiteBtn'}/></li>
            <li><Button text={'Register'} onClick={()=>router.push('/signup')} type={'submit'} variant={'smallGreenBtn'}/></li>
        </ul>
    </nav>
    </>
  );
}
