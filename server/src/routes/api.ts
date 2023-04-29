import express from "express";
import eventsRouter from "./events.router";

const api = express.Router();

api.use("/events", eventsRouter);

export default api;