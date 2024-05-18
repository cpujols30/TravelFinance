import React, { useContext, useEffect, useState, useRef } from 'react';
import { idContext } from '../../../Contexts/ContextFactura';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { findServices,ModifyServiceHotel, ModifyServiceViaje, 
  DeleteServicioVuelo, DeleteServicioHotel, addServices ,editFactura} from '../services/ModalService';
import {searchHotelByCity , searchAIRByCity} from '../services/AmadeusService'
import { sanitizeObject, sanitizeServicesArray} from '../../../util/Funciones';
import toast from 'react-hot-toast';
import '../styles/Modalstyles.css'
// eslint-disable-next-line react/prop-types
function ModalEditFactura({ setShowModalEdit }) {
    const [selectedCity, setSelectedCity] = useState('');
    const [services, setServices] = useState([]);
    const [editService, setEditService] = useState(null); // Cambio a almacenar el servicio completo
    const [showAddServiceForm, setShowAddServiceForm] = useState(false);
    const [serviceType, setServiceType] = useState('');
    const [airports, setairports] = useState([]);
    const [selectedCityAIR, setSelectedCityAIR] = useState('');
    const [hotels, setHotels] = useState([]);
    const props = useContext(idContext);
    const formRef = useRef(null);
    
    const toggleAddServiceForm = () => {
      setEditService(false)
        setShowAddServiceForm(!showAddServiceForm);
      };
      
    useEffect(() => {
        const loadServices = async () => {
            try {
                // eslint-disable-next-line react/prop-types
                const data = await findServices(props.factura.facturaId);
                setServices(data.data);
            } catch (error) {
                console.error("Error al cargar los servicios:", error);
            }
        };

        loadServices();
    // eslint-disable-next-line react/prop-types
    }, [props.factura.facturaId]);

    // Cambio para manejar el servicio completo para edición
    const handleEditClick = (servicio) => {
        setShowAddServiceForm(false);
        setEditService(servicio);
    };
    const handleDeleteService = async (servicio) =>{
        if (Object.prototype.hasOwnProperty.call(servicio, 'nombreHotel')) {
            DeleteServicioHotel(servicio);
        } else if (Object.prototype.hasOwnProperty.call(servicio, 'identVuelo')) {
            DeleteServicioVuelo(servicio);
        }
    }
    const actualizarServicio = async (e) =>{
        e.preventDefault(); 
        const formData = new FormData(formRef.current);
        const formProps = Object.fromEntries(formData);
        if(formProps.NombreHotel){
            // eslint-disable-next-line react/prop-types
            formProps.IdFactura = props.factura.facturaId
            const FinalformProps=sanitizeObject(formProps);
            await ModifyServiceHotel(FinalformProps);
        }
        if(formProps.IdentVuelo){
            // eslint-disable-next-line react/prop-types
            formProps.IdFactura = props.factura.facturaId
            const FinalformProps=sanitizeObject(formProps);
            await ModifyServiceViaje(FinalformProps);
        }
        setEditService(false);

    }
    const handleSubmit = async (e) => {
        e.preventDefault(); // Recarga de página
        const formData = new FormData(formRef.current);
        const formProps = Object.fromEntries(formData);
        const updatefactura ={
            // eslint-disable-next-line react/prop-types
            facturaId:props.factura.facturaId,
            cliente:formProps.Cliente
        }
        const finalFactura=sanitizeObject(updatefactura)
        await editFactura(finalFactura);
        setShowModalEdit(false);
      };

      const agregarServicio = async () => {
        const formData = new FormData(formRef.current);
        const servicio = Object.fromEntries(formData);

        // eslint-disable-next-line react/prop-types
        servicio.IdFactura =props.factura.facturaId;
        setServices(serviciosAnteriores => [...serviciosAnteriores, servicio]);
      
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
      const handleServiceChange = (e) => {
        setServiceType(e.target.value);
        // Restablecer el tipo de vuelo y ID de orden de vuelo cada vez que cambie el tipo de servicio
      };
      const cancelarServicio = () =>{
        setShowAddServiceForm(false)
      }
      const saveFactura = async () =>{
       
        try {
             const Finalservices=sanitizeServicesArray(services);
            await addServices(Finalservices);
            toast.success('La factura ha sido actualizada correctamente')
         
        } catch (error) {
            console.log(error)
          toast.error('Ha habido un problema al actualizar la factura')
        }
      }
      const handleairport = async (event) => {
        setSelectedCityAIR(event.target.value);
      
        const Citycode = event.target.value;
      
        setSelectedCityAIR(Citycode);
        const data =await searchAIRByCity(Citycode);
        setairports(data.data);
      }
      const handleHotelCity = async (event) => {
        setSelectedCityAIR(event.target.value);
      
        const Citycode = event.target.value;
      
        setSelectedCity(Citycode);
        const data =await searchHotelByCity(Citycode);
        setHotels(data.data);
      }
    
    return (
        <>
            <Modal show={true} onHide={() => setShowModalEdit(false)} 
            dialogClassName="modal-90w" aria-labelledby="example-custom-modal-styling-title" size="lg"
            aria-label="Modal de editar factura">
                <Modal.Header closeButton>
                    <Modal.Title> <h1>
                    Modificación de factura
                        </h1></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form ref={formRef} onSubmit={handleSubmit}>
                        <fieldset >
                            <Form.Label>Cliente</Form.Label>
                             
                            <Form.Control type="text"placeholder="Cliente"
                            // eslint-disable-next-line react/prop-types
                            name="Cliente" defaultValue={props.factura.cliente} />
                        </fieldset>
                        <hr />

                        <div className="row">
                        <div className="col">
                        <h2>Servicios de la factura</h2>
                        </div>
                        <div className="col d-flex justify-content-end">
                        <Button variant="primary" onClick={toggleAddServiceForm} className='BotonIncluirMasservicios'>
                            Incluir más servicios
                            </Button>   
                        </div>
                        </div>

                        <table className='table table-striped datatable_users'>
                            <thead className='EncabezadoTabla'>
                                <tr>
                                    <th>Titular</th>
                                    <th>Tipo de servicio</th>
                                    <th>Identificador</th>
                                    <th>Opciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {services.map((servicio, index) => (
                                    <tr key={index}>
                                        <td>{servicio.Titular}</td>
                                        <td>{servicio.NombreHotel ? "Reserva de Hotel" : "Reserva de Vuelo"}</td>
                                        <td>{servicio.NReserva || servicio.IdentVuelo}</td>
                                        <td>
                                            <Button className="btn btn-sm btn-primary edit-btn" 
                                            variant="primary" size="sm" onClick={() => handleEditClick(servicio)}
                                            title="Editar">
                                            <i className="fa-solid fa-pencil"></i>
                                            </Button>
                                            <Button className ="btn btn-sm btn-danger delete-btn" 
                                            variant="primary" size="sm" onClick={() => handleDeleteService(servicio)}
                                            title="Eliminar">
                                            <i className="fa-solid fa-trash "></i>
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {editService && editService.NombreHotel && (
                            <>
                            <div className="row"> 
                            <div className="col">
                            <Form.Group controlId="editForm.Titular">
                                <div className="row">
                                <Form.Label>Titular</Form.Label>
                                </div>
                                    <Form.Control type="text" 
                                    defaultValue={editService.Titular} name="Titular"/>
                                </Form.Group>
                            </div>
                            <div className="col">
                            <Form.Group controlId="editForm.NombreHotel">
                                <div className="row">
                                <Form.Label>Nombre del Hotel</Form.Label>
                                </div>
                                    <Form.Control type="text" 
                                    defaultValue={editService.NombreHotel} name="NombreHotel"/>
                                </Form.Group>
                            </div>
                            </div>
                               <div className="row">
                                <div className="col">
                                <Form.Group controlId="editForm.FechaIda">
                                    <div className="row">
                                    <Form.Label>Fecha de Ida</Form.Label>
                                    </div>
                                    <Form.Control type="date" 
                                    defaultValue={editService.FechaIda ? 
                                    editService.FechaIda.split('T')[0] : ''} name="FechaIda"/>
                                </Form.Group>
                                </div>
                                <div className="col">
                                <Form.Group controlId="editForm.FechaVuelta">
                                    <div className="row">
                                    <Form.Label>Fecha de Vuelta</Form.Label>
                                    </div>
                                    <Form.Control type="date" 
                                    defaultValue={editService.FechaVuelta ? 
                                    editService.FechaVuelta.split('T')[0] : ''} name="FechaVuelta"/>
                                </Form.Group>
                                </div>
                               </div>
                                <Form.Group controlId="editForm.NReserva">
                                    <div className="row">
                                    <Form.Label>Número de Reserva</Form.Label>
                                    </div>
                                    <Form.Control type="text" defaultValue={editService.NReserva} name="NReserva"/>
                                </Form.Group>
                                <div className="row">
                                    <div className="col">
                                    <Form.Group controlId="editForm.PrecioBase">
                                        <div className="row">
                                        <Form.Label>Precio Base</Form.Label>
                                        </div>
                                    <Form.Control type="number" step="0.01" 
                                    defaultValue={editService.PrecioBase} name="PrecioBase"/>
                                    </Form.Group>
                                    </div>
                                    <div className="col">
                                    <Form.Group controlId="editForm.PrecioTotal">
                                        <div className="row">
                                        <Form.Label>Precio Total</Form.Label>
                                        </div>
                                    <Form.Control type="number" step="0.01" 
                                    defaultValue={editService.PrecioTotal} name="PrecioTotal"/>
                                </Form.Group>
                                    </div>
                                </div>
                                <Button variant="secondary" onClick={actualizarServicio}
                              style={{ marginTop: '10px' }}>
                            Actualizar Servicio
                            </Button>
                            </>
                        )}
                        {editService && editService.IdentVuelo && (
                                <>
                                <div className="row">
                                    <div className="col">
                                    <Form.Group controlId="editForm.Titular">
                                    <Form.Label>Titular</Form.Label>
                                    <Form.Control type="text" defaultValue={editService.Titular} name="Titular"/>
                                    </Form.Group>
                                    </div>

                                    <div className="col">
                                    <Form.Group controlId="editForm.IdentVuelo">
                                        <div className="row">
                                        <Form.Label>Identificador del Vuelo</Form.Label>
                                        </div>
                                    <Form.Control type="text" defaultValue={editService.IdentVuelo} name="IdentVuelo"/>
                                    </Form.Group>
                                    </div>
                                    </div>
                                    <div className="row">

                                  
                                    <div className="col">
                                    <Form.Group controlId="editForm.Destino">
                                        <div className="row">
                                        <Form.Label>Destino</Form.Label>
                                        </div>
                                    <Form.Control type="text" defaultValue={editService.Destino} name="Destino"/>
                                    </Form.Group>
                                    </div>
                                    <div className="col">
                                    <Form.Group controlId="editForm.Nombreaereopuerto">
                                        <div className="row">
                                        <Form.Label>Aeropuerto</Form.Label>
                                        </div>
                                    <Form.Control type="text" defaultValue={editService.nombreaereopuerto} 
                                    name="Nombreaereopuerto"/>
                                    </Form.Group>
                                    </div>  
                                    </div>
                               
                                <div className="row">
                                    <div className="col">
                                    <Form.Group controlId="editForm.FechaIda">
                                        <div className="row">
                                        <Form.Label>Fecha de Ida</Form.Label>
                                        </div>
                                    <Form.Control type="date" defaultValue={editService.FechaIda ? 
                                      editService.FechaIda.split('T')[0] : ''} name="FechaIda"/>
                                    </Form.Group>
                                    </div>
                                    <div className="col">
    
                                    <Form.Group controlId="editForm.FechaVuelta">
                                        <div className="row">
                                        <Form.Label>Fecha de Vuelta</Form.Label>
                                        </div>
                                    <Form.Control type="date" defaultValue={editService.FechaVuelta ? 
                                      editService.FechaVuelta.split('T')[0] : ''} name="FechaVuelta"/>
                                    </Form.Group>
                                    </div>

                                </div>
                                <div className="row">
                                    <div className="col">
                                    <Form.Group controlId="editForm.PrecioBase">
                                        <div className="row">
                                        <Form.Label>Precio Base</Form.Label>
                                        </div>
                                    <Form.Control type="number" step="0.01" defaultValue={editService.PrecioBase} 
                                    name="PrecioBase" />
                                    </Form.Group>
                                    </div>
                                    <div className="col">
                                    <Form.Group controlId="editForm.PrecioTotal">
                                        <div className="row">
                                        <Form.Label>Precio Total</Form.Label>
                                        </div>
                                    <Form.Control type="number" step="0.01" defaultValue={editService.PrecioTotal} 
                                    name="PrecioTotal"/>
                                    </Form.Group>
                                    </div>
                                </div>
                                <Button variant="secondary" onClick={actualizarServicio}
                              style={{ marginTop: '10px' }}>
                            Actualizar Servicio
                            </Button>
                            </>
                        )}

                        {showAddServiceForm && (
                            <>
                            <div className="row">
                            <Form.Label>Tipo de servicio</Form.Label>
                            </div>
                           <Form.Select name="tipoServicio" value={serviceType} onChange={handleServiceChange} 
                           aria-label="Modal de selección de servicio">
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
                                    <Form.Label>Fecha de vuelta</Form.Label>
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
                             <Button variant="secondary" onClick={agregarServicio}
                              style={{ marginTop: '10px' }}>
                            Añadir Servicio
                            </Button>
                            <Button  className="btn-danger " onClick={cancelarServicio} 
                             style={{ marginTop: '10px' }}>
                            Cancelar
                            </Button>
                           </>
                           
                            )}
                      
                        <div className="container d-flex justify-content-end">
                        <Button className="btn-danger BotonCancelar" onClick={() => setShowModalEdit(false)} 
                            style={{ marginTop: '10px' }}>
                        Cancelar 
                        </Button>
                        <Button variant="success" type="submit" onClick={saveFactura}  style={{ marginTop: '10px' }}>
                        Guardar Factura 
                        </Button>
                        </div>
                    </Form>

                </Modal.Body>
            </Modal>
        </>
    );
}

export default ModalEditFactura
