import axios from 'axios';
import { createProductAdapter } from '../../../adapters/Cashier/product.adapter';
import { Venta } from '../../../models/Administration/venta.model';
import { Product } from '../../../models/Cashier/product.model';
import { getSession } from '../../../utilities/public.utilities';
import { API_URL } from '../../../config/constants';

const setProduct = async (product: Product) => {

  const data = {
    "nombre": product.nombre,
    "precio": product.precio,
    "costo": product.costo,
    "precioPuntos": product.precioPuntos,
    "puntosRecompensa": product.puntosRecompensa,
    "descripcion": product.descripcion,
    "estado": true,
    "club": {
      "id": getSession().club.id
    }
  }

  const res = await axios.post(API_URL + `/productos/`, data, { //hardcode
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

  //console.log(JSON.stringify("STATUS DE RES: " + res.status));
  return res.status;
}

const getProductsInClub = async () => {
  //console.log("IDE DE SESION" + getSession().club.id);
  const res = await axios.get<Product[]>(API_URL + `/productos/club/${getSession().club.id}`, { //hardcode
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + getSession().id_token
    },
  }).then(function (response) {
    return response;
  }).catch(function (error) {
    console.error("Error al intentar buscar los productos del club. Type error -> " + error.response.status);
    return error;
  });

  //console.log(`LA DATA ${JSON.stringify(res.data)}`);
  if (res.data.length === 0) {
    return [];
  }

  const products: Product[] = [];
  res.data.map((e: Product) => {
    //console.log("\n-->" + JSON.stringify(e));
    const product = new Object() as Product;
    product.id = e.id;
    product.nombre = e.nombre;
    product.costo = e.costo;
    product.precio = e.precio;
    product.precioPuntos = e.precioPuntos;
    product.puntosRecompensa = e.puntosRecompensa;
    product.descripcion = e.descripcion;
    product.estado = e.estado;
    products.push(createProductAdapter(product));
  });
  return products;

}

const disableProduct = async (product: Product) => {
  const res = await axios.get(API_URL + `/productos/${product.id}/desactivar`, { //hardcode
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + getSession().id_token
    },
  }).then(function (response) {
    //console.log("Producto eliminado correctamente" + response)
    return response;
  }).catch(function (error) {
    console.error("Error al intentar eliminar el producto. Type error -> " + error.response.status);
    return error.response;
  });

  //console.log(JSON.stringify("STATUS DE RES: " + res.status));
  return res.status;
}

const updateProductService = (product: Product) => {
  ///productos/{id}
  const data = {
    "id": product.id,
    "nombre": product.nombre,
    "precio": product.precio,
    "costo": product.costo,
    "precioPuntos": product.precioPuntos,
    "puntosRecompensa": product.puntosRecompensa,
    "descripcion": product.descripcion,
    "estado": true,
    "club": {
      "id": getSession().club.id
    }
  }
  const res = axios.put(API_URL + `/productos/${product.id}`, data, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + getSession().id_token
    },
  }).then(function (response) {
    console.log("Producto editado correctamente" + JSON.stringify(response))
    return response.status;
  }
  ).catch(function (error) {
    console.error("Error al intentar editar el producto. Type error -> " + error.response.status);
    return error.response.status;
  }
  );
  return res;
}

export {updateProductService, setProduct, getProductsInClub, disableProduct }