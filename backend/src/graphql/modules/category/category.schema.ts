import { gql } from "graphql-tag";

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
