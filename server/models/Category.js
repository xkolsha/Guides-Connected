import mongoose from "mongoose";
const { Schema, model } = mongoose;

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

const Category = model("Category", categorySchema);

export default Category;
