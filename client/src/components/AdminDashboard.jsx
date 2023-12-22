import { useState } from "react";

//  Apollo Client Hooks
import { useQuery, useMutation } from "@apollo/client";

// GraphQL Queries and Mutations
import {
  GET_EXPERTS,
  GET_CATEGORIES,
  ADD_EXPERT,
  UPDATE_EXPERT,
  DELETE_EXPERT,
  ADD_CATEGORY,
  UPDATE_CATEGORY,
  DELETE_CATEGORY,
} from "../queries/adminQueries.jsx";

// Material UI Components
import {
  Button,
  TextField,
  Grid,
  Paper,
  Typography,
  Box,
  Tabs,
  Tab,
  Container,
  TextareaAutosize,
  useTheme,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Tooltip,
} from "@mui/material";

const AdminDashboard = () => {
  // Use the theme
  const theme = useTheme();
  // State for form data
  const [selectedItem, setSelectedItem] = useState(null);
  // State for form mode (add or edit)
  const [formMode, setFormMode] = useState("add");
  // State for form data
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    description: "",
    biography: "",
    categories: [],
  });
  // State for the Cloudinary URL
  const [selectedImage, setSelectedImage] = useState(null);

  // State for the file object
  const [imageFile, setImageFile] = useState(null);

  // Define the setUploadError function
  const [uploadError, setUploadError] = useState("");

  // State for current editing type (expert or category)
  const [currentEditingType, setCurrentEditingType] = useState("expert");

  // State for active tab
  const [activeTab, setActiveTab] = useState(0);

  // Apollo Client Hooks
  const { data: expertsData, refetch: refetchExperts } = useQuery(GET_EXPERTS);
  const {
    data: categoriesData,
    loading: loadingCategories,
    error: errorCategories,
    refetch: refetchCategories,
  } = useQuery(GET_CATEGORIES);

  // Apollo Client Mutations
  const [addExpert] = useMutation(ADD_EXPERT, {
    onCompleted: () => refetchExperts(),
  });
  const [updateExpert] = useMutation(UPDATE_EXPERT, {
    onCompleted: () => refetchExperts(),
  });
  const [deleteExpert] = useMutation(DELETE_EXPERT, {
    onCompleted: () => refetchExperts(),
  });
  const [addCategory] = useMutation(ADD_CATEGORY, {
    onCompleted: () => refetchCategories(),
  });
  const [updateCategory] = useMutation(UPDATE_CATEGORY, {
    onCompleted: () => refetchCategories(),
  });
  const [deleteCategory] = useMutation(DELETE_CATEGORY, {
    onCompleted: () => refetchCategories(),
  });

  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  // Handle edit click
  const handleEditClick = (item, type) => {
    setSelectedItem(item);
    setFormMode("edit");
    setCurrentEditingType(type);
    setFormData({
      name: item.name,
      title: item.title || "",
      description: item.description || "",
      biography: item.biography || "",
      image: item.image || "",
      categories: type === "expert" ? item.categories.map((c) => c._id) : [],
    });
  };

  // Handle delete click
  const handleDeleteClick = async (id, type) => {
    if (type === "expert") {
      await deleteExpert({ variables: { id } });
    } else if (type === "category") {
      await deleteCategory({ variables: { id } });
    }
  };

  // Handle add new click
  const handleAddNewClick = (type) => {
    setSelectedItem(null);
    setFormMode("add");
    setCurrentEditingType(type);
    setFormData({
      name: "",
      title: "",
      description: "",
      biography: "",
      categories: [],
    });
  };

  // Handle image change for upload
  const handleImageChange = (e) => {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      setImageFile(file); // Store the file object for later upload
      setUploadError("");
    }
  };

  // Handle form submission with image upload
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submission started");
    let cloudinaryUrl = selectedImage;

    // Upload the image to Cloudinary if there is an image file
    if (imageFile) {
      console.log("Image file exists, uploading to Cloudinary...");
      try {
        const formData = new FormData();
        formData.append("file", imageFile);

        const response = await fetch("http://localhost:4000/api/upload", {
          method: "POST",
          body: formData,
        });

        console.log("Raw response from Cloudinary:", response);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Parsed data from Cloudinary:", data);

        if (data.secure_url) {
          cloudinaryUrl = data.secure_url;
          console.log("Image uploaded to Cloudinary: ", cloudinaryUrl);

          // Update the selectedImage state
          setSelectedImage(cloudinaryUrl);
        } else {
          console.error("No secure URL in response");
          setUploadError("No secure URL received from Cloudinary");
          return; // Stop the form submission if image upload fails
        }
      } catch (error) {
        console.error("Error uploading image:", error);
        setUploadError(`Error uploading image: ${error.message}`);
        return; // Stop the form submission if image upload fails
      }
    }
    // Construct the expert or category data based on current editing type
    if (currentEditingType === "expert") {
      // Construct expert data
      const expertData = {
        name: formData.name,
        title: formData.title,
        biography: formData.biography,
        categories: formData.categories,
        image: cloudinaryUrl,
      };
      console.log("Expert data to be submitted: ", expertData);

      // Mutation for adding or updating expert
      if (formMode === "add") {
        await addExpert({ variables: { expertData } });
      } else {
        await updateExpert({ variables: { id: selectedItem._id, expertData } });
      }
    } else if (currentEditingType === "category") {
      // Construct category data
      const categoryData = {
        name: formData.name,
        description: formData.description,
      };
      console.log("Category data to be submitted: ", categoryData);

      // Mutation for adding or updating category
      if (formMode === "add") {
        await addCategory({ variables: { categoryData } });
      } else {
        await updateCategory({
          variables: { id: selectedItem._id, categoryData },
        });
      }
    }

    // Reset form and state after successful submission
    console.log("Resetting form and state");
    resetFormAndState();
  };

  // Function to reset form and state
  const resetFormAndState = () => {
    setSelectedItem(null);
    setFormData({
      name: "",
      title: "",
      description: "",
      biography: "",
      categories: [],
    });
    setFormMode("add");
    setSelectedImage(null);
    setImageFile(null);
    setUploadError("");
  };

  // Handle file button click
  const handleFileButtonClick = () => {
    document.getElementById("image-upload").click();
  };

  // Handle loading state
  if (loadingCategories) {
    return <p>Loading categories...</p>;
  }

  // Handle error state
  if (errorCategories) {
    return <p>Error loading categories: {errorCategories.message}</p>;
  }

  // Determine which image to display: use the local preview or the uploaded image URL
  const imagePreviewUrl =
    selectedImage || (imageFile && URL.createObjectURL(imageFile));

  // Make sure to revoke the object URL when it's no longer needed
  if (imageFile) {
    window.URL.revokeObjectURL(imageFile);
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: { xs: 8, sm: 10, md: 12 } }}>
        <Typography
          variant="h2"
          gutterBottom
          align="center"
          fontWeight={"bold"}
        >
          Admin Dashboard
          <span style={{ color: "#FF5733" }}>.</span>
        </Typography>

        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          centered
          sx={{ mb: 3 }}
        >
          <Tab label="Manage Experts" />
          <Tab label="Manage Categories" />
        </Tabs>

        <Grid container spacing={3} justifyContent="center">
          {/* Experts Management Section */}
          {activeTab === 0 && (
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 4, borderRadius: theme.shape.borderRadius }}>
                {/* Experts List Rendering */}
                {expertsData?.getExperts.map((expert) => (
                  <Box key={expert._id} sx={{ mb: 3 }}>
                    <Typography variant="body1" mb={1}>
                      {expert.name} - {expert.title}
                    </Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      sx={{ mr: 1 }}
                      onClick={() => handleEditClick(expert, "expert")}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => handleDeleteClick(expert._id, "expert")}
                    >
                      Delete
                    </Button>
                  </Box>
                ))}
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleAddNewClick("expert")}
                  sx={{ mt: 1 }}
                >
                  Add Expert
                </Button>
              </Paper>
            </Grid>
          )}

          {/* Categories Management Section */}
          {activeTab === 1 && (
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 4, borderRadius: theme.shape.borderRadius }}>
                {/* Categories List Rendering */}
                {categoriesData?.getCategories.map((category) => (
                  <Box key={category._id} sx={{ mb: 3 }}>
                    <Typography variant="body1" mb={1}>
                      {category.name}
                    </Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      sx={{ mr: 1 }}
                      onClick={() => handleEditClick(category, "category")}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() =>
                        handleDeleteClick(category._id, "category")
                      }
                    >
                      Delete
                    </Button>
                  </Box>
                ))}
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleAddNewClick("category")}
                  sx={{ mt: 1 }}
                >
                  Add Category
                </Button>
              </Paper>
            </Grid>
          )}

          {/* Form for Adding/Editing Experts or Categories */}
          <Grid item xs={12}>
            <Paper sx={{ p: 4, borderRadius: theme.shape.borderRadius }}>
              <Typography variant="h6">
                {formMode === "add"
                  ? `Add New ${currentEditingType}`
                  : `Edit ${currentEditingType}`}
              </Typography>
              {/* Form elements here */}
              <form onSubmit={handleSubmit}>
                <TextField
                  label="Name"
                  variant="outlined"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                  fullWidth
                  margin="normal"
                />

                {/* Conditional Form Fields based on Current Editing Type */}
                {currentEditingType === "expert" && (
                  <>
                    <TextField
                      label="Title"
                      variant="outlined"
                      value={formData.title}
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                      fullWidth
                      margin="normal"
                    />
                    <TextareaAutosize
                      minRows={3}
                      placeholder="Biography"
                      value={formData.biography}
                      onChange={(e) =>
                        setFormData({ ...formData, biography: e.target.value })
                      }
                      style={{ width: "100%", marginTop: "8px" }}
                    />
                    <input
                      type="file"
                      accept="image/*"
                      id="image-upload"
                      style={{ display: "none" }}
                      onChange={handleImageChange}
                    />
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleFileButtonClick}
                      sx={{ mt: 2, mb: 2 }}
                    >
                      Upload Image
                    </Button>
                    {selectedImage && (
                      <Box sx={{ mt: 2, mb: 2 }}>
                        <Typography variant="caption">Preview:</Typography>
                        <img
                          src={URL.createObjectURL(selectedImage)}
                          alt="Preview"
                          style={{
                            maxWidth: "100%",
                            maxHeight: "150px",
                            display: "block",
                          }}
                        />
                      </Box>
                    )}
                    <Box sx={{ mt: 2, mb: 2 }}>
                      {uploadError && (
                        <Typography color="error">{uploadError}</Typography>
                      )}
                      <Typography variant="caption">Image Preview:</Typography>
                      {imagePreviewUrl && (
                        <img
                          src={imagePreviewUrl}
                          alt="Preview"
                          style={{
                            maxWidth: "100%",
                            maxHeight: "150px",
                            display: "block",
                          }}
                        />
                      )}
                    </Box>{" "}
                    {/* Category Selection for Experts */}
                    <FormControl fullWidth margin="normal">
                      {formData.categories.length === 0 && (
                        <InputLabel>Categories</InputLabel>
                      )}
                      <Select
                        multiple
                        value={formData.categories}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            categories: e.target.value,
                          })
                        }
                        renderValue={(selected) => (
                          <Box
                            sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}
                          >
                            {selected.map((id) => {
                              const category =
                                categoriesData.getCategories.find(
                                  (cat) => cat._id === id
                                );
                              return (
                                <Tooltip key={id} title={category?.name || id}>
                                  <Chip
                                    label={category?.name || id}
                                    style={{ maxWidth: 150 }}
                                  />
                                </Tooltip>
                              );
                            })}
                          </Box>
                        )}
                        MenuProps={{
                          PaperProps: {
                            style: {
                              maxHeight: 224,
                            },
                          },
                        }}
                      >
                        {categoriesData.getCategories.map((category) => (
                          <MenuItem key={category._id} value={category._id}>
                            {category.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </>
                )}
                {currentEditingType === "category" && (
                  <TextareaAutosize
                    minRows={3}
                    placeholder="Description"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    style={{ width: "100%", marginTop: "8px" }}
                  />
                )}
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2 }}
                  // disabled={!selectedImage && currentEditingType === "expert"}
                >
                  {formMode === "add" ? "Add" : "Update"} {currentEditingType}
                </Button>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default AdminDashboard;
