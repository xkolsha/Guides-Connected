import { gql } from "@apollo/client";

// Queries and mutations related to the Admin entity
export const GET_ADMINS = gql`
  query GetAdmins {
    getAdmins {
      _id
      username
    }
  }
`;

export const GET_ADMIN = gql`
  query GetAdmin($id: ID!) {
    getAdmin(id: $id) {
      _id
      username
    }
  }
`;

export const ADD_ADMIN = gql`
  mutation AddAdmin($adminData: AdminInput!) {
    addAdmin(adminData: $adminData) {
      _id
      username
    }
  }
`;

export const UPDATE_ADMIN = gql`
  mutation UpdateAdmin($id: ID!, $adminData: AdminInput!) {
    updateAdmin(id: $id, adminData: $adminData) {
      _id
      username
    }
  }
`;

export const DELETE_ADMIN = gql`
  mutation DeleteAdmin($id: ID!) {
    deleteAdmin(id: $id) {
      _id
    }
  }
`;

// Queries and mutations related to the Category entity
export const GET_CATEGORIES = gql`
  query GetCategories {
    getCategories {
      _id
      name
      description
    }
  }
`;

export const GET_CATEGORY = gql`
  query GetCategory($id: ID!) {
    getCategory(id: $id) {
      _id
      name
      description
      experts {
        _id
        name
        description
      }
    }
  }
`;

export const ADD_CATEGORY = gql`
  mutation AddCategory($categoryData: CategoryInput!) {
    addCategory(categoryData: $categoryData) {
      _id
      name
      description
    }
  }
`;

export const UPDATE_CATEGORY = gql`
  mutation UpdateCategory($id: ID!, $categoryData: CategoryInput!) {
    updateCategory(id: $id, categoryData: $categoryData) {
      _id
      name
      description
    }
  }
`;

export const DELETE_CATEGORY = gql`
  mutation DeleteCategory($id: ID!) {
    deleteCategory(id: $id) {
      _id
    }
  }
`;

// Queries and mutations related to the Expert entity
export const GET_EXPERTS = gql`
  query GetExperts {
    getExperts {
      _id
      name
      title
      biography
      image
      categories {
        _id
        name
      }
    }
  }
`;

export const GET_EXPERT = gql`
  query GetExpert($id: ID!) {
    getExpert(id: $id) {
      _id
      name
      title
      biography
      image
      categories {
        _id
        name
        description
      }
    }
  }
`;

export const ADD_EXPERT = gql`
  mutation AddExpert($expertData: ExpertInput!) {
    addExpert(expertData: $expertData) {
      _id
      name
      title
      biography
      image
      categories {
        _id
        name
        description
      }
    }
  }
`;

export const UPDATE_EXPERT = gql`
  mutation UpdateExpert($id: ID!, $expertData: ExpertInput!) {
    updateExpert(id: $id, expertData: $expertData) {
      _id
      name
      title
      biography
      image
      categories {
        _id
        name
        description
      }
    }
  }
`;

export const DELETE_EXPERT = gql`
  mutation DeleteExpert($id: ID!) {
    deleteExpert(id: $id) {
      _id
    }
  }
`;

// Export all queries and mutations
export default {
  GET_ADMINS,
  GET_ADMIN,
  ADD_ADMIN,
  UPDATE_ADMIN,
  DELETE_ADMIN,
  GET_CATEGORIES,
  GET_CATEGORY,
  ADD_CATEGORY,
  UPDATE_CATEGORY,
  DELETE_CATEGORY,
  GET_EXPERT,
  GET_EXPERTS,
  ADD_EXPERT,
  UPDATE_EXPERT,
  DELETE_EXPERT,
};
