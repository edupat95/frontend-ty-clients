import { Cashier } from "./Cashier/cashier.model";
import { Member } from "./Cashier/member.model";
import { PaymentMethod } from "./PaymentMethod.model";

export interface Sale {
    id: number,
    costoTotal: number,
    costoTotalPuntos: number,
    identificadorTicket: string,
    entregado: boolean,
    formaPago: PaymentMethod | undefined,
    createdDate: string,
    updatedDate: string,
    cajero: Cashier,
    asociado: Member
}


//"id":11,
//"costoTotal":1800,
//"costoTotalPuntos":0,
//"identificadorTicket":"bf292ab9-68e6-4e89-a3e1-10f0253a1709",
//"entregado":false,
//"createdDate":"2023-03-14T19:41:23.261047Z",
//"updatedDate":null,
//"formaPago":null,
//"productoVentas":null,
//"cajero":{
//"id":3,
//"plataDeCambio":0,
//"estado":true,
//"creadDate":"2023-03-03T03:00:00Z",
//"updatedDate":"2023-03-03T03:00:00Z"
//},
//"asociado":null