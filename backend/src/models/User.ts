import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: { type: String, unique: true },
    password: String,
    role: { type: String, enum: ["ADMIN", "ADVERTISER"] },
  },
  { timestamps: true },
);

export const User = mongoose.model("User", userSchema);
