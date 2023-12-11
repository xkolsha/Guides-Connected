import db from "../config/db.js";
import adminSeeds from "./adminSeeds.js";
import expertSeeds from "./expertSeeds.js";
import categorySeeds from "./categorySeeds.js";
import models from "../models/index.js";

const { Admin, Expert, Category } = models;

db.once("open", async () => {
  try {
    await Admin.deleteMany({});
    await Expert.deleteMany({});
    await Category.deleteMany({});
    console.log("Cleared existing data.");

    // Seed admin data
    await Admin.insertMany(adminSeeds);
    console.log("Admin data seeded.");

    // Seed category data and get inserted documents
    const insertedCategories = await Category.insertMany(categorySeeds);
    console.log("Category data seeded.");

    // Create a map for category names to their IDs
    const categoryMap = insertedCategories.reduce((map, category) => {
      map[category.name] = category._id;
      return map;
    }, {});

    // Update expertSeeds with category IDs
    expertSeeds.forEach((expert) => {
      expert.categoryIds = expert.categoryIds.map((name) => categoryMap[name]);
    });

    // Seed expert data
    await Expert.insertMany(expertSeeds);
    console.log("Expert data seeded.");

    process.exit(0);
  } catch (err) {
    console.error("Failed to seed data:", err);
    process.exit(1);
  }
});
