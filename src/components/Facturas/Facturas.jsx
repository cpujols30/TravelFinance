import React, { useEffect, useState } from 'react';
import Navbar from '../../routes/Navbar';
import '../Facturas/styles/facturastyles.css';
import Footer from '../../routes/Footer';
import ModalFactura from '../Facturas/childs/ModalNewFactura';
import { FindAllFacturas , handlerDelete} from '../Facturas/services/TableService';
import ModalEditFactura from './childs/ModalEditFactura';
import {idContext} from '../../Contexts/ContextFactura'

function Facturas() {
    const [facturas, setFacturas] = useState([]);
    const [facturasActual, setFacturaIdActual] = useState([]);
    const [showModalEdit, setShowModalEdit] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [facturasPerPage] = useState(10);  
    useEffect(() => {
        const loadFacturas = async () => {
            try {
                const data = await FindAllFacturas();
                setFacturas(data.data); 
            } catch (error) {
                console.error("Error al cargar las facturas:", error);
            }
        };

        loadFacturas();
    }, []);

    const handleFacturaIdActual = (Factactual) => {
        setFacturaIdActual(Factactual); // Establece el ID de factura actual
        setShowModalEdit(true); // Muestra el modal
    };
    
     // Cambia la página

     const indexOfLastFactura = currentPage * facturasPerPage;
     const indexOfFirstFactura = indexOfLastFactura - facturasPerPage;
     const currentFacturas = facturas.slice(indexOfFirstFactura, indexOfLastFactura);
 
     const paginate = (pageNumber) => setCurrentPage(pageNumber);

     const pageNumbers = [];
     for (let i = 1; i <= Math.ceil(facturas.length / facturasPerPage); i++) {
         pageNumbers.push(i);
     }

    const props = {
        factura:facturasActual,
        CantidadFacturas:facturas.length
    }
    return (
        <>
            <idContext.Provider value={props}>
                <Navbar />
                <div className="container my-4">
                    <div className="row factura">
                        <h1 className='text-center'>Facturas</h1>
                        <hr />
                        <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12">
                            <div className="container d-flex justify-content-end ContainerBotonAñadirFactura">
                                <ModalFactura />
                            </div>
                            <table className='table table-striped datatable_users'>
                                <thead className='EncabezadoTabla'>
                                    <tr>
                                        <th>Id</th>
                                        <th>Cliente</th>
                                        <th>Nombre Empl</th>
                                        <th>Fecha_fac</th>
                                        <th>Opciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {currentFacturas.length > 0 ? (
                                    currentFacturas.map((factura) => (
                                        <tr key={factura.facturaId}>
                                        <td>{factura.facturaId}</td>
                                        <td>{factura.cliente}</td>
                                        <td>{factura.nombreEmpl}</td>
                                        <td>{factura.fecha_fac}</td>
                                        <td>
                                            <button className="btn btn-sm btn-primary edit-btn" onClick={() => handleFacturaIdActual(factura)}>
                                            <i className="fa-solid fa-pencil"></i>
                                            </button>
                                            <button className="btn btn-sm btn-danger delete-btn" onClick={() => handlerDelete(factura.facturaId)}>
                                            <i className="fa-solid fa-trash"></i>
                                            </button>
                                        </td>
                                        </tr>
                                    ))
                                    ) : (
                                    <tr>
                                        <td colSpan="5" className="text-center">
                                        No hay facturas disponibles.
                                        </td>
                                    </tr>
                                    )}

                            </tbody>

                            </table>
                             {/* Paginación */}
                            <nav aria-label="Page navigation example">
                            <ul className="pagination">
                                <li className={"page-item " + (currentPage === 1 ? "disabled" : "")}>
                                    <a className="page-link" href="#" onClick={() => currentPage > 1 && paginate(currentPage - 1)}>Previous</a>
                                </li>
                                {pageNumbers.map(number => (
                                    <li key={number} className={"page-item " + (currentPage === number ? "active" : "")}>
                                        <a onClick={() => paginate(number)} href="#" className="page-link">
                                            {number}
                                        </a>
                                    </li>
                                ))}
                                <li className={"page-item " + (currentPage === pageNumbers.length ? "disabled" : "")}>
                                    <a className="page-link" href="#" onClick={() => currentPage < pageNumbers.length && paginate(currentPage + 1)}>Next</a>
                                </li>
                            </ul>
                        </nav>
                        </div>
                    </div>
                </div>
                <Footer />
                {showModalEdit && <ModalEditFactura setShowModalEdit={setShowModalEdit} />}

            </idContext.Provider>
        </>
    );
}

export default Facturas;
