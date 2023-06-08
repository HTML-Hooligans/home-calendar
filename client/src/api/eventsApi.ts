import { getToken } from '../utils/getToken';
import axios from 'axios';
import { GetEventsResponse, NewEvent } from '../types/events';

class EventsApi {
  token = getToken();

  async fetchEvents(id: string) {
    const { data: events }: { data: GetEventsResponse } = await axios.get(
      `http://localhost:3001/v1/events/${id}`,
      {
        headers: {
          Authorization: 'Bearer ' + this.token,
        },
      }
    );

    return events;
  }

  async addEvent(eventData: NewEvent) {
    try {
      const response = await axios.post('http://localhost:3001/v1/events', eventData, {
        headers: {
          Authorization: 'Bearer ' + this.token,
        },
      });
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to add new event');
    }
  }

  async deleteEvent(eventId: number): Promise<void> {
    try {
      await axios.delete<void>(`http://localhost:3001/v1/events/${eventId}`, {
        headers: {
          Authorization: 'Bearer ' + this.token,
        },
      });
    } catch (error) {
      console.error(error);
      throw new Error('Failed to delete event');
    }
  }

  async updateEvent(eventId: number, eventData: Partial<NewEvent>): Promise<Event> {
    try {
      const response = await axios.put(`http://localhost:3001/v1/events/${eventId}`, eventData, {
        headers: {
          Authorization: 'Bearer ' + this.token,
        },
      });
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to update event');
    }
  }
}

export default new EventsApi();
