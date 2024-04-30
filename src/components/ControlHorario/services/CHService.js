import axios from 'axios'
import toast from 'react-hot-toast';

const BASE_URL = 'http://localhost:8080'

export const ComprobarHorario = (currentTime) =>{
    const [hora, minutos] = currentTime.split(':').map(Number); // Convierte las horas y minutos a números
    const horaInicioPermitida = 9; // 9:00 AM
    const horaFinPermitida = 18; // 6:00 PM
    const minutosFinPermitidos = 0; // 6:00PM
     // Verifica si es antes de las 9:00 AM
      if (hora < horaInicioPermitida) {

        return 1;
      }
      if (hora > horaFinPermitida ) { // fuera de horario

        return -1;
      }
    
      // Verifica si es después de las 9:00 AM y antes de las 6:30 PM
      if (hora >= horaInicioPermitida && (hora < horaFinPermitida 
        || (hora === horaFinPermitida && minutos <= minutosFinPermitidos))) {
    
        return 2;
      }

}
export const findAllLogs = async () => {
    try {
      const response = await axios.get(BASE_URL + '/logs')
      return response
    } catch (error) {
      console.error(error)
    }
    return null
  }
  export const SendLog = async (logUser) => {
    try {
      const response = await axios.post(BASE_URL + '/recivelog', logUser)
      toast.success('Entrada registrada con exito')
      return response
    } catch (error) {
      toast.error('Error al registrar la salida')
      return null
    }
  }
  export const FinalizeLogs = async (logUser) => {
    try {
      const response = await axios.post(BASE_URL + '/recivelog', logUser)
      toast.success('Entrada registrada con exito')
      return response
    } catch (error) {
      toast.error('Error al registrar la salida')
      return null
    }
  }