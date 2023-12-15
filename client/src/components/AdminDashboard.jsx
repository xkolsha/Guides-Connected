import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
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
import {
  Button,
  TextField,
  Grid,
  Paper,
  Typography,
  Box,
  TextareaAutosize,
  Tabs,
  Tab,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
  Chip,
  Container,
} from "@mui/material";

const AdminDashboard = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [formMode, setFormMode] = useState("add");
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    description: "",
    biography: "",
    categories: [],
  });
  const [currentEditingType, setCurrentEditingType] = useState("expert");
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const { data: expertsData, refetch: refetchExperts } = useQuery(GET_EXPERTS);
  const { data: categoriesData, refetch: refetchCategories } =
    useQuery(GET_CATEGORIES);

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

  const handleEditClick = (item, type) => {
    setSelectedItem(item);
    setFormMode("edit");
    setCurrentEditingType(type);
    setFormData({
      name: item.name,
      title: item.title || "",
      description: item.description || "",
      biography: item.biography || "",
      categories: item.categories?.map((category) => category._id) || [],
    });
  };

  const handleDeleteClick = async (id, type) => {
    if (type === "expert") {
      await deleteExpert({ variables: { id } });
    } else if (type === "category") {
      await deleteCategory({ variables: { id } });
    }
  };

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

  const handleImageChange = (event) => {
    setImageFile(event.target.files[0]);
  };

  const handleCategoryChange = (event) => {
    setFormData({ ...formData, categories: event.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let imageUrl = ""; // URL from image upload service
    if (imageFile) {
      // Upload logic here to get imageUrl
    }

    try {
      if (currentEditingType === "expert") {
        const expertData = {
          name: formData.name,
          title: formData.title,
          biography: formData.biography,
          image: imageUrl,
          categoryIds: formData.categories,
        };
        if (formMode === "add") {
          await addExpert({ variables: { expertData } });
        } else {
          await updateExpert({
            variables: { id: selectedItem._id, expertData },
          });
        }
      } else if (currentEditingType === "category") {
        const categoryData = {
          name: formData.name,
          description: formData.description,
          expertIds: formData.categories, // Assuming you want to link experts here
        };
        if (formMode === "add") {
          await addCategory({ variables: { categoryData } });
        } else {
          await updateCategory({
            variables: { id: selectedItem._id, categoryData },
          });
        }
      }
      setSelectedItem(null);
      setFormData({
        name: "",
        title: "",
        description: "",
        biography: "",
        categories: [],
      });
      setFormMode("add");
      setImageFile(null);
    } catch (error) {
      console.error("Error handling form submission:", error);
    }
  };

  return (
    <Container maxWidth="lg">
      {" "}
      {/* Added Container for consistent layout */}
      <Box
        sx={{
          flexGrow: 1,
          my: 4,
          py: 4, // Adjusted padding for consistency
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{ mb: 6, fontWeight: "bold" }}
        >
          Admin Dashboard
        </Typography>

        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          centered
          sx={{ mb: 4 }}
        >
          <Tab label="Manage Experts" />
          <Tab label="Manage Categories" />
        </Tabs>
        {activeTab === 0 && (
          <Grid item xs={12} md={6} mb={3}>
            <Paper sx={{ p: 6 }}>
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

        {activeTab === 1 && (
          <Grid item xs={12} md={6} mb={3}>
            <Paper sx={{ p: 6 }}>
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
                    onClick={() => handleDeleteClick(category._id, "category")}
                  >
                    Delete
                  </Button>
                </Box>
              ))}
              <Button
                variant="contained"
                color="secondary"
                onClick={() => handleAddNewClick("category")}
              >
                Add Category
              </Button>
            </Paper>
          </Grid>
        )}

        {/* Form for Adding/Editing Experts or Categories */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6">
              {formMode === "add"
                ? `Add New ${currentEditingType}`
                : `Edit ${currentEditingType}`}
            </Typography>
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
                  <Button
                    variant="contained"
                    component="label"
                    sx={{ mt: 2, mb: 2 }}
                  >
                    Upload Image
                    <input type="file" hidden onChange={handleImageChange} />
                  </Button>
                  {imageFile && (
                    <Typography variant="body2" sx={{ mb: 2 }}>
                      {imageFile.name}
                    </Typography>
                  )}
                  <FormControl fullWidth sx={{ mt: 2 }}>
                    <InputLabel>Categories</InputLabel>
                    <Select
                      multiple
                      value={formData.categories}
                      onChange={handleCategoryChange}
                      input={<OutlinedInput label="Categories" />}
                      renderValue={(selected) => (
                        <Box
                          sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}
                        >
                          {selected
                            .map(
                              (id) =>
                                categoriesData.getCategories.find(
                                  (c) => c._id === id
                                ).name
                            )
                            .map((name, index) => (
                              <Chip key={index} label={name} />
                            ))}
                        </Box>
                      )}
                    >
                      {categoriesData?.getCategories?.map((category) => (
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
              >
                {formMode === "add" ? "Add" : "Update"} {currentEditingType}
              </Button>
            </form>
          </Paper>
        </Grid>
      </Box>
    </Container>
  );
};

export default AdminDashboard;
