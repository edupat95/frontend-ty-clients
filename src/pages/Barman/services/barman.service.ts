import axios from 'axios';
import { getSession, getRecorder, getBarman } from '../../../utilities/public.utilities';
import { Dni } from '../../../models/AssociateCustomer/dni.model';
import { MemberClub } from '../../../models/Cashier/memberClub.model';
import { createMemberClubAdapter } from '../../../adapters/Cashier/memberClub.adapter';
import { API_URL } from '../../../config/constants';
import { createSaleAdapter } from '../../../adapters/sale.adapter';
import { Sale } from '../../../models/sale.model';
import { Customer } from '../../../models/Cashier/customer.model';

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

const getSalesOfCustomerService = async (customer: Customer) => {
  //URL: /ventas/club/6/identificador_asociado_club/512e716a-6c81-4cfa-a146-fa5d4ccef6c2
  //console.log("getSalesOfCustomerService.services.tsx -> getSalesOfCustomerService() -> customer: " + JSON.stringify(customer + "Club:" + getSession().club?.id));
  const res = await axios.get<Sale[]>(API_URL + `/ventas/club/${getSession().club?.id}/identificador_asociado_club/${customer.memberClub.identificador}`, { //hardcode
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

  console.log(" getSalesOfCustomerService res: " + JSON.stringify(res.data));

  if (res.status === 200) {
    const sales = res.data.map((sale: Sale) => createSaleAdapter(sale));
    return sales;
  }
  else {
    return null;
  }
}


export { deliverProductsService, serchTicketService, getSalesOfCustomerService }