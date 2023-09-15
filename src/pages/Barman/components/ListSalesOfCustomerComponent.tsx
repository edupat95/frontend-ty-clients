import React, { useState } from 'react';
import { Sale } from '../../../models/sale.model';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TableFooter } from '@mui/material';
import { ProductInCart } from '../../../models/Cashier/productInCart.model';
import ListProductsInSale from './ListProductsInSale';
import { deliverProductsService } from '../services/barman.service';

interface ListSalesOfCustomerProps {
  sales: Sale[];
  handleDeliverProduct: () => void;
}


const ListSalesOfCustomerComponent: React.FC<ListSalesOfCustomerProps> = ({ sales, handleDeliverProduct }) => {

  return (
    <div>
      <TableContainer>
        <Table style={{ width: "50%", margin: "auto" }}>
          <TableHead>
            <TableRow>
              <TableCell style={{ padding: "15px", color: "white", fontWeight: "bolder", fontSize: "18px" }}>Productos</TableCell>
              <TableCell style={{ padding: "15px", color: "white", fontWeight: "bolder", fontSize: "18px" }}>Fecha de Venta</TableCell>
              <TableCell style={{ padding: "15px", color: "white", fontWeight: "bolder", fontSize: "18px" }}>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sales.map((sale) => (
              <TableRow key={sale.id}>
                <TableCell style={{ padding: "15px", color: "white", fontWeight: "bolder", fontSize: "18px" }} ><ListProductsInSale sale={sale} /></TableCell>
                <TableCell style={{ padding: "15px", color: "white", fontWeight: "bolder", fontSize: "18px" }} >{new Date(sale.createdDate).toLocaleString()}</TableCell>
                <TableCell style={{ padding: "15px", color: "white", fontWeight: "bolder", fontSize: "18px" }} >
                  <Button
                    variant='contained'
                    color='success'
                    onClick={async () => { await deliverProductsService(sale) ? alert("Productos entregado con exito") : alert("Error al entregar el producto"); handleDeliverProduct(); }}
                  >Entregar</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ListSalesOfCustomerComponent;
