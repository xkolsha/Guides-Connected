import cloudinary from "cloudinary";

cloudinary.config({
  cloud_name: "YOUR_CLOUD_NAME",
  api_key: "YOUR_API_KEY",
  api_secret: "YOUR_API_SECRET",
  secure: true,
});

export const uploadImageToCloudinary = async (imagePath) => {
  try {
    const result = await cloudinary.uploader.upload(imagePath);
    return result.url;
  } catch (error) {
    console.error("Error uploading image to Cloudinary:", error);
    throw error;
  }
};

export default cloudinary;
