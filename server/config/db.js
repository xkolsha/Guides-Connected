import mongoose from "mongoose";

const dbUri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/gc_db";
console.log("Connecting to MongoDB at:", dbUri);
mongoose.connect(dbUri);

export default mongoose.connection;
