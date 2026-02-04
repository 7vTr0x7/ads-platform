import { User } from "../../../models/User.js";

export const userResolvers = {
  Query: {
    users: async () => User.find(),
  },
};
