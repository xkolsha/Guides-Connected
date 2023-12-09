import "dotenv/config"; // Import environment variables
import express from "express"; // Import Express
import { ApolloServer } from "apollo-server-express"; // Import Apollo Server
import path from "path"; // Import path module
import { fileURLToPath } from "url"; // Import fileURLToPath method
import cors from "cors"; // Import cors module
import db from "./config/db.js"; // Import MongoDB connection
import { typeDefs, resolvers } from "./schemas/index.js"; // Import typeDefs and resolvers

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
