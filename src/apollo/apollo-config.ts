import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:4000/",
  cache: new InMemoryCache({
    addTypename: true,
    resultCaching: true,
    typePolicies: {
      Query: {
        fields: {
          games: {
            keyArgs: ["page"],
          },
        },
      },
    },
  }),
});

export default client;
