import express, { Application, Request, Response } from 'express';
const path = require("path");
const cors = require("cors");
const http = require("http");
require("dotenv").config();

const app: Application = express();

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "public")));

app.get("/*", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

const PORT = process.env.PORT || 3001;
const server = http.createServer(app);

async function startServer() {
  try {
    server.listen(PORT, () => {
      console.log(`Listening on port ${PORT}...`);
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

startServer();
