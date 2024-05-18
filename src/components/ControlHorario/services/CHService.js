import axios from 'axios'
import toast from 'react-hot-toast';
import { BASE_URL } from '../../../util/Constantes';

export const ComprobarHorario = (currentTime) =>{
    const [hora, minutos] = currentTime.split(':').map(Number); // Convierte las horas y minutos a números
    const horaInicioPermitida = 9; // 9:00 AM
    const horaFinPermitida = 17; // 5:00 PM
    const minutosFinPermitidos = 0; // 5:00PM
     // Verifica si es antes de las 9:00 AM
      if (hora < horaInicioPermitida && hora>=8) {

        return 1;
      }
      if (hora >= horaFinPermitida ) { // fuera de horario

        return -1;
      }
    
      // Verifica si es después de las 9:00 AM y antes de las 17 PM
      if (hora >= horaInicioPermitida && (hora < horaFinPermitida 
        || (hora === horaFinPermitida && minutos <= minutosFinPermitidos))) {
    
        return 2;
      }

}
export const findAllLogs = async () => {
    try {
      toast.loading('Cargando registros...');
      const response = await axios.get(BASE_URL + '/logs')
      toast.dismiss();
      return response
    } catch (error) {
      toast.error('Error al cargar los registros');
      console.error(error)
    }
    return null
  }
  export const SendLog = async (logUser) => {
    try {
      toast.loading('Registrando Entrada...');
      const response = await axios.post(BASE_URL + '/recivelog', logUser)
      toast.dismiss();
      toast.success('Entrada registrada con exito,recarga la página para ver los cambios.')
      return response
    } catch (error) {
      toast.error('Error al registrar la entrada')
      return null
    }
  }
  export const FinalizeLogs = async (logUser) => {
    try {
      toast.loading('Registrando Salida...');
      const response = await axios.post(BASE_URL + '/recivelog', logUser)
      toast.dismiss();
      toast.success('Salida registrada con exito, recarga la página para ver los cambios.')
      return response
    } catch (error) {
      toast.error('Error al registrar la salida')
      return null
    }
  }