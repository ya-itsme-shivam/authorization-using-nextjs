import {getdatafromtoken} from "@/helpers/getdatafromtoken"
import { NextRequest,NextResponse } from "next/server"
import User from "@/models/usermodel"
import { connect } from "@/dbconfig/dbconfig"

connect()

export async function GET(request:NextRequest){
try {
    const userid=await getdatafromtoken(request)
    const user= await User.findOne({_id:userid}).
    select("-password")

    return NextResponse.json({message:"user found", data:user})
} catch (error:any) {
    return NextResponse.json({error:error.message},{status:400})
}
}