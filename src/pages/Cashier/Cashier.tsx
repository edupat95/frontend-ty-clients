import React, { useEffect, useState, useReducer, useRef } from 'react';
import { getProducts, getCustomer } from './services/cashier.services';
import "./styles/Cashier.css";
import { Product } from "../../models/Cashier/product.model"
import { cashierReducer, cashierInitialState } from "./reducer/cashier.reducer";
import { createProductAdapter } from '../../adapters/Cashier/product.adapter';
import { Customer } from '../../models/Cashier/customer.model';
import { useNavigate } from 'react-router-dom';
import { getCashier } from '../../utilities/public.utilities';
import CabeceraComponent from '../../components/CabeceraComponent';

import { Alert, AlertTitle, Box, Button, Input, Menu } from '@mui/material';
import {
  SwitchAccessShortcutOutlined,
  QrCodeScannerOutlined,
  CameraAlt,
  CloseFullscreen,
  CloseOutlined
} from '@mui/icons-material';
import OptionsInCartComponent from './pages/AutoService/components/OptionsInCartComponent';
import ErrorMessageComponent from '../../components/ErrorMessageComponent';
import AutoServiceView from './pages/AutoService/AutoServiceView';
import RestoView from './pages/Resto/RestoView';
import MenuButtonsComponent from './components/MenuButtonsComponent';

export const Cashier = () => {
  const navigate = useNavigate();
  const [cashierState, dispatch] = useReducer(cashierReducer, cashierInitialState);
  //const { products, cart } = cashierState;
  //const [scanState, setScanState] = useState(false);
  const [errorSerch, setErrorSerch] = useState('');
  const [customer, setCustomer] = useState<Customer>();
  const [auxText, setAuxText] = useState("");
  const [message, setMessage] = useState<{ visible: boolean, type: string, message: string }>({ visible: false, type: 'error', message: "" });
  const [scann, setScann] = useState(false);
  const [scannCamera, setScannCamera] = useState(false);
  const [modo, setModo] = useState(0);
  const [viewResto, setViewResto] = useState(false);
  const [viewAutoService, setViewAutoService] = useState(false);
  const [infoVisible, setInfoVisible] = useState(true);
  useEffect(() => {
    getCashier().id ? <></> : handleLogout();
    handleShowTablesMenu();
    const interval = setInterval(() => {
      setErrorSerch('');
    }, 5000)

    return () => { //se ejecuta cuando se desmonta el componente
      clearInterval(interval)
    }

  }, []);

  const handleShowTablesMenu = async () => {

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
      <CabeceraComponent />
      {infoVisible && (
        <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
          <Alert
            severity={'info'}
            onClose={() => { setInfoVisible(false) }}
          >
            <AlertTitle>Información</AlertTitle>
            <div style={{ textAlign: "justify" }}>
              <strong> MODO AUTOSERVICE: </strong>
              <ul>
                <li>
                  Este modo permite crear ventas sin mesas. El cajero posee una lista de productos y las coloca en una lista de "productos a comprar" (o "carrito de compras").
                </li>
                <li>
                  Una vez seleccionados los productos a comprar, el cajero debe recibir el dinero e imprimir el ticket.
                </li>
                <li>
                  Este ticket tiene un código QR que lo identifica como ticket único para evitar falsificaciones.
                </li>
                <li>
                  El cliente debe entregar el ticket al barman o a la persona encargada de entregarle el producto.
                </li>
                <li>
                  El barman debe escanear el ticket con la app y el sistema se encarga de verificar la autenticidad del ticket.
                </li>
              </ul>
              <strong> MODO RESTAURANTE: </strong>
              <ul>
                <li>
                  Este modo permite colocar los productos dentro de una mesa.
                </li>
                <li>
                  Cuando el mesero precisa cobrar la mesa, exige al cajero el ticket de la mesa.
                </li>
                <li>
                  El cajero selecciona la opción imprimir ticket y le entrega el ticket al mesero.
                </li>
                <li>
                  Cuando el mesero regresa con el dinero a la caja, el cajero debe seleccionar la opción cobrar.
                </li>
              </ul>
              <strong> ATENCION: </strong>
              <p>
                Si solo posee una de las 2 opciones anteriores, es posible que su plan de pago no sea compatible con alguno de los anteriores.
              </p>
            </div>
          </Alert>
        </div>
      )}
      {message.visible && (
        <div style={{ position: "absolute", top: "50", left: 0, right: 0, height: "150px", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100 }}>
          <ErrorMessageComponent
            message={message}
            setMessage={setMessage}
          />
        </div>
      )}
      <div>
        <Button
          variant='contained'
          onClick={() => { setModo(1); setInfoVisible(false); setViewAutoService(true); setViewResto(false) }}
          disabled={(getCashier().type == 1 || getCashier().type == 3) ? false : true}
        >
          modo autoservice
        </Button>
        <Button
          variant='contained'
          style={{ marginLeft: "10px" }}
          onClick={() => { setModo(2); setInfoVisible(false); setViewAutoService(false); setViewResto(true) }}
          disabled={(getCashier().type == 2 || getCashier().type == 3) ? false : true}
        >
          modo restaurante
        </Button>
      </div>
      {viewAutoService && (
        <AutoServiceView />
      )}
      {viewResto && (
        <RestoView />
      )}

    </>
  );
}

export default Cashier