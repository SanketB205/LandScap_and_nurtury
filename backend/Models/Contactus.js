import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    phoneno: {
      type: Number,
      required: true,
      unique: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    service: String,

    message: String,
  },
  { timestamps: true }
);

export default mongoose.model("Contactus", contactSchema);
