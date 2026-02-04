import mongoose from  'mongoose'

export const connectDB = async()=>
{
    try{
         
        await mongoose.connect(process.env.mongourl).then((res)=>{
            console.log("suceess");
        }).catch(err=>console.log(err));
        console.log("connection succees with mogodb");
    }
    catch{
    
        console.log("There is some error in the connection ");
    }
}