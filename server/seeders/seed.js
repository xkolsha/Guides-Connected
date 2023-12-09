import db from "../config/db.js";
import adminSeeds from "./adminSeeds.js";
import expertSeeds from "./expertSeeds.js";
import categorySeeds from "./categorySeeds.js";
import models from "../models/index.js";

// Destructure the models from the exported object
const { Admin, Expert, Category } = models;

// Connect to the database and perform seeding once the connection is open
db.once("open", async () => {
  try {
    // Clear existing data in the collections
    await Admin.deleteMany({}); // Delete all documents in the Admin collection
    await Expert.deleteMany({}); // Delete all documents in the Expert collection
    await Category.deleteMany({}); // Delete all documents in the Category collection
    console.log("Cleared existing data.");

    // Seed admin data
    for (const admin of adminSeeds) {
      const insertedAdmin = await Admin.create(admin); // Create a new admin
      console.log("Admin data seeded:", insertedAdmin); // Log the inserted admin
    }

    // Seed expert data
    await Expert.create(expertSeeds); // Create new experts
    console.log("Expert data seeded."); // Log the inserted experts
    console.log("Expert seeds:", expertSeeds); // Log the inserted experts

    // Seed category data
    await Category.create(categorySeeds); // Create new categories
    console.log("Category data seeded."); // Log the inserted categories
    console.log("Category seeds:", categorySeeds); // Log the inserted categories

    // Exit the process
    console.log("All seeds inserted successfully!");
    process.exit(0);
  } catch (err) {
    // If an error occurred, log it and exit with a failure code
    console.error("Failed to seed data:", err);
    process.exit(1);
  }
});
