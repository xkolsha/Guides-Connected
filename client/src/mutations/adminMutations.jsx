import { gql } from "@apollo/client";

// Mutation for Admin login
export const ADMIN_LOGIN = gql`
  mutation AdminLogin($username: String!, $password: String!) {
    adminLogin(username: $username, password: $password) {
      _id
      username
      token
    }
  }
`;

// Export the ADMIN_LOGIN mutation
export default {
  ADMIN_LOGIN,
};
