import { Venta } from "./venta.model"
import { Product } from "../Cashier/product.model"

export interface ProductoVenta {
    id: number,
    costoTotal: number,
    costoTotalPuntos: number,
    cantidad: number,
    idVenta: Venta,
    idProducto: Product
}
