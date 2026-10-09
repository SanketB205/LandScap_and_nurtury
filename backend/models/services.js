import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Service title is required"],
      trim: true,
    },
    slug: {
      type: String,
      required: [true, "Slug is required"],
      unique: true,
      trim: true,
      lowercase: true,
    },
    category: {
      type: String,
      default: "Landscaping",
    },
    shortDescription: {
      type: String,
      required: true,
    },
    bannerImage: {
      type: String,
      default: "https://images.unsplash.com/photo-1558904541-efa8c4a08931?auto=format&fit=crop&w=1200&q=80",
    },
    intro: {
      type: String,
      default: "",
    },
    features: {
      type: [String],
      default: [],
    },
    advantages: {
      type: [String],
      default: [],
    },
    startingPrice: {
      type: Number,
      default: 0,
    },
    priceUnit: {
      type: String,
      default: "per sq ft",
    },
    faqs: [
      {
        question: { type: String, required: true },
        answer: { type: String, required: true },
      },
    ],
    gallery: {
      type: [String],
      default: [],
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ["active", "draft"],
      default: "active",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Service", serviceSchema);
