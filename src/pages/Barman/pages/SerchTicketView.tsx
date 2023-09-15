// Libs
import React, { useState } from 'react'
import { CloseOutlined, QrCodeScannerOutlined } from '@mui/icons-material';
import { getProductsInSale } from '../../Administration/services/boxesControl.services';
import { ProductInCart } from '../../../models/Cashier/productInCart.model';
import { Button, Input, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { deliverProductsService, serchTicketService } from '../services/barman.service';
import { RandomUUIDOptions } from 'crypto';
import { Sale } from '../../../models/sale.model';

const SerchTicketView = () => {
  const [scann, setScann] = useState(false);
  const [auxText, setAuxText] = useState("");
  const [identificador, setIdentificador] = useState("");
  const [saleData, setSaleData] = useState<Sale | null>(null);
  const [productsInSale, setProductsInSale] = useState<ProductInCart[]>([]);

  const handleKeyDown = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.keyCode === 13) { // Verificar si se presionó "Enter"
      await setIdentificador(auxText);
      //await console.log(`User typed: ${auxText}`);
      await setScann(false);
      await serchTicket(auxText);

    } else if (event.key.match(/^[a-zA-Z0-9 \-"]$/)) {
      //console.log(`User typed: ${event.key}`);
      setAuxText((prevTypedText) => prevTypedText + event.key.toLowerCase());
    }
    event.preventDefault();
  };

  const serchTicket = async (identificador: String) => {
    await setAuxText("");
    //console.log(`serchTicket: ${identificador}`)
    const sale: Sale | null = await serchTicketService(identificador);
    await setSaleData(sale);
    if (sale?.entregado == true) {
      alert("La venta ya fue entregada");
      return;
    } else {

    }
    if (sale) {
      if (sale.entregado) {
        alert("La venta ya fue entregada");
      } else {
        //console.log("DATOS DE LA VENTA", sale);
        setProductsInSale(await getProductsInSale(sale));
      }
    } else {
      alert("Ticket no valido");
    }
  }

  const handleDeliverProduct = async () => {
    if (saleData != null) {
      if (saleData.entregado == true) {
        alert("La venta ya fue entregada");
        return;
      } else {
        const newStateOfSale: Sale | null = await deliverProductsService(saleData);
        if (newStateOfSale != null) {
          //console.log("NUEVO ESTADO DE LA VENTA", newStateOfSale);
          alert("Venta entregada con exito");
          setSaleData(null);
          setProductsInSale([]);
          setIdentificador("");
        } else {
          alert("Ocurrio un error, la venta no puedo ser entregada.")
        }

      }
    } else {
      alert("No hay datos de la venta");
    }
  }

  return (
    <>
      <div>
        <b> Identificador de venta: </b> {identificador} <br />

        <div style={{ marginTop: '25px' }}>
          <Input
            autoFocus
            style={{ width: 0, height: 0, border: 0, padding: 0, margin: 0 }}
            type="password"
            id="scannedData"
            value={auxText}
            onChange={(e) => setAuxText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Escanear DNI"
          />
          <Button
            startIcon={scann ? <CloseOutlined /> : <QrCodeScannerOutlined />}
            onClick={() => { document.getElementById("scannedData")?.focus(); setScann(!scann); }}
            variant='contained'
            color={scann ? "success" : "error"}
          > {scann ? "Escaneando..." : "SCAN-LECTOR"}</Button>
          <Button
            onClick={() => { handleDeliverProduct(); setIdentificador(""); }}
            variant='contained'
            color='success'
          >
            Entregar
          </Button>
        </div>

        <b>Productos en la venta: {saleData?.id}

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
        </b>
      </div>
    </>
  );
}

export default SerchTicketView