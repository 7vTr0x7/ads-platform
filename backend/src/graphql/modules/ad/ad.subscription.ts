import { AD_ADDED, AD_UPDATED } from "../../events.js";
import { pubsub } from "../../pubsub.js";

export const adSubscription = {
  Subscription: {
    adAdded: {
      subscribe: () => pubsub.asyncIterableIterator([AD_ADDED]),
    },
    adUpdated: {
      subscribe: () => pubsub.asyncIterableIterator([AD_UPDATED]),
    },
  },
};
