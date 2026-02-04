import express, { Request, Response } from "express";
import http from "http";
import cors from "cors";
import bodyParser from "body-parser";
import { config } from "dotenv";

import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";

import { useServer } from "graphql-ws/use/ws";
import { WebSocketServer } from "ws";
import { makeExecutableSchema } from "@graphql-tools/schema";

import { typeDefs } from "./schema/schema.js";
import { resolvers } from "./resolvers/resolvers.js";
import { connectDB } from "./config/db.js";
import { createContext } from "./context/context.js";

config();

export async function startServer() {
  await connectDB();

  const app = express();
  const httpServer = http.createServer(app);

  // Build schema for WS subscriptions
  const schema = makeExecutableSchema({ typeDefs, resolvers });

  // Apollo Server
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
  await server.start();

  // WebSocket server
  const wsServer = new WebSocketServer({
    server: httpServer,
    path: "/graphql",
  });
  useServer(
    {
      schema,
      context: async (ctx) =>
        createContext({ connectionParams: ctx.connectionParams }),
    },
    wsServer,
  );

  // Express middleware
  app.use(cors());
  app.use(bodyParser.json());
  app.use("/graphql", async (req: Request, res: Response) => {
    const result = await server.executeHTTPGraphQLRequest({
      httpGraphQLRequest: {
        body: req.body,
        headers: req.headers as any,
        method: req.method,
        search: req.url?.split("?")[1] || "",
      },
      context: async () => createContext({ req, res }),
    });

    const body: any = result.body;
    if (body.kind === "single") {
      res.json(body.singleResult);
    } else if (body.kind === "batch") {
      res.json(body.results);
    } else {
      res.status(500).send("Unexpected GraphQL response type");
    }
  });

  httpServer.listen(process.env.PORT || 4000, () => {
    console.log(
      `🚀 Server running at http://localhost:${process.env.PORT || 4000}/graphql`,
    );
    console.log(
      `📡 Subscriptions ready at ws://localhost:${process.env.PORT || 4000}/graphql`,
    );
  });
}

startServer();
