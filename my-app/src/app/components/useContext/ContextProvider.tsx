"use client";
import { createContext, useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";

export const IsAuthContext = createContext({});

export default function IsAuthProvider({ children }: { children: ReactNode }) {


  const [isAuth, setIsAuth] = useState(false);
  const router = useRouter();
  
  useEffect(() => {
    try{

      async function fetching(){
        const response = await (await fetch('http://localhost:8080/api/auth/isAuth', {
          method: 'POST',
          credentials: 'include',
        })).json()
        
        console.log('response')
        console.log(response)
        if(response.success) {
          setIsAuth(true)
          console.log('isAuth: ' + isAuth)
        }
        else setIsAuth(false)
      }fetching()
    }
    catch(err){
      console.log('Issue while fetching isAuth: '+ err)
      setIsAuth(false)
    }
  }, []);

  return (
    <IsAuthContext.Provider value={{isAuth, setIsAuth}}>
      {children}
    </IsAuthContext.Provider>
  );
}