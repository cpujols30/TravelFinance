import ProgressBar from 'react-bootstrap/ProgressBar';
import '../styles/iniciostyles.css';
import React, { useEffect, useState } from 'react';
import { findAllServices } from '../services/InicioService';

function TablaUsers() {
  const [ingresos, setIngresos] = useState(0);
  const [gastos, setGastos] = useState(0);
  const [beneficio, setBeneficio] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await findAllServices();
        
        // Calcula los totales basados en los datos recibidos
        let totalIngresos = 0;
        let totalGastos = 0;
        data.data.forEach(item => {
          totalGastos += item.PrecioBase;
          totalIngresos += item.PrecioTotal;
        });
        
        // Establece los estados con los valores calculados
        setGastos(totalGastos);
        setIngresos(totalIngresos);
        setBeneficio(totalIngresos - totalGastos);
      } catch (error) {
        console.error(error);
      }
    };
    
    fetchData();
  }, []);

  return (
    <>
      <h2>Gastos Generales</h2>
      <hr />
      <div className="row">
        <h3>Ingresos: {ingresos}</h3>
      </div>
      <div className="row">
        <h3>Gastos: {gastos}</h3>
      </div>
      <div className="row">
        <h3>Beneficio: {beneficio}</h3>
      </div>
      <div className="container barraProgreso">
        <ProgressBar>
          {/* Ajusta el valor de "now" para reflejar el porcentaje respecto al ingreso total */}
          <ProgressBar striped variant="success" animated now={(ingresos / (ingresos + gastos)) * 100} key={1} 
          aria-label="Barra de ingreso"/>
          <ProgressBar striped variant="danger" animated now={(gastos / (ingresos + gastos)) * 100} key={2} 
          aria-label="Barra de gasto"/>
        </ProgressBar>
      </div>
    </>
  );
}

export default TablaUsers;
