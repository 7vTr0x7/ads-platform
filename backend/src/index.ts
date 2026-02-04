import express from "express";
import http from "http";
import dotenv from "dotenv";
dotenv.config();

import { connectDB } from "./config/db.js";

export async function startServer() {
  await connectDB();

  const app = express();
  const httpServer = http.createServer(app);

  httpServer.listen(4000, () => {
    console.log("🚀 GraphQL Server running at http://localhost:4000/graphql");
  });
}

startServer();
