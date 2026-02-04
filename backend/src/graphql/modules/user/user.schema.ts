import { gql } from "apollo-server-express";

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
