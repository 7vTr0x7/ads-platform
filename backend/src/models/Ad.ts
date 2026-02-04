import mongoose from "mongoose";

const adSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    price: Number,
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    isActive: Boolean,
  },
  { timestamps: true },
);

export const Ad = mongoose.model("Ad", adSchema);
