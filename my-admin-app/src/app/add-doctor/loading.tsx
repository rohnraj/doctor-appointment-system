"use client";

import { Circles } from "react-loader-spinner";

export default function Loading() {
  return (
    <div style={{ 
      display: "flex", 
      justifyContent: "center", 
      alignItems: "center", 
      height: "100vh" 
    }}>
      <Circles height="60" width="60" color="#1C4A2A" ariaLabel="loading" />
    </div>
  );
}
