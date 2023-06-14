import { getToken } from '../utils/getToken';
import axios from 'axios';
import { GetEventsResponse, NewEvent, Event } from '../types/events';

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

  async deleteEvent(eventId: number) {
    try {
      await axios.delete(`http://localhost:3001/v1/events/${eventId}`, {
        headers: {
          Authorization: 'Bearer ' + this.token,
        },
      });
    } catch (error) {
      console.error(error);
      throw new Error('Failed to delete event');
    }
  }

  async updateEvent(updateCurrentEditedEvent: Event) {
    try {
      const { id, eventName, description } = updateCurrentEditedEvent;
      const updatedData = { eventName, description };

      const response = await axios.put(`http://localhost:3001/v1/events/${id}`, updatedData, {
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
