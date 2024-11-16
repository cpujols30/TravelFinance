import axios from 'axios';
import { BASE_URL } from '../../../util/Constantes';


export const findAllCompanies = async () => {
  try {
    const response = await axios.get(BASE_URL + '/AllEmpresas');
    return response;
  } catch (error) {
    console.error(error);
  }
  return null;
};
export const findAllServices = async (id) => {
  try {
      const response = await axios.get(`${BASE_URL}/GetAllServicios`);
    return response
  } catch (error) {
    console.error(error)
    return null
  }
}