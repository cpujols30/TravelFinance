import '../routes/styles/navstyles.css';
import React, { useState } from 'react';
import { OverlayTrigger, Popover } from 'react-bootstrap';
import Alertas from '../components/Alertas/Alertas';
import Swal from 'sweetalert2'
import {Link, useNavigate} from 'react-router-dom';
import toast from 'react-hot-toast';
function Navbar() {
    const [showPopover, setShowPopover] = useState(false);
    const navigate = useNavigate();


    const popoverBottom = (
        <Popover id="popover-positioned-bottom" title="Próximas Facturas" >
            <Alertas/>
        </Popover>
    );

    const handlePopoverClick = () => {
        setShowPopover(!showPopover); // Cambia el estado al contrario del estado actual
    };
    const handleCierresesion = () => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: "¿Deseas cerrar sesión?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, cerrar sesión',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
              //
              localStorage.removeItem('LoggedActualUser')
              navigate('/login');
              toast.success('Se ha cerrado sesión con exito')
            }
        });

    };

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    {/* Contenido existente */}
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link" to="/Inicio">Inicio</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/Facturas">Facturas</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/Optimizadores">Optimizadores</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/control-horario">Control de Horario</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/historial-cambios">Historial de cambios</Link>
                            </li>
                            <li className="nav-item">
                                <OverlayTrigger trigger="click" placement="bottom" overlay={popoverBottom}>
                                    <button className="btn nav-link Bell" onClick={handlePopoverClick}>
                                        {showPopover ? (
                                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-bell-fill" viewBox="0 0 16 16">
                                          <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2m.995-14.901a1 1 0 1 0-1.99 0A5 5 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901"/>
                                            </svg>
                                           
                                        ) : ( 
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-bell" viewBox="0 0 16 16">
                                        <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zm0-14.082l-.797.161A4 4 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4 4 0 0 0-3.203-3.92zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5 5 0 0 1 13 6c0 .88.32 4.2 1.22 6z"/>
                                        </svg>
                                            
                                        )}
                                    </button>
                                </OverlayTrigger>
                            </li>
                            <li className="nav-item Btonfinal">
                            <Link type="button" className="btn nav-link" to="/Perfil">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-person-circle me-2" viewBox="0 0 16 16">
                                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
                                <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
                            </svg>
                            </Link>
                        </li>
                        <li className="nav-item ">
                            <button type="button" className="btn nav-link" onClick={handleCierresesion}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-box-arrow-right" viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"/>
                                    <path fillRule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
                                </svg>
                            </button>
                        </li>
                            
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Navbar;
