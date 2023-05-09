export interface Event {
  description: string;
  eventDate: string;
  eventName: string;
  id: number;
  userID: string | undefined;
}

export type GetEventsResponse = Event[];

export type NewEvent = Omit<Event, 'id'>;
