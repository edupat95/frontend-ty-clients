import { Cashier } from "../Cashier/cashier.model"
import { Member } from "../Cashier/member.model"

export interface Venta {
    id: number,
    costoTotal: number,
    costoTotalPuntos: number,
    fechaVenta: string,
    productoVentas: boolean,
    idCajero: Cashier,
    idAsociado: Member
}
