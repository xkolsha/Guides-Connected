import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

// purpose of this file is to create a new ApolloClient instance and export it so that we can use it in our app
const client = new ApolloClient({
  link: new HttpLink({
    uri: "http://localhost:4000/graphql", // this is the endpoint that we are making requests to
  }),
  cache: new InMemoryCache(),
});

export default client;
