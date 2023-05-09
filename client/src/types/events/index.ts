export interface Event {
  description: string;
  eventDate: string;
  eventName: string;
  id: number;
  userID: string;
}

export type GetEventsResponse = Event[];