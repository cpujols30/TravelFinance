import React, { useRef, useEffect, useState } from 'react';
import Chart from 'chart.js/auto';
import { FindAllFacturas } from '../../Facturas/services/TableService';

const LineChart = () => {
  const chartRef = useRef(null);
  const [facturas, setFacturas] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await FindAllFacturas();
        setFacturas(data.data);
      } catch (error) {
        console.error(error);
      }
    }
  
    fetchData();
  }, []); 

  useEffect(() => {
    // Inicializar un objeto para contener el recuento de cada mes
    const countsPorMes = {
      enero: 0,
      febrero: 0,
      marzo: 0,
      abril: 0,
      mayo: 0,
      junio: 0,
      julio: 0,
      agosto:0,
      septiembre:0,
      octubre:0,
      noviembre:0,
      diciembre:0
    };

    // Contar la cantidad de veces que aparece cada mes en las facturas
    facturas.forEach(factura => {
      const fecha = new Date(factura.Fecha_fac);
      const mes = fecha.toLocaleString('default', { month: 'long' });
      countsPorMes[mes]++;
    });

    // Obtener los valores de los recuentos
    const valoresPorMes = Object.values(countsPorMes);

    // Crear el gráfico con los datos procesados
    const myChart = new Chart(chartRef.current, {
      type: 'line',
      data: {
        labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio'],
        datasets: [{
          label: 'Ventas generales',
          data: valoresPorMes,
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        }]
      },
      options: {}
    });

    return () => myChart.destroy();
  }, [facturas]);

  return <canvas ref={chartRef} />;
};

export default LineChart;
