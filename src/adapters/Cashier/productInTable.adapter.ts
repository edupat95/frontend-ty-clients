export const createProductInTableAdapter = (productInTable: any) => ({
    id: productInTable.id,
    totalCost: productInTable.costoTotal,
    totalCostPoints: productInTable.costoTotalPuntos,
    quantity: productInTable.cantidad,
    state: productInTable.estado,
    createdDate: productInTable.createdDate,
    updatedDate: productInTable.updatedDate,
    table: productInTable.mesa,
    product: productInTable.producto
});
    
  

//import { Product } from "./product.model";
//import { Table } from "./table.model";
//export interface ProductInCart {
//  id: number,
//  totalCost: number,
//  totalCostPoints: number,
//  quantity: number,
//  state: boolean,
//  createdDate: string,
//  updatedDate: string,
//  table: Table,
//  product: Product
//}