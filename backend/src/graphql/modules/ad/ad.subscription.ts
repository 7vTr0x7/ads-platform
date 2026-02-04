import { AD_ADDED } from "../../events.js";
import { pubsub } from "../../pubsub.js";

export const adSubscription = {
  Subscription: {
    adAdded: {
      subscribe: () => pubsub.asyncIterableIterator([AD_ADDED]),
    },
  },
};
