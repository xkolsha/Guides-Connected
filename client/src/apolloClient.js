import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

// Create the client as outlined in the Apollo docs
const client = new ApolloClient({
  link: new HttpLink({
    uri: process.env.REACT_APP_GRAPHQL_ENDPOINT,
  }),
  cache: new InMemoryCache(),
});

export default client;
