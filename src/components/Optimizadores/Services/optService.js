import axios from 'axios';
import { BASE_URL } from '../../../util/Constantes';
import toast from 'react-hot-toast';

export const sendPackage = async (paquetes) => {
  try {

    const response = await axios.post(BASE_URL + '/Optimizador',paquetes);
    return response;

  } catch (error) {
    toast.error('Error al calcular el optimizador.')
    console.error(error);
  }
  return null;
};
