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
    },
    location: {
      type: String,
      required: [true, "Location is required"],
      default: "Pune, Maharashtra",
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
    },
    clientName: {
      type: String,
      default: "Private Client",
    },
    area: {
      type: String,
      default: "",
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
      enum: ["published", "draft"],
      default: "published",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Project", projectSchema);
