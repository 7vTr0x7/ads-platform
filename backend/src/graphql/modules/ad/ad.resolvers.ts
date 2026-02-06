import { Ad } from "../../../models/Ad.js";
import { AD_ADDED } from "../../events.js";
import { pubsub } from "../../pubsub.js";

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

      const ad = await Ad.create({
        ...input,
        owner: ctx.user.id,
        category: input.categoryId,
      });

      // Reload document with populate
      const populatedAd = await Ad.findById(ad._id)
        .populate("owner")
        .populate("category");

      pubsub.publish(AD_ADDED, { adAdded: populatedAd });

      return populatedAd;
    },

    UpdateAd: async (_: any, { id, input }: any, ctx: any) => {
      if (!ctx.user) throw new Error("Unauthorized");

      const ad = await Ad.findByIdAndUpdate(
        id,
        {
          ...input,
        },
        { new: true },
      );

      // Reload document with populate
      const populatedAd = await Ad.findById(ad?._id)
        .populate("owner")
        .populate("category");

      pubsub.publish(AD_ADDED, { adAdded: populatedAd });

      return populatedAd;
    },
  },
};
