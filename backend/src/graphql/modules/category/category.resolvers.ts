import { Category } from "../../../models/Category.js";

export const categoryResolvers = {
  Query: {
    categories: async () => Category.find(),
  },
  Mutation: {
    createCategory: async (_: any, { input }: any) => Category.create(input),
  },
};
 