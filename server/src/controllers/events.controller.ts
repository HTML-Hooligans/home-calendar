import { Request, Response } from "express";
import { Event } from "../models/events.model";

export const  httpGetAllEvents = async (req: Request, res: Response) => {
    try {
        const events = await Event.findAll();
        res.json(events);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const httpAddNewEvent = async (req: Request, res: Response) => {
    try {
        const newEvent = await Event.create({
            userID: req.body.userID,
            eventName: req.body.eventName,
            eventDate: req.body.eventDate,
            description: req.body.description,
        });
        res.json(newEvent);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};