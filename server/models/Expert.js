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

  image: {
    type: String, // URL of the uploaded image
    required: false,
  },
  categories: [
    {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
  ],
});

// Creating Expert model
const Expert = model("Expert", expertSchema);

// Exporting Expert model
export default Expert;
