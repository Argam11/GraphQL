import { ApolloProvider } from "@apollo/client";
import { RouterProvider } from "react-router-dom";
import client from "apollo/apollo-config";
import router from "routes";

function App() {
  return (
    <ApolloProvider client={client}>
      <RouterProvider router={router} />
    </ApolloProvider>
  );
}

export default App;
