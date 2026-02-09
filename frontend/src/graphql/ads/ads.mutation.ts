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

export const UPDATE_AD = gql`
  mutation UpdateAd($input: UpdateAdInput!) {
    updateAd(input: $input) {
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
