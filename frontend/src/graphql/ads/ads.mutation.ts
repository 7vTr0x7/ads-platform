import { gql } from "@apollo/client";

export const CREATE_AD = gql`
  mutation CreateAd($input: CreateAdInput!) {
    createAd(input: $input) {
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
