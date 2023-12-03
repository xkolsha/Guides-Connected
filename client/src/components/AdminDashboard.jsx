import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_EXPERTS, GET_CATEGORIES } from "../queries/adminQueries.jsx";
import {
  DELETE_EXPERT,
  DELETE_CATEGORY,
  UPDATE_EXPERT,
  UPDATE_CATEGORY,
} from "../mutations/adminMutations.jsx";

const AdminDashboard = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const {
    data: dataExperts,
    loading: loadingExperts,
    error: errorExperts,
  } = useQuery(GET_EXPERTS);
  const {
    data: dataCategories,
    loading: loadingCategories,
    error: errorCategories,
  } = useQuery(GET_CATEGORIES);

  const [updateExpert] = useMutation(UPDATE_EXPERT, {
    refetchQueries: [{ query: GET_EXPERTS }],
  });
  const [updateCategory] = useMutation(UPDATE_CATEGORY, {
    refetchQueries: [{ query: GET_CATEGORIES }],
  });

  const [deleteExpert] = useMutation(DELETE_EXPERT, {
    refetchQueries: [{ query: GET_EXPERTS }],
  });
  const [deleteCategory] = useMutation(DELETE_CATEGORY, {
    refetchQueries: [{ query: GET_CATEGORIES }],
  });

  if (loadingExperts || loadingCategories) return <p>Loading...</p>;
  if (errorExperts || errorCategories) return <p>Error :(</p>;

  const handleEditClick = (item, type) => {
    setSelectedItem({ ...item, type });
    setEditMode(true);
  };

  const handleDeleteClick = async (id, type) => {
    if (type === "expert") {
      await deleteExpert({ variables: { id } });
    } else if (type === "category") {
      await deleteCategory({ variables: { id } });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const formProps = Object.fromEntries(formData);

    if (selectedItem.type === "expert") {
      await updateExpert({
        variables: { id: selectedItem._id, expertData: formProps },
      });
    } else if (selectedItem.type === "category") {
      await updateCategory({
        variables: { id: selectedItem._id, categoryData: formProps },
      });
    }

    setEditMode(false);
    setSelectedItem(null);
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <h2>Experts</h2>
      {dataExperts.getExperts.map((expert) => (
        <div key={expert._id}>
          {expert.name}
          <button onClick={() => handleEditClick(expert, "expert")}>
            Edit
          </button>
          <button onClick={() => handleDeleteClick(expert._id, "expert")}>
            Delete
          </button>
        </div>
      ))}

      <h2>Categories</h2>
      {dataCategories.getCategories.map((category) => (
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

      {editMode && (
        <form onSubmit={handleSubmit}>
          <h3>Edit {selectedItem.type}</h3>
          <label>
            Name:
            <input
              type="text"
              name="name"
              defaultValue={selectedItem.name || ""}
              required
            />
          </label>
          {selectedItem.type === "expert" && (
            <label>
              Title:
              <input
                type="text"
                name="title"
                defaultValue={selectedItem.title || ""}
              />
            </label>
          )}
          <button type="submit">Save</button>
          <button type="button" onClick={() => setEditMode(false)}>
            Cancel
          </button>
        </form>
      )}
    </div>
  );
};

export default AdminDashboard;
