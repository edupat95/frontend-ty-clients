import axios from 'axios';
import { createProductoVentaAdapter } from '../../../adapters/Administration/productoVenta.adapter';
import { createVentaAdapter } from '../../../adapters/Administration/venta.adapter';
import { ProductoVenta } from '../../../models/Administration/productoVenta.model';
import { Venta } from '../../../models/Administration/venta.model';
import { getSession } from '../../../utilities/public.utilities';
import { API_URL } from '../../../config/constants';
const getSales = async () => {
    const res = await axios.get<Venta>(API_URL+`/ventas/club/${getSession().club.id}`, { //Hardcode buscamos al asociado-club
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + getSession().id_token
    },
    }).then(function (response) {
      return response;
    }).catch(function (error) {
      console.error("Error al pedir las ventas del club. Type error -> " + error);
      return error;
    });
    
    console.log(JSON.stringify(res.data));
    
    let aux_arr: Array<Venta> = [];

    res.data.forEach( (venta: any) => {
      //console.log(productoVenta);
      aux_arr.push(createVentaAdapter(venta));
    });
    //console.log(aux_arr);
    return aux_arr;
  }

const getProductSales = async () => {
  const res = await axios.get<Array<ProductoVenta>>(API_URL+`/producto-ventas/club/${getSession().club.id}`, { 
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + getSession().id_token
    },
    }).then(function (response) {
      return response;
    }).catch(function (error) {
      console.error("Error al pedir los productos vendidos en administration. Type error -> " + error);
      return error;
    });
    
    console.log(JSON.stringify(res.data));

    let aux_arr: Array<ProductoVenta> = [];

    res.data.forEach( (productoVenta: any) => {
      //console.log(productoVenta);
      aux_arr.push(createProductoVentaAdapter(productoVenta));
    });
    //console.log(aux_arr);
    return aux_arr;
}

export { getSales, getProductSales }
