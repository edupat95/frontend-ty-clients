import React, { useEffect, useState } from 'react'
import { Sale } from '../../../models/sale.model'
import { ProductInCart } from '../../../models/Cashier/productInCart.model';
import { getProductsInSale } from '../../Administration/services/boxesControl.services';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

interface ListSalesOfCustomerProps {
  sale: Sale
}

const ListProductsInSale: React.FC<ListSalesOfCustomerProps> = ({ sale }) => {
  const [productsInSale, setProductsInSale] = useState<ProductInCart[]>([]);
  useEffect(() => {
    const fetchProductsInSale = async () => {
      try {
        const products = await getProductsInSale(sale);
        setProductsInSale(products);
      } catch (error) {
        console.error('Error al obtener los productos en la venta:', error);
      }
    };
    fetchProductsInSale();
  }, [sale]);
  return (
    <div>
        <TableContainer >
          <Table style={{ width: "30%", margin: "auto" }}>
            <TableHead>
              <TableRow>
                <TableCell style={{ padding: "15px", color: "white", fontWeight: "bolder", fontSize: "18px" }} >Nombre</TableCell>
                <TableCell style={{ padding: "15px", color: "white", fontWeight: "bolder", fontSize: "18px" }} >Descripción</TableCell>
                <TableCell style={{ padding: "15px", color: "white", fontWeight: "bolder", fontSize: "18px" }}>Cantidad</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {productsInSale.map((productInCart: ProductInCart) => (
                <TableRow key={productInCart.product.id}>
                  <TableCell style={{ padding: "15px", color: "white", fontSize: "18px" }} component="th" scope="row">
                    {productInCart.product.nombre}
                  </TableCell>
                  <TableCell style={{ padding: "15px", color: "white", fontSize: "18px" }} component="th" scope="row">
                    {productInCart.product.descripcion}
                  </TableCell>
                  <TableCell style={{ padding: "15px", color: "white", fontSize: "18px" }} align="right">{productInCart.quantity}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
    </div>
  )
}

export default ListProductsInSale