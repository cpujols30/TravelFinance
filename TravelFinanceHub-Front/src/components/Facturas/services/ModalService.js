import axios from 'axios'
import Swal from 'sweetalert2'
import toast from 'react-hot-toast';
import { BASE_URL } from '../../../util/Constantes';

export const findServices = async (id) => {
    try {
        const response = await axios.get(`${BASE_URL}/GetServicios/${id}`);
      return response
    } catch (error) {
      console.error(error)
      return null
    }
  }
  // Añadir servicios
  export const addServices = async (services) => { 
    // Filtrar servicios de hotel
    const serviciosHotel = services.filter(service => service.tipoServicio === 'Hotel');
    // Filtrar servicios de vuelo
    const serviciosVuelo = services.filter(service => service.tipoServicio === 'Vuelo');

    try {
        // Enviar servicios de hotel al backend
        const responsesHotel = await Promise.all(serviciosHotel.map(servicioHotel =>
            axios.post(`${BASE_URL}/addServiceHotel`, servicioHotel)
        ));
        // Enviar servicios de vuelo al backend
        const responsesVuelo = await Promise.all(serviciosVuelo.map(servicioVuelo =>
            axios.post(`${BASE_URL}/addServiceVuelo`, servicioVuelo)
        ));

        return { serviciosHotel: responsesHotel, serviciosVuelo: responsesVuelo };
    } catch (error) {
        toast.error("Error agregando servicios:", error);
        return null;
    }
};
export const addFactura = async (factura) => {
  // Encapsula la llamada a Axios con toast.promise
  await toast.promise(
    axios.post(`${BASE_URL}/AddFactura`, factura), 
    {
      loading: 'Agregando factura...', // Mensaje de carga
      success: 'Factura agregada correctamente', // Mensaje de éxito
      error: 'Error al agregar la factura', // Mensaje de error
    }
  );
}
export const editFactura = async (factura) => {
  // Encapsula la llamada a Axios con toast.promise
  try {
    axios.put(`${BASE_URL}/UpdateFactura`, factura)

  } catch (error) {
    console.log(error)
    
  }
}

  export const ModifyServiceHotel = async (service) => {
    try {
        const response = await axios.put(`${BASE_URL}/UpdateServicioHotel`,service);
        toast.success('Servicio actualizado,para ver los cambios recargue la página');
      return response
    } catch (error) {
      toast.error(' Error al actualizar el servicio');
      console.error(error)
      return null
    }
  }
  export const ModifyServiceViaje = async (service) => {
    try {
        const response = await axios.put(`${BASE_URL}/UpdateServicioViaje`,service);
        toast.success('Servicio actualizado,para ver los cambios recargue la página');
      return response
    } catch (error) {
      toast.error(' Error al actualizar el servicio');
      console.error(error)
      return null
    }
  }
  export const getIdLibre = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/GetIdFactura`);
      return response
    } catch (error) {
      console.error(error)
      return null
    }
  }

const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: "btn btn-success",
    cancelButton: "btn btn-danger"
  },
  buttonsStyling: false
});
  export const DeleteServicioVuelo= async (service) => {
    swalWithBootstrapButtons.fire({
      title: "¿Seguro que quieres eliminar este servicio",
      text: "No podrás revertir el cambio",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Si, borrar",
      cancelButtonText: "No,cancelar",
      reverseButtons: true
    }).then(async (result) => {
      if (result.isConfirmed) {
        DeleteSV(service);
        await swalWithBootstrapButtons.fire({
          title: "Servicio borrado",
          text: "El servicio ha sido borrado",
          icon: "success"
        });
        window.location.reload();
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        await swalWithBootstrapButtons.fire({
          title: "Cancelado",
          text: "El servicio no se ha borrado",
          icon: "error"
        });
      }
    });
  }
  export const DeleteSV = async (service) => {
    try {
      const response = await axios.delete(`${BASE_URL}/DeleteServicioVuelo`,{ data: service }); 
      return response; 
    } catch (error) {
      console.error('Error al eliminar el servicio:', error);
      return null;
    }
  }
  export const DeleteServicioHotel= async (service) => {
    swalWithBootstrapButtons.fire({
      title: "¿Seguro que quieres eliminar este servicio",
      text: "No podrás revertir el cambio",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Si, borrar",
      cancelButtonText: "No,cancelar",
      reverseButtons: true
    }).then(async (result) => {
      if (result.isConfirmed) {
        DeleteSH(service);
        await swalWithBootstrapButtons.fire({
          title: "Servicio borrado",
          text: "El servicio ha sido borrado",
          icon: "success"
        });
        window.location.reload();
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        await swalWithBootstrapButtons.fire({
          title: "Cancelado",
          text: "El servicio no se ha borrado",
          icon: "error"
        });
      }
    });
  }
  export const DeleteSH = async (service) => {
    try {
      const response = await axios.delete(`${BASE_URL}/DeleteServicioHotel`,{ data: service }); 
      return response; 
    } catch (error) {
      console.error('Error al eliminar el servicio:', error);
      return null;
    }
  }