import nodemailer from "nodemailer"
import User from "@/models/usermodel"
import bcrypt from "bcryptjs"
//mailtrap is used here
export const sendemail= async ({email,emailtype, userid}:any)=>{    //email type is forgot passwprd emmail verify emIL
try {
   const hashedtokken=await bcrypt.hash(userid.toString(),10)

 if(emailtype==="VERIFY"){
      await userid.findByIdAndUpdate(userid, {
     verifytoken: hashedtokken,verifytokenexpiry:Date.now()+3600000});
 } 
 
 else if(emailtype==="RESET"){
      await userid.findByIdAndUpdate(userid, {
     forgotpasswordtokken: hashedtokken,forgotpasswordtokkenexpiry:Date.now()+3600000,{new:true});
 }

// Looking to send emails in production? Check out our Email API/SMTP product!
var transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "7eddc67a9f2599",
    pass: "d9e29d9f839fac"
  }
});


const mailoptions={
    from:"cshin0420@gmail.com",
    to:email,
    subject:emailtype==='VERIFY'?"Verify your Email":"Reset ypur password",
    html:`<p>Click <a href="${process.env.domain}/verifyemail?token=${hashedtokken}"> here</a>to ${emailtype==="VERIFY"?"Verify your Email":"Reset ypur password"}</p>`
}

const mailrepsonse= await transport.sendMail(mailoptions)
return(mailrepsonse)

} catch (error:any) {
    throw new Error(error.message)
}
}