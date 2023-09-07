import axios from 'axios';
import { MemberClub } from '../../../models/Cashier/memberClub.model';
import { Product } from '../../../models/Cashier/product.model';
import { Customer } from '../../../models/Cashier/customer.model';
import { createMemberClubAdapter } from '../../../adapters/Cashier/memberClub.adapter';
import { createSaleAdapter } from '../../../adapters/sale.adapter';
import { Member } from '../../../models/Cashier/member.model';
import { createMemberAdapter } from '../../../adapters/Cashier/member.adapter';
import { createCustomerAdapter } from '../../../adapters/Cashier/customer.adapter';
import { getCashier, getSession } from '../../../utilities/public.utilities';
import { ProductInCart } from '../../../models/Cashier/productInCart.model';
import { Sale } from '../../../models/sale.model';
import { PaymentMethod } from '../../../models/PaymentMethod.model';
import { API_URL } from '../../../config/constants';
import { Table } from '../../../models/Cashier/table.model';
import { createTableAdapter } from '../../../adapters/Cashier/table.adapter';
import { ProductInTable } from '../../../models/Cashier/productInTable.model';
import { createProductInTableAdapter } from '../../../adapters/Cashier/productInTable.adapter';
import { createPaymentMethodAdapter } from '../../../adapters/paymentMethod.adapter';

const getProducts = async () => {
  //console.log("ENTRA A GET PRODUCTOS: " + getCashier().id);
  const res = await axios.get<Array<Product>>(API_URL + `/productos/cajero/` + getCashier().id, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + getSession().id_token
    },
  }).then(function (response) {
    return response;
  }).catch(function (error) {
    console.error("Error al pedir el menu de products. Type error -> " + error.response.status);
    return error.response.status;
  });

  return res.data;
};


