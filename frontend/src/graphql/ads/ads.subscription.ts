import { gql } from "@apollo/client";

export const Ad_ADDED = gql`
  subscription {
    adAdded {
      id
      title
      description
      price
      owner {
        id
        email
        role
      }
      category {
        id
        name
      }
    }
  }
`;
