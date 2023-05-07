import { getToken } from '../utils/getToken';
import axios from 'axios';
import { Event } from '../types/events';

class EventsApi {
  token = getToken();

  async fetchEvents() {
    const { data: events }: { data: Event[] } = await axios.get('http://localhost:3001/v1/events', {
      headers: {
        Authorization: 'Bearer ' + this.token,
      },
    });

    return events;
  }
}

export default new EventsApi();
