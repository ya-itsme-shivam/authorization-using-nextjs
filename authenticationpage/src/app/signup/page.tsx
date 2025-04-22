"use client";
import Link from "next/link";
import React, { useEffect } from "react"
import {useRouter} from "next/navigation"
import axios from "axios";
import { useState } from "react";
import {toast} from "react-hot-toast";


export default function signupPage(){
    const router= useRouter()
    const [user, setuser] = React.useState({
      email: "",
      password: "",
      username: "",
    });
 const [buttondisabled,setbuttondisabled]=React.useState(false)
 const [loading,setloading]=React.useState(false)
   
 
 const onsignup= async()=>{
try {
    setloading(true)
       const response = await axios.post('/api/users/signup',user)
       console.log("Signup Success", response.data);
       router.push("/login");
   
} catch (error:any) {
    console.log("Signup failed successfully",error.message);
    toast.error(error.message)
}finally{
    setloading(false)  
}
    }



    useEffect(()=>{
        if(user.email.length>5 && user.password.length>0 && user.username.length>0){
setbuttondisabled(false)
        }
        else{
            setbuttondisabled(true)
        }
    },[user])

    return (
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1 className="text-white text-4xl">{loading?"Processing":"Signup"}</h1>
        <hr />
        <label htmlFor="username">username</label>
        <input
          type="text"
          className="rounded-md border-2 border-gray-600 bg-gray-200 text-black px-4 py-2 my-2"
          id="username"
          value={user.username}
          onChange={(e) => setuser({ ...user, username: e.target.value })}
          placeholder="ENTER USERNAME"
        />

        <label htmlFor="email">email</label>
        <input
          type="email"
          className="rounded-md border-2 border-gray-600 bg-gray-200 text-black px-4 py-2 my-2"
          id="email"
          value={user.email}
          onChange={(e) => setuser({ ...user, email: e.target.value })}
          placeholder="ENTER EMAIL"
        />

        <label htmlFor="password">password</label>
        <input
          type="password"
          className="rounded-md border-2 border-gray-600 bg-gray-200 text-black px-4 py-2 my-2"
          id="password"
          value={user.password}
          onChange={(e) => setuser({ ...user, password: e.target.value })}
          placeholder="ENTER PASSWORD"
        />
        <button onClick={onsignup}className="p-2 cursor-pointer border my-2 border-white rounded-lg hover:bg-blue-500">{buttondisabled?"Can't signup":"Signup"}</button>
        <Link href="/login" className="underline hover:text-blue-500">Already have an account? login here</Link>
      </div>
    );
}