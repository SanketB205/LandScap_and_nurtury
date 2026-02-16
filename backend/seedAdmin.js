import mongoose from "mongoose";
import UserModel from "./Models/user.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

const createAdminUser = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.mongourl);
    console.log("✅ Connected to MongoDB");

    // Check if admin already exists
    const existingAdmin = await UserModel.findOne({ email: "admin@greenland.com" });
    if (existingAdmin) {
      console.log("❌ Admin user already exists!");
      process.exit(0);
    }

    // Create admin user with hashed password
    const hashedPassword = await bcrypt.hash("admin@123", 10);
    
    const adminUser = new UserModel({
      name: "Admin",
      email: "admin@greenland.com",
      password: hashedPassword,
      role: "admin"
    });

    await adminUser.save();
    console.log("✅ Admin user created successfully!");
    console.log("📧 Email: admin@greenland.com");
    console.log("🔐 Password: admin@123");
    console.log("\n⚠️  IMPORTANT: Change this password after first login!");

    process.exit(0);
  } catch (err) {
    console.error("❌ Error creating admin user:", err.message);
    process.exit(1);
  }
};

createAdminUser();
