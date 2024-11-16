import axios from 'axios';
import { BASE_URL } from '../../../util/Constantes';
import toast from 'react-hot-toast';
export const findAllChanges = async () => {
  try {
    toast.loading('Cargando Historial de cambios...')
    const response = await axios.get(BASE_URL + '/GetCambios');
    toast.dismiss()
    return response;
  } catch (error) {
    toast.error('Error al carhar el historial de cambios')
    console.error(error);
  }
  return null;
};
