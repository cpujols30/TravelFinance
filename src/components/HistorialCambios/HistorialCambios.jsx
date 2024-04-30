import React, { useEffect, useState } from 'react';
import Navbar from '../../routes/Navbar';
import Table from 'react-bootstrap/Table';
import Pagination from 'react-bootstrap/Pagination';
import { findAllChanges } from '../HistorialCambios/services/HCService';
import '../ControlHorario/styles/controlhorario.css'; // Asume que puedes reutilizar estilos, ajusta el path según sea necesario

function HistorialCambios() {
  const [currentPage, setCurrentPage] = useState(1);
  const [changesPerPage] = useState(10); // Ajusta este valor según prefieras
  const [cambios, setCambios] = useState([]);

  useEffect(() => {
    const fetchChanges = async () => {
      try {
        const response = await findAllChanges();
        setCambios(response.data);
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

  return (
    <>
      <Navbar />
      <div className="container Global">
        <div className="row inicio">
          <h1 className="TextWelcome">Historial de cambios</h1>
          <hr />
          <Table striped bordered hover>
            <thead className='EncabezadoTabla'>
              <tr>
                <th>#</th>
                <th>ID Factura</th>
                <th>Nota</th>
              </tr>
            </thead>
            <tbody>
              {currentChanges.map((cambio, index) => (
                <tr key={index}>
                  <td>{index + 1 + (currentPage - 1) * changesPerPage}</td>
                  <td>{cambio.idFact}</td>
                  <td>{cambio.nota}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Pagination className="justify-content-center">
            {[...Array(totalPages).keys()].map(number => (
              <Pagination.Item key={number + 1} active={number + 1 === currentPage} onClick={() => paginate(number + 1)}>
                {number + 1}
              </Pagination.Item>
            ))}
          </Pagination>
        </div>
      </div>
    </>
  );
}

export default HistorialCambios;
