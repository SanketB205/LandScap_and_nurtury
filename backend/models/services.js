import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
    },

    shortDescription: String,

    bannerImage: String,

    intro: String,

    features: [String],

    advantages: [String],

    suggestions: [
      {
        title: String,
        description: String,
      },
    ],

    gallery: [String],

    status: {
      type: String,
      default: "active",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Service", serviceSchema);
