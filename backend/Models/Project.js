import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Project title is required"],
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
    location: {
      type: String,
      required: [true, "Location is required"],
      default: "Pune, Maharashtra",
      trim: true,
    },
    category: {
      type: String,
      enum: ["Residential", "Commercial", "Sports Turf", "Terrace Garden", "Farmhouse"],
      required: true,
      default: "Residential",
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    clientName: {
      type: String,
      default: "Private Client",
      trim: true,
    },
    area: {
      type: String,
      default: "",
      trim: true,
    },
    beforeImage: {
      type: String,
      default: "",
    },
    afterImage: {
      type: String,
      default: "https://images.unsplash.com/photo-1558904541-efa8c4a08931?auto=format&fit=crop&w=1200&q=80",
    },
    gallery: {
      type: [String],
      default: [],
    },
    completionDate: {
      type: Date,
      default: Date.now,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ["published", "draft", "archived"],
      default: "published",
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

projectSchema.index({ category: 1, status: 1 });
projectSchema.index({ isFeatured: 1, status: 1 });

export default mongoose.model("Project", projectSchema);
