import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

// Use a different URI for production
const graphqlUri =
  process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_GRAPHQL_URI // Use the production URI in production
    : "http://localhost:4000/graphql"; // Use localhost in development

// Create a new Apollo client
const client = new ApolloClient({
  link: new HttpLink({
    uri: graphqlUri,
  }),
  cache: new InMemoryCache(),
});

export default client;
