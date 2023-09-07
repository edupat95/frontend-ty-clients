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
  typeOfPrint: number;
  ventaResult: Sale | undefined;
  customer: Customer | undefined;
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

export const DataTicketPrinterComponent = forwardRef<HTMLDivElement, Props>((props, ref) => {
  let totalPoints = 0;
  let total = 0;
  let totalRecompensa = 0;

  if (props.typeOfPrint === 0 || props.typeOfPrint === 2) {
    //console.log("calculamos el total en $");
    props.productsInTable.forEach((productInTable) => {
      total = total + (productInTable.quantity * productInTable.product.precio);
      if (props.typeOfPrint === 2) {
        totalRecompensa = totalRecompensa + (productInTable.quantity * productInTable.product.puntosRecompensa);
      }
    });
  } else if (props.typeOfPrint === 1 || props.typeOfPrint === 3) {
    //console.log("calculamos el total en puntos");
    props.productsInTable.forEach((productInTable) => {
      totalPoints = totalPoints + (productInTable.quantity * productInTable.product.precioPuntos);
    });
  }

  return (
    <>
      {props.ventaResult?.identificadorTicket && (
        <div ref={ref}>
          <div style={headerTicketStyle}>
            <div style={{ textAlign: 'center' }}>
              <p>
                Empresa: {getSession().club.nombre} <br />
                Fecha: {new Date().toLocaleString('es-AR', {
                  timeZone: 'America/Argentina/Buenos_Aires',
                  dateStyle: 'medium',
                })}
              </p>
            </div>
            {props.customer ?
              <div style={{ textAlign: 'center' }}>
                <p>
                  Cliente: {props.customer.member.idDocumento.nombres} {props.customer.member.idDocumento.apellidos} <br />
                  DNI: {props.customer.member.idDocumento.numeroDni}<br />
                  Puntos actuales: {(props.typeOfPrint === 1) ?
                    ((props.customer.memberClub.puntosClub - totalPoints) + "(-" + totalPoints + ")")
                    :
                    ((props.customer.memberClub.puntosClub + totalRecompensa) + "(+" + totalRecompensa + ")")}
                </p>
              </div>
              :
              <div style={{ textAlign: 'center' }}>
                <p>Cliente no identificado.</p>
              </div>
            }

          </div>
          <table style={thStyle} className="table">
            <thead>
              <tr>
                <th>PRODUCTOS</th>
                <th>Cantidad</th>
                {(props.typeOfPrint === 1) ? <th>Precio en puntos</th> : <th>Precio $</th>}
                <th>Horario pedido</th>
              </tr>
            </thead>
            <tbody>
              {props.productsInTable.map((productInTable) => (
                <tr key={productInTable.product.id}>
                  <td style={{ textAlign: 'center' }}>{productInTable.product.nombre}</td>
                  <td style={{ textAlign: 'center' }}>{productInTable.quantity}</td>
                  <td style={{ textAlign: 'center' }}>{(props.typeOfPrint === 1) ? (productInTable.quantity * productInTable.product.precioPuntos) : (productInTable.quantity * productInTable.product.precio)}</td>
                  <td style={{ textAlign: 'center' }}> {new Date(productInTable.createdDate).toLocaleString('es-AR', {
                    timeZone: 'America/Argentina/Buenos_Aires',
                    hour: 'numeric',
                    minute: 'numeric'
                  })} </td>
                </tr>
              ))}
              <tr>
                <td style={{ textAlign: 'center' }}>TOTAL</td>
                <td style={{ textAlign: 'center' }}> - </td>
                <td style={{ textAlign: 'center' }}>{(props.typeOfPrint === 1) ? totalPoints : total}</td>
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
      )}
    </>
  );
});
