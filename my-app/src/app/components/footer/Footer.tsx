import React from 'react'
import styles from './Footer.module.css'

export default function Footer(){
    return (
        <>
            <footer className={styles.footer}>
                <div className={styles.footercontent}>
                    <p>© EmScripts 2024. All Right Reserved.</p>
                    <div className={styles.footericons}>
                        <img src='/assets/phone.svg' alt='phoneIcon'/>
                        <img src='/assets/WhatsApp.svg' alt='WhatsAppIcon'/>
                    </div>
                </div>
            </footer>

        </>
    )
}