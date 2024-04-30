import axios from 'axios';
const BASE_URL = 'http://localhost:8080';

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