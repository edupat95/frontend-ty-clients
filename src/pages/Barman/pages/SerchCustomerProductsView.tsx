import { CameraAlt, CloseFullscreen, CloseOutlined, QrCodeScannerOutlined, SwitchAccessShortcutOutlined } from '@mui/icons-material';
import { Box, Button, Input } from '@mui/material';
import exp from 'constants'
import React, { useState } from 'react'
import { Customer } from '../../../models/Cashier/customer.model';
import { getCustomer } from '../../Cashier/services/cashier.services';
import Scann from '../../Cashier/components/Scann';
import ListSalesOfCustomerComponent from '../components/ListSalesOfCustomerComponent';
import { getSalesOfCustomerService } from '../services/barman.service';
import { Sale } from '../../../models/sale.model';


const SerchCustomerProductsView = () => {
  const [scanState, setScanState] = useState(false);
  const [errorSerch, setErrorSerch] = useState('');
  const [customer, setCustomer] = useState<Customer>();
  const [auxText, setAuxText] = useState("");
  const [scann, setScann] = useState(false);
  const [sales, setSales] = useState<Sale[]>([]);

  const serchCustomer = async (identifier: string) => {
    const cu = await getCustomer(identifier);
    if (cu === 0) {
      setErrorSerch("Cliente no encontrado");
      setCustomer(undefined);
    } else if (cu === 401) {
      setErrorSerch("cliente no encontrado");
      setCustomer(undefined);
    } else if (cu) {
      setCustomer(cu)
      const res = await getSalesOfCustomerService(cu);
      setSales(res);
      //Si res no esta vacio etonces guardar sales
      console.log(res);
      setScann(false);
    }

  };

  const handleKeyDown = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.keyCode === 13) { // Verificar si se presionó "Enter"
      await serchCustomer(auxText);
      //console.log(`User typed: ${auxText}`);
      setAuxText("");
    } else if (event.key.match(/^[a-zA-Z0-9 \-"]$/)) {
      setAuxText((prevTypedText) => prevTypedText + event.key);
    }
    event.preventDefault();
  };

  const handleDeliverProduct = async () => {
    if(customer){
      serchCustomer(customer?.memberClub.identificador)
    }
  };

  return (
    <div>
      <div >
        <p>{customer ? "" : "IDENTIFIQUE AL CLIENTE"}</p>
      </div>
      
      <div>
        <ListSalesOfCustomerComponent 
          sales={sales}
          handleDeliverProduct = {handleDeliverProduct}
        />
      </div>

      <div className='scannContainer'>
        <Input
          style={{ width: 0, height: 0, border: 0, padding: 0, margin: 0 }}
          id="scannedData"
          value={auxText}
          onChange={(e) => setAuxText(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Box sx={{ '& button': { m: 2 } }}>
          <Button
            startIcon={scann ? <CloseOutlined /> : <QrCodeScannerOutlined />}
            onClick={() => { document.getElementById("scannedData")?.focus(); setScann(!scann); }}
            variant='contained'
            color={scann ? "success" : "error"}
          > {scann ? "Escaneando..." : "SCAN-LECTOR"}</Button>
          {/*<Button variant="contained" startIcon={<UnfoldLessDoubleOutlined />} onClick={() => setScanState(false)}> CLOSE </Button> */}
          <Button
            variant="contained"
            startIcon={scanState ? <CloseFullscreen /> : <CameraAlt />}
            color={scanState ? "success" : "error"}
            onClick={() => { setScanState(true); setScanState(!scanState) }}> SCAN-CAMERA </Button>
          <Button variant="contained" startIcon={<SwitchAccessShortcutOutlined />} onClick={() => {setCustomer(undefined); setSales([]) } }> QUITAR </Button>
        </Box>
        {scanState && (<Scann serchCustomer={serchCustomer} />)}
      </div>

      <div>
        <div style={{ color: "red" }}>
          <p>{errorSerch}</p>
        </div>
        Nombre: {customer ? customer.member.idDocumento.nombres + " " + customer.member.idDocumento.apellidos : ""} <br />
        DNI: {customer?.member.idDocumento.numeroDni}<br />
      </div>
    </div>
  )
}

export default SerchCustomerProductsView