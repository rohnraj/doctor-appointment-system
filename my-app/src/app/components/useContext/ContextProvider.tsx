
'use client'
import { createContext, useState, useEffect } from "react";

// @ts-ignore
export const IsAuthContext=createContext()

// @ts-ignore
export default function IsAuthProvider({children}){

    const [isAuth, setUserAuth] = useState(false);
    
    //     useEffect(()=>{
    //         async function fetching(){
    //             const res = await (await fetch('http://localhost:8080/api/auth/isAuth', {
    //                 method: "POST",
    //                 credentials: "include",
    //             })).json()
    //             console.log(res);
    //             if(res.success){
    //                 setUserAuth(true);
    //             }
    //         }fetching()
    //     },[])



    return(
        <IsAuthContext.Provider value={isAuth}>
            {children}
        </IsAuthContext.Provider>
    )
}

