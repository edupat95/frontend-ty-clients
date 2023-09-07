import React, { useEffect, useState, useReducer, useRef } from 'react';
import { getCustomer, getProducts } from '../../services/cashier.services'; 
import "../../styles/Cashier.css";
import { Product } from '../../../../models/Cashier/product.model';
import { cashierReducer, cashierInitialState } from './../../reducer/cashier.reducer';
import { createProductAdapter } from '../../../../adapters/Cashier/product.adapter'; 
import ProductInMenuComponent from './components/ProductInMenuComponent';
import ProductInCartComponent from './components/ProductInCartComponent';
import Scann from '../../components/Scann';
import { Customer } from '../../../../models/Cashier/customer.model';
import { useNavigate } from 'react-router-dom';
import { getCashier } from '../../../../utilities/public.utilities'; 
import { Box, Button, Input} from '@mui/material';
import {
  SwitchAccessShortcutOutlined,
  QrCodeScannerOutlined,
  CameraAlt,
  CloseFullscreen,
  CloseOutlined,
  MenuBook,
  Replay
} from '@mui/icons-material';
import OptionsInCartComponent from './components/OptionsInCartComponent';

const AutoServiceView = () => {
  const navigate = useNavigate();
  const [cashierState, dispatch] = useReducer(cashierReducer, cashierInitialState);
  const { products, cart } = cashierState;
  const [scanState, setScanState] = useState(false);
  const [errorSerch, setErrorSerch] = useState('');
  const [customer, setCustomer] = useState<Customer>();
  const [auxText, setAuxText] = useState("");
  const [scann, setScann] = useState(false);
 
  useEffect(() => {
    getCashier().id ? <></> : handleLogout();
    handleShowProductMenu();
    const interval = setInterval(() => {
      setErrorSerch('');
    }, 5000)

    return () => { //se ejecuta cuando se desmonta el componente
      clearInterval(interval)
    }

  }, []);

  const handleShowProductMenu = async () => {
    const res = await getProducts();
    let aux_arr: Array<Product> = [];
    for (let producto in res) {
      aux_arr.push(createProductAdapter(res[producto]));
    }

    dispatch({ type: "LIST_PRODUCT_MENU", payload: aux_arr });
  }

  const serchCustomer = async (identifier: string) => {
    const cu = await getCustomer(identifier);
    if (cu === 0) {
      setErrorSerch("Cliente no encontrado");
      setCustomer(undefined);
    } else if (cu === 401) {
      setErrorSerch("cliente no encontrado");
      setCustomer(undefined);
    } else {
      setCustomer(cu)
      setScann(false);
    }

  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  }

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

  return (
    <>
      <div className='cashierContainer'>
        <div className='cashierContainerLeft'>
          <div style={{ textAlign: 'center' }}>
            <Button startIcon={<Replay/>} endIcon={<MenuBook/>} variant='contained' style={{ width: "40%", height: "30px" }} onClick={() => handleShowProductMenu()} > Actualizar carta </Button>
          </div>
          <div className='containterProductMenu' style={{ paddingTop: "5px" }}>
            <ProductInMenuComponent
              products={products}
              addToCart={(product: Product) => { dispatch({ type: "ADD_TO_CART", payload: product }); }}
            />
          </div>
        </div>
        <div className='cashierContainerRight'>
          Productos a comprar
          <div className='cartProductsContainer'>
            {cart.map((productInCart) => (
              <ProductInCartComponent key={productInCart.product.id}
                productInCart={productInCart}
                addOneToCart={(product: Product) => { dispatch({ type: "ADD_ONE_TO_CART", payload: product }) }}
                removeOneFromCart={(product: Product) => { dispatch({ type: "REMOVE_ONE_FROM_CART", payload: product }) }}
                removeAllFromCart={(product: Product) => { dispatch({ type: "REMOVE_ALL_FROM_CART", payload: product }) }}
              />
            ))}
          </div>
          <div>
            <OptionsInCartComponent
              cart={cart}
              customer={customer}
              setCustomer={setCustomer}
              dispatch={dispatch}
            />
          </div>
          <div >
            <p>Puntos del cliente: {customer?.memberClub.puntosClub}</p>
            <p>{customer ? "" : "IDENTIFIQUE AL CLIENTE"}</p>
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
              <Button variant="contained" startIcon={<SwitchAccessShortcutOutlined />} onClick={() => setCustomer(undefined)}> QUITAR </Button>
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
      </div>
    </>
  )
}

export default AutoServiceView