const getCustomer = async (identificador: string) => {
  // TOKEN DE SESION DE USUARIO.
  console.log('IDENTIFICADORRRR: ' + identificador);
  const res = await axios.get<MemberClub>(API_URL + `/asociado-clubs/club/${getSession().club.id}/ident/${identificador}`, { //Hardcode buscamos al asociado-club
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + getSession().id_token
    },
  }).then(function (response) {
    return response;
  }).catch(function (error) {
    console.error("Error al pedir los datos de MemberClub. Type error -> " + error);
    return error;
  });

  switch (res.code) {
    case "ERR_NETWORK":
      return 0;
    case "ERR_BAD_REQUEST":
      return 401;
    default:
      break;
  }

  console.log("DATOS DE RES ID: ", res.data);

  const res2 = await axios.get<Member>(API_URL + `/asociados/${res.data.asociado.id}`, { //Hardcode buscamos al asociado
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + getSession().id_token
    },
  }).then(function (response) {
    return response;
  }).catch(function (error) {
    console.error("Error al pedir los datos de Member. Type error -> " + error);
    return error;
  });

  //console.log("DATOS DE RES2: ", res2.data);

  switch (res2.code) {
    case "ERR_NETWORK":
      return 0;
    case "ERR_BAD_REQUEST":
      return 401;
    default:
      break;
  }

  //console.log(res);
  //console.log(res2);

  if ((res.status === 200 && res2.status === 200)) {
    const memberClub = createMemberClubAdapter(res.data);
    //console.log("memberClub: " + JSON.stringify(memberClub));
    const member = createMemberAdapter(res2.data)
    //console.log("member: " + JSON.stringify(member))
    const customer: Customer = {
      memberClub: memberClub,
      member: member
    }

    return createCustomerAdapter(customer);
  }
}
const buyCartUnidentifiedCustomer = async (cart: Array<ProductInCart>, paymentMethod: PaymentMethod) => {
  //console.log("PAYMENTMETHOD ->" + JSON.stringify(paymentMethod));

  let productos = [{}];
  productos.pop();

  cart.forEach((product) => {
    productos.push({
      "id": product.product.id,
      "cantidad": product.quantity
    });
  });
  const data = {
    "Venta": {
      "costoTotal": 0,
      "costoTotalPuntos": 0,
      "cajero": { "id": getCashier().id },
      "formaPago": { "id": paymentMethod },
      "asociado": null
    },
    "Productos": productos
  }

  const res = await axios.post<Array<any>>(API_URL + `/ventas/create/sin_identificar`, data, { //hardcode
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + getSession().id_token
    },
  }).then(function (response) {
    return response;
  }).catch(function (error) {
    console.error("Error al intentar realizar la compra. Type error -> " + error.response.status);
    return error;
  });

  /*Object.keys(res.data).length*/

  const venta: Sale | null = createSaleAdapter(res.data[0].venta);

  //console.log("OBJETO devuleto AL REALZIAR LA COMPRA -------------->" + JSON.stringify(venta) );
  if (venta !== null) {
    return venta;
  } else {
    return 0;
  }

}
const buyCart = async (idComprador: number, cart: Array<ProductInCart>, paymentMethod: PaymentMethod) => {

  let productos = [{}];
  productos.pop();
  cart.forEach((product) => {
    productos.push({
      "id": product.product.id,
      "cantidad": product.quantity
    });
  });
  const data = {
    "Venta": {
      "costoTotal": 0,
      "costoTotalPuntos": 0,
      "cajero": { "id": getCashier().id },
      "formaPago": { "id": paymentMethod },
      "asociado": { "id": idComprador },
    },
    "Productos": productos
  }
  const res = await axios.post(API_URL + `/ventas/create`, data, { //hardcode
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + getSession().id_token
    },
  }).then(function (response) {
    return response;
  }).catch(function (error) {
    console.error("Error al intentar realizar la compra. Type error -> " + error.response.status);
    return error;
  });

  //console.log("LA VENTAAAA " + JSON.stringify(res));
  //console.log("OBJETO ENVIADO AL REALZIAR LA COMPRA -------------->" + JSON.stringify(data));

  const venta: Sale | null = createSaleAdapter(res.data[0].venta);

  //console.log("OBJETO devuleto AL REALZIAR LA COMPRA -------------->" + JSON.stringify(venta) );
  if (venta !== null) {
    return venta;
  } else {
    return 0;
  }
}

const changeCart = async (idComprador: number, cart: Array<ProductInCart>) => {
  let productos = [{}];
  productos.pop();

  cart.forEach((product) => {
    productos.push({
      "id": product.product.id,
      "cantidad": product.quantity
    });
  });
  const data = {
    "Venta": {
      "costoTotal": 0,
      "costoTotalPuntos": 0,
      "cajero": { "id": getCashier().id },
      "asociado": { "id": idComprador }
    },
    "Productos": productos
  }

  const res = await axios.post(API_URL + `/ventas/create/canje`, data, { //hardcode
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + getSession().id_token
    },
  }).then(function (response) {
    return response;
  }).catch(function (error) {
    console.error("Error al intentar realizar el canje. Type error -> " + error.response.status);
    return error;
  });

  //console.log("OBJETO ENVIADO AL REALZIAR EL CANJE -------------->" + JSON.stringify(data));

  const venta: Sale | null = createSaleAdapter(res.data[0].venta);

  //console.log("OBJETO devuleto AL REALZIAR LA COMPRA -------------->" + JSON.stringify(venta) );
  if (venta !== null) {
    return venta;
  } else {
    return 0;
  }
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

  //console.log("SERVICES: Formas de pago: " + JSON.stringify(res.data));
    
  if (Array.isArray(res.data)) { // Validar si es un array antes de mapear
    const paymentMethods: Array<PaymentMethod> = [];
    res.data.map((paymentMethod: PaymentMethod) => {
      paymentMethods.push(createPaymentMethodAdapter(paymentMethod));
    });
    //console.log("SERVICES: Formas de pago devuletos: " + JSON.stringify(paymentMethods));

    return paymentMethods;

  } else {
    return [];
  }

  //const paymentMethods: PaymentMethod = res.data;

  console.log("SERVICES: Metodos de pago del club: " + JSON.stringify(res.data));

  return res.data;
}

