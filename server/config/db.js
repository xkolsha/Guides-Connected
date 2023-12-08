import mongoose from "mongoose";

const dbUri =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/guidesConnectedDb";
console.log("Connecting to MongoDB at:", dbUri);

mongoose
  .connect(dbUri)
  .then(() => console.log("MongoDB connected successfully."))
  .catch((error) => console.error("MongoDB connection error:", error));

export default mongoose.connection;
