import React, { useContext, useEffect, useState, useRef } from 'react';
import { idContext } from '../../../Contexts/ContextFactura';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { findServices,ModifyServiceHotel, ModifyServiceViaje, DeleteServicioVuelo, DeleteServicioHotel, addServices } from '../services/ModalService';
import toast from 'react-hot-toast';
import '../styles/Modalstyles.css'
// eslint-disable-next-line react/prop-types
function ModalEditFactura({ setShowModalEdit }) {
    const [services, setServices] = useState([]);
    const [editService, setEditService] = useState(null); // Cambio a almacenar el servicio completo
    const [showAddServiceForm, setShowAddServiceForm] = useState(false);
    const [serviceType, setServiceType] = useState('');
    const [flyType, setFlyType] = useState('');
    const props = useContext(idContext);
    const formRef = useRef(null);
    
    const toggleAddServiceForm = () => {
        setShowAddServiceForm(!showAddServiceForm);
      };
      const handleFlyChange = (e) => {
        setFlyType(e.target.value);
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
        setEditService(servicio);
    };
    const handleDeleteService = async (servicio) =>{
        if (Object.prototype.hasOwnProperty.call(servicio, 'nombreHotel')) {
            DeleteServicioHotel(servicio);
        } else if (Object.prototype.hasOwnProperty.call(servicio, 'identVuelo')) {
            DeleteServicioVuelo(servicio);
        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault(); // Esto es crucial para prevenir la recarga de la página
        const formData = new FormData(formRef.current);
        const formProps = Object.fromEntries(formData);
        if(formProps.NombreHotel){
            // eslint-disable-next-line react/prop-types
            formProps.IdFactura = props.factura.facturaId
            await ModifyServiceHotel(formProps);
        }
        if(formProps.IdentVuelo){
            // eslint-disable-next-line react/prop-types
            formProps.IdFactura = props.factura.facturaId
            await ModifyServiceViaje(formProps);
        }


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
        setFlyType('');
        
        toast.success('Servicio agregado a la factura')
      };
      const handleServiceChange = (e) => {
        setServiceType(e.target.value);
        // Restablecer el tipo de vuelo y ID de orden de vuelo cada vez que cambie el tipo de servicio
        setFlyType('');
      };
      const saveFactura = async () =>{
       
        try {
            await addServices(services);
            toast.success('La factura ha sido actualizada correctamente')
         
        } catch (error) {
          toast.error('Ha habido un problema al actualizar la factura')
        }
      }
    
     
    return (
        <>
            <Modal show={true} onHide={() => setShowModalEdit(false)} dialogClassName="modal-90w" aria-labelledby="example-custom-modal-styling-title" size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Modificación de factura</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form ref={formRef} onSubmit={handleSubmit}>
                        <fieldset disabled>
                            <Form.Label>Cliente</Form.Label>
                              {/* eslint-disable-next-line react/prop-types */}
                            <Form.Control type="text" placeholder="Cliente" name="Cliente" defaultValue={props.factura.cliente} />
                        </fieldset>
                        <hr />

                        <div className="row">
                        <div className="col">
                        <h5>Servicios de la factura</h5>
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
                                            <Button className="btn btn-sm btn-primary edit-btn" variant="primary" size="sm" onClick={() => handleEditClick(servicio)}>
                                            <i className="fa-solid fa-pencil"></i>
                                            </Button>
                                            <Button className ="btn btn-sm btn-danger delete-btn" variant="primary" size="sm" onClick={() => handleDeleteService(servicio)}>
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
                                    <Form.Label>Titular</Form.Label>
                                    <Form.Control type="text" defaultValue={editService.Titular} name="Titular"/>
                                </Form.Group>
                            </div>
                            <div className="col">
                            <Form.Group controlId="editForm.NombreHotel">
                                    <Form.Label>Nombre del Hotel</Form.Label>
                                    <Form.Control type="text" defaultValue={editService.NombreHotel} name="NombreHotel"/>
                                </Form.Group>
                            </div>
                            </div>
                               <div className="row">
                                <div className="col">
                                <Form.Group controlId="editForm.FechaIda">
                                    <Form.Label>Fecha de Ida</Form.Label>
                                    <Form.Control type="date" defaultValue={editService.FechaIda ? editService.FechaIda.split('T')[0] : ''} name="FechaIda"/>
                                </Form.Group>
                                </div>
                                <div className="col">
                                <Form.Group controlId="editForm.FechaVuelta">
                                    <Form.Label>Fecha de Vuelta</Form.Label>
                                    <Form.Control type="date" defaultValue={editService.FechaVuelta ? editService.FechaVuelta.split('T')[0] : ''} name="FechaVuelta"/>
                                </Form.Group>
                                </div>
                               </div>
                                <Form.Group controlId="editForm.NReserva">
                                    <Form.Label>Número de Reserva</Form.Label>
                                    <Form.Control type="text" defaultValue={editService.NReserva} name="NReserva"/>
                                </Form.Group>
                                <div className="row">
                                    <div className="col">
                                    <Form.Group controlId="editForm.PrecioBase">
                                    <Form.Label>Precio Base</Form.Label>
                                    <Form.Control type="number" step="0.01" defaultValue={editService.PrecioBase} name="PrecioBase"/>
                                    </Form.Group>
                                    </div>
                                    <div className="col">
                                    <Form.Group controlId="editForm.PrecioTotal">
                                    <Form.Label>Precio Total</Form.Label>
                                    <Form.Control type="number" step="0.01" defaultValue={editService.PrecioTotal} name="PrecioTotal"/>
                                </Form.Group>
                                    </div>
                                </div>
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
                                    <Form.Label>Identificador del Vuelo</Form.Label>
                                    <Form.Control type="text" defaultValue={editService.IdentVuelo} name="IdentVuelo"/>
                                    </Form.Group>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                    <Form.Group controlId="editForm.FechaIda">
                                    <Form.Label>Fecha de Ida</Form.Label>
                                    <Form.Control type="date" defaultValue={editService.FechaIda ? editService.FechaIda.split('T')[0] : ''} name="FechaIda"/>
                                    </Form.Group>
                                    </div>
                                    <div className="col">
    
                                    <Form.Group controlId="editForm.FechaVuelta">
                                    <Form.Label>Fecha de Vuelta</Form.Label>
                                    <Form.Control type="date" defaultValue={editService.FechaVuelta ? editService.FechaVuelta.split('T')[0] : ''} name="FechaVuelta"/>
                                    </Form.Group>
                                    </div>

                                </div>
                                <div className="row">
                                    <div className="col">
                                    <Form.Group controlId="editForm.PrecioBase">
                                    <Form.Label>Precio Base</Form.Label>
                                    <Form.Control type="number" step="0.01" defaultValue={editService.PrecioBase} name="PrecioBase" />
                                    </Form.Group>
                                    </div>
                                    <div className="col">
                                    <Form.Group controlId="editForm.PrecioTotal">
                                    <Form.Label>Precio Total</Form.Label>
                                    <Form.Control type="number" step="0.01" defaultValue={editService.PrecioTotal} name="PrecioTotal"/>
                                    </Form.Group>
                                    </div>
                                </div>
                        
                            </>
                        )}

                        {showAddServiceForm && (
                            <>
                           <Form.Label>Tipo de servicio</Form.Label>
                           <Form.Select name="tipoServicio" value={serviceType} onChange={handleServiceChange}>
                             <option value="">Seleccione un servicio</option>
                             <option value="Vuelo">Vuelo</option>
                             <option value="Hotel">Hotel</option>
                           </Form.Select>
                           <br />
                 
                           {serviceType === "Vuelo" && (
                             <>
                               <Form.Label>Modo de realizar la factura</Form.Label>
                               <Form.Select value={flyType} onChange={handleFlyChange}>
                                 <option value="">Seleccione</option>
                                 <option value="Amadeus">Amadeus Int</option>
                                 <option value="Manual">Manual</option>
                               </Form.Select>
                               <br />
                 
                               {flyType === "Amadeus" ? (
                                 <>
                                   <Form.Label>Flight Order ID</Form.Label>
                                   <Form.Control name="FlyOderID" type="text"  placeholder="FlyOrderID" />
                                   <br />
                                 </>
                               ) : (
                                 flyType === "Manual" && (
                                   <>
                                     <div className="row">
                                     <div className="col">
                                       <Form.Label>Titular</Form.Label>
                                       <Form.Control type="text" placeholder="Titular"  name="Titular"/>
                                       <br/>
                                     </div>
                                       <div className="col">
                                       <Form.Label>Destino</Form.Label>
                                       <Form.Control type="text" placeholder="Destino"  name="Destino"/>
                                       <br />
                                     </div>
                                     <div className="col">
                                       <Form.Label>Fecha de Ida</Form.Label>
                                     <Form.Control type="Date" placeholder="FechaIda"  name="FechaIda"/>
                                     <br />
                                     </div>
                                     <div className="col">
                                       <Form.Label>Fecha de vuelta</Form.Label>
                                     <Form.Control type="Date" placeholder="FechaVuelta"  name="FechaVuelta"/>
                                     <br />
                                     </div>
                                     <div className="col">
                                     <Form.Group controlId="editForm.IdentVuelo">
                                     <Form.Label>Identificador del Vuelo</Form.Label>
                                     <Form.Control type="text" name="IdentVuelo"/>
                                     </Form.Group>
                                     </div>
                                     </div>
                                     <div className="row">
                                       <div className="col">
                                       <Form.Label>Precio Total</Form.Label>
                                       <Form.Control type="text" placeholder="PrecioTotal" name="PrecioTotal"/>
                                       <br />
                                       </div>
                                     <div className="col">
                                     <Form.Label>Precio Base</Form.Label>
                                     <Form.Control type="text" placeholder="PrecioBase" name="PrecioBase"/>
                                     <br />
                                     </div>
                                     </div>
                                   
                                   </>
                                 )
                               )}
                             </>
                           )}
                 
                           {serviceType === "Hotel" && (
                           <>
                           <div className="row"> 
                           <div className="col">
                           <Form.Group controlId="editForm.Titular">
                                   <Form.Label>Titular</Form.Label>
                                   <Form.Control type="text" name="Titular"/>
                               </Form.Group>
                           </div>
                           <div className="col">
                           <Form.Group controlId="editForm.NombreHotel">
                                   <Form.Label>Nombre del Hotel</Form.Label>
                                   <Form.Control type="text"  name="NombreHotel"/>
                               </Form.Group>
                           </div>
                           </div>
                              <div className="row">
                               <div className="col">
                               <Form.Group controlId="editForm.FechaIda">
                                   <Form.Label>Fecha de Ida</Form.Label>
                                   <Form.Control type="date"  name="FechaIda"/>
                               </Form.Group>
                               </div>
                               <div className="col">
                               <Form.Group controlId="editForm.FechaVuelta">
                                   <Form.Label>Fecha de Vuelta</Form.Label>
                                   <Form.Control type="date"  name="FechaVuelta"/>
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
                                   <Form.Control type="number" step="0.01"  name="PrecioBase"/>
                                   </Form.Group>
                                   </div>
                                   <div className="col">
                                   <Form.Group controlId="editForm.PrecioTotal">
                                   <Form.Label>Precio Total</Form.Label>
                                   <Form.Control type="number" step="0.01"  name="PrecioTotal"/>
                               </Form.Group>
                                   </div>
                               </div>
                           </>
                           )}
                             <Button variant="secondary" onClick={agregarServicio}>
                            Añadir Servicio
                            </Button>
                           </>
                           
                            )}
                      
                      
                        <div className="container d-flex justify-content-end">
                        <Button className="btn-danger BotonCancelar" onClick={() => setShowModalEdit(false)}>
                        Cancelar 
                        </Button>
                        <Button variant="success" type="submit" onClick={saveFactura}>
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
