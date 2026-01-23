import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./Models/Database.js";
import serviceRoutes from "./routes/service.routes.js";
import authRoutes from "./routes/auth.routes.js"


dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/services", serviceRoutes);
app.use("/api/auth", authRoutes);

app.listen(process.env.PORT, () =>
  console.log("Server running on port 5000")
);
