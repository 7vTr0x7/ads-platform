import express from "express";
import http from "http";
import cors from "cors";
import bodyParser from "body-parser";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { typeDefs } from "./schema/schema.js";
import { resolvers } from "./resolvers/resolvers.js";
import { createContext } from "vm";
import { connectDB } from "./config/db.js";

export async function startServer() {
  await connectDB();

  const app = express();
  const httpServer = http.createServer(app);

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();

  app.use(
    "/graphql",
    cors(),
    bodyParser.json(),
    expressMiddleware(server, {
      context: createContext,
    }),
  );

  httpServer.listen(process.env.PORT || 4000, () => {
    console.log(
      `🚀 GraphQL Server running at http://localhost:${process.env.PORT || 4000}/graphql`,
    );
  });
}
