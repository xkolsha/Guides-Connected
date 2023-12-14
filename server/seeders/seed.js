import db from "../config/db.js";
import adminSeeds from "./adminSeeds.js";
import expertSeeds from "./expertSeeds.js";
import categorySeeds from "./categorySeeds.js";
import models from "../models/index.js";

const { Admin, Expert, Category } = models;

db.once("open", async () => {
  try {
    // Clear existing data
    await Admin.deleteMany({});
    await Expert.deleteMany({});
    await Category.deleteMany({});
    console.log("Cleared existing data.");

    // Seed admin data
    await Admin.insertMany(adminSeeds);
    console.log("Admin data seeded.");

    // Seed category data and get inserted categories
    const insertedCategories = await Category.insertMany(categorySeeds);
    console.log("Category data seeded.");

    // Map category names to IDs in expertSeeds
    expertSeeds.forEach((expert) => {
      expert.categories = expert.categories
        .map((categoryName) => {
          const category = insertedCategories.find(
            (c) => c.name === categoryName
          );
          return category ? category._id : null;
        })
        .filter((id) => id !== null);
    });

    // Seed expert data and get inserted experts
    const insertedExperts = await Expert.insertMany(expertSeeds);
    console.log("Expert data seeded.");

    // Update categories with expert IDs
    for (const category of insertedCategories) {
      const expertsInCategory = insertedExperts.filter((expert) =>
        expert.categories.includes(category._id)
      );
      await Category.findByIdAndUpdate(category._id, {
        $set: { experts: expertsInCategory.map((expert) => expert._id) },
      });
    }
    console.log("Categories updated with expert data.");

    process.exit(0);
  } catch (err) {
    console.error("Failed to seed data:", err);
    process.exit(1);
  }
});
