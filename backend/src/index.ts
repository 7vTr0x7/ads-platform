import { config } from "dotenv";
config();

import express from "express";
import http from "http";
import cors from "cors";
import cookieParser from "cookie-parser";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { ApolloServerPluginLandingPageLocalDefault } from "@apollo/server/plugin/landingPage/default";

import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/use/ws";

import { typeDefs } from "./schema/schema.js";
import { resolvers } from "./resolvers/resolvers.js";
import { createContext } from "./context/context.js";
import { connectDB } from "./config/db.js";

const app = express();
const schema = makeExecutableSchema({ typeDefs, resolvers });
const httpServer = http.createServer(app);

const wsServer = new WebSocketServer({
  server: httpServer,
  path: "/graphql",
});

const serverCleanup = useServer(
  {
    schema,
    context: async (ctx) => {
      const auth = ctx.connectionParams?.Authorization as string | undefined;
      const token = auth?.replace("Bearer ", "");
      let user = null;

      if (token) {
        try {
          user = (await import("./utils/jwt.js")).verifyToken(token);
        } catch {}
      }

      return { user };
    },
  },
  wsServer,
);

const apolloServer = new ApolloServer({
  schema,
  plugins: [
    ApolloServerPluginLandingPageLocalDefault(),
    {
      async serverWillStart() {
        return {
          async drainServer() {
            await serverCleanup.dispose();
          },
        };
      },
    },
  ],
});

await connectDB();
await apolloServer.start();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use(cookieParser());
app.use(express.json());

app.use(
  "/graphql",
  expressMiddleware(apolloServer, {
    context: async ({ req }) => createContext({ req }),
  }),
);

const PORT = process.env.PORT || 4000;
httpServer.listen(PORT);
