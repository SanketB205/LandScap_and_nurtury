import mongoose from "mongoose";

const plantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Plant name is required"],
      trim: true,
    },
    botanicalName: {
      type: String,
      trim: true,
      default: "",
    },
    category: {
      type: String,
      enum: ["indoor", "outdoor", "flowering", "ornamental", "trees", "shrubs", "supplies", "lawn-grass"],
      required: true,
      default: "outdoor",
    },
    description: {
      type: String,
      required: true,
    },
    careInstructions: {
      type: String,
      default: "Water when top soil feels dry. Ensure adequate natural sunlight.",
    },
    sunlight: {
      type: String,
      enum: ["Full Sun", "Partial Shade", "Low Light", "Indirect Bright"],
      default: "Full Sun",
    },
    watering: {
      type: String,
      enum: ["Low", "Moderate", "High"],
      default: "Moderate",
    },
    space: {
      type: String,
      enum: ["Small", "Medium", "Large"],
      default: "Medium",
    },
    isIndoor: {
      type: Boolean,
      default: false,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    stockQuantity: {
      type: Number,
      default: 25,
    },
    inStock: {
      type: Boolean,
      default: true,
    },
    images: {
      type: [String],
      default: ["https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=800&q=80"],
    },
    status: {
      type: String,
      enum: ["active", "draft"],
      default: "active",
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

plantSchema.index({ name: "text", botanicalName: "text", description: "text" });

export default mongoose.model("Plant", plantSchema);
