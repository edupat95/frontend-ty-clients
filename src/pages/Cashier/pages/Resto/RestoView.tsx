import React, { useEffect, useState, useReducer, useRef } from 'react';
import { getCustomer, getProducts, getProductsInTable, getTablesService, addOneToTableService, removeOneFromTableService } from '../../services/cashier.services';
import "../../styles/Cashier.css";
import { Product } from '../../../../models/Cashier/product.model';
import { cashierReducer, cashierInitialState } from './../../reducer/cashier.reducer';
import { createProductAdapter } from '../../../../adapters/Cashier/product.adapter';
import ProductInMenuComponent from './components/ProductInMenuComponent';
import { useNavigate } from 'react-router-dom';
import { getCashier, getSession } from '../../../../utilities/public.utilities';
import { Box, Button, Input } from '@mui/material';
import { Table } from '../../../../models/Cashier/table.model';
import TablesInRestoComponent from './components/TablesInRestoComponent';
import { Article, CameraAlt, CloseFullscreen, CloseOutlined, MenuBook, Paid, Print, QrCodeScannerOutlined, Replay, SwitchAccessShortcutOutlined, Warning } from '@mui/icons-material';
import { ProductInTable } from '../../../../models/Cashier/productInTable.model';
import ProductsInTableComponent from './components/ProductsInTableComponent';
import OptionInTableComponent from './components/OptionInTableComponent';
import Scann from '../../components/Scann';
import { Customer } from '../../../../models/Cashier/customer.model';

const RestoView = () => {
  const navigate = useNavigate();
  const [cashierState, dispatch] = useReducer(cashierReducer, cashierInitialState);
  const { products, tables } = cashierState;
  const [selectedTable, setSelectedTable] = useState<Table | null>(null);
  const [productsInTable, setProductsInTable] = useState<ProductInTable[]>([]);
  const [customer, setCustomer] = useState<Customer>();
  const [auxText, setAuxText] = useState("");
  const [scann, setScann] = useState(false);
  const [scanState, setScanState] = useState(false);
  const [errorSerch, setErrorSerch] = useState('');
  
  useEffect(() => {
    getCashier().id ? <></> : handleLogout();
    handleShowProductMenu();
    handleShowTableMenu();
  }, []);

  useEffect(() => {
    if (selectedTable) {
      showProductsInTable();
    }
  }, [selectedTable]);

  const handleShowProductMenu = async () => {
    const res = await getProducts();
    let aux_arr: Array<Product> = [];
    for (let producto in res) {
      aux_arr.push(createProductAdapter(res[producto]));
    }

    dispatch({ type: "LIST_PRODUCT_MENU", payload: aux_arr });
  }

  const handleShowTableMenu = async () => {
    const tables: Array<Table> = await getTablesService();
    //console.log(tables)
    dispatch({ type: "LIST_TABLES", payload: tables });
  }

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  }

  const showProductsInTable = async () => {
    if (!selectedTable) return;
    //console.log(`Buscar productos en mesa ${selectedTable.number}`);
    setProductsInTable(await getProductsInTable(selectedTable));
  }

  const addOneToTable = async (product: Product) => {
    if (!selectedTable) return;
    const constProductInTableUpdated: ProductInTable = await addOneToTableService(product, selectedTable);
    if (constProductInTableUpdated) {
      await showProductsInTable();
    }
    //console.log(`Agregando producto ${product.nombre} a la mesa ${selectedTable?.number}`);
  }

  const removeOneFromTable = async (product: Product) => {
    if (!selectedTable) return;
    const constProductInTableUpdated = await removeOneFromTableService(product, selectedTable);
    if (constProductInTableUpdated) {
      await showProductsInTable();
    }
    //console.log(`Quitando producto ${product.nombre} a la mesa ${selectedTable?.number}`);
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
    <div className='cashierContainer'>
      <div className='cashierContainerLeft'>
        <div style={{ textAlign: 'center' }}>
          <Button
            startIcon={<Replay />}
            endIcon={<MenuBook />}
            variant='contained'
            style={{ width: "40%", height: "30px" }}
            onClick={() => handleShowProductMenu()} > Actualizar carta </Button>
        </div>
        <div className='containterProductMenuResto' style={{ paddingTop: "5px" }}>
          <ProductInMenuComponent
            products={products}
            addOneToTable={addOneToTable}
          />
        </div>
        <div className='scannContainerResto'>
          <div >
            <p></p>
            <p>{customer ? `Puntos del cliente: ${customer?.memberClub.puntosClub}` : "IDENTIFIQUE AL CLIENTE"}</p>
          </div>
          <div>
            <Input
              style={{ width: 0, height: 0, border: 0, padding: 0, margin: 0 }}
              id="scannedData"
              value={auxText}
              onChange={(e) => setAuxText(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <Box sx={{ '& button': { m: 1 } }}>
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
      <div className='cashierContainerRight'>
        <h3>Mesas en {getSession().club.nombre}</h3>
        <div className='cartProductsContainer'>
          <TablesInRestoComponent
            tables={tables}
            setSelectedTable={setSelectedTable}
          />
        </div>
        <div>
          <h3>Productos en mesa: {selectedTable?.number}</h3>
          <div className='tableProductsContainer'>
            {productsInTable && (
              <ProductsInTableComponent
                productsInTable={productsInTable}
                addOneToTable={addOneToTable}
                removeOneFromTable={removeOneFromTable}
              />
            )}
          </div>
        </div>
        <div>
          <OptionInTableComponent
            selectedTable={selectedTable}
            productsInTable={productsInTable}
            showProductsInTable={showProductsInTable}
            customer={customer}
            setCustomer={setCustomer}
          />
        </div>
      </div>
    </div>
  )
}

export default RestoView