import mongoose from "mongoose";

const quotationItemSchema = new mongoose.Schema({
  description: { type: String, required: true },
  quantity: { type: Number, required: true, default: 1 },
  unit: { type: String, default: "sq ft" },
  unitPrice: { type: Number, required: true, default: 0 },
  total: { type: Number, required: true, default: 0 },
});

const quotationRevisionSchema = new mongoose.Schema({
  status: { type: String, required: true },
  changedBy: { type: String, default: "Admin" },
  changedAt: { type: Date, default: Date.now },
  note: { type: String, default: "" },
  subtotal: { type: Number, default: 0 },
  taxPercent: { type: Number, default: 0 },
  taxAmount: { type: Number, default: 0 },
  grandTotal: { type: Number, default: 0 },
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
      trim: true,
    },
    customerEmail: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    customerPhone: {
      type: String,
      required: true,
      trim: true,
    },
    projectTitle: {
      type: String,
      required: true,
      default: "Landscaping & Turf Development",
      trim: true,
    },
    items: [quotationItemSchema],
    subtotal: {
      type: Number,
      required: true,
      default: 0,
    },
    taxPercent: {
      type: Number,
      default: 0,
    },
    taxAmount: {
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
        "Quote valid for 30 days from date of issuance.",
        "Payment terms: 50% advance on confirmation, 30% after surface preparation, 20% on completion handover.",
        "Water and electrical connections at site to be provided by client.",
        "Estimated completion time subject to weather conditions.",
        "This is an estimate, not a tax invoice. Final pricing may vary after site inspection.",
      ],
    },
    status: {
      type: String,
      enum: ["Draft", "Sent", "Accepted", "Rejected"],
      default: "Draft",
    },
    // Immutable snapshot: store a copy of items at time of issuance
    itemsSnapshot: {
      type: String,
      default: "",
    },
    revisionHistory: [quotationRevisionSchema],
    currentRevision: {
      type: Number,
      default: 1,
    },
  },
  { timestamps: true }
);

quotationSchema.index({ quoteNumber: 1 }, { unique: true });
quotationSchema.index({ inquiryId: 1 });

export default mongoose.model("Quotation", quotationSchema);
