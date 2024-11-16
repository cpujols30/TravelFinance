import React, { useEffect, useState } from 'react';
import Navbar from '../../routes/Navbar';
import Table from 'react-bootstrap/Table';
import Pagination from 'react-bootstrap/Pagination';
import { findAllChanges } from '../HistorialCambios/services/HCService';
import '../ControlHorario/styles/controlhorario.css';
import Footer from '../../routes/Footer';
function HistorialCambios() {
  const [currentPage, setCurrentPage] = useState(1);
  const [changesPerPage] = useState(10); // Ajusta este valor según prefieras
  const [cambios, setCambios] = useState([]);

  useEffect(() => {
    const fetchChanges = async () => {
      try {
        const response = await findAllChanges();
        const formattedData = response.data.serviciosVueloHistorial.map(vuelo => ({
          identificador: vuelo.nReserva,
          tipo: 'Vuelo',
          fechamodificacion: vuelo.fechaModificacion
        })).concat(
          response.data.serviciosHotelHistorial.map(hotel => ({
            identificador: hotel.nReserva,
            tipo: 'Hotel',
            fechamodificacion: hotel.fechaModificacion
          }))
        );
        setCambios(formattedData);
      } catch (error) {
        console.error("Error al obtener los cambios:", error);
      }
    };
    fetchChanges();
  }, []);

  const indexOfLastChange = currentPage * changesPerPage;
  const indexOfFirstChange = indexOfLastChange - changesPerPage;
  const currentChanges = cambios.slice(indexOfFirstChange, indexOfLastChange);
  const totalPages = Math.ceil(cambios.length / changesPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  let maxPageNumberLimit = Math.min(currentPage + 2, totalPages);
  let minPageNumberLimit = maxPageNumberLimit - 4;
  if (minPageNumberLimit < 1) {
    minPageNumberLimit = 1;
    maxPageNumberLimit = Math.min(5, totalPages);
  }
  return (
    <>
      <Navbar />
      <div className="container Global Hcambios">
        <div className="row inicio">
          <h1 className="TextWelcome MainText" >Historial de cambios</h1>
          <hr />
          <div className="Hcambios">
          <Table striped bordered hover>
            <thead className='EncabezadoTabla'>
              <tr>
                <th>Identificador</th>
                <th>Número de reserva o Indentificador de vuelo</th>
                <th>Tipo</th>
                <th>Fecha de Modificación</th>
              </tr>
            </thead>
            <tbody>
              {currentChanges.map((cambio, index) => (
                <tr key={index}>
                  <td>{index + 1 + (currentPage - 1) * changesPerPage}</td>
                  <td>{cambio.identificador}</td>
                  <td>{cambio.tipo}</td>
                  <td>{new Date(cambio.fechamodificacion).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Pagination>
          <Pagination.Prev onClick={() => currentPage > 1 && paginate(currentPage - 1)} disabled={currentPage === 1}>
            Anterior
          </Pagination.Prev>
          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .slice(minPageNumberLimit - 1, maxPageNumberLimit)
            .map(number => (
              <Pagination.Item key={number} active={number === currentPage} onClick={() => paginate(number)}>
                {number}
              </Pagination.Item>
            ))}
          <Pagination.Next onClick={() => currentPage < 
            totalPages && paginate(currentPage + 1)} disabled={currentPage === totalPages}>
            Siguiente
          </Pagination.Next>
        </Pagination>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
}

export default HistorialCambios;
