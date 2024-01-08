import "dotenv/config"; // Import dotenv from Node.js
import express from "express"; // Import express from Node.js
import { ApolloServer } from "apollo-server-express"; // Import ApolloServer from apollo-server-express
import path from "path"; // Import path from Node.js
import { fileURLToPath } from "url"; // Import fileURLToPath from Node.js
import cors from "cors"; // Import cors from Node.js
import db from "./config/db.js"; // Import db from db.js
import { typeDefs, resolvers } from "./schemas/index.js"; // Import typeDefs and resolvers from schemas/index.js
import multer from "multer"; // Import multer from Node.js
import { uploadImageToCloudinary } from "./utils/cloudinaryConfig.js"; // Import uploadImageToCloudinary from cloudinaryConfig.js
import fs from "fs"; // Import fs from Node.js
import sendEmail from "./utils/mail.js"; // Import sendEmail from mail.js

// Initialize Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req }),
});

// Define PORT and initialize Express app
const PORT = process.env.PORT || 4000;
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Upload image to Cloudinary
const upload = multer({ dest: "uploads/" });

app.post("/api/upload", upload.single("file"), async (req, res) => {
  try {
    // Upload to Cloudinary
    const result = await uploadImageToCloudinary(req.file.path);

    // Delete the file from local uploads folder
    fs.unlink(req.file.path, (err) => {
      if (err) console.error("Error deleting file:", err);
    });

    // Respond with the URL from Cloudinary
    res.json({ secure_url: result.url });
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    res.status(500).send("Error uploading image");
  }
});

app.post("/api/send-email", async (req, res) => {
  try {
    const info = await sendEmail(req.body); // Use sendEmail from mail.js
    res.json({ message: "Email sent successfully", info });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).send("Error sending email: " + error.message);
  }
});

// Start Apollo Server and apply middleware to Express app
const startApolloServer = async () => {
  await server.start();
  server.applyMiddleware({ app });

  // Define __dirname inside the function
  const __dirname = path.dirname(fileURLToPath(import.meta.url));

  // Serve static assets in production
  app.use(express.static(path.join(__dirname, "../client/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/dist", "index.html"));
  });

  // Connect to MongoDB and start server
  db.once("open", () => {
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
      console.log(
        `GraphQL endpoint: http://localhost:${PORT}${server.graphqlPath}`
      );
    });
  });
};

startApolloServer();
