import mongoose from "mongoose";

const inquirySchema = new mongoose.Schema(
  {
    referenceId: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
    },
    type: {
      type: String,
      enum: ["general", "quote", "site-visit", "plant-inquiry"],
      default: "quote",
    },
    name: {
      type: String,
      required: [true, "Customer name is required"],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email address is required"],
      trim: true,
      lowercase: true,
    },
    serviceName: {
      type: String,
      default: "General Landscaping",
    },
    propertyType: {
      type: String,
      enum: ["Residential Villa", "Apartment/Terrace", "Commercial/IT Park", "Sports Ground", "Farmhouse", "Other"],
      default: "Residential Villa",
    },
    areaSqFt: {
      type: Number,
      default: 0,
    },
    location: {
      type: String,
      default: "Pune, Maharashtra",
    },
    budgetRange: {
      type: String,
      default: "₹25,000 - ₹50,000",
    },
    preferredDate: {
      type: Date,
    },
    message: {
      type: String,
      default: "",
    },
    referenceImages: {
      type: [String],
      default: [],
    },
    status: {
      type: String,
      enum: ["New", "Contacted", "Quotation Sent", "Approved", "Rejected", "Completed"],
      default: "New",
    },
    internalNotes: [
      {
        note: { type: String, required: true },
        author: { type: String, default: "Admin" },
        date: { type: Date, default: Date.now },
      },
    ],
    statusHistory: [
      {
        status: { type: String, required: true },
        changedAt: { type: Date, default: Date.now },
        note: { type: String, default: "" },
      },
    ],
  },
  { timestamps: true }
);

inquirySchema.index({ referenceId: 1, email: 1, phone: 1, status: 1 });

export default mongoose.model("Inquiry", inquirySchema);
