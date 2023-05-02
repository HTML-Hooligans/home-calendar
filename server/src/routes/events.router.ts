import express from 'express';
import { httpAddNewEvent, httpGetAllEvents } from '../controllers/events.controller';

const eventsRouter = express.Router();

eventsRouter.get('/', httpGetAllEvents);

eventsRouter.post('/', httpAddNewEvent);

export default eventsRouter;