const getTablesService = async () => {
  //http://localhost:8080/api/mesas/club/3
  const res = await axios.get<Array<Table>>(API_URL + `/mesas/club/${getSession().club.id}`, { //hardcode
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + getSession().id_token
    },
  }).then(function (response) {
    return response;
  }).catch(function (error) {
    console.error("Error al intentar obtener las mesas del Club. Type error -> " + error.response.status);
    return error;
  });

  if (Array.isArray(res.data)) { // Validar si es un array antes de mapear
    const tables: Array<Table> = [];
    res.data.map((table: Table) => {
      tables.push(createTableAdapter(table));
    });
    //console.log("SERVICES: Mesas del club: " + JSON.stringify(res.data));
    return tables;
  } else {
    console.error("La respuesta de la petición no es un array");
    return [];
  }
}

const getProductsInTable = async (table: Table) => {
  //http://localhost:8080/api/producto-mesas/mesa/{idTable}
  const res = await axios.get<Array<ProductInTable>>(API_URL + `/producto-mesas/mesa/${table.id}`, { //hardcode
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + getSession().id_token
    },
  }).then(function (response) {
    return response;
  }).catch(function (error) {
    console.error("Error al intentar obtener los productos en la mesa. Type error -> " + error.response.status);
    return error;
  });

  if (Array.isArray(res.data)) { // Validar si es un array antes de mapear
    const productsInTable: Array<ProductInTable> = [];
    res.data.map((productInTable: ProductInTable) => {
      productsInTable.push(createProductInTableAdapter(productInTable));
    });
    //console.log("SERVICES: Productos en la mesa: " + JSON.stringify(res.data));
    return productsInTable;
  } else {
    return [];
  }
}

const addOneToTableService = async (product: Product, table: Table) => {
  //http://localhost:8080/api/producto-mesas/agregar
  const data = {
    "idProducto": product.id,
    "idMesa": table.id
  }
  const res = await axios.post<ProductInTable>(API_URL + `/producto-mesas/agregar`, data, { //hardcode
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + getSession().id_token
    },
  }).then(function (response) {
    return response;
  }).catch(function (error) {
    console.error("Error al intentar agregar un producto a la mesa. Type error -> " + error.response.status);
    return error;
  });

  const productInTable: ProductInTable = createProductInTableAdapter(res.data);

  return productInTable;
}

const removeOneFromTableService = async (product: Product, table: Table) => {
  //http://localhost:8080/api/producto-mesas/quitar
  const data = {
    "idProducto": product.id,
    "idMesa": table.id
  }
  const res = await axios.post<ProductInTable>(API_URL + `/producto-mesas/quitar`, data, { //hardcode
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + getSession().id_token
    },
  }).then(function (response) {
    return response;
  }).catch(function (error) {
    console.error("Error al intentar quitar un producto de la mesa. Type error -> " + error.response.status);
    return error;
  });

  const productInTable: ProductInTable = createProductInTableAdapter(res.data);

  return productInTable;
}

