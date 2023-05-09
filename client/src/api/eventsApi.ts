import { getToken } from '../utils/getToken';
import axios from 'axios';
import { GetEventsResponse } from '../types/events';

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
}

export default new EventsApi();
