import UserModel from "../Models/user.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


export const signup = async (req,res)=>{

    try{
        const {name,email,password} = req.body;
        console.log(req.body);
        const user = await UserModel.findOne({email});

        if(user)
        {
            return res.status(409)
            .json({message:'User already exists, you can login',success : false});
        }

        const userModel = new UserModel({name,email,password});
        userModel.password = await bcrypt.hash(password,10);
        await userModel.save();

        res.status(201)
            .json({
                message:"Signup Successfully",
                success : true
            })
    }
    catch(err){
        console.error('Signup error:', err);
        res.status(500).json({
            message:"Internal server error",
            error: err.message || "Unknown error occurred",
            success:false
        })
    }
}

export const login = async (req,res)=>{

    try{
        const {email,password} = req.body;
        
        // Validate JWT_SECRET is set
        if (!process.env.JWT_SECRET) {
            console.error('JWT_SECRET is not set in environment variables');
            return res.status(500).json({
                message:"Server configuration error",
                error: "JWT_SECRET not configured",
                success:false
            });
        }
        
        const user = await UserModel.findOne({email});
        const errorMsg = 'Auth failed email or password is wrong';

        if(!user)
        {
            return res.status(403)
            .json({message:errorMsg,success : false});
        }

        const isPassEqual = await bcrypt.compare(password,user.password);

        if(!isPassEqual)
        {
            return res.status(403)
            .json({message:errorMsg,success : false});
        }

        const jwtToken  = jwt.sign({email:user.email, _id:user._id},process.env.JWT_SECRET,{expiresIn : '24h'})
        
        res.status(200)
            .json({
                message:"Login Success",
                success : true,
                jwtToken,
                email: user.email,
                name : user.name,
                role:user.role
            })
    }
    catch(err){
        console.error('Login error:', err);
        res.status(500).json({
            message:"Internal server error",
            error: err.message || "Unknown error occurred",
            success:false
        })

    }

}
