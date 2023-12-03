import { useState } from "react";
import PropTypes from "prop-types";
import { Button } from "@mui/material";
import { Cloudinary } from "@cloudinary/url-gen";

const ImageUpload = ({ onUploadComplete }) => {
  const [imageFile, setImageFile] = useState(null);

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!imageFile) return;

    const cld = new Cloudinary({ cloud: { cloudName: "YOUR_CLOUD_NAME" } });
    const upload = await cld.uploader.upload(imageFile, {
      folder: "expert_images",
    });

    onUploadComplete(upload.secure_url);
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
