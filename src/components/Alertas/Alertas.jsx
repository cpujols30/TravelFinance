import '../Alertas/styles/alertasstyles.css';
import ListGroup from 'react-bootstrap/ListGroup';
import {findAlerts} from '../Alertas/services/AlertasService';
import { useEffect, useState } from 'react';

function Alertas() {
  const [serviciosAlert, setServiceAlert] = useState([]);

  useEffect(() => {
    const loadFacturas = async () => {
      try {
        const data = await findAlerts();
        setServiceAlert(data.data); // Asegúrate de que data.data es un arreglo de objetos
      } catch (error) {
        console.error("Error al cargar las los :", error);
      }
    };

    loadFacturas();
  }, []);


  return (
    <>
      <div className="container">
        <h6>Próximas servicios</h6>
        <hr/>
        Los siguientes servicios  vencen en menos de 15 días:
        <div className="continaer listadeservicios">
        <ListGroup>
          {serviciosAlert.map((servicio, index) => (
            <ListGroup.Item key={index}>
              <div className="row">
                <div className="col-6">
                IdFactura:{servicio.IdFactura} 
                </div>
                <div className="col-6">
                Titular: {servicio.Titular}
                </div>
           
              </div>
         
             {servicio.NReserva ? `NReserva: ${servicio.NReserva}` : `IdentVuelo: ${servicio.IdentVuelo}`}
            </ListGroup.Item>
          ))}
        </ListGroup>
        </div>
      </div>
    </>
  );
}

export default Alertas;
