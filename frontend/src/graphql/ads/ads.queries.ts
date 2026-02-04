import { gql } from "@apollo/client";

export const GET_ADS = gql`
  query Ads($page: Int!, $limit: Int!) {
    ads(page: $page, limt: $limit) {
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
