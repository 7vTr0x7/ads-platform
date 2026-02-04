import { Ad } from "../../../models/Ad.js";

export const adResolvers = {
  Query: {
    ads: async (_: any, { page = 1, limit = 10 }: any) => {
      return Ad.find()
        .skip((page - 1) * limit)
        .limit(limit)
        .populate("owner")
        .populate("category");
    },
  },
  Mutation: {
    createAd: async (_: any, { input }: any, ctx: any) => {
      if (!ctx.user) throw new Error("Unauthorized");
      return Ad.create({
        ...input,
        owner: ctx.user.id,
        category: input.categoryId,
      });
    },
  },
};
