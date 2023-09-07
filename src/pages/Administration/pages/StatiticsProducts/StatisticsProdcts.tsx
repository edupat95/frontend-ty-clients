import React, {useEffect, useState} from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';
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
import { getProductSales, getSales } from '../../services/statistics.service';
import { ProductoVenta } from '../../../../models/Administration/productoVenta.model';
import { getProductosYCantidades } from '../../utilities/administration.utilities';
import { ProductInCart } from '../../../../models/Cashier/productInCart.model';
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
      text: 'Porudcto mas vendido en el evento',
      font: {
        size: 20,
      },
    },
  },
  
};

const labels = ['Fernet', 'Cerveza', 'Agua', 'Absolute', 'Botella fernet', 'Soda', 'Gin'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Cantidad',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      backgroundColor: 'rgba(42, 91, 114, 0.5)',
    },
  ],
};


function StatisticsProdcts() {
  const [dataA, setDataA] = useState<any>();
  
  useEffect(() => { 
    handleGetProductsSales();
  }, []); 

  const handleGetProductsSales = async () => {
    let productosVenta: Array<ProductoVenta> = await getProductSales();
    let productosYCantidades: Array<ProductInCart> = getProductosYCantidades(productosVenta);
    const labels = productosYCantidades.map((productoYCantidades: ProductInCart) => productoYCantidades.product.nombre);
    const dataLabels = productosYCantidades.map((productoYCantidades: ProductInCart) => productoYCantidades.quantity);
    const data = {
      labels,
      datasets: [
        {
          label: 'Cantidad',
          data: dataLabels,
          backgroundColor: 'rgba(42, 91, 114, 0.5)',
        },
      ],
    };
    setDataA(data);
    //console.log("Desde el handleGetProductsSales -> " + JSON.stringify(productosYCantidades));
    //console.log("Desde el handleGetProductsSales -> " + JSON.stringify(productosVenta));
  }
  
  return (
    <div>
      <div>
        <div className="barComponent">
          <Bar data={ dataA ? dataA : data } options={options} />
          <Button
            onClick={() => handleGetProductsSales()}
            color="success"
            variant='contained'
          >
            Obtener ventas
          </Button>
        </div>
      </div>
    </div>
  )
}

export default StatisticsProdcts