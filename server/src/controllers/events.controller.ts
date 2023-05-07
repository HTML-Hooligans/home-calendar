import { Request, Response } from 'express';
import { Event } from '../models/events.model';

export const httpGetAllEvents = async (req: Request, res: Response) => {
  try {
    const response = await Event.findAll();
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Internal Server Error',
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
      message: 'Internal Server Error',
    });
  }
};

export const httpUpdateEvent = async (req: Request, res: Response) => {
  try {
    const { eventName, eventDate, description } = req.body;
    const { id } = req.params;

    const event = await Event.findByPk(id);
    if (!event) {
      return res.status(404).json({
        message: 'Event not found',
      });
    }

    event.eventName = eventName;
    event.eventDate = eventDate;
    event.description = description;

    await event.save();

    res.status(200).json(event);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Internal Server Error',
    });
  }
};

export const httpDeleteEvent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const event = await Event.findByPk(id);
    if (!event) {
      return res.status(404).json({
        message: 'Event not found',
      });
    }

    await event.destroy();

    res.status(200).json({
      message: 'Event deleted successfully',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Internal Server Error',
    });
  }
};
