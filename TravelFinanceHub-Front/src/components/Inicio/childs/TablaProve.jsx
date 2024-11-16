import React, { useEffect, useState } from 'react'
import { findAllCompanies } from '../services/InicioService'
import Table from 'react-bootstrap/Table';

function TablaProveedores () {
  const [companies, setCompanies] = useState([])

  useEffect(() => {
    const fetchCompanies = async () => {
      const data = await findAllCompanies()
      setCompanies(data.data)
    }

    fetchCompanies()
  }, [])

  return (
    <>
    <h2>Proveedores</h2>
    <hr />
    <Table striped bordered hover>
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Nombre</th>
            <th scope="col">CIF</th>
            <th scope="col">Ciudad</th>
          </tr>
        </thead>
        <tbody>
          {companies.map((company, index) => {
            if (index < 3) {
              // Condición para renderizar solo los primeros 3 elementos
              return (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{company.Nombre_Empresa}</td>
                  <td>{company.CIF}</td>
                  <td>{company.Ciudad}</td>
                </tr>
              )
            } else {
              return null // No renderizar después de los primeros 3 elementos
            }
          })}
        </tbody>
        </Table>
    </>
  )
}

export default TablaProveedores
