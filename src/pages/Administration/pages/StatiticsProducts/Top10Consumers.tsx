import React, {useState, useEffect} from 'react'
import { getProductSales, getSales } from '../../services/statistics.service';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
} from 'chart.js';
import { faker } from '@faker-js/faker';
import '../../styles/Statistics.css';
import { Button } from '@mui/material';
import { ProductoVenta } from '../../../../models/Administration/productoVenta.model';
import { getProductosYCantidades, getSalesConsumers } from '../../utilities/administration.utilities';
import { ProductInCart } from '../../../../models/Cashier/productInCart.model';
import { Venta } from '../../../../models/Administration/venta.model';
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      font: {
        size: 20,
      },
      text: 'Top 10 consumidores',
    },
  },
  
};

const labels = ['Messi', 'Patinella Narvaez', 'Martinez'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Ventas totales',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 10 })),
      backgroundColor: 'rgba(120, 31, 126, 0.5)',
    },
    {
      label: 'Productos comprados',
      data: labels.map(() => faker.datatype.number({ min: 10, max: 20 })),
      backgroundColor: 'rgba(126, 194, 131, 0.5)',
    },
  ],
};


function Top10Consumers() {
  
  const handleGetProductSales = async () => {
    let solds: Array<Venta> = await getSales();
    return 0
  }
  
  return (
    <div>
      <div>
        <div className="barComponent">
          <Bar data={ data } options={options} />
          <Button
            onClick={() => handleGetProductSales()}
            color="success"
            variant='contained'
          >
            Obtener ventas y productos
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Top10Consumers