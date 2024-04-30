import axios from 'axios';
const BASE_URL = 'http://localhost:8080';

export const findAlerts = async () => {
    try {
      const response = await axios.get(BASE_URL + '/GetServiciosAlertas');
      return response;
    } catch (error) {
      console.error(error);
    }
    return null;
  };