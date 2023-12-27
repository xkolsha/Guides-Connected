import "dotenv/config"; // Import environment variables
import express from "express"; // Import Express
import { ApolloServer } from "apollo-server-express"; // Import Apollo Server
import path from "path"; // Import path module
import { fileURLToPath } from "url"; // Import fileURLToPath method
import cors from "cors"; // Import cors module
import db from "./config/db.js"; // Import MongoDB connection
import { typeDefs, resolvers } from "./schemas/index.js"; // Import typeDefs and resolvers
import multer from "multer";
import { uploadImageToCloudinary } from "./utils/cloudinaryConfig.js"; // Import cloudinary config
import fs from "fs"; // Import fs module
import nodemailer from "nodemailer"; // Import nodemailer

// Initialize Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req }), // Context logic
});

// Initialize Express app
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
      if (err) {
        console.error("Error deleting file:", err);
      }
    });

    // Respond with the URL from Cloudinary
    res.json({ secure_url: result.url });
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    res.status(500).send("Error uploading image");
  }
});

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
  service: "your-email-service", // e.g., 'Gmail'
  auth: {
    user: process.env.EMAIL_USERNAME, // Your email address
    pass: process.env.EMAIL_PASSWORD, // Your email password
  },
});

// Email API endpoint
app.post("/api/send-email", async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const mailOptions = {
      from: `"${name}" <${email}>`, // Sender address
      to: process.env.RECIPIENT_EMAIL, // List of receivers
      subject: "New Contact Form Submission", // Subject line
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`, // Plain text body
      // Optionally, you can add HTML body content here
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);
    res.json({ message: "Email sent successfully", info });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).send("Error sending email");
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
