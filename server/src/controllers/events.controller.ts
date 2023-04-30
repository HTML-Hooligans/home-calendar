import { Request, Response } from "express";
import { Event } from "../models/events.model";

export const httpGetAllEvents = async (req: Request, res: Response) => {
  try {
    const response = await Event.findAll();
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal Server Error"
    });
  }
};

export const httpAddNewEvent = async (req: Request, res: Response) => {
  try {
    const { userID, eventName, eventDate, description } = req.body;

    const newEvent = await Event.create({
      userID,
      eventName,
      eventDate,
      description,
    });
    res.status(200).json(newEvent);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
