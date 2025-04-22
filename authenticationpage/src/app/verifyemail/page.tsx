"use client"
import axios from "axios"
import Link from "next/link"
import React,{useState,useEffect} from "react"

export default function verifyemailpage(){
const[token,settoken]=useState("")
const[verified,setverified]=useState(false)
const[error,seterror]=useState(false)

const verifyuseremail=async ()=>{
try {
   await axios.post("/api/users/verifymail",{token})
   setverified(true)
} catch (error:any) {
    seterror(true)
    console.log(error.response.date);
    
}
}


useEffect(()=>{
    const urltoken=window.location.search.split("=")[1]
    settoken(urltoken || "")
},[])

useEffect(()=>{
    if(token.length>0){
        verifyuseremail()
    }
},[token])

return (
  <div className="flex flex-col items-center justify-center min-h-screen py-2">
    <h1 className="text-4xl">Verify Email</h1>
    <h2 className="p-2 bg-orange-500 text-black">
      {token ? `${token}` : "no token"}
    </h2>
    {verified && (
      <div>
        <h2 className="text-2xl">Email Verified</h2>
        <Link href="/login">Login</Link>
      </div>
    )}
    {error && (
      <div>
        <h2 className="text-2xl bg-red-500 text-black">Error</h2>
      </div>
    )}
  </div>
);
}


