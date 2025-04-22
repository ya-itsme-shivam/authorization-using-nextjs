
import { connect } from "@/dbconfig/dbconfig";
import User from "@/models/usermodel.js";
import bcryptjs from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

connect()
export async function POST(request:NextRequest){
    try {
      const reqbody = await request.json();
      const { email, password } = reqbody;
      console.log(reqbody);

      //check if user exists
      const user = await User.findOne({ email });

      if (!user) {
        return NextResponse.json(
          { error: "user doesnt exist" },
          { status: 400 }
        );
      }

      //check if password is corrext
      const validPassword = await bcryptjs.compare(password, user.password);
      if (!validPassword) {
        return NextResponse.json(
          { error: "Invalid password" },
          { status: 400 }
        );
      }
      console.log(user);
      //create token data
      const tokendata = { id: user._id, username:user.username, email: user.email }; // Define token data
      
      const token = await jwt.sign(tokendata, process.env.TOKEN_SECRET!, { expiresIn: "1d"});

      const response = NextResponse.json({
        message: "Login successful",
        success: true,
      });
      response.cookies.set("token", token, {
        httpOnly: true,
      });
      return response;
    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:500})
    }
}