import { verifyToken } from "../utils/jwt.js";

export async function createContext({ req }: any) {
  const token = req.headers.authorization?.replace("Bearer ", "");
  let user = null;

  if (token) {
    try {
      user = verifyToken(token);
    } catch {}
  }

  return { user };
}
