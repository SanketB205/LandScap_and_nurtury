import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        description: { type: String, required: true },
        price: { type: Number, required: true },
        category: { type: String, required: true },
        img: { type: String, required: true },
    },
    { timestamps: true }
);

export const Product = mongoose.model("Product", productSchema);
