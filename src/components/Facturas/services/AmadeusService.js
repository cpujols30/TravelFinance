import axios from 'axios'
const BASE_URL = 'http://localhost:8080'
export const searchHotelByCity = async (city) => {
    try {
      const response = await axios.get(`${BASE_URL}/GetHotel/${city}`); 
      return response; 
    } catch (error) {
      const response =[]
      return response;
    }
  }
  export const searchAIRByCity = async (city) => {
    try {
      const response = await axios.get(`${BASE_URL}/GetHotel/${city}`); 
      return response; 
    } catch (error) {
      const response =[]
      return response;
    }
  }