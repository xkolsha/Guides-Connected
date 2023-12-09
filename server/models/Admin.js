import { Schema, model } from "mongoose";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

// Destructuring bcrypt
const { hash, compare } = bcrypt;

// Creating Admin schema
const adminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Password hashing middleware
adminSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await hash(this.password, 10);
  }
  next();
});

// Method to check password validity
adminSchema.methods.isCorrectPassword = async function (password) {
  return compare(password, this.password);
};

// Creating Admin model
const Admin = model("Admin", adminSchema);

// Exporting Admin model
export default Admin;
