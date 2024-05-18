import { useState, useRef,useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import {addServices, addFactura, getIdLibre} from '../services/ModalService'
import {searchHotelByCity , searchAIRByCity} from '../services/AmadeusService'
import toast from 'react-hot-toast';
import getUser from '../../../service/UserService';
import { sanitizeServicesArray,sanitizeObject} from '../../../util/Funciones';

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
      const factura=sanitizeObject(formProps)
      await addFactura(factura);
    } catch (error) {
      console.log(error)
      alert('Error al añadir la factura');
    }
   try {
    const servicios=sanitizeServicesArray(formProps.servicios)
    await addServices(servicios);

   } catch (error) {
    console.log(error)
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
  if (serviceType === "Vuelo") {
    servicio.Destino = selectedCityAIR === "MAD" ? "España" : 
                      selectedCityAIR === "DXB" ? "Emiratos Árabes Unidos" : 
                      selectedCityAIR === "ORY" ? "Francia" : 
                      selectedCityAIR === "HND" ? "Japón" : 
                      selectedCityAIR === "AMS" ? "Países Bajos" : "";
  }
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

      <Modal show={show} onHide={() => setShow(false)} size="lg" 
      dialogClassName="modal-90w"  aria-label="Modal de Añadir Factura">
        <Modal.Header closeButton>
          <Modal.Title>
            <h1>
            Nueva Factura
              </h1>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form ref={formRef} onSubmit={handleSubmit}>
        <div className="row">
            <div className="col">
              <div className="row">
              <Form.Label>Nombre del cliente</Form.Label>
              </div>
              <Form.Control required type="text" placeholder="Nombre"  name="cliente" />
              <br />
            </div>
            <div className="col">
              <fieldset disabled>
                <div className="row">
                <Form.Label>Nombre del empleado</Form.Label>
                </div>
                <Form.Control type="text" placeholder={EmpleadoActual} name="NombreEmpleado"/>
              </fieldset>
              <fieldset disabled>
                <div className="row">
                <Form.Label>ID de factura</Form.Label>
                </div>
                <Form.Control type="text" placeholder={idLibre} name="facturaId"/>
              </fieldset>
              <br />
            </div>
          </div>          
          <h2>Servicios de factura</h2>
          <hr />
          <div className="row">
          <Form.Label>Tipo de servicio</Form.Label>
          </div>
          <Form.Select name="tipoServicio" value={serviceType} onChange={handleServiceChange}
          aria-label="Selector de tipo de servicio">
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
                      <div className="row">
                      <Form.Label>Seleccionar Ciudad</Form.Label>
                      </div>
                        <Form.Select required value={selectedCityAIR} onChange={handleairport}  name="Ciudad">
                        <option value="">Seleccione</option>
                        <option value="MAD">Madrid</option>
                        <option value="DXB">Dubai</option>
                        <option value="ORY">París</option>
                        <option value="HND">Tokio</option>
                        <option value="AMS">Ámsterdam</option>

                      </Form.Select>
                  </Form.Group>
                  {selectedCityAIR && (
                      <Form.Group controlId="editForm.Destino">
                        <div className="row">
                          <Form.Label>Destino</Form.Label>
                        </div>
                        <Form.Control
                          type="text"
                          placeholder="Destino"
                          value={selectedCityAIR === "MAD" ? "España" : 
                          selectedCityAIR === "DXB" ? "Emiratos Árabes Unidos" : 
                          selectedCityAIR === "ORY" ? "Francia" : 
                          selectedCityAIR === "HND" ? "Japón" : 
                          selectedCityAIR === "AMS" ? "Países Bajos" : ""} 
                          disabled 
                          name="Destino"
                        />
                      </Form.Group>
                    )}
                  {airports.length > 0 && (
                      <Form.Group required controlId="editForm.BuscaHotel">
                        <div className="row">
                        <Form.Label>Buscar Hotel por ciudad</Form.Label>
                        </div>
                      <Form.Select required value={selectedCityAIR} name="Nombreaereopuerto">
                      {airports.map((index) => (
                            <option key={index} value={index}>{index}</option>
                          ))}
                    </Form.Select>
                      </Form.Group>
                     
                    )}
                    </div>
                    </div>
                    <div className="row">
                    <div className="col">
                      <div className="row">
                      <Form.Label>Fecha de Ida</Form.Label>
                      </div>
                    <Form.Control required type="Date" placeholder="FechaIda"  name="FechaIda"/>
                    <br />
                    </div>
                    <div className="col">
                      <div className="row">
                      <Form.Label>Fecha de Vuelta</Form.Label>
                      </div>
                    <Form.Control type="Date" placeholder="FechaVuelta"  name="FechaVuelta"/>
                    <br />
                    </div>
                    </div>                   
                    <div className="row">
                    <div className="col">
                    <Form.Group controlId="editForm.IdentVuelo">
                      <div className="row">
                      <Form.Label>Identificador del Vuelo</Form.Label>
                      </div>
                    <Form.Control required type="text" name="IdentVuelo"/>
                    </Form.Group>
                    </div>
                    <div className="col">
                      <div className="row">
                      <Form.Label>Precio Base</Form.Label>
                      </div>
                    <Form.Control required type="text" placeholder="PrecioBase" name="PrecioBase"/>
                    <br />
                    </div>
                      <div className="col">
                        <div className="row">
                        <Form.Label>Precio Total</Form.Label>
                        </div>
                      <Form.Control required type="text" placeholder="PrecioTotal" name="PrecioTotal"/>
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
          <div className="row">
          <Form.Label>Seleccionar Ciudad</Form.Label>
              </div>
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
            <div className="row">
            <Form.Label>Buscar Hotel por ciudad</Form.Label>
            </div>
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
                <div className="row">
                <Form.Label>Fecha de Ida</Form.Label>
                </div>
                  <Form.Control required type="date"  name="FechaIda"/>
              </Form.Group>
              </div>
              <div className="col">
              <Form.Group controlId="editForm.FechaVuelta">
                <div className="row">
                <Form.Label>Fecha de Vuelta</Form.Label>
                </div>
                  <Form.Control required type="date"  name="FechaVuelta"/>
              </Form.Group>
              </div>
             </div>
              <Form.Group controlId="editForm.NReserva">
                <div className="row">
                <Form.Label>Número de Reserva</Form.Label>
                </div>
                  <Form.Control type="text"  name="NReserva"/>
              </Form.Group>
              <div className="row">
                  <div className="col">
                  <Form.Group controlId="editForm.PrecioBase">
                    <div className="row">
                    <Form.Label>Precio Base</Form.Label>
                    </div>
                  <Form.Control required type="number" step="0.01"  name="PrecioBase"/>
                  </Form.Group>
                  </div>
                  <div className="col">
                  <Form.Group controlId="editForm.PrecioTotal">
                    <div className="row">
                    <Form.Label>Precio Total</Form.Label>
                    </div>
                  <Form.Control required type="number" step="0.01"  name="PrecioTotal"/>
              </Form.Group>
                  </div>
              </div>
          </>
          )}
            {/* Botón de envío y de cancel */}
            <Button variant="secondary" onClick={agregarServicio} style={{marginTop:'2%'}}>
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
