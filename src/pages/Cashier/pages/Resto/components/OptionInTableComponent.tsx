import { Article, Paid, Print, Warning } from '@mui/icons-material'
import { Box, Button, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material'
import React, { useEffect, useRef, useState, FC } from 'react'
import { PaymentMethod } from '../../../../../models/PaymentMethod.model'
import { buyTableService, buyTableWithCustomerService, changeTableService, getPaymentMethods } from '../../../services/cashier.services'
import { DataToTicketPrinterComponent } from '../../AutoService/components/DataToTicketPrinterComponent'
import { DataTicketPrinterComponent } from './DataTicketPrinterComponent'
import { useReactToPrint } from 'react-to-print'
import { Sale } from '../../../../../models/sale.model'
import { ProductInTable } from '../../../../../models/Cashier/productInTable.model'
import { Table } from '../../../../../models/Cashier/table.model'
import ErrorMessageComponent from '../../../../../components/ErrorMessageComponent'
import { Customer } from '../../../../../models/Cashier/customer.model'
import { calculateTotalPoints } from '../../../utilities/cashier.utilities'
import { DataTicketInfoPrinterComponent } from './DataTicketInfoPrinterComponent'

interface Props {
  productsInTable: ProductInTable[];
  selectedTable: Table | null;
  showProductsInTable: () => void;
  customer: Customer | undefined;
  setCustomer: ((customer: Customer | undefined) => void);
}

const OptionInTableComponent: FC<Props> = ({ productsInTable, selectedTable, showProductsInTable, customer, setCustomer }) => {
  const [ticketState, setTicketState] = useState(false)
  const [ticketInfoState, setTicketInfoState] = useState(false)
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethod | undefined>(undefined)
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const componentRef = useRef<HTMLDivElement>(null); //para imprimir el ticket
  const componentRefInfo = useRef<HTMLDivElement>(null); //para imprimir el ticket
  const [DefaultPaymentMethod, setDefaultPaymentMethod] = useState<PaymentMethod>();
  const [ventaResult, setVentaResult] = useState<Sale | undefined>(undefined);
  const [message, setMessage] = useState<{ visible: boolean, type: string, message: string }>({ visible: false, type: "", message: "" });
  const [typeOfPrint, setTypeOfPrint] = useState(0); //0: VENTA, 1: CANJE, 2: VENTA CON CLIENTE IDENTIFICADO, 3: TICKET INFORMATIVO


  useEffect(() => {
    getPaymentMethods().then((res) => {
      setPaymentMethods(res);
      if (res.length > 0) {
        setDefaultPaymentMethod(res[0]);
      }
    });
  }, []);

  const handlePrint = useReactToPrint({ //para imprimir el ticket
    content: () => componentRef.current,
    onAfterPrint: () => {
      setTicketState(false)
      setCustomer(undefined);
      setVentaResult(undefined);
      showProductsInTable();
    }
  });
  const handleInfoPrint = useReactToPrint({ //para imprimir el ticket
    content: () => componentRefInfo.current,
    onAfterPrint: async () => {
      await setTicketInfoState(false)
    }
  });

  const setOptionsTicket = async (venta: Sale) => {
    await setTimeout(function () {
      setTicketState(true);
      setVentaResult(venta);
      setTimeout(handlePrint, 1);
    }, 1000); //este set timeout es solo para que se vea un poco mas de tiempo el mensaje de venta exitosa antes de imprimir el ticket
    //QUITAMOS LOS PRODUCTOS DEL CARRO.
  }

  const setOptionsTicketOnlyPrint = async () => {
    await setTicketInfoState(true);
    await handleInfoPrint();
  }

  const handleBuyTable = async () => {
    if (selectedPaymentMethod !== undefined) {
      if (selectedTable == null) {
        alert("NO HAY NINGUNA MESA SELECCIONADA");
        return;
      }
      if (customer) {
        //alert("VA A REALIZAR UNA VENTA CON UN CLIENTE ASOCIADO");
        const venta: Sale | 0 = await buyTableWithCustomerService(productsInTable, selectedPaymentMethod, selectedTable, customer);
        if (venta != 0) {
          setTypeOfPrint(2);
          //alert("VENTA EXITOSA A CLIENTE NO ASOCIADO");
          setMessage({ visible: true, type: "success", message: `VENTA EXITOSA A ${customer.member.idDocumento.nombres} ${customer.member.idDocumento.apellidos}` });
          await setOptionsTicket(venta); //TIPO DE IMPRESION: VENTA CON CLIENTE NO IDENTIFICADO
        }
      } else {
        const venta: Sale | 0 = await buyTableService(productsInTable, selectedPaymentMethod, selectedTable);
        //IMPRESION DE TICKET.
        if (venta != 0) {
          setTypeOfPrint(0);
          //alert("VENTA EXITOSA A CLIENTE NO ASOCIADO");
          setMessage({ visible: true, type: "success", message: "VENTA EXITOSA A CLIENTE NO ASOCIADO" });
          await setOptionsTicket(venta); //TIPO DE IMPRESION: VENTA CON CLIENTE NO IDENTIFICADO
        }
      }
    } else {
      setMessage({ visible: true, type: "error", message: "ERROR: NO SE PUEDE REALIZAR LA VENTA SELECCIONE METODO DE PAGO" });
      //alert("ERROR: NO SE PUEDE REALIZAR LA VENTA SELECCIONE METODO DE PAGO");
    }
  }
  const handleChangeTable = async (customer: Customer | undefined) => {
    if (customer && selectedTable !== null) {
      const venta: Sale | 0 = await changeTableService(productsInTable, selectedTable, customer)
      if (venta != 0) {
        setMessage({ visible: true, type: "success", message: `CANJE EXITOSO A ${customer.member.idDocumento.nombres} ${customer.member.idDocumento.apellidos}` });
        setTypeOfPrint(1);
        //alert("VENTA EXITOSA A CLIENTE NO ASOCIADO");
        await setOptionsTicket(venta); //TIPO DE IMPRESION: VENTA CON CLIENTE NO IDENTIFICADOE
      } else {
        alert("ERROR: NO SE PUEDE REALIZAR EL CANGE");
      }
    }
  }

  const handleOnlyPrint = async () => {
    await setOptionsTicketOnlyPrint();
  }

  const productWithCeroPintCost = productsInTable.some(
    (productInTable) => productInTable.totalCostPoints === 0
  );

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      {message.visible && (
        <div style={{ position: "absolute", top: "50", left: 0, right: 0, height: "150px", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100 }}>
          <ErrorMessageComponent
            message={message}
            setMessage={setMessage}
          />
        </div>
      )}
      <div style={{}} >
        {paymentMethods && (
          <div style={{ paddingLeft: "0%", width: "100%" }}>
            <InputLabel style={{ color: "white" }} id="payment-method-label">
              Forma de pago
            </InputLabel>
            <Select
              labelId="payment-method-label"
              value={selectedPaymentMethod ? selectedPaymentMethod.id : ""}
              onChange={async (event: SelectChangeEvent<unknown>) =>
                await setSelectedPaymentMethod(paymentMethods.find((pm) => pm.id === event.target.value))
              }
              style={{
                color: "white",
                width: "150%",
                backgroundColor: "GrayText",
              }}
            >
              {paymentMethods.map((paymentMethod) => (
                <MenuItem key={paymentMethod.id} value={paymentMethod.id}>
                  {paymentMethod.name}
                </MenuItem>
              ))}
            </Select>
          </div>
        )}
      </div>
      <div style={{ marginTop: "30px", paddingLeft: "10%" }}>
        <Box sx={{ '& button': { m: 1 } }}>
          <Button
            startIcon={<Article />}
            endIcon={<Print />}
            variant='contained'
            onClick={() => handleOnlyPrint()}
          >
            Imprimir ticket
          </Button>
          <Button
            style={{ backgroundColor: "#A3A034" }}
            startIcon={<Warning />}
            endIcon={<Paid />}
            variant='contained'
            onClick={async () => { await setTypeOfPrint(3); await handleBuyTable() }}>
            Cobrar y Cerrar Mesa
          </Button>
          <Button
            style={{ backgroundColor: "#A3A034" }}
            startIcon={<Warning />}
            endIcon={<Paid />}
            variant='contained'
            disabled={productWithCeroPintCost || productsInTable.length <= 0 || (customer ? customer.memberClub.puntosClub < calculateTotalPoints(productsInTable) : true)}
            onClick={async () => { await handleChangeTable(customer) }}
          >
            Canjear y cerrar mesa
          </Button>
        </Box>
      </div>
      <div style={{ display: "none" }}>
        {(ticketState && selectedPaymentMethod !== undefined) && (
          <DataTicketPrinterComponent
            ventaResult={ventaResult}
            productsInTable={productsInTable}
            typeOfPrint={typeOfPrint}
            ref={componentRef}
            customer={customer}
          />
        )}
      </div>
      <div style={{ display: "none" }}>
        {(ticketInfoState) && (
          <DataTicketInfoPrinterComponent
            productsInTable={productsInTable}
            ref={componentRefInfo}
          />
        )}
      </div>
    </div>
  );
}

export default OptionInTableComponent