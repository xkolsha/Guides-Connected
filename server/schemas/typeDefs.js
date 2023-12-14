import { gql } from "apollo-server-express";

// Define the GraphQL schema using the GraphQL schema language
const typeDefs = gql`
  type Admin {
    _id: ID
    username: String
  }

  type Expert {
    _id: ID
    name: String
    title: String
    biography: String
    categories: [Category]
    image: String
  }

  type Category {
    _id: ID
    name: String
    description: String
    experts: [Expert]
  }

  type Query {
    getAdmins: [Admin]
    getExperts: [Expert]
    getExpert(id: ID!): Expert
    allExperts: [Expert]
    getCategories: [Category]
    getCategory(id: ID!): Category
    allCategories: [Category]
  }

  input AdminInput {
    username: String!
    password: String!
  }

  input ExpertInput {
    name: String!
    title: String!
    biography: String
    categories: [ID]
    image: String
  }

  input CategoryInput {
    name: String!
    description: String
  }

  type Mutation {
    addAdmin(adminData: AdminInput!): Admin
    updateAdmin(id: ID!, adminData: AdminInput!): Admin
    deleteAdmin(id: ID!): Admin
    addExpert(expertData: ExpertInput!): Expert
    updateExpert(id: ID!, expertData: ExpertInput!): Expert
    deleteExpert(id: ID!): Expert
    addCategory(categoryData: CategoryInput!): Category
    updateCategory(id: ID!, categoryData: CategoryInput!): Category
    deleteCategory(id: ID!): Category
    adminLogin(username: String!, password: String!): AdminAuthResponse
  }

  type AdminAuthResponse {
    _id: ID
    username: String
    token: String
  }
`;

export default typeDefs;
