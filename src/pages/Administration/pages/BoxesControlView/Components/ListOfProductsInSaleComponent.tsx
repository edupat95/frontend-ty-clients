import React, { FC } from 'react';
import { ProductInCart } from '../../../../../models/Cashier/productInCart.model';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

interface Props {
  productsInSale: ProductInCart[];
}

const ListOfProductsInSaleComponent: FC<Props> = ({ productsInSale }) => {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell style={{ padding: "15px", color: "white", fontWeight: "bolder", fontSize: "18px" }}>Descripción</TableCell>
            <TableCell style={{ padding: "15px", color: "white", fontWeight: "bolder", fontSize: "18px" }}>Cantidad</TableCell>
            <TableCell style={{ padding: "15px", color: "white", fontWeight: "bolder", fontSize: "18px" }}>Precio</TableCell>
            <TableCell style={{ padding: "15px", color: "white", fontWeight: "bolder", fontSize: "18px" }}>Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {productsInSale.map((productInSale) => (
            <TableRow key={productInSale.product.id}>
              <TableCell style={{ padding: "15px", color: "white", fontSize: "18px" }}>{productInSale.product.descripcion}</TableCell>
              <TableCell style={{ padding: "15px", color: "white", fontSize: "18px" }}>{productInSale.quantity}</TableCell>
              <TableCell style={{ padding: "15px", color: "white", fontSize: "18px" }}>{productInSale.product.precio}</TableCell>
              <TableCell style={{ padding: "15px", color: "white", fontSize: "18px" }}>{productInSale.product.precio * productInSale.quantity}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ListOfProductsInSaleComponent;
