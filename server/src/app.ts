import "reflect-metadata";

import express, { Application, Request, Response } from "express";
import sequelizeConnection from "./config/config";
import path from "path";
import cors from "cors";
import http from "http";
import api from "./routes/api";

const app: Application = express();

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use("/v1", api);

app.use(express.static(path.join(__dirname, "..", "public")));

app.get("/*", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

const PORT = process.env.PORT || 3001;
const server = http.createServer(app);

async function startServer() {
  try {
    await sequelizeConnection.authenticate();
    await sequelizeConnection.sync();
    server.listen(PORT, () => {
      console.log(`Listening on port ${PORT}...`);
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

void startServer();
