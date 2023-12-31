// Import necessary modules and models
import { AuthenticationError } from "apollo-server-express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";
import Expert from "../models/Expert.js";
import Category from "../models/Category.js";
import { uploadImageToCloudinary } from "../utils/cloudinaryConfig.js"; // Import the Cloudinary upload function

// Define the resolvers
const resolvers = {
  Query: {
    getAdmins: async () => {
      return await Admin.find({});
    },
    getExperts: async () => {
      return await Expert.find({}).populate("categories");
    },

    getExpert: async (_, { id }) => {
      try {
        const expert = await Expert.findById(id).populate("categories");
        console.log("Populated Expert:", expert); // This should show the categories if they're populated correctly
        return expert;
      } catch (error) {
        console.error("Error in getExpert resolver:", error);
        throw new Error("Error fetching expert data");
      }
    },

    allExperts: async () => {
      return await Expert.find({});
    },
    getCategories: async () => {
      return await Category.find({}).populate("experts");
    },
    getCategory: async (_, { id }) => {
      return await Category.findById(id);
    },
    allCategories: async () => {
      return await Category.find({});
    },
    // Add other query resolvers here if needed
  },
  Mutation: {
    addAdmin: async (_, { adminData }) => {
      const newAdmin = new Admin(adminData);
      return await newAdmin.save();
    },
    updateAdmin: async (_, { id, adminData }) => {
      return await Admin.findByIdAndUpdate(id, adminData, { new: true });
    },
    deleteAdmin: async (_, { id }) => {
      return await Admin.findByIdAndDelete(id);
    },
    addExpert: async (_, { expertData }) => {
      // Create a new expert document with the received data, including the Cloudinary image URL
      const newExpert = new Expert(expertData);
      await newExpert.save();

      // Associate categories with the expert
      if (expertData.categories) {
        await Category.updateMany(
          { _id: { $in: expertData.categories } },
          { $push: { experts: newExpert._id } }
        );
      }

      return newExpert;
    },

    updateExpert: async (_, { id, expertData }) => {
      // Update the expert with the received data, including the Cloudinary image URL
      const updatedExpert = await Expert.findByIdAndUpdate(id, expertData, {
        new: true,
      });

      // Handle updating expert's categories
      if (expertData.categories) {
        // Remove expert from categories not in the new list
        await Category.updateMany(
          { experts: id, _id: { $nin: expertData.categories } },
          { $pull: { experts: id } }
        );

        // Add expert to new categories
        await Category.updateMany(
          { _id: { $in: expertData.categories } },
          { $addToSet: { experts: id } } // Use $addToSet to avoid duplicates
        );
      }

      return updatedExpert;
    },

    deleteExpert: async (_, { id }) => {
      return await Expert.findByIdAndDelete(id);
    },
    addCategory: async (_, { categoryData }) => {
      const newCategory = new Category(categoryData);
      return await newCategory.save();
    },
    updateCategory: async (_, { id, categoryData }) => {
      return await Category.findByIdAndUpdate(id, categoryData, { new: true });
    },
    deleteCategory: async (_, { id }) => {
      return await Category.findByIdAndDelete(id);
    },

    adminLogin: async (_, { username, password }) => {
      const admin = await Admin.findOne({ username });
      if (!admin) {
        throw new AuthenticationError("Invalid credentials");
      }

      // Add the console log before the bcrypt comparison
      // console.log("Comparing passwords", {
      //   providedPassword: password,
      //   storedPassword: admin.password,
      // });

      // Compare the passwords
      const valid = await bcrypt.compare(password, admin.password);

      // Add the console log after the bcrypt comparison
      console.log("Password valid:", valid);

      if (!valid) {
        throw new AuthenticationError("Invalid credentials");
      }

      // Generate the JWT token
      const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      return { token };
    },
    // Add other mutation resolvers here if needed
  },
  // Define resolvers for other types if necessary
};

// Export the resolvers
export default resolvers;
