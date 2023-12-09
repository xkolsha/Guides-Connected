import { Schema, model } from "mongoose";

// Creating Expert schema
const expertSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  title: {
    type: String,
  },
  biography: {
    type: String,
  },
  categories: [
    {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
  ],
  image: {
    type: String, // URL of the uploaded image
    required: false,
  },
});

// Creating Expert model
const Expert = model("Expert", expertSchema);

// Exporting Expert model
export default Expert;
