import axios from 'axios';
import { createProductInCartAdapter } from '../../../adapters/Cashier/productInCar.adapter';
import { createSaleAdapter } from '../../../adapters/sale.adapter';
import { Cashier } from '../../../models/Cashier/cashier.model';
import { ProductInCart } from '../../../models/Cashier/productInCart.model';
import { Sale } from '../../../models/sale.model';
import { getSession } from '../../../utilities/public.utilities';
import { API_URL } from '../../../config/constants';

const getSalesWithFilters = async (dateFrom: String, dateTo: String) => {
  const res = await axios.get<Sale[]>(`${API_URL}/ventas/club/${getSession().club.id}/desde/${dateFrom}/hasta/${dateTo}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + getSession().id_token
    },
  }).then(function (response) {
    return response;
  }).catch(function (error) {
    console.error("Error al intentar realizar guardar el producto. Type error -> " + (error.response?.status || error.message));
    return error;
  });

  console.log("DATA-> " + JSON.stringify(res.data));
  const sales: Sale[] = [];
  res.data.map((e: Sale | null) => {
    const sale: Sale | null = createSaleAdapter(e);
    if(sale){
      sales.push(sale);
    }
  });
  
  return sales;
}

const getProductsInSale = async (sale: Sale) => {

  const res = await axios.get<ProductInCart[]>(`${API_URL}/producto-ventas/venta/${sale.id}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + getSession().id_token
    },
  }).then(function (response) {
    return response;
  }).catch(function (error) {
    console.error("Error al intentar realizar guardar el producto. Type error -> " + (error.response?.status || error.message));
    return error;
  });

  console.log("DATA PRODUCTS-> " + JSON.stringify(res.data));
  const products: ProductInCart[] = [];
  res.data.map((e: ProductInCart | null) => {
    const product: ProductInCart = createProductInCartAdapter(e);
    if(product){
      products.push(product);
    }
  });
  
  return products;
}
export { getSalesWithFilters, getProductsInSale };
