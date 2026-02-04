import bcrypt from "bcryptjs";
import { signToken } from "../../../utils/jwt.js";
import { User } from "../../../models/User.js";

export const authResolvers = {
  Mutation: {
    register: async (_: any, { input }: any) => {
      const hashed = await bcrypt.hash(input.password, 10);
      const user = await User.create({ ...input, password: hashed });
      const token = signToken({ id: user._id, role: user.role });
      return { token, user };
    },
    login: async (_: any, { input }: any) => {
      const user = await User.findOne({ email: input.email });
      if (!user || !user.password)
        throw new Error("User not found or password missing");

      if (!input.password) throw new Error("Password is required");

      const valid = await bcrypt.compare(input.password, user.password);
      if (!valid) throw new Error("Incorrect password");

      const token = signToken({ id: user._id, role: user.role });
      return { token, user };
    },
  },
};
