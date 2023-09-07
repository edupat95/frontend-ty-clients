import { Product } from "./product.model";
import { Table } from "./table.model";
export interface ProductInTable {
  id: number,
  totalCost: number,
  totalCostPoints: number,
  quantity: number,
  state: boolean,
  createdDate: string,
  updatedDate: string,
  table: Table,
  product: Product
}
/*
    {
        "id": 11,
        "costoTotal": 15000,
        "costoTotalPuntos": 0,
        "cantidad": 1,
        "estado": true,
        "createdDate": "2023-04-06T03:00:00Z",
        "updatedDate": "2023-04-06T03:00:00Z",
        "mesa": {
            "id": 21,
            "numeroMesa": 1,
            "estado": true,
            "createdDate": "2023-04-06T16:16:47.578794Z",
            "updatedDate": null
        },
        "producto": {
            "id": 11,
            "nombre": "Absolute botella",
            "precio": 15000,
            "costo": 0,
            "precioPuntos": 0,
            "puntosRecompensa": 0,
            "descripcion": "Absolute Botella 750ml",
            "estado": true,
            "createdDate": null,
            "updatedDate": null
        }
    }
*/