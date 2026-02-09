import { gql } from "@apollo/client";
import { ADS_FRAGMENT } from "./ads.fragment";

export const CREATE_AD = gql`
  mutation CreateAd($input: CreateAdInput!) {
    createAd(input: $input) {
      {
        ...adFields
      }
    }
  }

  ${ADS_FRAGMENT}
`;

export const UPDATE_AD = gql`
  mutation UpdateAd($input: UpdateAdInput!) {
    updateAd(input: $input) {
      {
        ...adFields
      }
    }
  }
  ${ADS_FRAGMENT}
`;
