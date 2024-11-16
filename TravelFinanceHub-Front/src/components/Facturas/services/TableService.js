import axios from 'axios'
import Swal from 'sweetalert2'
import toast from 'react-hot-toast';
import { BASE_URL } from '../../../util/Constantes';


export const FindAllFacturas = async () => {
  try {
    const response = await axios.get(BASE_URL + '/AllFacturas')
   
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
// eslint-disable-next-line no-unused-vars
export const handlerDelete= async (id) => {
  swalWithBootstrapButtons.fire({
    title: "¿Seguro que quieres eliminar esta factura",
    text: "No podrás revertir el cambio",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Si, borrar",
    cancelButtonText: "No,cancelar",
    reverseButtons: true
  }).then(async (result) => {
    if (result.isConfirmed) {
      DeleteFactura(id);
      await swalWithBootstrapButtons.fire({
        title: "Factura borrada",
        text: "La factura ha sido borrada",
        icon: "success"
      });
      window.location.reload();
    } else if (
      /* Read more about handling dismissals below */
      result.dismiss === Swal.DismissReason.cancel
    ) {
      await swalWithBootstrapButtons.fire({
        title: "Cancelado",
        text: "La factura no ha sido borrada",
        icon: "error"
      });
    }
  });
}

const DeleteFactura = async (id) => {
  try {
    const url = `${BASE_URL}/DeleteFactura/${id}`; 
    
    const response = await axios.delete(url);
    toast.success('Factura borrada correctamente')

    return response; 
  } catch (error) {
    toast.error('Error al eliminar la factura:', error);
    return null;
  }
}

