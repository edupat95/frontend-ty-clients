import React, { forwardRef } from 'react';
import "../../../styles/ProductInMenu.css";
import { QRCodeCanvas } from 'qrcode.react';
import { ProductInCart } from '../../../../../models/Cashier/productInCart.model';
import { Customer } from '../../../../../models/Cashier/customer.model';
import { Sale } from '../../../../../models/sale.model';
import { getSession } from '../../../../../utilities/public.utilities';
type Props = {
  cart: ProductInCart[];
  typeOfPrint: number;
  customer: Customer | null | undefined;
  venta: Sale | undefined;
};
const thStyle = {
  fontSize: "50px",
  fontFamily: "Anton",
  fontWeight: "normal",
  fontStyle: "normal",
  with: "100%",
  padding: "10%",
};

const headerTicketStyle = {
  fontSize: "50px",
  fontFamily: "Anton",
  fontWeight: "normal",
  fontStyle: "normal",
  with: "100%",
}

export const DataToTicketPrinterComponent = forwardRef<HTMLDivElement, Props>((props, ref) => {

  let totalPoints = 0;
  let total = 0;
  let totalRecompensa = 0;

  if (props.typeOfPrint === 0 || props.typeOfPrint === 2) {
    //console.log("calculamos el total en $");
    props.cart.forEach((productInCart) => {
      total = total + (productInCart.quantity * productInCart.product.precio);
      if (props.typeOfPrint === 2) {
        totalRecompensa = totalRecompensa + (productInCart.quantity * productInCart.product.puntosRecompensa);
      }
    });
  } else if (props.typeOfPrint === 1) {
    //console.log("calculamos el total en puntos");
    props.cart.forEach((productInCart) => {
      totalPoints = totalPoints + (productInCart.quantity * productInCart.product.precioPuntos);
    });
  }

  return (
    <>
      {props.venta?.identificadorTicket && (
        <div ref={ref}>
          <div style={headerTicketStyle}>
            {props.customer ?
              <div style={{ textAlign: 'center' }}>
                <p>
                  Empresa: {getSession().club.nombre} <br />
                  Fecha: {new Date().toLocaleString('es-AR', {
                    timeZone: 'America/Argentina/Buenos_Aires',
                    dateStyle: 'medium',
                  })} <br />
                  Cliente: {props.customer.member.idDocumento.nombres} {props.customer.member.idDocumento.apellidos} <br />
                  DNI: {props.customer.member.idDocumento.numeroDni}<br />
                  Puntos: {(props.typeOfPrint === 1) ?
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
              </tr>
            </thead>
            <tbody>
              {props.cart.map((productInCart) => (
                <tr key={productInCart.product.id}>
                  <td style={{ textAlign: 'center' }}>{productInCart.product.nombre}</td>
                  <td style={{ textAlign: 'center' }}>{productInCart.quantity}</td>
                  <td style={{ textAlign: 'center' }}>{(props.typeOfPrint === 1) ? (productInCart.quantity * productInCart.product.precioPuntos) : (productInCart.quantity * productInCart.product.precio)}</td>
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
            <QRCodeCanvas
              value={props.venta.identificadorTicket}
              size={400}
            />
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


/*
const DataToTicketPrinter: FC<Props> = React.forwardRef (( ref )) => {
  return (
    <table style={thStyle} className="table">
          <thead>
              <tr>
                <th>&nbsp;</th>
                <th>Cantidad</th>
                <th>Precio $</th>
                <th>Precio en puntos</th>
              </tr>
          </thead>
          <tbody>
              <tr>
                <td>Product A</td>
                <td>5</td>
                <td>6</td>
                <td>1</td>
              </tr>
              <tr>
                <td>Product B</td>
                <td>1</td>
                <td>5</td>
                <td>2</td>
              </tr>
              <tr>
                <td>Product C</td>
                <td>1</td>
                <td>6</td>
                <td>8</td>
              </tr>
              <tr>
                <td>Product D</td>
                <td>1</td>
                <td>2</td>
                <td>0</td>
              </tr>
              <tr>
                <td>Product E</td>
                <td>3</td>
                <td>0</td>
                <td>3</td>
              </tr>
              <tr>
                <td><strong>Total</strong></td>
                <td>11</td>
                <td>19</td>
                <td>14</td>
              </tr>
              <tr>
                <td colSpan={4}>
                  <QRCodeCanvas
                  value={"https://www.tyclients.com"}
                  size={350}
                />
                </td>
              </tr>
          </tbody>
          <p>TY Clients system ®. founder: Eduardo Michel Patinella
          Email: eduardo.patinella@tyclients.com</p>
        </table>
  )
}

export default DataToTicketPrinter

*/