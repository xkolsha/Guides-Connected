import mongoose from "mongoose";
const { Schema, model } = mongoose;

// Creating Category schema
const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  description: {
    type: String,
    required: false,
  },
  experts: [
    {
      type: Schema.Types.ObjectId,
      ref: "Expert",
    },
  ],
  // Add other fields as necessary
});

// Creating Category model
const Category = model("Category", categorySchema);

// Exporting Category model
export default Category;
