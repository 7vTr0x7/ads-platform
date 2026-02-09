import { gql } from "graphql-tag";

export const adSchema = gql`
  type Ad {
    id: ID!
    title: String!
    description: String
    price: Float!
    isActive: Boolean!
    owner: User!
    category: Category!
  }

  input CreateAdInput {
    title: String!
    description: String
    price: Float!
    categoryId: ID!
  }
  input UpdateAdInput {
    title: String
    description: String
    price: Float
    categoryId: ID
  }

  extend type Query {
    ads(page: Int, limit: Int): [Ad!]!
  }

  extend type Mutation {
    createAd(input: CreateAdInput!): Ad!
    updateAd(id: ID!, input: UpdateAdInput!): Ad!
    deleteAd(id: ID!): Ad!
  }

  type Subscription {
    adAdded: Ad!
    adUpdated: Ad!
  }
`;
