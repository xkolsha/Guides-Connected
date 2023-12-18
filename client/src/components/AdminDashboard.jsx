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
  Tabs,
  Tab,
  Container,
  TextareaAutosize,
  useTheme, // Import useTheme
} from "@mui/material";

const AdminDashboard = () => {
  // Use the theme here
  const theme = useTheme();

  // State for handling form data and UI
  const [selectedItem, setSelectedItem] = useState(null);
  const [formMode, setFormMode] = useState("add"); // 'add' or 'edit'
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    description: "",
    biography: "",
  });
  const [currentEditingType, setCurrentEditingType] = useState("expert"); // 'expert' or 'category'
  const [activeTab, setActiveTab] = useState(0);

  // Handler for tab change in sub-navigation
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  // Apollo Client hooks for fetching and manipulating data
  const { data: expertsData, refetch: refetchExperts } = useQuery(GET_EXPERTS);
  const { data: categoriesData, refetch: refetchCategories } =
    useQuery(GET_CATEGORIES);

  // Mutation hooks for CRUD operations on experts and categories
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

  // Handler functions for CRUD operations
  const handleEditClick = (item, type) => {
    setSelectedItem(item);
    setFormMode("edit");
    setCurrentEditingType(type);
    setFormData({
      name: item.name,
      title: item.title || "",
      description: item.description || "",
      biography: item.biography || "",
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
    setFormData({ name: "", title: "", description: "", biography: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (currentEditingType === "expert") {
        const expertData = {
          name: formData.name,
          title: formData.title,
          biography: formData.biography,
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
      setFormData({ name: "", title: "", description: "", biography: "" });
      setFormMode("add");
    } catch (error) {
      console.error("Error handling form submission:", error);
    }
  };

  // Main component render
  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          py: { xs: 8, sm: 10, md: 12 },
        }}
      >
        <Typography
          variant="h2"
          gutterBottom
          align="center"
          fontWeight={"bold"}
        >
          Admin Dashboard
          <span style={{ color: "#FF5733" }}>.</span>{" "}
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
                {/* Additional form fields based on the currentEditingType */}
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
        </Grid>
      </Box>
    </Container>
  );
};

export default AdminDashboard;
