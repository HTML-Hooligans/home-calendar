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
}

export default new EventsApi();
