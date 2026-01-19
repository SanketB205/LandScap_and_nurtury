import express from "express";
const app = express();
import dotenv from "dotenv/config";
import cors from "cors"

app.use(express.json());
app.use(cors());

app.use('/ping',()=>{console.log("pong")})

app.listen(process.env.Port,()=>{
    console.log("server started on port :",process.env.Port);
});