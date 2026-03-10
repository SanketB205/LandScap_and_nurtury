import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./Models/Database.js";
import serviceRoutes from "./routes/service.routes.js";
import authRoutes from "./routes/auth.routes.js";
import contactusRoutes from "./routes/contactus.routes.js";
import blogRoutes from "./routes/blogRoutes.js";
import userRoutes from "./routes/user.routes.js";


dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/services", serviceRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/contactus", contactusRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/users", userRoutes);

app.listen(process.env.PORT || 5000, () =>
  console.log(`Server running on port ${process.env.PORT || 5000}`)
);
