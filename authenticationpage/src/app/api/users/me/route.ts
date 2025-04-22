import {getdatafromtoken} from "@/helpers/getdatafromtoken"
import { NextRequest,NextResponse } from "next/server"
import User from "@/models/usermodel"
import { connect } from "@/dbconfig/dbconfig"

connect()

export async function GET(request:NextRequest){
try {
    const userid=await getdatafromtoken(request)
    console.log("Userid from token:",userid);
    
    
    const user= await User.findOne({_id:userid}).select("-password")
     if (!user) {
       return NextResponse.json({ message: "User not found" }, { status: 404 });
     }

    return NextResponse.json({message:"user found", data:user})
} catch (error:any) {
  console.error("Error fetching user:", error.message);
    return NextResponse.json({error:error.message},{status:400})
}
}