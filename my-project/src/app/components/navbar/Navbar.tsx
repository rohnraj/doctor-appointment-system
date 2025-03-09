'use client'

import React , {useState} from "react";
import styles from "./Navbar.module.css";
import Button from "../button/Button";

export default function Navbar() {

    const [menuOpen, setMenuOpen] = useState(false);
  return (
    <>
    <nav className={styles.navbar}>
        <ul className={styles.ultag}>
            <li className={styles.logo}>
                <div className={styles.logofst}><img src='/assets/Trust.png' alt='logo here' className={styles.logoImg} /></div>
                <div className={styles.logoscd}>MedCare</div>
            </li>
            <li className={styles.navLinkContainer}>
                <i className="fa-solid fa-bars" id={styles.bars} onClick={()=>{
                    setMenuOpen(!menuOpen);
                }}></i>
                <ul className={`${styles.navLinks} ${menuOpen ? styles.showMenu : ""}`}>
                    <li>Home</li>
                    <li>Appointments</li>
                    <li>Health Blog</li>
                    <li>Reviews</li>
                </ul>
            </li>
        </ul>
        <ul className={styles.authButtons}>
            <li><Button text={'Login'} onClick={()=>{}} type={'submit'} variant={'smallWhiteBtn'}/></li>
            <li><Button text={'Register'} onClick={()=>{}} type={'submit'} variant={'smallGreenBtn'}/></li>
        </ul>
    </nav>
    </>
  );
}
