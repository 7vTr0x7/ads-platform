import type { User } from "@/types/user";
import { createContext } from "react";

interface AuthContextType {
  user: User | null;
  setToken: (token: string) => void;
}
export const AuthContext = createContext<AuthContextType>({
  user: null,
  setToken: () => {},
});
