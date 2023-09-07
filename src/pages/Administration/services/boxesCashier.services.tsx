import axios from 'axios';
import { createCashierAdapter } from '../../../adapters/Cashier/cashier.adapter';
import { Box } from '../../../models/Cashier/box.model';
import { Cashier } from '../../../models/Cashier/cashier.model';
import { getSession } from '../../../utilities/public.utilities';
import { API_URL } from '../../../config/constants';

const getCashiersByClub = async () => {

  const res = await axios.get<Cashier[]>(API_URL + `/cajeros/club/${getSession().club.id}`, { //hardcode
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + getSession().id_token
    },
  }).then(function (response) {
    return response;
  }).catch(function (error) {
    console.error("Error al intentar realizar guardar el producto. Type error -> " + error.response.status);
    return error;
  });


  //console.log("DATA-> " + JSON.stringify(res.data));
  const cashiers: Cashier[] = [];
  res.data.map((e: Cashier) => {
    const cashier: Cashier = createCashierAdapter(e);
    cashiers.push(cashier);
  });
  //console.log(JSON.stringify(cashiers));
  return cashiers;
}

const setBoxInCashier = async (cashier: Cashier, box: Box) => {

  //console.log("Cashier -> " + JSON.stringify(cashier) + " box -> " + JSON.stringify(box));

  const data = {
    "idCajero": cashier.id,
    "idCaja": box.id
  }

  const res = await axios.post(API_URL + `/cajeros/link/caja`, data, { //hardcode
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + getSession().id_token
    },
  }).then(function (response) {
    return response;
  }).catch(function (error) {
    console.error("Error al intentar vincular el cajero con la caja. Type error -> " + error.response.status);
    return error;
  });

    return res.data;
  }

const getCashiersInBox = async (box: Box) => {

    const res = await axios.get<Cashier[]>(API_URL + `/cajeros/caja/${box.id}`, { //hardcode
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + getSession().id_token
      },
    }).then(function (response) {
      return response;
    }).catch(function (error) {
      console.error(`Error al intentar obtener los cajeros de la caja ${box.id}. Type error -> ` + error.response.status);
      return error;
    });

    const cashiers: Cashier[] = [];
    res.data.map((e: Cashier) => {
      const cashier: Cashier = createCashierAdapter(e);
      cashiers.push(cashier);
    });
    return cashiers;
  }

  export { getCashiersByClub, setBoxInCashier, getCashiersInBox }