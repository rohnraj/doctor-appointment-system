
'use client'

import { Circles } from "react-loader-spinner";

export default function loading (){
    return(
        <div>
            <Circles height="60" width="60" color="#1C4A2A" ariaLabel="loading" />
        </div>
    )
}