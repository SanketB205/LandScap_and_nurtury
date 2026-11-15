import mongoose from "mongoose";

const plantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Plant name is required"],
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
      index: true,
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
      trim: true,
    },
    careInstructions: {
      type: String,
      default: "Water when top soil feels dry. Ensure adequate natural sunlight.",
      trim: true,
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
      min: [0, "Price cannot be negative"],
      default: 0,
    },
    stockQuantity: {
      type: Number,
      min: [0, "Stock quantity cannot be negative"],
      default: 0,
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
      enum: ["active", "draft", "archived"],
      default: "active",
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Auto-generate slug from name before saving
plantSchema.pre("save", async function (next) {
  if (this.isModified("name") && !this.slug) {
    const slug = this.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
    // Check for slug collision
    const existing = await this.constructor.findOne({ slug });
    if (existing) {
      this.slug = `${slug}-${Date.now().toString().slice(-6)}`;
    } else {
      this.slug = slug;
    }
  }
  // Sync inStock based on stockQuantity
  if (this.stockQuantity <= 0) {
    this.inStock = false;
  } else {
    this.inStock = true;
  }
  next();
});

plantSchema.index({ name: "text", botanicalName: "text", description: "text" });
plantSchema.index({ category: 1, status: 1 });
plantSchema.index({ isFeatured: 1, status: 1 });
plantSchema.index({ inStock: 1, status: 1 });

export default mongoose.model("Plant", plantSchema);
