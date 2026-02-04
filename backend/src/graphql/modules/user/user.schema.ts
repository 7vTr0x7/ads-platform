import { gql } from "graphql-tag";

export const userSchema = gql`
  type User {
    id: ID!
    email: String!
    role: String!
  }

  extend type Query {
    users: [User!]!
  }
`;
