import mongoose from  'mongoose'

export const connectDB = async()=>
{
    try{
         
        await mongoose.connect(process.env.mongourl);
        console.log("connection succees with mogodb");
    }
    catch{
         
        console.log("There is some error in the connection ");
    }
}