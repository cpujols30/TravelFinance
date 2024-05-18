import axios from 'axios'
import { BASE_URL } from '../../../util/Constantes';
import toast from 'react-hot-toast';
export const searchHotelByCity = async (city) => {
    try {
      toast.loading('Cargando hoteles de Amadeus')
      const response = await axios.get(`${BASE_URL}/GetHotel/${city}`); 
      toast.dismiss();
      return response; 
    } catch (error) {
      const response =[]
      return response;
    }
  }
  export const searchAIRByCity = async (city) => {
    try {
      toast.loading('Cargando aeropuertos de Amadeus')
      const response = await axios.get(`${BASE_URL}/GetHotel/${city}`); 
      toast.dismiss();
      return response; 
    } catch (error) {
      const response =[]
      return response;
    }
  }