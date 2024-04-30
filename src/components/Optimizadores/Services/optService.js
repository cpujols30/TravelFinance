import axios from 'axios';
const BASE_URL = 'http://localhost:8080';

export const sendPackage = async (paquetes) => {
  try {
    const response = await axios.post(BASE_URL + '/Optimizador',paquetes);
    return response;

  } catch (error) {
    console.error(error);
  }
  return null;
};
