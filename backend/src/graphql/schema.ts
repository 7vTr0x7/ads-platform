import { gql } from "graphql-tag";
import { authSchema } from "./modules/auth/auth.schema.js";
import { userSchema } from "./modules/user/user.schema.js";
import { adSchema } from "./modules/ad/ad.schema.js";
import { categorySchema } from "./modules/category/category.schema.js";

export const typeDefs = gql`
  scalar Date

  type Query
  type Mutation

  ${authSchema}
  ${userSchema}
  ${adSchema}
  ${categorySchema}
`;
