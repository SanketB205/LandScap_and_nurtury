import mongoose from "mongoose";

const quotationItemSchema = new mongoose.Schema({
  description: { type: String, required: true },
  quantity: { type: Number, required: true, default: 1 },
  unit: { type: String, default: "sq ft" },
  unitPrice: { type: Number, required: true, default: 0 },
  total: { type: Number, required: true, default: 0 },
});

const quotationSchema = new mongoose.Schema(
  {
    quoteNumber: {
      type: String,
      required: true,
      unique: true,
    },
    inquiryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Inquiry",
    },
    customerName: {
      type: String,
      required: true,
    },
    customerEmail: {
      type: String,
      required: true,
    },
    customerPhone: {
      type: String,
      required: true,
    },
    projectTitle: {
      type: String,
      required: true,
      default: "Landscaping & Turf Development",
    },
    items: [quotationItemSchema],
    subtotal: {
      type: Number,
      required: true,
      default: 0,
    },
    gstPercent: {
      type: Number,
      default: 18,
    },
    gstAmount: {
      type: Number,
      default: 0,
    },
    grandTotal: {
      type: Number,
      required: true,
      default: 0,
    },
    validUntil: {
      type: Date,
      default: () => new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
    },
    terms: {
      type: [String],
      default: [
        "Quote valid for 30 days from issue date.",
        "50% advance on project confirmation, 30% on material delivery, 20% on completion.",
        "Site must provide access to water and electricity.",
        "Estimated completion time subject to weather conditions.",
      ],
    },
    status: {
      type: String,
      enum: ["Draft", "Sent", "Accepted", "Rejected"],
      default: "Draft",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Quotation", quotationSchema);
