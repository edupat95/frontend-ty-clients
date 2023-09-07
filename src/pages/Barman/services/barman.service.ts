import axios from 'axios';
import { getSession, getRecorder, getBarman } from '../../../utilities/public.utilities';
import { Dni } from '../../../models/AssociateCustomer/dni.model';
import { MemberClub } from '../../../models/Cashier/memberClub.model';
import { createMemberClubAdapter } from '../../../adapters/Cashier/memberClub.adapter';
import { API_URL } from '../../../config/constants';
import { createSaleAdapter } from '../../../adapters/sale.adapter';
import { Sale } from '../../../models/sale.model';

const deliverProductsService = async (venta: Sale) => {
  //console.log(`Datos a enviar al servicio: identificador_ticket: ${venta} - idClub: ${getSession().club?.id} - idEntregador: ${getBarman().id}`)
  const data = {
    "Venta": venta,
    "idEntregador": getBarman().id
  }

  //console.log("associateCustomer.services.tsx -> associateCustomer() -> data: " + JSON.stringify(data));

  const res = await axios.put<Sale>(API_URL + `/ventas/entregar`, data, { //hardcode
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + getSession().id_token
    },
  }).then(function (response) {
    return response;
  }).catch(function (error) {
    //console.error("Error al intentar realizar el cange. Type error -> " + error.response.status);
    return error.response.status;
  });

  //console.log("associateCustomer.services.tsx -> associateCustomer() -> res: " + JSON.stringify(res.data));

  if (res.status === 200) {
    const sale = createSaleAdapter(res.data);
    return sale;
  } else {
    return null;
  }


};

const serchTicketService = async (identificador_ticket: String) => {
  //console.log("serchTicketService.services.tsx -> serchTicketService() -> identificador_ticket: " + JSON.stringify(identificador_ticket));
  const data = {
    "identificador_ticket": identificador_ticket,
    "idEntregador": getBarman().id
  }
  //console.log("associateCustomer.services.tsx -> associateCustomer() -> data: " + JSON.stringify(data));

  const res = await axios.post<Sale>(API_URL + `/ventas/buscar`, data, { //hardcode
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + getSession().id_token
    },
  }).then(function (response) {
    return response;
  }).catch(function (error) {
    //console.error("Error al intentar realizar el cange. Type error -> " + error.response.status);
    return error.response.status;
  });

  //console.log(" serchTicketService res: " + JSON.stringify(res.data + " status: " + res.status));
  
  if (res.status === 200) {
    //console.log("Devuevlo sale")
    const sale = createSaleAdapter(res.data);
    return sale;
  }
  else {
    return null;
  }
};
export { deliverProductsService, serchTicketService }