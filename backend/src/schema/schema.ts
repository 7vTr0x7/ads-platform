import { gql } from "graphql-tag";
import { authSchema } from "../graphql/modules/auth/auth.schema.js";
import { userSchema } from "../graphql/modules/user/user.schema.js";
import { adSchema } from "../graphql/modules/ad/ad.schema.js";
import { categorySchema } from "../graphql/modules/category/category.schema.js";

export const typeDefs = gql`
  scalar Date

  type Query
  type Mutation

  ${authSchema}
  ${userSchema}
  ${adSchema}
  ${categorySchema}
`;
