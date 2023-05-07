import express from 'express';
import {
  httpAddNewEvent,
  httpDeleteEvent,
  httpGetAllEvents,
  httpUpdateEvent,
} from '../controllers/events.controller';

const eventsRouter = express.Router();

eventsRouter.get('/', httpGetAllEvents);

eventsRouter.post('/', httpAddNewEvent);

eventsRouter.put('/:id', httpUpdateEvent);

eventsRouter.delete('/:id', httpDeleteEvent);

export default eventsRouter;
