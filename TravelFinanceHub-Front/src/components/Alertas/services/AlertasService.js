import axios from 'axios';
import { BASE_URL } from '../../../util/Constantes';

export const findAlerts = async () => {
    try {
      const response = await axios.get(BASE_URL + '/GetServiciosAlertas');
      return response;
    } catch (error) {
      console.error(error);
    }
    return null;
  };