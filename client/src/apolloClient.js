import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

// Create the apollo client
const client = new ApolloClient({
  link: new HttpLink({
    uri: import.meta.env.VITE_GRAPHQL_ENDPOINT,
  }),
  cache: new InMemoryCache(),
});

export default client;
