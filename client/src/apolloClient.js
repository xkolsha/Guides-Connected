import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

// purpose of this file is to create a new ApolloClient instance and export it so that we can use it in our app
const client = new ApolloClient({
  link: new HttpLink({
    uri:
      process.env.NODE_ENV === "production"
        ? "https://guides-connected-5d7602b52f90.herokuapp.com/graphql"
        : "http://localhost:4000/graphql",
  }),
  cache: new InMemoryCache(),
});

export default client;
