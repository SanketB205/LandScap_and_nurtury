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
      index: true,
    },
    category: {
      type: String,
      default: "Landscaping",
      trim: true,
    },
    shortDescription: {
      type: String,
      required: true,
      trim: true,
    },
    intro: {
      type: String,
      default: "",
      trim: true,
    },
    bannerImage: {
      type: String,
      default: "https://images.unsplash.com/photo-1558904541-efa8c4a08931?auto=format&fit=crop&w=1200&q=80",
    },
    gallery: {
      type: [String],
      default: [],
    },
    features: {
      type: [String],
      default: [],
    },
    advantages: {
      type: [String],
      default: [],
    },
    faqs: [
      {
        question: { type: String, required: true },
        answer: { type: String, required: true },
      },
    ],
    startingPrice: {
      type: Number,
      default: 0,
      min: [0, "Starting price cannot be negative"],
    },
    priceUnit: {
      type: String,
      default: "per sq ft",
      trim: true,
    },
    // Units: square_feet, square_metres, per_project
    unit: {
      type: String,
      enum: ["square_feet", "square_metres", "per_project"],
      default: "square_feet",
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ["active", "draft", "archived"],
      default: "active",
    },
    // SEO fields
    seoTitle: {
      type: String,
      trim: true,
    },
    seoDescription: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

serviceSchema.index({ category: 1, status: 1 });
serviceSchema.index({ isFeatured: 1, status: 1 });

export default mongoose.model("Service", serviceSchema);
