import { gql } from "@apollo/client";

export const ADS_FRAGMENT = gql`
  fragment AdFragment on Ad {
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
`;
