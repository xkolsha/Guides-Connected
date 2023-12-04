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

const AdminDashboard = () => {
  // State for handling selected items, form mode, and form data
  const [selectedItem, setSelectedItem] = useState(null);
  const [formMode, setFormMode] = useState("add"); // 'add' or 'edit'
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    description: "",
    biography: "",
  });
  const [currentEditingType, setCurrentEditingType] = useState("expert"); // 'expert' or 'category'

  // Query hooks to fetch experts and categories data
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

  // Handler for editing items
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

  // Handler for deleting items
  const handleDeleteClick = async (id, type) => {
    if (type === "expert") {
      await deleteExpert({ variables: { id } });
    } else if (type === "category") {
      await deleteCategory({ variables: { id } });
    }
  };

  // Handler for adding new items
  const handleAddNewClick = (type) => {
    setSelectedItem(null);
    setFormMode("add");
    setCurrentEditingType(type);
    setFormData({ name: "", title: "", description: "", biography: "" });
  };

  // Handler for form submission
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

  // Render UI components
  return (
    <div>
      <h1>Admin Dashboard</h1>

      {/* Experts Section */}
      <div>
        <h2>Experts</h2>
        {expertsData?.getExperts.map((expert) => (
          <div key={expert._id}>
            {expert.name} - {expert.title}
            <button onClick={() => handleEditClick(expert, "expert")}>
              Edit
            </button>
            <button onClick={() => handleDeleteClick(expert._id, "expert")}>
              Delete
            </button>
          </div>
        ))}
        <button onClick={() => handleAddNewClick("expert")}>Add Expert</button>
      </div>

      {/* Categories Section */}
      <div>
        <h2>Categories</h2>
        {categoriesData?.getCategories.map((category) => (
          <div key={category._id}>
            {category.name}
            <button onClick={() => handleEditClick(category, "category")}>
              Edit
            </button>
            <button onClick={() => handleDeleteClick(category._id, "category")}>
              Delete
            </button>
          </div>
        ))}
        <button onClick={() => handleAddNewClick("category")}>
          Add Category
        </button>
      </div>

      {/* Form for Adding/Editing Experts or Categories */}
      <div>
        <h3>
          {formMode === "add"
            ? `Add New ${currentEditingType}`
            : `Edit ${currentEditingType}`}
        </h3>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name:</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />
          </div>

          {/* Conditional rendering based on currentEditingType */}
          {currentEditingType === "expert" && (
            <>
              <div>
                <label>Title:</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                />
              </div>
              <div>
                <label>Biography:</label>
                <textarea
                  value={formData.biography}
                  onChange={(e) =>
                    setFormData({ ...formData, biography: e.target.value })
                  }
                />
              </div>
            </>
          )}

          {currentEditingType === "category" && (
            <div>
              <label>Description:</label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
            </div>
          )}

          <div>
            <button type="submit">
              {formMode === "add" ? "Add" : "Update"} {currentEditingType}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminDashboard;
