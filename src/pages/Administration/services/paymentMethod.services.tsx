import axios from "axios";
import React from "react";
import { PaymentMethod } from "../../../models/PaymentMethod.model";
import { getSession } from "../../../utilities/public.utilities";
import { API_URL } from '../../../config/constants';

const setPaymentMethod = async (paymentMethod: String) => {
  const data = {
    "name": paymentMethod,
    "estado": true,
    "club": {
      "id": getSession().club.id
    }
  }

  const res = await axios.post<PaymentMethod>(API_URL + `/forma-pagos`, data, { //hardcode
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + getSession().id_token
    },
  }).then(function (response) {
    return response;
  }).catch(function (error) {
    console.error("Error al intentar agregar la forma de pago. Type error -> " + error.response.status);
    return error;
  });
  
  console.log("SERVICES: Datos crear el metodo de pago: " + JSON.stringify(res.data));
  
  return res.data;
}

const getPaymentMethods = async () => {
  const res = await axios.get<PaymentMethod>(API_URL + `/forma-pagos/club/${getSession().club.id}`, { //hardcode
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + getSession().id_token
    },
  }).then(function (response) {
    return response;
  }).catch(function (error) {
    console.error("Error al intentar obtener los metodos de pago del Club. Type error -> " + error.response.status);
    return error;
  });
  
  const paymentMethods: PaymentMethod = res.data;

  //console.log("SERVICES: Metodos de pago del club: " + JSON.stringify(res.data));
  
  return res.data;
}
export { setPaymentMethod, getPaymentMethods };