import { gql } from "apollo-server-express";

export const categorySchema = gql`
  type Category {
    id: ID!
    name: String!
  }

  input CategoryInput {
    name: String!
  }

  extend type Query {
    categories: [Category!]!
  }

  extend type Mutation {
    createCategory(input: CategoryInput!): Category!
  }
`;
