
import {connect} from "@/dbconfig/dbconfig"
import { sendemail } from "@/helpers/mailer"
import User from "@/models/usermodel.js"
import bcryptjs from "bcryptjs"
import { NextRequest, NextResponse } from "next/server"




connect()
export async function POST(request:NextRequest){
    try {
       const reqbody= await request.json()
const {username , email, password}=reqbody

console.log(reqbody);

//check if user already exists

const user=await User.findOne({email})

if(user){
    return NextResponse.json({error:"user already exists"},{status:400})
}

//hash password
const salt= await bcryptjs.genSalt(10)
const hashedpassword=await bcryptjs.hash(password,salt)

const newuser=new User({
    username,
    email,
    password:hashedpassword
})


const saveduser= await newuser.save()
console.log(saveduser);





return NextResponse.json({message:"User created successfully" ,  success:true, saveduser})
await sendemail({email,emailtype:"verify",userid:saveduser._id})

    } catch (error:any) {
        console.log("error in signup :",error.message);
        
        return NextResponse.json({error:error.message},{ status:500})
    }
}