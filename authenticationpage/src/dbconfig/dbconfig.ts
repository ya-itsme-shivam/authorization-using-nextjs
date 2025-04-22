import mongoose from "mongoose";

export async function connect(){
try {
    mongoose.connect(process.env.MONGO_URI!);
    const connection = mongoose.connection;

//every event is listened by the on method
connection.on("connected",()=>{
    console.log("mongodb connected successfully");
    
})

connection.on("error",(err)=>{
console.log("mongodb connection error"+err);
process.exit()
})


} catch (error) {
    console.log("something went wrong");
    console.log(error);
}
}