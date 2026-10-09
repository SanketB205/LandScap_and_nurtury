import mongoose from "mongoose";

const testimonialSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "Client in Pune",
    },
    location: {
      type: String,
      default: "Pune",
    },
    content: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      default: 5,
    },
    avatar: {
      type: String,
      default: "",
    },
    isFeatured: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Testimonial", testimonialSchema);
