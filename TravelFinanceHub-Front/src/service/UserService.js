import axios from 'axios'
import toast from 'react-hot-toast';
import {BASE_URL} from '../util/Constantes'

export const login = async credentials => {
  const { username, password } = credentials
  const token = btoa(`${username}:${password}`) // Codifica las credenciales en Base64
  const config = {
    headers: {
      Authorization: `Basic ${token}` // Agrega las credenciales codificadas al encabezado de autorización
    }
  }

  try {
    toast.loading('Iniciando sesión...'); // Muestra una notificación de carga
    const { data } = await axios.post(BASE_URL + '/secure', null, config)
    toast.dismiss();
      toast.success('Bienvenido'); // Muestra una notificación de éxito

    return data
    
  } catch (error) {
    toast.dismiss();
    // Verifica si el error tiene una respuesta y un código de estado
    if (error.response && error.response.status) {
      const statusCode = error.response.status;
      if (statusCode === 401) {
        // Credenciales incorrectas
        toast.error('Credenciales incorrectas');
      } 
    } else {
      toast.dismiss();
      // Error al realizar la petición, pero no está relacionado con una respuesta HTTP
      toast.error('Error en la solicitud. Verifica conexión con el servidor');
    }
    throw error.response ? error.response.data : new Error('Error desconocido en el login');

  }
}
export const getUser = async (token) => {
  // Recuperar el token del almacenamiento local
   if (!token) {
      return null;
  }

  const config = {
      headers: {
          'Content-Type': 'application/json'
      }
  };

  // Preparar el cuerpo de la solicitud con el token
  const body = {
      token: token
  };

  try {
      const response = await axios.post(BASE_URL + '/GetUser', body, config);
      // Suponemos que el endpoint devuelve directamente el nombre de usuario
      const username = response.data;

      return username;
  } catch (error) {
      if (error.response) {
          // Manejo basado en el código de estado HTTP
          switch (error.response.status) {
              case 401:
                  toast.error('Token inválido o expirado. Por favor, inicie sesión de nuevo.');
                  break;
              default:
                  toast.error('Error al obtener el usuario.');
          }
      } else {
          toast.error('Error en la conexión al servidor.');
      }

      return null; // Devuelve null en caso de error
  }
}

export const GetAlluser = async (token) =>{
  // Recuperar el token del almacenamiento local
  if (!token) {
    return null;
}

const config = {
    headers: {
        'Content-Type': 'application/json'
    }
};

// Preparar el cuerpo de la solicitud con el token
const body = {
    token: token
};

try {
    const response = await axios.post(BASE_URL + '/GetAlluser', body, config);
    // Suponemos que el endpoint devuelve directamente el nombre de usuario
    const username = response.data;

    return username;
} catch (error) {
    if (error.response) {
        // Manejo basado en el código de estado HTTP
        switch (error.response.status) {
            case 401:
                toast.error('Token inválido o expirado. Por favor, inicie sesión de nuevo.');
                break;
            default:
                toast.error('Error al obtener el usuario.');
        }
    } else {
        toast.error('Error en la conexión al servidor.');
    }

    return null; // Devuelve null en caso de error
}
}

export default getUser;