import axios from 'axios';
import { getToken } from '../utils/getToken';

const useAddEvent = async (eventData: any) => {
  console.log(eventData);
  try {
    const token = getToken();
    const response = await axios.post('http://localhost:3001/v1/events', eventData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to add new event');
  }
};

export default useAddEvent;
