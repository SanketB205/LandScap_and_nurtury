import mongoose from  'mongoose'

export const connectDB = async()=>
{
    try{
         
        await mongoose.connect(process.env.mongourl).then((res)=>{
            console.log("connected to MongoDB");
        }).catch(err=>console.log(err));
        console.log("connection success with mongodb");
    }
    catch{
    
        console.log("There is some error in the connection ");
    }
}