import React, { useEffect, useState } from 'react';
import Footer from '../../routes/Footer.jsx'
import Table from 'react-bootstrap/Table'; 
import { findAllLogs, SendLog, FinalizeLogs, ComprobarHorario } from '../ControlHorario/services/CHService.js';
import ModalLog from '../ControlHorario/childs/ModalLog.jsx'; 
import Navbar from '../../routes/Navbar.jsx'
import '../ControlHorario/styles/controlhorario.css';
import Pagination from 'react-bootstrap/Pagination';
import getUser from '../../service/UserService.js';

const LogsComponent = () => {
  const [user, setUser] = useState(''); // Estado para almacenar el nombre de usuario

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
  }, []); // El array vacío asegura que este efecto se ejecute sólo una vez después del montaje inicial
  // Paginacion
  const [currentPage, setCurrentPage] = useState(1);
  const [logsPerPage] = useState(10); 

  // Fin de paginación
  const [logs, setLogs] = useState([]);
  const [selectedLog, setSelectedLog] = useState(null); // Estado para el log seleccionado
   let credentials = user
    credentials = credentials.replace(/"/g, '');

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await findAllLogs();
      if (response && response.data) {
        const reversedData = [...response.data].reverse();
          setLogs(reversedData);
      }
      } catch (error) {
        console.log(error);
      }

    };
    fetchLogs();
  }, []);

  // Función para obtener la hora y los minutos actuales
  const getCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
  
    // Formatea la hora, los minutos y los segundos con dos dígitos
    const formattedHours = hours < 10 ? `0${hours}` : hours;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
  
    // Devuelve la hora, los minutos y los segundos en formato "HH:MM:SS"
    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  };
  

  const indexOfLastLog = currentPage * logsPerPage;
  const indexOfFirstLog = indexOfLastLog - logsPerPage;
  const currentLogs = logs.slice(indexOfFirstLog, indexOfLastLog);
  const totalPages = Math.ceil(logs.length / logsPerPage);

  // Función que añade una entrada con la hora y los minutos actuales
  const handleAddEntryClick = () => {
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0]; // Obtiene la fecha actual en formato YYYY
    const currentTime = getCurrentTime(); // Obtiene la hora y los minutos actuales
    const CH = ComprobarHorario(currentTime)
    const logUser = {
      nombre_Empl: credentials, // provisional
      fecha: formattedDate,
      tiempo: currentTime, // Usa la hora y los minutos actuales
      Tipo:1,
      CHora:CH
    };

    SendLog(logUser);
  };
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleAddExistClick = () => {
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0]; // Obtiene la fecha actual en formato YYYY
    const currentTime = getCurrentTime(); // Obtiene la hora y los minutos actuales
    const logUser = {
      nombre_Empl: credentials, // provisional
      fecha: formattedDate,
      tiempo: currentTime, // Usa la hora y los minutos actuales
      Tipo:2,
      CHora:-3
    };

    FinalizeLogs(logUser);
  };
  const handleLogClick = (log) => {
    setSelectedLog(log);
  };
  const handleCloseModal = () => {
    setSelectedLog(null);
  };
  
  return (
    <>
      <Navbar />
      <div className="container ControlHorario">
        <div className="text-center row">
          <h1 className="MainText">Lista de registros</h1>
          <hr />
        </div>
        <div className="d-flex justify-content-end botones">
          <button type="button" className="btn btn-outline-success" 
          onClick={handleAddEntryClick}>Añadir entrada</button>
          <button type="button" className="btn btn-outline-danger" onClick={handleAddExistClick}>Añadir salida</button>
        </div>
        {logs.length > 0 ? (
          <>
            <Table striped bordered hover>
              <thead className='EncabezadoTabla'>
                <tr>
                  <th>ID</th>
                  <th>Fecha</th>
                  <th>Nombre</th>
                  <th>Tipo</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                {currentLogs.map((log, index) => (
                  <tr key={index} onClick={() => handleLogClick(log)} style={{ cursor: 'pointer' }}>
                    <td>{index + 1 + (currentPage - 1) * logsPerPage}</td>
                    <td>{log.fecha}</td>
                    <td>{log.nombre_Empl}</td>
                    <td>{log.Tipo === 1 ? 'Entrada' : 'Salida'}</td>
                    <td>
                    {(() => {
                    switch(log.CHora) {
                      case 1:
                        return (
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" 
                          className="bi bi-calendar2-check" viewBox="0 0 16 16">
                            <path d="M10.854 8.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 
                            1 .708-.708L7.5 10.793l2.646-2.647a.5.5 0 0 1 .708 0"/>
                            <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 
                            1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 
                            1 .5-.5M2 2a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1z"/>
                            <path d="M2.5 4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H3a.5.5 0 0 1-.5-.5z"/>
                          </svg>
                        );
                      case -1:
                        return (
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" 
                          className="bi bi-calendar-x-fill" viewBox="0 0 16 16">
                            <path d="M4 .5a.5.5 0 0 0-1 0V1H2a2 2 0 0 0-2 2v1h16V3a2 2 0 0 0-2-2h-1V.5a.5.5 0 0 0-1 
                            0V1H4zM16 14V5H0v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2M6.854 8.146 8 9.293l1.146-1.147a.5.5 0 
                1 1 .708.708L8.707 10l1.147 1.146a.5.5 0 0 1-.708.708L8 10.707l-1.146 1.147a.5.5 0 0 1-.708-.708L7.293 
                            10 6.146 8.854a.5.5 0 1 1 .708-.708"/>
                          </svg>
                        );
                      case 2:
                        return (
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" 
                          className="bi bi-calendar2" viewBox="0 0 16 16">
                            <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 
                            0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 
                            0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M2 2a1 1 0 0 0-1 1v11a1 1 0 0 0 
                            1 1h12a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1z"/>
                            <path d="M2.5 4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H3a.5.5 0 0 1-.5-.5z"/>
                          </svg>
                        );
                      case -3:
                        return (
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" 
                          className="bi bi-door-closed" viewBox="0 0 16 16">
                            <path d="M3 2a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v13h1.5a.5.5 0 0 
                            1 0 1h-13a.5.5 0 0 1 0-1H3zm1 13h8V2H4z"/>
                            <path d="M9 9a1 1 0 1 0 2 0 1 1 0 0 0-2 0"/>
                          </svg>
                        );
                      default:
                        return null; // O maneja otros casos según sea necesario
                    }
                  })()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <Pagination>
          <Pagination.Prev 
            onClick={() => currentPage > 1 && paginate(currentPage - 1)} 
            disabled={currentPage === 1}>
            Anterior 
          </Pagination.Prev>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
            <Pagination.Item 
              key={number} 
              active={number === currentPage} 
              onClick={() => paginate(number)}>
              {number}
            </Pagination.Item>
          ))}
          <Pagination.Next 
            onClick={() => currentPage < totalPages && paginate(currentPage + 1)} 
            disabled={currentPage === totalPages}>
            Siguiente
          </Pagination.Next>
        </Pagination>
        {selectedLog && <ModalLog log={selectedLog} onClose={() => setSelectedLog(null)} />}
          </>
        ) : (
          <p>No se encontraron logs.</p>
        )}
        {selectedLog && <ModalLog log={selectedLog} onClose={handleCloseModal} />}
        <p>Leyenda:</p>
        <div className="leyenda">
        <div className="row">
       <div className="col">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" 
            className="bi bi-calendar2-check" viewBox="0 0 16 16">
              <path d="M10.854 8.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 
              0 1 .708-.708L7.5 10.793l2.646-2.647a.5.5 0 0 1 .708 0"/>
              <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 
              0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M2 2a1 1 0 0 0-1 1v11a1 
              1 0 0 0 1 1h12a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1z"/>
              <path d="M2.5 4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H3a.5.5 0 0 1-.5-.5z"/>
            </svg> - Llegada correcta.
            
          </div>
        <div className="col">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" 
        className="bi bi-calendar-x-fill" viewBox="0 0 16 16">
              <path d="M4 .5a.5.5 0 0 0-1 0V1H2a2 2 0 0 0-2 2v1h16V3a2 2 0 0 0-2-2h-1V.5a.5.5 
              0 0 0-1 0V1H4zM16 14V5H0v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2M6.854 8.146 8 9.293l1.146-1.147a.5.5 
              0 1 1 .708.708L8.707 10l1.147 1.146a.5.5 0 0 1-.708.708L8 10.707l-1.146 1.147a.5.5 0 
              0 1-.708-.708L7.293 10 6.146 8.854a.5.5 0 1 1 .708-.708"/>
            </svg> - Registro fuera de horario.
        </div>
        </div>
      <div className="row" style={{marginBottom:'32px'}}>
        <div className="col">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" 
              className="bi bi-calendar2" viewBox="0 0 16 16">
              <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 
              2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M2 2a1 1 0 0 0-1 
              1v11a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1z"/>
              <path d="M2.5 4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H3a.5.5 0 0 1-.5-.5z"/>
            </svg> - Retraso.
        </div>
        <div className="col">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" 
        className="bi bi-door-closed" viewBox="0 0 16 16">
              <path d="M3 2a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v13h1.5a.5.5 0 0 1 0 1h-13a.5.5 0 0 1 0-1H3zm1 13h8V2H4z"/>
              <path d="M9 9a1 1 0 1 0 2 0 1 1 0 0 0-2 0"/>
            </svg> - Salida.
        </div>
        </div>
        </div>
        </div>
        <div>
      </div>
      <Footer />
    </>
  );
};

export default LogsComponent;
