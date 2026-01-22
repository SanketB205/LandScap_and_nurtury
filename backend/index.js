import express from "express";
const app = express();
import dotenv from "dotenv/config";
import cors from "cors";
 
app.use(express.json());
app.use(cors());

app.use('/ping',()=>{console.log("pong")});

app.listen(8080,()=>{
    console.log("server started on port :");
});

