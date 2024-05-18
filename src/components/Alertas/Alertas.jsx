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
        setServiceAlert(data.data);
      } catch (error) {
        console.error("Error al cargar las los :", error);
      }
    };

    loadFacturas();
  }, []);

  return (
    <div className="container" role="dialog" aria-label="Diálogo de alertas">
      <h1 style={{ fontSize: '20px', fontWeight: '600', marginTop: '20px' }}>Próximos servicios</h1>
      <hr/>
      {serviciosAlert.length > 0 ? (
        <div className="container listadeservicios">
          <ListGroup>
            {serviciosAlert.map((servicio, index) => (
              <ListGroup.Item key={index}>
                <div className="row" >
                  <div className="col-5" style={{ borderRight: '1px solid #ccc' }}>
                    IdFact: {servicio.IdFactura}
                  </div>   
                  <div className="col-6">
                  {servicio.NReserva ? `NReserva: ${servicio.NReserva}` : `IdentVuelo: ${servicio.IdentVuelo}`}
                  </div>  
                </div>

              </ListGroup.Item>
            ))}
          </ListGroup>
        </div>
      ) : (
        <div style={{marginBottom:'15px'}}>No hay servicios que vencen en menos de 15 días.</div>
      )}
    </div>
  );
}

export default Alertas;