//const buyCart = async (productsInTable: Array<ProductInTable>, paymentMethod: PaymentMethod) => {
const buyTableService = async (productsInTable: Array<ProductInTable>, paymentMethod: PaymentMethod, table: Table) => {
  let productos = [{}];
  productos.pop();
  productsInTable.forEach((productInTable) => {
    productos.push({
      "id": productInTable.product.id,
      "cantidad": productInTable.quantity
    });
  });
  const data = {
    "Venta": {
      "costoTotal": 0,
      "costoTotalPuntos": 0,
      "formaPago": { "id": paymentMethod.id },
      "cajero": { "id": getCashier().id },
    },
    "Productos": productos,
    "MesaId": table.id
  }
  const res = await axios.post(API_URL + `/ventas/mesa/create`, data, { //hardcode
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + getSession().id_token
    },
  }).then(function (response) {
    return response;
  }).catch(function (error) {
    console.error("Error al intentar realizar la compra. Type error -> " + error.response.status);
    return error;
  });

  //console.log("LA VENTAAAA " + JSON.stringify(res));
  //console.log("OBJETO ENVIADO AL REALZIAR LA COMPRA -------------->" + JSON.stringify(data));

  const venta: Sale | null = createSaleAdapter(res.data[0].venta);

  //console.log("OBJETO devuleto AL REALZIAR LA COMPRA -------------->" + JSON.stringify(venta) );
  if (venta !== null) {
    return venta;
  } else {
    return 0;
  }
}

const buyTableWithCustomerService = async (productsInTable: Array<ProductInTable>, paymentMethod: PaymentMethod, table: Table, customer: Customer) => {
  let productos = [{}];
  productos.pop();
  productsInTable.forEach((productInTable) => {
    productos.push({
      "id": productInTable.product.id,
      "cantidad": productInTable.quantity
    });
  });
  const data = {
    "Venta": {
      "costoTotal": 0,
      "costoTotalPuntos": 0,
      "cajero": { "id": getCashier().id },
      "formaPago": { "id": paymentMethod.id },
      "asociado": { "id": customer.member.id }
    },
    "Productos": productos,
    "MesaId": table.id
  }
  const res = await axios.post(API_URL + `/ventas/mesa/create/identificado`, data, { //hardcode
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + getSession().id_token
    },
  }).then(function (response) {
    return response;
  }).catch(function (error) {
    console.error("Error al intentar realizar la compra. Type error -> " + error.response.status);
    return error;
  });

  //console.log("LA VENTAAAA " + JSON.stringify(res));
  //console.log("OBJETO ENVIADO AL REALZIAR LA COMPRA -------------->" + JSON.stringify(data));

  const venta: Sale | null = createSaleAdapter(res.data[0].venta);

  //console.log("OBJETO devuleto AL REALZIAR LA COMPRA -------------->" + JSON.stringify(venta) );
  if (venta !== null) {
    return venta;
  } else {
    return 0;
  }
}

const changeTableService = async (productsInTable: Array<ProductInTable>, table: Table, customer: Customer) => {
  let productos = [{}];
  productos.pop();
  productsInTable.forEach((productInTable) => {
    productos.push({
      "id": productInTable.product.id,
      "cantidad": productInTable.quantity
    });
  });
  const data = {
    "Venta": {
      "costoTotal": 0,
      "costoTotalPuntos": 0,
      "cajero": { "id": getCashier().id },
      "asociado": { "id": customer.member.id }
    },
    "Productos": productos,
    "MesaId": table.id,
  }
  const res = await axios.post(API_URL + `/ventas/mesa/create/canje`, data, { //hardcode
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + getSession().id_token
    },
  }).then(function (response) {
    return response;
  }).catch(function (error) {
    console.error("Error al intentar realizar la compra. Type error -> " + error.response.status);
    return error;
  });

  //console.log("LA VENTAAAA " + JSON.stringify(res));
  //console.log("OBJETO ENVIADO AL REALZIAR LA COMPRA -------------->" + JSON.stringify(data));

  const venta: Sale | null = createSaleAdapter(res.data[0].venta);

  //console.log("OBJETO devuleto AL REALZIAR LA COMPRA -------------->" + JSON.stringify(venta) );
  if (venta !== null) {
    return venta;
  } else {
    return 0;
  }
}
export {
  getProducts,
  getCustomer,
  buyCart,
  changeCart,
  buyCartUnidentifiedCustomer,
  getPaymentMethods,
  getTablesService,
  getProductsInTable,
  addOneToTableService,
  removeOneFromTableService,
  buyTableService,
  buyTableWithCustomerService,
  changeTableService
}


