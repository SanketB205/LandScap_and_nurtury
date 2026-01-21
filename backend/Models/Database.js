import mongoose from  'mongoose'

export const connectDB = async()=>
{
    try{
         
        await mongoose.connect(process.env.mongourl);
        console.log("connection sucees with mogodb");
    }
    catch{
         
        console.log("There is some error in the connection ");
    }
}