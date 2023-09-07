import axios from 'axios';
import { Venta } from '../../../models/Administration/venta.model';
import { Box } from '../../../models/Cashier/box.model';
import { Product } from '../../../models/Cashier/product.model';
import { getSession } from '../../../utilities/public.utilities';
import { API_URL } from '../../../config/constants';

const getBoxesInClub = async () => {
  const response = await axios.get(`${API_URL}/cajas/club/${getSession().club.id}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + getSession().id_token
    },
  }).then(function (response) {
    return response;
  }).catch(function (error) {
    console.error("Error al intentar buscar las cajas del club. Type error -> " + error.response.status);
    return error;
  });

  return response.data;
}

const getProductsInBox = async (box: Box) => {
  const res = await axios.get<Array<Product>>(API_URL + `/producto-cajas/caja/` + box.id, {
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
  //console.log("ladataaaaa" + JSON.stringify(res.data));

  let products: Product[] = [];
  res.data.map((e: any) => {
    //console.log("\n-->" + JSON.stringify(e));
    const product = new Object() as Product;
    product.id = e.producto.id;
    product.nombre = e.producto.nombre;
    product.precio = e.producto.precio;
    product.precioPuntos = e.producto.precioPuntos;
    product.puntosRecompensa = e.producto.puntosRecompensa;
    product.descripcion = e.producto.descripcion;
    product.estado = e.producto.estado;
    products.push(product);
  });

  //console.log("ladataaaaa para caja "+ box.nombre + " -> " + JSON.stringify(products));
  return products;
};

const setProductInBox = async (box: Box, product: Product) => {
  const data: any = {
    "idProducto": product.id,
    "idCaja": box.id
  }

  const res = await axios.post<Array<any>>(API_URL + `/producto-cajas/create`, data, { //hardcode
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
  //onsole.log("Datos al agregar un producto caja" + JSON.stringify(res.status));
  return res.status;
}

const removeProductInBox = async (box: Box, product: Product) => {
  const data: any = {
    "idProducto": product.id,
    "idCaja": box.id
  }
  const res = await axios.post<Array<any>>(API_URL + `/producto-cajas/quitar`, data, { //hardcode
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
  //console.log("Datos al quitar el producto un producto caja" + JSON.stringify(res.status));
  return res.status;
}
export { getBoxesInClub, getProductsInBox, setProductInBox, removeProductInBox }