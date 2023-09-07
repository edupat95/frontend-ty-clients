import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import '../../styles/Statistics.css'
import { Button } from '@mui/material';
import { ProductoVenta } from '../../../../models/Administration/productoVenta.model';
import { ProductInCart } from '../../../../models/Cashier/productInCart.model';
import { getProductSales } from '../../services/statistics.service';
import { getProductosYCantidades } from '../../utilities/administration.utilities';

ChartJS.register(ArcElement, Tooltip, Legend);

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
      text: 'Productos mas vendidos',
    },
  },

};

export const data = {
  labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
  datasets: [
    {
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        'rgba(255, 99, 132, 0.5)',
        'rgba(54, 162, 235, 0.5)',
        'rgba(255, 206, 86, 0.5)',
        'rgba(75, 192, 192, 0.5)',
        'rgba(153, 102, 255, 0.5)',
        'rgba(255, 159, 64, 0.5)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      borderWidth: 1,
    },
  ],
};


function TopProducts() {
  const [dataA, setDataA] = useState<any>();

  useEffect(() => {
    handleGetProductsSales();
  }, []);

  const handleGetProductsSales = async () => {
    const productosVenta: Array<ProductoVenta> = await getProductSales();
    const productosYCantidades: Array<ProductInCart> = getProductosYCantidades(productosVenta);
    const labels = productosYCantidades.map((productoYCantidades: ProductInCart) => productoYCantidades.product.nombre);
    const dataLabels = productosYCantidades.map((productoYCantidades: ProductInCart) => productoYCantidades.quantity);
    const data = {
      labels,
      datasets: [
        {
          label: 'Cant. Vendida',
          data: dataLabels,
          backgroundColor: [
            'rgba(255, 99, 132, 0.5)',
            'rgba(54, 162, 235, 0.5)',
            'rgba(255, 206, 86, 0.5)',
            'rgba(75, 192, 192, 0.5)',
            'rgba(153, 102, 255, 0.5)',
            'rgba(255, 159, 64, 0.5)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
          ],
          borderWidth: 1,
        },
      ],
    };
    setDataA(data);
    //console.log("Desde el handleGetProductsSales -> " + JSON.stringify(productosYCantidades));
    //console.log("Desde el handleGetProductsSales -> " + JSON.stringify(productosVenta));
  }

  return (
    <div className='topProductsComponent'>
      <Doughnut data={dataA ? dataA : data} options={options} />
      <Button
        onClick={() => handleGetProductsSales()}
        color="success"
        variant='contained'
      >
        Obtener productos 
      </Button>
    </div>
  )
}

export default TopProducts