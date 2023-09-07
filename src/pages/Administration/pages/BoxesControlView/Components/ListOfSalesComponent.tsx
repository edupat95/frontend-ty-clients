import React, { FC, useEffect } from 'react';
import { Cashier } from '../../../../../models/Cashier/cashier.model';
import { Sale } from '../../../../../models/sale.model';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

interface Props {
  cashier: Cashier;
  sales: Sale[];
  setSelectedSale: (sale: Sale) => void;
  setTotalInBox: (total: number) => void;
}

const ListOfSalesComponent: FC<Props> = ({ cashier, sales, setSelectedSale, setTotalInBox }) => {
  useEffect(() => {
    // Calcular el total de las ventas que se están mostrando
    const totalInBox = sales
      .filter((sale) => sale.cajero.id === cashier.id)
      .reduce((total, sale) => total + sale.costoTotal, 0);
    // Llamar al método setTotalInBox con el valor calculado
    setTotalInBox(totalInBox);
  }, [cashier.id, sales, setTotalInBox]);
  return (
    <div>
      <TableContainer >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ padding: "15px", color: "white", fontWeight: "bolder", fontSize: "18px" }}>Descripción cajero</TableCell>
              <TableCell style={{ padding: "15px", color: "white", fontWeight: "bolder", fontSize: "18px" }}>Venta ID</TableCell>
              <TableCell style={{ padding: "15px", color: "white", fontWeight: "bolder", fontSize: "18px" }}>Estado</TableCell>
              <TableCell style={{ padding: "15px", color: "white", fontWeight: "bolder", fontSize: "18px" }}>Forma de pago</TableCell>
              <TableCell style={{ padding: "15px", color: "white", fontWeight: "bolder", fontSize: "18px" }}>Fecha y Hora</TableCell>
              <TableCell style={{ padding: "15px", color: "white", fontWeight: "bolder", fontSize: "18px" }}>Costo Total</TableCell>
              <TableCell style={{ padding: "15px", color: "white", fontWeight: "bolder", fontSize: "18px" }}>Costo Total Puntos</TableCell>
              <TableCell style={{ padding: "15px", color: "white", fontWeight: "bolder", fontSize: "18px" }}>Ver detalles</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sales
            .filter((sale) => sale.cajero.id === cashier.id)
            .map((sale) => {
              //const cashier = getCashierById(sale.cajero.id);

              const fechaHora = new Date(sale.createdDate);
              // Obtener partes de la fecha y hora
              const dia = fechaHora.getUTCDate();
              const mes = fechaHora.getUTCMonth() + 1; // Los meses en JavaScript son base 0
              const anio = fechaHora
                .getUTCFullYear()
                .toString()
                .substr(-2);

              let hora = fechaHora.getUTCHours() - 3; // Restar 3 horas para convertir a hora de Colombia
              if (hora < 0) {
                hora += 24;
              }
              const minutos = fechaHora.getUTCMinutes();

              // Formatear la fecha y hora en el formato deseado
              const fechaFormateada = `${dia.toString().padStart(2, '0')}/${mes
                .toString()
                .padStart(2, '0')}/${anio}`;
              const horaFormateada = `${hora
                .toString()
                .padStart(2, '0')}:${minutos.toString().padStart(2, '0')}`;
          
              return (
                <TableRow key={sale.id}>
                  <TableCell style={{ padding: "15px", color: "white", fontSize: "18px" }}>{cashier.worker.descripcion}</TableCell>
                  <TableCell style={{ padding: "15px", color: "white", fontSize: "18px" }}>{sale.id}</TableCell>
                  <TableCell style={{ padding: "15px", color: "white", fontSize: "18px" }}>{sale.entregado ? "Entregado" : "No entregado"}</TableCell>
                  <TableCell style={{ padding: "15px", color: "white", fontSize: "18px" }}>{sale?.formaPago ? sale.formaPago.name : ""}</TableCell>
                  <TableCell style={{ padding: "15px", color: "white", fontSize: "18px" }}>{fechaFormateada} {horaFormateada} </TableCell>
                  <TableCell style={{ padding: "15px", color: "white", fontSize: "18px" }}>{sale.costoTotal}</TableCell>
                  <TableCell style={{ padding: "15px", color: "white", fontSize: "18px" }}>{sale.costoTotalPuntos}</TableCell>
                  <TableCell style={{ padding: "15px", color: "white", fontSize: "18px" }}>
                    <Button 
                    onClick={() => {setSelectedSale(sale)}}
                    variant='contained'
                    style={{top: "1%", position: "relative", marginTop: "1%"}}
                    > 
                    Detalles 
                    </Button>  
                  </TableCell>
                </TableRow>
              );
            })
            }
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ListOfSalesComponent;
