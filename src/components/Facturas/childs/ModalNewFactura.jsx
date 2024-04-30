import { useState, useRef,useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import {addServices, addFactura, getIdLibre} from '../services/ModalService'
import {searchHotelByCity , searchAIRByCity} from '../services/AmadeusService'
import toast from 'react-hot-toast';
import getUser from '../../../service/UserService';

function ModalFactura() {
  const [user, setUser] = useState(''); // Estado para almacenar el nombre de usuario
  const [show, setShow] = useState(false);
  const [serviceType, setServiceType] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedCityAIR, setSelectedCityAIR] = useState('');
  const [hotels, setHotels] = useState([]);
  const [airports, setairports] = useState([]);
  const formRef = useRef(null);
  const [servicios, setServicios] = useState([]);
  const [idLibre,setIdLibre] = useState(0);
  const handleServiceChange = (e) => {
    setServiceType(e.target.value);
    // Restablecer el tipo de vuelo y ID de orden de vuelo cada vez que cambie el tipo de servicio
  };

  useEffect(() => {
    const fetchUser = async () => {
        try {
            const userString = window.localStorage.getItem('LoggedActualUser');
            const token = JSON.parse(userString)
            const username = await getUser(token); // Llama a la función getUser y espera por el nombre de usuario
            setUser(username); // Establece el nombre de usuario en el estado
        } catch (error) {
            console.error('Error fetching user:', error);
        }
    };

    fetchUser(); // Ejecuta la función fetchUser cuando el componente se monte
}, []);

  // Se recoge el empleado actual y se le quitan las comillas del json
  let EmpleadoActual = user
  EmpleadoActual = EmpleadoActual.replace(/^"|"$/g, '');

  const handleSubmit = async (e) => {
    e.preventDefault(); // Esto es crucial para prevenir la recarga de la página
    const formData = new FormData(formRef.current);
    const formProps = Object.fromEntries(formData);
    formProps.nombreEmpl = EmpleadoActual;
    const hoy = new Date();
    formProps.Fecha_fac = hoy.toISOString().split('T')[0];    
    formProps.servicios = servicios;
        // eslint-disable-next-line react/prop-types
    formProps.facturaId =idLibre
    try {
      await addFactura(formProps);
    } catch (error) {
      alert('Error al añadir la factura');
    }
   try {
    await addServices(formProps.servicios);

   } catch (error) {
    console.log('Error al añadir el servicio, el identificador debe de ser único');
   }
    // Limpiar el estado y el formulario como sea necesario después de enviar
    setServicios([]);
    setShow(false)
};
  
  useEffect(() => {  
      const loadGetIdlibre= async () => {
        const id = await getIdLibre()
        setIdLibre(id.data);
      }
      loadGetIdlibre();
        }, []);
const agregarServicio = () => {
  const formData = new FormData(formRef.current);
  const servicio = Object.fromEntries(formData);
  servicio.IdFactura =idLibre
  setServicios(serviciosAnteriores => [...serviciosAnteriores, servicio]);

  // Limpiar el formulario para permitir añadir otro servicio
  const campos = [
    'NombreHotel',
    'NReserva',
    'FechaIda',
    'FechaVuelta',
    'PrecioBase',
    'PrecioTotal',
  ];
  campos.forEach(campo => {
    if (formRef.current && formRef.current.elements[campo]) {
      formRef.current.elements[campo].value = "";
    }
  });

  // Vacio  para campos select
  formRef.current.elements.tipoServicio.value = "";
  setServiceType('');
  toast.success('Servicio agregado a la factura')
};
const handleHotelCity = async (event) => {
  setSelectedCityAIR(event.target.value);

  const Citycode = event.target.value;

  setSelectedCity(Citycode);
  const data =await searchHotelByCity(Citycode);
  setHotels(data.data);
}
const handleairport = async (event) => {
  setSelectedCityAIR(event.target.value);

  const Citycode = event.target.value;

  setSelectedCityAIR(Citycode);
  const data =await searchAIRByCity(Citycode);
  setairports(data.data);
}
  return (
    <>
      <Button variant="primary" onClick={() => setShow(true)}>
        Añadir Factura
      </Button>

      <Modal show={show} onHide={() => setShow(false)} size="lg"  dialogClassName="modal-90w" aria-labelledby="example-custom-modal-styling-title">
        <Modal.Header closeButton>
          <Modal.Title>
            Nueva Factura
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form ref={formRef} onSubmit={handleSubmit}>
        <div className="row">
            <div className="col">
              <Form.Label>Nombre del cliente</Form.Label>
              <Form.Control required type="text" placeholder="Nombre"  name="cliente" />
              <br />
            </div>
            <div className="col">
              <fieldset disabled>
                <Form.Label>Nombre del empleado</Form.Label>
                <Form.Control type="text" placeholder={EmpleadoActual} name="NombreEmpleado"/>
              </fieldset>
              <fieldset disabled>
                <Form.Label>ID de factura</Form.Label>
                <Form.Control type="text" placeholder={idLibre} name="facturaId"/>
              </fieldset>
              <br />
            </div>
          </div>          
          <h5>Servicios de factura</h5>
          <hr />
          <Form.Label>Tipo de servicio</Form.Label>
          <Form.Select name="tipoServicio" value={serviceType} onChange={handleServiceChange}>
            <option value="">Seleccione un servicio</option>
            <option value="Vuelo">Vuelo</option>
            <option value="Hotel">Hotel</option>
          </Form.Select>
          <br />

          {serviceType === "Vuelo" && (
           
                  <>
                    <div className="row">
                    <div className="col">
                      <Form.Label>Titular</Form.Label>
                      <Form.Control required type="text" placeholder="Titular"  name="Titular"/>
                      <br/>
                    </div>
                    
                    <div className="col">

                    <Form.Group controlId="editForm.buscaAereopuerto">
                        <Form.Label>Selecciona Ciudad</Form.Label>
                        <Form.Select required value={selectedCityAIR} onChange={handleairport}  name="Destino">
                        <option value="">Seleccione</option>
                        <option value="MAD">Madrid</option>
                        <option value="DXB">Dubai</option>
                        <option value="ORY">París</option>
                        <option value="HND">Tokio</option>
                        <option value="AMS">Ámsterdam</option>

                      </Form.Select>
                  </Form.Group>
                  {airports.length > 0 && (
                      <Form.Group required controlId="editForm.BuscaHotel">
                      <Form.Label>Buscar Hotel por ciudad</Form.Label>
                      <Form.Select required value={selectedCityAIR} name="Nombreaereopuerto">
                      {airports.map((index) => (
                            // Usar el índice como key y value podría no ser ideal, pero es un enfoque práctico aquí
                            <option key={index} value={index}>{index}</option>
                          ))}
                    </Form.Select>
                      </Form.Group>
                    )}
                    </div>
                    </div>
                    <div className="row">
                    <div className="col">
                      <Form.Label>Fecha de Ida</Form.Label>
                    <Form.Control required type="Date" placeholder="FechaIda"  name="FechaIda"/>
                    <br />
                    </div>
                    <div className="col">
                      <Form.Label>Fecha de vuelta</Form.Label>
                    <Form.Control type="Date" placeholder="FechaVuelta"  name="FechaVuelta"/>
                    <br />
                    </div>
                    </div>                   
                    <div className="row">
                    <div className="col">
                    <Form.Group controlId="editForm.IdentVuelo">
                    <Form.Label>Identificador del Vuelo</Form.Label>
                    <Form.Control required type="text" name="IdentVuelo"/>
                    </Form.Group>
                    </div>
                      <div className="col">
                      <Form.Label>Precio Total</Form.Label>
                      <Form.Control required type="text" placeholder="PrecioTotal" name="PrecioTotal"/>
                      <br />
                      </div>
                    <div className="col">
                    <Form.Label>Precio Base</Form.Label>
                    <Form.Control required type="text" placeholder="PrecioBase" name="PrecioBase"/>
                    <br />
                    </div>
                   
                    </div>
                  
                  </>
          )}

          {serviceType === "Hotel" && (
          <>
          <div className="row"> 
          <div className="col">
          <Form.Group controlId="editForm.Titular">
                  <Form.Label>Titular</Form.Label>
                  <Form.Control required type="text" name="Titular"/>
              </Form.Group>
          </div>
          <div className="col">
          <Form.Group controlId="editForm.BuscaHotel">
                  <Form.Label>Selecciona hotel</Form.Label>
                  <Form.Select required value={selectedCity} onChange={handleHotelCity}>
                  <option value="">Seleccione</option>
                  <option value="MAD">Madrid</option>
                  <option value="DXB">Dubai</option>
                  <option value="ORY">París</option>
                  <option value="HND">Tokio</option>
                  <option value="AMS">Ámsterdam</option>

                  </Form.Select>
              </Form.Group>
          </div>
          <div className="col">
        {/* Selector de Hotel */}
        {hotels.length > 0 && (
          <Form.Group required controlId="editForm.BuscaHotel">
          <Form.Label>Buscar Hotel por ciudad</Form.Label>
          <Form.Select required value={selectedCity} name="NombreHotel">
          {hotels.map((index) => (
                // Usar el índice como key y value podría no ser ideal, pero es un enfoque práctico aquí
                <option key={index} value={index}>{index}</option>
              ))}
         </Form.Select>
          </Form.Group>
        )}
          </div>
          </div>
             <div className="row">
              <div className="col">
              <Form.Group controlId="editForm.FechaIda">
                  <Form.Label>Fecha de Ida</Form.Label>
                  <Form.Control required type="date"  name="FechaIda"/>
              </Form.Group>
              </div>
              <div className="col">
              <Form.Group controlId="editForm.FechaVuelta">
                  <Form.Label>Fecha de Vuelta</Form.Label>
                  <Form.Control required type="date"  name="FechaVuelta"/>
              </Form.Group>
              </div>
             </div>
              <Form.Group controlId="editForm.NReserva">
                  <Form.Label>Número de Reserva</Form.Label>
                  <Form.Control type="text"  name="NReserva"/>
              </Form.Group>
              <div className="row">
                  <div className="col">
                  <Form.Group controlId="editForm.PrecioBase">
                  <Form.Label>Precio Base</Form.Label>
                  <Form.Control required type="number" step="0.01"  name="PrecioBase"/>
                  </Form.Group>
                  </div>
                  <div className="col">
                  <Form.Group controlId="editForm.PrecioTotal">
                  <Form.Label>Precio Total</Form.Label>
                  <Form.Control required type="number" step="0.01"  name="PrecioTotal"/>
              </Form.Group>
                  </div>
              </div>
          </>
          )}
            {/* Botón de envío y de cancel */}
            <Button variant="secondary" onClick={agregarServicio}>
              Agregar Servicio
            </Button>

            <div className="container d-flex justify-content-end">
            <Button className="btn-danger BotonCancelar" onClick={() => setShow(false)}>
            Cancelar 
            </Button>
            <Button variant="success" type="submit" >
            Finalizar 
            </Button>
            </div>
           

          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ModalFactura;
