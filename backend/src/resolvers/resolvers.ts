import { adResolvers } from "../graphql/modules/ad/ad.resolvers.js";
import { adSubscription } from "../graphql/modules/ad/ad.subscription.js";
import { authResolvers } from "../graphql/modules/auth/auth.resolvers.js";
import { categoryResolvers } from "../graphql/modules/category/category.resolvers.js";
import { userResolvers } from "../graphql/modules/user/user.resolvers.js";

export const resolvers = {
  Query: {
    ...userResolvers.Query,
    ...adResolvers.Query,
    ...categoryResolvers.Query,
  },
  Mutation: {
    ...authResolvers.Mutation,
    ...adResolvers.Mutation,
    ...categoryResolvers.Mutation,
  },
  Subscription: {
    ...adSubscription.Subscription,
  },
};
