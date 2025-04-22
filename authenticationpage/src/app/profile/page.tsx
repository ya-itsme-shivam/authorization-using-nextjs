"use client";
import axios from "axios";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";


export default function ProfilePage() {
  const router= useRouter()
  const [data,setdata]=useState("nothing")
    const logout = async () => {
   
    try {
      axios.get("/api/users/logout");
      toast.success("logout successful");
       router.push("/login");
    } 
    catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const getuserdetails= async ()=>{
    const res= await axios.get('/api/users/me')
   console.log(res.data);
   setdata(res.data.data._id)
    
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Profile</h1>
      <hr />
      <p>Profile page</p>
      <hr />
      <h2 className="p-3 rounded-lg bg-purple-400">
        {data === "nothing" ? (
          "nothing"
        ) : (
          <Link href={`/profile/${data}`}>{data}</Link>
        )}
      </h2>
      <button
        onClick={logout}
        className="bg-blue mt-4 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
      >Logout</button>
      <button
        onClick={getuserdetails}
        className="bg-yellow-400 mt-4 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
      >Get User Details</button>
    </div>
  );
}
