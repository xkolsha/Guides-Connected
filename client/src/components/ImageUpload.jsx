import { useState } from "react";
import PropTypes from "prop-types";
import { Button } from "@mui/material";

const ImageUpload = ({ onUploadComplete }) => {
  const [imageFile, setImageFile] = useState(null);

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!imageFile) return;

    const formData = new FormData();
    formData.append("file", imageFile);

    try {
      const response = await fetch("/api/upload", {
        // Adjust the endpoint as needed
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload image");
      }

      const result = await response.json();
      onUploadComplete(result.secure_url); // Assuming 'secure_url' is returned from your server
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <div>
      <input accept="image/*" type="file" onChange={handleImageChange} />
      <Button variant="contained" color="primary" onClick={handleUpload}>
        Upload Image
      </Button>
    </div>
  );
};

ImageUpload.propTypes = {
  onUploadComplete: PropTypes.func.isRequired,
};

export default ImageUpload;
