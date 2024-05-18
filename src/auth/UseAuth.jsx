import { useState, useEffect } from 'react'
import axios from 'axios'
import { BASE_URL } from '../util/Constantes'

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null)

  useEffect(() => {
    const validateToken = async () => {
      const userString = window.localStorage.getItem('LoggedActualUser')
      if (!userString) {
        setIsAuthenticated(false)
        return
      }

      try {
        const token = JSON.parse(userString)
        const response = await axios.post(`${BASE_URL}/validate-token`, { token })
        setIsAuthenticated(response.data !== false)
      } catch (error) {
        console.error('Error al validar el token:', error)
        window.localStorage.removeItem('LoggedActualUser');
        setIsAuthenticated(false)
      }
    }

    validateToken()
  }, [])

  return isAuthenticated
}
