import { Delete, MonetizationOnOutlined, PublishedWithChangesOutlined, RemoveShoppingCartOutlined } from '@mui/icons-material';
import { Button, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import React, { FC, useEffect, useRef, useState } from 'react'
import { Customer } from '../../../../../models/Cashier/customer.model';
import { ProductInCart } from '../../../../../models/Cashier/productInCart.model';
import { PaymentMethod } from '../../../../../models/PaymentMethod.model';
import { Sale } from '../../../../../models/sale.model';
import { buyCart, buyCartUnidentifiedCustomer, changeCart, getPaymentMethods } from '../../../services/cashier.services';
import { calculateTotalPoints, calculateTotalPrice, calculateTotalReward } from '../../../utilities/cashier.utilities';
import { DataToTicketPrinterComponent } from './DataToTicketPrinterComponent';
import { useReactToPrint } from 'react-to-print';
import ErrorMessageComponent from '../../../../../components/ErrorMessageComponent';
interface Props {
  cart: ProductInCart[];
  customer: Customer | undefined;
  dispatch: any;
  setCustomer: ((customer: Customer | undefined) => void);
}

const OptionsInCartComponent: FC<Props> = ({
  cart,
  customer,
  dispatch,
  setCustomer
}) => {
  const [isRedeemDisabled, setIsRedeemDisabled] = useState(false);
  const [ventaResult, setVentaResult] = useState<Sale>();
  const [ticketState, setTicketState] = useState(false);
  const [typeOfPrint, setTypeOfPrint] = useState(1); //0: VENTA, 1: CANJE, 2: VENTA CON CLIENTE IDENTIFICADO
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [DefaultPaymentMethod, setDefaultPaymentMethod] = useState<PaymentMethod>();
  const [selectedPaymentMethod, setselectedPaymentMethod] = useState<PaymentMethod>();
  const componentRef = useRef<HTMLDivElement>(null); //para imprimir el ticket
  const [message, setMessage] = useState<{ visible: boolean, type: string, message: string }>({ visible: false, type: "", message: "" });

  useEffect(() => {
    getPaymentMethods().then((res) => {
      setPaymentMethods(res);
      if (res.length > 0) {
        setDefaultPaymentMethod(res[0]);
      }
    });
  }, []);


  useEffect(() => {
    const hasZeroPointProduct = cart.some((product) => product.product.precioPuntos === 0);
    setIsRedeemDisabled(hasZeroPointProduct);
  }, [cart]);


  const setOptionsTicket = async (typeOfPrint: number, venta: Sale) => {
    await setTicketState(true);
    await setTypeOfPrint(typeOfPrint);
    await setVentaResult(venta);
    await setTimeout(handlePrint, 1);
  }

  const handleBuyCart = async () => {
    if (customer && selectedPaymentMethod !== undefined) {
      const venta: Sale | 0 = await buyCart(customer.member?.id, cart, selectedPaymentMethod);
      if (venta != 0) {
        alert("Venta exitosa " + (customer ? customer.member.idDocumento.nombres + " " + customer.member.idDocumento.apellidos : "") + " + " + calculateTotalReward(cart) + "pts");
        //IMPRESION DE TICKET.
        await setOptionsTicket(2, venta); //TIPO DE IMPRESION: VENTA CON CLIENTE IDENTIFICADO
      } else {
        alert("ERROR: NO SE PUEDE REALIZAR LA VENTA");
      }
    } else if (selectedPaymentMethod !== undefined) {
      const venta: Sale | 0 = await buyCartUnidentifiedCustomer(cart, selectedPaymentMethod);
      //IMPRESION DE TICKET.
      if (venta != 0) {
        await setMessage({ visible: true, type: "success", message: "VENTA EXITOSA A CLIENTE NO ASOCIADO" });
        //alert("VENTA EXITOSA A CLIENTE NO ASOCIADO");
        await setOptionsTicket(0, venta); //TIPO DE IMPRESION: VENTA CON CLIENTE NO IDENTIFICADO
      }
    } else {
      setMessage({ visible: true, type: "error", message: "ERROR: NO SE PUEDE REALIZAR LA VENTA SELECCIONE METODO DE PAGO" });
      alert("ERROR: NO SE PUEDE REALIZAR LA VENTA SELECCIONE METODO DE PAGO");
    }
  }

  const handleChangeCart = async () => {
    if (customer) {
      const venta: Sale | 0 = await changeCart(customer.member.id, cart)
      if (venta != 0) {
        setMessage({ visible: true, type: "success", message: `CANJE EXITOSO A ${customer.member.idDocumento.nombres} ${customer.member.idDocumento.apellidos}` });
        //alert("Canje exitoso, " + (customer ? customer.member.idDocumento.nombres + " " + customer.member.idDocumento.apellidos : "") + " -" + calculateTotalPoints(cart) + "pts");
        //IMPRESION DE TICKET
        await setOptionsTicket(1, venta); //TIPO DE IMPRESION: CANGE
      } else {
        alert("ERROR: NO SE PUEDE REALIZAR EL CANGE");
      }
    }
  }
  const handlePrint = useReactToPrint({ //para imprimir el ticket
    content: () => componentRef.current,
    onAfterPrint: () => {
      setTicketState(false)
      //QUITAMOS LOS PRODUCTOS DEL CARRO.
      dispatch({ type: "CLEAR_CART" });
      //QUITAMOS EL CLIENTE.
      setCustomer(undefined);
      setVentaResult(undefined);
    }
  });

  return (
    <div>
      {message.visible && (
        <div style={{ position: "absolute", top: "50", left: 0, right: 0, height: "150px", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100 }}>
          <ErrorMessageComponent
            message={message}
            setMessage={setMessage}
          />
        </div>
      )}
      <div style={{ width: "80%", flex: "1", display: "flex", padding: "10px" }}>
        <div style={{ width: "15%" }}>
          {paymentMethods && (
            <>
              <InputLabel style={{ color: "white" }} id="payment-method-label">Forma de pago</InputLabel>
              <Select
                labelId="payment-method-label"
                value={selectedPaymentMethod ? selectedPaymentMethod : ""}
                onChange={(event: SelectChangeEvent<unknown>) =>
                  setselectedPaymentMethod(event.target.value as PaymentMethod)
                }
                style={{ color: "white", width: "100%", backgroundColor: "GrayText" }}
              >
                {paymentMethods.map((paymentMethod) => (
                  <MenuItem key={paymentMethod.id} value={paymentMethod.id}>
                    {paymentMethod.name}
                  </MenuItem>
                ))}
              </Select>
            </>
          )}
        </div>
        <div style={{ paddingLeft: "15%" }}>
          Total: <mark> ${calculateTotalPrice(cart)}</mark>
          <br />
          <Button variant="contained" startIcon={<MonetizationOnOutlined />} onClick={() => handleBuyCart()} disabled={(cart.length > 0) ? false : true}> Pagar </Button>
          <br />
          Recompensa:  {calculateTotalReward(cart)}
        </div>
        <div style={{ paddingLeft: "80px" }}>
          Limpiar el carro
          <br />
          <Button variant="contained" startIcon={<RemoveShoppingCartOutlined />} endIcon={<Delete />} onClick={() => dispatch({ type: "CLEAR_CART" })}> </Button>
        </div>
        <div style={{ paddingLeft: "100px" }}>
          Total(pts): {calculateTotalPoints(cart)}
          <br />
          <Button
            variant="contained"
            startIcon={<PublishedWithChangesOutlined />}
            onClick={() => handleChangeCart()}
            disabled={
              ((calculateTotalPoints(cart) > (customer ? customer.memberClub.puntosClub : -1)) || (cart.length === 0) || isRedeemDisabled)
                ? true : false
            }> Canjear </Button>
        </div>
      </div>
      <div style={{ display: "none" }}>
        {ticketState && (<DataToTicketPrinterComponent
          ref={componentRef}
          cart={cart}
          typeOfPrint={typeOfPrint}
          customer={customer}
          venta={ventaResult}
        />
        )}
      </div>
    </div>
  )
}

export default OptionsInCartComponent