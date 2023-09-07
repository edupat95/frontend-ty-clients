import React, { forwardRef } from 'react';
import "../../../styles/ProductInMenu.css";
import { QRCodeCanvas } from 'qrcode.react';
import { Sale } from '../../../../../models/sale.model';
import { ProductInTable } from '../../../../../models/Cashier/productInTable.model';
import { Product } from '../../../../../models/Cashier/product.model';
import { getSession } from '../../../../../utilities/public.utilities';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { PaymentMethod } from '../../../../../models/PaymentMethod.model';
import { Customer } from '../../../../../models/Cashier/customer.model';
type Props = {
  productsInTable: ProductInTable[];
};

const thStyle = {
  fontSize: "50px",
  fontFamily: "Anton",
  fontWeight: "normal",
  fontStyle: "normal",
  with: "80%",
};

const headerTicketStyle = {
  fontSize: "50px",
  fontFamily: "Anton",
  fontWeight: "normal",
  fontStyle: "normal",
  with: "100%",

}

export const DataTicketInfoPrinterComponent = forwardRef<HTMLDivElement, Props>((props, ref) => {
  let total = 0;

  props.productsInTable.forEach((productInTable) => {
    total = total + (productInTable.quantity * productInTable.product.precio);
  });
  return (
    <>
      <div ref={ref}>
        <div style={headerTicketStyle}>
          <p style={{ textAlign: 'center' }}>
            Empresa: {getSession().club.nombre} <br />
            Fecha: {new Date().toLocaleString('es-AR', {
              timeZone: 'America/Argentina/Buenos_Aires',
              dateStyle: 'medium',
            })}
            < br />
          </p>
        </div>
        <table style={thStyle} className="table">
          <thead>
            <tr>
              <th>PRODUCTOS</th>
              <th>Cantidad</th>
              <th>Precio $</th>
              <th>Horario pedido</th>
            </tr>
          </thead>
          <tbody>
            {props.productsInTable.map((productInTable) => (
              <tr key={productInTable.product.id}>
                <td style={{ textAlign: 'center' }}>{productInTable.product.nombre}</td>
                <td style={{ textAlign: 'center' }}>{productInTable.quantity}</td>
                <td style={{ textAlign: 'center' }}>{(productInTable.quantity * productInTable.product.precio)}</td>
                <td style={{ textAlign: 'center' }}> {new Date(productInTable.createdDate).toLocaleString('es-AR', {
                    timeZone: 'America/Argentina/Buenos_Aires',
                    hour: 'numeric',
                    minute: 'numeric'
                })} </td>
              </tr>
            ))}
            <tr >
              <td style={{ textAlign: 'center' }}>TOTAL</td>
              <td style={{ textAlign: 'center' }}> - </td>
              <td style={{ textAlign: 'center' }}>{total}</td>
            </tr>
            
          </tbody>
        </table>
        <div style={{ textAlign: "center" }}>
          <p>
            <br />
            <br />
            TY Clients system ®. founder: Eduardo Michel Patinella<br />
            Email: eduardo.patinella@tyclients.com
          </p>
        </div>
      </div>
    </>
  );
});
