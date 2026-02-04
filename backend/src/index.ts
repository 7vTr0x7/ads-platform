import express, { Request, Response } from "express";
import http from "http";
import cors from "cors";
import bodyParser from "body-parser";
import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { typeDefs } from "./schema/schema.js";
import { resolvers } from "./resolvers/resolvers.js";
import { connectDB } from "./config/db.js";

import { config } from "dotenv";

config();

export async function startServer() {
  await connectDB();

  const app = express();
  const httpServer = http.createServer(app);

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();

  app.use(cors());
  app.use(bodyParser.json());

  app.use("/graphql", async (req: Request, res: Response) => {
    const result = await server.executeHTTPGraphQLRequest({
      httpGraphQLRequest: {
        body: req.body,
        headers: req.headers as any, // TS-safe
        method: req.method,
        search: req.url?.split("?")[1] || "",
      },
      context: async () => ({ req, res }),
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
  });
}

startServer();
