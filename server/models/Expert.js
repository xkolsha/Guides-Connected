import { Schema, model } from "mongoose";

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

const Expert = model("Expert", expertSchema);

export default Expert;
