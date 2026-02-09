import { gql } from "@apollo/client";
import { ADS_FRAGMENT } from "./ads.fragment";

export const CREATE_AD = gql`
  mutation CreateAd($input: CreateAdInput!) {
    createAd(input: $input) {
      ...AdFragment
    }
  }

  ${ADS_FRAGMENT}
`;

export const UPDATE_AD = gql`
  mutation UpdateAd($id: ID!, $input: UpdateAdInput!) {
    updateAd(id: $id, input: $input) {
      ...AdFragment
    }
  }
  ${ADS_FRAGMENT}
`;
