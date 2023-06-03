export interface Event {
  description: string;
  eventDate: string;
  eventName: string;
  id: number;
  userID: string;
}

export type GetEventsResponse = Event[];

export type NewEvent = Omit<Event, 'id'>;

export type EventForm = Omit<NewEvent, 'userID'>;
