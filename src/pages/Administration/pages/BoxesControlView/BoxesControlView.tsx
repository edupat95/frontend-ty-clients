import { Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Cashier } from '../../../../models/Cashier/cashier.model';
import { ProductInCart } from '../../../../models/Cashier/productInCart.model';
import { Sale } from '../../../../models/sale.model';
import { getCashiersByClub } from '../../services/boxesCashier.services';
import { getProductsInSale, getSalesWithFilters } from '../../services/boxesControl.services';
import ListOfProductsInSaleComponent from './Components/ListOfProductsInSaleComponent';
import ListOfSalesComponent from './Components/ListOfSalesComponent';

const BoxesControlView = () => {
  const [cashiers, setCashiers] = useState<Cashier[]>([]);
  const [selectedCashier, setSelectedCashier] = useState<Cashier | undefined>(
    undefined
  );
  const [dateFrom, setDateFrom] = useState<Date | undefined>(undefined);
  const [dateTo, setDateTo] = useState<Date | undefined>(undefined);
  const [sales, setSales] = useState<any[]>([]);
  const [totalInBox, setTotalInBox] = useState<number>(0);
  const [selectedSale, setSelectedSale] = useState<Sale | undefined>(undefined);
  const [productsInSale, setProductsInSale] = useState<ProductInCart[]>([]);

  useEffect(() => {
    getCashiersByClub()
      .then((data) => {
        setCashiers(data);
      })
      .catch((e) => {
        alert('Ocurrio un error al intentar obtener los cajeros del club.');
      });
  }, []);

  useEffect(() => {
    if (selectedSale != undefined) {
      serchProducts();
    }
  }, [selectedSale]);

  const handleSerchSales = async () => {
    if (selectedCashier?.id === undefined || dateFrom === undefined || dateTo === undefined) {
      alert('Debe seleccionar un cajero, una fecha de inicio y una fecha de fin.');
      return;
    }

    // Aplicar corrección de zona horaria a las fechas
    //const adjustedDateFrom = new Date(dateFrom.getTime() - (3 * 60 * 60 * 1000)); // 3 horas menos horario argentina
    //const adjustedDateTo = new Date(dateTo.getTime() - (3 * 60 * 60 * 1000)); // 3 horas menos horario argentina
    // Calculamos la diferencia de días
    const diferenciaDias: number = (dateTo.getTime() - dateFrom.getTime()) / (1000 * 60 * 60 * 24);

    // Verificamos si la diferencia es mayor a 3 días
    if (diferenciaDias > 3) {
      alert('ERROR. La diferencia entre la fecha de inicio y la fecha de fin es mayor a 3 días. Si precisa saber el total de ventas en un rango mayor, comuniquese con soporte tecnico.');
      return;
    }
    // Convertir fechas ajustadas a ISO 8601
    const dateFromISO = dateFrom.toISOString();
    const dateToISO = dateTo.toISOString();

    //console.log(`${selectedCashier?.id}\n${dateFrom}\n${dateTo}`);
    //console.log(`${dateFromISO}\n${dateToISO}`);
    await setSales(await getSalesWithFilters(dateFromISO, dateToISO));
    //console.log("FECHAS ENVIADAS->", dateFromISO, " |||| " , dateToISO);
    //console.log("VENTAS DATA->", sales);
    //console.log(`${adjustedDateFrom.toISOString()}\n${adjustedDateTo.toISOString()}`);
  };

  const serchProducts = async () => {
    if (selectedSale != undefined) {
      const products = await getProductsInSale(selectedSale);
      await setProductsInSale(products);
      console.log("PRODUCTOS ENCONTRADOS->", products);
    }
  };

  return (
    <div>
      <div style={{ display: 'flex' }}>
        <div style={{ width: '70%', margin: '50px' }}>
          <div
            style={{
              width: '60%',
              textAlign: 'center',
              paddingLeft: '20%',
            }}>
            <FormControl fullWidth style={{ backgroundColor: 'GrayText' }}>
              <InputLabel style={{ color: 'white' }} id="cashier-label">
                Seleccione un cajero
              </InputLabel>
              <Select
                style={{ color: 'white' }}
                labelId="cashier-label"
                id="cashier-select"
                value={selectedCashier?.id ? selectedCashier.id : ''}
                label="Seleccione un cajero"
                onChange={async (e: SelectChangeEvent<number>) => {
                  const selectedBoxId = e.target.value;
                  const cashier = cashiers.find(
                    (cashier) => cashier.id === selectedBoxId
                  );
                  await setSelectedCashier(cashier);
                }}
              >
                {cashiers.map((cashier) => (
                  <MenuItem key={cashier.id} value={cashier.id}>
                    {cashier.worker.descripcion}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <div style={{ display: 'flex' }}>
              <form noValidate>
                <InputLabel style={{ color: 'white' }} id="cashier-label">
                  Fecha y hora (desde)
                </InputLabel>
                <TextField
                  style={{ margin: "5px", color: 'white', backgroundColor: 'GrayText' }}
                  id="date"
                  label="DESDE"
                  type="datetime-local"
                  onChange={(e) => { setDateFrom(new Date(e.target.value)) }}
                  InputLabelProps={{
                    shrink: true,
                    style: { color: 'white' }
                  }}
                  inputProps={{
                    style: { color: 'white' }
                  }}
                />
              </form>
              <form noValidate>
                <InputLabel style={{ color: 'white' }} id="cashier-label">
                  Fecha y hora (hasta)
                </InputLabel>
                <TextField
                  style={{ margin: "5px", color: 'white', backgroundColor: 'GrayText' }}
                  id="date"
                  label="HASTA"
                  type="datetime-local"
                  onChange={(e) => { setDateTo(new Date(e.target.value)) }}
                  InputLabelProps={{
                    shrink: true,
                    style: { color: 'white' }
                  }}
                  inputProps={{
                    style: { color: 'white' }
                  }}
                />
              </form>
              <Button
                style={{ margin: "5px", marginTop: "29px", color: 'white', height: '55px' }}
                variant="contained" onClick={async () => { await handleSerchSales() }}
              >
                Buscar
              </Button>
            </div>
          </div>

          <div
            style={{
              borderRadius: '2%',
              height: '450px',
              overflowY: 'scroll',
              textAlign: 'center',
              alignItems: 'center',
              backgroundColor: 'GrayText',
              margin: '20px',
            }}
          >
            {selectedCashier && (
              <ListOfSalesComponent
                sales={sales}
                cashier={selectedCashier}
                setSelectedSale={setSelectedSale}
                setTotalInBox={setTotalInBox}
              />
            )}

          </div>
          Total en caja: {totalInBox && ( <>{totalInBox}</> )}
        </div>
        <div style={{ width: '50%', margin: '20px' }}>
          Venta con id: {selectedSale && (
            <>
              {selectedSale.id}
            </>
          )}
          <div
            style={{
              borderRadius: '2%',
              height: '450px',
              overflowY: 'scroll',
              textAlign: 'center',
              alignItems: "center",
              backgroundColor: "GrayText",
              margin: "20px"
            }}>
            <ListOfProductsInSaleComponent
              productsInSale={productsInSale}
             />
          </div>
        </div>
      </div>
    </div>
  )
}

export default BoxesControlView