import db from "../config/db.js";
import adminSeeds from "./adminSeeds.js";
import expertSeeds from "./expertSeeds.js";
import categorySeeds from "./categorySeeds.js";
import models from "../models/index.js";

const { Admin, Expert, Category } = models;

// Connect to the database and perform seeding once the connection is open
db.once("open", async () => {
  try {
    // Clear existing data in the collections
    await Admin.deleteMany({});
    await Expert.deleteMany({});
    await Category.deleteMany({});
    console.log("Cleared existing data.");

    // Seed admin data
    for (const admin of adminSeeds) {
      const insertedAdmin = await Admin.create(admin);
      console.log("Admin data seeded:", insertedAdmin);
    }

    // Seed expert data
    await Expert.create(expertSeeds);
    console.log("Expert data seeded.");
    console.log("Expert seeds:", expertSeeds);

    // Seed category data
    await Category.create(categorySeeds);
    console.log("Category data seeded.");
    console.log("Category seeds:", categorySeeds);

    console.log("All seeds inserted successfully!");
    process.exit(0);
  } catch (err) {
    console.error("Failed to seed data:", err);
    process.exit(1);
  }
});
