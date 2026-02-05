import {
  InMemoryCache,
  HttpLink,
  ApolloLink,
  ApolloClient,
} from "@apollo/client";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { getMainDefinition } from "@apollo/client/utilities";
import { createClient } from "graphql-ws";
import { SetContextLink } from "@apollo/client/link/context"; // <-- updated import

const httpLink = new HttpLink({
  uri: "http://localhost:4000/graphql",
  credentials: "include",
});

const wsLink = new GraphQLWsLink(
  createClient({
    url: "ws://localhost:4000/graphql",
    connectionParams: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  }),
);

const splitLink = ApolloLink.split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink,
);

const authLink = new SetContextLink((prevContext, operation) => {
  const token = localStorage.getItem("token");
  return {
    ...prevContext, // include previous context
    headers: {
      ...prevContext.headers,
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(splitLink),
  cache: new InMemoryCache(),
});
